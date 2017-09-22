
<style scope>
.articleImg img, .article-content img{
    width: 100%;
}
.middle{
    margin-top: 45px;
}
</style>


<template>
    <div class="app">
        <v-header :showBack="true" :fixed="true"></v-header>
        <div class="middle">
            <div class="articleImg" v-show="titleImg != ''">
                <img :src="titleImg" alt="">
            </div>
            <div class="author-info">
                <img :src="'https://pic3.zhimg.com/' + authorId + '_s.jpg'" alt="">
                <span>{{authorName}}</span>
            </div>
            <h1>{{articleTitle}}</h1>
            <div class="article-content"></div>
        </div>
    </div>
</template>

<script>
import Header from "../components/header"
import axios from "axios"
import $ from "jq"

export default {
    data(){
        return {
            articleTitle : "",  //文章标题
            authorName : "",    //作者名称
            titleImg : "", //文章顶部banner大图src
            authorId : "",    //作者头像id
        }
    },
    methods:{
        getArticle(){
            axios.get("http://127.0.0.1:8888?m=article&slug="+this.$route.query.slug).then((data) => {
                let article = JSON.parse(data.data);
                this.articleTitle = article.title;
                this.titleImg = article.titleImage;
                this.authorId = article.author.avatar.id;
                this.authorName = article.author.name;
                $(".article-content").html(article.content)
                let oImgs = document.querySelector(".article-content").getElementsByTagName("img");
                console.log(oImgs)
                for(let i=0; i<oImgs.length; i++){
                    $(oImgs[i]).attr("src", $(oImgs[i]).attr("data-actualsrc"))
                }
                // console.log(article.content)
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted(){
        this.getArticle();
        
        // let oImgs = document.getElementsByTagName("img");
        // for(let i=0; i<oImgs.length; i++){
        //     console.log(oImgs[i])
        // }
    },
    components:{
        vHeader:Header
    }
}
</script>

