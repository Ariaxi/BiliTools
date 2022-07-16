import { TaskConfig } from '@/config/globalVar';
import * as mangaApi from '@/net/manga.request';
import { exchangeMangaShop, getMangaPoint } from '@/net/manga.request';
import { apiDelay, logger } from '@/utils';
import { request } from '@/utils/request';

let expireCouponNum: number;

/**
 * 获取即将过期的漫读券数量
 */
async function getExpireCouponNum() {
  expireCouponNum = 0;
  try {
    const { code, msg, data } = await mangaApi.getCoupons();
    if (code !== 0) {
      logger.error(`获取漫读券失败：${code} ${msg}`);
      return;
    }
    const { user_coupons } = data;
    if (user_coupons.length === 0) {
      logger.info('没有漫读券，跳过任务');
      return;
    }
    const coupons = user_coupons.filter(coupon => coupon.will_expire !== 0);
    expireCouponNum = coupons.reduce((acc, coupon) => acc + coupon.remain_amount, 0);
    return expireCouponNum;
  } catch (error) {
    logger.error(`获取漫读券异常: ${error}`);
  }
}

/**
 * 获取追漫列表
 */
async function getFavoriteList() {
  try {
    const { code, msg, data } = await mangaApi.getFavoriteList();
    if (code === 0) {
      return data;
    }
    logger.error(`获取追漫列表失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`获取追漫列表异常: ${error}`);
  }
}

/**
 * 获取需要购买的漫画章节
 */
async function getMangaEpList(comic_id: number) {
  try {
    const { code, msg, data } = await mangaApi.getMangaDetail(comic_id);
    if (code !== 0) {
      logger.error(`获取漫画详情失败：${code} ${msg}`);
      return;
    }
    if (!data || !data.ep_list) {
      return;
    }
    let epList = data.ep_list;
    if (data.disable_coupon_amount !== 0) {
      // 去掉没有漫读券的章节
      epList = epList.slice(0, epList.length - data.disable_coupon_amount);
    }
    return epList.filter(ep => ep.is_locked);
  } catch (error) {
    logger.error(`获取漫画详情异常: ${error}`);
  }
}

/**
 * 获取购买信息
 */
async function getBuyCoupon(ep_id: number) {
  // web 中自动调取最后一话的
  try {
    const { code, msg, data } = await mangaApi.getBuyInfo(ep_id);
    if (code !== 0) {
      logger.error(`获取购买信息失败：${code} ${msg}`);
      return;
    }
    if (!data) {
      return;
    }
    if (!data.allow_coupon) {
      logger.info('漫画不支持漫读券');
      return;
    }
    if (data.recommend_coupon_id === 0 || data.remain_coupon === 0) {
      expireCouponNum = 0;
      logger.info('没有足够的漫读券了');
      return;
    }
    if (!data.remain_lock_ep_num) {
      return;
    }
    return data.recommend_coupon_id;
  } catch (error) {
    logger.error(`获取购买信息异常: ${error}`);
  }
}

/**
 * 购买漫画的一个章节
 * @return true 则不再购买
 */
async function buyOneEpManga(ep_id: number) {
  try {
    const couponId = await getBuyCoupon(ep_id);
    if (!couponId) {
      return true;
    }
    const { code, msg } = await mangaApi.buyManga(ep_id, couponId);
    if (code !== 0) {
      logger.error(`购买漫画失败：${code} ${msg}`);
      return;
    }
    // 购买成功，则减少漫读券数量
    expireCouponNum--;
    logger.info(`购买漫画成功`);
  } catch (error) {
    logger.error(`购买漫画异常: ${error}`);
  }
}

/**
 * 搜索漫画
 */
async function searchManga(keyword: string) {
  try {
    const { code, msg, data } = await mangaApi.searchManga(keyword);
    if (code === 0) {
      return data;
    }
    logger.error(`搜索漫画失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`搜索漫画异常: ${error}`);
  }
}

/**
 * 购买漫画
 */
async function buyManga(comic_id: number) {
  const epList = await getMangaEpList(comic_id);
  if (!epList || epList.length === 0) {
    return false;
  }
  for (let index = 0; index < epList.length; index++) {
    await apiDelay(100);
    if (await buyOneEpManga(epList[index].id)) return true;
  }
}

/**
 * 通过 mc 购买漫画
 */
async function buyMangaByMc() {
  const { mc } = TaskConfig.manga;
  if (mc.length === 0) {
    return;
  }
  for (let index = 0; index < mc.length; index++) {
    if (expireCouponNum <= 0) return;
    const mcId = mc[index];
    await buyManga(mcId);
  }
}

/**
 * 通过名字购买漫画
 */
async function buyMangaByName() {
  const { name } = TaskConfig.manga;
  if (name.length === 0) {
    return;
  }
  for (let index = 0; index < name.length; index++) {
    if (expireCouponNum <= 0) return;
    const keyword = name[index];
    const mangas = await searchManga(keyword);
    if (!mangas || mangas.list.length === 0) {
      continue;
    }
    const manga = mangas.list.find(mange => mange.title === keyword);
    if (!manga) {
      continue;
    }
    await buyManga(manga.id);
  }
}

/**
 * 通过追漫列表购买漫画
 */
async function buyMangaByLove() {
  const { love } = TaskConfig.manga;
  if (!love || expireCouponNum <= 0) {
    return;
  }
  const favoriteList = await getFavoriteList();
  if (!favoriteList || favoriteList.length === 0) {
    return;
  }
  for (let index = 0; index < favoriteList.length; index++) {
    if (expireCouponNum <= 0) return;
    const favorite = favoriteList[index];
    await buyManga(favorite.comic_id);
  }
}

export async function buyMangaService() {
  const { buy } = TaskConfig.manga;
  if (!buy) {
    return;
  }
  if (!isTodayRunning()) {
    logger.info('非购买漫画时间，不购买');
    return;
  }
  expireCouponNum = await getExpireCouponNum();
  if (expireCouponNum < 1) {
    logger.info('没有即将过期的漫读券，跳过任务');
    return;
  }
  logger.info('开始购买漫画');
  await buyMangaByMc();
  await buyMangaByName();
  await buyMangaByLove();

  function isTodayRunning() {
    const { buyWeek, buyInterval } = TaskConfig.manga;
    if (buyInterval === 1) return true;
    const now = new Date();
    const weekDay = now.getDay();
    const today = now.getDate();
    return buyWeek.includes(weekDay) || (today % buyInterval) - 1 === 0;
  }
}

export async function mangaSign() {
  const { sign } = TaskConfig.manga;
  if (!sign) {
    return;
  }
  logger.info('开始签到');
  try {
    const { code } = await mangaApi.clockIn();
    if (code == 0) {
      logger.info('漫画签到成功');
    } else {
      logger.warn('漫画签到失败');
    }
  } catch (error) {
    /**
     * 这是axios报的错误,重复签到后返回的状态码是400
     * 所以将签到成功的情况忽略掉
     */
    const { status, statusCode } = error.response || {};
    if (status === 400 || statusCode === 400) {
      logger.info('已经签到过了，跳过任务');
    } else {
      logger.error(`漫画签到异常 ${error.message}`);
    }
  }
}

/**
 * 商城兑换
 */
export async function exchangeCoupon() {
  const { exchangeCouponNum } = TaskConfig.manga;
  if (exchangeCouponNum < 1) {
    return;
  }
  logger.info(`开始兑换漫读券，预设数量：${exchangeCouponNum}`);
  try {
    let num = exchangeCouponNum;
    const { point } = await request(getMangaPoint, { name: '获取积分' });
    const pointNum = parseInt(point, 10) || 0,
      buyCouponNum = Math.floor(pointNum / 100);
    logger.info(`当前积分：${pointNum}`);
    if (buyCouponNum < num) {
      num = buyCouponNum;
    }
    if (buyCouponNum < 1) {
      logger.info('可兑换的漫读券数量不足 1，跳过任务');
      return;
    }
    const { code } = await request(
      exchangeMangaShop,
      { name: '兑换商品', transformResponse: false },
      195,
      100,
      num,
    );
    if (code === 0) {
      logger.info(`兑换商品成功，兑换数量：${num}`);
    }
  } catch (error) {
    logger.error(`商城兑换异常: ${error}`);
  }
}
