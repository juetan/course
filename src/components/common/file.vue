<template>
   <div>
       <el-form :inline="true" class="user-bar"><el-form-item><el-button type="primary" size="small" @click="show = true">添加新的课件</el-button></el-form-item></el-form>
       <el-table :data="data" style="width:100%">
            <el-table-column prop="id" label="ID" width="80px" sortable></el-table-column>
            <el-table-column prop="name" label="文件名字" width="300px" ></el-table-column>
            <el-table-column prop="course" label="所属课程" min-width="200px" :formatter="formatCourse"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" >
                <template slot-scope="scope"><a :download="scope.row.name" :href="scope.row.addr" style="margin-right: 8px"><el-button type="primary"  size="mini" href="scope.addr">下载</el-button></a>  <el-button type="danger"  size="mini" @click="delFile(scope.$index,scope.row)">删除</el-button></template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加新的课件"  :visible.sync="show" width="600px">
            <el-form name="newForm" :model="newForm" ref="newForm" label-width="80px" style="width:370px;margin:0 auto">
                <el-form-item label="所属课程"><el-select v-model="newForm.course" placeholder="选择课程"><el-option v-for="item in courses" :key="item.id" :label="item.name" :value="item.id"></el-option> </el-select></el-form-item>
                <el-form-item label="选择课件"><el-upload ref="upload" action="" :file-list="newForm.fileList"    :auto-upload="false"><el-button slot="trigger" size="small" type="primary">选择课件</el-button></el-upload></el-form-item> 
                <el-form-item label-width="10px"><el-button type="primary" style="width:320px;" @click="submit()">上传课件</el-button></el-form-item>
            </el-form>
        </el-dialog>
   </div>
</template>
<script>
export default {
    data(){
        return {
            data: null,
            show: false,
            newForm: {fileList:[]},
            courses: {},
        }
    },
    methods:{
        formatCourse(row,column) {return row.coursename},
        submit() {
          this.$refs['newForm'].validate((valid)=>{
            if(valid) {
                let form = this.$refs['newForm'].$el;
                let formData = new FormData(form);
                formData.append('course', this.newForm.course);
                formData.append('file', this.newForm.fileList[0]);
                let config = {headers:{'Content-Type':'multipart/form-data'}};
                this.$http.post('/api/index/setFile',formData).then(res=>{
                    this.$message({message:res.data.message,type:'success'});
                    this.show = false;
                })
            } else { alert('数据未验证') }})
        },
        //删除课件
        delFile(index,row) {
            this.$confirm('确定删除该课件吗？一旦删除无法恢复！','消息通知',{type:'warning'}).then(()=>{
                this.$http.post('/api/index/delFile',row).then(res=>{
                    if(res.data.status == 1) {this.data.splice(index,1);this.$message({'message':'删除成功',type:'success'})} else { this.$message.error(res.data.message) }
                })   
            })
        },
    },
    mounted(){
        this.$http.post('/api/index/getCourse',{"token":localStorage.getItem('token')}).then(res=>{this.courses = res.data.data})
        this.$http.post('/api/index/getFile',{"token":localStorage.getItem('token')}).then(res=>{this.data = res.data.data})
    }
}
</script>
<style>
    
</style>
