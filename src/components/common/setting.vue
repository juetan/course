<template>
    <div>
        <el-form :model="data" ref="form" label-width="90px">
            <el-form-item label="用户名：">
                {{data.username}}
            </el-form-item>
            <el-form-item label="注册时间：">
                {{data.regtime}}
            </el-form-item>
            <el-form-item label="密码：">
                <el-input type="password" width="50" v-model="data.password" show-password style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="头像：">
                <el-upload :on-success="newAvater" :show-file-list="false" name="avater" :headers="{'X-token':token}" action="/api/index/avater" :data='{"token":token}'>
                    <img v-if="data.avater" :src="data.avater"  class="avater">
                     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="个人简介：">
                <el-input type="textarea" v-model="data.info" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: null,
            form: {},
            token: null
        }
    },
    created() {
        this.fetchData(); 
        this.token = localStorage.getItem("token");
    },
    methods: {
        fetchData() {
            this.$http.post('/api/index/getUser',{'token':localStorage.getItem('token')}).then(res=>{
                console.log(res.data);
                this.data = res.data.data;
            })
        },
        submit() {
          this.$refs['form'].validate((valid)=>{
            if(valid) {
                this.$http.post('/api/index/updateUser',this.data).then(res=>{
                    if(res.data.status == 1) {
                        this.$message({'message': res.data.message,'type':'success'});
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            } else { alert('数据未验证') }})
        },
        newAvater(res,file,fileList) {
            if(res.status == 1) {
                this.$message({'message': res.message,'type':'success'});
                this.data.avater = res.avater;
            }
        }
    }
}
</script>
<style lang="stylus">
    .avater
        width 160px
        height 160px
</style>
