<template>
    <el-row>
        <el-col :span="24" class="tool-bar">
            <p class="title fl">指南列表</p>
            <div class="fr">
                <el-input v-model="searchTitle" placeholder="标题"></el-input>
                <el-input v-model.number="searchLabelId" placeholder="标签id"></el-input>
                <el-select v-model="searchStatus" placeholder="状态">
                    <el-option value="" label="全部"></el-option>
                    <el-option :value="0" label="未发布"></el-option>
                    <el-option :value="1" label="已发布"></el-option>
                    <el-option :value="2" label="已推荐"></el-option>
                </el-select>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="addGuide">添加</el-button>
            </div>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" highlight-current-row v-loading="loading" border style="width: 100%;height: 90%;">
                <el-table-column type="index" label="排序" width="80"></el-table-column>
                <el-table-column prop="infoId" label="ID" width="80"></el-table-column>
                <el-table-column prop="title" label="标题" min-width="180"></el-table-column>
                <el-table-column prop="infoAddress" label="网址" min-width="180"></el-table-column>
                <el-table-column prop="infoSource" label="来源" width="120"></el-table-column>
                <el-table-column prop="labelNameList" label="类型" width="120">
                    <template slot-scope="scope">
                        <p v-for="item in scope.row.labelNameList">{{item}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.infoStatus == 0">未发布</span>
                        <span v-else-if="scope.row.infoStatus == 1">已发布</span>
                        <span v-else-if="scope.row.infoStatus == 2">已推荐</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editType(scope.row.infoId)">编辑</el-button>
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
                <el-form-item label="作者" prop="authorName">
                    <el-input v-model="formdata.authorName"></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload" accept="image/*"
                        :on-success="frontSuccess" :on-error="uploadError" :limit="1">
                        <img :src="formdata.cover" v-if="formdata.cover" class="front-img loading-target" alt="">
                        <i v-else class="el-icon-plus front-icon loading-target"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="头像" prop="authorAvatar">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload2" accept="image/*"
                        :on-success="avatarSuccess" :on-error="uploadError" :limit="1">
                        <img :src="formdata.authorAvatar" v-if="formdata.authorAvatar" class="front-img loading-target2" alt="">
                        <i v-else class="el-icon-plus front-icon loading-target2"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="来源" prop="infoSource">
                    <el-input v-model="formdata.infoSource"></el-input>
                </el-form-item>
                <el-form-item label="网址" prop="infoAddress">
                    <el-input v-model="formdata.infoAddress"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="labelId">
                    <el-select v-model="formdata.labelId">
                        <el-option :value="tag.labelId" :label="tag.labelName" v-for="tag in tagList" :key="tag.labelId">{{tag.labelName}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="infoStatus">
                    <el-select v-model="formdata.infoStatus">
                        <el-option :value="0" label="未发布">未发布</el-option>
                        <el-option :value="1" label="已发布">已发布</el-option>
                        <el-option :value="2" label="已推荐">已推荐</el-option>
                    </el-select>
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
                <el-form-item label="封面" prop="cover">
                    <el-upload class="front-pic" :action="uploadUrl" 
                        :show-file-list="false" :multiple="false" 
                        :before-upload="beforeUpload3" accept="image/*"
                        :on-success="goodsSuccess" :on-error="uploadError" :limit="1">
                        <img :src="goodsdata.cover" v-if="goodsdata.cover" class="front-img loading-target3" alt="">
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
            searchTitle: '',
            searchLabelId: '',
            searchStatus: '',
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
            tagList: [],
            rules: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' },
                ],
                authorName: [
                    { required: true, message: '作者不能为空', trigger: 'blur' },
                ],
                cover: [
                    { required: true, message: '封面图不能为空' },
                ],
                authorAvatar: [
                    { required: true, message: '头像不能为空' },
                ],
                infoSource: [
                    { required: true, message: '来源不能为空', trigger: 'blur' },
                ],
                infoAddress: [
                    { required: true, message: '网址不能为空', trigger: 'blur' },
                ],
                labelId: [
                    { required: true, message: '标签不能为空', trigger: 'blur' },
                ],
                infoStatus: [
                    { required: true, message: '状态不能为空', trigger: 'blur' },
                ],
                infoStatus: [
                    { required: true, message: '状态不能为空', trigger: 'blur' },
                ],
            },
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
        getTags(pn, ps) {
            this.$http.post(`${baseUrl}/yup-rest/manage/label-list`, { pageIndex: pn, pageSize: ps })
            .then(res => {
                if(res.data.resultCode == 200){
                    this.tagList = res.data.resultData.list;
                }else{
                    if(res.data.resultMsg){
                        this.$message.error(res.data.resultMsg);
                    }else{
                        this.$message.error('服务器错误！');
                    }
                }
            })
            .catch(() => {
                this.loading = false;
                this.$message.error('未知错误！');
            })
        },
        curChange(idx) {
            this.curPage = idx;
            this.getGuideList();
        },
        getGuideList() {
            let labelId = !Number.isNaN(Number.parseInt(this.searchLabelId)) && this.searchLabelId ? Number.parseInt(this.searchLabelId) : null;
            let param = {
                title: this.searchTitle,
                labelId: labelId,
                infoStatus: this.searchStatus == '' ? null : this.searchStatus,
                pageIndex: this.curPage,
                pageSize: this.pageSize,
            }
            this.loading = true;
            this.$http.post(`${baseUrl}/yup-rest/manage/info-list`, param)
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
        search() {
            this.curPage = 1;
            this.getGuideList();
        },
        addGuide() {
            this.showModal = true;
            this.title = '添加指南';
            this.formdata = {
                title: '',
                authorName: '',
                cover: '',
                authorAvatar: '',
                infoSource: '',
                infoAddress: '',
                infoStatus: 0,
                labelId: '',
                relatedProIdList: [],
                content: '',
                infoId: 0,
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
        editType(id) {
            this.showModal = true;
            this.title = '编辑指南';
            this.getInfoDetail(id);
        },
        getInfoDetail(id) {
            this.$http.post(`${baseUrl}/yup-rest/manage/info-detail?infoId=`+ id)
            .then(res => {
                if(res.data.resultCode == 200){
                    this.formdata = Object.assign({}, res.data.resultData);
                    let con = this.formdata.content;
                    if(!this.mceinit){
                        setTimeout(() => {
                            this.tinymceInit();
                        }, 100);
                        setTimeout(() => {
                            tinymce.activeEditor.setContent(con);
                        }, 500);
                    }else{
                        tinymce.activeEditor.setContent(con);
                    }
                }else{
                    this.$message.error(res.data.resultMsg);
                }
            })
        },
        save() {
            this.formdata.content = tinymce.activeEditor.getContent();
            this.formdata = Object.assign({}, this.formdata);
            this.$http.post(`${baseUrl}/yup-rest/manage/save-information`, this.formdata)
            .then(res => {
                if(res.data.resultCode == 200 && res.data.resultData){
                    this.showModal = false;
                    this.$message.success('保存成功！');

                    if(this.formdata.infoId == 0){
                        this.curPage = 1;
                        this.getGuideList();
                    }else{
                        this.getGuideList();
                    }
                }else{
                    if(res.data.resultMsg){
                        this.$message.error(res.data.resultMsg);
                    }else{
                        this.$message.error('保存失败');
                    }
                }
            })
            .catch(() => {
                this.$message.error('未知错误');
            })
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
                this.formdata.cover = res.resultData;
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
                this.formdata.authorAvatar = res.resultData;
            }else{
                this.$message.error('上传失败！');
            }
            this.uploading.close();
        },
        goodsSuccess(res, file) {
            if(res.resultCode == 200){
                this.goodsdata.cover = res.resultData;
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
                cover: '',
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
        this.getTags(1, 10);
    },
    destroyed() {
        if(tinymce.get('conEditor')){
            tinymce.get('conEditor').destroy();
        }
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
