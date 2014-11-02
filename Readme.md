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


基本功能
--------

#### 执行脚本

```html
<% 
// you javascript code here
console.log('hello world'); 
%>
```

#### 返回字符

```html
<p><%='hello'%><p>
```
会返回`<p>hello</p>`。

#### 转义字符

```html
<p><%=='<p>hello</p>'%></p>
```

#### include模版

```html
<%=include('./tpl.html')(data)%>
```
会include相对于本模版的tpl.html文件，可以多重include，发生循环引用时会抛出错误。