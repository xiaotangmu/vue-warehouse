<template>
    <div class="base-attr-div">
      <div class="main-box-view-title">
        <span class="">商品属性管理 <span class="glyphicon glyphicon-question-sign"></span></span>
      </div>

      <div class="base-attr-main-div">
        <div class="base-attr-main">
          <div class="base-attr-group ">
            <div class="base-attr-item-title-textArea">
              <div class="base-attr-item-title-div-textArea" style="margin-left: 60px">
                <span>商品分类</span>
              </div>
            </div>
            <div class="base-attr-item-content spu-catalog-div">

              <el-cascader v-model="selectData" @change="optionChange()" :options="catalogs1" :props="props" ></el-cascader>

            </div>
          </div>

          <!-- 属性列表 -->
          <div class="attr-list-box2-div">

            <div class="list-all-btn-div">

              <span  @click="openMymodel(1,'','')" class="attr-add-btn btn btn-info"><span class="glyphicon glyphicon-plus"></span> 添加</span>
              <span @click="deleteRows" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> 删除已选</span>
            </div>
            <div class="attr-list-box attr-list-box2 myScrollBox">


              <el-table
                @selection-change="changeChoose"
                :data="tableData"
                height="350"
                border
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100"
                  label="#">
                </el-table-column>
                <el-table-column
                  type="selection"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="属性"
                  width="230">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="180">
                  <template slot-scope="scope">
                    <!--<el-button-->
                      <!--@click.native.prevent="deleteRow(scope.$index, tableData)"-->
                      <!--type="text"-->
                      <!--size="small">-->
                      <!--移除-->
                    <!--</el-button>-->
                    <!--<el-button-->
                      <!--@click.native.prevent="deleteRow(scope.$index, tableData)"-->
                      <!--type="text"-->
                      <!--size="small">-->
                      <!--移除-->
                    <!--</el-button>-->
                    <span @click="openMymodel(2,scope.$index, tableData)" class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                    <span @click="deleteRow(scope.$index, tableData)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>

                  </template>
                </el-table-column>
              </el-table>


              <!--<table class="table table-hover ">-->
                <!--<thead>-->
                  <!--<tr>-->
                    <!--<th class="attr-list-td-sort">#</th>-->
                    <!--<th class="attr-list-td-checkbox"><span class="checkbox-choose"></span></th>-->
                    <!--<th class="attr-list-td-text">属性</th>-->
                    <!--<th class="attr-list-td-do">操作</th>-->
                  <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr>-->
                  <!--<td>1</td>-->
                  <!--<td><span class="checkbox-choose"></span></td>-->
                  <!--<td>重量</td>-->
                  <!--<td>-->
                    <!--<span class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                    <!--<span class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
                  <!--</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>1</td>-->
                  <!--<td><span class="checkbox-choose"></span></td>-->
                  <!--<td>重量</td>-->
                  <!--<td>-->
                    <!--<span class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                    <!--<span class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
                  <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
              <!--</table>-->
            </div>
          </div>

        </div>
      </div>

      <!-- modal -->
      <div v-show="isShow" id="attr-item-edit-modal" class="my-modal" >
        <transition name="tip-alert">
        <div v-show="isShow" class="my-modal-content-div thumbnail" >
          <div class="my-modal-title">
            <span v-if="!flag">属性编辑</span>
            <span v-else>属性添加</span>
            <span @click="openOrShowMymodel()" class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content myScrollBox">
            <!-- 居中表单 -->
            <div class="my-modal-form">
              <div class="my-modal-group">
                <div class="my-modal-group-title">商品属性</div>
                <div class="my-modal-group-main">
                  <input @change="nameCheck()" v-model="myAttr" class="form-control" type="text" placeholder="重量"/>
                  <span v-show="nameOkSign" class="glyphicon glyphicon-ok-sign ok-sign brand-name-ok-sign" aria-hidden="true"></span>
                  <span v-show="nameRemoveSign" class="brand-name-remove-sign remove-sign ">
                    <span class="glyphicon glyphicon-remove-sign " aria-hidden="true"></span>
                    <span v-text="nameRemoveSignTip"></span>
                  </span>

                  <div @click="updateItem()" v-if="!flag" class="my-modal-form-submit form-control btn btn-info">
                    <span v-show="!isLoad" >更新</span>
                    <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                      <div class='loader'></div>
                    </div>
                  </div>
                  <div @click="addItem()" v-else class="my-modal-form-submit btn btn-primary form-control">
                    <span v-show="!isLoad" >添加</span>
                    <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                      <div class='loader'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>


    </div>
</template>

<script>
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery-1.11.0.min.js';
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery-ui-1.10.4.min.js';
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery.mousewheel-3.0.6.min.js';
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery.mCustomScrollbar.min.js';
  import axios from 'axios';
  import qs from 'qs';
  export default {

    data(){
      let that=this;
      return{
        catalogChooseFlag: false,
        //用来记录分类index
        firstFlag: 0,
        secondFlag: false,
        thirdFlag: false,
        firstValue: '',
        secondValue: '',
        thirdValue: '',
        catalogs1: [],
        catalogs2: [],
        catalogs3: [],
        selectData: [],//选中数据 -- 返回的是数组 三个id
        isShow: false,
        flag: true,//true -- 添加选择框，false -- 更新
        myAttr: '',//input 绑定
        // myAttr2: '',//更新时比较是否原来那个
        tableData: [],//列表数据
        tempAttr: '',//用来暂存更新前的属性数据
        index: '',//记录当前要更新的数据下标
        chooseList: [],//用来保存勾选中的item

        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }],

        props: {
          lazy: true,
          label: 'name',
          children: 'list',
          value: 'id',
          lazyLoad (node, resolve) {
            that.loadCatalog2(node,resolve);
          }
        },

        nameOkSign: false,
        nameRemoveSign: false,
        nameRemoveSignTip: '该属性已经存在',
        tipMessage: 'hello',
        isLoad: false,
      }
    },
    mounted() {
      //分类框滚动条主题 -- 滚动条类 -- myScrollBox
      $(".myScrollBox").mCustomScrollbar({
        theme: "minimal"
      });
      $(".myScrollBox2").mCustomScrollbar({
        theme: "minimal-dark"
      });

      // let that = this;
      // $(document).on('click', '.btn-primary', function(){
      //   alert(that.flag);
      //   that.flag = false;
      //   that.test();
      // });

      this.loadCatalog1();
    },
    methods: {
      // test(){
      //   alert('gell');
      // },
      //显示编辑框
      openMymodel(type, index, data){
        if(type === 1){
          if(this.selectData === undefined || this.selectData === null || this.selectData.length < 3){
            this.$message({
              message: '请先选择分类',
              type: 'warning'
            });
            return;
          }
          this.myAttr = '';
          this.flag = true;
        } else {
          this.myAttr = data[index].name;
          this.tempAttr = data[index];
          this.index = index;
          this.flag = false;
        }
        this.nameOkSign = false;
        this.nameRemoveSign = false;
        this.openOrShowMymodel();

      },
      //开关横态框
      openOrShowMymodel(){
        this.isShow = !this.isShow;
      },
      //加载一级分类
      loadCatalog1(){
        const url = 'api/catalog1/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){
              this.catalogs1 = response.data.extend;
            }
          }
        )
      },
      //勾选
      changeChoose(val){
        this.chooseList = val;
      },
      //删除多个
      async deleteRows(){
        console.log();//Array [];//选中的item

        if(this.chooseList === null || this.chooseList === undefined || this.chooseList.length <= 0){
          this.$message({
            message: '请先勾选需要删除的属性',
            type: 'warning'
          });
          return;
        }

        //构造数据
        let names = '';
        let ids = '';
        let catalog3Id = '';
        let indexs = [];
        this.chooseList.forEach(item => {
          // this.tableData.forEach(item => {
          //
          // })
          const index = this.tableData.findIndex(item2 => item2.id === item.id);
          console.log(index);
          indexs.push(index);
          names += item.name + '-';
          ids += item.id + '-';
          // ids += item.date + '-';
          catalog3Id = parseInt(item.catalog3Id);
        });
        console.log(ids + names + catalog3Id + indexs);

        //处理数据
        names = names.substring(0, names.length-1);
        ids = ids.substring(0, ids.length-1);

        // const item = data[index];
        // const names = item.name + '';
        // const ids = item.id + '';
        // const catalog3Id = item.catalog3Id;
        //
        const result = await this.deleteItem(names, ids, catalog3Id).then(function (result) {
          return result;
        });
        //更新数据
        if(result){
          // let i = 0;
          indexs = indexs.sort();
          for(let i = 0; i < indexs.length ; i++){
            this.tableData.splice(indexs[indexs.length - 1 - i]);
          }
          // indexs.forEach(index => {
          //   this.tableData.splice(index-i,1);//删除使原数组下标 -1
          //   i++
          // });
        }
      },
      //单个删除
      async deleteRow(index, data){
        // console.log(index);
        // console.log(data);
        // this.tableData.splice(index, 1);
        const item = data[index];
        const names = item.name + '';
        const ids = item.id + '';
        const catalog3Id = item.catalog3Id;

        const result = await this.deleteItem(names, ids, catalog3Id).then(function (result) {
          return result;
        });
        //更新数据
        if(result){
          this.tableData.splice(index,1);
        }
      },
      //删除item
      async deleteItem(names, ids, catalog3Id){

        const re1 = await this.$confirm('您要删除 ' +  names + ' 的属性数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          return false;
        });
        if(!re1){
          return false;
        }

        const url = 'api/baseAttr/delete';
        // String names, String ids, Integer catalog3Id
        const data = { names: names, ids: ids, catalog3Id: catalog3Id };

        return await axios.post(url,qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.$message({
                message: '成功删除',
                type: 'success'
              });
              return true;
            }
            return false;
          }
        );
      },
      //显示添加品牌时品牌名的错误信息
      addNameTip(tipStr){
        this.nameOkSign = false;
        this.nameRemoveSign = true;
        this.nameRemoveSignTip = tipStr;
      },
      //name 查重
      async nameCheck(){
        const { myAttr, selectData, flag, tempAttr } = this;

        this.nameOkSign = false;
        this.nameRemoveSign = false;

        if(myAttr.trim() === ''){
          return false;
        }
        if(!flag){//更新
          if(myAttr.trim() === tempAttr.name.trim()){
            return false;
          }
        }
        const url = 'api/baseAttr/nameCheck';
        const data = { name: myAttr.trim(), catalog3Id: parseInt(selectData[2]) };
        return await axios.post(url, qs.stringify(data)).then(
          response => {
            console.log(response.data);
            if (response.data.code === "101" && response.data.extend === "0") {//无该品牌记录
              this.nameOkSign = true;
              return true;
            }else if(response.data.code === "101" && response.data.extend === "1"){//已经存在该品牌
              this.addNameTip('该属性已经存在');
              return false;
            }
          },
          error => {
            return false;
          }
        );
      },
      //添加属性
      async addItem(){
        const { myAttr } = this;
        const str = myAttr.trim();
        if(str === null || str === undefined || str === ''){
          this.addNameTip('属性不能为空！');
          return;
        }
        const result = await this.nameCheck().then(function(result){
          return result;
        });
        if(!result){
          return;
        }
        const url = 'api/baseAttr/add';
        const data = { name: str, catalog3Id: this.selectData[2] };
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.$message({
                message: '成功添加属性！',
                type: 'success'
              });


              //更新数据
              this.tableData.push(response.data.extend);

            }
          }
        )
      },
      //更新属性
      async updateItem(){
        const { tempAttr } = this;
        const str = this.myAttr.trim();
        if(str === null || str === undefined || str === ''){
          this.addNameTip('属性不能为空！');
          return;
        }
        if(str === tempAttr.name){
          this.$message({
            message: '请先修改数据!',
            type: 'warning'
          });
          return;
        }
        const result = await this.nameCheck().then(function (result) {
          return result;
        });
        if(!result){
          this.addNameTip('该属性已经存在');
          return;
        }
        const url = 'api/baseAttr/update';
        const data = { id: tempAttr.id, name: this.myAttr, catalog3Id: tempAttr.catalog3Id, oldName: tempAttr.name };

        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.$message({
                message: '更新成功！',
                type: 'success'
              });
              //更新列表数据
              this.tableData[this.index].name = this.myAttr;
            }
          }
        )
      },
      //捕捉选项, 并加载列表
      optionChange(){
        console.log(this.selectData);//[id1, id2, id3]
        // console.log(this.selectData[2]);
        const url = 'api/baseAttr/getAll';
        const data = { catalog3Id: this.selectData[2] };

        axios.get(url, {params: data}).then(
          response => {
            if(response.data.code === '101'){
              let extend = response.data.extend;

              if(extend === undefined || extend === null || extend === '' || extend.length < 1){
                extend = [];
              }
              this.tableData = extend;
            }
          }
        )
      },
      //加载选项
      loadCatalog2(node, resolve){
        const { level } = node;
        if(level === 1){
          const url = 'api/catalog2/getAll2';
          const data = { catalog1Id: node.data.id };
          axios.get(url, {params: data }).then(
            response => {
              if(response.data.code === '101'){
                let list = response.data.extend;
                let list2 = [];
                let list3 = [];
                list.forEach(item => {
                  if(item.level === 2){
                    list2.push(item);
                  }
                  if(item.level === 3){
                    item.leaf = true;
                    list3.push(item);
                  }

                });
                this.catalogs2 = list2;
                this.catalogs3 = list3;

                resolve(this.catalogs2);
              }
            }
          );
        }else if(level === 2){
          let list4 = [];
          this.catalogs3.forEach(item => {
            if(node.data.ztreeId + '' === item.pid + ''){
              list4.push(item);
            }
          });
          resolve(list4);
        }
      },
    }
  }
</script>

<style>
  @import "./../../../../plugins/malihu-custom-scrollbar/jquery.mCustomScrollbar.min.css";
  .main-box-view-title{
    font-size: 18px;
    color: #1C5F95;
    padding: 10px 10px ;
    border-bottom: 1px solid #f5f5f5;
    /*line-height: 38px;*/
  }

  .base-attr-group{
    /*background-color: #f7e1b5;*/
    /*width: 1000px;*/
    /*margin: 0 auto;*/
    font-size: 16px;
    margin: 20px 0;
  }
  .base-attr-item-content{
    display: inline-block;
    /*background-color: #60AD94;*/
    width: 500px;
  }
  .base-attr-item-title-textArea{
    float: left;
    margin: 5px 5px 0 290px;
    /*width: 150px;*/
    padding-right: 10px;
    text-align: right;
  }
  .base-attr-catalog{
    height: 35px;
    border-color: #cccccc;
    line-height: 35px;
    font-size: 15px;
    padding-left: 10px;
  }
  .base-attr-list{
    float: right;
    margin: 10px;
    color: #ccc;
  }
  .spu-catalog-choose-list{
    position: absolute;
    width: 500px;
    height: 200px;
    /*background-color: #f5f5f5;*/
    background-color: #fff;
    overflow: auto;
    z-index: 13;
  }

  .spu-catalog-choose-list0{
    float: left;
    width: 166px;
    height: 100%;
    overflow: auto;
  }
  ._mCS_5 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_4 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_3 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_2 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_1 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar{
    /*background: rgba(0,0,0,0.4);*/
    background: red;
    width:3px;
  }
  ._mCS_5 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_4 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_3 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_2 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_1 .mCSB_scrollTools .mCSB_draggerRail{
    /*background: rgba(0,0,0,0.6);*/
    background: #333333;
    width:3px;
  }
  .spu-catalog-item{
    /*background-color: #dff0d8;*/
    /*color: #316AC5;*/
    font: 14px 'yunyuan';
    text-align: left;
    padding: 5px 10px;

  }
  .spu-catalog-item-hover{
    background-color: #ccc;
    /*background-color: #5394EC;*/
    cursor: pointer;
  }
  .spu-add-catalog-hover{
    box-shadow: 1px 1px 5px 1px #66AFE9;
  }
  .base-attr-div .base-attr-input-box{
    max-height: 430px;
    /*background-color: #6CB7A0;*/
    overflow: auto;
    /*padding-right: 10px;*/
    width: 650px;

  }
  .base-attr-div .base-attr-input-box input{
    display: inline-block;
    width: 500px;
  }
  .base-attr-div .attr-list-box{
    /*border-top: 1px solid #f5f5f5;*/
    /*background-color: #dff0d8;*/
  }
  .base-attr-div .base-attr-input-box input{
    margin: 0 0 10px 0;
  }
  .base-attr-div .base-attr-item{
    position: relative;
  }
  .base-attr-div .base-attr-span-box{
    display: inline-block;
    position: absolute;
    left: 510px;
    top: 0;
    line-height: 30px;
  }
  .base-attr-div .base-attr-span-box span{
    padding: 0 20px;
    line-height: 20px;
    font-size: 14px;
    height: 20px;
  }
  .attr-list-box2{
    display: inline-block;
    max-width: 1390px;
    /*background-color: #6CB7A0;*/
    margin: 0 350px;
    max-height: 450px;
    overflow: auto;
  }
  .attr-list-box2 table{
    /*margin-top: 10px;*/
    /*border-bottom: 1px solid #ccc;*/
    border-top: 2px solid #ccc;
  }
  .attr-list-td-sort{
    width: 100px;
    /*background-color: #dff0d8;*/
  }
  .attr-list-td-checkbox{
    width: 100px;
    /*background-color: #6CB7A0;*/
  }
  .attr-list-td-text{
    width: 250px;
    /*background-color: #dff0d8;*/
  }
  .attr-list-td-do{
    width: 180px;
    /*background-color: #6CB7A0;*/
  }
  .attr-list-box2-div{
    border-top: 1px solid #f5f5f5;
    /*background-color: #dff0d8;*/
  }
  .list-all-btn-div{
    margin: 20px 0 10px 630px;
  }
  .list-all-btn-div .btn{
    font-size: 14px;
    /*padding: 0 20px;*/
    padding: 5px 0;
    width: 100px;
    /*float: right;*/
    /*margin-right: 10px;*/
  }
  .my-modal-content-div{
    width: 900px;
    background-color: #fff;
    margin: 50px auto;
    /*height: 500px;*/
    /*position: absolute;*/

  }


</style>
