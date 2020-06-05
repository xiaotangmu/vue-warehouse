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
            <input @change="nameChange()" v-model="name" id="login_username" type="text" placeholder="Username" data-toggle="popover" data-placement="bottom"  data-content="内容不能为空" data-trigger="manual"/>
          </div>
          <div class="login_right_main_input">
            <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
            <input @change="passwordChange()" v-model="password" id="login_pwd" type="password" placeholder="Password" data-toggle="popover" data-placement="bottom"  data-content="密码不能为空" data-trigger="manual"/>
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
                  <span class="count_down_span_parent" style="display: none"><span class="count_down_span">60</span>s</span>
                </div>
              </div>
            </div>
          </div>
          <div class="login_right_main_btn_div">
            <button @click.prevent="login" id="login_btn_id" class="login_right_main_btn" role="button" style="height: 40px; width: 100%;border: none;">
              <i class="el-icon-loading" v-if="isLoad"></i>
              <span v-else>登录</span>
            </button>
          </div>
          <div class="login_right_main_others">
            <a class="span_register" href="register" @click.prevent="openRegister()">注册</a>
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
  import axios from 'axios';
  import qs from 'qs';
  import {mapState} from 'vuex';
  import storageUtils from '../components/utils/storageUtils';

  export default {
    name: 'Login',
    data(){
      return{
        validateCode: '',
        isLoad: false,
        name: '',
        password: '',
        interval: '',
      }
    },
    mounted(){


      let that = this;

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
        // notBlank(this);
      });

//用户名格式：由字母、数字和字符. ! _ - ?组成的6-18位字符串 -- /^[a-zA-Z0-9.!?_-]{6,18}$/ -- /^[\w.!?_-]{6,18}$/
//       $("#login_username").change(function(){
//         if (!notBlank(this)) {
//           return false;
//         }
//         user_name_validate();
//       });
//       $("#login_pwd").change(function(){
//         if (!notBlank(this)) {
//           return false;
//         }
//         pwd_validate();
//       });
      //用户名格式验证
      // function user_name_validate(){
      //   var validate_format = /^[\w.!?_-]{6,18}$/;
      //   var tip_data = "请输入正确用户名";
      //   return validate($("#login_username"), validate_format, tip_data);
      // }
      //密码格式验证
      // function pwd_validate(){
      //   var validate_format = /^[\w.!?_-]{6,18}$/;
      //   var tip_data = "请输入正确密码";
      //   return validate($("#login_pwd"), validate_format, tip_data);
      // }
      //格式验证看注册的验证代码
      //格式验证
      // function validate(event, format, tip){
      //   if (!format.test($(event).val())) {
      //     $(event).attr("data-content", tip);
      //     $(event).popover('show');
      //     return false;
      //   }
      //   return true;
      // }
      //非空验证
      // function notBlank(event){
      //   if($(event).val() === null || $(event).val() === ""){
      //     $(event).attr("data-content", "内容不能为空");
      //     $(event).popover('show');
      //     return false;
      //   }
      //   return true;//不为空
      // }

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
      // $('#drag').drag();

      var x = 0;
      var isMove = false;
      var maxWidth = $('#drag').width() - $('#drag').find('.drag_bg').width() - $('#drag .handler').width();  //能滑动的最大间距

      //鼠标按下时候的x轴的位置
      $('#drag .handler').mousedown(function (e){
        handlerDown(e)
      });

      function handlerDown(e) {
        isMove = true;
        x = e.pageX - parseInt($('#drag').find('.handler').css('left'), 10);
      }

      //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
      $('#drag .handler').mousemove(function (e){
        handlerMove(e)
      });
      function handlerMove(e) {
        var _x = e.pageX - x;// _x = e.pageX - (e.pageX - parseInt(handler.css('left'), 10)) = x
        if (isMove) {
          if (_x > 0 && _x <= maxWidth) {
            $('#drag').find('.handler').css({'left': _x});
            $('#drag').find('.drag_bg').css({'width': _x});
          } else if (_x > maxWidth) {  //鼠标指针移动距离达到最大时清空事件
            dragOk();
          }
        }
      }

      $('#drag .handler').mouseup(function (e){
        handlerUp(e)
      });

      function handlerUp(e) {
        isMove = false;
        var _x = e.pageX - x;
        if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
          $('#drag').find('.handler').css({'left': 0});
          $('#drag').find('.drag_bg').css({'width': 0});
        }
      }

      // setTimeout(this.closeAlert, 2000);

      var interval = '';
      //清空事件
      function dragOk() {

        $('#drag').find('.handler').removeClass('handler_bg').addClass('handler_ok_bg');
        $('#drag').find('.drag_text').removeClass('slidetounlock').text('验证通过').css({'color':'#fff'});       //modify
        // drag.css({'color': '#fff !important'});

        $('#drag').find('.handler').css({'left': maxWidth});                   // add
        $('#drag').find('.drag_bg').css({'width': maxWidth});                  // add

        $('#drag').find('.handler').unbind('mousedown');
        $('#drag').find('.handler').unbind('mousemove');
        $('#drag').find('.handler').unbind('mouseup');

        $('#drag').find('.handler .count_down_span_parent').show();
        $('#drag').find('.handler .count_down_span_parent .count_down_span').text(60);
        $('#drag').find('.handler .glyphicon').hide();
        that.interval = setInterval(returnOrigin, 1000); //启动,func不能使用括号

        that.getValidateCode();
      }

      function returnOrigin() {
        var i = parseInt($('#drag').find('.handler .count_down_span').text());
        i = i - 1;//不要 i--; 下面用i 好像才调用 i--
        if(i === 0){
          $('#drag').find('.handler .glyphicon').show();
          $('#drag').find('.handler .count_down_span_parent').hide();
          $('#drag').find('.handler').css({'left': 0});
          $('#drag').find('.drag_bg').css({'width': 0});
          $('#drag').find('.handler').removeClass('handler_ok_bg').addClass('handler_bg');
          $('#drag').find('.drag_text').addClass('slidetounlock').text('请按住滑块，拖动到最右边').css({'color':'#9c9c9c'});
          $('#drag').find('.handler').bind('mousedown',function(e){handlerDown(e)});
          $('#drag').find('.handler').bind('mousemove', function(e){handlerMove(e)});
          $('#drag').find('.handler').bind('mouseup', function(e){handlerUp(e)});
          clearInterval(that.interval);//停止
          that.validateCode = '';
        }else{
          $('#drag').find('.handler .count_down_span').text(i);
        }
      }
    },
    methods:{

      openRegister(){
        window.location.href = '#/register';
        // this.$router.push('/register');
      },
      //获取验证码
      getValidateCode(){
        axios.post('api/validateCode').then(
          response => {
            if(response.data.code === '101'){
              // 设置cookie默认过期时间单位是1d(1天)
              this.validateCode = this.$cookies.get('validateCode');
              console.log(this.$cookies.get('validateCode'));
              console.log(this.validateCode);
              // this.validateCode = window.sessionStorage.getItem('validateCode');//不同服务器 直接使用session失败 session id
              //操作cookie
            }else{
              // $('#drag').find('.handler .count_down_span').text(1);
              // clearInterval(this.interval);//停止
              $('#drag').find('.handler .count_down_span_parent').hide();
              $('#drag').find('.handler .glyphicon').show();
              $('#drag').find('.handler .count_down_span').text(1);
            }
          },
        );
      },
      nameChange(){
        const s = this.name.trim();
        if(s === ''){//为空
          $("#login_username").attr("data-content", "内容不能为空");
          $("#login_username").popover('show');
          return false;
        }else{//格式校验
          const format = /^[\w\-]{3,16}$/;
          if(format.test(s)){
            $("#login_username").popover('hide');
            return true;
          }else{
            $("#login_username").attr("data-content", "用户名格式不正确");
            $("#login_username").popover('show');
            return false;
          }
        }
      },
      passwordChange(){
        const s = this.password.trim();
        if(s === ''){//为空
          $("#login_pwd").attr("data-content", "内容不能为空");
          $("#login_pwd").popover('show');
        }else{//格式校验
          const format = /^[a-zA-Z0-9_\-!\?\.]{6,18}$/;
          if(format.test(s)){
            $("#login_pwd").popover('hide');
            return true;
          }else{
            $("#login_pwd").attr("data-content", "密码格式不正确");
            $("#login_pwd").popover('show');
            return false;
          }
        }
      },
      login(){
        console.log(this.validateCode)

        try{
          this.isLoad = true;
          $("#login_btn_id").attr("disabled", "disabled");
          //判断是否获取验证码
          if(this.validateCode === undefined || this.validateCode === null || this.validateCode === ''){
            this.$message.warning('请先通过滑动验证');
            return;
          }
          //验证数据
          const r1 = this.nameChange();
          if(!r1){
            return;
          }
          const r2 = this.passwordChange();
          if(!r2){
            return;
          }

          const url = 'api/login';
          const data = {name: this.name.trim(), password: this.password.trim(), validateCode: this.validateCode + ''}
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$cookies.set('token', response.data.extend);
                this.$store.state.username = data.name;
                // window.location.href = '#/mainBox';
                this.$router.push('/mainBox');
                storageUtils.saveName(data.name);

              }else if(response.data.code === '102'){
                this.$message.warning(response.data.message);
              }
            }
          )
        }finally {
          this.isLoad = false;
          $("#login_btn_id").removeAttr("disabled");
          $('#drag').find('.handler .count_down_span_parent').hide();
          $('#drag').find('.handler .glyphicon').show();
          $('#drag').find('.handler .count_down_span').text(1);
          // clearInterval(this.interval);
        }
      }
    },
    computed:{
      ...mapState(['username']),
    },
    // watch: {
    //   username: {
    //     deep: true, // 深度监视
    //     handler: storageUtils.saveName,
    //   }
    // },
  };

</script>

<style>
  /*@import "./../assets/css/reset-min.css";*/
  /*@import "./../assets/css/drag.css";*/
  /*@import "./../assets/css/login.css";*/
</style>
