<template>
   <div>
       <!-- 表格 -->
       <el-table :data="data" style="width:100%">
            <el-table-column prop="user" label="学生" width="100px"  :formatter="formatUser"></el-table-column>
            <el-table-column prop="video" label="已学视频" width="200px"  :formatter="formatVideo"></el-table-column>
            <el-table-column prop="course" label="所属课程" min-width="200px" :formatter="formatCourse"></el-table-column>
            <el-table-column prop="regtime" label="完成时间" width="160px" ></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" >
                <template slot-scope="scope"><el-button type="danger"  size="mini" @click="del(scope.$index,scope.row)">移除该学生</el-button></template>
            </el-table-column>
        </el-table>
   </div>
</template>
<script>
  ((window.gitter = {}).chat = {}).options = {
    room: 'juetan'
  };
</script>
<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>
<script>

export default {
    data(){
        return {
            data: null,
            show: false,
            newForm: {},
            users: {},
            teacher: null,
            teachers: null
        }
    },
    methods: {
        formatUser(row,column) {return row['username']},
        formatVideo(row,column) {return row['videoname']},
        formatCourse(row,column) {return row['coursename']},
        del(index,row) {
            this.$confirm('确定删除吗？','消息通知',{type:'warning'}).then(()=>{
                this.$http.post('/api/index/delStudy',row).then(res=>{if(res.data.status == 1) {this.data.splice(index,1);this.$message({'message':'删除成功',type:'success'})} else {this.$message.error(res.data.message)}})
            })
        },
    },
    mounted(){ 
        this.$http.get('/api/index/getUser?type=1').then(res=>{this.teachers = res.data.data});
        this.$http.get('/api/index/getStudy',{'author':this.teacher}).then(res=>{this.data = res.data.data})
    }
}
</script>
<style>
    
</style>
