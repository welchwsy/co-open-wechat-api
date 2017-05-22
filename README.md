微信公共平台第三方平台Node库API，ES6版本,基于https://github.com/node-webot/co-wechat-api 3.0.0版本(ES6版)
===========
微信公共平台第三方平台Node库API，ES6版本,基于https://github.com/node-webot/co-wechat-api 3.0.0版本

## 功能列表
- 发送客服消息（文本、图片、语音、视频、音乐、图文）
- 菜单操作（查询、创建、删除、个性化菜单）
- 二维码（创建临时、永久二维码，查看二维码URL）
- 分组操作（查询、创建、修改、移动用户到分组）
- 用户信息（查询用户基本信息、获取关注者列表）
- 媒体文件（上传、获取）
- 群发消息（文本、图片、语音、视频、图文）
- 客服记录（查询客服记录，查看客服、查看在线客服）
- 群发消息
- 公众号支付（发货通知、订单查询）
- 微信小店（商品管理、库存管理、邮费模板管理、分组管理、货架管理、订单管理、功能接口）
- 模版消息
- 网址缩短
- 语义查询
- 数据分析
- JSSDK服务端支持
- 素材管理
- 摇一摇周边

详细参见[API文档](http://doxmate.cool/node-webot/co-wechat-api/api.html)


## Installation

```sh
$ npm install co-open-wechat-api
// or
$ npm install https://github.com/welchwsy/co-open-wechat-api.git
```

## Usage

```js
var OpenWechatAPI = require('co-open-wechat-api');

async function() {
  var api = new OpenWechatAPI('component_appid', 'component_appsecret', 'authorizer_appid', 'authorizer_refresh_token', 'componentVerifyTicket');
  var result = await api.updateRemark('open_id', 'remarked');
}
```

### 多进程
当多进程时，当多进程时，component token和access token需要全局维护，以下为保存component token和access token的接口。：

```js
var api = new API('component_appid', 'component_appsecret', 'authorizer_appid', 'authorizer_refresh_token', 'component_verify_ticket', async function () {
   // 传入一个获取全局component_token的方法
   var txt = await fs.readFile('component_token.txt', 'utf8');
   return JSON.parse(txt);
 }, async function (component_token) {
   // 请将component_token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
   await fs.writeFile('component_token.txt', JSON.stringify(component_token));
 }, async function () {
   // 传入一个获取全局token的方法
   var txt = await fs.readFile('appid_token.txt', 'utf8');
   return JSON.parse(txt);
 }, async function (token) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
   await fs.writeFile('appid_token.txt', JSON.stringify(token));
 });
```

## Show cases
### Node.js API自动回复


欢迎关注。


## 详细API
原始API文档请参见：[消息接口指南](http://mp.weixin.qq.com/wiki/index.php?title=消息接口指南)。
## License
The MIT license.

## 交流群
QQ群：157964097，使用疑问，开发，贡献代码请加群。

## 感谢
感谢[node-webot](https://github.com/node-webot)

## 捐赠
如果您觉得Wechat对您有帮助，欢迎请作者一杯咖啡
捐赠co-open-wechat-api
![捐赠co-open-wechat-api](http://douhaoxinxi.oss-cn-shanghai.aliyuncs.com/weixin/mm_facetoface_collect_qrcode_1495453447447.png)
捐赠wechat
![捐赠wechat](https://cloud.githubusercontent.com/assets/327019/2941591/2b9e5e58-d9a7-11e3-9e80-c25aba0a48a1.png)

或者[![](http://img.shields.io/gratipay/JacksonTian.svg)](https://www.gittip.com/JacksonTian/)
