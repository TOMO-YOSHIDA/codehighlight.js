/// <reference path="../typings/node/node.d.ts" />;
// Node.jsの型定義ファイルの読み込み

/**
 * Module dependencies.
 */

var express = require('express')
	// , login = require('./routes/login')
	, http = require('http')
	, https = require('https')
	, fs = require('fs')
	, path = require('path')
	, session = require('express-session')
	, connect = require('connect')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, morgan = require('morgan')

	// codehighlight.js固有
	;
var app = express();

// // all environments
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');

// app.use(session({secret: 'konan-jhs blackboard system'}));

// app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
// app.use(bodyParser.json());// parse application/json
// app.use(methodOverride());// simulate DELETE and PUT
console.log(`static path:${path.join(__dirname, '../')}`);
app.use(express.static(path.join(__dirname, '../')));

// app.use(morgan(':date[iso] :method :status :response-time ms :url'));

// app.use(require('errorhandler')());

// // テーブル情報の取得
// require('./scripts/SqlHelper').cacheTableInfo();

// // // httpならhttpsへリダイレクト -> 2015.03.25 いったんHTTPS転送はやめる
// // var redirectHttps = function(req,res,next){
// // 	if(req.protocol !== 'https'){
// // 		res.redirect('https://' + req.headers.host + "/");
// // 	} else {
// // 		next();
// // 	}
// // };
// // app.all("*", redirectHttps);

// // routerのセット
// app.get("/login",login.init);
// app.post("/login",login.check);
// app.all("/logout",login.logout)

// app.all("*",login.hasSession);

// app.get('/', routes.index);//初期画面
// app.get('/main',routes.main);
// app.get('/wait',routes.wait);
// app.get('/info/get/:date?', info.get);//連絡の表示
// app.get('/info/list/:viewFor?/:label?',info.all);//HTMLの表示
// app.get('/info/monitor', info.monitor);
// app.get('/print/:viewFor?/:label?',info.print);//印刷画面の表示
// app.post('/info/regist', info.regist);//連絡の登録
// app.post('/info/update', info.update);//連絡の更新
// app.post('/info/delete', info["delete"]);//連絡の論理削除
// app.get("/calendar/list/:today",calendarList.query);// カレンダーの取得

// app.get('/calendar/view',calendar.view);//カレンダーの表示
// app.all("/calendar/:today",calendar.do);// カレンダーの操作

// app.post('/userinfo/:uid?',userinfo.save);//ユーザ情報の更新

// app.get("/timetable/:today/:uid/:cid",timetable.userTimetable);//時間割の取得

// // 初期化情報の取得(UserInfo,コードマスタ,ユーザ一覧)
// app.get("/util/init",utils.getInitInfo);

// app.get('*', routes.page404);//ページがみつかりません画面

// サーバの開始(http)
var httpPort = (process.env.HTTP_PORT);
http.createServer(app).listen(httpPort, function(){
	console.log('Express server (HTTP) listening on port ' + httpPort);
});

// // httpsの設定
// var options = {
// 	key: fs.readFileSync(__dirname + '/keys/server.rsa'),
// 	cert: fs.readFileSync(__dirname + '/keys/server.crt')
// };

// // サーバの開始(ssl)
// var sslPort = (process.env.SSL_PORT);
// https.createServer(options,app).listen(sslPort, function(){
// 	console.log('Express server (HTTPS) listening on port ' + sslPort);
// });
