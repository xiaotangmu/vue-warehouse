<template>
  <div class="warehouse-manager-div">
    <div class="main-box-view-title">
      <span class="main-box-view-title-name">仓库管理 <span class="glyphicon glyphicon-question-sign"></span></span>
    </div>

    <div class="warehouse-manager-content-div">
      <div class="warehouse-manager-content">

        <div class="warehouse-manager-head-btn-group">
          <span class="btn btn-success" @click="checkAll(1, 5)">查看所有</span>
          <span @click="returnAdd()" class="btn btn-info warehouse-add-btn">添加仓库</span>
          <span @click="deleteBatch()" class="btn btn-danger">删除已选</span>
          <span class="form-inline">
              <input v-model="checkName" class=" form-control" type="text" placeholder="美宜佳"/>
              <span @click="findItem(0,'','')" class="btn btn-warning"><span class="glyphicon glyphicon-search" >查找</span></span>
            </span>
        </div>
        <div class="warehouse-manager-list">
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="td-1-sort">#</th>
                <th class="td-2-checkbox"><span @click="checkBoxChooseAll($event)" isCheck="" class="warehouseCheckAll checkbox-choose"></span></th>
                <th>仓库名</th>
                <th>地址</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody v-show="page !== null && page !== undefined && page !== ''">
              <tr v-for="(item, index) in page.list" :key="index">
                <td>{{(pageNum-1)*pageSize+index + 1}}</td>
                <td><span :itemId="item.id" :itemName="item.name" isChoose="false" @click="checkBoxChoose($event)" class="warehouseCheckbox checkbox-choose"></span></td>
                <td>{{item.name}}</td>
                <td>{{item.location}}</td>
                <td>{{item.description}}</td>
                <td>
                  <span @click="returnUpdate(item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                  <span @click="deleteItem(item, '', '')" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
                </td>
              </tr>

              </tbody>
            </table>

        </div>
      </div>
    </div>

    <!-- 页面数据 -->
    <div style="font-size: 13px;margin-left: 10px" v-show="page !== null && page !== undefined && page !== ''">
      <span style="padding-left: 20px">第 {{page.pageNum}} 页，共 {{page.pages}} 页 | {{page.total}} 条记录</span>
    </div>

    <!-- 页面按钮 -->
    <div v-show="page !== null && page !== undefined && page !== ''" class="brand-page-btn-div">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li v-show="page.pageNum !== 1" @click="checkAll(1, 5)"><span>首页</span></li>
          <li v-show="page.pageNum !== 1" @click="checkAll(page.pageNum-1,5)">
            <!--<span aria-hidden="true">&laquo;</span>-->
            <span aria-hidden="true">上一页</span>
          </li>
          <li @click="checkAll(num, 5)" v-for="(num, index) in page.navigatepageNums" :key="index" :class="{ 'active': page.pageNum === num}">
            <span>{{num}}</span>
          </li>
          <li @click="checkAll(page.pageNum+1,5)" v-show="page.pageNum*page.pageSize < page.total">
            <!--<span aria-hidden="true">&raquo;</span>-->
            <span aria-hidden="true">下一页</span>
          </li>
          <li @click="checkAll(page.pages, 5)" v-show="page.pageNum*page.pageSize < page.total"><span>尾页</span></li>
        </ul>
      </nav>
    </div>

    <!-- modal -->
    <div id="warehouse-item-edit-modal" class="my-modal" style="display: none">
      <div class="my-modal-content-div thumbnail" style="display: none">
        <div class="my-modal-title">
          <span class="my-modal-group-edit">仓库信息修改</span>
          <span class="my-modal-group-add">仓库添加</span>
          <span class="my-modal-remove glyphicon glyphicon-remove"></span>
        </div>
        <div class="my-modal-content myScrollBox">
          <!-- 居中表单 -->
          <div class="my-modal-form">
            <div class="my-modal-group">
              <div class="my-modal-group-title">仓库</div>
              <div class="my-modal-group-main">
                <input @change="nameChange($event)" id="warehouse-name-input" class="form-control" type="text" placeholder="一号仓库" v-model="name"/>
                <span v-show="nameOkSign" class="glyphicon glyphicon-ok-sign ok-sign brand-name-ok-sign" aria-hidden="true"></span>
                <span v-show="nameRemoveSign" class="brand-name-remove-sign remove-sign">
                    <span class="glyphicon glyphicon-remove-sign " aria-hidden="true"></span>
                    <span v-text="nameRemoveSignTip"></span>
                  </span>
              </div>
            </div>

            <div class="my-modal-group">
              <div class="my-modal-group-title">位置</div>
              <div class="my-modal-group-main">
                <input v-model="location" class="form-control" type="text" placeholder="光明路15号店"/>
              </div>
            </div>

            <div class="my-modal-group">
              <div class="my-modal-group-title">描述</div>
              <div class="my-modal-group-main">
                <!--<input v-model="description" class="form-control" type="text" placeholder="食品、茶叶"/>-->
                <textarea v-model="description" class="form-control my-modal-group-textarea" placeholder="食品、茶叶" rows="4"></textarea>
              </div>
            </div>

            <div class="my-modal-group my-modal-group-edit">
              <div class="my-modal-group-main">
                <div @click="updateItem($event)" id="warehouse-modal-update-btn" class="my-modal-form-submit form-control btn btn-info">
                  <span v-show="!isLoad">更新</span>
                  <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                    <div class='loader'></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="my-modal-group my-modal-group-add">
              <div class="my-modal-group-main">
                <div id="warehouse-modal-add-btn" @click="itemAdd($event)" class="my-modal-form-submit form-control btn btn-primary">
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
    </div>

    <!-- 提示框 -->
    <transition name="tip-alert">
      <div v-if="tipAlertShow" id="brand-tip-alert" class="alert alert-danger tip-alert" role="alert">
        <!--<span class="glyphicon glyphicon-remove-circle tip-alert-img" aria-hidden="true"></span>-->
        <span class="tip-alert-message">
            <strong>{{tipMessage}}</strong>
          </span>
      </div>
      <div v-if="tipAlertShowOk" class="alert alert-success tip-alert" role="alert">
        <!--<span class="glyphicon glyphicon-remove-circle tip-alert-img" aria-hidden="true"></span>-->
        <span class="tip-alert-message">
            <strong>{{tipMessage}}</strong>
          </span>
      </div>
    </transition>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data(){
      return{
        ...mapState(['hello']),
        isShowCityByLetter: true,
        arr: [],
        id: '',
        name: '',
        name2: '',//记录更新前原来的name
        description: '',
        location: '',
        flag: true,//true 为添加横态框，false 为更新横态框
        nameOkSign: false,
        nameRemoveSign: false,
        nameRemoveSignTip: '该供应商已经存在',
        tipMessage: 'hello',
        tipAlertShow: false,
        tipAlertShowOk: false,
        isLoad: false,
        page: '',
        pageNum: 1,
        pageSize: 5,
        brand: '',
        checkName: '',//查询输入绑定信息
        isCheckName: false,//记录是查询所有分页，还是name 查询分页 ，false 为 所有，true 为 name
        checkName2: '',//再次记录，防止数据被修改后更新
      }
    },
    mounted(){
      $(".myScrollBox2").mCustomScrollbar({
        theme: "minimal-dark"
      });

      //编辑横态框
      $(document).on('click', '.warehouse-item-edit-span', function(){
        $('#warehouse-item-edit-modal').show();
        $('#warehouse-item-edit-modal .my-modal-content-div').show('slow');
        $('#warehouse-item-edit-modal .my-modal-group-add').hide();
        $('#warehouse-item-edit-modal .my-modal-group-edit').show();
      });
      $('#warehouse-item-edit-modal .my-modal-remove').click(function(){
        $('#warehouse-item-edit-modal').hide();
        $('#warehouse-item-edit-modal .my-modal-content-div').hide();
      });
      //添加横态框
      $(document).on('click','.warehouse-add-btn',function(){
        $('#warehouse-item-edit-modal').show();
        $('#warehouse-item-edit-modal .my-modal-content-div').show('slow');
        $('#warehouse-item-edit-modal .my-modal-group-edit').hide();
        $('#warehouse-item-edit-modal .my-modal-group-add').show();
      });
      $('#warehouse-item-edit-modal .my-modal-remove').click(function(){
        $('#warehouse-item-edit-modal').hide();
        $('#warehouse-item-edit-modal .my-modal-content-div').hide();
      });

      //横态框下拉列表
      $('.my-modal-group-main-down').click(function(){
        $(this).next().trigger('focus');
      });
      // $('.my-modal-group-main-down-item-div').click(function(){
      //   $('.down-list-item-input').trigger('focus')
      // });

    },
    methods: {
      //批量删除
      deleteBatch(){
        //遍历得到ids 和 names
        let ids = '';
        let names = '';
        $('.warehouseCheckbox').each(function(){
          if($(this).attr('isCheck')){//是否已选
            if(ids !== ''){
              ids += '-' + $(this).attr('itemId');
              names += '-' + $(this).attr('itemName');
            }else{
              ids += $(this).attr('itemId');
              names += $(this).attr('itemName');
            }
          }
        });
        if (ids === ''){//没有选择的数据
          this.tipAlert('请选择要删除的数据', 0);
          return;
        }
        this.deleteItem('', names, ids);
      },

      //单选/全选/全不选
      checkBoxChooseAll(e){
        if(!$(e.target).attr('isCheck')){
          //全选
          $(e.target).addClass('checkbox-choose-full');
          $(e.target).attr('isCheck', true);
          $('.warehouseCheckbox').each(function(){
            $(this).addClass('checkbox-choose-full');
            $(this).attr('isCheck', true);
          });
        }else{
          //全不选
          $(e.target).removeClass('checkbox-choose-full');
          $(e.target).attr('isCheck', '');
          $('.warehouseCheckbox').each(function(){
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
          let i = $('.warehouseCheckbox').length;
          let j = 0;
          $('.warehouseCheckbox').each(function(){

            if($(this).attr('isCheck')){
              j++;
            }
          });
          if(i === j){
            $('.warehouseCheckAll').addClass('checkbox-choose-full');
            $('.warehouseCheckAll').attr('isCheck', true);
          }
        }else{
          $(e.target).removeClass('checkbox-choose-full');
          $(e.target).attr('isCheck', '');
          //去掉全选
          $('.warehouseCheckAll').removeClass('checkbox-choose-full');
          $('.warehouseCheckAll').attr('isCheck', '');
        }
      },

      //删除item
      async deleteItem(item, names, ids){

        if(names.trim() === '' || names === null || names === undefined){//为单个删除点击
          names = '' + item.name;
          ids = '' + item.id;
          //提示是否删除数据
          let isDelete = await this.$confirm('是否删除 ' + item.name + ' 的信息？', '提示', {
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
          if(!isDelete){
            return;
          }
        }else{//
          let isDelete = await this.$confirm('是否删除 ' + names + ' 的信息？', '提示', {
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
          if(!isDelete){
            return;
          }
        }

        // const data = item;
        const url = 'api/warehouse/delete';
        const data = {names: names, ids: ids};
        axios.post(url,qs.stringify(data)).then(
          response => {
            if(response.data.code === '101' || response.data.code === '102'){
              this.tipAlert('成功删除', 1);
              //更新数据
              this.pageUpdate();
            }
          }
        );
      },
      //提交更新brand
      async updateItem(e){
        if(this.name.trim() === '' || this.name === null || this.name === undefined){
          this.addNameTip('name不能为空');
          return;
        }
        this.isLoad = true;
        $(e.target).attr("disabled", 'disabled');

        const data = {id: this.id, name: this.name, location: this.location, description: this.description, oldName: this.name2 }
        const url = 'api/warehouse/update';

        await axios.post(url,qs.stringify(data)).then(response => {
          if(response.data.code === '101'){
            this.tipAlert('成功更新', 1);
            //关闭横态框，并更新数据
            $('#warehouse-item-edit-modal').hide();
            this.pageUpdate();
          }
        });
        this.isLoad = false;
        $(e.target).removeAttr("disabled")
      },
      //分页更新
      pageUpdate(){
        if(this.isCheckName){//是否name查找分页
          this.findItem(1, this.pageNum, this.pageSize);
        }else{
          this.checkAll(this.pageNum, this.pageSize);
        }
      },
      //打开更新编辑框
      returnUpdate(item){
        this.flag = false;
        // console.log(item);
        this.name = item.name;
        this.name2 = item.name;
        this.location = item.location;
        this.description = item.description;
        this.id = item.id;
        this.nameOkSign = false;
        this.nameRemoveSign = false;
      },
      //打开添加编辑框
      returnAdd(){
        this.flag = true;
        //清空数据
        this.name = '';
        this.location = '';
        this.description = '';
      },

      //查找信息
      findItem(type, pageNum, pageSize){//type: 0 -- 由 find 查找分页，1 -- 更新，换页
        let data = '';
        if(type === 0){
          this.checkName = this.checkName.trim();
          if(this.checkName === '' || this.checkName === null || this.checkName ===  undefined ){
            this.tipAlert('请输入要查找的信息', 0);
            return;
          }
          data = {name: this.checkName, pageNum: 1, pageSize: 5};
        }else{
          data = {name: this.checkName2, pageNum: pageNum, pageSize: pageSize};
        }

        const url = 'api/warehouse/find';
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101' || response.data.code === '102'){
              if(response.data.extend === null){
                this.tipAlert('暂无数据', 1);
                this.page = '';
                return;
              }
              this.isCheckName = true;
              if(type === 0){
                this.checkName2 = this.checkName;
              }
              this.page = response.data.extend;
              this.pageData();
            }

          }
        );
      },
      //查询所有
      async checkAll(pageNum, pageSize){
        const url = 'api/warehouse/getAllPage';
        const data = {pageNum: pageNum, pageSize: pageSize};
        await axios.get(url,{params: data}).then(
          response => {
            if(response.data.code === '101' || response.data.code === '102'){
              if(response.data.extend === null){
                this.tipAlert('暂无数据', 1);
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
              this.isCheckName = false;
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

      //添加品牌
      async itemAdd(e){
        if (this.name.trim() === "" || this.name === null || this.name === undefined) {
          this.addNameTip('name不能为空');
          return;
        }

        this.isLoad = true;
        $(e.target).attr("disabled", "disabled");
        // $("#brand-modal-add-btn").attr("disabled", "disabled");
        const url = 'api/warehouse/add';
        let data = { name: this.name, location: this.location, description: this.description };
        await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === '101') {
              // alert('成功处理');
              this.tipAlert('成功添加',1);
            }else if(response.data.code === '102'){
              this.addNameTip('该仓库已经存在');
            }
          }
        );
        this.isLoad = false;
        $(e.target).removeAttr("disabled");
        // $("#brand-modal-add-btn").removeAttr("disabled");
      },

      //name输入检查是否已经存在
      nameChange(e){
        //清空设置
        this.nameOkSign = false;
        this.nameRemoveSign = false;
        // $("#warehouse-name-input").removeClass("remove-sign");
        $(e.currentTarget).removeClass("remove-sign");

        //brandName 为空
        if(this.name.trim() === '' || this.name === null || this.name === undefined){
          return;
        }

        if(this.flag){//true 为添加横态框，false 为更新横态框
          this.checkNameFun();
        }else{//更新
          if(this.name.trim() !== this.name2){
            //检查
            this.checkNameFun();
          }
        }
      },
      //检查name是否重复
      checkNameFun(){
        const url = 'api/warehouse/nameCheck';
        const data = { name: this.name.trim() };
        axios.post(url, qs.stringify(data)).then(
          response => {
            console.log(response.data);
            if (response.data.code === "101" && response.data.extend === "0") {//无该品牌记录
              this.nameOkSign = true;
            }else if(response.data.code === "101" && response.data.extend === "1"){//已经存在该品牌
              this.addNameTip('该仓库已经存在');
            }
          }
        )
      },
      //提示框
      tipAlert(tipStr, type){//type: 0 -- 错误，1 -- 成功处理
        if (type === 0) {
          this.tipAlertShow = true;
        }else{
          this.tipAlertShowOk = true;
        }

        this.tipMessage = tipStr;
        setTimeout(this.closeAlert, 2000);
      },

      //关闭错误提示框
      closeAlert(){
        this.tipAlertShow = false;
        this.tipAlertShowOk = false;
      },
      //显示添加品牌时品牌名的错误信息
      addNameTip(tipStr){
        this.nameOkSign = false;
        this.nameRemoveSign = true;
        $("#warehouse-name-input").addClass("remove-sign");
        this.nameRemoveSignTip = tipStr;
      },
    },
    computed:{
      ...mapState(['cityList'])
    },
  }
</script>

<style>
  .my-modal-content-div{
    width: 900px;
    background-color: #fff;
    margin: 50px auto;
    /*height: 500px;*/
    /*position: absolute;*/

  }
  .warehouse-manager-content{
    margin-top: 20px;
    margin-left: 10px;
  }
  .warehouse-manager-list{
    padding-right: 20px;
  }
  .warehouse-manager-list td{
    font-size: 14px;
  }
  .warehouse-manager-list .table{
    /*width: auto;*/
    /*display: inline-block;*/
    border-top: 2px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top: 5px;
  }
  .warehouse-manager-list .td-1-sort,
  .warehouse-manager-list .td-2-checkbox{
    width: 70px;
  }
  .warehouse-manager-head-btn-group .form-inline{
    margin-left: 290px;
    /*float: right;*/

  }
  .down-list-nav-item a{
    display: block;
    color: #31708f;
    font-size: 12px;
    text-decoration: none;
  }
  .down-list-nav-item a:hover{
    background-color: #dff0d8;
    color: #60AD94;
    border-radius: 50%;
    font-weight: bold;
  }

</style>

