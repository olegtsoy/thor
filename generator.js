'use strict';

/**
 * Generate a UTF-8 messages that we will be send to a connected client.
 *
 * @async
 * @param {Number} size The specified in bytes for the message.
 * @param {Function} fn The callback function for the data.
 * @public
 */
exports.utf8 = function utf(size, fn) {
  var key = 'utf8::'+ size
    , cached = cache[key];

  // Start custom msg
  var msg = '{"commandName":"Connect","commandUniqueId":"12345","userData":{"okId":777,"firstName":"Oleg","lastName":"Tsoy","gender":"m","birthday":"1992-20-05","age":22,"location":"Piter","nickName":"Alligator:2000","accountBill":1000,"avatarUrl":"123","registrationId":"APA91bGnsHLfJQY8ffpj6wfacg4bfIjDE6QhueORRX3UnhN_b4pUEiXAKLPwBYkAGcPst3vEwYb25NWquv2azBCDZ5rjIHFt1cGLuRU2g68VOLK0Rgrj4c-2WlTZCCKxuqZDaynM6sBV_TcXDBTc8_GrOzqFfZhNOGUQNibFBQot_87eQBEKIPc"}}';
  // End
  // We have a cached version of this size, return that instead.
  // Start
  if (cached) return fn(undefined, msg);
  //if (cached) return fn(undefined, cached);
  // End

  cached = cache[key] = new Buffer(size).toString('utf-8');
  // Start
  fn(undefined, cached);
  //fn(undefined, cached);
  // End
};

/**
 * Generate a binary message that we will be send to a connected client.
 *
 * @async
 * @param {Number} size The specified in bytes for the message.
 * @param {Function} fn The callback function for the data.
 * @public
 */
exports.binary = function binary(size, fn) {
  var key = 'binary::'+ size
    , cached = cache[key];

  // We have a cached version of this size, return that instead.
  if (cached) return fn(undefined, cached);

  cached = cache[key] = new Buffer(size);
  fn(undefined, cached);
};

//
// The following is not needed to create a session file. We don't want to
// re-create & re-allocate memory every time we receive a message so we cache
// them in a variable.
//
var cache = Object.create(null);
