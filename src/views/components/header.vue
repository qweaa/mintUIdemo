<style scoped>
    .mint-header{
        font-size: 16px;
    }
    .mint-popup{
        width: 60%;
        height: 100%;
        padding: 15px;
    }
    .userImg img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .bottom-action{
        position: absolute;
        bottom: 15px;
        width: calc(100% - 30px);
    }
    .bottom-action button{
        width: 100%;
    }
    .head-portrait{
        text-align: center;
    }
    .head-portrait img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
</style>

<template>
    <div class="header">
        <mt-header :title="title">
            <!-- <mt-button icon="more" slot="right" @click="popupVisible = !popupVisible"></mt-button> -->
            <div class="userImg" slot="right" @click="popupVisible = !popupVisible">
                <img src="../../images/userDefault.jpg" alt="">
            </div>
        </mt-header>
        <mt-popup v-model="popupVisible" position="right">
            <div class="head-portrait">
                <img src="../../images/userDefault.jpg" alt="">
            </div>
            <div class="bottom-action">
                <mt-button type="primary" size="small" v-show="isLogin">登陆</mt-button>
                <mt-button type="danger" size="small" v-show="!isLogin">退出登陆</mt-button>
            </div>
        </mt-popup>
    </div>
</template>
<script>

export default {
    data() {
        return {
            title: "",
            popupVisible : false,
            isLogin:false
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
