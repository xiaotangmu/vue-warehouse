<template>
  <div class="div_register clearfix">
    <div class="register_logo">
      <div class="register_title" @click="changeRoute()"><span class="glyphicon glyphicon-grain"></span>仓库</div>
      <div class="register_welcome">欢迎注册</div>
      <div class="register_return"><span>已有账号？</span> <a href="login">去登录 <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></a></div>
    </div>
    <div class="register_main form-horizontal">
      <div class="register_main_input">
        <span for="register_username" class="col-sm-2 control-label">用户名</span>
        <input id="register_username" class="form-control" name="userName" type="text" placeholder="Username"/>
        <span class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">内容不能为空</span>
      </div>
      <div class="register_main_input">
        <span for="register_email" class="col-sm-2 control-label">邮箱</span>
        <input id="register_email" class="form-control" name="email" type="text" placeholder="Email"/>
        <span class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">内容不能为空</span>
      </div>
      <div class="register_main_input">
        <span for="register_pwd1" class="col-sm-2 control-label">密码</span>
        <input id="register_pwd1" class="form-control" name="password1" type="password" placeholder="Password"/>
        <span class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">内容不能为空</span>
      </div>
      <div class="register_main_input">
        <span for="register_pwd2" class="col-sm-2 control-label">确认密码</span>
        <input id="register_pwd2" class="form-control" name="password2" type="password" placeholder="Password"/>
        <span class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">内容不能为空</span>
      </div>
      <div class="register_main_input">
        <div class="register_btn btn" role="button">注册</div>
      </div>
    </div>
  </div>
</template>
<script>
  import './../assets/js/register.js';
  export default {
    name: 'Register',
    methods:{
      changeRoute(){
        PubSub.publish('changeRoute', 'mainBox')
      }
    }
  };
</script>

<style>
  .register_logo{
    height: 100px;
    box-shadow: 0px 7px 10px -7px #aaa;
    position: relative;
    margin-bottom: 80px;
  }
  .register_title{
    height: 100%;
    padding-top: 23px;
    margin-left: 200px;
    font: 40px 'STHeiti';
    color: #60AD94;
    float: left;
  }
  .register_welcome{
    height: 100%;
    padding: 36px 0 0 20px;
    font: 26px 'STHeiti';
    float: left;
  }
  .register_return{
    float: right;
    padding-top: 41px;
    margin-right: 200px;
    color: #aaa;
    /*background-color: #f2dede;*/
    font: 18px 'STHeiti';
  }
  .register_return a{
    color: #60AD94;
  }
  .register_return a:hover{
    text-decoration: none;
    color: #39C698;
  }
  .register_main{
    /*background-color: #f2dede;*/
    width: 800px;
    /*height: 700px;*/
    margin: 0 auto;
    font-size: 18px;
  }
  .register_main input{
    width: 450px;
    /*display: inline-block;*/
    /*padding: 5px 10px;*/
    /*border: none;*/
    /*font-size: 18px;*/
    /*border-bottom: 2px solid #aaa;*/
  }
  .register_input_tip{
    width: 80px;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
  }
  .register_main_input{
    /*width: 600px;*/
    /*background-color: #5cb85c;*/
    margin: 50px auto;
    padding-left: 80px;
    position: relative;
  }
  .register_span_float_right{
    /*display: block;*/
    /*float: right;*/
    position: absolute;
    top: 10px;
    left: 655px;
  }
  .register_span_tip_format{
    font-size: 14px;
    position: absolute;
    left: 210px;
  }
  .register_btn{
    display: block;
    margin: 60px 120px;
    width: 450px;
    font-size: 22px;
    color: #fff;
    background-color: #60AD94;
  }
  .register_btn:hover{
    color: #fff;
    background-color: #79CBB2;
  }
  .register_span_float_right,
  .register_span_tip_format{
    display: none;
  }
  .register_span_float_right{
    color: #60AD94;
    /*background-color: #79CBB2;*/
  }
  .register_span_tip_format{
    color: #A94442;
  }
</style>
