import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'


import Case from './views/view/case.vue'
import Category from './views/view/category.vue'
import Detail from './views/view/detail.vue'
import Upload from './views/view/upload.vue'
import Index0 from './views/view/index.vue'
import Trial from './views/view/trial.vue'
import Feedback from './views/view/feedback.vue'
import Users from './views/view/users.vue'

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
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/index', component: Index0, name: '首页' },
            { path: '/trial', component: Trial, name: '试用' },
            { path: '/feedback', component: Feedback, name: '反馈' },
            { path: '/users', component: Users, name: '用户' },
        ]
        /* children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/case', component: Case, name: '案件', hidden: true },

            { path: '/detail/:caseId/:dossierId', component: Detail, name: '事件2',hidden:true },
            { path: '/category', component: Category, name: '分类', hiddentrue },
            { path: '/upload', component: Upload, name: '上传' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' }
        ] */
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;