<style scoped>
.app {
    padding-bottom: 46px;
}

.mint-loadmore-content ul li {
    border-bottom: 1px solid #ccc;
}
.mint-loadmore-content ul li img{
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
</style>


<template>
    <div class="app">
        <v-header :title="title"></v-header>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="(item, index) in list" :key="index">
                    <mt-cell :title="item.title" to="/article" is-link value="">
                        <img :src="item.url" alt="">
                    </mt-cell>
                </li>
            </ul>
            <div class="loadingAnimate">
                <mt-spinner type="triple-bounce" v-show="loading" color="#26a2ff"></mt-spinner>
            </div>
            <div slot="top" class="mint-loadmore-top">
                <mt-spinner type="snake" color="#26a2ff" v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"></mt-spinner>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
        </mt-loadmore>
        <!-- <v-footer></v-footer> -->
    </div>
</template>

<script>
import Header from './components/header'
export default {
    data() {
        return {
            list: null,
            topStatus: '',
            allLoaded: false,
            loading: false,
            title: "专栏"
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
            this.loading = true;
            axios.get("http://127.0.0.1:8888?m=zhuanlan").then((data) => {
                console.log(data)
                this.list = data.data;
                console.log(this.list)
            }).catch((err) => {
                console.log(err)
            })
            // setTimeout(() => {
            //     let last = this.list[this.list.length - 1];
            //     for (let i = 1; i <= 10; i++) {
            //         this.list.push(last + i);
            //     }
            //     this.loading = false;
            // }, 2500);
        }
    },
    components: {
        vHeader: Header
    }
};
import axios from "axios";
// axios.get("http://127.0.0.1:8888?m=zhuanlan").then((data) => {
//     console.log(data)
//     Vue.list = data;
// }).catch((err) => {
//     console.log(err)
// })

</script>
