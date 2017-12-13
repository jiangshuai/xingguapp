<template>
    <div class="Main">
        <menuNav></menuNav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import MenuNav from '@/basecomponents/MenuNav/index'
 
export default {
    name: 'Main',
    props: [
   
    ],
    data() {
        return {
            
        }
    },
    created() {
       
    },
    mounted() {
        
    },
    computed: {

    },
   
    components: {
        'menuNav': MenuNav
    }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "../less/reset.less";
@import "../less/base.less";
@import "./zh-cn.less";
</style>