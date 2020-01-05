<template>
    <div class="person-center clearfix">
      <div class="person-photo-div thumbnail">
        <div class="person-photo-title">关于自己</div>
        <div class="person-photo-main">
          <img src="@/assets/img/2019-05-29_183500.png" height="130px"/>
        </div>
        <div class="person-simple-info1">Xiao</div>
        <div class="person-simple-info2">角色：<span>白银会员</span></div>
      </div>
      <div class="person-center-main thumbnail">
        <ul class="nav nav-tabs">
          <li role="presentation" class="nav-li basic"><router-link flag="basic" to="/index/mainBox/personCenter/basicInfo">基本信息</router-link></li>
          <li role="presentation" class="nav-li password"><router-link flag="password" to="/index/mainBox/personCenter/passwordChange">密码修改</router-link></li>
          <li role="presentation" class="nav-li photo"><router-link flag="photo" to="/index/mainBox/personCenter/photoChange">头像修改</router-link></li>
        </ul>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
      methods:{

      },
      mounted(){
        if(sessionStorage.getItem('personCenter-router') === 'basic'){
          $('.basic').addClass('active');
        }else if(sessionStorage.getItem('personCenter-router') === 'password'){
          $('.password').addClass('active');
        }else if(sessionStorage.getItem('personCenter-router') === 'photo'){
          $('.photo').addClass('active');
        }

        $('.active a').css('color', "#60AD94");
        $(".nav-li").click(function(){
          $('.nav-li').each(function(){
            $(this).removeClass('active');
            $(this).find('a').css('color', '#547AC4');
          });
          $(this).addClass('active');
          $(this).find('a').css('color', '#60AD94');
          sessionStorage.setItem('personCenter-router', $(this).find('a').attr('flag').trim());
        });
      }
    }
</script>


<style>
  .person-center{
    /*background-color: #aaa;*/
  }
  .person-photo-div{
    /*margin: 5px;*/
    width: 260px;
    height: 280px;
    /*background-color: #f7e1b5;*/
    position: absolute;
    left: 280px;
    top: 40px;
  }
  .person-photo-title{
    color: #60AD94;
    text-align: center;
    font: 16px 'Yunyuan';
    border-bottom: 1px solid #aaa;
    padding: 10px 0;
    font-weight: 600;
  }
  .person-photo-main{
    width: 130px;
    height: 130px;
    overflow: hidden;
    border-radius: 50%;
    margin: 20px auto;
  }
  .person-photo-main:hover{
    cursor: pointer;
  }
  .person-simple-info1{
    text-align: center;
    font: 18px 'yunyuan';
  }
  .person-simple-info2{
    text-align: center;
    font: 13px 'yunyuan';
  }
  .person-center-main{
    position: absolute;
    left: 550px;
    top: 40px;
    bottom: 0;
    right: 0;
    padding: 10px;
  }
  .person-detail{
    font: 16px 'yunyuan';
    /*padding: 50px 40px;*/
    margin: 50px 250px;
  }
  .person-detail span{
    margin-right: 15px;
    margin-left: 5px;
  }
  .form-control{
    margin: 20px 0;
    display: inline-block;
    width: 350px;
  }
  .person-info-btn{
    margin-left: 57px;
    margin-top: 30px;
  }
  .person-info-btn .btn{
    width: 350px;
  }
  .form-group{
    position: relative;
  }
  .info-edit-tip{
    /*display: none;*/
    position: absolute;
    left: 60px;
    top: 55px;
    font: 14px 'yunyuan';
    color: darkred;
  }
  .mybtn-submit{
    background-color: #6CB7A0;
  }
  .mybtn-submit:hover{
    background-color: #60AD94;
  }
</style>
