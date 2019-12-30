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
    },
    mounted(){
      $(function(){
        $("#register_username").change(function(){
          usernameValidate(this);
        });
        $("#register_pwd1").change(function(){
          usernameValidate(this);
          $("#register_pwd1").next().hide();
        });
        $("#register_pwd2").change(function(){
          if (usernameValidate(this)) {
            //验证两次密码是否相等
            isEqualPwdTwice();
          }
        });
        $("#register_email").change(function(){
          emailValidate(this);
        });

        //邮箱格式验证
        function emailValidate(element){
          var format = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
          var tip = "请输入正确邮箱";
          return formatDoing($(element), format, tip);
        }

        //验证两次密码是否相等
        function isEqualPwdTwice(){
          if (!($("#register_pwd2").val() === $("#register_pwd1").val())) {
            $("#register_pwd2").next().hide();
            $("#register_pwd1").next().hide();
            $("#register_pwd2").parent(".register_main_input").addClass("has-error");
            $("#register_pwd2").parent(".register_main_input").addClass("has-error");
            $("#register_pwd2").parent(".register_main_input").find("span").eq(2).text("两次密码输入不相等").show();
            return false;
          }
          $("#register_pwd1").next().show();
          return true;
        }

        function usernameValidate(element) {
          var validate_format = /^[\w.!?_-]{6,18}$/;
          var tip_data = "数据是由字母、数字和字符. ! _ - ?组成的6-18位字符串";
          return formatDoing(element, validate_format, tip_data);
        }
        //格式统一处理
        function formatDoing(element, format, tip){
          $(element).next().hide();
          $(element).parent(".register_main_input").removeClass("has-error");
          if (!notBlank2(element)) {
            $(element).parent(".register_main_input").find("span").eq(2).text("内容不能为空").show();
//                $(element).next(".register_span_tip_format").text("内容不能为空").show();//用next获取不到数据
            $(element).parent(".register_main_input").addClass("has-error");
            return false;
          }
          if (!validate2(element, format)) {
            $(element).parent(".register_main_input").find("span").eq(2).text(tip).show();
//                $(element).next(".register_span_tip_format").val(tip).show();
            $(element).parent(".register_main_input").addClass("has-error");
            return false;
          }
          //验证成功
//            $(element).next(".register_span_tip_format").hide();
          $(element).parent(".register_main_input").find("span").eq(2).hide();
          $(element).next().show();//直接next可以使用
          return true;
        }
        //格式检查
        function validate2(element, format){//元素，格式
          return format.test($(element).val());
        }
        //非空检查 -- 与login与的提示框不同
        function notBlank2(element){
          return !($(element).val() === null || $(element).val() === ""); //后面统一处理，以便后面复用
        }
      });
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
