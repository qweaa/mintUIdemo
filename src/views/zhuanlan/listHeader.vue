<style scoped>

.columns-info{
    padding-top: 60px;
    padding-bottom: 15px;
    text-align: center;
    box-shadow: 0 1px 5px #666;
}
.columns-info .columns-img img{
    border-radius: 50%;
}
.columns-info h1{
    font-size: 16px;
    line-height: 28px;
}
.columns-info p{
    font-size: 12px;
    color: #666;
}
.columns-info ul{
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    list-style: none;
    display: flex;      /*弹性布局*/
    flex-wrap: wrap;    /*子元素自动换行*/
    justify-content: center;    /*子元素对齐方式*/
}
.columns-info ul li:first-child{
    margin-left: 0;
}
.columns-info ul li{
    background-color: #ccc;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    padding-left: 6px;
    padding-right: 6px;
    margin-left: 8px;
    margin-bottom: 10px;
    line-height: 22px;
}
</style>


<template> 
    <div class="columns-info">
        <div class="columns-img">
            <img :src="columnsImg" alt="">
        </div>
        <h1>{{columnsTitle}}</h1>
        <ul>
            <li v-for="(data, index) in topics" :key="data.id">
                <span class="fa fa-tag"></span> {{data.name}}
            </li>
        </ul>
        <p><span class="fa fa-user"></span> {{columnsFollow}}人关注</p>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            columnsImg : "",
            columnsTitle : "",
            columnsFollow : "",
            topics : [],
        }
    },
    mounted(){
        axios.get("http://127.0.0.1:8888?m=zhuanlanInfo&slug="+this.$route.query.slug).then((data) => {
            let column = JSON.parse(data.data);
            console.log(JSON.parse(data.data))
            this.columnsImg = "https://pic2.zhimg.com/"+ column.avatar.id +"_m.jpg";         //获取头像
            this.columnsTitle = column.name;                //专栏名称
            //向父级组件传递信息
            this.sendTitle(this.columnsTitle);
            this.columnsFollow = column.followersCount;      //专栏关注数
            this.topics = column.topics;                    //话题
        }).catch((err) => {
            console.log(err)
        })
    },
    methods:{
        sendTitle(msg){
            this.$emit("listenToTitle",msg)
        }
    }
}
</script>

