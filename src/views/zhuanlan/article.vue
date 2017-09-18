<template>
    <div class="app">
        <v-header :showBack="true"></v-header>
        <h1>TITLE</h1>
    </div>
</template>

<script>
import Header from "../components/header"

export default {
    components:{
        vHeader:Header
    }
}
</script>

