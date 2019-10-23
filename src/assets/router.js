import Vue from 'vue'
import Router from 'vue-router'
// +---------------------------------------
// | 路由组件(1.引入组件 2.注册路由)
// +---------------------------------------

import index from '@/components/index'
import course from '@/components/course'
import play from '@/components/play'
import student from '@/components/student.vue'
import setting from '@/components/common/setting'
import studentStudy from '@/components/common/study'
import message from '@/components/common/message'
import teacher from '@/components/teacher'
import teacherCourse from '@/components/common/course.vue'
import living from '@/components/common/living'
import file from '@/components/common/file'
import live from '@/components/live'
import teacherStudent from '@/components/common/student'

Vue.use(Router)

export default new Router({
    //mode: 'history',
    routes: [
        { path: '/', name: 'index', component: index },
        { path: '/live', name: 'live', component: live },
        { 
            path: '/student',
            name: 'student',
            component: student,
            children: [
                { path: '', name: 'setting', component: setting },
                { path: 'study', name: 'study', component: studentStudy },
                { path: 'message', name: 'message', component: message }
            ],
            beforeEnter: (to,from,next)=>{
                if(!localStorage.getItem('token')) {
                    alert('尚未登录，无法访问')
                    next(false);
                } else {
                    if(localStorage.getItem('type') != 0) {
                        alert('您的身份不是是学生，没有进入权限！')
                        next(false);
                    } else {
                        next()
                    }
                }
                
            }
        }, 
        {
            path: '/teacher',
            name: 'teacher',
            component: teacher,
            children: [
                { path: 'course', name: 'teachercourse', component: teacherCourse },
                { path: '', name: 'setting', component: setting },
                { path: 'message', name: 'message', component: message },
                { path: 'living', name: 'living', component: living },
                { path: 'file', name: 'file', component: file },
                { path: 'student', name: 'teacherStudent', component: teacherStudent },
            ],
            beforeEnter: (to,from,next)=>{
                if(localStorage.getItem('type') == 0) {
                    alert('您的身份是学生，没有进入权限！')
                    next(false);
                } else {
                    if(!localStorage.getItem('token')) {
                        alert('尚未登录，无法访问')
                        next(false);
                    } else {
                        next()
                    }
                    
                }
            }
        },
        { path: '/course', name: 'course', component: course },
        { path: '/play', name: 'play', component: play },
    ]
})