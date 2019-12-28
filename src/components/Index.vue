<template>
  <div>
    <!--<Login id="login" />-->
    <!--<Register id="register" />-->
    <!--<MainBox id="mainBox" />-->
    <router-view></router-view>
  </div>
</template>

<script>
  // import Login from '@/components/Login'
  // import MainBox from '@/components/MainBox'
  // import Register from '@/components/Register'
  export default {
    // components:{
    //   Login,
    //   MainBox,
    //   Register
    // },
    mounted(){
      // $("#mainBox").show();

      //订阅消息
      PubSub.subscribe('changeRoute', (msg, index)=>{
        this.$router.push('/index/' + index)
        // $("#mainBox").hide();
        // $("#login").hide();
        // $("#register").hide();
        // if(index === 'login'){
        //   $("#login").show();
        // }else if(index === 'register'){
        //   $("#register").show();
        // }else {
        //   $("#mainBox").show();
        // }
      })
    }
  }
</script>

<style>
  /*#login{*/
    /*display: none;*/
  /*}*/
  /*#register{*/
    /*display: none;*/
  /*}*/
  /*#mainBox{*/
    /*display: none;*/
  /*}*/

</style>
