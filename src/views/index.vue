<template>
    <div class="app">
        <h1>{{title}}</h1>
    </div>
</template>

<script>
import vHeader from './components/header'
export default {
    data(){
        return {
            title:"hello miny-ui"
        }
    },
    components:{
        vHeader:vHeader
    }
}
</script>
