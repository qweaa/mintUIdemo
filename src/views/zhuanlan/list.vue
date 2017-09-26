<style scoped>
a{
    color: #222;
    text-decoration: none;
}
.mint-loadmore-content ul li {
    border-bottom: 5px solid #ddd;
    padding-left: 10px;
    padding-right: 10px;
}

.item-box {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 20px;
}
.item-box .box-top img{
    border-radius: 50%;
    margin-bottom: 10px;
}
.item-box .box-header {
    overflow: hidden;
    margin-bottom: 10px;
}

.item-box .box-header>img {
    width: 100%;
}
.item-box .box-middle p{
    overflow: hidden;
    font-size: 12px;
}
.item-box .box-middle .time{
    float: right;
    color: #666;
    margin-top: 15px;
}
.item-box .box-footer {
    font-size: 12px;
    color: #666;
}
.item-box .box-footer span{
    margin-right: 15px;
}

.loadingAnimate {
    text-align: center;
    font-size: 24px;
    line-height: 30px;
}

.mint-loadmore-top {
    text-align: center;
}

.mint-loadmore-top span {
    display: inline-block;
    color: #26a2ff;
}

.showNone {
    text-align: center;
    color: #666;
    line-height: 50px;
    font-size: 12px;
}
/* .column_header{
    position: fixed;
    z-index: 9999;
    top: 0;
    width: 100%;
    height: 50px;
}
.column_header h1{
    position: absolute;
    top: 124px;
    width: 100%;
    text-align: center;
    color: red;
    font-size: 16px;
    line-height: 50px;
} */
</style>


<template>
    <div class="app" style="">
        <v-header :title="title" :showBack="true" :fixed="true"></v-header>
        <!-- <div class="column_header">
            <h1>专栏名称</h1>
        </div> -->
        <list-header @listenToTitle="getChildData"></list-header> 

        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <router-link :to="{path:'article',query:{slug:item.slug}}">
                        <div class="item-box">
                            <div class="box-top">
                                <img :src="'https://pic1.zhimg.com/'+item.author.avatar.id+'_s.jpg'" alt="">
                                <span>{{item.author.name}}</span>
                            </div>
                            <div class="box-header">
                                <img v-show="item.titleImage !== ''" :src="item.titleImage" alt="">
                            </div>
                            <div class="box-middle">
                                <h5>{{item.title}}</h5>
                                <p>{{item.summary}}</p>
                                <p><span class="time">{{setTime(item.publishedTime)}}</span></p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
             <div slot="top" class="mint-loadmore-top" :style="{marginTop : topStatus == 'success' ? '-100px' : '-50px'}">
                <mt-spinner type="snake" color="#26a2ff" v-show="topStatus !== 'loading'"></mt-spinner>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
             <div slot="bottom" class="mint-loadmore-bottom">
                <div class="showNone" v-show="!allLoaded && bottomStatus !== 'loading'">上拉刷新</div>
                <mt-spinner type="triple-bounce" v-show="bottomStatus === 'loading'" color="#26A2FB"></mt-spinner>
            </div>  
            <div class="showNone" v-show="allLoaded">木有了...</div>
            <div class="showNone" v-show="none">该专栏暂时没有文章！</div>
        </mt-loadmore>
    </div>
</template>

<script>
import Header from '../components/header';
import listHeader from "./listHeader";
import axios from "axios";
import {Toast} from "mint-ui";
import $ from "jq";
export default {
    data() {
        return {
            list: [],
            tmp: [],
            topStatus: '',
            bottomStatus: '',
            allLoaded: false,
            title: '',
            offset: 0,
            none: false,        //该专栏暂时没有文章
        }
    },
    methods: {
        handleTopChange(status) {
            this.topStatus = status;
        },
        handleBottomChange(status){
            this.bottomStatus = status;
        },
        loadTop() {
            console.log("loadTop")
            this.loadMore(true,0);
        },
        loadBottom() {
            console.log("loadBottom")
            this.loadMore(false,this.offset);
        },
        setTime(time) {
            let times = new Date(time);
            return times.toLocaleDateString() + ' ' + times.toLocaleTimeString()
        },
        getChildData(data){
            this.title = data;
        },
        loadMore(code,offset) {
            axios.get("http://127.0.0.1:8888?m=zhuanlan&page="+this.$route.query.slug+"&offset=" + offset).then((data) => {
                console.log(data)
                if(code){   //true: 顶部下拉刷新；false: 底部上拉刷新
                    if (data.data.length === 0) {
                        this.none = true;
                    }else{
                        if(this.list.length == 0){
                            this.list = data.data;
                            this.offset = 10;
                        }else{
                            let slug = this.list[0].slug;
                            this.list = [];
                            this.list = data.data;
                            if(slug == data.data[0].slug){
                                Toast('T_T 没有新文章了~');
                            }
                            this.offset = 10;
                        }
                        this.$refs.loadmore.onTopLoaded();
                    }
                }else{
                    if (data.data.length === 0) {
                        this.allLoaded = true;
                    } else {
                        this.list = [...this.list, ...data.data];
                        this.offset += 10;
                        this.$refs.loadmore.onBottomLoaded();
                    }
                }
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
        setColumnNameTop(){
            if(this.getScroTop() < 124){
                // if(this.getScroTop() < 100){
                //     window.scrollTo(0,236)
                // }
                // if(parseInt($('.column_header h1').css("top")) <= 10){
                //     $('.column_header h1').css("top", 0)
                // }else{
                    $('.column_header h1').css("top", 124 - this.getScroTop())
                // }
            }
        }
    },
    mounted(){
        let that = this;
        this.loadMore(true,0);
        let startX = 0;
        // window.touchstart = function(event){
        //     console.log(that.getScroTop())
        //     startX = event.clientX;
        // }
        // window.touchmove = function(event){
        //     $('.column_header h1').css("top", startX - event.clientX >= 124 ? 0 : startX - event.clientX)
        // }
        // window.touchend = function(event){
        //     if(startX - event.clientX > 0){
        //         console.log(that.getScroTop())
        //         if(that.getScroTop() > 124){
        //             $('.column_header h1').css("top", 0)
        //         }
        //     }
        // }
    },
    components: {
        vHeader: Header,
        listHeader : listHeader
    }
};
// var JSONP = document.createElement("script");
// JSONP.type = "text/javascript";
// JSONP.src = "https://www.zhihu.com/api/v4/members/guo.kai";
// document.getElementsByTagName("head")[0].appendChild(JSONP);
</script>
