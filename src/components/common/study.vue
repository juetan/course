<template>
    <div>
        <el-table :data="data">
            <el-table-column prop="id" label="ID" width="100px" sortable></el-table-column>
            <el-table-column prop="video" label="视频名字" width="200px" :formatter="formatVideo"></el-table-column>
            <el-table-column prop="course" label="课程名字" min-width="250px" :formatter="formatCourse"></el-table-column>
            <el-table-column prop="regtime" label="完成时间" width="200px" ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100px" >
                <template slot-scope="scope">
                    <el-button type="danger"  size="mini" @click="delCourse(scope.$index,scope.row)"><i class="el-icon-delete"></i>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: null
        }
    },
    methods: {
        formatVideo(row,column) {return row['videoname']},
        formatCourse(row,column) {return row['coursename']},
        delCourse(index,row) {
            this.data.splice(index,1);
        }
    },
    mounted() {
        this.$http.post('/api/index/study',{"token":localStorage.getItem('token')}).then(res=>{
            this.data = res.data.data;
        })
    }
}
</script>
<style>

</style>


