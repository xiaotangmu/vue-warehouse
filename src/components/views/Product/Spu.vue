<template>
    <div class="spu-div">
      <div class="main-box-view-title spu-div-menu">
        <!--<ul class="nav nav-tabs">-->
          <!--<li role="presentation" class="spu-menu-li spu-add-li"><router-link to="/index/mainBox/spu/spuAdd">商品添加</router-link></li>-->
          <!--<li role="presentation" class="spu-menu-li spu-edit-li"><router-link to="/index/mainBox/spu/spuEdit">商品维护</router-link></li>-->
        <!--</ul>-->
        <span style="line-height: 40px;padding-left: 10px" class="main-box-view-title-name">商品管理 <span class="span-spu-help glyphicon glyphicon-question-sign " data-toggle="popover" data-content="帮助" data-container="body" data-trigger="hover" data-placement="bottom"></span></span>

      </div>
      <div class="" style="height: 650px; overflow: auto">
        <div class="" style="padding: 20px 0 20px 30px; " >
          <span class="btn btn-success" @click="checkAll(1, 5)">查看所有</span>
          <span @click="openMymodel(1,'','')" class="btn btn-info warehouse-add-btn">添加商品</span>
          <span @click="deleteRows()" class="btn btn-danger">删除已选</span>
          <span class="form-inline" style="padding-left: 280px;">
              <input v-model="findData" class=" form-control" type="text" placeholder="美宜佳"/>
              <span @click="findItem(0,1,5)" class="btn btn-warning"><span class="glyphicon glyphicon-search"></span> 查找</span>
            </span>
        </div>

        <div class="spu-item-list " style="padding-left: 10px;margin-left: 0;">


          <el-table
            @selection-change="changeChoose"
            :data="page.list"
            highlight-current-row
            stripe
            style="width: 100%; border-top: 1px solid #ccc">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item><br />
                  <el-form-item label="商品分类">
                    <span>{{ props.row.catalogName }}</span>
                  </el-form-item><br />
                  <el-form-item label="商品品牌">
                    <span>{{ props.row.brandName }}</span>
                  </el-form-item><br />
                  <el-form-item label="商品描述">
                    <span>{{ props.row.description }}</span>
                  </el-form-item><br />
                  <el-form-item label="商品属性">
                    <span  v-for="(item, index) in props.row.baseAttrs" :key="index">{{item.name}} </span>
                  </el-form-item><br />
                  <div v-if="props.row.baseAttrs !== undefined && props.row.baseAttrs !== null && props.row.baseAttrs.length > 0">
                    <el-divider content-position="left">属性规格</el-divider>
                    <div  v-for="(item, index) in props.row.baseAttrs" :key="index">
                    <el-form-item  :label="item.name">
                    <span v-if="item.value !== undefined && item.value !== null && item.value.length >0">
                      <span style="padding-right: 10px;" v-for="(item2,index2) in item.value" :key="index2">{{ item2 }}</span>
                    </span>
                    </el-form-item>
                    </div>
                  </div>

                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="80">
            </el-table-column>
            <el-table-column
              label="品牌"
              prop="brandName">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="描述"
              prop="description">
            </el-table-column>
            <el-table-column
              label="操作"
              >
              <template slot-scope="scope">

                <span @click="openMymodel(2,scope.$index, page.list)" class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                <span @click="deleteRow(scope.$index, page.list)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
              </template>
              <!--<span @click="openMymodel(2,index,item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
              <!--<span @click="deleteRow(item,index)" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
            </el-table-column>

          </el-table>

          <!-- 页面数据 -->
          <div style="font-size: 13px;" v-show="page !== null && page !== undefined && page !== ''&& page.list !== null && page.list !== undefined && page.list.length>0">
            <span style="padding-left: 20px">第 {{page.pageNum}} 页，共 {{page.pages}} 页 | {{page.total}} 条记录</span>
          </div>

          <!-- 页面按钮 -->
          <div v-show="page !== null && page !== undefined && page !== '' && page.list !== null && page.list !== undefined && page.list.length>0" class="brand-page-btn-div">
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li v-show="page.pageNum !== 1" @click="findAllFlag?checkAll(1, 5):findItem(1,1,5)"><span>首页</span></li>
                <li v-show="page.pageNum !== 1" @click="findAllFlag?checkAll(page.pageNum-1,5):findItem(1, pageNum-1, 5)">
                  <!--<span aria-hidden="true">&laquo;</span>-->
                  <span aria-hidden="true">上一页</span>
                </li>
                <li @click="findAllFlag?checkAll(num, 5):findItem(1, num, 5)" v-for="(num, index) in page.navigatepageNums" :key="index" :class="{ 'active': page.pageNum === num}">
                  <span>{{num}}</span>
                </li>
                <li @click="findAllFlag?checkAll(page.pageNum+1,5):findItem(1,page.pageNum+1,5)" v-show="page.pageNum*page.pageSize < page.total">
                  <!--<span aria-hidden="true">&raquo;</span>-->
                  <span aria-hidden="true">下一页</span>
                </li>
                <li @click="findAllFlag?checkAll(page.pages, 5):findItem(1,page.pages,5)" v-show="page.pageNum*page.pageSize < page.total"><span>尾页</span></li>
              </ul>
            </nav>
          </div>

        </div>

        <!--<router-view></router-view>-->
      </div>

      <!-- Modal -->
      <div v-show="isShow" class="my-modal">
        <transition name="tip-alert">
        <div style="max-height: 700px;overflow:auto;" v-show="isShow" class="my-modal-content-div thumbnail">
          <div class="my-modal-title">
            <span v-if="!flag">商品修改</span>
            <span v-else>商品添加</span>
            <span @click="openOrShowMymodel" class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content">
            <div style="margin-top: 10px;" class="spu-edit-modal-group ">
              <div class="spu-edit-modal-item-title-textArea">
                <div class="spu-edit-modal-item-title-div-textArea">
                  <span>商品分类</span>
                </div>
              </div>
              <div v-if="flag" class="spu-edit-modal-item-content spu-catalog-div" style="position: relative">
                <el-cascader style="width: 500px" v-model="selectData" @change="optionChange()" :options="catalogs1" :props="props" ></el-cascader>
                <el-tag type="danger" effect="plain" style="position: absolute;top: 5px;border: none;font-size: 18px">*</el-tag>
              </div>
              <div v-else class="spu-edit-modal-item-content spu-catalog-div" style="position: relative">
                <el-input
                  suffix-icon="el-icon-arrow-down"
                  v-model="catalogName"
                  :disabled="true"
                >
                </el-input>
              </div>
            </div>

            <div class="spu-edit-modal-group">
              <div class="spu-edit-modal-item-title">
                <div class="spu-edit-modal-item-title-div">
                  <span>商品品牌</span>
                </div>
              </div>
              <div class="spu-edit-modal-item-content spu-down-list-div" style="position: relative">

                <el-select clearable v-model="brandId" filterable placeholder="请选择" style="width: 500px">
                  <el-option
                    v-for="item in brands"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-tag type="danger" effect="plain" style="position: absolute;top: 5px;border: none;font-size: 18px">*</el-tag>
              </div>
            </div>

            <div class="spu-edit-modal-group">
              <div class="spu-edit-modal-item-title">
                <div class="spu-edit-modal-item-title-div">
                  <span>商品名称</span>
                </div>
              </div>
              <div class="spu-edit-modal-item-content" style="position: relative">
                <!--<input type="text" class="form-control" placeholder="葵花宝典">-->
                <el-input @change="nameCheck" v-model="itemName1" placeholder="请输入内容"></el-input>
                <el-tag v-show="nameOkSign" type="success" effect="plain" style="position: absolute; top: 5px;border: none;"><i class="el-icon-success"></i></el-tag>
                <el-tag v-show="nameRemoveSign" type="danger" effect="plain" style="position: absolute; top: 5px;left: 500px;border: none;"><i class="el-icon-warning"></i> {{nameRemoveSignTip}}</el-tag>
              </div>
            </div>

            <div class="spu-edit-modal-group">
              <div class="spu-edit-modal-item-title-textArea">
                <div class="spu-edit-modal-item-title-div-textArea">
                  <span>商品描述</span>
                </div>
              </div>
              <div class="spu-edit-modal-item-content">
                <!--<textarea class="form-control" placeholder="棒棒棒" rows="7" style="resize: none"></textarea>-->
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="description"
                  maxlength="30"
                  show-word-limit
                  style="max-height: 200px"
                >
                </el-input>
              </div>
            </div>

            <div class="spu-edit-modal-group">
              <div class="spu-edit-modal-item-title">
                <div class="spu-edit-modal-item-title-div">
                  <span>商品属性</span>
                </div>
              </div>
              <div class="spu-edit-modal-item-content spu-down-list-div">
                <el-select @change="attrOptionChange" v-model="baseAttrs2" multiple placeholder="请选择" style="width: 500px;">
                  <el-option
                    v-for="item in baseAttrs"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id" >
                  </el-option>
                </el-select>

              </div>
            </div>


            <el-divider v-if="hasAttr" content-position="left">属性规格 <i class="el-icon-tickets"></i> </el-divider>
            <div v-if="hasAttr">
            <div v-for="(item, index) in chooseAttrs" :key="index" class="spu-edit-modal-group">
              <div class="spu-edit-modal-item-title">
                <div class="spu-edit-modal-item-title-div">
                  <span style="position: relative; top: -55px;">{{item.name}}</span>
                </div>
              </div>
              <div class="spu-edit-modal-item-content spu-down-list-div">
                <div class="thumbnail" style="height: 80px;overflow: auto">
                  <el-tag
                    style="margin: 5px"
                    :key="tag"
                    v-for="tag in item.value"
                    closable
                    size="small"
                    :disable-transitions="false"
                    @close="handleClose(tag,index,item)">
                    {{tag}}
                  </el-tag>
                  <!--<el-input-->
                    <!--v-if="item.inputVisible"-->
                    <!--v-model="item.inputValue"-->
                    <!--ref="saveTagInput"-->
                    <!--size="small"-->
                    <!--@keyup.enter.native="handleInputConfirm(index,item)"-->
                    <!--@blur="handleInputConfirm(index,item)"-->
                  <!--&gt;-->
                  <!--</el-input>-->
                  <!--<el-button v-else size="mini" @click="showInput"><i class="el-icon-plus"></i></el-button>-->
                  <el-tooltip content="添加属性值" placement="bottom" effect="light">
                    <el-button style="margin: 5px;" v-if="!item.inputVisible" size="mini" @click="showInput(index,item)"><i class="el-icon-plus"></i></el-button>
                  </el-tooltip>
                </div>
              </div>
            </div>
            </div>


            <div class="spu-edit-modal-group">
              <div class="spu-edit-modal-item-title">
                <div class="spu-edit-modal-item-title-div">
                </div>
              </div>
              <div class="spu-edit-modal-item-content">
                <div id="spu-model-update-btn" @click="updateItem()" v-if="!flag" class=" btn btn-info form-control">
                  <span v-show="!isLoad" >更新</span>
                  <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                    <div class='loader'></div>
                  </div>
                </div>
                <div id="spu-model-add-btn" @click="addItem()" v-else class=" btn btn-primary form-control">
                  <span v-show="!isLoad" >添加</span>
                  <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                    <div class='loader'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>

      <!-- Modal -->
      <div id="spu-help-modal" class="my-modal" style="display: none">
        <div class="my-modal-content-div thumbnail" style="display: none">
          <div class="my-modal-title">
            <span>添加商品说明</span>
            <span class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content">
            <p>请先添加商品需要的品牌，属性等信息</p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    export default {
      data(){
        let that = this;
        return{
          isShow: false,
          catalogs1: [],
          catalogs2: [],
          catalogs3: [],
          selectData: [],//选中数据 -- 返回的是数组 三个id
          flag: true,//true -- 添加选择框，false -- 更新
          chooseList: [],//用来保存勾选中的item
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
          brands: [],
          itemName1: '',
          itemName2: '',

          baseAttrs: [],//记录加载的属性列表
          baseAttrs2: [],//记录选中的属性
          brandId: '',//选中的品牌id
          description: '',//横态框 -- 描述数据
          findData: '',//搜索框绑定
          findData2: '',//搜索框绑定 -- 用来更新列表

          //分页数据
          page: '',
          pageNum: 1,//首页
          pageSize: 5,//每页数据数

          updateData: '',//暂存更新前的数据 -- item
          catalogName: '',//更新时记录三级分类 -- 不让修改
          index: '',//记录更新index

          findAllFlag: '',//true -- 查找所有，false -- 条件查询

          hasAttr: false,//是否选择了属性
          chooseAttrs: [],//记录选中的attr item.value 为list 包含对应的属性值
        }
      },
      mounted(){

        $(".spu-menu-li").click(function(){
          $(this).parent().find('li').each(function(){
            $(this).removeClass('active');
            $(this).find('a').css('color', '#337AB7');
          });
          $(this).addClass('active');
          $(this).find('a').css('color', '#60AD94');

        });
        //帮助提示
        $('.span-spu-help').hover(function(){
          $(this).popover('show');
        });
        $('.span-spu-help').click(function(){
          // $('#myModal').show();
          $('#spu-help-modal').show();
          $('#spu-help-modal .my-modal-content-div').show('slow');
        });
        $('#spu-help-modal .my-modal-remove').click(function(){
          $('#spu-help-modal').hide();
          $('#spu-help-modal .my-modal-content-div').hide();
        });

      },
      methods: {

        //勾选
        changeChoose(val){
          this.chooseList = val;
        },

        attrOptionChange(){
          // let { baseAttrs2, baseAttrs, chooseAttrs,hasAttr } = this;
          this.chooseAttrs = [];
          this.baseAttrs2.forEach(id => {
            let item1 = this.baseAttrs.find(item => item.id+'' === id+'');
            item1.value = [];
            item1.inputVisible = false;
            item1.vainputValue = '';
            this.chooseAttrs.push(item1);
          });
          if(this.chooseAttrs.length > 0){
            this.hasAttr = true;
          }else{
            this.hasAttr = false;
          }
        },


        handleClose(tag,index,item) {
          this.chooseAttrs[index].value.splice(item.value.indexOf(tag), 1);
        },

        showInput(index,item) {

          this.$prompt('请输入属性值', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.chooseAttrs[index].value.push(value);
          }).catch(() => {

          });

          // this.chooseAttrs[index].inputVisible = true;
          // item.inputVisible = true;
          // this.$nextTick(_ => {
          //   this.$refs.saveTagInput.$refs.input.focus();
          // });
          // console.log(this.chooseAttrs)
        },

        handleInputConfirm(index,item) {
          let inputValue = item.inputValue;
          if (inputValue) {
            this.chooseAttrs[index].value.push(inputValue);
          }
          this.chooseAttrs[index].inputVisible = false;
          this.chooseAttrs[index].inputValue = '';
        },



        //查找信息
        findItem(type, pageNum, pageSize){//type: 0 -- 由 find 查找分页，1 -- 更新，换页
          let data = '';
          let str = this.findData.trim();
          if(type === 0){
            if(str === '' || str === null || str ===  undefined ){
              this.$message({
                message: '请输入要查找的信息',
                type: 'warning'
              });
              return;
            }
            data = {name: str, pageNum: 1, pageSize: 5};//首页
          }else{
            data = {name: this.findData2, pageNum: pageNum, pageSize: pageSize};
          }

          const url = 'api/spu/find';
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101' || response.data.code === '102'){
                if(response.data.extend === null){
                  this.$message({
                    message: '暂无数据',
                    type: 'warning'
                  });
                  this.page = '';
                  return;
                }
                if(type === 0){
                  this.findData2 = str;
                }
                this.page = response.data.extend;
                this.findAllFlag = false;//条件查询

                this.pageData();
              }

            }
          );
        },

        //删除多个
        async deleteRows(){
          // let items = [];
          // $('.spuCheckbox').each(function(){
          //   if($(this).attr('isCheck')){//是否已选
          //     let itemId = $(this).attr('itemId');
          //     let itemName = $(this).attr('itemName');
          //     let itemCatalog3Id = $(this).attr('catalog3Id');
          //     let itemBrandId = $(this).attr('brandId');
          //
          //     const data = {id: itemId, name: itemName, catalog3Id: itemCatalog3Id, brandId: itemBrandId };
          //     items.push(data);
          //   }
          // });
          // if(items.length <= 0){
          //   this.$message({
          //     message: '请先勾选要删除的行',
          //     type: 'warning'
          //   });
          //   return false;
          // }

          if(this.chooseList === null || this.chooseList === undefined || this.chooseList.length <= 0){
            this.$message({
              message: '请先勾选需要删除的属性',
              type: 'warning'
            });
            return;
          }

          //构造数据
          let items = this.chooseList;

          const result = await this.deleteItem(items).then(function (result) {
            return result;
          });
          //更新数据
          if(result){
            // this.checkAll(this.pageNum, this.pageSize);
            // $('.spuCheckbox').each(function(){
            //   $(this).removeClass('checkbox-choose-full');
            //   $(this).attr('isCheck', '');
            // });
            //更新页面
            if(this.findAllFlag){
              this.checkAll(this.pageNum, this.pageSize);
            }else{
              this.findItem(1,this.pageNum, this.pageSize);
            }
          }
        },
        //单个删除
        // async deleteRow(item,index){
        async deleteRow(index,data){
          // console.log(index);
          // console.log(data);
          // this.tableData.splice(index, 1);

          // let data = [];
          // data.push(item);
          // const result = await this.deleteItem(data).then(function (result) {
          //   return result;
          // });
          // //更新数据
          // if(result){
          //   if(this.findAllFlag){
          //     this.checkAll(this.pageNum,this.pageSize);
          //   }else{
          //     this.findItem(1,this.pageNum,this.pageSize);
          //   }
          //
          // }

          const item = data[index];

          let items = [];
          items.push(item);
          const result = await this.deleteItem(items).then(function (result) {
            return result;
          });
          //更新数据
          if(result){
            if(this.findAllFlag){
              this.checkAll(this.pageNum,this.pageSize);
            }else{
              this.findItem(1,this.pageNum,this.pageSize);
            }

          }
        },
        //删除item
        async deleteItem(items){//name,id,catalog3Id,brandId -- 用对象封装

          console.log('deleteItem')
          let names = '';
          for(let i = 0; i <= items.length -1; i++){
            if(i === items.length -1){
              names += items[i].name;
            }else{
              names += items[i].name + '、';
            }
          }

          const re1 = await this.$confirm('您要删除 ' +  names + ' 的数据吗?', '提示', {
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

          const url = 'api/spu/delete';
          const data = {items: JSON.stringify(items)};

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

        //查询所有
        async checkAll(pageNum, pageSize){
          const url = 'api/spu/getAllPage';
          const data = {pageNum: pageNum, pageSize: pageSize};
          await axios.get(url,{params: data}).then(
            response => {
              if(response.data.code === '101' || response.data.code === '102'){
                if(response.data.extend === null){
                  this.$message({
                    message: '暂无数据',
                    type: 'warning'
                  });
                  this.page = '';
                  return;
                }else if(response.data.extend.list.length === 1){
                  if(response.data.extend.list[0] === null){//防止击穿的数据
                    this.$message({
                      message: '暂无数据',
                      type: 'warning'
                    });
                    this.page = '';
                    return;
                  }
                }
                this.page = response.data.extend;
                this.findAllFlag = true;
                this.pageData();
              }

            }
          );
        },
        //page 数据处理 -- 用于分页
        pageData(){
          this.pageNum = this.page.pageNum;
          this.pageSize = this.page.pageSize;
          let p1 = this.page.total/this.page.pageSize;//会保留余数
          this.page.pages = Math.ceil(p1);
          this.page.navigatepage = 5;
          if(this.page.pages > 5) {
            if(this.page.pageNum <= 3){
              this.page.navigatepageNums = [1,2,3,4,5];
            }
            if(this.page.pageNum > 3 && (this.page.pageNum + 2) >= this.page.pages){
              this.page.navigatepageNums = [this.page.pages-4,this.page.pages-3,this.page.pages-2,this.page.pages-1,this.page.pages];
            }else if(this.page.pageNum > 3 && (this.page.pageNum + 2) < this.page.pages){
              this.page.navigatepageNums = [this.page.pageNum-2,this.page.pageNum-1,this.page.pageNum,this.page.pageNum+1,this.page.pageNum+2];
            }
          }else if(this.page.pages <= 5){
            this.page.navigatepageNums = [];
            for (let i=1; i <= this.page.pages; i++){
              this.page.navigatepageNums.push(i);
            }
          }
        },
        //分页更新
        pageUpdate(){
          if(this.isCheckName){//是否name查找分页
            this.findItem(1, this.pageNum, this.pageSize);
          }else{
            this.checkAll(this.pageNum, this.pageSize);
          }
        },
        //单选/全选/全不选
        checkBoxChooseAll(e){
          if(!$(e.target).attr('isCheck')){
            //全选
            $(e.target).addClass('checkbox-choose-full');
            $(e.target).attr('isCheck', true);
            $('.spuCheckbox').each(function(){
              $(this).addClass('checkbox-choose-full');
              $(this).attr('isCheck', true);
            });
          }else{
            //全不选
            $(e.target).removeClass('checkbox-choose-full');
            $(e.target).attr('isCheck', '');
            $('.spuCheckbox').each(function(){
              $(this).removeClass('checkbox-choose-full');
              $(this).attr('isCheck', '');
            });
          }
        },
        checkBoxChoose(e){
          if(!$(e.target).attr('isCheck')){
            $(e.target).addClass('checkbox-choose-full');
            $(e.target).attr('isCheck', true);
            //判断是否要勾选全选框
            let i = $('.spuCheckbox').length;
            let j = 0;
            $('.spuCheckbox').each(function(){

              if($(this).attr('isCheck')){
                j++;
              }
            });
            if(i === j){
              $('.spuCheckAll').addClass('checkbox-choose-full');
              $('.spuCheckAll').attr('isCheck', true);
            }
          }else{
            $(e.target).removeClass('checkbox-choose-full');
            $(e.target).attr('isCheck', '');
            //去掉全选
            $('.spuCheckAll').removeClass('checkbox-choose-full');
            $('.spuCheckAll').attr('isCheck', '');
          }
        },

        //添加属性
        async addItem(){
          this.isLoad = true;
          $("#spu-model-add-btn").attr("disabled", "disabled");
          const { itemName1, selectData, brands, brandId, catalogs1, catalogs2, catalogs3, baseAttrs2, baseAttrs, description, chooseAttrs } = this;
          const str = itemName1.trim();

          let f = 0;
          if( selectData === null || selectData === undefined || selectData.length <= 0){
            this.$message({
              message: '请先选择分类',
              type: 'warning'
            });
            f++;
          }

          if(brandId === null || brandId === undefined || brandId === ''){
            this.$message({
              message: '请先选择品牌',
              type: 'warning'
            });
            f++;
          }
          if(f > 0){
            this.isLoad = false;
            $("#spu-model-add-btn").removeAttr("disabled");
            return false;
          }

          if(str === null || str === undefined || str === ''){
            this.addNameTip('name不能为空！');
            this.isLoad = false;
            $("#spu-model-add-btn").removeAttr("disabled");
            return;
          }
          const result = await this.nameCheck().then(function(result){
            return result;
          });
          if(!result){
            this.isLoad = false;
            $("#spu-model-add-btn").removeAttr("disabled");
            return;
          }

          // this.isLoad = true;
          // $("#spu-model-add-btn").attr("disabled", "disabled");

          const catalog1 = catalogs1.find(item => item.id+'' === selectData[0] + '');
          // console.log(catalog1);
          const catalog2 = catalogs2.find(item => item.id+'' === selectData[1] + '');
          // console.log(catalog2);
          const catalog3 = catalogs3.find(item => item.id+'' === selectData[2] + '');
          const brand = brands.find(item => item.id+'' === brandId + '');
          // console.log(catalog3);
          const catalogName = catalog1.name + '/' + catalog2.name + '/' + catalog3.name;

          // const list = [];
          // baseAttrs2.forEach(item => {
          //   const attr =baseAttrs.find(b => b.id + '' === item + '');
          //   list.push(attr);
          // });
          // console.log(list);
          // let s = JSON.stringify(list);

          let s2 = JSON.stringify(chooseAttrs);

          const url = 'api/spu/add';
          const data = { name: str, catalog3Id: this.selectData[2], brandId: brand.id, catalogName: catalogName, brandName: brand.name, description: description, attrs2: s2 };
          await axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message({
                  message: '成功添加属性！',
                  type: 'success'
                });

                //更新数据
                // this.tableData.push(response.data.extend);
                if(this.page !== undefined && this.page !== null && this.page !== ''){
                  this.checkAll(this.pageNum, this.pageSize);
                }
              }
            }
          );
          this.isLoad = false;
          $("#spu-model-add-btn").removeAttr("disabled");
        },
        //更新属性
        async updateItem(){
          this.isLoad = true;
          $("#spu-model-update-btn").attr("disabled", "disabled");
          const { itemName1, flag, brandId, updateData, description, baseAttrs, baseAttrs2,brands } = this;
          const str = itemName1.trim();

          if(brandId === null || brandId === undefined || brandId === ''){
            this.$message({
              message: '请先选择品牌',
              type: 'warning'
            });
            this.isLoad = false;
            $("#spu-model-update-btn").removeAttr("disabled");
            return false;
          }

          if(str === null || str === undefined || str === ''){
            this.addNameTip('name不能为空！');
            this.isLoad = false;
            $("#spu-model-update-btn").removeAttr("disabled");
            return;
          }
          let attrsTemp = [];
          updateData.baseAttrs.forEach(item => {
            attrsTemp.push(item.id);
          });

          // let updateAttrFlag = JSON.stringify(baseAttrs2.sort()) === JSON.stringify(attrsTemp.sort());
          // if(str === updateData.name && description === updateData.description && updateAttrFlag){
          //   this.$message({
          //     message: '请先修改数据!',
          //     type: 'warning'
          //   });
          //   this.isLoad = false;
          //   $("#spu-model-update-btn").removeAttr("disabled");
          //   return;
          // }

          const result = await this.nameCheck().then(function (result) {
            return result;
          });
          if(!result){
            this.addNameTip('该name已经存在');
            this.isLoad = false;
            $("#spu-model-update-btn").removeAttr("disabled");
            return;
          }

          // this.isLoad = true;
          // $("#spu-model-update-btn").attr("disabled", "disabled");

          // let attrsTemp2 = [];
          // baseAttrs2.forEach(item => {
          //   const b = baseAttrs.find(i => i.id === item);
          //   attrsTemp2.push(b);
          // });

          const brand = brands.find(item => item.id+'' === brandId + '');

          const url = 'api/spu/update';
          const data = { attrs: JSON.stringify(this.chooseAttrs), id: updateData.id, name: str, catalog3Id: updateData.catalog3Id, description: description,brandId: brandId,
            brandName: brand.name, catalogName: updateData.catalogName, oldName: updateData.name, oldBrandId: updateData.brandId };

          await axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message({
                  message: '更新成功！',
                  type: 'success'
                });
                data.baseAttrs = this.chooseAttrs;
                //更新列表数据
                this.page.list[this.index] = data;
                this.openOrShowMymodel();
              }
            }
          );
          this.isLoad = false;
          $("#spu-model-update-btn").removeAttr("disabled");
        },
        //name 查重
        async nameCheck(){
          const { itemName1, selectData, flag, itemName2,  brandId, updateData } = this;

          this.nameOkSign = false;
          this.nameRemoveSign = false;

          if(flag){
            if( selectData === null || selectData === undefined || selectData.length <= 0){
              return false;
            }
          }

          if(brandId === null || brandId === undefined || brandId === ''){
            return false;
          }

          if(itemName1.trim() === ''){
            return false;
          }
          if(!flag){//更新
            if(itemName1.trim() === updateData.name.trim()){
              return true;
            }
          }
          // const brand = brands.find(item => item.id + '' === brandId + '');
          const url = 'api/spu/nameCheck';
          let data = '';
          if(flag){
            data = { name: itemName1.trim(), catalog3Id: parseInt(selectData[2]), brandId: brandId };
          }else{
            data = { name: itemName1.trim(), catalog3Id: parseInt(updateData.catalog3Id), brandId: brandId };
          }

          const result = await axios.post(url, qs.stringify(data)).then(
            response => {
              console.log(response.data);
              console.log(this);
              if (response.data.code === "101" && response.data.extend === "0") {//无该品牌记录
                this.nameOkSign = true;
                return true;
              }else if(response.data.code === "101" && response.data.extend === "1"){//已经存在该品牌
                this.addNameTip('该name已经存在');
                return false;
              }
              return false;
            },
            error => {
              return false;
            }
          );
          if(result){
            return true;
          }
          return false;
        },
        //加载品牌
        loadBrand(){
          const url = 'api/brand/getAll';
          axios.get(url).then(
            response => {
              if(response.data.code === '101'){
                this.brands = response.data.extend;
                if(this.brands === null ||  this.brands === undefined || this.brands.length <= 0){
                  this.$message({
                    message: '当前品牌信息为空！',
                    type: 'warning'
                  })
                }
              }
            }
          )
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
        //捕捉选项, 并加载列表
        optionChange(catalog3Id){
          // console.log(this.selectData[2]);
          const url = 'api/baseAttr/getAll';
          let data = '';
          if(this.flag){//添加获取数据
            data = { catalog3Id: this.selectData[2] };
          }else{
            data = { catalog3Id: catalog3Id };
          }

          axios.get(url, {params: data}).then(
            response => {
              if(response.data.code === '101'){
                this.baseAttrs = response.data.extend;
                if(this.flag){//添加置零
                  this.baseAttrs2 = [];
                  this.chooseAttrs = [];
                  this.hasAttr = false;
                }
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
        //显示编辑框
        async openMymodel(type, index, data1){

          await this.loadCatalog1();
          await this.loadBrand();
          this.baseAttrs = [];
          this.baseAttrs2 = [];
          this.chooseAttrs = [];
          this.hasAttr = false;

          if(type === 1){

            this.flag = true;
            this.brandId = '';
            this.itemName1 = '';
            this.selectData = '';
            this.description = '';
          } else {

            let data = data1[index];
            this.index = index;
            this.flag = false;
            this.updateData = data;
            this.catalogName = data.catalogName;
            this.brandId = data.brandId;
            this.itemName1 = data.name;
            this.description = data.description;
            await this.optionChange(data.catalog3Id);
            data.baseAttrs.forEach(item => {
              this.baseAttrs2.push(item.id);
            });

            if(data.baseAttrs !== null && data.baseAttrs.length > 0){
              this.chooseAttrs = data.baseAttrs;
              this.hasAttr = true;
            }

          }
          this.nameOkSign = false;
          this.nameRemoveSign = false;
          this.openOrShowMymodel();

        },
        //开关横态框
        openOrShowMymodel(){
          this.isShow = !this.isShow;
        },
        //显示添加品牌时品牌名的错误信息
        addNameTip(tipStr){
          this.nameOkSign = false;
          this.nameRemoveSign = true;
          this.nameRemoveSignTip = tipStr;
        },
      }
    }
</script>

<style>
  .spu-div-menu{
    padding: 5px;
    /*background-color: #60AD94;*/
    height: 50px;
    width: 100%;
  }
  .span-spu-help{
    display: inline-block;
    float: right;
    font-size: 20px;
    margin: 10px 40px;
  }
  .my-modal-content-div{
    /*width: 900px;*/
    /*background-color: #fff;*/
    /*height: 500px;*/
    /*position: absolute;*/
    margin: 50px auto 0;
  }
  .spu-item-list{
    font-size: 15px;
    /*background-color: #6CB7A0;*/
    height: 480px;
    position: relative;
    margin-left: 290px;
    width: 1380px;
  }
  .spu-item-list th{
    font-weight: bold;
  }
  .spu-item-list .btn{
    font-size: 14px;
    padding: 0 20px;
  }
  .spu-item-list .page-btn-div nav{
    display: inline-block;
    /*background-color: #316AC5;*/
    margin: 0 auto;
    padding: 20px 0 0 0;
  }
  @import "./../../../../plugins/malihu-custom-scrollbar/jquery.mCustomScrollbar.min.css";
  .spu-edit-modal-group{
    /*background-color: #f7e1b5;*/
    /*width: 1000px;*/
    /*margin: 0 auto;*/
    font-size: 16px;
    margin: 30px 0;
  }
  .spu-edit-modal-item-title{
    /*background-color: #2e6da4;*/
    width: 150px;
    display: inline-block;
    text-align: right;
    /*margin-left: 290px;*/
    padding-right: 10px;
    /*position: relative;*/
  }
  .spu-edit-modal-item-title-div{
    /*float: right;*/
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    height: 100%;
    /*text-align: right;*/
  }
  .spu-edit-modal-item-content{
    display: inline-block;
    /*background-color: #60AD94;*/
    width: 500px;
    margin: 0 40px;
  }
  .spu-edit-modal-item-title-textArea{
    float: left;
    margin: 5px 5px 0 0;
    width: 150px;
    padding-right: 10px;
    text-align: right;
  }
</style>
