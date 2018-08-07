import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'

import Index0 from '@/views/home/index'
import Trial from '@/views/home/trial'
import Feedback from '@/views/home/feedback'
import Guide from '@/views/home/guide'
import Comment from '@/views/home/comment'

import YupType from '@/views/system/yupType'
import GuideTag from '@/views/system/guideTag'

import Users from '@/views/user/users'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'el-icon-goods',
        children: [
            { path: '/index', component: Index0, name: '首页' },
            { path: '/trial', component: Trial, name: '试用' },
            { path: '/feedback', component: Feedback, name: '反馈' },
            { path: '/guide', component: Guide, name: '指南' },
            { path: '/comment', component: Comment, name: '评论' },
        ]
    },
    {
        path: '/system',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/yupType', component: YupType, name: 'yup类型' },
            { path: '/guideTag', component: GuideTag, name: '指南标签' },
        ]
    },
    {
        path: '/user',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-user',
        children: [
            { path: '/users', component: Users, name: '用户' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;