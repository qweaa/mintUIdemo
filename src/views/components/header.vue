<style scoped>
    .mint-header{
        font-size: 16px;
    }
    .popup-body{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .mint-popup{
        width: 60%;
        height: 100%;
    }
    .userImg img{
        width: 30px;
        height: 30px;
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
            
        </mt-popup>
    </div>
</template>
<script>

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
