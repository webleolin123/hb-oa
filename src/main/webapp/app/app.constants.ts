// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application
import {before} from "selenium-webdriver/testing";

export const VERSION = '';
export const DEBUG_INFO_ENABLED = false;
export const SERVER_API_URL = '';
export const BUILD_TIMESTAMP = '';
// todo 打包时根据服务器进行修改
export const BASE_API_URL = 'http://192.168.0.127:8089/';
// 图片上传s
export const IMAGE_API_URL = 'http://www.berbuy.com:4869/'; // 图片上传接口的base url
// POST /api/images/upload
export const UPLOAD_IMAGE_API = 'baseservice/api/images/upload'; // 图片上传接口
// 登录模块接口
//忘记密码--重置 PUT /api/users/resetPasswordTo
export const RESETPASSWORD_API = 'usercenterservice/api/users/resetPasswordTo';
//发送手机验证码 POST /api/aliSms/sendVerification
export const SENDVERIFICATION_API = 'baseservice/api/aliSms/sendVerification';
//个人信息模块
// 基本设置--更改基本信息 同// 权限管理--人员管理
//安全设置--修改密码 POST /api/account/change-password
export const CHANGE_PASSWORD_API = 'usercenterservice/api/account/change-password';
// 系统模块接口
//     权限管理
// baseservice下
// 权限管理--角色管理--获取所有角色 usercenterservice GET /api/users/business-authorities
export const ROLES_API = 'usercenterservice/api/users/business-authorities';
//usercenterservice下
//  权限管理--角色管理--创建  PUT /api/users/createAuthority
export const ROLES_CREATE_API = 'usercenterservice/api/users/createAuthority';
//  权限管理--角色管理--删除 DELETE /api/users/deleteAuthority
export const ROLES_DELETE_API = 'usercenterservice/api/users/deleteAuthority';
//     人员管理  组合角色管理 机构管理的接口
// 权限管理--人员管理GET /api/users  admin使用 POST /api/account
// export const PERSONNEL_API = 'usercenterservice/api/users';
export const PERSONNEL_API = 'usercenterservice/api/account';
// 权限管理--人员管理--查询 GET /api/users/searchBy
export const PERSONNEL_SEARCH_API = 'usercenterservice/api/users/searchBy';
// 权限管理--关联--人员管理 baseservice 下 user-by-company-resource的 /api/user-by-companies
export const PERSONNEL_COMPANY_API = 'baseservice/api/user-by-companies';//人员关联机构
// 权限管理--关联--人员管理 机构中移除用户 DELETE /api/user-by-companies/removeUser
export const PERSONNEL_COMPANY_DELETE_USER_API = 'baseservice/api/user-by-companies/removeUser';
// 权限管理--关联--人员管理 获取所有人员 GET /api/user-bycompanies/getAllUsers
export const PERSONNEL_GET_USERS_API = 'baseservice/api/user-by-companies/getAllUsers';
// 权限管理--关联--人员管理 修改密码 PUT /api/users/changePasswordByLogin
export const PERSONNEL_MODIFY_PASSWORD_API = 'usercenterservice/api/users/changePasswordByLogin';
//     机构管理
// 权限管理--机构管理 GET /api/companies
export const COMPANY_API = 'baseservice/api/companies';
// 权限管理--机构管理--获取机构子节点 GET /api/companise/findAllByParent
export const COMPANY_FINDALL_BY_PARENT_API = 'baseservice/api/companise/findAllByParent';
// 权限管理--机构管理--PUT /api/user-by-companies/batchJoinUser 批量添加人员到机构
export const BATCH_JOIN_USER_API = 'baseservice/api/user-by-companies/batchJoinUser';
// 权限管理--机构管理--获取指定机构下的用户login列表 GET /api/user-by-companies/findAllByCompanyAccount
export const FINDLOGIN_BY_COMPANYID_API = 'baseservice/api/user-by-companies/findAllByCompanyAccount';
// 权限管理--机构管理--获取parentId GET /api/user-by-companies/findByLogin
export const COMPANY_FIND_PARENT_ID_API = 'baseservice/api/user-by-companies/findByLogin';
export const MY_COMPANY_API = 'baseservice/api/user-by-companies/findByMe';

//   用户管理
// 用户管理--用户中心，个人信息 获取个人获取用户列表 GET /api/users
export const USERCENTER_API = 'usercenterservice/api/users';
// POST /api/user-by-companies/createUser
export const CREATEUER_API = 'baseservice/api/user-by-companies/createUser';
// DELETE /api/user-by-companies/deleteUser/{login}
export const DELETEUER_API = 'baseservice/api/user-by-companies/deleteUser';
// PUT /api/user-by-companies/updateUser
export const UPDATEUER_API = 'baseservice/api/user-by-companies/updateUser';
//   系统设置
// 系统设置--数据字典 GET /api/dictionaries
export const DICTIONARY_API = 'baseservice/api/dictionaries';

// before
//首页 home模块
// 主页--暴露接口
export const WORKFLOW_HOME_API = 'workflow/api/statistics-applications/total';
export const WORKFLOW_HOME_YEAR_TREND_API = 'workflow/api/statistics-applications/year-trends';
export const WORKFLOW_HOME_MONTH_TREND_API = 'workflow/api/statistics-applications/month-trends';
export const WORKFLOW_HOME_DAY_TREND_API = 'workflow/api/statistics-applications/day-trends';
export const WORKFLOW_HOME_MONTH_TREND_EXPORT_API = 'workflow/api/statistics-applications/month-export';
export const WORKFLOW_HOME_YEAR_TREND_EXPORT_API = 'workflow/api/statistics-applications/year-export';
export const WORKFLOW_HOME_DAY_TREND_EXPORT_API = 'workflow/api/statistics-applications/day-export';
export const WORKFLOW_HOME_BUSINESS_YEAR_TREND_API = 'workflow/api/statistics-applications/module-trends';//业务模块年趋势
export const WORKFLOW_HOME_BUSINESS_MONTH_TREND_API = 'workflow/api/statistics-applications/module-month-trends';//业务模块月趋势
export const WORKFLOW_HOME_BUSINESS_DAY_TREND_API = 'workflow/api/statistics-applications/module-day-trends';//业务模块日趋势
export const WORKFLOW_HOME_BUSINESS_DETAIL_API = 'workflow/api/statistics-applications/module-details';//业务模块趋势
export const WORKFLOW_HOME_BUSINESS_SEARCH_API = 'workflow/api/statistics-applications/module-search';//业务查询
export const WORKFLOW_HOME_GOODS_YEAR_TREND_API = 'workflow/api/statistics-applications/good-trends';//商品年趋势
export const WORKFLOW_HOME_GOODS_MONTH_TREND_API = 'workflow/api/statistics-applications/good-month-trends';//商品月趋势
export const WORKFLOW_HOME_GOODS_DAY_TREND_API = 'workflow/api/statistics-applications/good-day-trends';//商品日趋势
export const WORKFLOW_HOME_GOODS_SEARCH_API = 'workflow/api/statistics-applications/good-search';//商品查询
export const WORKFLOW_HOME_GOODS_TREND_DETAIL_API = 'workflow/api/statistics-applications/good-details';//商品趋势
export const WORKFLOW_HOME_PERSON_YEAR_TREND_API = 'workflow/api/statistics-applications/applicant-trends';//人员年趋势
export const WORKFLOW_HOME_PERSON_MONTH_TREND_API = 'workflow/api/statistics-applications/applicant-month-trends';//人员月趋势
export const WORKFLOW_HOME_PERSON_DAY_TREND_API = 'workflow/api/statistics-applications/applicant-day-trends';//人员日趋势
export const WORKFLOW_HOME_PERSON_SEARCH_API = 'workflow/api/statistics-applications/applicant-search';//人员查询
export const WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API = 'workflow/api/statistics-applications/applicant-details';//人员分析明细
export const WORKFLOW_HOME_DETAIL_PERSON_API = 'workflow/api/statistics-applications/applicant';//人员分析明细
export const WORKFLOW_HOME_DETAIL_BUSINESS_API = 'workflow/api/statistics-applications/module';//业务分析明细
export const WORKFLOW_HOME_DETAIL_GOODS_API =  'workflow/api/statistics-applications/good';//商品分析明细

// 工资条
export const WORKFLOW_TO_SALARY_API = 'workflow/api/toSalary';
export const WORKFLOW_TO_APERATIONSATES_SALARY_API = 'workflow/api/aperation-states/salary';
export const WORKFLOW_TO_SALARY_SEARCH_API = 'workflow/api/aperation-states/search-salary';
export const WORKFLOW_TO_SALARY_KEYCODE_API = 'workflow/api/salary-records/key-code';
export const WORKFLOW_TO_SALARY_DETAIL_SEARCH_API = 'workflow/api/salary-records/search-salary-records';
// 考勤
export const WORKFLOW_TO_ATTENDANCE_API = 'workflow/api/import-attendance';
export const WORKFLOW_TO_APERATIONSATES_ATTENDANCE_API = 'workflow/api/aperation-states/attendance';
export const WORKFLOW_TO_ATTENDANCE_SEARCH_API = 'workflow/api/aperation-states/search-attendance';
export const WORKFLOW_TO_ATTENDANCE_KEYCODE_API = 'workflow/api/attendance-records/key-code';
export const WORKFLOW_TO_ATTENDANCE_DETAIL_SEARCH_API = 'workflow/api/attendance-records/search-attendance-records';
export const WORKFLOW_TO_ATTENDANCE_IMPORT_DK_API = 'workflow/api/sign-ins/import-sign-ins';
export const WORKFLOW_TO_ATTENDANCE_IMPORT_DK_BIND_API = 'workflow/api/local-users/jobnum-binding';
export const WORKFLOW_TO_ATTENDANCE_IMPORT_DK_DEPARTMENT_LIST_API = 'workflow/api/local-users/department-list';
export const WORKFLOW_TO_ATTENDANCE_IMPORT_DK_DEPARTMENT_USER_LIST_API = 'workflow/api/local-users/department-user-list';
//部门
export const WORKFLOW_DINGDING_DEPARTMENT_LIST_API = 'workflow/api/dingding/getDepartmentList';
export const WORKFLOW_DINGDING_DEPARTMENT_USER_API = 'workflow/api/dingding/getDepartmentUser';

export const WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API = 'workflow/api/dingding/get_department_page';
export const WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API = 'workflow/api/dingding/get_department_page/search';

//错漏发售后登记管理
export const WORKFLOW_CUO_LOU_FA_API = 'workflow/api/error-delivery-records';
export const WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API = 'workflow/api/errorDeliveryRecord/viewDataYear' ;
export const WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API = 'workflow/api/errorDeliveryRecord/viewDataMonth';
export const WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API = 'workflow/api/errorDeliveryRecord/viewDataDay' ;
export const WORKFLOW_CUO_LOU_FA_SEARCH_BY_API = 'workflow/api/search-ErrorDeliveryRecord' ;
export const WORKFLOW_CUO_LOU_FA_BATCH_EDIT_API = 'workflow/api/error-delivery-records/LotUpdateStatus' ;
export const WORKFLOW_CUO_LOU_FA_BATCH_DELETE_API = 'workflow/api/error-delivery-records/LotDeleteStatus' ;
export const WORKFLOW_CUO_LOU_FA_EXPORT_API = 'workflow/api/errorDeliveryRecord/export';

//负面评价采集
export const WORKFLOW_APPRAISE_API = 'workflow/api/appraises';
export const WORKFLOW_APPRAISE_ORDER_API = 'workflow/api/appraise-orders';
export const WORKFLOW_UPLOAD_PARSE_HTML_API = 'workflow/api/parseHtml';

export const WORKFLOW_APPRAISE_SEARCH_BY_CUSTOMID_API = 'workflow/api/appraise-orders/findAllByCustomerId';
export const WORKFLOW_APPRAISE_SEARCH_BY_GOODSID_API = 'workflow/api/appraise-orders/findAllByGoodsId';
export const WORKFLOW_APPRAISE_SEARCH_BY_ORDERCODE_API = 'workflow/api/appraise-orders/findAllByOrderCode';
export const WORKFLOW_APPRAISE_SEARCH_BY_LABELS_API = 'workflow/api/appraise-orders/findAllByLabels';
export const WORKFLOW_APPRAISE_SEARCH_BY_CONTENT_API = 'workflow/api/appraise-orders/findAllByContent';
export const WORKFLOW_APPRAISE_SEARCH_BY_STORE_NAME_API = 'workflow/api/appraise-orders/findByStoreName';
export const WORKFLOW_APPRAISE_FIND_BY_TIME_BETWEEN_API = 'workflow/api/appraise-orders/findByTimeBetween';
export const WORKFLOW_APPRAISE_BATCH_MODIFY_API = 'workflow/api/appraise-orders/batchModify';
export const WORKFLOW_APPRAISE_BATCH_DELETE_API = 'workflow/api/appraise-orders/batchDelete';

// 店铺
export const WORKFLOW_SHOP_API = 'workflow/api/shops';
export const WORKFLOW_SHOP_SEARCH_API = 'workflow/api/_search/shops';

// 品牌
export const WORKFLOW_BRAND_API = 'workflow/api/brands';
export const WORKFLOW_BRAND_SEARCH_API = 'workflow/api/_search/brands';

// 商品
export const WORKFLOW_GOOD_API = 'workflow/api/goods';
export const WORKFLOW_GOOD_SEARCH_API = 'workflow/api/goods/search';
export const WORKFLOW_GOOD_DETAI_API = 'workflow/api/goods/detail';
export const WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API = 'workflow/api/goods/search'; // 根据店铺和品牌获取商品

// 商品SKU
export const WORKFLOW_GOOD_SKU_API = 'workflow/api/good-skus';
export const WORKFLOW_GOOD_SKU_SEARCH_API = 'workflow/api/_search/good-skus';

//平台
export const WORKFLOW_PLATFORM_API = 'workflow/api/platforms';
export const WORKFLOW_PLATFORM_SEARCH_API = 'workflow/api/_search/platforms';
export const TEST_API = 'workflow/api/tree-menus/tree';

//帮助规则
export const WORKFLOW_HELP_ROLES_API = 'workflow/api/help-roles';

// 钉钉权限--模块管理--业务模块
export const WORKFLOW_BUSINESS_MODULE_API = 'workflow/api/business-modules';
export const WORKFLOW_BUSINESS_MODULE_GET_CHILD_OR_PARENT_MODULES_API = 'workflow/api/business-modules/parent-or-child';
export const WORKFLOW_BUSINESS_MODULE_ADD_CHILD_RELATIONSHIP_API = 'workflow/api/business-modules/add-child-relationship';
export const WORKFLOW_BUSINESS_MODULE_ADD_PARENT_RELATIONSHIP_API =  'workflow/api/business-modules/add-parent-relationship';
export const WORKFLOW_BUSINESS_MODULE_REMOVE_RELATIONSHIP_API =  'workflow/api/business-modules/remove-relationship';

// 产品管理--价格申请--暴露接口
export const WORKFLOW_PRICE_MANAGE_API =  'workflow/api/price-manages';
export const WORKFLOW_PRICE_MANAGE_UPDATE_API =  'workflow/api/price-manages/change';
export const WORKFLOW_PRICE_MANAGE_SEARCH_API = 'workflow/api/price-manages/search';

// 产品管理--预售申请--暴露接口
export const WORKFLOW_PRESELLS_API =  'workflow/api/presells';
export const WORKFLOW_PRESELLS_SEARCH_API =  'workflow/api/presells/search';

// 产品管理--上下架--暴露接口
export const WORKFLOW_SHELVES_API = 'workflow/api/shelves-manages';
export const WORKFLOW_SHELVES_SEARCH_API = 'workflow/api/shelves-manages/search';

// 产品管理--库存调拨--暴露接口
export const WORKFLOW_STOCK_MANAGE_API = 'workflow/api/storage-transfers';
export const WORKFLOW_STOCK_MANAGE_SEARCH_API =  'workflow/api/storage-transfers/search';

// 推广管理--直通车--暴露接口
export const WORKFLOW_ZHI_TONG_CHE_API = 'workflow/api/zhi-tong-ches';
export const WORKFLOW_ZHI_TONG_CHE_EXPORT_API = 'workflow/api/zhi-tong-ches/export';
export const WORKFLOW_ZHI_TONG_CHE_SEARCH_API = 'workflow/api/zhi-tong-ches/search';
// export const WORKFLOW_ZHI_TONG_CHE_DETAIL_API = 'workflow/api/zhi-tong-ches/detail';

// 推广管理--达人--暴露接口
export const WORKFLOW_DA_REN_API = 'workflow/api/da-rens';
export const WORKFLOW_DA_REN_EXPORT_API = 'workflow/api/da-rens/export';
export const WORKFLOW_DA_REN_SEARCH_API = 'workflow/api/da-rens/search';
// export const WORKFLOW_DA_REN_DETAIL_API = 'workflow/api/da-rens/detail';

// 推广管理--淘宝客--暴露接口
export const WORKFLOW_TAO_KE_API = 'workflow/api/tao-kes';
export const WORKFLOW_TAO_KE_EXPORT_API = 'workflow/api/tao-kes/export';
export const WORKFLOW_TAO_KE_SEARCH_API = 'workflow/api/tao-kes/search';
// export const WORKFLOW_TAO_KE_DETAIL_API = 'workflow/api/tao-kes/detail';

// 推广管理--短信--暴露接口
export const WORKFLOW_MESSAGE_API = 'workflow/api/sms-applies';
export const WORKFLOW_MESSAGE_SEARCH_API = 'workflow/api/sms-applies/search';
// export const WORKFLOW_MESSAGE_DETAIL_API = 'workflow/api/sms-applies/detail';

// 推广管理--钻展--暴露接口
export const WORKFLOW_ZUAN_ZHAN_API =  'workflow/api/zuan-zhans';
export const WORKFLOW_ZUAN_ZHAN_EXPORT_API = 'workflow/api/zuan-zhans/export';
export const WORKFLOW_ZUAN_ZHAN_SEARCH_API = 'workflow/api/zuan-zhans/search';
export const WORKFLOW_ZUAN_ZHAN_DETAIL_API = 'workflow/api/zuan-zhans/detail';

// 促销管理--预售--暴露接口
export const WORKFLOW_GIFTS_API = 'workflow/api/gift-applies';
export const WORKFLOW_GIFTS_SEARCH_API = 'workflow/api/gift-applies/search';

// 促销管理--优惠券--暴露接口
export const WORKFLOW_COUPONS_COUPON_API = 'workflow/api/discounts/coupon';
export const WORKFLOW_COUPONS_API = 'workflow/api/discounts';
export const WORKFLOW_COUPONS_SEARCH_API = 'workflow/api/discounts/coupon-search';

// 促销管理--满减--暴露接口
export const WORKFLOW_REDUCES_LESS_API =  'workflow/api/discounts/less';
export const WORKFLOW_REDUCES_API = 'workflow/api/discounts';
export const WORKFLOW_REDUCES_LESS_SEARCH_API = 'workflow/api/discounts/less-search';

// 钉钉权限--权限设置--角色管理
export const WORKFLOW_DINGDING_PERMISSION_ROLES_API = 'workflow/api/roles';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API = 'workflow/api/roles/add-person-role';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API = 'workflow/api/roles/delete-person-role';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API = 'workflow/api/roles/get_all';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API = 'workflow/api/roles/by-person';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_SEARCH_API = 'workflow/api/roles/search';

// 钉钉权限--权限设置--人员管理
export const WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API = 'workflow/api/local-users';
export const WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API = 'workflow/api/local-users/search';

// 公司人员信息
export const WORKFLOW_GET_DEPARTMENT_USER_API = 'workflow/api/dingding/getDepartmentUser'; // 获取部门人员

// 消息管理
export const TASK_MESSAGE_API = 'baseservice/api/messages';
export const TASK_ALI_SMS_PUSH_API = 'baseservice/api/ali-sms-push-records';
export const TASK_BAIDU_PUSH_RECORD_API = 'baseservice/api/baidu-push-records';
export const TASK_BAIDU_PUSH_TO_ALL_API = 'baseservice/api/BaiduPush/toDevice';// 百度推送给全部用户
export const TASK_BAIDU_PUSH_TO_SINGLE_API = 'baseservice/api/BaiduPush/toSingleDevice';// 百度推送给特定用户
export const TASK_BAIDU_PUSH_TO_TAG_API = 'baseservice/api/BaiduPush/toTag';// 百度推送给tag组用户

export const TASK_BAIDU_PUSH_QUERY_MSG_STATUS_API = 'baseservice/api/BaiduPush/queryMsgStatus';// 百度推送给tag组用户
export const TASK_BAIDU_PUSH_DEVICE_NUM_IN_TAG_API = 'baseservice/api/BaiduPush/queryDevicesNumInTag';// 百度推送给tag组用户
export const TASK_BAIDU_PUSH_ADD_DEVICE_TO_TAG_API = 'baseservice/api/BaiduPush/addDevicesToTag';// 百度推送给tag组用户
export const TASK_BAIDU_PUSH_DEL_DEVICE_FROM_TAG_API = 'baseservice/api/BaiduPush/deconsteDevicesFromTag';// 百度推送给tag组用户
export const TASK_BAIDU_PUSH_CREATE_TAG_API = 'baseservice/api/BaiduPush/createTag';// 百度推送给tag组用户
export const TASK_BAIDU_PUSH_QUERY_TAG_API = 'baseservice/api/BaiduPush/queryTags';// 百度推送给tag组用户
export const TASK_BAIDU_PUSH_DEL_TAG_API = 'baseservice/api/BaiduPush/deconsteTag';// 百度推送给tag组用户

//消息中心--暴露接口
export const WORKFLOW_NOTICE_API =  'workflow/api/announcements';

// 钉钉权限
//  钉钉权限--权限设置--业务审批权限
export const WORKFLOW_BUSINESS_PERMISSION_API = 'workflow/api/business-permissions';
export const WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API = 'workflow/api/business-module-permissions';
export const WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API = 'workflow/api/business-permissions/by-moduleId';
export const WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API =  'workflow/api/business-permissions/approve-permissions';
export const WORKFLOW_BUSINESS_PERMISSION_SEARCH_API = 'workflow/api/business-permissions/search';


// export const TEST_API = 'workflow/api/local-users/menu';
