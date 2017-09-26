
<style scope>
.article-content a{
    word-wrap: break-word;
    text-decoration: none;
    color: #666;
}
.articleImg img, .article-content img{
    width: 100%;
}
.articleImg, .author-info{
    margin-left: -10px;
    margin-right: -10px;
}
.article-content p{
    line-height: 30px;
    margin-bottom: 10px;
}
.article-content p br{
    display: none;
}
.middle{
    margin-top: 45px;
    padding-left: 10px;
    padding-right: 10px;
}
.author-info{
    overflow: hidden;
    padding: 15px 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
}
.author-info img{
    width: 50px;
    height: 50px;
    float: left;
    border-radius: 50%;
    margin-right: 10px;
}
.author-info .info{
    width: calc(100% - 60px);
    
    float: left;
}
.author-info .info p{
    line-height: 24px;
}
.author-info .info span{
    display: block;
    line-height: 18px;
    font-size: 12px;
    color: #666;
}
.middle h1{
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 20px;
}
.middle h4{
    font-size: 16px;
    font-weight: 500;
    color: #666;
    margin-bottom: 30px;
}
.middle h4 a{
    color: #333;
    text-decoration: none;
}
/*视频*/
.video-box{
    position: relative;
    display: block;
    text-decoration : none;
}
.video-box .z-ico-extern-gray{
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -30px;
    margin-top: -30px;
    background-image: url("../../images/icon_play_a.png");
    background-position: center;
    background-size: 60px 60px;
    background-repeat: no-repeat;
    display: inline-block;
    width: 60px;
    height: 60px; 
    animation: videoIcon 1s infinite alternate cubic-bezier(1, 0.06, 0.16, 1.09);
}
.video-box .content .title{
    color: #666;
}
.video-box .content .url{
    display: none;
}
.article-footer{
    line-height: 30px;
    text-align: right;
    padding-right: 20px;
    margin-bottom: 30px;
}
@keyframes videoIcon {
    from {transform: rotate(0deg);}
    to {background-size: 50px 50px;transform: rotate(360deg)}
}
</style>


<template>
    <div class="app">
        <v-header :showBack="true" :fixed="true"></v-header>
        <div class="middle">
            <div class="articleImg" v-show="showBanner">
                <img src="data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='658'%20height='556'></svg>" alt="">
            </div>
            <div class="author-info">
                <img src="data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='658'%20height='556'></svg>" alt="">
                <div class="info">
                    <p>{{authorName}}</p>
                    <span>{{bio}}</span>
                </div>
            </div>
            <h1>{{articleTitle}}</h1>
            <h4 v-show="column != ''">来自专栏 <router-link :to="{path:'zhuanlanList',query:{'slug':columnSlug}}">{{column}}</router-link></h4>
            <div class="article-content"></div>
            <div class="article-footer">
                <p>发布于{{publishedTime}}</p>
                <p>著作权归作者所有</p>
            </div>
        </div>
        
    </div>
</template>

<script>
import Header from "../components/header"
import axios from "axios"
import $ from "jq"

export default {
    data(){
        return {
            articleTitle : "",  //文章标题
            authorId : "",      //作者id
            authorName : "",    //作者名称
            showBanner : "",    //文章顶部banner大图src
            oImgs : [],         //初始化文章里的图片集合，用户懒加载
            bio : "",           //个性签名
            column : "",        //收录专栏
            columnSlug : "",
            publishedTime : "", //文字文章发布时间
            lazyImgIndex : 0,   //初始化懒加载图片的位置
        }
    },
    methods:{
        getArticle(){
            axios.get("http://127.0.0.1:8888?m=article&slug="+this.$route.query.slug).then((data) => {
                let article = JSON.parse(data.data);
                this.articleTitle = article.title;      //文章标题
                this.bio = article.author.bio;
                this.publishedTime = article.publishedTime.slice(0,10);
                console.log(article.column)
                if(article.column){
                    this.column = article.column.name;
                    this.columnSlug = article.column.slug;
                }
                $(".author-info img").attr("src",'https://pic3.zhimg.com/' + article.author.avatar.id + '_m.jpg');      //用户头像
                if(article.titleImage != ""){           //如果有文章大图的就显示文章大图
                    $(".articleImg img").attr("src", article.titleImage)
                    this.showBanner = true;             //true显示文章大图banner
                }
                this.authorName = article.author.name;  //作者名称
                

                console.log(article)
                $(".article-content").html(article.content)
                this.oImgs = document.querySelector(".article-content").getElementsByTagName("img");            //渲染文章内容后获取文章中所有img做懒加载使用
                let a = $("a[data-poster]");
                for(let i=0; i<a.length; i++){
                    // a[i].getElementsByTagName("img")[0].src = a[i].getAttribute('data-poster');
                    $(a[i]).find("img").attr("src", $(a[i]).attr("data-poster"))
                    
                }
                console.log(a)
                this.loadImg();
            }).catch((err) => {
                console.log(err)
            })
        },
        getScroTop(){
            return document.documentElement.scrollTop || document.body.scrollTop;
        },
        getViewHeight(){
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        loadImg(){
            if(this.oImgs.length != 0){
                for(var i = this.lazyImgIndex; i < this.oImgs.length; i++){
                    if(this.oImgs[i].offsetTop <= this.getScroTop() + this.getViewHeight()){
                        this.lazyImgIndex = i;
                        if(this.oImgs[i].getAttribute('data-actualsrc')){
                            this.oImgs[i].src = this.oImgs[i].getAttribute('data-actualsrc');
                        }
                    }
                }
            }
        }
    },
    mounted(){
        this.getArticle();
        let that = this;
        window.onscroll = function(){
            // if(this.$route.path == "/article"){
                that.loadImg();
            // }
        }
    },
    components:{
        vHeader:Header
    }
}
</script>

