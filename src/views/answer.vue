<style scoped>
.app {
    padding-bottom: 46px;
}
.mint-loadmore-content ul li {
    border-bottom: 1px solid #ccc;
    line-height: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
}

.mint-loadmore-content ul li:hoder {
    background-color: #ccc;
}
.loadingAnimate{
    text-align: center;
    font-size: 24px;
    line-height: 30px;
}
.mint-loadmore-top{
    text-align: center;
}
.mint-loadmore-top span{
    display: inline-block;
    color:#26a2ff;
}
</style>


<template>
    <div class="app">
        <v-header :title="title"></v-header>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="(item, index) in list" :key="index">{{ item }}</li>
            </ul>
            <div class="loadingAnimate"><mt-spinner type="triple-bounce" v-show="loading" color="#26a2ff"></mt-spinner></div>
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
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            topStatus: '',
            allLoaded: false,
            loading:false,
            title:"问答"
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
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                    this.list.push(last + i);
                }
                this.loading = false;
            }, 2500);
        }
    },
    components:{
        vHeader:Header
    }
};
</script>
