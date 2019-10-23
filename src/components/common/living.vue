<template>
    <div>
        <el-form :model="form" label-width="100px">
            <el-form-item label="服务器">
                <el-input v-model="form.server"></el-input>
            </el-form-item>
            <el-form-item label="串流密钥">
                <el-input v-model="form.key"></el-input>
            </el-form-item>
            <el-form-item label="Tip">
                打开OBS直播软件，在设置中粘贴以上内容即可进行直播。
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                server: 'rtmp://48210.livepush.myqcloud.com/live/',
                key: 'juetanstream?txSecret=59e214be5920456c48c5aca678389ce8&txTime=5D18DC7F'
            }
        }
    }
}
</script>
<style lang="stylus">

</style>


