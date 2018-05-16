import axios from 'axios';
import {baseUrl} from './baseUrl'

var qs = require('qs');

let base = baseUrl; //process.env.NODE_ENV === 'development' ? 'http://localhost:7080': "http://api.demo.taohaifang.com";

export const getDetailListPage = params => { return axios.post(`${base}/jxjsj/detail-list`, params); };

export const getDetailList = params => { return axios.post(`${base}/jxjsj/list`, qs.stringify(params)); };

export function loadDetail(id, params) {
    var url = `${base}/jxjsj/load/${id}`;
    return axios.get(url,{params:params});
}

export function deleteDetail(id) {
    var url = `${base}/jxjsj/detail-delete`;
    return axios.post(url,qs.stringify({detailId:id}));
}

export function deleteBatchDetail(detailIds) {
    var url=`${base}/jxjsj/detail-batch-delete`;
    return axios.post(url, qs.stringify({detailIdList:detailIds}));
}

export const addDetail = params => { return axios.post(`${base}/jxjsj/detail-add`, params); };

export const editDetail = params => { return axios.post(`${base}/jxjsj/detail-update`, params); };

export const sortDetail = params => { return axios.post(`${base}/jxjsj/detail-sort`, params); };