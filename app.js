var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var multer = require('multer');
//引用artTemplate模块
var template = require('art-template');

var routes = require('./routes/index');
var settings = require('./settings');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
template.config('base','');
template.config('extname','.html');
app.engine('.html', template.__express);
app.set('view engine','html');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: settings.cookieSecret,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    url:settings.url
}));
app.use(flash());

/*app.use(function(req, res, next) {
     res.locals.user = req.session.user; // 从session 获取 user对象
     var err = req.session.error; //获取错误信息
     delete req.session.error;
     res.locals.message = ''; // 展示的信息 message
     if (err) {
         res.locals.message = '<div class="alert alert-warning">' + err + '</div>';
     }
     next();
 });*/
routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});