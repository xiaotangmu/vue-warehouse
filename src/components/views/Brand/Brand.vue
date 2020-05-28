<template>
    <div class="brand-manager-div">
      <div class="main-box-view-title">
        <span class="main-box-view-title-name">品牌管理 <span class="glyphicon glyphicon-question-sign"></span></span>
      </div>

      <div class="brand-manager-content-div">
        <div class="brand-manager-content">

          <div class="brand-manager-head-btn-group">
            <span class="btn btn-success" @click="checkAll(1, 5)">查看所有</span>
            <span class="btn btn-info brand-add-btn" @click="returnAdd()">添加品牌</span>
            <span @click="deleteBatch()" class="btn btn-danger">删除已选</span>
            <span class="form-inline">
              <input v-model="checkName" class=" form-control" type="text" placeholder="美宜佳"/>
              <span @click="findItem(0,'','')" class="btn btn-warning"><span class="glyphicon glyphicon-search" >查找</span></span>
            </span>
          </div>

          <div class="brand-manager-list" >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th class="td-1-sort">#</th>
                    <th class="td-2-checkbox"><span @click="checkBoxChooseAll($event)" isCheck="" class="brandCheckAll checkbox-choose"></span></th>
                    <th>品牌</th>
                    <th>Logo</th>
                    <th>描述</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody v-show="page !== null && page !== undefined && page !== ''">
                  <tr v-for="(brand, index) in page.list" :key="index">
                    <td>{{(pageNum-1)*pageSize+index + 1}}</td>
                    <td><span :brandId="brand.id" :brandName="brand.name" isChoose="false" @click="checkBoxChoose($event)" class="brandCheckbox checkbox-choose"></span></td>
                    <td>{{brand.name}}</td>
                    <td>
                    <img class="logo_img" :src="brand.logo" />
                    </td>
                    <td>{{brand.description}}</td>
                    <td>
                    <span @click="returnUpdate(brand)" class="btn btn-primary brand-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                    <span @click="deleteItem(brand, '', '')" class="btn btn-danger brand-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
                    </td>
                  </tr>


                </tbody>
              </table>
          </div>

        </div>
      </div>

      <!-- 页面数据 -->
      <div style="font-size: 13px;margin-left: 280px" v-show="page !== null && page !== undefined && page !== ''">
        <span style="padding-left: 20px">第 {{page.pageNum}} 页，共 {{page.pages}} 页 | {{page.total}} 条记录</span>
      </div>

      <!-- 页面按钮 -->
      <div v-show="page !== null && page !== undefined && page !== ''" class="brand-page-btn-div">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li v-show="page.pageNum !== 1" @click="isCheckName?findItem(1,1,5):checkAll(1, 5)"><span>首页</span></li>
            <li v-show="page.pageNum !== 1" @click="isCheckName?findItem(1,page.pageNum-1,5):checkAll(page.pageNum-1,5)">
              <!--<span aria-hidden="true">&laquo;</span>-->
              <span aria-hidden="true">上一页</span>
            </li>
            <li @click="isCheckName?findItem(1,num, 5):checkAll(num, 5)" v-for="(num, index) in page.navigatepageNums" :key="index" :class="{ 'active': page.pageNum === num}">
              <span>{{num}}</span>
            </li>
            <li @click="isCheckName?findItem(1,page.pageNum+1,5):checkAll(page.pageNum+1,5)" v-show="page.pageNum*page.pageSize < page.total">
              <!--<span aria-hidden="true">&raquo;</span>-->
              <span aria-hidden="true">下一页</span>
            </li>
            <li @click="isCheckName?findItem(1,page.pages, 5):checkAll(page.pages, 5)" v-show="page.pageNum*page.pageSize < page.total"><span>尾页</span></li>
          </ul>
        </nav>
      </div>


  <!-- modal -->
      <div id="brand-item-edit-modal" class="my-modal" style="display: none">
        <div class="my-modal-content-div thumbnail" style="display: none">
          <div class="my-modal-title">
            <span class="my-modal-group-edit">品牌信息修改</span>
            <span class="my-modal-group-add">品牌添加</span>
            <span class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content myScrollBox">
            <!-- 居中表单 -->
            <div class="my-modal-form">
              <div class="my-modal-group">
                <div class="my-modal-group-title">品牌名称</div>
                <div class="my-modal-group-main">
                  <input :disabled="!flag" @change="brandNameChange()" id="brand-name-input" class="form-control" type="text" placeholder="美宜佳" v-model="brandName"/>
                  <span v-show="brandNameOkSign" class="glyphicon glyphicon-ok-sign ok-sign brand-name-ok-sign" aria-hidden="true"></span>
                  <span v-show="brandNameRemoveSign" class="brand-name-remove-sign remove-sign">
                    <span class="glyphicon glyphicon-remove-sign " aria-hidden="true"></span>
                    <span v-text="brandNameRemoveSignTip"></span>
                  </span>
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">Logo</div>
                <div class="my-modal-group-main">
                  <!--<textarea class="form-control" placeholder="hello"></textarea>-->
                  <div id="brand-logo-progress-div" class="modal-brand-logo-div brand-logo-img thumbnail">
                    <img id="brand-logo2" :src="brandLogoUrl" v-if="brandLogoUrl !== null && brandLogoUrl !== '' && brandLogoUrl !== undefined"/>
                    <img v-else id="brand-logo" src="./../../../assets/img/imgbtn0111.png"/>
                    <img style="display: none" id="brand-logo-hide" src="./../../../assets/img/imgbtn0111.png"/>
                    <div id="brand-logo-progress" class="progress">
                      <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                      </div>
                    </div>
                  </div>
                  <input @change="imgUpload()" id="brand-logo-img-id" type="file" style="display: none">
                </div>
              </div>

              <div class="my-modal-group">
                <div class="my-modal-group-title">品牌描述</div>
                <div class="my-modal-group-main">
                  <textarea v-model="brandDescription" class="form-control my-modal-group-textarea" placeholder="hello" rows="4"></textarea>
                </div>
              </div>



              <div class="my-modal-group my-modal-group-edit">
                <div class="my-modal-group-main">
                  <div @click="updateBrand($event)" id="brand-modal-update-btn" class="my-modal-form-submit form-control btn btn-info">
                    <span v-show="!isLoad">更新</span>
                    <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                      <div class='loader'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="my-modal-group my-modal-group-add">
                <div class="my-modal-group-main">
                  <div id="brand-modal-add-btn" @click="brandAdd()" class="my-modal-form-submit form-control btn btn-primary">
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
  import axios from 'axios';
  import qs from 'qs';
    export default {
      data(){
        return{
          id: '',
          brandName: '',
          brandDescription: '',
          brandLogoUrl: '',
          flag: true,//true 为添加横态框，false 为更新横态框
          brandNameOkSign: false,
          brandNameRemoveSign: false,
          brandNameRemoveSignTip: '该品牌名已经存在',
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

        //编辑横态框
        $(document).on('click', '.brand-item-edit-span', function(){
          $('#brand-item-edit-modal').show();
          $('#brand-item-edit-modal .my-modal-content-div').show('slow');
          $('#brand-item-edit-modal .my-modal-group-add').hide();
          $('#brand-item-edit-modal .my-modal-group-edit').show();
        });

        //添加横态框
        $(document).on('click','.brand-add-btn',function(){
          $('#brand-item-edit-modal').show();
          $('#brand-item-edit-modal .my-modal-content-div').show('slow');
          $('#brand-item-edit-modal .my-modal-group-edit').hide();
          $('#brand-item-edit-modal .my-modal-group-add').show();
        });
        $('#brand-item-edit-modal .my-modal-remove').click(function(){
          $('#brand-item-edit-modal').hide();
          $('#brand-item-edit-modal .my-modal-content-div').hide();
        });

        //logo图片
        $('.brand-logo-img').click(function(){
          $('#brand-logo-img-id').trigger('click');
        });
      },
      methods:{

        //批量删除
        deleteBatch(){
          //遍历得到ids 和 names
          let ids = '';
          let names = '';
          $('.brandCheckbox').each(function(){
            if($(this).attr('isCheck')){//是否已选
              if(ids !== ''){
                ids += '-' + $(this).attr('brandId');
                names += '-' + $(this).attr('brandName');
              }else{
                ids += $(this).attr('brandId');
                names += $(this).attr('brandName');
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
            $('.brandCheckbox').each(function(){
              $(this).addClass('checkbox-choose-full');
              $(this).attr('isCheck', true);
            });
          }else{
            //全不选
            $(e.target).removeClass('checkbox-choose-full');
            $(e.target).attr('isCheck', '');
            $('.brandCheckbox').each(function(){
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
            let i = $('.brandCheckbox').length;
            let j = 0;
            $('.brandCheckbox').each(function(){

              if($(this).attr('isCheck')){
                j++;
              }
            });
            if(i === j){
              $('.brandCheckAll').addClass('checkbox-choose-full');
              $('.brandCheckAll').attr('isCheck', true);
            }
          }else{
            $(e.target).removeClass('checkbox-choose-full');
            $(e.target).attr('isCheck', '');
            //去掉全选
            $('.brandCheckAll').removeClass('checkbox-choose-full');
            $('.brandCheckAll').attr('isCheck', '');
          }
        },

        //删除item
        async deleteItem(item, names, ids){

          if(names === '' || names === null || names === undefined){//为单个删除点击
            names = '' + item.name;
            ids = '' + item.id;
            //提示是否删除数据
            let isDelete = await this.$confirm('是否删除 ' + item.name + ' 品牌信息？', '提示', {
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
            let isDelete = await this.$confirm('是否删除 ' + names + ' 品牌信息？', '提示', {
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
          const url = 'api/brand/delete';
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
        async updateBrand(e){
          this.isLoad = true;
          $(e.target).attr("disabled", 'disabled');

          const data = {id: this.id, name: this.brandName, logo: this.brandLogoUrl, description: this.brandDescription}
          const url = 'api/brand/update';

          await axios.post(url,qs.stringify(data)).then(response => {
            if(response.data.code === '101'){
              this.tipAlert('成功更新', 1);
              //关闭横态框，并更新数据
              $('#brand-item-edit-modal').hide();
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
        returnUpdate(brand){
          this.flag = false;
          // console.log(brand);
          this.brandName = brand.name;
          this.brandLogoUrl = brand.logo;
          // console.log(brand.logo)
          this.brandDescription = brand.description;
          this.id = brand.id;
          this.brandNameOkSign = false;
          this.brandNameRemoveSign = false;
        },
        //打开添加编辑框
        returnAdd(){
          this.flag = true;
          //清空数据
          this.brandName = '';
          this.brandLogoUrl = '';
          this.brandDescription = '';
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

          const url = 'api/brand/findBrand';
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
          const url = 'api/brand/getAllPage';
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
        addBrandNameTip(tipStr){
          this.brandNameOkSign = false;
          this.brandNameRemoveSign = true;
          $("#brand-name-input").addClass("remove-sign");
          this.brandNameRemoveSignTip = tipStr;
        },

        //添加品牌
        async brandAdd(){
          if (this.brandName === "" || this.brandName === null || this.brandName === undefined) {
            this.addBrandNameTip('品牌名不能为空');
            return;
          }

          this.isLoad = true;
          $("#brand-modal-add-btn").attr("disabled", "disabled");
          const url = 'api/brand/add';
          let data = { name: this.brandName, description: this.brandDescription, logo: this.brandLogoUrl };
          console.log("brand: " + qs.stringify(data));
          await axios.get(url, {
            params: data}).then(
            response => {
              if (response.data.code === '101') {
                // alert('成功处理');
                this.tipAlert('成功添加',1);
              }else if(response.data.code === '102'){
                this.addBrandNameTip('该品牌已经存在');
              }
            }
          );
          this.isLoad = false;
          $("#brand-modal-add-btn").removeAttr("disabled");
        },

        //品牌名输入检查是否已经存在
        brandNameChange(){
          //清空设置
          this.brandNameOkSign = false;
          this.brandNameRemoveSign = false;
          $("#brand-name-input").removeClass("remove-sign");

          //brandName 为空
          if(this.brandName === '' || this.brandName === null || this.brandName === undefined){
            return;
          }

          if(this.flag){//true 为添加横态框，false 为更新横态框
            console.log(this.brandName);
            const url = 'api/brand/nameCheck';
            const data = { name: this.brandName };
            axios.post(url, qs.stringify(data)).then(
              response => {
                if (response.data.code === "101" && response.data.extend === "0") {//无该品牌记录
                  this.brandNameOkSign = true;
                }else if(response.data.code === "101" && response.data.extend === "1"){//已经存在该品牌
                  this.addBrandNameTip('该品牌已经存在');
                }
              }
            )
          }else{

          }
        },

        //图片上传 -- file change 触发
        imgUpload(){
          let myform = new FormData();//用来封装要上传的数据
          const file = $("#brand-logo-img-id")[0].files[0];

          myform.append('file', file);
          if(file === null || file === "" || file === undefined){
            // alert("文件为空");
            return;
          }
          //获取文件名
          const fileName = file.name;
          if(fileName != null && fileName.lastIndexOf(".") === -1){//是否包含 .
            this.tipAlert("图片有误，请重新上传");
            return;
          }
//            fileName.lastIndexOf(".");//返回的是位置下标

          const fileType = fileName.substring(fileName.lastIndexOf(".")+1);//截取文件类型

          //几种常见的图片格式
          const imgFileType = ["gif", "jpg", "jpeg", "bmp", "png", "psd"];
          if(imgFileType.indexOf(fileType) === -1){//不包含
            this.tipAlert("请选择图片文件");
            return;
          }
          //判断文件大小
          if (file.size >= 10*1024*1024) {
            // alert("请选择10M以内的图片");
            this.tipAlert("请选择10M以内的图片");
            return;
          }

          //img清除原来数据
          $("#brand-logo").width("");
          $("#brand-logo").height("");
          $("#brand-logo").attr('src', "");

          const src = window.URL.createObjectURL(file); //转成可以在本地预览的格式
          $('#brand-logo-hide').attr('src', src);//需要先给图片 -- 可以是其他div -- 不设置，后面originwidth 。。不准确

          //获取图片相应数据
          const reader = new FileReader();
          reader.onload = function (e) {
            const data = e.target.result;
            //alert(data);//data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWE...... -- base64 文件数据 -- 所以此时上传的文件不能太大
            //加载图片获取图片真实宽度和高度
            const image = new Image();
            image.onload=function(){
              let width = image.width;//获取图片真实宽，单位px
              let height = image.height;//高，px
//                    var size = f.size();//获取图片真实大小，单位 B，字节，（并没有变成base64 数据的大小 -- 大原文件的1/3大小）

              // $("#brand-logo").attr('src', src);
              if(width >= height){
                $("#brand-logo").width("100px");
              }else{
                $("#brand-logo").height("100px");
              }

            };
            image.src= data;
          };
          reader.readAsDataURL(file);

          //进度
          let config = {
            onUploadProgress: progressEvent => {
              let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
              // console.log(complete)
              $("#brand-logo-progress").show();
              $("#brand-logo-progress div:first-child").width(complete);
            }
          };

          //直接提交图片 -- 提升用户体验 -- 点击添加时不需要这么长操作时间
          const url = 'api/brand/fileUpload'
          axios.post(url, myform, config).then(
            response => {
              if(response.data.code === '101' || response.data.code === '102'){

                $("#brand-logo-progress").hide();
                $("#brand-logo").attr('src',response.data.extend);
                this.brandLogoUrl = response.data.extend;
                $("#brand-logo-progress div:first-child").width(0);
              }

            },
            error => {
              $("#brand-logo-progress").hide();
              // alert("出错了，请重新选择图片");
              this.tipAlert("出错了，请重新选择图片");

            }
          )
        }
      }
    }
</script>

<style>

  #brand-logo-progress-div{
    position: relative;
  }
  #brand-logo-progress{
    height: 10px;
    width: 100%;
    position: absolute;
    top: 45px;
    left: 0;
    display: none;
  }
  .my-modal-content-div{
    width: 900px;
    background-color: #fff;
    margin: 50px auto;
    /*height: 500px;*/
    /*position: absolute;*/

  }
  .brand-manager-list .table{
    /*width: auto;*/
    /*display: inline-block;*/
    border-top: 2px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .logo_img{
    width: 70px;
  }
  .brand-manager-list .td-1-sort,
  .brand-manager-list .td-2-checkbox{
    /*background-color: red;*/
    width: 70px;
  }
  /*.brand-manager-list .td-3-text{*/
    /*!*background-color: #6CB7A0;*!*/
    /*width: 200px;*/
  /*}*/
  /*.brand-manager-list .td-4-img{*/
    /*!*background-color: #e5e5e5;*!*/
    /*width: 200px;*/
  /*}*/
  /*.brand-manager-list .td-5-textarea{*/
    /*!*background-color: red;*!*/
    /*width: 300px;*/
  /*}*/
  /*.brand-manager-list .td-6-btn{*/
    /*!*background-color: #dff0d8;*!*/
    /*width: 200px;*/
  /*}*/
  .brand-manager-content{
    margin-top: 20px;
    margin-left: 20px;
    padding-right: 20px;
  }
  .brand-manager-head-btn-group{
    margin-bottom: 10px;
    /*border-bottom: 1px solid #f5f5f5;*/
  }
  .brand-manager-head-btn-group .form-inline{
    margin-left: 270px;
    /*float: right;*/
  }
  .modal-brand-logo-div{
    width: 100px;
    height: 100px;
  }
  .brand-page-btn-div{
    /*background-color: #dff0d8;*/
    /*display: inline-block;*/
    margin: 0 auto;
    text-align: center;
  }
  .brand-page-btn-div nav{
    padding-right: 80px;
  }
  .brand-name-ok-sign{
    position: absolute;
    right: 170px;
    top: 12px;
    font-size: 13px;
  }
  .brand-name-remove-sign{
    position: absolute;
    right: 62px;
    top: 10px;
    font-size: 13px;
    /*display: none;*/
  }

</style>
