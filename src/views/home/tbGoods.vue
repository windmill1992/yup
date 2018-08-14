<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">淘宝商品列表</p>
            <div class="fr">
                <el-input v-model="searchTitle" placeholder="标题搜索"></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="addGoods">添加</el-button>
            </div>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column type="index" label="排序" width="80"></el-table-column>
                <el-table-column prop="tbProductId" label="ID" width="80"></el-table-column>
                <el-table-column prop="productTitle" label="标题" min-width="180"></el-table-column>
                <el-table-column prop="productLink" label="链接" min-width="180"></el-table-column>
                <el-table-column prop="originalPrice" label="原价" width="120"></el-table-column>
                <el-table-column prop="sellPrice" label="售价" width="120"></el-table-column>
                <el-table-column label="是否启用" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.isEnable ? '启用' : '不启用'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editGoods(scope.row.tbProductId)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="curChange" :current-page="curPage" 
                :page-size="pageSize" :total="total" layout="total, prev, pager, next" class="page fr">
            </el-pagination>
        </el-col>

        <el-dialog :visible.sync="showModal" :title="title" custom-class="goods-dialog">
            <el-form ref="form" :model="formdata" :rules="rules" label-width="100px" size="small">
                <el-form-item label="名称" prop="productTitle">
                    <el-input v-model="formdata.productTitle"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="formdata.productLink"></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload1" accept="image/*"
                        :on-success="goodsSuccess" :on-error="uploadError" :limit="1">
                        <img :src="formdata.cover" v-if="formdata.cover" class="front-img loading-target1" alt="">
                        <i v-else class="el-icon-plus front-icon loading-target1"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="原价" prop="originalPrice">
                    <el-input v-model.number="formdata.originalPrice"></el-input>
                </el-form-item>
                <el-form-item label="售价" prop="sellPrice">
                    <el-input v-model.number="formdata.sellPrice"></el-input>
                </el-form-item>
                <el-form-item label="二维码" prop="qrCode">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload2" accept="image/*"
                        :on-success="qrcodeSuccess" :on-error="uploadError" :limit="1">
                        <img :src="formdata.qrCode" v-if="formdata.qrCode" class="front-img loading-target2" alt="">
                        <i v-else class="el-icon-plus front-icon loading-target2"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-radio-group v-model="formdata.isEnable">
                        <el-radio :label="0">不启用</el-radio>
                        <el-radio :label="1">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="showModal = false">取消</el-button>
                <el-button type="success" @click="saveGoods">保存</el-button>
            </template>
        </el-dialog>
    </el-row>
</template>

<script>
import { baseUrl } from './../../api/baseUrl'

export default {
    data() {
        return {
            searchTitle: '',
            list: [],
            curPage: 1,
            pageSize: 20,
            total: 0,
            loading: false,
            showModal: false,
            title: '',
            formdata: {},
            rules: {
                productTitle: [
                    { required: true, message: '名称不能为空', trigger: 'blur' },
                ],
                cover: [
                    { required: true, message: '封面不能为空' },
                ],
                originalPrice: [
                    { type: 'number', required: true, message: '原价不能为空', trigger: 'blur' },
                ],
                sellPrice: [
                    { type: 'number', required: true, message: '售价不能为空', trigger: 'blur' },
                ],
                qrCode: [
                    { required: true, message: '二维码不能为空' },
                ],
            }
        }
    },
    computed: {
        uploadUrl() {
            return `${baseUrl}/yup-rest/upload?picType=1`;
        },
        maxFormHeight() {
            let h = window.innerHeight;
            return h - 400 + "px";
        },
    },
    methods: {
        curChange(idx) {
            this.curPage = idx;
            this.getGoodsList();
        },
        search() {
            this.curPage = 1;
            this.getGoodsList();
        },
        getGoodsList() {
            let param = {
                pageIndex: this.curPage,
                pageSize: this.pageSize,
                keywords: this.searchTitle,
            }
            this.loading = true;
            this.$http.post(`${baseUrl}/yup-rest/manage/tbpro-list`, param)
            .then(res => {
                this.loading = false;
                if(res.data.resultCode == 200 && res.data.resultData){
                    this.list = res.data.resultData.list;
                    this.total = res.data.resultData.total;
                }else{
                    if(res.data.resultMsg){
                        this.$message.error(res.data.resultMsg);
                    }else{
                        this.$message.error('查询关联商品错误');
                    }
                }
            })
            .catch(e => {
                this.loading = false;
                this.$message.error('未知错误----' + e);
            })
        },
        beforeUpload1(file) {
            if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'images/bmp'){
                return false;
            }
            if(file.size / 1024 / 1024 > 2){
                this.$message.error('图片大小不能超过2M！');
                return false;
            }
            this.uploading = this.$loading({
                target: '.loading-target1',
            })
            return true;
        },
        beforeUpload2(file) {
            if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif'){
                return false;
            }
            if(file.size / 1024 / 1024 > 2){
                this.$message.error('图片大小不能超过2M！');
                return false;
            }
            this.uploading = this.$loading({
                target: '.loading-target2',
            })
            return true;
        },
        uploadError() {
            this.$message.error('上传失败！');
            this.uploading.close();
        },
        goodsSuccess(res, file) {
            if(res.resultCode == 200){
                this.formdata.cover = res.resultData;
            }else{
                this.$message.error('上传失败！');
            }
            this.uploading.close();
        },
        qrcodeSuccess(res, file) {
            if(res.resultCode == 200){
                this.formdata.qrCode = res.resultData;
            }else{
                this.$message.error('上传失败！');
            }
            this.uploading.close();
        },
        addGoods() {
            this.showModal = true;
            this.title = '添加商品';
            if(this.$refs.form){
                this.$refs.form.resetFields();
            }
            this.formdata = {
                productTitle: '',
                productLink: '',
                cover: '',
                originalPrice: '',
                sellPrice: '',
                qrCode: '',
                tbProductId: 0,
                isEnable: 1,
            };
        },
        editGoods(id) {
            this.$http.get(`${baseUrl}/yup-rest/manage/tbpro-info`, { params: { tbProId: id } })
            .then(res => {
                if(res.data.resultCode == 200 && res.data.resultData){
                    this.formdata = Object.assign({}, res.data.resultData);
                    this.showModal = true;
                    this.title = '编辑商品';
                }else{
                    if(res.data.resultMsg){
                        this.$message.error(res.data.resultMsg);
                    }else{
                        this.$message.error('查询商品错误');
                    }
                }
            })
            .catch(e => {
                this.$message.error('未知错误----' + e);
            })
        },
        saveGoods() {
            this.$refs.form.validate((valid) => {
                if(valid){
                    this.$http.post(`${baseUrl}/yup-rest/manage/save-tbpro`, this.formdata)
                    .then(res => {
                        if(res.data.resultCode == 200 && res.data.resultData){
                            this.$message.success('保存成功');
                            this.showModal = false;
                            this.getGoodsList();
                        }else{
                            if(res.data.resultMsg){
                                this.$message.error(res.data.resultMsg);
                            }else{
                                this.$message.error('保存失败');
                            }
                        }
                    })
                    .catch(e => {
                        this.$message.error('未知错误----'+ e);
                    })
                }else{
                    this.$message.error('验证未通过');
                }
            });
        },
    },
    mounted() {
        this.getGoodsList();

        window.pageName = 'tbGoods';
        window.addEventListener('keypress', e => {
            if((e.keyCode == 13 || e.keyCode == 50) && window.pageName == 'tbGoods'){
                this.search();
            }
        }, false);
    },
}
</script>

<style scoped>
@import url(../../assets/css/home/trial.css);
.tool-bar{
    line-height: 36px;
    margin-bottom: 15px;
}
</style>
