let superagent = require("superagent");
let cheerio = require("cheerio");
let http = require("http");
let url = require("url");

let a = 100;
var that = this;
let urlData = {
    url: "https://www.zhihu.com/#signin",
    login_url: "https://www.zhihu.com/login/phone_num",
    target_url: "https://www.zhihu.com/collections"
}

//浏览器请求报文头信息
let browserMsg = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://www.zhihu.com',
    'Host':'www.zhihu.com',
    'Referer':'https://www.zhihu.com/',
    'Connection':'keep-alive',
    'Accept':'*/*',
}

let dataJson = {};

// post 参数信息，其中，还差先前分析的 _xsrf 信息
let loginMsg = {
    phone_num: "13729883532",
    captcha_type: 'cn',
    password: "0147258369qwe"
};
// 获取 _xrsf 值
function getXrsf() {
    superagent.get(urlData.url).end(function (err, res) {
        if (!err) {
            let $ = cheerio.load(res.text);
            loginMsg._xsrf = $('[name=_xsrf]').attr('value');
        } else console.dir(err);
    });
}

// 发送登陆请求，获取 cookie 信息
function getLoginCookie(rep) {
    //  首先，需在 set 方法中设置请求报文中参数，以性器官免服务器端有针对非浏览器请求做相关处理
    //  send 方法中设置 post 请求中需提交的参数
    //  redirects 方法调用，其中参数为 0 ，为了避免在用户登陆成功后，引起的页面重新刷新，从而无法获取 cookie
    getXrsf(); // 获取 _xrsf 值
    superagent.post(urlData.login_url).set(browserMsg).send(loginMsg).redirects(0).end(function (err, responses) {
        if (!err) {
            dataJson.cookie = responses.headers["set-cookie"];
            dataJson.text = responses.text;
            rep.end(JSON.stringify(dataJson));
        } else {
            rep.end(JSON.stringify(err));
        }
    });
}

function aa(){
    return '111'
}

http.createServer(function (request, response) {
    
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': "*"
    });



    let params = url.parse(request.url, true).query;
    getLoginCookie(response)

}).listen(9999);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:9999/');