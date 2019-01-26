/**
 * Created by vikey on 2017/5/26.
 */
 /**
  * http配置
  * * */
// 引入axios
import axios from 'axios'

// axios 配置
axios.defaults.timeout = 10000;

//添加请求拦截器

// http request 拦截器
axios.interceptors.request.use(
    config => {

        if(config.url.indexOf('-delete')>0){
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }else {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                   // store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error)
    });

export default axios;
