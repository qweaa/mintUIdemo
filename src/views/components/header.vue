<style scoped>
    .popup-body{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
</style>

<template>
    <div class="header">
        <mt-header :title="title">
            <!-- <router-link to="/" slot="left" v-if="!isHome">
                <mt-button icon="back">返回</mt-button>
            </router-link> -->
            <mt-button icon="more" slot="right" @click="popupVisible = !popupVisible"></mt-button>
        </mt-header>
        <mt-popup v-model="popupVisible" position="left">
            <div class="popup-body">
            </div>
        </mt-popup>
    </div>
</template>
<script>
// import Vue from 'vue';
// import {Header} from 'mint-ui';
// Vue.component(Header.name, Header);

export default {
    data() {
        return {
            title: "",
            popupVisible : false
        }
    },
    methods : {
        aaa : function(){this.popupVisible = !this.popupVisible;console.log(this.popupVisible)}
    },
    beforeRouteEnter(to, from, next) {
        this.title = to.meta.title;
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    watch: {
        $route() {
            this.title = this.$route.meta.title;
        }
    }
}
</script>
