<style scoped>
    .fa{
        font-size: 20px;
        display: block;
    }
</style>


<template>
    <mt-tabbar v-model="selected">
        <mt-tab-item id="a">
             
            外卖
        </mt-tab-item>
        <mt-tab-item id="b">
             
            订单
        </mt-tab-item>
        <mt-tab-item id="c">
             
            发现
        </mt-tab-item>
        <mt-tab-item id="d">
            <router-link :to="{name:'user'}">
                <span class="fa fa-user"></span>我的
            </router-link>
        </mt-tab-item>
    </mt-tabbar>
</template>
<script>
export default {
    data(){
        return {
            selected:"a"
        }
    }
}
</script>
