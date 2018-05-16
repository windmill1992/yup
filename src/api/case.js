import axios from 'axios';

import {baseUrl} from './baseUrl'

var qs = require('qs');

let base = baseUrl; //process.env.NODE_ENV === 'development' ? 'http://localhost:7080': "http://api.demo.taohaifang.com";

export const getCaseListPage = params => { return axios.post(`/api/yup-rest/pro-index`, params); };

export const getCaseList = params => { return axios.post(`${base}/jxjsj/list`, qs.stringify(params)); };

export function loadCase(id, params) {
    var url = `${base}/jxjsj/case-info?caseId=${id}`;
    return axios.get(url,{params:params});
}

export function deleteCase(id) {
    var url = `${base}/jxjsj/case-delete`;
    return axios.post(url,qs.stringify({caseId:id}));
}

export function deleteBatchCase(caseIds) {
    var url=`${base}/jxjsj/case-batch-delete`;
    return axios.post(url, qs.stringify({caseIdList:caseIds}));
}

export const addCase = params => { return axios.post(`${base}/jxjsj/case-add`, params); };

export const editCase = params => { return axios.post(`${base}/jxjsj/case-update`, params); };

//
export function exportCase(id) {
    var url = `${base}/jxjsj/case-export?caseId=${id}`;
    return axios.get(url);
}