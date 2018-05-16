import axios from 'axios';
import {baseUrl} from './baseUrl'

var qs = require('qs');

let base = baseUrl; //process.env.NODE_ENV === 'development' ? 'http://localhost:7080': "http://api.demo.taohaifang.com";

export const getCategoryListPage = params => { return axios.post(`${base}/jxjsj/category-list`, params); };

export const getCategoryList = params => { return axios.get(`${base}/jxjsj/category-list`, qs.stringify(params)); };

export function loadCategory(id, params) {
    var url = `${base}/jxjsj/load/${id}`;
    return axios.get(url,{params:params});
}

export function deleteCategory(id) {
    var url = `${base}/jxjsj/category-delete`;
    return axios.post(url,qs.stringify({categoryId:id}));
}

export const deleteBatchCategory = params => { return axios.post(`${base}/jxjsj/deleteBatch`, qs.stringify(params)); };

export const addCategory = params => { return axios.post(`${base}/jxjsj/category-add`, params); };

export const editCategory = params => { return axios.post(`${base}/jxjsj/category-update`, params); };