'use strict';

const { postJSON } = require('./util');

/**
 * 设置所属行业
 * Examples:
 * ```
 * var industryIds = {
 *  "industry_id1":'1',
 *  "industry_id2":"4"
 * };
 * api.setIndustry(industryIds);
 * ```

 * @param {Object} industryIds 公众号模板消息所属行业编号 */
exports.setIndustry = async function (industryIds) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/api_set_industry?access_token=' + accessToken;
  return this.request(apiUrl, postJSON(industryIds));
};

/**
 * 获取设置的行业信息
 * Examples:
 * ```
 * api.getIndustry();
 * ```
 * Result:
 * ```
 * // 结果示例
 * {
 *   "primary_industry":{"first_class":"运输与仓储","second_class":"快递"},
 *   "secondary_industry":{"first_class":"IT科技","second_class":"互联网|电子商务"}
 * }
 * ```
 */

exports.getIndustry = async function(){
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/get_industry?access_token=' + accessToken;
  return this.request(apiUrl, {dataType: 'json'});
};

/**
 * 获得模板ID
 * Examples:
 * ```
 * var templateIdShort = 'TM00015';
 * api.addTemplate(templateIdShort);
 * ```
 * @param {String} templateIdShort 模板库中模板的编号，有“TM**”和“OPENTMTM**”等形式
 */
exports.addTemplate = async function (templateIdShort) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/api_add_template?access_token=' + accessToken;
  var templateId = {
    template_id_short: templateIdShort
  };
  return this.request(apiUrl, postJSON(templateId));
};

/**
 * 获取模板列表
 * Examples:
 * ```
 * api.getAllPrivateTemplate();
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * // 结果示例
 * {
 *  "template_list": [{
 *       "template_id": "iPk5sOIt5X_flOVKn5GrTFpncEYTojx6ddbt8WYoV5s",
 *       "title": "领取奖金提醒",
 *       "primary_industry": "IT科技",
 *       "deputy_industry": "互联网|电子商务",
 *       "content": "{ {result.DATA} }\n\n领奖金额:{ {withdrawMoney.DATA} }\n领奖  时间:{ {withdrawTime.DATA} }\n银行信息:{ {cardInfo.DATA} }\n到账时间:  { {arrivedTime.DATA} }\n{ {remark.DATA} }",
 *       "example": "您已提交领奖申请\n\n领奖金额：xxxx元\n领奖时间：2013-10-10 12:22:22\n银行信息：xx银行(尾号xxxx)\n到账时间：预计xxxxxxx\n\n预计将于xxxx到达您的银行卡"
 *    }]
 * }
 * ```
 */
exports.getAllPrivateTemplate = async function(){
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/get_all_private_template?access_token=' + accessToken;
  return this.request(apiUrl, {dataType: 'json'});
};

/**
 * 删除模板
 * Examples:
 * ```
 * var templateId = ”Dyvp3-Ff0cnail_CDSzk1fIc6-9lOkxsQE7exTJbwUE”
 * api.delPrivateTemplate(templateId);
 * ```
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok"
 * }
 * ```
 */
exports.delPrivateTemplate = async function(templateId){
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.endpoint + 'template/del_private_template?access_token=' + accessToken;
  var data = {
    template_id: templateId
  };
  this.request(apiUrl, postJSON(data));
};

/**
 * 发送模板消息
 * Examples:
 * ```
 * var templateId: '模板id';
 * // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
 * var url: 'http://weixin.qq.com/download';
 * var topcolor = '#FF0000'; // 顶部颜色
 * var data = {
 *  user:{
 *    "value":'黄先生',
 *    "color":"#173177"
 *  }
 * };
 * api.sendTemplate('openid', templateId, url, topColor, data);
 * ```
 * @param {String} openid 用户的openid
 * @param {String} templateId 模板ID
 * @param {String} url URL置空，则在发送后，点击模板消息会进入一个空白页面（ios），或无法点击（android）
 * @param {String} topColor 顶部颜色
 * @param {Object} data 渲染模板的数据
 */
exports.sendTemplate = async function (openid, templateId, url, topColor, data) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'message/template/send?access_token=' + accessToken;
  var template = {
    touser: openid,
    template_id: templateId,
    url: url,
    topcolor: topColor,
    data: data
  };
  return this.request(apiUrl, postJSON(template));
};
