<template>

  <div class="user-authority thumbnail" v-loading="loading">
    <div class="user-authority-choose-div" >
      <div class="user-authority-choose-title">权限管理<span class="glyphicon glyphicon-question-sign" style="padding-left: 10px"></span></div>
      <div class="user-authority-choose">
        <el-menu default-active="1" style="height: 65px;" class="el-menu-demo" mode="horizontal">
          <el-menu-item @click="showItem(1)" class="menu_item" style="color: #60AD94;" index="1"><i class=""></i>管理权限</el-menu-item>
          <el-menu-item @click="showItem(2)" class="menu_item" style="color: #60AD94;" index="2">查询权限</el-menu-item>
        </el-menu>
      </div>
    </div>

    <div v-if="menuItemShow1Flag" class="user-authority-main thumbnail">
      <div class="user-authority-main-left">
        <ul class="">
          <li><span @click="levelAddOpen(0)" class="span-btn btn btn-primary span-btn-catalog1-plus">添加一级菜单</span></li>
          <!--<li><span @click="levelAddOpen(2)" class="span-btn btn btn-primary span-btn-catalog1-plus">添加二级分类</span></li>-->
          <!--<li><span @click="levelAddOpen(3)" class="span-btn btn btn-primary span-btn-catalog1-plus">添加三级分类</span></li>-->
        </ul>
      </div>
      <div class="user-authority-main-right">
        <div class="user-authority-main-right-tree">
          <el-tree v-loading="loading2" style="font-size: 14px;" :data="dataZtree" show-checkbox node-key="ztreeId"
                   :expand-on-click-node="false"
                   highlight-current
                   :props="defaultProps"
                   :load="loadNode"
                   lazy
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <i :class="data.icon"></i>
              <span>{{ data.authName }}</span>
            <span style="position: relative;right: -200px">
            <el-tooltip content="编辑" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => modelOpenNode(node,data,1)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="data.level !== 2" content="添加" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => modelOpenNode(node,data,2)">
            <i class="el-icon-plus"></i>
          </el-button>
            </el-tooltip>
            <el-tooltip v-if="data.level !== 2" content="删除选中子节点" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => removeNodes(node, data)">
            <i class="el-icon-minus"></i>
          </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => removeNode(node, data)">
            <i class="el-icon-delete"></i>
          </el-button>
            </el-tooltip>

            </span>


            </span>
          </el-tree>


        </div>
      </div>
    </div>
    <div v-else class="user-authority-main thumbnail">
      有待开发
    </div>

    <!--<input type="hidden" id="input_hidden" data-toggle="modal" data-target="#myModal"/>-->
    <!-- Modal 横态框 -->
    <transition name="tip-alert">
    <div v-if="isShowMymodel" class="myModal" style="z-index: 2">
      <div class="myModal-div thumbnail">
        <div class="myModal-title">
          <div class="myModal-title-left">
            <span v-if="level1">一级菜单</span>
            <span v-if="level2">二级菜单</span>
            <span v-if="level3">资源</span>
          </div>
          <div  class="myModal-title-right"><span @click="openMymodel()" class="glyphicon glyphicon-remove catalog-plus-modal-remove"></span></div>
        </div>
        <div class="myModal-content">
          <div class="catalog-form-div">
            <div class="catalog-level1">
              <span style="padding-left: 150px">图标</span>
              <el-tag effect="plain" type="" style="font-size: 17px;border: none;border-bottom: 1px solid #ccc;color: #606266;">
                <i :class="myIcon"></i>
              </el-tag>
              <el-select clearable v-model="myIcon" placeholder="请选择" style="width: 40px;border: none;">
                <el-option
                  style="font-size: 16px;"
                  v-for="item in icon"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                  <i :class="item.name"></i>
                </el-option>

              </el-select>

              <span style="padding-left: 45px">名称</span>
              <el-input
                style="width: 230px"
                placeholder="用户管理"
                suffix-icon="el-icon-edit el-input__icon"
                v-model="authName1"
                @change="nameChange"
              >
              </el-input>

              <el-tag type="danger" v-show="authNameErrorFlag">{{authNameError}}</el-tag>

            </div>

            <div v-if="level2 || level3" class="catalog-level1">
              <span style="padding-left: 150px;">路径</span>
              <el-input suffix-icon="el-icon-position" v-model="resource" placeholder="/login" style="width: 400px"></el-input>
            </div>

            <div class="catalog-level1">
              <span style="padding-left: 150px;position: relative;top: -45px;">描述</span>
              <el-input
                style="width: 400px"
                type="textarea"
                placeholder="请输入内容"
                v-model="description"
                maxlength="30"
                show-word-limit
              >
              </el-input>
            </div>


            <div class="catalog-level1 ">
              <div class="catalog-input-div">
                <!--<label class="catalog-name">一级分类</label>-->
                <!--<span  role="btn" class="thumbnail mybtn-span" >添加</span>-->
                <div v-show="flag" @click="itemAdd($event)" class="thumbnail mybtn-span mybtn-span my-modal-form-submit form-control btn btn-primary">
                  <span v-show="!isLoad" >添加</span>
                  <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                    <div class='loader'></div>
                  </div>
                </div>

                <div v-show="!flag" @click="updateItem($event)" class="thumbnail mybtn-span mybtn-span my-modal-form-submit form-control btn btn-info">
                  <span v-show="!isLoad">更新</span>
                  <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                    <div class='loader'></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        </div>
      </div>
    </transition>


  </div>


</template>

<script>
  import '@/assets/js/jquery-1.4.4.min.js';
  import '@/assets/js/jquery.ztree.all.min.js';
  import {mapState} from 'vuex';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    computed:{
      ...mapState(['icon'])
    },
    data(){
      return{
        isLoad: false,
        myIcon: 'el-icon-s-marketing',
        resource: '',
        description: '',
        authName1: '',
        authNameError: '',
        authNameErrorFlag: false,
        dataZtree: [],
        defaultProps: {//树数据
          children: 'list',
          label: 'name',
          value: 'id',
          isLeaf: 'leaf'
        },
        loading: false,
        loading2: false,
        isShowMymodel: false,//横态框是否显示
        level1: false,//判断当前横态框是哪级分类在操作
        level2: false,
        level3: false,
        flag: true,
        node1: '',//缓存当前要操作的节点 和 数据 -- 地址传递 数据都是字符串类型 不能直接和数据比较
        data1: '',
        level: -1,//记录当前操作元素的level等级
        pId: -1,//记录当前操作元素的level等级

        menuItemShow1Flag: true,//控制菜单显示
      }
    },
    mounted(){
      $('.menu_item').click(function(){
        $('.menu_item').each(function(){
          $(this).css('color', '#60AD94');
        });
        $(this).css("color","#337AB7");

      });

      //先声明方法，后面再添加的元素用这方法调用
      $(document).on('mouseenter', '.tree-span-delete-part',function(event){
        $(this).popover('show')
      });
      $(document).on('mouseenter', '.tree-span-delete-all',function(event){
        $(this).popover('show')
      });
      $(document).on('mouseenter', '.tree-span-plus',function(event){
        $(this).popover('show')
      });
      $(document).on('mouseenter', '.tree-span-edit',function(event){
        $(this).popover('show')
      });
      $(document).on('click', '.tree-span-delete-part',function(event){
        // $("#input_hidden").trigger('click')
        alert(this.level3s);
        $('.myModal').modal('show');
      });

      $(".catalog-level1-btn").hover(function(){
        $(this).popover('show')
      });
      $(".catalog-level1-btn").click(function(){
        $('.catalog-level2 span').hide();
        $('.catalog-level2').show(300);
        $('.catalog-level2 span').show();
      });
      //横态框 -- 添加二级分类输入框
      $(document).on('click', '.catalog-level2-btn-plus', function(event){
        $(this).parent().after('<div class="catalog-level2-div">\n' +
          '                  <input type="text" class="form-control catalog-input" placeholder="干货">\n' +
          '                  <span class="catalog-level2-btn catalog-level2-btn-plus glyphicon glyphicon-plus btn btn-primary" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class=\'btn-span2\'>继续添加二级分类</span>" data-trigger="hover"></span>\n' +
          '                  <span class="catalog-level2-btn catalog-level2-btn-delete glyphicon glyphicon-minus btn btn-danger" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class=\'btn-span2\'>删除</span>" data-trigger="hover"></span>\n' +
          '                </div>');
      });
      //横态框 -- 删除二级分类输入框
      $(document).on('click', '.catalog-level2-btn-delete',function(){
        //判读是否是最后一个输入框
        if($(this).parent().parent().find('.catalog-level2-div').length === 1 ){
          $(this).parent().parent().parent().hide(300);
          $(this).parent().find('input').val('');
          return ;
        }
        $(this).parent().remove();
      });
      //二级分类按钮提示框
      $(document).on('mouseenter', '.catalog-level2-btn-plus', function(event){
        $(this).popover('show');
      });
      $(document).on('mouseenter', '.catalog-level2-btn-delete', function(event){
        $(this).popover('show');
      });



      //获取一级菜单
      this.loadMenu1();

    },
    methods: {
      async loadNode(node, resolve) {
        const data = { pId: node.data.id };
        if (node.data.level + '' === '0') {
          await axios.get('api/authority/getLevel2',{params: data}).then(
            response => {
              if(response.data.code === '101'){
                return resolve(response.data.extend);
              }
            }
          );
        }
        if (node.data.level + '' === '1') {
          await axios.get('api/authority/getLevel3',{params: data}).then(
            response => {
              if(response.data.code === '101'){
                const list = response.data.extend;
                list.forEach(item => {
                  item.leaf = true;
                });
                return resolve(list);
              }
            }
          );
        }

      },
      showItem(type){
        if(type === 1){//树
          this.menuItemShow1Flag = true;
          // this.loading2 = true;
          this.loadMenu1();
        }else{
          this.menuItemShow1Flag = false;
        }

      },
      //加载菜单
      async loadMenu1(){
        this.loading2 = true;
        try{
          const url = 'api/authority/getLevel1';
          await axios.get(url).then(
            response => {
              console.log(response.data.extend);
              if(response.data.code === '101'){
                const data = response.data.extend;
                if(data === undefined || data === null || data === '' || data.length < 1){
                  this.$message.warning('暂无数据');
                }else{
                  this.dataZtree = data;
                }
              }
            }
          );
          this.loading2 = false;
        }finally {
          this.loading2 = false;
        }
      },
      async removeNode(node, data) {//删除该节点

        console.log(data);
        const reqData = { ids: data.id + '' };
        let tip = '';
        if(data.level + '' === '2'){
          tip = '您确定要删除 '+ data.authName + ' 资源吗?';
        }else{
          tip = '您确定要删除 '+ data.authName + ' 及其子类资源吗?';
        }
        const re1 = await this.$confirm(tip, '提示', {
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
          return;
        }
        this.loading = true;
        const re = await this.deleteItem(0,reqData);
        if(re){
          node.remove();
        }
        this.loading = false;
      },
      async removeNodes(node, data){//删除选中的子节点

        let checkNodes = [];//记录勾选节点 node
        let catalogs = [];
        let reqData = {};
        let idsStr = '';
        let namesStr = '';

        node.childNodes.forEach(item => {
          if(item.checked === true){
            idsStr += item.data.id + '-';
            namesStr += item.data.authName + '-';
            // item.remove();
            catalogs.push(item.data);
            checkNodes.push(item);
          }
        });
        if(catalogs.length <= 0){//判断是否有勾选的数据
          this.$message({
            message: '请先选择需要删除的子类',
            type: 'warning'
          });
          return;//没有勾选子类
        }

        //截取字符串
        idsStr = idsStr.substring(0, (idsStr.length -1));
        namesStr = namesStr.substring(0, (namesStr.length -1));

        const re1 = await this.$confirm('您要删除 '+ data.authName + ' 菜单的子类：' + namesStr +' 的信息吗?', '提示', {
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
          return;
        }

        this.loading = true;
        reqData = { ids: idsStr };
        const re = await this.deleteItem(1, reqData);
        if(re){
          //移除节点
          checkNodes.forEach(item => {
            item.remove();
          });
        }
        this.loading = false;
      },
      async deleteItem(level,data){
        let url = 'api/authority/delete';
        return await axios.post(url,qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              return true;
            }else{
              this.$message({
                message: '删除失败!',
                type: 'error'
              });
              return false;
            }
          }
        )
      },
      //更新数据
      async updateItem(e){
        let url = 'api/authority/update';
        let data = '';

        //查重
        if(this.authName1.trim() !== this.data1.authName){
          const re = await this.nameChange();
          if (!re) {
            return false;
          }
        }
        let pId = 0;
        if(this.level1){
          pId = 0;
        }else{
          pId = parseInt(this.data1.pid);
        }


        data = { authName: this.authName1.trim(), id: parseInt(this.data1.id),oldName: this.data1.authName,
          description: this.description, resource: this.resource, icon: this.myIcon,
          level: parseInt(this.data1.level),pId: pId };

        this.isLoad = true;
        $(e.target).attr("disabled", "disabled");

        await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === '101') {
              this.$message.success('成功修改');
              //关闭横态框
              this.openMymodel();
              //更新数据
              this.data1.authName = data.authName;
              this.data1.description = data.description;
              this.data1.resource = data.resource;
              this.data1.icon = data.icon;
            }else if(response.data.code === '102'){
              this.$message.warning(response.data.message);
            }
          }
        );
        this.isLoad = false;
        $(e.target).removeAttr("disabled");
      },
      //添加
      async itemAdd(e){
        try {
          let url = 'api/authority/add';
          let data = '';
          if (this.authName1.trim() === "" || this.authName1 === null || this.authName1 === undefined) {
            this.$message.warning('name不能为空');
            this.authNameError = 'name不能为空';
            this.authNameErrorFlag = true;
            return;
          }
          //查重
          const result = await this.nameChange();
          if (!result) {
            return;
          }
          if (this.level1) {
            data = {
              authName: this.authName1.trim(),
              level: this.level,
              description: this.description,
              icon: this.myIcon,
              pId: 0
            };
          } else {
            data = {
              authName: this.authName1.trim(),
              level: this.level,
              description: this.description,
              icon: this.myIcon,
              pId: this.pId,
              resource: this.resource
            };
          }

          this.isLoad = true;
          $(e.target).attr("disabled", "disabled");
          await axios.post(url, qs.stringify(data)).then(
            response => {
              if (response.data.code === '101') {
                // alert('成功处理');
                this.$message.success('成功添加');
                const result = response.data.extend;
                if(this.level3){
                  result.leaf = true;
                }
                if (this.level1) {
                  this.dataZtree.push(result);
                } else {
                  if(this.data1.list === undefined || this.data1.list === null || this.data1.list.length < 1){
                    this.data1.list = [];
                  }
                  this.data1.list.push(result);
                }

              } else if (response.data.code === '102') {
                this.$message.warning(response.data.message);
              }
            }
          );
        }finally {
          this.isLoad = false;
          $(e.target).removeAttr("disabled");
        }
      },
      //name输入检查是否已经存在
      async nameChange(){
        //清空设置
        this.authNameErrorFlag = false;

        const name = this.authName1.trim();
        //brandName 为空
        if(name === '' || this.authName1 === null || this.authName1 === undefined){
          return false;
        }
        const url = 'api/authority/nameCheck';
        let pId = parseInt(this.data1.id);
        if(pId === undefined || pId === null){
          pId = 0;
        }
        const data = {authName: name, level: this.level, pId: pId};
        if(this.flag){//true 为添加横态框，false 为更新横态框
          return await this.checkNameFun(url, data);
        }else{//更新
          if(this.authName1.trim() !== this.data1.authName){
            //检查
            // this.checkNameFun(url, data);//异步方法 返回数据有点反常
            // return this.result;
            return await this.checkNameFun(url, data);
          }
        }
        return false;
      },
      //检查name是否重复
      async checkNameFun(url, data){
        return await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === "101" && response.data.extend + '' === "0") {//无该品牌记录
              this.authNameErrorFlag = false;
              return true;
            }else if(response.data.code === "101" && response.data.extend + '' === "1"){//已经存在该品牌
              this.authNameErrorFlag = true;
              this.authNameError = 'name 已经存在';
              // this.$message.warning('name 已经存在');
            }
            return false;
          }
        );
      },

      modelOpenNode(node,data,type){//type 1--编辑 2 -- 添加
        this.node1 = node;
        this.data1 = data;
        this.level = parseInt(data.level);
        const level = this.level;
        this.pId = parseInt(data.id);

        if(type === 1){//编辑
          this.flag = false;
          this.authName1 = data.authName;
          this.myIcon = data.icon;
          this.description = data.description;
          this.resource = data.resource;
          this.openMymodelData(level);
        }else if(type === 2){
          this.flag = true;
          this.authName1 = '';
          this.description = '';
          this.resource = '';
          this.openMymodelData(level+1);
        }
        this.openMymodel();
      },
      levelAddOpen(type){
        this.flag = true;
        this.authName1 = '';
        this.description = '';
        this.resource = '';
        this.openMymodelData(type, 1);
        this.openMymodel();
      },
      openMymodelData(level){//级别，处理类型 1 -- 左边添加进入 2 -- tree 进入
        if(level === 0){
          this.level1 = true;
          this.level2 = false;
          this.level3 = false;
          this.level = 0;
        }
        if(level === 1){
          this.level1 = false;
          this.level2 = true;
          this.level3 = false;
          this.level = 1;
        }
        if(level === 2){
          this.level1 = false;
          this.level2 = false;
          this.level3 = true;
          this.level = 2;
        }
      },
      //横态框
      openMymodel(){
        this.isShowMymodel = !this.isShowMymodel;
      },

    }

  }
</script>

@import "@/assets/css/awesome.css";
<style>
  .user-authority {

  }

  .user-authority-title {
    font: 18px 'yunyuan';
    line-height: 36px;
    height: 36px;
    /*background-color: #aaa;*/
    box-shadow: 1px 1px 7px 1px #dfdfdf;
  }

  .user-authority-title span {
    padding-left: 15px;
  }

  .user-authority-main {
    margin: 10px 10px 10px 10px;
    height: 580px;
    /*background-color: #60AD94;*/
    overflow: auto;
    position: relative;
  }
  .user-authority-choose {
    font: 16px 'yunyuan';
    margin-left: 10px;
    /*padding: 10px 0 10px 40px;*/
    /*background-color: #60AD94;*/
  }

  .user-authority-choose-title {
    padding: 5px 10px;
    font: 18px '微软雅黑';
    font-weight: 500;
    color: #17346C;
  }

  .user-authority-main-left{
    display: inline-block;
    width: 130px;
    border-right: 1px solid #DDDDDD;
    height: 100%;
    font: 14px 'yunyuan';
    text-align: center;
  }
  .user-authority-main-left ul li{
    /*border-bottom: 1px solid #DDDDDD;*/
    /*padding: 5px 10px;*/
    margin: 10px 0;
  }
  .span-btn{
    /*background-color: #2e6da4;*/
    /*color: #fff;*/
    /*padding: 10px;*/
  }
  .user-authority-main-right{
    display: inline-block;
    position: absolute;
    /*background-color: #60AD94;*/
    left: 120px;
    right: 10px;
    top: 10px;
    bottom: 15px;
    overflow: auto;
    /*padding: 10px;*/
  }
  .span-tip{
    padding: 10px;
    font: 14px 'yuanyuan';
    color: #17346C;
  }
  .ztree-node-span{
    padding: 0 20px;
    /*font-size: 11px;*/
    /*line-height: 16px;*/
    /*height: 15px;*/
  }
  .ztree-node-span span{
    font-size: 10px;
    /*font-weight: 300;*/
    /*line-height: 15px;*/
  }
  .user-authority-main-right-tree{
    /*background-color: #f7e1b5;*/
    padding: 0 100px;
  }
  .myModal{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(43,43,43,0.5);
  }
  .myModal-div{
    margin: 50px auto 0;
    width: 800px;
    /*height: 300px;*/
    background-color: #fff;
    box-shadow: 2px 2px 10px 2px #505050;
  }
  .myModal-title{
    border-bottom: 1px solid #E5E5E5;
    height: 60px;
    font: 20px 'yunyuan';
    line-height: 60px;
    padding: 0 20px;
    color: #17346C;
  }
  .myModal-title-left{
    float: left;
  }
  .myModal-title-right{
    float: right;
    font-size: 16px;
    color: #aaa;
  }
  .myModal-title-right span:hover{
    cursor: pointer;
    color: darkred;
  }
  .catalog-form-div{
    font: 18px 'yunyuan';
    color: #17346C;
    width: 100%;
    /*background-color: #f7e1b5;*/
    /*padding: 10px;*/
    padding-bottom: 20px;
  }
  .catalog-input-div{
    position: relative;
  }
  /*.catalog-input-div span{*/
    /*font-size: 15px;*/
    /*!*color: #000;*!*/
  /*}*/
  .catalog-name{
    position: absolute;
    /*display: none;*/
    left: 100px;
    top: 10px;
  }
  .catalog-input{
    display: inline-block;
    width: 400px;
    margin: 5px 0 5px 190px;
  }
  .catalog-form-div .form-group label{
    /*margin: 0 10px 0 150px;*/
    /*background-color: #60AD94;*/
  }
  .catalog-level1,
  .catalog-level2{
    margin: 10px 0;
    padding: 10px;
    /*-ms-overflow-style: none;  !*IE 10+*!*/
    /*scrollbar-width: none;  */
  }
  .catalog-level1-btn,
  .catalog-level2-btn{
    padding: 0 10px;
  }
  .mybtn-span{
    width: 400px;
    color: #fff;
    background-color: #58BF9D;
    text-align: center;
    padding: 5px 0;
    margin-left: 190px;
  }
  .mybtn-span:hover{
    background-color: #60AD94;
    cursor: pointer;
  }
  .catalog-level2-div{
    display: inline-block;
  }
  /*.catalog-level2-div span{*/
    /*display: none;*/
  /*}*/
  .catalog-level2{
    max-height: 450px;
    overflow: auto;
    min-height: 100px;
  }
  .select-item-choose{
    background-color: red;
    display: inline-block;
    width: 200px;
    height: 30px;
  }

</style>
