import axios from 'axios';
import {baseUrl} from './baseUrl'

var qs = require('qs');

let base = baseUrl; //process.env.NODE_ENV === 'development' ? 'http://localhost:7080': "http://api.demo.taohaifang.com";

export const getDossierListPage = params => { return axios.post(`${base}/jxjsj/dossier-list`, params); };

export const getDossierList = params => { return axios.post(`${base}/jxjsj/list`, qs.stringify(params)); };

export function loadDossier(id, params) {
    var url = `${base}/jxjsj/load/${id}`;
    return axios.get(url,{params:params});
}

export function deleteDossier(id) {
    var url = `${base}/jxjsj/dossier-delete`;
    return axios.post(url,qs.stringify({dossierId:id}));
}

export function deleteBatchDossier(dossierIds) {
    var url=`${base}/jxjsj/dossier-batch-delete`;
    return axios.post(url, qs.stringify({dossierIdList:dossierIds}));
}

export const addDossier = params => { return axios.post(`${base}/jxjsj/dossier-add`, params); };

export const editDossier = params => { return axios.post(`${base}/jxjsj/dossier-update`, params); };


export function exportDossier(id) {
    var url = `${base}/jxjsj/dossier-export?dossierId=${id}`;
    return axios.get(url);
}