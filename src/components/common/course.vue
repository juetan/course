<template>
    <div>
        <el-button type="primary" size="small" @click="show=true">添加新的课程</el-button>
        <el-table :data="data">
            <el-table-column prop="id" label="ID" width="80px" sortable></el-table-column>
            <el-table-column prop="name" label="课程名字" width="150px" ></el-table-column>
            <el-table-column prop="info" label="课程简介" min-width="250px" ></el-table-column>
            <el-table-column prop="picture" label="课程封面" width="200px" ></el-table-column>
            <el-table-column prop="regtime" label="开设时间" width="160px" ></el-table-column>
            <el-table-column fixed="right" label="操作" width="150px" >
                <template slot-scope="scope">
                    <el-button  size="mini" @click="editCourse(scope.$index,scope.row)">编辑</el-button>
                    <el-button type="danger"  size="mini" @click="delCourse(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加课程"  :visible.sync="show" width="600px">
            <el-form name="addForm" :model="newForm" ref="addForm" :rules="newRules" label-width="80px" style="width:370px;margin:0 auto">
                <el-form-item label="课程名字" prop="name"> <el-input v-model="newForm.name" ></el-input> </el-form-item>
                <el-form-item label="课程封面" prop="picture"> <el-input v-model="newForm.picture"></el-input></el-form-item>
                <el-form-item label="课程简介" prop="info"><el-input v-model="newForm.info" type="textarea"></el-input> </el-form-item>
                <el-form-item label-width="10px"><el-button type="primary" style="width:320px;" @click="submit()">添加课程</el-button></el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑课程信息"  :visible.sync="isShowEditCourseForm" width="600px">
            <el-form name="editCourseForm" :model="form" ref="editCourseForm" label-width="80px" style="width:370px;margin:0 auto">
                <el-form-item label="ID" v-show="false"> <el-input v-model="form.id"  disabled></el-input></el-form-item>
                <el-form-item label="课程名字"><el-input v-model="form.name" ></el-input></el-form-item>
                <el-form-item label="课程封面"><el-input v-model="form.picture"></el-input></el-form-item>
                <el-form-item label="课程简介" ><el-input v-model="form.info" type="textarea"></el-input></el-form-item>
                <el-form-item label-width="10px"><el-button type="primary" style="width:320px;" @click="submitEditCourseForm()">提交修改</el-button></el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: null,
            users: null,
            show: false,
            newForm: {},
            newRules: {
                author: this.rule(),
                name: this.rule(),
                info: this.rule(),
                picture: this.rule(),
            },
            form: {},
            isShowEditCourseForm: false
        }
    },
    mounted(){
        this.$http.get('/index/index/getUser').then(res=>{this.users = res.data.data});
        this.$http.post('/api/index/getCourse',{token:localStorage.getItem('token')}).then(res=>{this.data = res.data.data;})
    },
    methods:{
        submit() {
            this.$refs['addForm'].validate(valid=>{
                if(valid) {
                    var newCourse = this.newForm;
                    newCourse.token = localStorage.getItem('token');
                    this.$http.post('/api/index/setCourse',newCourse).then(res=>{
                        if(res.data.status == 1) {this.$refs['addForm'].resetFields();this.$message({message:res.data.message,type:'success'});this.show = false} else {this.$message.error(res.data.message)}
                    })
                } else { this.$message.error('请按要求填写表单内容')}
            })
        },
        delCourse(index,row) {
            this.$confirm('确认删除该行数据吗？').then(()=>{
                this.$http.post('/api/index/delCourse',row).then(res=>{if(res.data.status == 1) {this.data.splice(index,1);this.$message({message:res.data.message,type:'success'})} else {this.$message.error(res.data.message)} })
            })
        },
        editCourse(index,row) {this.form = row;this.isShowEditCourseForm = true},
        submitEditCourseForm() {
            this.$refs['editCourseForm'].validate((valid)=>{
                if(valid) { 
                    this.$http.post('/api/index/updateCourse',this.form).then(res=>{
                        if(res.data.status==1) {
                            this.$message({message:res.data.message,type:'success'});
                            this.isShowEditCourseForm = false;
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    alert('数据未验证')
                }
                
            })
        }
    }
}
</script>
<style>

</style>


