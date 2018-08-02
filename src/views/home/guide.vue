<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">指南列表</p>
            <div class="fr">
                <el-input placeholder="搜索"></el-input>
                <el-button type="primary" >搜索</el-button>
                <el-button type="primary" @click="addGuide">添加</el-button>
            </div>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column prop="index" label="排序" width="80"></el-table-column>
                <el-table-column prop="entryApplyId" label="ID" width="80"></el-table-column>
                <el-table-column prop="userName" label="标题" min-width="180"></el-table-column>
                <el-table-column prop="mobile" label="网址" min-width="180"></el-table-column>
                <el-table-column prop="wechat" label="来源" width="100"></el-table-column>
                <el-table-column prop="note" label="类型" width="100"></el-table-column>
                <el-table-column prop="note" label="状态" width="120"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editType(scope.row)">编辑</el-button>
                        <el-button type="success" size="mini" @click="relation(scope.row.entryApplyId)">关联商品</el-button>
                        <el-button type="danger" size="mini" @click="deleteType(scope.row.entryApplyId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="curChange" :current-page="curPage" 
                :page-size="pageSize" :total="total" layout="total, prev, pager, next" class="page fr">
            </el-pagination>
        </el-col>

        <el-dialog :visible.sync="showModal" :title="title" custom-class="edit-dialog">
            <el-form ref="form" :model="formdata" label-width="100px" :rules="rules" size="small" :style="{ 'max-height': maxFormHeight }">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formdata.title"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="formdata.author"></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="coverImg">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload" accept="image/*"
                        :on-success="frontSuccess" :on-error="uploadError" :limit="1">
                        <img :src="formdata.coverImg" v-if="formdata.coverImg" class="front-img loading-target" alt="">
                        <i v-else class="el-icon-plus front-icon loading-target"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="头像" prop="avatarImg">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload2" accept="image/*"
                        :on-success="avatarSuccess" :on-error="uploadError" :limit="1">
                        <img :src="formdata.avatarImg" v-if="formdata.avatarImg" class="front-img loading-target2" alt="">
                        <i v-else class="el-icon-plus front-icon loading-target2"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="来源" prop="source">
                    <el-input v-model="formdata.source"></el-input>
                </el-form-item>
                <el-form-item label="网址">
                    <el-input v-model="formdata.web"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model.number="formdata.state"></el-input>
                </el-form-item>
                <el-form-item label="商品">
                    <a href="javascript:;" v-for="img in formdata.imgs" :key="img" class="goods-pic" @click="editGoods()">
                        <img :src="img" alt="">
                    </a>
                    <el-button type="ghost" @click="addGoods">添加商品</el-button>
                </el-form-item>
                <el-form-item label="内容">
                    <textarea id="conEditor"></textarea>
                </el-form-item>

            </el-form>
            <template slot="footer">
                <el-button @click="showModal = false">取消</el-button>
                <el-button type="success" @click="save">保存</el-button>
            </template>
        </el-dialog>

        <el-dialog :visible.sync="showGoodsModal" :title="goodsTitle" custom-class="goods-dialog">
            <el-form :model="goodsdata" label-width="100px" size="small">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="goodsdata.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="weburl">
                    <el-input v-model="goodsdata.weburl"></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="coverImg">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload3" accept="image/*"
                        :on-success="goodsSuccess" :on-error="uploadError" :limit="1">
                        <img :src="goodsdata.coverImg" v-if="goodsdata.coverImg" class="front-img loading-target3" alt="">
                        <i v-else class="el-icon-plus front-icon loading-target3"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="showGoodsModal = false">取消</el-button>
                <el-button type="success" @click="saveGoods">保存</el-button>
            </template>
        </el-dialog>
    </el-row>
</template>

<script>
import { tinymce } from '../../../static/tinymce/plugin';
import { baseUrl } from './../../api/baseUrl'

export default {
    data() {
        return {
            list: [],
            curPage: 1,
            pageSize: 20,
            total: 0,
            loading: false,
            showModal: false,
            showGoodsModal: false,
            title: '',
            goodsTitle: '',
            formdata: {},
            goodsdata: {},
            rules: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' },
                ],
                author: [
                    { required: true, message: '作者不能为空', trigger: 'blur' },
                ],
                coverImg: [
                    { required: true, message: '封面图不能为空' },
                ],
                avatarImg: [
                    { required: true, message: '头像不能为空' },
                ],
                source: [
                    { required: true, message: '来源不能为空', trigger: 'blur' },
                ],
            },
            read: false,
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
            this.getGuideList();
        },
        getGuideList() {
            this.loading = true;
            this.$http.get(`${baseUrl}/yup-rest/manage/enter-apply-list`, {
                params: {  pageIndex: this.curPage, pageSize: this.pageSize}
            })
            .then(res => {
                this.loading = false;
                if(res.data.resultCode == 200){
                    let r = res.data.resultData;
                    this.list = r.list;
                    this.total = r.total;
                }else{
                    this.$message({
                        message: res.data.resultMsg,
                        type: 'error',
                        duration: 0,
                        showClose: true,
                    })
                }
            })
            .catch(() => {
                this.loading = false;
                this.$message.error('未知错误！');
            })
        },
        relation(id) {

        },
        addGuide() {
            this.showModal = true;
            this.title = '添加指南';
            this.formdata = {
                title: '',
                author: '',
                coverImg: '',
                avatarImg: '',
                source: '',
                web: '',
                tag: '',
                state: 1,
                goods: [],
                content: '',
            }
            if(!this.mceinit){
                setTimeout(() => {
                    this.tinymceInit();
                }, 100);
                setTimeout(() => {
                    tinymce.activeEditor.setContent('');
                }, 500);
            }else{
                tinymce.activeEditor.setContent('');
            }
        },
        save() {

        },
        beforeUpload(file) {
            if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'images/bmp'){
                return false;
            }
            if(file.size / 1024 / 1024 > 2){
                this.$message.error('图片大小不能超过2M！');
                return false;
            }
            this.uploading = this.$loading({
                target: '.loading-target',
            })
            return true;
        },
        beforeUpload2(file) {
            if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'images/bmp'){
                return false;
            }
            if(file.size / 1024 / 1024 > 1){
                this.$message.error('图片大小不能超过1M！');
                return false;
            }
            this.uploading = this.$loading({
                target: '.loading-target2',
            })
            return true;
        },
        beforeUpload3(file) {
            if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'images/bmp'){
                return false;
            }
            if(file.size / 1024 / 1024 > 2){
                this.$message.error('图片大小不能超过2M！');
                return false;
            }
            this.uploading = this.$loading({
                target: '.loading-target3',
            })
            return true;
        },
        frontSuccess(res, file) {
            if(res.resultCode == 200){
                this.formdata.coverImg = res.resultData;
            }else{
                this.$message.error('上传失败！');
            }
            this.uploading.close();
            },
        uploadError() {
            this.$message.error('上传失败！');
            this.uploading.close();
        },
        avatarSuccess(res, file) {
            if(res.resultCode == 200){
                this.formdata.avatarImg = res.resultData;
            }else{
                this.$message.error('上传失败！');
            }
            this.uploading.close();
        },
        goodsSuccess(res, file) {
            if(res.resultCode == 200){
                this.goodsdata.coverImg = res.resultData;
            }else{
                this.$message.error('上传失败！');
            }
            this.uploading.close();
        },
        addGoods() {
            this.showGoodsModal = true;
            this.goodsTitle = '添加商品';
            this.goodsdata = {
                name: '',
                weburl: '',
                coverImg: '',
            };
        },
        editGoods() {

        },
        saveGoods() {

        },
        tinymceInit() {
            console.log('mce init');
            tinymce.init({
                selector: '#conEditor',
                branding: false,
                elementpath: false,
                height: 300,
                language: 'zh_CN',
                language_url: '/static/tinymce/langs/zh_CN.js',
                skin_url: '/static/tinymce/skins/lightgray',
                menubar: false, //'edit insert view format table tools',
                toolbar_items_size: 'small',
                theme: 'modern',
                plugins: [
                    "advlist autolink link image lists charmap print hr anchor pagebreak spellchecker",
                    "searchreplace visualblocks visualchars code fullscreen media nonbreaking",
                    "table directionality emoticons template textcolor paste textcolor colorpicker textpattern"
                ],
                toolbar1: "insertfile undo redo | formatselect | fontselect | fontsizeselect | bullist numlist | link unlink ",
                toolbar2: " styleselect forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | fullscreen",
                autosave_interval: '20s',
                image_advtab: true,
                font_formats: "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Arial='Arial';",
                fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse'
                }
            });
            this.mceinit = true;
        }
    },
    mounted() {
        this.getGuideList();

    },
    destroyed() {
        tinymce.get('conEditor').destroy();
    }
}
</script>

<style scoped>
@import url(../../assets/css/home/trial.css);
.tool-bar{
    line-height: 36px;
    margin-bottom: 15px;
}
</style>
