export const api = process.env.api;

export const url = process.env.url;

export const fbAppID = "246554168145";
export const instagramClientToken = "246554168145";

export const config = {
  sendOtp: api + "/admin/send-otp",
  sendEmail: api + "/admin/send-email",
  approvePost: api + "/admin/approve-promoted-post",
  promotionCharge: api + "/admin/promotion",
  promotedPost: api + "/user/promoted-post",
  allPromotedPost: api + "/admin/all-promoted-post",
  allPromotedPost: api + "/admin/all-promoted-post",
  sendEmailToAdmin: api + "/admin/send-email-to-admin",
  login: api + "/auth",
  googleLogin: api + "/auth/google",
  checkout: api + "/user/checkout",
  createPlan: api + "/user/create-plan",
  getPlan: api + "/user/get-plan",
  getAllPlan: api + "/admin/all-plan",
  getMetaUsers: api + "/admin/meta-users",
  username: api + "/user/username",
  deleteAccount: api + "/user/delete",
  resetAccount: api + "/auth/reset",
  resetAccountOtp: api + "/auth/otp",
  resetPassword: api + "/auth/reset/password",
  upload: api + "/user/upload",
  uploadCover: api + "/user/upload/cover",
  verify: api + "/auth/verify",
  getImage: api + "/topic/get/img/",
  changePassword: api + "/user/change-password",
  changeSetting: api + "/user/update-setting",
  changeInfo: api + "/user/change-info",
  profile: api + "/user/profile",
  profileTopic: api + "/topic/profile/topic",
  profileFavorites: api + "/topic/profile/favorites",
  profileComment: api + "/topic/profile/comment",
  profileFollowing: api + "/user/profile/following",
  profileFollowers: api + "/user/profile/followers",
  profileBlocked: api + "/user/profile/blocked",
  me: api + "/user",
  all: api + "/user/all",
  allTemp: api + "/user/all-temp",
  banuser: api + "/admin/users/deactivate",
  banuserip: api + "/admin/users/block-ip",
  searchusers: api + "/admin/users/search",
  notification: api + "/user/notification",
  notificationCount: api + "/user/notification/count",
  notificationRead: api + "/user/notification/mark/read",
  follow: api + "/user/follow",
  block: api + "/user/block",
  location: api + "/user/location",
  siteFollow: api + "/site/follow",
  topicFollow: api + "/topic/follow",
  userblock: api + "/user/block",
  deleteFollow: api + "/topic/delete",
  topics: api + "/topic",
  getTopicsByUrl: api + "/topic/url",
  site: api + "/site",
  siteTopics: api + "/site/topics",
  uploadImgPost: api + "/topic/img",
  uploadTextPost: api + "/topic/text",
  topicVote: api + "/topic/vote",
  siteVote: api + "/site/vote",
  siteInfo: api + "/site/siteInfo",
  commentVote: api + "/topic/vote/comment",
  comment: api + "/topic/comment",
  reply: api + "/topic/reply",
  validateUrl: api + "/topic/check-url",
  tipPost: api + "/transaction/tip/topic",
  tipSite: api + "/transaction/tip/site",
  tipComment: api + "/transaction/tip/comment",
  balance: api + "/transaction/balance",
  withdrawal: api + "/transaction/withdrawal",
  transactionHistory: api + "/transaction/user/history",
  favourite: api + "/user/favourite",
  referal: api + "/user/referal",
  approve: api + "/transaction/approve",
  denied: api + "/transaction/denied",
  topTags: api + "/topic/top/tags",
  getTopicByTag: api + "/topic/hashtag",
  getUrlTotal: api + "/topic/total/url",
  report: api + "/report",
  metaReports: api + "/report/meta",
  reportComment: api + "/report/comment",
  tipcoinTokenImage: "/static/tipcoin.png",
  tipcoinImage: "/static/tipcoins/tip-small.png",
  captcha: api + "/captcha/generate",
  statistics: api + "/admin/statistics",
  groupslist: api + "/admin/groupslist",
  giveaway: api + "/admin/giveaway",
  groupgiveaway: api + "/admin/groupgiveaway",
  suggestions: api + "/user/suggestions",
  search: api + "/search",
  website: api + "/user/website",
  verifyWebsite: api + "/user/website/verify",
  verifyChannel: api + "/user/youtube/verify",
  creategroup: api + "/groups/create",
  listgroups: api + "/groups/",
  updategroup: api + "/groups/update",
  updategroupdata: api + "/groups/updategroup",
  deltegroup: api + "/groups/delete",
  joingroup: api + "/groups/join",
  groupinfo: api + "/groups/info",
  savegrouprule: api + "/groups/savegrouprule",
  deletegrouprule: api + "/groups/deletegrouprule",
  addremovemoderator: api + "/groups/addremovemoderator",
  viewreportedpostsgroup: api + "/groups/viewreportedpostsgroup",
  viewreportedcommentsgroup: api + "/groups/viewreportedcommentsgroup",
  viewdeletedpostsandcomments: api + "/groups/viewdeletedpostsandcomments",
  undeletepostorcomment: api + "/groups/undeletepostorcomment",
  banusergroup: api + "/groups/banusergroup",
  setstickystatus: api + "/groups/setstickystatus",
  updaterulesequence: api + "/groups/updaterulesequence",
  groupbyowner: api + "/groups/group-by-owner",
  crypto: api + "/tokens",
  approvecrypto: api + "/tokens/approve-token",
  createaibot: api + "/user/bot"
};

export const maxfilesize = 5 * 1024 * 1024;
