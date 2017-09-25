<style scoped>
.app {
    padding-bottom: 46px;
}

.mint-loadmore-content ul li {
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
    padding-right: 10px;
}

.mint-loadmore-content ul li > a{
    text-decoration: none;
    color: #222;
}
.item-box {
    margin-bottom: 10px;
    line-height: 18px;
}

.item-box .box-header {
    overflow: hidden;
    margin-bottom: 10px;
}

.item-box .box-header>img {
    border-radius: 10px;
    float: left;
}

.item-box .box-header .info {
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    height: 75px;
    overflow: hidden;
}
/* .item-box .box-header .info:after {
    content:"...";
    position:absolute;
    bottom:0;
    right:0;
    padding: 0 5px;
    background-color: #fff;
} */

.item-box .box-header .info>p {
    font-size: 12px;
    color: #666;
}

.item-box .box-footer {
    font-size: 12px;
    color: #666;
}

.item-box .box-footer span {
    margin-right: 15px;
}

.loadingAnimate {
    text-align: center;
    font-size: 24px;
    line-height: 30px;
}

.mint-loadmore-top {
    text-align: center;
    vertical-align: middle;
}

.mint-loadmore-top span {
    display: inline-block;
    color: #26a2ff;
    vertical-align: middle;
}

.showNone {
    text-align: center;
    color: #666;
    line-height: 40px;
    font-size: 12px;
}
</style>


<template>
    <div class="app">
        <v-header :title="title"></v-header>
        <mt-loadmore @load="initInfo()" :top-method="loadTop" @top-status-change="handleTopChange">
            <div slot="top" class="mint-loadmore-top" :style="{marginTop : topStatus == 'success' ? '-100px' : '-50px'}">
                <mt-spinner type="snake" color="#26a2ff" v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"></mt-spinner>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
            <ul v-infinite-scroll="loadBottom" :infinite-scroll-disabled="!loading" infinite-scroll-distance="20">
                <li v-for="(item, index) in zhuanlanData" :key="index">
                    <!-- <router-link :to="{'path':'zhuanlanList',query:{'title':item.name,'page':item.slug,'columnsImg':'https://pic4.zhimg.com/'+item.avatar.id+'_m.jpg','follow':item.followersCount}}"> -->
                    <router-link :to="{'path':'zhuanlanList',query:{'slug':item.slug}}">
                        <div class="item-box">
                            <div class="box-header">
                                <img :src="'https://pic4.zhimg.com/'+item.avatar.id+'_m.jpg'" alt="">
                                <div class="info">
                                    <h5>{{item.name}}</h5>
                                    <p>{{item.description}}</p>
                                </div>
                            </div>
                            <div class="box-footer">
                                <span>{{item.followersCount}} 人关注</span>
                                <span>{{item.postsCount}} 篇文章</span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="loadingAnimate">
                <mt-spinner type="triple-bounce" v-show="loading" color="#26a2ff"></mt-spinner>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
import Header from './components/header';
import axios from "axios";
export default {
    data() {
        return {
            topStatus: '',
            allLoaded: false,
            loading: false,
            title: "专栏",
        }
    },
    methods: {
        handleTopChange(status) {
            console.log(status)
            this.topStatus = status;
        },
        loadTop() {
            // location.reload();
            this.loadMore("addTop");
        },
        loadBottom(){
            this.loadMore("addBottom");
        },
        loadMore(code) {
            this.loading = true;
            axios.get("http://127.0.0.1:8888?m=default").then((data) => {
                    if(code == "addTop"){
                        this.$store.commit('setZhuanlanData',{code:"addTop",data:JSON.parse(data.data)});
                        this.handleTopChange("success");
                    }else if(code == "addBottom"){
                        this.$store.commit('setZhuanlanData',{code:"addBottom",data:JSON.parse(data.data)});
                    }
                    console.log(this.$store.state.zhuanlanData)
                    this.loading = false;
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    computed: {
        zhuanlanData : function(){
            return this.$store.state.zhuanlanData;
        }
    },
    components: {
        vHeader: Header
    }
};
// var JSONP = document.createElement("script");
// JSONP.type = "text/javascript";
// JSONP.id = "aaa"
// JSONP.src = "https://zhuanlan.zhihu.com/api/recommendations/columns?limit=10&offset=0&seed=46&call=jsonpCallback";
// document.getElementsByTagName("head")[0].appendChild(JSONP);

</script>
