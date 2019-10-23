<template>
    <div id="content">
        <router-link v-for="v in courses" :key="v.id" class="course" :to="{path:'/course',query:{id:v.id}}">
            <div class="course-image">
                <img class="course-img" :src="v.picture" :alt="v.name" width="270px" height="140px">
            </div>
            <div class="course-all">
                <h3 class="course-name">{{v.name}}</h3>
                <p class="course-info">{{v.info}}</p>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            courses:null
        }
    },
    mounted() {
        this.$http.get('/api/index/getCourse').then(res=>{
            this.courses = res.data.data;
        })
    }
}
</script>
<style lang="stylus">
    .course
        display: inline-block
        width: 270px
        height: 208px
        margin: 10px
        background: #fff
        cursor: pointer
        vertical-align: bottom
        box-shadow: 0 0 10px #ccc
        &:hover
            box-shadow: 0 3px 10px rgba(64, 158, 255, 0.5);
            img 
                transform: scale(1.1);
        .course-image
            position: relative;
            width: 100%;
            height: 140px;
            overflow: hidden;
            .course-img
                transition: all .8s cubic-bezier(0, .6, .3, 1);
        .course-all
            padding: 10px;
            .course-name
                font-size: 18px;
                font-weight: 400;
                color: #444;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            .course-info
                width: 100%;
                margin: 10px 0;
                color: #999;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
    
</style>

