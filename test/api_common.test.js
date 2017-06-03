'use strict';

const API = require('../');
const expect = require('expect.js');
const config = require('./config');

describe('api_common', function () {
  describe('isAccessTokenValid', function () {
    it('should invalid', function () {
      var token = new API.AccessToken('token', new Date().getTime() - 7200 * 1000);
      expect(token.isValid()).not.to.be.ok();
    });

    it('should valid', function () {
      var token = new API.AccessToken('token', new Date().getTime() + 7200 * 1000);
      expect(token.isValid()).to.be.ok();
    });
  });

  describe('isComponentAccessToken', function () {
    it('should invalid', function () {
      var token = new API.ComponentAccessToken('token', new Date().getTime() - 7200 * 1000);
      expect(token.isValid()).not.to.be.ok();
    });

    it('should valid', function () {
      var token = new API.ComponentAccessToken('token', new Date().getTime() + 7200 * 1000);
      expect(token.isValid()).to.be.ok();
    });
  });


  describe('mixin', function () {
    it('should ok', function () {
      API.mixin({sayHi: function () {}});
      expect(API.prototype).to.have.property('sayHi');
    });

    it('should not ok when override method', function () {
      var obj = {sayHi: function () {}};
      expect(API.mixin).withArgs(obj).to.throwException(/Don't allow override existed prototype method\./);
    });
  });

  describe('getComponentAccessToken', function () {
    it('should ok', async function () {
      var api = new API(config.component_appid, config.component_appsecret, config.authorizer_appid, config.authorizer_refresh_token, config.componentVerifyTicket);
      var componentAccessToken = await api.getComponentAccessToken();
      expect(componentAccessToken).to.only.have.keys('componentAccessToken', 'expireTime');
    });

    it('should not ok', async function () {
      var api = new API('component_appid', 'component_appsecret', 'authorizer_appid', 'authorizer_refresh_token', 'componentVerifyTicket');
      try {
        await api.getComponentAccessToken();
      } catch (err) {
        expect(err).to.have.property('name', 'WeChatAPIError');
        expect(err.message).to.contain('invalid appid hint');
      }
    });
  });

  describe('getAccessToken', function () {
    it('should ok', async function () {
      var api = new API(config.component_appid, config.component_appsecret, config.authorizer_appid, config.authorizer_refresh_token, config.componentVerifyTicket);
      var token = await api.getAccessToken();
      expect(token).to.only.have.keys('accessToken', 'expireTime');
    });

    it('should not ok', async function () {
      var api = new API('component_appid', 'component_appsecret', 'authorizer_appid', 'authorizer_refresh_token', 'componentVerifyTicket');
      try {
        await api.getAccessToken();
      } catch (err) {
        expect(err).to.have.property('name', 'WeChatAPIError');
        expect(err.message).to.contain('invalid appid hint');
      }
    });
  });

  describe('getIndustry', function () {
    it('should ok', async function () {
      var api = new API(config.component_appid, config.component_appsecret, config.authorizer_appid, config.authorizer_refresh_token, config.componentVerifyTicket);
      var industry = await api.getIndustry();
      console.log('industry', industry)
      expect(industry).to.only.have.keys('primary_industry', 'secondary_industry');
    });

    it('should not ok', async function () {
      var api = new API('component_appid', 'component_appsecret', 'authorizer_appid', 'authorizer_refresh_token', 'componentVerifyTicket');
      try {
        await api.getIndustry();
      } catch (err) {
        expect(err).to.have.property('name', 'WeChatAPIError');
        expect(err.message).to.contain('invalid appid hint');
      }
    });
  });
});
