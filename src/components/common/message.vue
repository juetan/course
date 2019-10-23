<template>
    <div>
        <el-button type="primary" size="small" @click="show=true">发送消息</el-button>
        <el-table :data="data">
            <el-table-column prop="from" label="发送者名字" width="150px" :formatter="formatFrom"></el-table-column>
            <el-table-column prop="content" label="消息内容" min-width="250px" ></el-table-column>
            <el-table-column prop="status" label="状态" width="100px" :formatter="formatStatus"></el-table-column>
            <el-table-column prop="regtime" label="发送时间" width="200px" ></el-table-column>
            <el-table-column fixed="right" label="操作" width="200px" >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="readed(scope.$index,scope.row)">设为已读</el-button>
                    <el-button type="danger"  size="mini" @click="delMessage(scope.$index,scope.row)"><i class="el-icon-delete"></i>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加新的消息"  :visible.sync="show" width="600px">
            <el-form name="addMessageForm" :model="newForm" ref="addMessageForm" :rules="newRules" label-width="80px" style="width:370px;margin:0 auto">
                <el-form-item label="发送给：" prop="to"><el-select v-model="newForm.to" placeholder="选择接收者" ><el-option v-for="v in users" :key="v.id" :value="v.uid" :label="v.username"></el-option></el-select></el-form-item>
                <el-form-item label="消息内容" prop="content"><el-input v-model="newForm.content" type="textarea" ></el-input></el-form-item>
                <el-form-item label-width="10px"><el-button type="primary" style="width:320px;" @click="submit()">添加消息</el-button></el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: null,
            newForm: {},
            users: {},
            show: false,
            newRules: {
                to: this.rule(),
                content: this.rule()
            }
        }
    },
    methods: {
        formatFrom(row,column) {return row.fromname;},
        formatStatus(row,column) {if(row.status == 1) {return "已读"} else {return "未读"}},
        submit() {
            this.$refs['addMessageForm'].validate(valid=>{
                if(valid) {
                    this.$http.post('/api/index/setMessage',this.newForm).then(res=>{
                        if(res.data.status == 1) {this.$refs['addMessageForm'].resetFields();this.$message({message:res.data.message,type:'success'});this.show = false} else {this.$message.error(res.data.message)}
                    })
                } else {this.$message.error('请按要求填写表单内容')}
            })
        },
        readed(index,row) {
            this.$http.post('/api/index/readed',row).then(res=>{
                if(res.data.status == 1) {this.$message({message:res.data.message,type:'success'});} else {this.$message.error(res.data.message)}
            })
        },
        delMessage(index,row) {
            this.$confirm('确定删除该消息吗？一旦删除无法恢复！','消息通知',{type:'warning'}).then(()=>{
                this.$http.post('/api/index/delMessage',row).then(res=>{if(res.data.status == 1) {this.data.splice(index,1);this.$message({'message':'删除成功',type:'success'})} else {this.$message.error(res.data.message)}})
            })
        }
    },
    mounted() {
        this.$http.post('/api/index/message',{"token":localStorage.getItem('token')}).then(res=>{
            this.data = res.data.data;
        })
        this.$http.get('http://www.c.com/index/index/getUser').then(res=>{this.users = res.data.data})
    }
}
</script>
<style>

</style>