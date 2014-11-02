express-micro-tpl
=================

> `micro-tpl`的express插件，可使express支持micro-tpl模版。

使用
----

```javascript
var express = require('express')
  , tpl = require('express-micro-tpl');

express()
  .set('views', __dirname + '/views')
  .set('view engine', 'html')
  .engine('html', tpl.__express)
  .get('/', function (req, res) {
    // render views/index.html
    res.render('index', { user: req.user });
  });
```