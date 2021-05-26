import { get, post } from './axios'

/* 分群列表查询
 * basePath:/discern/api/v1/queryUserGroupList
 * @Params:
 *   RequiredParams: [pageSize,pageNum,sortType,]
 *   ParamsBody:
 *     groupShowName:{type: string,description:分组展示名称}
 *     creatorName:{type: string,description:创建人名称}
 *     mineChecked:{type: boolean,description:我创建的checked}
 *     pageSize:{type: string,description:每页条数}
 *     pageNum:{type: string,description:页码}
 *     sortType:{type: integer,description:排序规则0-倒序 1-升序 默认倒序}
 * @Response:
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     data:{type: object,description:undefined}
 *        total:{type: integer,description:数据总数}
 *        list:{type: array,description:undefined}
 *           id:{type: integer,description:主键id}
 *           groupName:{type: string,description:分群名称}
 *           groupShowName:{type: string,description:分群展示名称}
 *           userNum:{type: integer,description:用户数量}
 *           groupUpdateDataTime:{type: string,description:分群数据最近更新时间}
 *           shopName:{type: string,description:站点名称}
 *           creatorName:{type: string,null,description:创建人名称}
 *           createTime:{type: string,description:创建时间}
 *           enableStatusStr:{type: string,description:启用状态}
 *           lastUpdateTime:{type: string,description:最后编辑时间}
 *           lastUpdateUserName:{type: string,description:最后编辑人}
 *           downloadUrl:{type: string,description:下载地址，默认是空字符串,空字符串则不展示下载按钮}
 *        pageNum:{type: number,description:undefined}
 *        pageSize:{type: number,description:undefined}
 *        size:{type: number,description:undefined}
 *        startRow:{type: number,description:undefined}
 *        endRow:{type: number,description:undefined}
 *        pages:{type: number,description:undefined}
 *        prePage:{type: number,description:undefined}
 *        nextPage:{type: number,description:undefined}
 *        isFirstPage:{type: boolean,description:undefined}
 *        isLastPage:{type: boolean,description:undefined}
 *        hasPreviousPage:{type: boolean,description:undefined}
 *        hasNextPage:{type: boolean,description:undefined}
 *        navigatePages:{type: number,description:undefined}
 *        navigatepageNums:{type: array,description:undefined}
 *           type:{type: undefined,description:undefined}
 *        navigateFirstPage:{type: number,description:undefined}
 *        navigateLastPage:{type: number,description:undefined}
 */
export function discernQueryUserGroupList(map) {
  // 分群列表查询
  return post(`${process.env.VUE_APP_DISCERN}/queryUserGroupList`, map).then(
    response => response.data
  )
}

/* 用户群组校验
 * basePath:/discern/api/v1/validGroupName
 * @Params:
 *   RequiredParams: [groupName,groupShowName,shopId,updateType,updateUnit,enableStatus,]
 *   ParamsBody:
 *     groupName:{type: string,description:分组名称}
 *     id:{type: integer,description:主键id，编辑保存时必填}
 *     groupShowName:{type: string,description:分组展示名称}
 *     shopId:{type: integer,description:站点id}
 *     updateType:{type: integer,description:更新方式}
 *     updateUnit:{type: integer,description:更新单位}
 *     enableStatus:{type: integer,description:启用状态}
 * @Response:
 *     success:{type: boolean,description:是否成功}
 *     timeStamp:{type: number,description:时间戳}
 *     retCode:{type: string,description:错误码}
 *     retInfo:{type: string,description:错误信息}
 *     data:{type: null,description:null}
 */
export function discernValidGroupName(map) {
  // 用户群组校验
  return post(`${process.env.VUE_APP_DISCERN}/validGroupName`, map).then(
    response => response.data
  )
}

/* 创建分群
 * basePath:/discern/api/v1/addUserGroup
 * @Params:
 *   RequiredParams: [userId,userName,]
 *   ParamsBody:
 *     groupBase:{type: object,description:分群基本信息}
 *        groupShowName:{type: string,description:分群展示名称}
 *        groupName:{type: string,description:分群名称}
 *        shopId:{type: integer,description:站点id 1-主站 2-德站 3-法站 6-澳站}
 *        updateType:{type: integer,description:更新方式：0-自动， 1-手动}
 *        updateUnit:{type: integer,description:更新单位 :10-天}
 *        remark:{type: string,description:undefined}
 *        enableStatus:{type: integer,description:启用状态 0-启用 1-禁用}
 *     groupCategoryList:{type: array,description:分群分类、规则、条件信息}
 *        code:{type: string,description:二级分类id}
 *        regionId:{type: integer,description:选择国家级联数据时的id}
 *        name:{type: string,description:undefined}
 *        rule:{type: string,description:规则}
 *        conditionList:{type: array,description:条件值}
 *           type:{type: undefined,description:undefined}
 *           mock:{type: undefined,description:undefined}
 *     userId:{type: integer,description:用户id}
 *     userName:{type: string,description:用户姓名}
 * @Response:
 *     data:{type: string,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 */
export function discernAddUserGroup(map) {
  // 创建分群
  return post(`${process.env.VUE_APP_DISCERN}/addUserGroup`, map).then(
    response => response.data
  )
}

/* 查找分类以及分类下的规则项
 * basePath:/discern/api/v1/queryCategoryAndRule
 * @Params:
 *   RequiredParams: []
 *   ParamsBody:
 *     name:{type: string,description:undefined}
 * @Response:
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     data:{type: object,description:undefined}
 *        list:{type: array,description:undefined}
 *           code:{type: string,description:分类编号}
 *           name:{type: string,description:分类名称}
 *           type:{type: string,description:分类下的规则属性SELECT，DATE_RANGE}
 *           rules:{type: array,description:undefined}
 *              type:{type: undefined,description:undefined}
 *              description:{type: undefined,description:undefined}
 */
export function discernQueryCategoryAndRule(map) {
  // 查找分类以及分类下的规则项
  return post(`${process.env.VUE_APP_DISCERN}/queryCategoryAndRule`, map).then(
    response => response.data
  )
}

/* 通过分类查找条件
 * basePath:/discern/api/v1/queryConditionByCategory
 * @Params:
 *   RequiredParams: [code,]
 *   ParamsBody:
 *     code:{type: string,description:二级分类的编码code}
 * @Response:
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     data:{type: object,description:undefined}
 *        list:{type: array,description:undefined}
 *           type:{type: undefined,description:undefined}
 */
export function discernQueryConditionByCategory(map) {
  // 通过分类查找条件
  return post(
    `${process.env.VUE_APP_DISCERN}/queryConditionByCategory`,
    map
  ).then(response => response.data)
}

/* 分群信息查询
 * basePath:/discern/api/v1/queryUserGroupInfo
 * @Params:
 *   RequiredParams: []
 *   ParamsBody:
 *     groupId:{type: number,description:分组id}
 * @Response:
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     data:{type: object,description:undefined}
 *        groupBase:{type: object,description:分群基本信息}
 *           groupShowName:{type: string,description:分群展示名称}
 *           groupName:{type: string,description:分群名称}
 *           shopId:{type: number,description:站点id 1-主站 2-德站 3-法站 6-澳站}
 *           updateType:{type: number,description:更新方式：0-自动， 1-手动}
 *           updateUnit:{type: number,description:更新单位 :10-天}
 *           reamrk:{type: string,description:描述}
 *           enableStatus:{type: number,description:启用状态 0-启用 1-禁用}
 *        groupCategoryList:{type: array,description:分群分类、规则、条件信息}
 *           code:{type: integer,description:二级分类编码}
 *           rule:{type: string,description:规则}
 *           conditionList:{type: array,description:条件列表}
 *              conditionValue:{type: string,description:条件值}
 *              baseConditionId:{type: string,description:基础条件id}
 *           baseCategoryId:{type: string,description:基础分类id}
 *        groupId:{type: integer,description:分组id}
 */
export function discernQueryUserGroupInfo(map) {
  // 分群信息查询
  return post(`${process.env.VUE_APP_DISCERN}/queryUserGroupInfo`, map).then(
    response => response.data
  )
}

/* 编辑分群
 * basePath:/discern/api/v1/editUserGroup
 * @Params:
 *   RequiredParams: [groupId,userId,userName,]
 *   ParamsBody:
 *     groupBase:{type: object,description:分群基本信息}
 *        groupShowName:{type: string,description:分群展示名称}
 *        groupName:{type: string,description:分群名称}
 *        shopId:{type: integer,description:站点id 1-主站 2-德站 3-法站 6-澳站}
 *        updateType:{type: integer,description:更新方式：0-自动， 1-手动}
 *        updateUnit:{type: integer,description:更新单位 :10-天}
 *        remark:{type: string,description:undefined}
 *        enableStatus:{type: integer,description:启用状态 0-启用 1-禁用}
 *     groupCategoryList:{type: array,description:分群分类、规则、条件信息}
 *        code:{type: integer,description:二级分类id}
 *        regionId:{type: integer,description:区域级联id}
 *        name:{type: string,description:undefined}
 *        rule:{type: integer,description:规则id}
 *        conditionList:{type: array,description:条件值}
 *           type:{type: undefined,description:undefined}
 *        baseCategoryId:{type: string,description:基础分类id}
 *     groupId:{type: string,description:分群id}
 *     userId:{type: string,description:用户id}
 *     userName:{type: string,description:用户姓名}
 * @Response:
 *     data:{type: string,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 */
export function discernEditUserGroup(map) {
  // 编辑分群
  return post(`${process.env.VUE_APP_DISCERN}/editUserGroup`, map).then(
    response => response.data
  )
}

/* 二级分类列表
 * basePath:/discern/api/v1/userinsight/labels
 * @Params:
 *   RequiredParams: [name,]
 *   ParamsBody:
 *     name:{desc:支持模糊查询}
 * @Response:
 *     success:{type: boolean,description:接口返回状态，true：成功；false:失败}
 *     timeStamp:{type: number,description:接口返回时间戳}
 *     retCode:{type: string,description:若请求发生错误，则返回错误信息码}
 *     retInfo:{type: string,description:若请求发生错误，则返回错误信息详情}
 *     data:{type: object,description:数据值}
 *        list:{type: array,description:列表}
 *           name:{type: string,description:二级归类名称}
 *           code:{type: string,description:二级归类编码}
 *           type:{type: string,description:二级归类对应值类型：SELECT，DATE_RANGE}
 *           rules:{type: array,description:二级归类对应规则限制数据值类型：EQUALS,NOT_EQUALS,IN,NOT_IN,BETWEEN,NOT_BETWEEN}
 *              type:{type: undefined,description:undefined}
 */
export function discernLabels(map) {
  // 二级分类列表
  return get(`${process.env.VUE_APP_DISCERN}/userinsight/labels`, map).then(
    response => response.data
  )
}

/* 二级分类对应的值范围
 * basePath:/discern/api/v1/userinsight/labels/{code}/values
 * @Params:
 *   RequiredParams: []
 *   ParamsBody:
 * @Response:
 *     success:{type: boolean,description:接口返回状态，true：成功；false:失败}
 *     timeStamp:{type: number,description:数据返回时的服务器时间戳}
 *     retCode:{type: string,description:若请求发生错误，则返回错误信息码}
 *     retInfo:{type: string,description:若请求发生错误，则返回错误信息详情}
 *     data:{type: array,description:列表值}
 */
export function discernValues(map) {
  // 二级分类对应的值范围
  return get(
    `${process.env.VUE_APP_DISCERN}/userinsight/labels/{code}/values`,
    map
  ).then(response => response.data)
}

/* 国家列表
 * basePath:/discern/api/v1/userinsight/countries
 * @Params:
 *   RequiredParams: [shopId,]
 *   ParamsBody:
 *     shopId:{desc:shopify站点id}
 * @Response:
 *     success:{type: boolean,description:接口返回状态，true：成功；false:失败}
 *     timeStamp:{type: number,description:数据返回时的服务器时间戳}
 *     retCode:{type: string,description:若请求发生错误，则返回错误信息码}
 *     retInfo:{type: string,description:若请求发生错误，则返回错误信息详情}
 *     data:{type: array,description:国家值范围}
 *        type:{type: undefined,description:undefined}
 *        description:{type: undefined,description:undefined}
 */
export function discernCountries(map) {
  // 国家列表
  return get(`${process.env.VUE_APP_DISCERN}/userinsight/countries`, map).then(
    response => response.data
  )
}

/* 省份列表
 * basePath:/discern/api/v1/userinsight/provinces
 * @Params:
 *   RequiredParams: [shopId,country,]
 *   ParamsBody:
 *     shopId:{desc:shopify站点id}
 *     country:{desc:国家}
 * @Response:
 *     success:{type: boolean,description:接口返回状态，true：成功；false:失败}
 *     timeStamp:{type: number,description:数据返回时的服务器时间戳}
 *     retCode:{type: string,description:若请求发生错误，则返回错误信息码}
 *     retInfo:{type: string,description:若请求发生错误，则返回错误信息详情}
 *     data:{type: array,description:省份值范围}
 *        type:{type: undefined,description:undefined}
 *        description:{type: undefined,description:undefined}
 */
export function discernProvinces(map) {
  // 省份列表
  return get(`${process.env.VUE_APP_DISCERN}/userinsight/provinces`, map).then(
    response => response.data
  )
}

/* 城市列表
 * basePath:/discern/api/v1/userinsight/citys
 * @Params:
 *   RequiredParams: [shopId,province,]
 *   ParamsBody:
 *     shopId:{desc:shopify站点id}
 *     province:{desc:省份}
 * @Response:
 *     success:{type: boolean,description:接口返回状态，true：成功；false:失败}
 *     timeStamp:{type: number,description:数据返回时的服务器时间戳}
 *     retCode:{type: string,description:若请求发生错误，则返回错误信息码}
 *     retInfo:{type: string,description:若请求发生错误，则返回错误信息详情}
 *     data:{type: array,description:城市值范围}
 *        type:{type: undefined,description:undefined}
 *        description:{type: undefined,description:undefined}
 */
export function discernCitys(map) {
  // 城市列表
  return get(`${process.env.VUE_APP_DISCERN}/userinsight/citys`, map).then(
    response => response.data
  )
}

/* 查询用户群
 * basePath:/discern/api/v1/userinsight/customers
 * @Params:
 *   RequiredParams: []
 *   ParamsBody:
 *     shopId:{type: number,description:站点id}
 *     mergeType:{type: string,description:数据组合方式：AND,OR}
 *     userGroupRules:{type: array,description:规则列表}
 *        mergeType:{type: string,description:数据组合方式：AND,OR}
 *        userGroupRules:{type: array,description:规则列表}
 *           dimensionCode:{type: string,description:二级分类code}
 *           rule:{type: string,description:rule名称，IN，NOT_IN,BETWEEN,NOT_BEWEEN,EQUALS,NOT_EQUALS}
 *           values:{type: string,description:list列表值，多个以,分割}
 * @Response:
 *     success:{type: boolean,description:接口返回状态，true：成功；false:失败}
 *     timeStamp:{type: number,description:数据返回时的服务器时间戳}
 *     retCode:{type: string,description:若请求发生错误，则返回错误信息码}
 *     retInfo:{type: string,description:若请求发生错误，则返回错误信息详情}
 *     data:{type: object,description:数据}
 *        ossPath:{type: string,description:oss路径}
 *        cnt:{type: integer,description:查询返回的用户数量}
 */
export function discernCustomers(map) {
  // 查询用户群
  return post(`${process.env.VUE_APP_DISCERN}/userinsight/customers`, map).then(
    response => response.data
  )
}

/* 更新分群用户数据(调用大数据计算)
 * basePath:/discern/api/v1/calcGroupData
 * @Params:
 *   RequiredParams: [userId,userName,]
 *   ParamsBody:
 *     groupBase:{type: object,description:分群基本信息}
 *        groupShowName:{type: string,description:分群展示名称}
 *        groupName:{type: string,description:分群名称}
 *        shopId:{type: integer,description:站点id 1-主站 2-德站 3-法站 6-澳站}
 *        updateType:{type: integer,description:更新方式：0-自动， 1-手动}
 *        updateUnit:{type: integer,description:更新单位 :10-天}
 *        remark:{type: string,description:undefined}
 *        enableStatus:{type: integer,description:启用状态 0-启用 1-禁用}
 *     groupCategoryList:{type: array,description:分群分类、规则、条件信息}
 *        code:{type: integer,description:二级分类id}
 *        regionId:{type: integer,description:undefined}
 *        name:{type: string,description:undefined}
 *        rule:{type: integer,description:规则id}
 *        conditionList:{type: array,description:条件值}
 *           type:{type: undefined,description:undefined}
 *     userId:{type: string,description:用户id}
 *     userName:{type: string,description:用户姓名}
 * @Response:
 *     data:{type: string,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 */
export function discernCalcGroupData(map) {
  // 更新分群用户数据(调用大数据计算)
  return post(`${process.env.VUE_APP_DISCERN}/calcGroupData`, map).then(
    response => response.data
  )
}

/* 查询国家
 * basePath:/discern/api/v1/queryCountryList
 * @Params:
 *   RequiredParams: [shopId,]
 *   ParamsBody:
 *     shopId:{desc:}
 * @Response:
 */
export function discernQueryCountryList(map) {
  // 查询国家
  return get(`${process.env.VUE_APP_DISCERN}/queryCountryList`, map).then(
    response => response.data
  )
}

/* 查询国家下的state数据
 * basePath:/discern/api/v1/queryStateList
 * @Params:
 *   RequiredParams: [shopId,country,]
 *   ParamsBody:
 *     shopId:{desc:}
 *     country:{desc:}
 * @Response:
 */
export function discernQueryStateList(map) {
  // 查询国家下的state数据
  return get(`${process.env.VUE_APP_DISCERN}/queryStateList`, map).then(
    response => response.data
  )
}

/* 查询城市数据
 * basePath:/discern/api/v1/queryCityList
 * @Params:
 *   RequiredParams: [shopId,province,country,]
 *   ParamsBody:
 *     shopId:{desc:}
 *     province:{desc:}
 *     country:{desc:02/19新增参数}
 * @Response:
 */
export function discernQueryCityList(map) {
  // 查询城市数据
  return get(`${process.env.VUE_APP_DISCERN}/queryCityList`, map).then(
    response => response.data
  )
}

/* 分群计算详情
 * basePath:/discern/api/v1/queryCalcUserGroupInfo
 * @Params:
 *   RequiredParams: []
 *   ParamsBody:
 *     pageNum:{type: integer,description:undefined}
 *     pageSize:{type: integer,description:undefined}
 *     groupId:{type: integer,description:undefined}
 * @Response:
 *     success:{type: boolean,description:undefined}
 *     timeStamp:{type: number,description:undefined}
 *     retCode:{type: string,description:undefined}
 *     retInfo:{type: string,description:undefined}
 *     data:{type: object,description:undefined}
 *        userNum:{type: integer,description:分群人数}
 *        groupUpdateDataTime:{type: string,description:最后一次更新成功时间}
 *        calcList:{type: array,description:undefined}
 *           calcBaseTime:{type: string,description:计算基准时间}
 *           userNum:{type: integer,description:分群人数}
 *           calcStatus:{type: number,description:计算详情 0-成功 1-失败 2-更新中}
 *           downloadUrl:{type: string,description:计算成功后的下载url}
 */
export function discernQueryCalcUserGroupInfo(map) {
  // 分群计算详情
  return post(
    `${process.env.VUE_APP_DISCERN}/queryCalcUserGroupInfo`,
    map
  ).then(response => response.data)
}
