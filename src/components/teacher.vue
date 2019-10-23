<template>
    <div class="student">
        <el-container>
            <el-aside width="150px">
                <el-menu router style="height:600px">
                    <el-menu-item index="1" :route="{path:'/teacher'}"><i class="el-icon-setting"></i> 个人设置</el-menu-item>
                    <el-menu-item index="6" :route="{path:'/teacher/living'}"><i class="el-icon-key"></i> 开启直播</el-menu-item>
                    <el-menu-item index="2" :route="{path:'/teacher/course'}"><i class="el-icon-notebook-1"></i> 课程管理</el-menu-item>
                    <el-menu-item index="3" :route="{path:'/teacher/file'}"><i class="el-icon-folder"></i> 课件管理</el-menu-item>
                    <el-menu-item index="4" :route="{path:'/teacher/student'}"><i class="el-icon-takeaway-box"></i> 学生管理</el-menu-item>
                    <el-menu-item index="5" :route="{path:'/teacher/message'}"><i class="el-icon-message"></i> 消息通知</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <transition name="section" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus">
    .student {
        width: 1180px;
        margin: 0 auto;
        background: #fff;
    }
    .section-enter-active
        animation: fadeInDownBig 1s
    @-webkit-keyframes fadeInDownBig {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, -2000px, 0);
        transform: translate3d(0, -2000px, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    }
</style>


