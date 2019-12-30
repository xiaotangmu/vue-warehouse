<template>
  <div class="login_bg_div clearfix">
    <div class="login_main_div">
      <div class="login_left">
        <div class="login_left_on">
          <img id="login_left_img1" src="./../assets/img/description02.png" width="450px" />
          <img id="login_left_img2" src="./../assets/img/description01.png" width="450px" />
        </div>
      </div>
      <div class="login_right">
        <div class="login_right_main">
          <div class="login_right_main_input">
            <span id="login_username_span" class="glyphicon glyphicon-user" aria-hidden="true" ></span>
            <input id="login_username" type="text" placeholder="Username" data-toggle="popover" data-placement="bottom"  data-content="内容不能为空" data-trigger="manual"/>
          </div>
          <div class="login_right_main_input">
            <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
            <input id="login_pwd" type="password" placeholder="Password" data-toggle="popover" data-placement="bottom"  data-content="密码不能为空" data-trigger="manual"/>
            <span id="pwd_eye" class="glyphicon glyphicon-eye-close" aria-hidden="true" ></span>
          </div>
          <div class="login_right_main_slide">
            <div id="wrapper">
              <div id="drag">
                <div class="drag_bg"></div>
                <div class="drag_text slidetounlock" onselectstart="return false;" unselectable="on">
                  <span>请按住滑块，拖动到最右边</span>
                </div>
                <div class="handler handler_bg">
                      <span class="glyphicon glyphicon-hand-right " aria-hidden="true"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="login_right_main_btn_div">
            <div type="button" class="login_right_main_btn">登录</div>
          </div>
          <div class="login_right_main_others">
            <a class="span_register" href="register" @click.prevent="changeRoute()">注册</a>
            <span class="span_forget_pwd">忘记密码</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import './../assets/js/drag.js'
  import './../assets/js/login.js'

  export default {
    name: 'Login',
    methods:{
      changeRoute(){
        PubSub.publish('changeRoute', 'register')
      }
    },
    mounted(){
      $(".login_right_main_input input").focus(function(){
        $(this).parent(".login_right_main_input").css("box-shadow", "0px 7px 7px -7px #60AD94");
        $(this).parent(".login_right_main_input").find("span").eq(0).css("color", "#60AD94");
        $(this).parent(".login_right_main_input").css("border-bottom", "2px solid #60AD94");
        $(this).popover('hide');
      });
      $(".login_right_main_input input").blur(function(){
        $(this).parent(".login_right_main_input").css("box-shadow", "");
        $(this).parent(".login_right_main_input").find("span").eq(0).css("color", "");
        $(this).parent(".login_right_main_input").css("border-bottom", "");
        notBlank(this);
      });

//用户名格式：由字母、数字和字符. ! _ - ?组成的6-18位字符串 -- /^[a-zA-Z0-9.!?_-]{6,18}$/ -- /^[\w.!?_-]{6,18}$/
      $("#login_username").change(function(){
        if (!notBlank(this)) {
          return false;
        }
        user_name_validate();
      });
      $("#login_pwd").change(function(){
        if (!notBlank(this)) {
          return false;
        }
        pwd_validate();
      });
//用户名格式验证
      function user_name_validate(){
        var validate_format = /^[\w.!?_-]{6,18}$/;
        var tip_data = "用户名是由字母、数字和字符. ! _ - ?组成的6-18位字符串";
        return validate($("#login_username"), validate_format, tip_data);
      }
//密码格式验证
      function pwd_validate(){
        var validate_format = /^[\w.!?_-]{6,18}$/;
        var tip_data = "用户名是由字母、数字和字符. ! _ - ?组成的6-18位字符串";
        return validate($("#login_pwd"), validate_format, tip_data);
      }
//格式验证看注册的验证代码
//格式验证
      function validate(event, format, tip){
        if (!format.test($(event).val())) {
          $(event).attr("data-content", tip);
          $(event).popover('show');
          return false;
        }
        return true;
      }
//非空验证
      function notBlank(event){
        if($(event).val() === null || $(event).val() === ""){
          $(event).attr("data-content", "内容不能为空");
          $(event).popover('show');
          return false;
        }
        return true;//不为空
      }

      $("#pwd_eye").click(function(){
        if($("#login_pwd").attr("type") === "password"){
          $("#login_pwd").attr("type", "text");
          $(this).removeClass("glyphicon-eye-close");
          $(this).addClass("glyphicon-eye-open");
        }else{
          $("#login_pwd").attr("type", "password");
          $(this).removeClass("glyphicon-eye-open");
          $(this).addClass("glyphicon-eye-close");
        }
      });
      $('#drag').drag();
    }
  };

</script>

<style>
  /*@import "./../assets/css/reset-min.css";*/
  /*@import "./../assets/css/drag.css";*/
  /*@import "./../assets/css/login.css";*/
</style>
