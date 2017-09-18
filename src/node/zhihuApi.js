let http = require("http");
let url = require("url");
let zhihu = require('zhihu');
let requestsss = require('request');







let username = 'shanejs';


http.createServer(function (request, response) {

            // 发送 HTTP 头部 
            // HTTP 状态值: 200 : OK
            // 内容类型: text/plain
            response.writeHead(200, {
                'Content-Type': 'text/plain; charset=utf-8',
                'Access-Control-Allow-Origin': "*"
            });

            let params = url.parse(request.url, true).query;
            if (params.m === "zhuanlan") {
                zhihu.Post.page(params.page, {
                    limit: params.limit,
                    offset: params.offset
                }).then(function (list) {
                    response.end(JSON.stringify(list));
                });
            }else if (params.m === "default") {
                requestsss('https://zhuanlan.zhihu.com/api/recommendations/columns?limit=10&offset=0&seed=46', function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        response.end(JSON.stringify(body)); // 输出请求到的body
                    }else{
                        console.log(error)
                    }
                });
            }else {
                response.end("缺少参数m或m值错误！");
            }


            }).listen(8888);

        // 终端打印如下信息
        console.log('Server running at http://127.0.0.1:8888/');