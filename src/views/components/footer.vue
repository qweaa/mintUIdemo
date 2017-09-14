<style scoped>
    .fa{
        font-size: 20px;
        display: block;
    }
    .mint-tab-item-label a{
        text-decoration: none;
        color: #666;
    }
    .is-selected a{
        color: #26a2ff;
    }
</style>


<template>
    <mt-tabbar v-model="selected" :fixed="true">
        <mt-tab-item id="a">
            <router-link to="/">
                <span class="fa fa-navicon"></span>专栏
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="b">
            <router-link to="answer">
                <span class="fa fa-tags"></span>答案
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="c">
            <router-link to="question">
                <span class="fa fa-question"></span>问题
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="d">
            <router-link to="comments">
                <span class="fa fa-comments"></span>话题
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
