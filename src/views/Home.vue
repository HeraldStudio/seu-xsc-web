<template>
    <background title="赵拯基，你好！" desc="欢迎来到「学工一站通」(黄色标签为预览标示功能对应角色，实际上线产品仅会向对应用户展示有权限功能，不会显示标签)" :isHome="true">
        <div class="menu">
            <menu-item :icon="basicInfoIcon" title="学生基本信息速查" route="/student-basic-info" role="辅导员/学生处"></menu-item>
            <menu-item :icon="curriculumIcon" title="学生课表查询" role="辅导员/学生处"></menu-item>
            <menu-item :icon="gradeIcon" title="学生成绩查询" route="/student-grade" role="辅导员/学生处"></menu-item>
            <menu-item :icon="outingIcon" title="节假日行程登记" route="/holiday-trip-register" role="学生"></menu-item>
            <menu-item :icon="takeLeaveIcon" title="请假登记" role="学生"></menu-item>
            <menu-item :icon="takeLeaveIcon" title="请假审批" role="辅导员"></menu-item>
            <menu-item :icon="outingIcon" title="离/在校情况查询" role="辅导员/学生处"></menu-item>
            <menu-item :icon="locateIcon" title="应急在校跟踪" role="学生处"></menu-item>
            <menu-item :icon="vacationlist" title="节假日列表管理"  route="/vacation-list" role="学生处"></menu-item>
        </div>
    </background>
</template>

<script>
import Background from '../components/Background.vue'
import MenuItem from '../components/MenuItem.vue'
import basicInfoIcon from '../assets/menu-icon/basicInfoIcon.svg';
import outingIcon from '../assets/menu-icon/outingIcon.svg';
import takeLeaveIcon from '../assets/menu-icon/takeLeaveIcon.svg';
import locateIcon from '../assets/menu-icon/locateIcon.svg';
import curriculumIcon from '../assets/menu-icon/curriculumIcon.svg';
import gradeIcon from '../assets/menu-icon/gradeIcon.svg';
import vacationlist from '../assets/menu-icon/vacationlist.svg';
export default {
    components:{
        background: Background,
        'menu-item':MenuItem,
    },
    data(){
        return {
            outingIcon, 
            takeLeaveIcon, 
            basicInfoIcon, 
            locateIcon, 
            curriculumIcon, 
            gradeIcon,
            vacationlist,
            isHoliday: true
        }
    },
    methods: {
        // toHolidayTripRegister() {
        //     if(this.isHoliday){
        //         this.$router.push('/holiday-trip-register')
        //     }else{
        //         this.$message({
        //             message: '警告哦，这是一条警告消息',
        //             type: 'warning'
        //             })
        //     }
        // }
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