<template>
    <main>
        <nav id="course-nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >{{course.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </nav>
        <article class="course-box">
            <section class="course-common">
                <div class="course-image">
                    <img :src="course.picture" alt="" width="450px" height="230px;">
                </div>
                <div class="course-info">
                    <div>
                        <h2>{{course.name}}</h2>
                        <span class="course-category">视频课</span>
                    </div>
                    <div class="course-teacher">
                        <p>主讲教师：{{author.username}}</p>
                        <p>教师信息：{{author.info}}</p>
                        <p>课时：{{videos.length}}课时</p>
                        <p>简介：{{course.info}}</p>
                    </div>
                    <el-button type="primary" round class="add-course"><router-link :to="{path:'/play',query:{id:videos[0].id}}" tag="span">立即观看</router-link> </el-button>
                </div>
            </section>
            <el-tabs type="border-card">
                <el-tab-pane label="视频目录">
                    <ul>
                        <li class="course-video" v-for="v in videos" :key="v.id"><i class="el-icon-video-play"></i> 课时：{{v.name}}<router-link class="course-link" :to="{name:'play',path:'/play',query:{id:v.id}}">立即观看</router-link></li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="课件下载">
                    <ul>
                        <li class="course-video" v-for="v in files" :key="v.id"><i class="el-icon-folder-opened"></i> {{v.name}}   <a :download="v.name" :href="v.addr" class="course-link"> <el-button  size="mini">立即下载</el-button> </a>  </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </article>
    </main>
</template>
<script>

export default {
    data() {
        return {
            course: null,
            author: null,
            videos: null,
            files: null
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.$http.post('/api/index/course',{'id':this.$route.query.id}).then(res=>{
                this.course = res.data.course;
                this.author = res.data.author;
                this.videos = res.data.videos;
            })
            this.$http.post('/api/index/getFile',{'course':this.$route.query.id}).then(res=>{
                this.files = res.data.data;
            })
        }
    }
}
</script>
<style lang="stylus">
    #course-nav 
        padding-top: 16px;
    .add-course 
        position: absolute;
        bottom: 0;
        left: 0;
    .course-box 
        width: 1180px;
        margin: 20px auto 50px;
    .course-common 
        box-sizing: border-box;
        width: 100%;
        height: 280px;
        margin: 18px 0;
        padding: 15px;
        background: #fff;
        border-radius: 3px;
    .course-image 
        display: inline-block;
        vertical-align: bottom;
        width: 450px;
        height: 100%;
        margin-right: 30px;
        img 
            border-radius: 5px;
    .course-info 
        display: inline-block;
        position: relative;
        vertical-align: bottom;
        width: 630px;
        height: 100%;
        h2 
            display: inline-block;
            font-weight: 300;
    .course-category 
        border: 1px solid #409eff;
        font-size: 12px;
        color: #409eff;
        margin-top: 5px;
        padding: 2px 4px;
    .course-teacher 
        height: 63px;
        p 
            font-size: 14px;
            color: #333;
            margin: 10px 0;
    .course-video 
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        line-height: 45px;
        padding: 0 30px;
        font-size: 15px;
        color: #999;
        &:hover
            background: #fafafa;
        .course-link
            float: right;
            margin: 0 15px 0 0;
            font-size: 14px;
            color: #999;
</style>
