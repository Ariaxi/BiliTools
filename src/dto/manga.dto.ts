import type { OnlyMsg } from './bili-base-prop';

/**
 * 漫画签到
 */
export interface ClockInDto extends OnlyMsg {
  meta: any;
}

/**
 * 背包信息
 */
export type WalletDto = OnlyMsg<{
  remain_coupon: number; // 剩余优惠券数量
  remain_gold: number; // 剩余金币数量
  first_reward: false; // 是否首充
  point: string; // 积分
  first_bonus_percent: number;
  bonus_percent: number;
  unusable_gold: number;
  remain_item: number;
  remain_tickets: number;
  remain_discount: number;
  account_level: number;
  pay_entry_txt: string;
  pay_act: { act_start_time: string; act_end_time: string; act_entry_txt: string };
  point_type: number;
  is_point_expired_soon: boolean;
}>;

/**
 * 追漫信息
 */
export type FavoriteManga = OnlyMsg<
  {
    id: string;
    comic_id: number;
    title: string;
    status: number;
    last_ord: number;
    ord_count: number;
    hcover: string;
    scover: string;
    vcover: string;
    publish_time: string;
    last_ep_publish_time: string;
    last_ep_id: number;
    last_ep_short_title: string;
    latest_ep_short_title: string;
    allow_wait_free: boolean;
    type: number;
    rookie_expire_time: string;
    free_type: number;
    latest_ep_id: number;
    /** 是否读取最后一话 */
    has_read_latest_ep: boolean;
    updated_count: number;
    is_limit_free: boolean;
  }[]
>;

/**
 * 账户中的漫读券信息
 */
export type CouponDto = OnlyMsg<{
  total_remain_amount: number;
  user_coupons: Usercoupon[];
  coupon_info: {
    new_coupon_num: number;
    coupon_will_expire: number;
    rent_will_expire: number;
    new_rent_num: number;
    discount_will_expire: number;
    new_discount_num: number;
    month_ticket_will_expire: number;
    new_month_ticket_num: number;
    silver_will_expire: number;
    new_silver_num: number;
    remain_item: number;
    remain_discount: number;
    remain_coupon: number;
    remain_silver: number;
    remain_shop_coupon: number;
    new_shop_num: number;
    shop_will_expire: number;
    new_suit_id: number;
    remain_suit_coupon: number;
    new_suit_num: number;
    suit_will_expire: number;
    vip_priv_coupon: boolean;
  };
}>;

interface Usercoupon {
  ID: number;
  remain_amount: number;
  expire_time: string;
  reason: string;
  type: string;
  ctime: string;
  total_amount: number;
  limits: any[];
  type_num: number;
  will_expire: number;
  discount: number;
  discount_limit: number;
  is_from_card: number;
  valid_time: string;
  discount_base: number;
}

/**
 * 漫画详情
 */
export type MangaDetailDto = OnlyMsg<{
  id: number;
  title: string;
  comic_type: number;
  page_default: number;
  page_allow: number;
  horizontal_cover: string;
  square_cover: string;
  vertical_cover: string;
  author_name: string[];
  styles: string[];
  last_ord: number;
  is_finish: number;
  status: number;
  fav: number;
  read_order: number;
  evaluate: string;
  total: number;
  ep_list: Eplist[];
  release_time: string;
  is_limit: number;
  read_epid: number;
  last_read_time: string;
  is_download: number;
  read_short_title: string;
  styles2: Styles2[];
  renewal_time: string;
  last_short_title: string;
  discount_type: number;
  discount: number;
  discount_end: string;
  no_reward: boolean;
  batch_discount_type: number;
  ep_discount_type: number;
  has_fav_activity: boolean;
  fav_free_amount: number;
  allow_wait_free: boolean;
  wait_hour: number;
  wait_free_at: string;
  no_danmaku: number;
  auto_pay_status: number;
  no_month_ticket: boolean;
  immersive: boolean;
  no_discount: boolean;
  show_type: number;
  pay_mode: number;
  chapters: any[];
  classic_lines: string;
  pay_for_new: number;
  fav_comic_info: Favcomicinfo;
  serial_status: number;
  series_info: Seriesinfo;
  album_count: number;
  wiki_id: number;
  /** 最新几画无法使用 coupon */
  disable_coupon_amount: number;
  japan_comic: boolean;
  interact_value: string;
  temporary_finish_time: string;
  video?: any;
  introduction: string;
  comment_status: number;
  no_screenshot: boolean;
  type: number;
  vomic_cvs: any[];
  no_rank: boolean;
  presale_eps: any[];
  presale_text: string;
  presale_discount: number;
  no_leaderboard: boolean;
}>;

interface Seriesinfo {
  id: number;
  comics: Comic[];
}

interface Comic {
  comic_id: number;
  title: string;
}

interface Favcomicinfo {
  has_fav_activity: boolean;
  fav_free_amount: number;
  fav_coupon_type: number;
}

interface Styles2 {
  id: number;
  name: string;
}

interface Eplist {
  id: number;
  ord: number;
  read: number;
  pay_mode: number;
  is_locked: boolean;
  pay_gold: number;
  size: number;
  short_title: string;
  is_in_free: boolean;
  title: string;
  cover: string;
  pub_time: string;
  comments: number;
  unlock_expire_at: string;
  unlock_type: number;
  allow_wait_free: boolean;
  progress: string;
  like_count: number;
  chapter_id: number;
  type: number;
  extra: number;
}

/**
 * 购买信息
 */
export type BuyInfoDto = OnlyMsg<{
  remain_coupon: number;
  remain_gold: number;
  pay_gold: number;
  recommend_coupon_id: number;
  /** 未购买数量 */
  remain_lock_ep_num: number;
  auto_pay_gold_status: number;
  auto_pay_coupons_status: number;
  remain_lock_ep_gold: number;
  comic_id: number;
  is_locked: boolean;
  allow_coupon: boolean;
  after_lock_ep_gold: number;
  after_lock_ep_num: number;
  first_image_path: string;
  first_image_url: string;
  first_image_token: string;
  last_image_path: string;
  last_image_url: string;
  last_image_token: string;
  discount_type: number;
  discount: number;
  original_gold: number;
  first_bonus_percent: number;
  has_first_bonus: boolean;
  ep_discount_type: number;
  ep_discount: number;
  ep_original_gold: number;
  batch_buy: {
    batch_limit: number;
    amount: number;
    original_gold: number;
    pay_gold: number;
    discount_type: number;
    discount: number;
    discount_batch_gold: number;
    usable: boolean;
  }[];
  recommend_item_id: number;
  allow_item: boolean;
  remain_item: number;
  allow_wait_free: boolean;
  wait_free_at: string;
  has_newbie_gift: boolean;
  recommend_discount_id: number;
  recommend_discount: number;
  remain_discount_card: number;
  discount_ep_gold: number;
  discount_remain_gold: number;
  remain_silver: number;
  ep_silver: number;
  pay_entry_txt: string;
  user_card_state: number;
  price_type: number;
  guide_rebate: Guiderebate;
}>;

interface Guiderebate {
  is_covered: boolean;
  percent: number;
  min_ep_num: number;
  corner_text: string;
}

/**
 * 搜索漫画
 */
export type SearchMangaDto = OnlyMsg<{
  list: SearchMangaList[];
  total_page: number;
  total_num: number;
  recommends: any[];
  similar: string;
  jump?: any;
  se_id: string;
  banner: Banner;
}>;

interface Banner {
  icon: string;
  title: string;
  url: string;
}

interface SearchMangaList {
  id: number;
  title: string;
  org_title: string;
  alia_title: any[];
  horizontal_cover: string;
  square_cover: string;
  vertical_cover: string;
  author_name: string[];
  styles: string[];
  is_finish: number;
  allow_wait_free: boolean;
  discount_type: number;
  type: number;
  wiki: SearchMangaWiki;
}

interface SearchMangaWiki {
  id: number;
  title: string;
  origin_title: string;
  vertical_cover: string;
  producer: string;
  author_name: string[];
  publish_time: string;
  frequency: string;
}

/**
 * 漫画商城列表
 */
export type MangaPointShopDto = OnlyMsg<
  {
    id: number;
    type: number;
    title: string;
    image: string;
    /** 总量 */
    amount: number;
    /** 原价 */
    cost: number;
    /** 现价 */
    real_cost: number;
    /** 剩余数量 */
    remain_amount: number;
    comic_id: number;
    limits: any[];
    discount: number;
    product_type: number;
    pendant_url: string;
    pendant_expire: number;
    exchange_limit: number;
    address_deadline: string;
    act_type: number;
    has_exchanged: boolean;
    main_coupon_deadline: string;
    deadline: string;
    point: string;
  }[]
>;

/**
 * 积分商场购买反馈
 */
export type PointShopBuyDto = OnlyMsg<{
  id: string;
  expire_day: number;
  remain_amount: number;
  deadline: string;
}>;
