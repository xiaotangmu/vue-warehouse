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
    }
  };
</script>

<style>
  /*@import "./../assets/css/reset-min.css";*/
  /*@import "./../assets/css/drag.css";*/
  /*@import "./../assets/css/login.css";*/
</style>
