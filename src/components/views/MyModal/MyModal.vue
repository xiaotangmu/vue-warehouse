<template>
  <div>
    <!-- Modal -->
    <div id="spu-help-modal" class="my-modal" style="display: none">
      <div class="my-modal-content-div thumbnail" style="display: none">
        <div class="my-modal-title">
          <span>主题</span>
          <span class="my-modal-remove glyphicon glyphicon-remove"></span>
        </div>
        <div class="my-modal-content myScrollBox">
          <!-- 居中表单 -->
          <div class="my-modal-form">

            <div class="my-modal-group">
              <div class="my-modal-group-title">品牌描述</div>
              <div class="my-modal-group-main">
                <textarea class="form-control my-modal-group-textarea" placeholder="hello" rows="4"></textarea>
              </div>
            </div>

            <div class="my-modal-group">
              <div class="my-modal-group-title">商品属性</div>
              <div class="my-modal-group-main">
                <input class="form-control" type="text" placeholder="重量"/>
                <div class="my-modal-group-btn"> 样式没好
                  <span class="btn btn-primary"></span>
                  <span class="btn btn-danger"></span>
                </div>
                <!-- 提交按钮 -->
                <div class="my-modal-form-submit form-control btn btn-info">更新</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- mainbox title -->
    <div class="main-box-view-title">
      <span class="main-box-view-title-name">商品属性管理 <span class="glyphicon glyphicon-question-sign"></span></span>
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
      <div v-if="tipAlertShowWarn" class="alert alert-warning tip-alert" role="alert">
        <!--<span class="glyphicon glyphicon-remove-circle tip-alert-img" aria-hidden="true"></span>-->
        <span class="tip-alert-message">
            <strong>{{tipMessage}}</strong>
          </span>
      </div>
    </transition>

    <!-- 加载中... -->
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


</template>

<script>
    export default {
      data(){
        return{
          tipMessage: 'hello',
          tipAlertShow: false,
          tipAlertShowOk: false,
          isLoad: false,
        }
      },
      mounted(){
        $('.span-spu-help').click(function(){
          // $('#myModal').show();
          $('#spu-help-modal').show();
          $('#spu-help-modal .my-modal-content-div').show('slow');
        });
        $('#spu-help-modal .my-modal-remove').click(function(){
          $('#spu-help-modal').hide();
          $('#spu-help-modal .my-modal-content-div').hide();
        });

        //横态框下拉列表
        $('.my-modal-group-main-down').click(function(){
          $(this).next().trigger('focus');
        });
      },
      methods:{
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
        //添加品牌
        async itemAdd(e){
          if (this.name.trim() === "" || this.name === null || this.name === undefined) {
            this.addNameTip('name不能为空');
            return;
          }

          this.isLoad = true;
          $(e.target).attr("disabled", "disabled");
          // $("#brand-modal-add-btn").attr("disabled", "disabled");
          const url = 'api/client/add';
          let data = { name: this.name, city: this.city, contact: this.contact, address: this.address, postcode: this.postcode,email: this.email, phone: this.phone };
          await axios.post(url, qs.stringify(data)).then(
            response => {
              console.log(response.data);
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
      }
    }
</script>

<style>
  .main-box-view-title{
    font-size: 18px;
    color: #1C5F95;
    padding: 10px 290px;
    border-bottom: 1px solid #f5f5f5;
    /*line-height: 38px;*/
  }
</style>
