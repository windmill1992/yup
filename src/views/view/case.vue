<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.caseName" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getCase">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="Cases" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="caseName" label="名称"  sortable>
                <template slot-scope="scope">

                    <span style="cursor: pointer"  @click="doShowDossier(scope.row)">{{ scope.row.caseName }}</span>

                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="日期" :formatter="formatDate" sortable>
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleDossierAdd(scope.$index, scope.row)">新增卷书</el-button>
                    <el-button size="small" @click="handleCaseExport(scope.$index, scope.row)">导出案件</el-button>


                    <el-popover ref="popover1{{$index}}" trigger="hover" >
                        <p>
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        </p>
                    </el-popover>
                    <el-button  style="color: #dfe6ec"  v-popover:popover1{{$index}} type="text"><i class="el-icon-caret-bottom"></i></el-button>



                </template>
            </el-table-column>
        </el-table>


        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--案件编辑界面-->
        <el-dialog v-bind:title="dialogTitle" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="名称" prop="caseName">
                    <el-input v-model="editForm.caseName" auto-complete="off"></el-input>
                </el-form-item>


                <div v-bind:style="{ display : 'none' }">
                    <el-input v-model="editForm.type"></el-input>
                    <el-input v-model="editForm.caseId"></el-input>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--卷书编辑界面-->
        <el-dialog v-bind:title="dossierTitle" v-model="editDossierVisible" :close-on-click-modal="false">
            <el-form :model="dossierForm" label-width="100px" :rules="dossierFormRules" ref="dossierForm">
                <el-form-item label="卷   号" prop="dossierName">
                    <el-input v-model="dossierForm.dossierName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="卷书分类" prop="categoryId">
                    <template>
                        <el-select v-model="dossierForm.categoryId" placeholder="请选择">
                            <el-option
                                    v-for="item in Categorys" :key="item.categoryId"
                                    :label="item.categoryName"
                                    :value="item.categoryId">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>

                <div v-bind:style="{ display : 'none' }">
                    <el-input v-model="dossierForm.dossierId"></el-input>
                    <el-input v-model="dossierForm.caseId"></el-input>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editDossierVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editDossierSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>


        <div class="dialog" :style="{right:right}">
            <el-row style="padding-bottom: 0px;height: 57px;background-color: #f2f2f2">
                <el-col :span="10"  >
                    <div style="margin-top: 10px;">
                        <el-button :plain="true"   @click="closeDossier" >关闭卷书列表</el-button>

                    </div>

                </el-col>
                <el-col :span="13"  >
                    <div style="margin-top: 10px;">
                        <el-input placeholder="事件标题" v-model="detailName" class="input-with-select">
                            <el-button slot="append"  type="primary" icon="search" @click="getDossierByTitle"></el-button>
                        </el-input>
                    </div>

                </el-col>
                <el-col :span="1"  >
                    <div style="margin-top: 10px;">

                    </div>
                </el-col>
            </el-row>






            <!--列表-->
            <el-table :data="Dossiers" highlight-current-row v-loading="listDossierLoading" @selection-change="selsChange" style="width: 100%;">
                <el-table-column type="index" width="80">
                </el-table-column>
                <el-table-column  label="标题"  sortable>
                    <template slot-scope="scope">
                        <span style="cursor: pointer"  @click="gotoDetail(scope.row)">{{ scope.row.dossierName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="categoryName" label="分类"  sortable>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">

                        <el-popover ref="popover{{$index}}" trigger="hover" >
                            <p>
                                <el-button size="small" @click="handleDossierExport(scope.$index, scope.row)">导出</el-button>
                                <el-button size="small" @click="handleDossierEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button type="danger" size="small" @click="handleDossierDel(scope.$index, scope.row)">删除</el-button>
                            </p>
                        </el-popover>
                        <el-button  style="color: #dfe6ec"  v-popover:popover{{$index}} type="text"><i class="el-icon-caret-bottom"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </section>




</template>

<script>

    import ElRow from "element-ui/packages/row/src/row";

    var moment = require('moment')
    import util from '../../common/js/vue'
    //import NProgress from 'nprogress'


    import {baseUrl} from '../../api/baseUrl'


    export default {
        components: {ElRow},
        data() {
            return {
                right: '-400px',
                filters: {
                    caseName: '',
                    caseId:''
                },
                Categorys: [],
                Cases: [],
                Dossiers:[],
                dialogTitle:'',
                detailName:'',
                total: 0,
                page: 1,
                listLoading: false,
                listDossierLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    caseName: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    caseId: '',
                    caseName: ''
                },



                //卷书操作
                dossierTitle:'',

                editDossierVisible: false,//编辑界面是否显示
                dossierFormRules: {
                    dossierName: [
                        { required: true, message: '请输入卷书名称', trigger: 'blur' }
                    ],
                    categoryId: [
                        { required: true, message: '请选择卷书分类', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                dossierForm: {
                    caseId: '',
                    categoryId: '',
                    dossierId: '',
                    dossierName:''
                },


                addLoading: false

            }
        },
        methods: {
            //日期显示转换
            formatDate: function (row, column) {
                let date = moment(new Date(row.createTime)).format("YYYY-MM-DD HH:mm:ss");
                return date;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getCase();
            },
            //案件导出
            handleCaseExport(index, row) {
                let caseId = row.caseId;

                let url = baseUrl + '/jxjsj/case-export?caseId=' + caseId;
                window.open('').location.href=url;

//                exportCase(caseId).then((res) => {
//                   alert(JSON.stringify(res));
//                });

//                deleteCase(row.caseId).then((res) => {
//                    if(res.data.resultCode==200){
//                        this.listLoading = false;
//                        //NProgress.done();
//                        this.$message({
//                            message: '删除成功',
//                            type: 'success'
//                        });
//                        this.getCase();
//                    }
//                });

            },
            //获取案件列表
            getCase() {
                let para = {
                    pageIndex: this.page,
                    pageSize: 20,
                    caseName: this.filters.caseName
                };
                this.listLoading = true;
                //NProgress.start();
                getCaseListPage(para).then((res) => {

                    if(res.data.resultCode==200){
                        this.Cases = res.data.resultData.caseModelList;
                        this.total = res.data.resultData.count;
                    }

                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { caseId: row.caseId };

                    deleteCase(row.caseId).then((res) => {
                        if(res.data.resultCode==200){
                            this.listLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getCase();
                        }
                    });

                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.dialogTitle = '编辑-案件';
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.dialogTitle = '新增-案件';
                this.editFormVisible = true;
                this.editForm = {
                    caseId: '',
                    caseName: ''
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

                            if(this.editForm.caseId !=''){
                                //编辑
                                editCase(para).then((res) => {
                                    this.doHttp(res);
                                });
                            }else {
                                //编辑
                                let para = {caseName : this.editForm.caseName};
                                    //Object.assign({}, ); ;
                                addCase(para).then((res) => {
                                    this.doHttp(res);
                                });

                            }
                        });
                    }
                });
            },
            doHttp:function (res) {
                this.editLoading = false;

                if(res.data.resultCode==200){
                    this.editFormVisible = false;
                    this.getCase();
                    this.editForm = {
                        caseId: '',
                        caseName: ''
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

                var caseIds = this.sels.map(item => item.caseId).toString();

                let para = "[" + caseIds + "]";
//                let paraJson = eval("(" + para + ")");

                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();

                    deleteBatchCase(caseIds).then((res) => {
                        if(res.data.resultCode==200){
                            this.listLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getCase();
                        }
                    });


                }).catch(() => {

                });
            },
            doShowDossier:function (row) {

                if(this.filters.caseId == row.caseId){
                    if(this.right==='0px'){
                        this.right = '-400px'
                    }else{
                        this.right = '0px'
                    }
                }else{
                    this.right = '0px';
                }
                this.filters.caseId = row.caseId;

                this.detailName='';
                this.getDossier();
            },
            closeDossier:function (row) {
                this.filters.caseId = '';

                this.right = '-400px'
            },


            //获取卷书分类
            getCategory() {

                getCategoryList().then((res) => {

                    if(res.data.resultCode==200){
                        this.Categorys=res.data.resultData;
                    }else{
                        this.$message({
                            message: res.data.resultMsg,
                            type: 'error'
                        });
                    }

                });
            },
            //操作卷书信息
            gotoDetail(row){
//                this.$router.push({
//                    path: '/detail',
//                    name: '事件',
//                    params: {
//                        caseId: row.caseId,
//                        dossierId: row.dossierId
//                    }
//                    /*query: {
//                        name: 'name',
//                        dataObj: this.msg
//                    }*/
//                })
                this.$router.push({
                    path: '/detail/' + row.caseId + '/' + row.dossierId,
                    query: {
                        caseId: row.caseId,
                        dossierId: row.dossierId
                    }
                    /*query: {
                        name: 'name',
                        dataObj: this.msg
                    }*/
                })
            },
            //获取卷书分类 根据事件标题
            getDossierByTitle(){

                //detailTitle

                let para = {
                    pageIndex: this.page,
                    pageSize: 30,
                    caseId: this.filters.caseId,
                    dossierName:'',
                    detailName:this.detailName
                };
                this.listDossierLoading = true;
                //NProgress.start();
                getDossierListPage(para).then((res) => {

                    if(res.data.resultCode==200){
                        this.Dossiers = res.data.resultData.dossierInfoVoList;
                        this.total = res.data.resultData.count;
                    }

                    this.listDossierLoading = false;
                    //NProgress.done();
                });
            },
            getDossier() {
                let para = {
                    pageIndex: this.page,
                    pageSize: 30,
                    caseId: this.filters.caseId,
                    dossierName:'',
                    detailName:''
                };
                this.listDossierLoading = true;
                //NProgress.start();
                getDossierListPage(para).then((res) => {

                    if(res.data.resultCode==200){
                        this.Dossiers = res.data.resultData.dossierInfoVoList;
                        this.total = res.data.resultData.count;
                    }

                    this.listDossierLoading = false;
                    //NProgress.done();
                });
            },
            //卷书导出
            handleDossierExport(index, row) {
                let dossierId = row.dossierId;

                let url = baseUrl + '/jxjsj/dossier-export?dossierId=' + dossierId;
                window.open('').location.href=url;

            },
            //删除
            handleDossierDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listDossierLoading = true;
                    //NProgress.start();
                    let para = { dossierId: row.dossierId };

                    deleteDossier(row.dossierId).then((res) => {
                        if(res.data.resultCode==200){
                            this.listDossierLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getDossier();
                        }
                    });

                }).catch(() => {

                });
            },
            //显示编辑界面
            handleDossierEdit: function (index, row) {
                this.dossierTitle = '编辑-卷书';
                this.editDossierVisible = true;
                this.dossierForm = Object.assign({}, row);
            },
            //显示新增界面
            handleDossierAdd: function (index, row) {
                this.filters.caseId = row.caseId;
                this.dossierTitle = '新增-卷书';
                this.editDossierVisible = true;
                this.dossierForm = {
                    caseId: this.filters.caseId,
                    categoryId: '',
                    dossierId: '',
                    dossierName:''
                };
            },
            //编辑
            editDossierSubmit: function () {
                this.$refs.dossierForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = this.dossierForm;

                            if(this.dossierForm.dossierId !=''){
                                //编辑
                                editDossier(para).then((res) => {
                                    this.doDossierHttp(res);
                                });
                            }else {
                                //编辑

                                //Object.assign({}, ); ;
                                addDossier(para).then((res) => {
                                    this.doDossierHttp(res);
                                });

                            }
                        });
                    }
                });
            },
            doDossierHttp:function (res) {
                this.editLoading = false;

                if(res.data.resultCode==200){
                    this.editDossierVisible = false;
                    this.getDossier();
                    this.dossierForm = {
                        caseId: '',
                        categoryId: '',
                        dossierId: '',
                        dossierName:''
                    };
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                }
            }
//            selsChange: function (sels) {
//                this.sels = sels;
//            },
//            //批量删除
//            batchRemove: function () {
//
//                var caseIds = this.sels.map(item => item.caseId).toString();
//
//                let para = "[" + caseIds + "]";
////                let paraJson = eval("(" + para + ")");
//
//                this.$confirm('确认删除选中记录吗？', '提示', {
//                    type: 'warning'
//                }).then(() => {
//                    this.listLoading = true;
//                    //NProgress.start();
//
//                    deleteBatchCase("[" + caseIds + "]").then((res) => {
//                        if(res.data.resultCode==200){
//                            this.listLoading = false;
//                            //NProgress.done();
//                            this.$message({
//                                message: '删除成功',
//                                type: 'success'
//                            });
//                            this.getCase();
//                        }
//                    });
//
//
//                }).catch(() => {
//
//                });
//            },

        },
        mounted() {
            // this.getCategory();
            // this.getCase();
        }
    }

</script>

<style scoped>
    [v-cloak] {
        display: none;
    }

    #divapp {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #999999;
        overflow: hidden;
    }

    .dialog {
        position: absolute;
        top: 50px;
        bottom: 0px;
        width: 400px;
        background: #ffffff;
        transition: right 1s;
        z-index: 999;
    }

    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>