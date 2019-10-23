<template>
    <main id="video-main">
        <div class="stage">
            <article class="play">
                <video-player class="vjs-custom-skin" :options="PlayerOptions"></video-player>
            </article>
            <aside class="aside">
                <h2 class="aside-title">播放列表</h2>
                <ul class="aside-list">
                    <li class="aside-item" v-for="v in videos" :key="v.id">
                        <router-link class="aside-link" :to="{path:'/play',query:{id: v.id}}">
                            <img :src="v.picture" alt="" class="aside-img">
                            <span class="aside-name">{{v.name}}</span>
                        </router-link> 
                    </li>
                </ul>
            </aside>
        </div>
    </main>
</template>
<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
import 'videojs-contrib-hls'
export default {
    data() {
        return {
            play: null,
            video: null,
            videos: null,
            course: null,
            author: null,
            player: null,
            PlayerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], 
                autoplay: false, 
                controls: true, 
                preload: 'auto', 
                muted: false, 
                loop: false, 
                language: 'zh-CN',
                aspectRatio: '16:9', 
                fluid: true, 
                sources: [{
                    //type: "application/x-mpegURL",
                    //src: "http://play.keior.net/live/juetanstream.m3u8"n'
                }],
                //poster: "/static/video/4.jpg", 
                notSupportedMessage: '此视频暂无法播放，请稍后再试' 
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {   
        fetchData() {
            this.$http.post('/api/index/video',{'id':this.$route.query.id}).then(res=>{
                this.video = res.data.video;
                this.course = res.data.course;
                this.author = res.data.author;
                this.videos = res.data.videos;
                this.PlayerOptions.sources.push({type:'video/mp4',src:res.data.video.url});
                this.PlayerOptions.poster = this.video.picture;
            })
        },
    },
    watch: {
        '$route': 'fetchData'
    }
}
</script>
<style lang="stylus">
    .video-js 
        width: 920px!important;
        height: 580px!important;
    #video-main 
        height: 650px;
    .stage 
        display: grid;
        grid-template-columns: auto 250px;
        width: 1180px;
        margin: 0 auto;
        padding-top: 20px;
    .play 
        width: 920px;
        height: 580px;
    .aside 
        border-radius: 5px;
        height: 580px;
        background: #607d8b2e;
    .aside-title 
        margin: 10px 0;
        text-align: center;
        font-size: 16px;
    .aside-list 
        display: block;
    .aside-item 
        display: block;
        position: relative;
        width: 220px;
        height: 120px;
        margin: 15px auto;
        border-radius: 3px;
    .aside-img 
        width: 100%;
        height: 100%;
        border-radius: 3px;
    .aside-name 
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        background: rgba(0,0,0,.3)
</style>