let http = require("http");
let url = require("url");
let zhihu = require('zhihu');








let username = 'shanejs';



http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin':"*"
    });
    
    let params = url.parse(request.url, true).query;
    if(params.m === "zhuanlan"){
        zhihu.Post.page('bigertech').then(function (list) {
            response.end(JSON.stringify(list));
        });
    }else{
        response.end("缺少参数m或m值错误！");
    }

    
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');