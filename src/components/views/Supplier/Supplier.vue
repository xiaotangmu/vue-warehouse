<template>
    <div class="supplier-manager-div">
      <div class="main-box-view-title">
        <span class="main-box-view-title-name">供应商管理 <span class="glyphicon glyphicon-question-sign"></span></span>
      </div>

      <div class="supplier-manager-content-div">
        <div class="supplier-manager-content">

          <div class="supplier-manager-head-btn-group">
            <span class="btn btn-success" @click="checkAll(1, 5)">查看所有</span>
            <span @click="returnAdd()" class="btn btn-info supplier-add-btn">添加供应商</span>
            <span @click="deleteBatch()" class="btn btn-danger">删除已选</span>
            <span class="form-inline">
              <input v-model="checkName" class=" form-control" type="text" placeholder="美宜佳"/>
              <span @click="findItem(0,'','')" class="btn btn-warning"><span class="glyphicon glyphicon-search" >查找</span></span>
            </span>
          </div>
          <div class="supplier-manager-list">
            <div class="">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th class="td-1-sort">#</th>
                  <th class="td-2-checkbox"><span @click="checkBoxChooseAll($event)" isCheck="" class="supplierCheckAll checkbox-choose"></span></th>
                  <th class="td-3-name1">供应商</th>
                  <th class="td-3-name2">联系人</th>
                  <th class="td-4-phone">电话</th>
                  <th class="td-5-city">城市</th>
                  <th class="td-6-address">地址</th>
                  <th class="td-7-postcode">邮编</th>
                  <th class="td-8-email">邮箱</th>
                  <th class="td-6-btn">操作</th>
                </tr>
                </thead>
                <tbody v-show="page !== null && page !== undefined && page !== ''">
                <tr v-for="(item, index) in page.list" :key="index">
                  <td>{{(pageNum-1)*pageSize+index + 1}}</td>
                  <td><span :itemId="item.id" :itemName="item.name" isChoose="false" @click="checkBoxChoose($event)" class="supplierCheckbox checkbox-choose"></span></td>
                  <td>{{item.name}}</td>
                  <td>{{item.contact}}</td>
                  <td>{{item.phone}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.address}}</td>
                  <td>{{item.postcode}}</td>
                  <td>{{item.email}}</td>
                  <td>
                    <span @click="returnUpdate(item)" class="btn btn-primary supplier-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                    <span @click="deleteItem(item, '', '')" class="btn btn-danger supplier-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
                  </td>
                </tr>


                </tbody>
              </table>
            </div>
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
      <div id="supplier-item-edit-modal" class="my-modal" style="display: none">
        <div class="my-modal-content-div thumbnail" style="display: none">
          <div class="my-modal-title">
            <span class="my-modal-group-edit">供应商信息修改</span>
            <span class="my-modal-group-add">供应商添加</span>
            <span class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content myScrollBox">
            <!-- 居中表单 -->
            <div class="my-modal-form">
              <div class="my-modal-group">
                <div class="my-modal-group-title">供应商</div>
                <div class="my-modal-group-main">
                  <input :disabled="!flag" @change="nameChange($event)" id="supplier-name-input" class="form-control" type="text" placeholder="美宜佳" v-model="name"/>
                  <span v-show="nameOkSign" class="glyphicon glyphicon-ok-sign ok-sign brand-name-ok-sign" aria-hidden="true"></span>
                  <span v-show="nameRemoveSign" class="brand-name-remove-sign remove-sign">
                    <span class="glyphicon glyphicon-remove-sign " aria-hidden="true"></span>
                    <span v-text="nameRemoveSignTip"></span>
                  </span>
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">联系人</div>
                <div class="my-modal-group-main">
                  <input v-model="contact" class="form-control" type="text" placeholder="吴好缇"/>
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">电话</div>
                <div class="my-modal-group-main">
                  <input v-model="phone" class="form-control" type="text" placeholder="14975567870"/>
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">城市</div>
                <div class="my-modal-group-main my-modal-group-main-down-div">
                  <el-select filterable clearable v-model="city" placeholder="请选择" style="width: 500px">
                    <el-option-group
                      v-for="group in cityList"
                      :key="group.initialLetter"
                      :label="group.initialLetter">
                      <el-option
                        v-for="item in group.cities"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">地址</div>
                <div class="my-modal-group-main">
                  <input v-model="address" class="form-control" type="text" placeholder="广东省深圳市宝安区石岩街麻布新村奋达科技园"/>
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">邮编</div>
                <div class="my-modal-group-main">
                  <input v-model="postcode" class="form-control" type="text" placeholder="513000"/>
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">邮箱</div>
                <div class="my-modal-group-main">
                  <input v-model="email" class="form-control" type="text" placeholder="example@126.com"/>
                </div>
              </div>

              <div class="my-modal-group my-modal-group-edit">
                <div class="my-modal-group-main">
                  <div @click="updateItem($event)" id="supplier-modal-update-btn" class="my-modal-form-submit form-control btn btn-info">
                    <span v-show="!isLoad">更新</span>
                    <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                      <div class='loader'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="my-modal-group my-modal-group-add">
                <div class="my-modal-group-main">
                  <!--<div class="my-modal-form-submit form-control btn btn-primary">添加</div>-->
                  <div id="supplier-modal-add-btn" @click="itemAdd($event)" class="my-modal-form-submit form-control btn btn-primary">
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
        description: '',
        contact: '',
        city: '',
        postcode: '',
        email: '',
        phone: '',
        address: '',
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
        $(document).on('click', '.supplier-item-edit-span', function(){
          $('#supplier-item-edit-modal').show();
          $('#supplier-item-edit-modal .my-modal-content-div').show('slow');
          $('#supplier-item-edit-modal .my-modal-group-add').hide();
          $('#supplier-item-edit-modal .my-modal-group-edit').show();
        });
        $('#supplier-item-edit-modal .my-modal-remove').click(function(){
          $('#supplier-item-edit-modal').hide();
          $('#supplier-item-edit-modal .my-modal-content-div').hide();
        });
        //添加横态框
        $(document).on('click','.supplier-add-btn',function(){
          $('#supplier-item-edit-modal').show();
          $('#supplier-item-edit-modal .my-modal-content-div').show('slow');
          $('#supplier-item-edit-modal .my-modal-group-edit').hide();
          $('#supplier-item-edit-modal .my-modal-group-add').show();
        });
        $('#supplier-item-edit-modal .my-modal-remove').click(function(){
          $('#supplier-item-edit-modal').hide();
          $('#supplier-item-edit-modal .my-modal-content-div').hide();
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
          $('.supplierCheckbox').each(function(){
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
            $('.supplierCheckbox').each(function(){
              $(this).addClass('checkbox-choose-full');
              $(this).attr('isCheck', true);
            });
          }else{
            //全不选
            $(e.target).removeClass('checkbox-choose-full');
            $(e.target).attr('isCheck', '');
            $('.supplierCheckbox').each(function(){
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
            let i = $('.supplierCheckbox').length;
            let j = 0;
            $('.supplierCheckbox').each(function(){

              if($(this).attr('isCheck')){
                j++;
              }
            });
            if(i === j){
              $('.supplierCheckAll').addClass('checkbox-choose-full');
              $('.supplierCheckAll').attr('isCheck', true);
            }
          }else{
            $(e.target).removeClass('checkbox-choose-full');
            $(e.target).attr('isCheck', '');
            //去掉全选
            $('.supplierCheckAll').removeClass('checkbox-choose-full');
            $('.supplierCheckAll').attr('isCheck', '');
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
          }else{//批量删除
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
          const url = 'api/supplier/delete';
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
          this.isLoad = true;
          $(e.target).attr("disabled",'disabled');

          const data = {id: this.id, name: this.name, contact: this.contact, city: this.city, address: this.address, phone: this.phone, postcode: this.postcode, email: this.email}
          const url = 'api/supplier/update';

          axios.post(url,qs.stringify(data)).then(response => {
            if(response.data.code === '101'){
              this.tipAlert('成功更新', 1);
              //关闭横态框，并更新数据
              $('#supplier-item-edit-modal').hide();
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
          this.city = item.city;
          this.address = item.address;
          this.phone = item.phone;
          this.contact = item.contact;
          this.postcode = item.postcode;
          this.email = item.email;
          this.id = item.id;
          this.nameOkSign = false;
          this.nameRemoveSign = false;
        },
        //打开添加编辑框
        returnAdd(){
          this.flag = true;
          //清空数据
          this.name = '';
          this.city = '';
          this.contact = '';
          this.phone = '';
          this.address = '';
          this.postcode = '';
          this.email = '';
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

          const url = 'api/supplier/find';
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
          const url = 'api/supplier/getAllPage';
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
          const url = 'api/supplier/add';
          let data = { name: this.name, city: this.city, contact: this.contact, address: this.address, postcode: this.postcode,email: this.email, phone: this.phone };
          await axios.post(url, qs.stringify(data)).then(
            response => {
              console.log(response.data)
              if (response.data.code === '101') {
                // alert('成功处理');
                this.tipAlert('成功添加',1);
              }else if(response.data.code === '102'){
                this.addNameTip('该品牌已经存在');
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
          // $("#supplier-name-input").removeClass("remove-sign");
          $(e.currentTarget).removeClass("remove-sign");

          //brandName 为空
          if(this.name.trim() === '' || this.name === null || this.name === undefined){
            return;
          }

          if(this.flag){//true 为添加横态框，false 为更新横态框
            const url = 'api/supplier/nameCheck';
            const data = { name: this.name.trim() };
            axios.post(url, qs.stringify(data)).then(
              response => {
                console.log(response.data);
                if (response.data.code === "101" && response.data.extend === "0") {//无该品牌记录
                  this.nameOkSign = true;
                }else if(response.data.code === "101" && response.data.extend === "1"){//已经存在该品牌
                  this.addNameTip('该供应商已经存在');
                }
              }
            )
          }
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
          $("#supplier-name-input").addClass("remove-sign");
          this.nameRemoveSignTip = tipStr;
        },

        //加载下拉城市数据
        cityOnload(){
          this.isShowCityByLetter = true;
          $('.my-modal-group-main-down-item-div').toggle();
        },
        cityHidden(){
          $('.my-modal-group-main-down-item-div').hide();
        },
        cityChoose(name){
          // $('.down-list-item-input').val(name);
          this.city = name;
          this.cityHidden();
        },
        //模糊查询城市
        cityLike(){
          const name = $('.down-list-item-input').val();
          console.log(name);
          if(name.trim() === '' || name.trim() === null || name.trim() === undefined){
            this.isShowCityByLetter = true;
            return false;
          }
          this.arr = [];
          this.cityList.forEach(item => {
            item.cities.forEach(item2 => {
              if(item2.name.includes(name)){
                this.arr.push(item2.name);
              }
            })
          });
          this.isShowCityByLetter = false;
          // console.log(this.arr)
        }
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
  .supplier-manager-content{
    margin-top: 20px;
    margin-left: 10px;
  }
  .supplier-manager-list td{
    font-size: 14px;
  }
  .supplier-manager-list .table{
    width: auto;
    display: inline-block;
    border-top: 2px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top: 5px;
  }
  .supplier-manager-list .td-1-sort,
  .supplier-manager-list .td-2-checkbox{
    width: 70px;
  }
  .supplier-manager-list .td-3-name1{
    /*background-color: #6CB7A0;*/
    width: 200px;
  }
  .supplier-manager-list .td-3-name2{
    /*background-color: #e5e5e5;*/
    width: 110px;
  }
  .supplier-manager-list .td-4-phone{
    /*background-color: red;*/
    width: 120px;
  }
  .supplier-manager-list .td-5-city{
    /*background-color: #dff0d8;*/
    width: 100px;
  }
  .supplier-manager-list .td-6-address{
    /*background-color: #dff0d8;*/
    width: 300px;
  }
  .supplier-manager-list .td-7-postcode{
    /*background-color: #dff0d8;*/
    width: 80px;
  }
  .supplier-manager-list .td-8-email{
    /*background-color: #dff0d8;*/
    width: 170px;
  }
  .supplier-manager-list .td-6-btn{
    /*background-color: #dff0d8;*/
    width: 140px;
  }
  .supplier-manager-head-btn-group .form-inline{
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
