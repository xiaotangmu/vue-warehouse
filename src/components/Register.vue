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
        <input v-model="name" @change="nameChange" class="form-control" type="text" placeholder="Username"/>
        <span v-if="nameTipFlag" style="font-size: 13px" class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">{{nameTip}}</span>
      </div>
      <div class="register_main_input">
        <span for="register_email" class="col-sm-2 control-label">真实姓名</span>
        <input class="form-control" v-model="nickname" @change="nicknameChange" type="text" placeholder="王二狗"/>
        <span  style="font-size: 13px" v-if="nicknameTipFlag" class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">{{nicknameTip}}</span>
      </div>
      <div class="register_main_input">
        <span for="register_email" class="col-sm-2 control-label">手机</span>
        <input v-model="phone" @change="dataChange(phone, /^[0-9]{11}$/, '请输入正确的手机号码',3)" class="form-control" name="email" type="text" placeholder="13088821306"/>
        <span style="font-size: 13px" v-if="phoneTipFlag" class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">{{phoneTip}}</span>
      </div>
      <div class="register_main_input">
        <span for="register_email" class="col-sm-2 control-label">邮箱</span>
        <input v-model="email" @change="dataChange(email, /^([a-z0-9_\.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '请输入正确的邮箱',4)" id="register_email" class="form-control" type="text" placeholder="example@126.com"/>
        <span  style="font-size: 13px" v-if="emailTipFlag" class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">{{emailTip}}</span>
      </div>
      <div class="register_main_input">
        <span for="register_pwd1" class="col-sm-2 control-label">密码</span>
        <input v-model="password1" @change="passwrod1Change" id="register_pwd1" class="form-control" name="password1" type="password" placeholder="Password"/>
        <span style="font-size: 13px" v-if="password1TipFlag" class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">{{password1Tip}}</span>
      </div>
      <div class="register_main_input">
        <span for="register_pwd2" class="col-sm-2 control-label">确认密码</span>
        <input v-model="password2" @change="passwrod2Change" id="register_pwd2" class="form-control" name="password2" type="password" placeholder="Password"/>
        <span style="font-size: 13px" v-if="password2TipFlag" class="register_span_float_right glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
        <span class="register_span_tip_format">{{password2Tip}}</span>
      </div>
      <div class="register_main_input">
        <button @click.prevent="registerUser" style="color: #fff" id="register_btn_id" class="register_btn btn" role="button">
          <span v-if="isLoad"><i class="el-icon-loading"></i> 注册中</span>
          <span v-else="isLoad">注册</span>
        </button >
      </div>
    </div>
  </div>
</template>
<script>
  import './../assets/js/register.js';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: 'Register',
    data(){
      return{
        name: '',
        phone: '',
        nickname: '',
        email: '',
        password1: '',
        password2: '',
        nameTip: '',
        phoneTip: '',
        nicknameTip: '',
        emailTip: '',
        password1Tip: '',
        password2Tip: '',
        nameTipFlag: '',//是否显示验证成功
        phoneTipFlag: '',
        nicknameTipFlag: '',
        emailTipFlag: '',
        password1TipFlag: '',
        password2TipFlag: '',

        isLoad: false,

        // name: '',
        // name: '',
      }
    },
    methods:{
      //注册
      async registerUser(){
        this.isLoad = true;
        $("#register_btn_id").attr("disabled","disabled");

        //验证格式
        let flag = 0;

        //name
        const r1 = this.dataChange(this.name, /^[\w\-]{3,16}$/, '格式：包含字母数字_-的3-16位字符',1);
        if(r1 === -1){//为空
          this.nameTipFlag = false;
          this.nameTip = 'name 不能为空';
          flag++;
        }else if(r1 === 0){
          flag++;
        }else if(r1 === 1){//查重
          const result = await this.nameCheck().then(function (result) {
            return result;
          });
          if(!result){
            flag++;
          }
        }
        //nickname
        let r2 = this.nicknameChange();
        if(!r2){
          console.log('nick')
          flag++;
        }
        //phone
        let r3 = this.dataChange(this.phone, /^[0-9]{11}$/, '请输入正确的手机号码',3);
        if(r3 === 0){//可以为空
          console.log('phone')
          flag++;
        }
        //email
        let r4 = this.dataChange(this.email, /^([a-z0-9_\.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '请输入正确的邮箱',4);
        if(r4 === -1){
          this.emailTip = 'email 不能为空';
          this.emailTipFlag = false;
          flag++;
        }else if(r4 === 0){
          flag++;
        }
        //password1
        let r5 = this.passwrod1Change();
        if(r5 === -1){
          console.log('p1')
          flag++;
          this.password1Tip = '密码不能为空';
        }else if(r5 === 0){
          flag++;
        }
        //password2
        let r6 = this.passwrod2Change();
        if(r6 === -1){
          console.log('p2')
          flag++;
          this.password2Tip = '密码不能为空';
        }else if(r6 === 0){
          flag++;
        }
        if(flag > 0){
          console.log(flag);
          this.isLoad = false;
          $("#register_btn_id").removeAttr("disabled");
          return;
        }

        const url = 'api/register';
        const data = { name: this.name, nickname: this.nickname, phone: this.phone, email: this.email, password: this.password1 }
        let result = await axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.$message.success('注册成功');
              return true;
            }
            return false;
          }
        );
        this.isLoad = false;
        $("#register_btn_id").removeAttr("disabled");
        if(result){
          window.location.href = 'login';
        }

      },
      //password1 Change
      passwrod1Change(){
        const i = this.dataChange(this.password1, /^[a-zA-Z0-9_\-!\?,\.]{6,18}$/, '格式：包含字母数字_-!?,.的6-16位字符',5);
        if(i === 1){//格式正确
          const i2 = this.dataChange(this.password2, /^[a-zA-Z0-9_\-!\?,\.]{6,18}$/, '格式：包含字母数字_-!?,.的6-16位字符',6);
          if(i2 === 1){//格式也正确
            const p1 = this.password1.trim();
            const p2 = this.password2.trim();
            if(p1 !== p2){
              this.password1Tip = '两次密码不相等';
              this.password1TipFlag = false;
              return -2;
            }else{
              return 1;
            }
          }
        }
        return i;
      },
      passwrod2Change(){
        const i = this.dataChange(this.password2, /^[a-zA-Z0-9_\-!\?\.]{6,18}$/, '格式：包含字母数字_-?!,.的6-16位字符',6);
        if(i === 1){//格式正确
          const i2 = this.dataChange(this.password1, /^[a-zA-Z0-9_!,\-\?\.]{6,18}$/, '格式：包含字母数字_-?!,.的6-16位字符',5);
          if(i2 === 1){//格式也正确
            const p1 = this.password2.trim();
            const p2 = this.password1.trim();
            if(p1 !== p2){
              this.password2Tip = '两次密码不相等';
              this.password2TipFlag = false;
              return -2;
            }else{
              return 1;
            }
          }
        }
        return i;
      },
      //nickname change
      nicknameChange(){
        let s = this.nickname.trim();
        if(s.length > 20){
          this.nicknameTip = '请输入少于20个字符';
          this.nicknameTipFlag = false;
        }else if(s.length === 0){
          this.nicknameTip = '请输入名字';
          this.nicknameTipFlag = false;
          return false;
        }else{
          this.nicknameTip = '';
          this.nicknameTipFlag = true;
        }
        return true;
      },
      //name
      async nameChange(){
        let r = this.dataChange(this.name, /^[\w\-]{3,16}$/, '格式：包含字母数字_-的3-16位字符',1);
        if(r === 1){//格式正确验证是否已经存在
          return await this.nameCheck().then(function (result) {
            return result;
          });
        }
        return false;
      },
      async nameCheck(){
        const url = 'api/user/nameCheck';
        const data = {name: this.name };
        return await axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              if(response.data.extend + '' === 0 + ''){//不存在该name
                return true;
              }else if(response.data.extend + '' === 1 + ''){
                this.nameTip = '该 name 已经存在';
                this.nameTipFlag = false;
                return false;
              }
            }
            return false;
          }
        )
      },

      dataChange(name, format, tipStr,type){
        const s = name;
        if(s === undefined || s === null || s === ''){//为空不用理会
          switch (type) {
            case 1:
              this.nameTip = '';
              this.nameTipFlag = false;
              break;
            case 2:
              this.nicknameTip = '';
              this.nicknameTipFlag = false;
              break;
            case 3:
              this.phoneTip = '';
              this.phoneTipFlag = false;
              break;
            case 4:
              this.emailTip = '';
              this.emailTipFlag = false;
              break;
            case 5:
              this.password1Tip = '';
              this.password1TipFlag = false;
              break;
            case 6:
              this.password2Tip = '';
              this.password2TipFlag = false;
              break;
          }
          return -1;
        }
        //格式验证
        if(!format.test(s)){
          switch (type) {
            case 1:
              this.nameTip = tipStr;
              this.nameTipFlag = false;
              break;
            case 2:
              this.nicknameTip = tipStr;
              this.nicknameTipFlag = false;
              break;
            case 3:
              this.phoneTip = tipStr;
              this.phoneTipFlag = false;
              break;
            case 4:
              this.emailTip = tipStr;
              this.emailTipFlag = false;
              break;
            case 5:
              this.password1Tip = tipStr;
              this.password1TipFlag = false;
              break;
            case 6:
              this.password2Tip = tipStr;
              this.password2TipFlag = false;
              break;
          }
          return 0;
        }else{
          switch (type) {
            case 1:
              this.nameTip = '';
              this.nameTipFlag = true;
              break;
            case 2:
              this.nicknameTip = '';
              this.nicknameTipFlag = true;
              break;
            case 3:
              this.phoneTip = '';
              this.phoneTipFlag = true;
              break;
            case 4:
              this.emailTip = '';
              this.emailTipFlag = true;
              break;
            case 5:
              this.password1Tip = '';
              this.password1TipFlag = true;
              break;
            case 6:
              this.password2Tip = '';
              this.password2TipFlag = true;
              break;
          }
          return 1;
        }
      },

      //格式验证
      // validateFormat(str, format){//str -- 要验证的字符串，format -- 正确格式
      //   return format.test(str);
      // }


      // changeRoute(){
      //   PubSub.publish('changeRoute', 'mainBox')
      // }
    },
    mounted(){
      // $(function(){
        // $("#register_username").change(function(){
        //   usernameValidate(this);
        // });
        // $("#register_pwd1").change(function(){
        //   usernameValidate(this);
        //   $("#register_pwd1").next().hide();
        // });
        // $("#register_pwd2").change(function(){
        //   if (usernameValidate(this)) {
        //     //验证两次密码是否相等
        //     isEqualPwdTwice();
        //   }
        // });
        // $("#register_email").change(function(){
        //   emailValidate(this);
        // });
        //
        // //邮箱格式验证
        // function emailValidate(element){
        //   var format = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
        //   var tip = "请输入正确邮箱";
        //   return formatDoing($(element), format, tip);
        // }
        //
        // //验证两次密码是否相等
        // function isEqualPwdTwice(){
        //   if (!($("#register_pwd2").val() === $("#register_pwd1").val())) {
        //     $("#register_pwd2").next().hide();
        //     $("#register_pwd1").next().hide();
        //     $("#register_pwd2").parent(".register_main_input").addClass("has-error");
        //     $("#register_pwd2").parent(".register_main_input").addClass("has-error");
        //     $("#register_pwd2").parent(".register_main_input").find("span").eq(2).text("两次密码输入不相等").show();
        //     return false;
        //   }
        //   $("#register_pwd1").next().show();
        //   return true;
        // }

        // function usernameValidate(element) {
        //   var validate_format = /^[\w.!?_-]{6,18}$/;
        //   var tip_data = "数据是由字母、数字和字符. ! _ - ?组成的6-18位字符串";
        //   return formatDoing(element, validate_format, tip_data);
        // }
//         //格式统一处理
//         function formatDoing(element, format, tip){
//           $(element).next().hide();
//           $(element).parent(".register_main_input").removeClass("has-error");
//           if (!notBlank2(element)) {
//             $(element).parent(".register_main_input").find("span").eq(2).text("内容不能为空").show();
// //                $(element).next(".register_span_tip_format").text("内容不能为空").show();//用next获取不到数据
//             $(element).parent(".register_main_input").addClass("has-error");
//             return false;
//           }
//           if (!validate2(element, format)) {
//             $(element).parent(".register_main_input").find("span").eq(2).text(tip).show();
// //                $(element).next(".register_span_tip_format").val(tip).show();
//             $(element).parent(".register_main_input").addClass("has-error");
//             return false;
//           }
//           //验证成功
// //            $(element).next(".register_span_tip_format").hide();
//           $(element).parent(".register_main_input").find("span").eq(2).hide();
//           $(element).next().show();//直接next可以使用
//           return true;
//         }
//         //格式检查
//         function validate2(element, format){//元素，格式
//           return format.test($(element).val());
//         }
//         //非空检查 -- 与login与的提示框不同
//         function notBlank2(element){
//           return !($(element).val() === null || $(element).val() === ""); //后面统一处理，以便后面复用
//         }
//       });
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
    margin: 40px auto;
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
    font-size: 16px;
    color: #fff;
    background-color: #60AD94;
  }
  .register_btn:hover{
    color: #fff;
    background-color: #79CBB2;
  }
  .register_span_float_right{
    color: #60AD94;
    /*background-color: #79CBB2;*/
  }
  .register_span_tip_format{
    color: #A94442;
  }
</style>
