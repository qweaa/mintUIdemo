<style scoped>
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

.columns-info{
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 5px solid #ddd;
    text-align: center;
}
.columns-info .columns-img img{
    border-radius: 50%;
}
.columns-info h1{
    font-size: 14px;
    line-height: 28px;
}
.columns-info p{
    font-size: 12px;
    color: #666;
}
</style>


<template>
    <div class="app" style="">
        <v-header :title="title" :showBack="true"></v-header>
        <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange"> -->
        <div class="columns-info">
            <div class="columns-img">
                <img :src="columnsImg" alt="">
            </div>
            <h1>{{columnsTitle}}</h1>
            <p><span class="fa fa-user"></span> {{columnsFollow}}人关注</p>
        </div>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" ref="loadmore">
            <!-- <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="!loading" infinite-scroll-distance="20"> -->
            <ul>
                <li v-for="(item, index) in list" :key="index">
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
                </li>
            </ul>
            <div slot="top" class="mint-loadmore-top">
                <mt-spinner type="snake" color="#26a2ff" v-show="topStatus !== 'loading'"></mt-spinner>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
                <div class="showNone" v-show="!allLoaded">上拉刷新</div>
            </div>
            <div class="showNone" v-show="allLoaded">木有了...</div>
        </mt-loadmore>
    </div>
</template>

<script>
import Header from '../components/header';
import axios from "axios";
// var $ = require("../../vendors/jquery-3.2.1.js");
import $ from "jq";
export default {
    data() {
        return {
            list: [],
            topStatus: '',
            bottomStatus: '',
            allLoaded: false,
            title: this.$route.query.title,
            limit: 20,
            offset: 0,
            columnsImg:this.$route.query.columnsImg,
            columnsTitle: this.$route.query.title,
            columnsFollow: this.$route.query.follow
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
            axios.get("http://127.0.0.1:8888?m=zhuanlan&page="+this.$route.query.page+"&limit=" + this.limit + "&offset=" + this.offset).then((data) => {
                console.log(data.data)
                if (this.list.length === 0) {
                    this.list = data.data;
                    this.offset += this.limit;
                    this.limit = 10;
                } else {
                    this.list = [...data.data, ...this.list];
                    this.offset += this.limit;
                }
                $(".mint-loadmore-content").css("transform","translate3d(0px, 0px, 0px)");
                this.handleTopChange("pull");
                // $(".mint-loadmore-content").removeClass("is-dropped")
            }).catch((err) => {
                console.log(err)
            })
        },
        loadBottom() {
            console.log("loadBottom")
            this.loadMore();
            console.log(this.allLoaded)
            // this.allLoaded = true;// 若数据已全部获取完毕
        },
        setTime(time) {
            let times = new Date(time);
            return times.toLocaleDateString() + ' ' + times.toLocaleTimeString()
        },
        loadMore() {
            axios.get("http://127.0.0.1:8888?m=zhuanlan&page="+this.$route.query.page+"&limit=" + this.limit + "&offset=" + this.offset).then((data) => {
                console.log(data.data)
                if (data.data.length === 0) {
                    this.allLoaded = true;
                } else {
                    if (this.list.length === 0) {
                        this.list = data.data;
                        this.offset += this.limit;
                        this.limit = 10;
                        $(".app").css("padding-bottom",0)
                    } else {
                        this.list = [...this.list, ...data.data];
                        this.offset += this.limit;
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted(){
        this.loadMore();
    },
    components: {
        vHeader: Header
    }
};

</script>
