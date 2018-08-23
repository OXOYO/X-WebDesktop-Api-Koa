'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by OXOYO on 2017/11/21.
 *
 * des 加密
 */

var crypto = require('crypto');

exports.default = {
  algorithm: {
    ecb: 'des-ecb',
    cbc: 'des-cbc'
  },
  encrypt: function encrypt(key, plaintext, iv) {
    key = new Buffer(key);
    iv = new Buffer(iv);
    var cipher = crypto.createCipheriv(this.algorithm.ecb, key, iv);
    // default true
    cipher.setAutoPadding(true);
    var ciph = cipher.update(plaintext, 'utf8', 'base64');
    ciph += cipher.final('base64');
    return ciph;
  },
  decrypt: function decrypt(encryptText, iv) {
    var key = new Buffer(key);
    iv = new Buffer(iv);
    var decipher = crypto.createDecipheriv(this.algorithm.ecb, key, iv);
    decipher.setAutoPadding(true);
    var txt = decipher.update(encryptText, 'base64', 'utf8');
    txt += decipher.final('utf8');
    return txt;
  }
};