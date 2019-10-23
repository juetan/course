<template>
    <div class="student">
        <el-container>
            <el-aside width="150px">
                <el-menu router style="height:600px;width:150px" mode="vertical" >
                    <el-menu-item index="1" :route="{path:'/student'}" style="width:150px"><i class="el-icon-setting"></i> 个人设置</el-menu-item>
                    <el-menu-item index="2" :route="{path:'/student/study'}" style="width:150px"><i class="el-icon-reading"></i> 学习进度</el-menu-item>
                    <el-menu-item index="3" :route="{path:'/student/message' }" style="width:150px"><i class="el-icon-message"></i> 消息通知</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data: null
        }
    }
}
</script>
<style>
    .student {
        width: 1180px;
        background: #fff;
    }
</style>


