<style scoped>
.app {
    padding-bottom: 46px;
}

.mint-loadmore-content ul li {
    border-bottom: 1px solid #ccc;
}

.mint-loadmore-content ul li img {
    border-radius: 50%;
}

.mint-loadmore-content ul li:hoder {
    background-color: #ccc;
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
    line-height: 40px;
    font-size: 12px;
}
</style>


<template>
    <div class="app">
        <v-header :title="title"></v-header>
        <mt-loadmore @load="initInfo()" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange">
            <div slot="top" class="mint-loadmore-top">
                <mt-spinner type="snake" color="#26a2ff" v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"></mt-spinner>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
            <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="!loading" infinite-scroll-distance="20">
                <li v-for="(item, index) in list" :key="index">
                    <mt-cell :title="item.title" to="/article" is-link value="">
                        <img :src="'http://pic4.zhimg.com/'+item.author.avatar.id+'_s.jpg'" alt="">
                    </mt-cell>
                </li>
            </ul>
            <div class="showNone" v-show="showNone">木有了...</div>
            <div class="loadingAnimate">
                <mt-spinner type="triple-bounce" v-show="loading" color="#26a2ff"></mt-spinner>
            </div>
        </mt-loadmore>
        <!-- <v-footer></v-footer> -->
    </div>
</template>

<script>
import Header from './components/header';
import axios from "axios";
export default {
    data() {
        return {
            list: [],
            topStatus: '',
            allLoaded: false,
            loading: false,
            title: "专栏",
            limit: 20,
            offset: 0,
            showNone: false
        }
    },
    methods: {
        handleTopChange(status) {
            this.topStatus = status;
        },
        loadTop() {
            // 加载更多数据
            // this.$refs.loadmore.onTopLoaded();
            this.onTopLoaded();
        },
        loadBottom() {
            this.allLoaded = true;// 若数据已全部获取完毕
        },
        onTopLoaded() {
            location.reload();
        },
        loadMore() {
            if (!this.showNone) {
                this.loading = true;
                axios.get("http://127.0.0.1:8888?m=zhuanlan&limit=" + this.limit + "&offset=" + this.offset).then((data) => {
                    if (data.data.length === 0) {
                        this.loading = false;
                        this.showNone = true;
                    } else {
                        if (this.list.length === 0) {
                            this.list = data.data;
                            this.offset += this.limit;
                            this.limit = 10;
                            this.loading = false;
                        } else {
                            this.list = [...this.list, ...data.data];
                            this.offset += this.limit;
                            this.loading = false;
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }

        },
        initInfo() {
            axios.get("http://127.0.0.1:8888?m=default").then((data) => {
                console.log(data)
                this.list = data.data;
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    components: {
        vHeader: Header
    }
};

function jsonpCallback(result) {
    console.log(result)
}
var JSONP = document.createElement("script");
JSONP.type = "text/javascript";
JSONP.id = "aaa"
JSONP.src = "https://zhuanlan.zhihu.com/api/recommendations/columns?limit=10&offset=0&seed=46&call=jsonpCallback";
document.getElementsByTagName("head")[0].appendChild(JSONP);

let aaa = document.getElementById("aaa");
console.log(window);

</script>
