<template>
  <div id="app">
    <router-view/>
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
  import { MessageBox,Indicator } from 'mint-ui';
export default {
  name: 'App',
  data(){
    return{
      tipMessage: 'hello',
      tipAlertShow: false,
      tipAlertShowOk: false,
    }
  },
  mounted(){
    // 超时时间
    // axios.defaults.timeout = 5000
// http请求拦截器  //使用请求拦截会让代理请求失效
//     let loadinginstace = '';
//     axios.interceptors.request.use(config => {
//       // if(config.url.indexOf("?")!=-1){
//       //   config.url = config.url + "&_v=" + genVersion();
//       // }else{
//       //   config.url = config.url + "?_v=" + genVersion();
//       // }
//       console.log(config.url);
//       Indicator.open({
//         //text: '加载中,请稍后...',
//         spinnerType: 'fading-circle'
//       });
//       return config
//     }, error => {
//       MessageBox.alert('数据加载超时,请检查您的网络或稍后重试!').then(action => {
//         Indicator.close();
//       });
//       return Promise.reject(error)
//     })
    // http响应拦截
    axios.interceptors.response.use(
      response => {
        // console.log('响应拦截' + response.data );
        const code = response.data.code;
        if(code !== '101'){
          // this.tipAlert(response.data.message, 0);
          this.$message.error(response.data.message);
        }
        if(code + '' === '401'){//没有登录
          window.$cookies.remove('token');
          // window.location.href('/#/login');//使用无效
          this.$router.push('/login');
        }
        return response;
      },
      error => {
        // this.tipAlert("服务器出错了！", 0);
        this.$message.error("服务器出错了！");
      }
    );
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
  }

}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 0;*/
}
</style>
