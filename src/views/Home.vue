<template>
    <background title="赵拯基，你好！" desc="欢迎来到「学工一站通」">
        <div class="menu">
            <menu-item :icon="lixiaoIcon" title="节假日行程登记" route="/lixiao"></menu-item>
            <menu-item :icon="qingjiaIcon" title="请假登记" route="/qingjia"></menu-item>
            <menu-item :icon="qingjiaIcon" title="请假登记" route="/qingjia"></menu-item>
            <menu-item :icon="qingjiaIcon" title="请假登记" route="/qingjia"></menu-item>
            <menu-item :icon="qingjiaIcon" title="请假登记" route="/qingjia"></menu-item>
        </div>
    </background>
</template>

<script>
import Background from '../components/Background.vue'
import MenuItem from '../components/MenuItem.vue'
import lixiaoIcon from '../assets/menu-icon/lixiao.svg';
import qingjiaIcon from '../assets/menu-icon/qingjia.svg';
export default {
    components:{
        background: Background,
        'menu-item':MenuItem,
    },
    data(){
        return {lixiaoIcon, qingjiaIcon}
    }
}
</script>

<style lang="less" scoped>
.menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>