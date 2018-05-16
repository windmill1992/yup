<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>

                    {{CaseInfo.caseName}}
                </el-form-item>
                <el-form-item  prop="categoryName">
                    <template>
                        <el-select v-model="filters.dossierId" placeholder="请选择卷书">
                            <el-option
                                    v-for="item in Dossiers" :key="item.dossierId"
                                    :label="item.dossierName"
                                    :value="item.dossierId">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item>
                <el-input v-model="filters.detailTitle" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" v-on:click="getDetail">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="Details" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="author" label="责任者"  sortable></el-table-column>
            <el-table-column prop="referenceNum" label="文号"  sortable></el-table-column>
            <el-table-column prop="detailTitle" label="标题"  sortable></el-table-column>
            <el-table-column prop="pageNumber" label="页号"  sortable></el-table-column>
            <el-table-column prop="remark" label="备注"  sortable></el-table-column>
            <el-table-column  width="70">
                <template slot-scope="scope">
                     <el-button v-if="scope.row.fileName!=''" size="small" @click="openPage(scope.row.fileName)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <!--<template scope="scope">-->
                        <!--<el-popover ref="popover{{$index}}" trigger="hover" >-->
                            <!--<p> <img :src="scope.row.logo"/></p>-->

                        <!--</el-popover>-->
                        <!--&lt;!&ndash;<el-button v-popover:popover{{$index}}>hover 激活</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button size="small" type="danger" >删除</el-button>&ndash;&gt;-->
                        <!--{{ scope.row.mediaName }}-->
                        <!--<el-button v-if="scope.row.fileName!=''" size="small" v-popover:popover{{$index}}  @click="doShowLogo(scope.row)">图-->
                        <!--</el-button>-->
                    <!--</template>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="sizes,prev, pager, next" :page-sizes="[20, 50, 100, 400]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog v-bind:title="dialogTitle" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="责任者" prop="author">
                    <el-input v-model="editForm.author" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="文号" prop="referenceNum">
                    <el-input v-model="editForm.referenceNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="detailTitle">
                    <el-input v-model="editForm.detailTitle" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="页号" prop="pageNumber">
                    <el-input v-model="editForm.pageNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="editForm.remark" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="上传" >
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            accept=".docx,.doc,.jpeg,.jpg,.xlsx,.xls,.pdf"
                            :file-list="fileList"
                            :action="UploadUrl()"
                            :on-success="uploadSucess"
                            :on-error="uploadErr"
                            :before-upload="uploadBefore"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">仅能上传 pdf,docx,doc,xlsx,xls,jpeg,jpg</div>
                    </el-upload>

                </el-form-item>

                <div v-bind:style="{ display : 'none' }">
                    <el-input v-model="editForm.dossierId"></el-input>
                    <el-input v-model="editForm.detailId"></el-input>
                    <el-input v-model="editForm.caseId"></el-input>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="closeEditForm">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <form id="pdfForm" name="pdfForm" target="_blank">
            <input id="fileName" name="fileName" type="hidden"  value=""/>
        </form>

    </section>
</template>

<script>
    import util from '../../common/js/util'
    import NProgress from 'nprogress'
    import Sortable from 'sortablejs'

    import { loadCase } from '../../api/Case';
    import { getDetailListPage, getDetailList, deleteDetail, addDetail, editDetail,deleteBatchDetail,sortDetail } from '../../api/Detail';
    import { getDossierListPage} from '../../api/Dossier';
    import {baseUrl} from '../../api/baseUrl'

    export default {
        data() {
            return {
                filters: {
                    detailTitle: '',
                    caseId:'',
                    dossierId:''
                },
                fileList:[],
                CaseInfo:[],
                Details: [],
                sortable: null,
                olderList: [],
                newList: [],
                Dossiers:[],
                dialogTitle:'',
                total: 0,
                page: 1,
                pageSize:20,
                listLoading: false,
                sels: [],//列表选中列
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    detailTitle: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    detailId: '',
                    detailTitle: '',
                    author:'',
                    referenceNum:'',
                    fileName:'',
                    pageNumber:'',
                    remark:'',
                    caseId:'',
                    dossierId:''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false

            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getDetail();
            },
            handleSizeChange(val){
                this.page = 1;
                this.pageSize=val;
                this.getDetail();
            },
            //获取事件列表
            getDetail() {
                var dossierId=this.filters.dossierId;
//                if(dossierId==''){
//                    dossierId=this.$route.params.dossierId;
//                }
                let para = {
                    pageIndex: this.page,
                    pageSize: this.pageSize,
                    dossierId: dossierId,
                    caseId: this.caseId,
                    detailTitle:this.filters.detailTitle
                };
                this.listLoading = true;
                getDetailListPage(para).then((res) => {

                    if(res.data.resultCode==200){
                        this.Details=res.data.resultData.detailModelList;
                        this.total = res.data.resultData.count;

                        this.olderList = this.Details.map(function (detail) { return detail; });//.map(v => v.detailTitle)
                        this.newList = this.olderList.slice()

                        this.$nextTick(() => {
                            this.setSort()
                        })
                    }else{
                        this.$message({
                            message: res.data.resultMsg,
                            type: 'error'
                        });
                    }

                    this.listLoading = false;
                });
            },
            setSort() {
                const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]

                this.sortable = Sortable.create(el, {
                    onEnd: evt => {
                        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                        this.newList.splice(evt.newIndex, 0, tempIndex)

                        let initialSort =[];
                        let currentSort = [];
                        //alert(JSON.stringify(this.newList));
                        for(let i = 0;i<this.newList.length;i++){

                            let oldObject = {detailId:this.olderList[i].detailId,sort:this.olderList[i].sort};
                            let newObject = {detailId:this.newList[i].detailId,sort:this.newList[i].sort};
                            initialSort.push(oldObject);
                            currentSort.push(newObject);
                        }

                        let para = {
                            currentSort: currentSort
                        };

                        sortDetail(para).then((res) => {

//                                alert(JSON.stringify(res));
                        });
                        ///
                    }
                })
            },
            //获取案件信息
            getCaseInfo() {
                loadCase(this.caseId).then((res) => {

                    if(res.data.resultCode==200){
                        this.CaseInfo=res.data.resultData;
                    }else{
                        this.$message({
                            message: res.data.resultMsg,
                            type: 'error'
                        });
                    }

                    //this.listLoading = false;
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { detailId: row.detailId };

                    deleteDetail(row.detailId).then((res) => {
                        if(res.data.resultCode==200){
                            this.listLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getDetail();
                        }
                    });

                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.dialogTitle = '编辑-事件';
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
//                this.$refs.upload.clearFiles();
            },
            //显示新增界面
            handleAdd: function () {


                var dossierId=this.filters.dossierId;
                if(dossierId==''){
                    //dossierId=this.$route.params.dossierId;
                    this.$message({
                        message: '请选择卷书名称',
                        type: 'warning'
                    });
                    return;
                }

                this.dialogTitle = '新增-事件';
                this.editFormVisible = true;
                var caseId=this.caseId;
                this.editForm = {
                    dossierId: dossierId,
                    detailId: '',
                    detailTitle: '',
                    fileName:'',
                    caseId:caseId
                };

            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = this.editForm;
                            if(this.editForm.detailId !=''){
                                //编辑
                                editDetail(para).then((res) => {
                                    this.doHttp(res);
                                });
                            }else {
                                //编辑
//                                let para = {detailTitle : this.editForm.detailTitle};
                                //Object.assign({}, ); ;
                                addDetail(para).then((res) => {
                                    this.doHttp(res);
                                });

                            }
                            this.$refs.upload.clearFiles();
                        });
                    }
                });
            },
            closeEditForm:function () {
                this.$refs.upload.clearFiles();
                this.editFormVisible = false;
            },
            doHttp:function (res) {
                this.editLoading = false;

                if(res.data.resultCode==200){
                    this.editFormVisible = false;
                    this.getDetail();
                    this.editForm = {
                        detailId: '',
                        detailTitle: ''
                    };
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                }
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {

                var detailIds = this.sels.map(item => item.detailId).toString();

                let para = "[" + detailIds + "]";
//                let paraJson = eval("(" + para + ")");;

                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();

                    deleteBatchDetail(detailIds).then((res) => {
                        if(res.data.resultCode==200){
                            this.listLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getDetail();
                        }
                    });


                }).catch(() => {

                });
            },
            //获取卷书列表
            getDossiers() {
                let para = {
                    pageIndex: this.page,
                    pageSize: 200,
                    caseId: this.$route.params.caseId
                };
                //this.listLoading = true;
                //NProgress.start();
                getDossierListPage(para).then((res) => {

                    if(res.data.resultCode==200){
                        this.Dossiers = res.data.resultData.dossierInfoVoList;
                        //this.total = res.data.resultData.count;

                        let all = {"dossierId":"","dossierName":"全部"}
                        this.Dossiers.push(all);
                        this.filters.dossierId = this.$route.params.dossierId; // this.dossierId;

                        this.getDetail();
                    }

                    //this.listLoading = false;
                    //NProgress.done();
                });
            },
            UploadUrl:function(){
                return baseUrl + "/jxjsj/file-upload";
            },
            //文件上传
            submitUpload() {
                this.$refs.upload.submit();
            },
            uploadSucess(response, file, fileList) {
                NProgress.done();
                if(response.resultCode==200)
                {
                    this.$message({
                        message: '文件上传成功',
                        type: 'success'
                    });
                    this.editForm.fileName = response.resultData;

                }else{

                    this.$message({
                        message: response.resultMsg,
                        type: 'error'
                    });

                }

            },
            uploadErr(err, file, fileList) {
                NProgress.done();
                this.$message({
                    message: err.message,
                    type: 'error'
                });
                this.editForm.fileName = '';
            },
            uploadBefore(file){
                NProgress.start();
            },
            //打开新页面
            openPage(fileName){
//                let url = 'http://localhost:8080/jxjsj/file-download?fileName=' + fileName;
//                window.open('','_blank').location.href=url;
//                //window.open(url);
                let url = baseUrl + '/jxjsj/file-download';
                document.getElementById('fileName').value = fileName;
                document.forms['pdfForm'].fileName = fileName;
                document.forms['pdfForm'].action = url;
                document.forms['pdfForm'].target = "_blank";
                document.forms['pdfForm'].submit();
            }
        },
        mounted() {
            this.caseId = this.$route.params.caseId;
            //this.dossierId = this.$route.params.dossierId;

            this.listLoading = true;
            this.getDossiers();

            //this.getDetail();

            this.getCaseInfo();
        }
    }

</script>

<style scoped>

</style>