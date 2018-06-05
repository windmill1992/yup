import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

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
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'el-icon-goods',//图标样式class
        children: [
            { path: '/index', component: Index0, name: '首页' },
            { path: '/trial', component: Trial, name: '试用' },
            { path: '/feedback', component: Feedback, name: '反馈' },
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