<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <!--<el-form-item>-->
                    <!--<el-input v-model="filters.categoryName" placeholder="名称"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" v-on:click="getCase">查询</el-button>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="Categorys" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="categoryName" label="名称"  sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog v-bind:title="dialogTitle" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="名称" prop="categoryName">
                    <el-input v-model="editForm.categoryName" auto-complete="off"></el-input>
                </el-form-item>


                <div v-bind:style="{ display : 'none' }">
                    <el-input v-model="editForm.type"></el-input>
                    <el-input v-model="editForm.categoryId"></el-input>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'


    export default {
        data() {
            return {
                filters: {
                    categoryName: ''
                },
                Categorys: [],
                dialogTitle:'',
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    categoryName: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    categoryId: '',
                    categoryName: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false

            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getCategory();
            },
            //获取分类列表
            getCategory() {
                this.listLoading = true;
                getCategoryList().then((res) => {

                    if(res.data.resultCode==200){
                        this.Categorys=res.data.resultData;
//                        this.Cases = res.data.resultData.caseModelList;
//                        this.total = res.data.resultData.count;
                    }else{
                        this.$message({
                            message: res.data.resultMsg,
                            type: 'error'
                        });
                    }

                    this.listLoading = false;
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { categoryId: row.categoryId };

                    deleteCategory(row.categoryId).then((res) => {
                        if(res.data.resultCode==200){
                            this.listLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getCategory();
                        }
                    });

                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.dialogTitle = '编辑-分类';
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.dialogTitle = '新增-分类';
                this.editFormVisible = true;
                this.editForm = {
                    categoryId: '',
                    categoryName: ''
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

                            if(this.editForm.categoryId !=''){
                                //编辑
                                editCategory(para).then((res) => {
                                    this.doHttp(res);
                                });
                            }else {
                                //编辑
                                let para = {categoryName : this.editForm.categoryName};
                                //Object.assign({}, ); ;
                                addCategory(para).then((res) => {
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
                    this.getCategory();
                    this.editForm = {
                        categoryId: '',
                        categoryName: ''
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

                var categoryIds = this.sels.map(item => item.categoryId).toString();

                let para = "{ categoryIds : [" + categoryIds + "]}";
                let paraJson = eval("(" + para + ")");;

                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();

                    deleteBatchCategory(paraJson).then((res) => {
                        if(res.data.resultCode==200){
                            this.listLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getCategory();
                        }
                    });


                }).catch(() => {

                });
            }
        },
        mounted() {
            // this.getCategory();
        }
    }

</script>

<style scoped>

</style>