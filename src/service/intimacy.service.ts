import type { FansMedalDto } from '../dto/live.dto';
import { TaskConfig } from '../config/globalVar';
import * as liveRequest from '../net/live.request';
import { kaomoji } from '../constant';
import { random, apiDelay, logger, Logger, apiDelaySync, randomString, createUUID } from '@/utils';
import { likeLiveRoom, liveMobileHeartBeat, shareLiveRoom } from '@/net/intimacy.request';
import type { MobileHeartBeatParams } from '@/net/intimacy.request';

const messageArray = kaomoji.concat('1', '2', '3', '4', '5', '6', '7', '8', '9', '签到', '哈哈');
const liveLogger = new Logger({ console: 'debug', file: 'debug', push: 'warn' }, 'live');

export async function getFansMealList() {
  let totalNumber = 99,
    pageNumber = 0;
  const list: FansMedalDto[] = [];
  try {
    while (pageNumber < totalNumber) {
      const { code, message, data } = await liveRequest.getFansMedalPanel(
        pageNumber + 1,
        50,
        TaskConfig.USERID,
      );

      if (code !== 0) {
        logger.verbose(`获取勋章信息失败 ${code} ${message}`);
        return null;
      }

      if (!data) {
        return list;
      }

      totalNumber = data.page_info.total_page;
      pageNumber = data.page_info.current_page;
      list.push(...data.list, ...data.special_list);
    }

    return list;
  } catch (error) {
    logger.error(`获取勋章异常 ${error.message}`);
    return null;
  }
}

/**
 * 过滤掉不需要发送的直播间
 */
export function filterFansMedalList(list: FansMedalDto[]) {
  if (!list || list.length === 0) return [];
  return list.filter(fansMedalFilter);
}

function fansMedalFilter({ room_info, medal }: FansMedalDto) {
  // 没有直播间
  if (!room_info?.room_id) return false;
  // 粉丝牌已经满了或者为舰长
  if (medal.level >= 20) return false;
  // 今日够了
  if (medal.today_feed >= medal.day_limit) return false;
  // 今天达到了 1300（默认获取最大）
  if (medal.today_feed >= 1300) return false;
  // 不存在白名单
  // TODO：白名单兼容 uid 和 room_id
  const { whiteList, blackList } = TaskConfig.intimacy;
  if (!whiteList || !whiteList.length) {
    // 判断是否存在黑名单中
    if (
      blackList &&
      (blackList.includes(room_info.room_id) || blackList.includes(medal.target_id))
    ) {
      return false;
    }
    return true;
  }
  // 如果存在白名单，则只发送白名单里的
  if (whiteList.includes(room_info.room_id) || whiteList.includes(medal.target_id)) {
    return true;
  }
  return false;
}

export async function sendOneMessage(roomid: number, nickName: string) {
  const msg = messageArray[random(messageArray.length - 1)];
  try {
    const { code, message } = await liveRequest.sendMessage(roomid, msg);

    if (code !== 0) {
      // 11000 某种不可抗力不允许发
      // 10030 发送过于频繁
      if (code === 11000) {
        logger.warn(`【${nickName}】${roomid}-可能未开启评论`);
        return false;
      }
      logger.warn(`【${nickName}】${roomid}-发送失败 ${message}`);
      logger.verbose(`code: ${code}`);
      return false;
    }
    // logger.info('发送成功!');
    return true;
  } catch (error) {
    logger.verbose(`发送弹幕异常 ${error.message}`);
  }
}

async function shareLive(roomId: number) {
  try {
    const { code, message, data } = await shareLiveRoom(roomId);
    if (code === 0) {
      return data;
    }
    logger.info(`【${roomId}】直播间分享失败 ${code} ${message}`);
  } catch (error) {
    logger.warn(`分享直播间 [${roomId}] 异常 ${error.message}`);
  }
}

async function likeLive(roomId: number) {
  try {
    const { code, message, data } = await likeLiveRoom(roomId);
    if (code === 0) {
      return data;
    }
    logger.info(`【${roomId}】直播间点赞失败 ${code} ${message}`);
  } catch (error) {
    logger.warn(`点赞直播间异常 ${error.message}`);
  }
}

async function liveMobileHeart(
  heartbeatParams: MobileHeartBeatParams & { uname: string },
  countRef: Ref<number>,
) {
  if (countRef.value >= 31) {
    return;
  }
  try {
    const { code, message } = await liveMobileHeartBeat(heartbeatParams);
    if (code !== 0) {
      logger.warn(`直播间心跳失败 ${code} ${message}`);
      return;
    }
    countRef.value++;
    liveLogger.info(`直播间心跳成功 ${heartbeatParams.uname}（${countRef.value}/31）`);
  } catch (error) {
    liveLogger.error(error);
    logger.error(`直播间心跳异常 ${error.message}`);
  }
}

// 发送直播弹幕 1 次 间隔 10s 以上
// 分享直播 5 次 间隔 3s 以上
// 点赞 3 次 间隔 3s 以上

export async function liveIntimacyService() {
  const fansMealList = filterFansMedalList(await getFansMealList());
  return await Promise.allSettled([likeAndShare(fansMealList), liveHeart(fansMealList)]);
}

async function likeAndShare(fansMealList: FansMedalDto[]) {
  for (let index = 0; index < fansMealList.length; index++) {
    const fansMedal = fansMealList[index];
    await liveInteract(fansMedal);
  }
}

async function liveHeart(fansMealList: FansMedalDto[]) {
  if (fansMealList.length === 0) return;
  const { liveHeart } = TaskConfig.intimacy;
  if (!liveHeart) return;
  return new Promise(resolve => liveHeartPromise(resolve, fansMealList));
}

function liveHeartPromise(resolve: (value: unknown) => void, roomList: FansMedalDto[]) {
  for (let index = 0; index < roomList.length; index++) {
    const countRef: Ref<number> = { value: 0 };
    const fansMeal = roomList[index];
    const timerRef: Ref<NodeJS.Timer> = { value: undefined };
    const options = {
      buvid: randomString(37).toUpperCase(),
      gu_id: randomString(43).toLocaleUpperCase(),
      visit_id: randomString(32).toLocaleLowerCase(),
      uuid: createUUID(),
      click_id: createUUID(),
    };
    run(fansMeal, options, countRef, timerRef);
    timerRef.value = setInterval(run, 60000, fansMeal, options, countRef, timerRef);
    apiDelaySync(50, 150);
  }
  resolve('直播间心跳');
  async function run(
    { medal, anchor_info, room_info }: FansMedalDto,
    options: Record<string, string>,
    countRef: Ref<number>,
    timerRef?: Ref<NodeJS.Timer>,
  ) {
    await liveMobileHeart(
      {
        up_id: medal.target_id,
        room_id: room_info.room_id,
        uname: anchor_info.nick_name,
        ...options,
      },
      countRef,
    );
    if (countRef.value >= 31) {
      timerRef && timerRef.value && clearInterval(timerRef.value);
    }
  }
}

export async function liveInteract(fansMedal: FansMedalDto) {
  const { room_info, anchor_info } = fansMedal;
  if (!room_info || !anchor_info) {
    return;
  }
  const { liveLike, liveSendMessage, liveShare } = TaskConfig.intimacy,
    nickName = anchor_info.nick_name,
    roomid = room_info.room_id;
  if (!liveLike && !liveSendMessage && !liveShare) return;
  // 发送直播弹幕
  if (liveSendMessage) {
    liveLogger.verbose(`【${nickName}】开始发送直播弹幕`);
    await sendOneMessage(roomid, nickName);
  }
  // 分享直播
  async function shareLiveHandle() {
    await apiDelay(100, 300);
    for (let i = 0; i < 5; i++) {
      liveLogger.verbose(`分享 [${nickName}] 直播间`);
      await shareLive(roomid);
      await apiDelay(4000);
    }
  }
  if (liveShare) {
    shareLiveHandle().catch(error => logger.error(error));
  }

  // 点赞直播
  async function likeLiveHandle() {
    await apiDelay(100, 300);
    for (let i = 0; i < 3; i++) {
      liveLogger.verbose(`给 [${nickName}] 直播间点赞`);
      await likeLive(roomid);
      await apiDelay(6500);
    }
  }
  if (liveLike) {
    likeLiveHandle().catch(error => logger.error(error));
  }

  await apiDelay(22000);
}
