var fs = require('fs');

exports = module.exports = require('micro-tpl');

exports.cache = {};

exports.helper = {
  encodeHtml: function (str) {
    return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x60/g, '&#96;').replace(/\x27/g, '&#39;').replace(/\x22/g, '&quot;');
  }
};

exports.__express = function (path, options, fn) {
  if ('function' == typeof options) {
    fn = options, options = undefined;
  }
  if (typeof fn === 'function') {
    var res
    try {
      res = exports(fs.readFileSync(path, 'utf8'), { strict: true, ret: 'function' })(null, exports.helper);
    } catch (ex) {
      return fn(ex);
    }
    return fn(null, res);
  }
  options = options || {};

  var key = path + ':string';

  var str = options.cache
    ? exports.cache[key] || (exports.cache[key] = fs.readFileSync(path, 'utf8'))
    : fs.readFileSync(path, 'utf8');
  return build(str, { strict: true, ret: 'function' })(options, exports.helper);
};