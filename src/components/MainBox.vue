<template>

  <el-container>
    <el-header height="60px">
      <div class="main_head clearfix">
        <div class="main_head_left">物流<span>仓库</span>管理平台</div>
        <div class="main_head_right">
          <div class="main_head_right_other form-inline">
            <div class="form-control">
              <input placeholder="Search"/>
              <span class="glyphicon glyphicon-search" aria-hidden="true" ></span>
            </div>
            <div class="span_icon" @click="goNotification">
              <!--<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>-->
              <!--<span class="glyphicon glyphicon-bell" aria-hidden="true"></span>-->
              <!--<i class="el-icon-message" style="font-size: 20px;"></i>-->
              <el-badge :value="notifications.length" :hidden="notifications.length < 1" :max="99" class="item" style="font-size: 11px">
                <i  class="el-icon-message" style="font-size: 20px;"></i>
                <!--<el-button size="small">回复</el-button>-->
              </el-badge>
            </div>
          </div>

          <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="img_span dropdown-toggle">
              <span v-if="user.photo === undefined || user.photo === null || user.photo === ''">
                <img src="../assets/img/photo.png" height="35px"/>
              </span>
              <img v-else :src="user.photo" height="35px"/>
              <!--<img height="35px" src="./../assets/img/2019-05-29_183500.png"/>-->
            </span>
          </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personCenter">
                <span class="glyphicon glyphicon-user"> 个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item command="sign"><span class="glyphicon glyphicon-check"> 签到</span></el-dropdown-item>
              <el-dropdown-item command="help"><span class="glyphicon glyphicon-question-sign"> 帮助</span></el-dropdown-item>
              <el-dropdown-item command="logout"><span  class="glyphicon glyphicon-log-out"> 退出</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </div>
    </el-header>
    <el-container style="height: 740px" >
      <el-aside width="280px" style="background-color: #F5F5F5;" class="my-modal-group-main-down-item">
        <div class="main_body_left">
        <div class="main_body_menu thumbnail">
          <div class="main_body_menu_item main_item" style="height: 57px;line-height: 40px">
            <span class="glyphicon glyphicon-home" @click="toIndex"> 主页</span>
          </div>

          <el-menu
            default-active="2"
            class="el-menu-vertical-demo thumbnail"
            active-text-color="#60AD94"
            style="border: none;"
            router
          >
            <el-submenu v-show="item.authName !== '消息推送'" v-for="(item, index) in menu" :key="index" :index="item.authName" style="border-bottom: 1px solid #DDDDDD;background-color: #fff">
              <!-- 上面分类 :index 不能直接加数值 + '' 直接转换也不行 所以 item.authName-->

              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item @click="goRouter(item, item2)" v-for="(item2, index2) in item.list" :key="index2" :index="item2.resource" style="height: 40px;line-height: 40px">
                  <i :class="item2.icon"></i>
                  <span>{{item2.authName}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

        </div>
      </div>
      </el-aside>
      <el-main style="margin: 0;padding: 0;">
        <div class=" " style="height: 100%">
          <div class="main_body_header " style="">
            <!--<span class="thumbnail">-->
            <!--<span class="">个人中心 </span><span class="glyphicon glyphicon-remove" style="margin-left: 10px"></span>-->
            <!--</span>-->
            <!--<span class="thumbnail">-->
            <!--<span class="">个人中心 </span><span class="glyphicon glyphicon-remove" style="margin-left: 10px"></span>-->
            <!--</span>-->

            <el-breadcrumb separator-class="el-icon-arrow-right" class="thumbnail" style="margin: 4px 0 0 0;padding: 10px;width: 100%">
              <el-breadcrumb-item :to="{ path: '/mainBox/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="nav.length === 0"></el-breadcrumb-item>

              <el-breadcrumb-item v-for="(item, index) in nav" :key="index">{{item}}</el-breadcrumb-item>
              <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
              <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
            </el-breadcrumb>

          </div>
          <div class="main_body_right_main">
            <router-view></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
  import './../assets/js/main.js'
  import axios from 'axios'
  import qs from 'qs'
  import {mapState} from 'vuex'
  import storageUtils from "./utils/storageUtils";
  // import PubSub from 'pubsub-js'// 已经全局配置

  export default {
    name: 'MainBox',
    data(){
      return{
        testClass: 'el-icon-user-solid',
        menuAuth: [],
        menu: [],

        nav: [],

        // notifications: [],

      }
    },
    mounted(){
      $(function(){
        $("#main_body_content").html("[(~{components/personalCenter::#personal_center})]");
      });

      $(".main_head_right_photo").hover(
        function(){
          $(".dropdown-menu").show();
        },
        function(){
          $(".dropdown-menu").hide();
        }
      );

      $(".main_body_menu_item").click(function(){
        var flag = $(this).attr("open-child-flag");
        if (flag === "open") {//打开状态，再次点击关闭
          $(this).find(".main_body_menu_item_child").hide(300);
          $(this).attr("open-child-flag", "close");
          return ;
        }
        //打开该items
        //先关闭其他 -- 防止撑开页面
        $(".main_body_menu_item").find(".main_body_menu_item_child").hide(300);
        $(".main_body_menu_item").attr("open-child-flag", "close");
        $(this).attr("open-child-flag", "open");
        $(this).find(".main_body_menu_item_child").show(300);
      });


      this.getUser();
    },
    computed:{
      ...mapState(['username', 'notifications', 'user']),
      // notifications(){
      //   return this.$store.state.notifications;
      // }
    },
    methods: {


      toIndex(){
        this.$router.push('/mainBox/index');
        this.nav = [];
      },

      goRouter(item, item2){
        // alert(item);
        this.nav = [];
        this.nav.push(item.authName);
        this.nav.push(item2.authName);

      },

      goNotification(){
        this.$router.push('/mainBox/notification');
      },

      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // }
      // changeRoute(){}

      //获取user - role - authority
      async getUser(){
        const name = storageUtils.readName();
        const data = { name: name };
        const url = 'api/user/getUserRoleAndAuthority';
        let result = await axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              const res = response.data.extend;
              if(res !== undefined && res !== null && res !== ''){
                this.$store.state.user = res;
                if(res.roles === undefined && res.roles  === null || res.roles === ''){
                  res.roles = [];
                }
                this.$store.state.role = res.roles;
                res.roles.forEach(item => {//遍历角色
                  if(item.authorities === undefined || item.authorities === null || item.authorities === ''){
                    item.authorities = [];
                  }else{
                    item.authorities.forEach(item2 => {//遍历角色权限
                      if(item2.level === 2){//资源 不是menu
                        this.$store.state.authorities3.push(item2);
                      }else{//目录
                        this.menuAuth.push(item2);
                      }
                      //保存所有权限
                      this.$store.state.authorities.push(item2);
                    })
                  }
                });
                //去重
                // this.menuAuth = Array.from(new Set(this.menuAuth));
                // this.$store.state.authorities = Array.from(new Set(this.$store.state.authorities));
                // this.$store.state.authorities3 = Array.from(new Set(this.$store.state.authorities3));

                let obj2 = {};
                this.menuAuth = this.menuAuth.reduce(function(item, next) {
                  obj2[next.id] ? '' : obj2[next.id] = true && item.push(next);
                  return item;
                }, []);
                let obj3 = {};
                this.$store.state.authorities = this.$store.state.authorities.reduce(function(item, next) {
                  obj3[next.id] ? '' : obj3[next.id] = true && item.push(next);
                  return item;
                }, []);
                let obj4 = {};
                this.$store.state.authorities3 = this.$store.state.authorities3.reduce(function(item, next) {
                  obj4[next.id] ? '' : obj4[next.id] = true && item.push(next);
                  return item;
                }, []);


                //构造目录
                this.menuAuth.forEach(item => {
                  if(item.level === 0){//一级目录
                    if(item.list === undefined || item.list === null || item.list === ''){
                      item.list = [];
                    }
                    this.menuAuth.forEach(item2 => {
                      if(item2.level === 1){
                        if(item2.pid === item.id){
                          item.list.push(item2);
                        }
                      }
                    });
                    this.menu.push(item);
                  }
                });

                return true;
              }
            }
            else{
              return false;
            }
          }
        );

        //获取user后连接socket
        if(result){

          this.contactSocket();
        }
      },

      contactSocket(){
        let that = this;
        let socket;
        //判断当前浏览器是否支持websocket
        if(window.WebSocket) {
          let authority = '';
          let hasAuthority  = this.$store.state.authorities3.find(item => item.authName === '接收库存报警');
          if(hasAuthority !== undefined || hasAuthority !== null || hasAuthority !== ''){
            authority = hasAuthority.authName;
          }
          //go on
          socket = new WebSocket("ws://localhost:8083/myWebSocket?userName=" + this.$store.state.user.name +"&userId="
            + this.$store.state.user.id + "&pushAuthority=" + authority);
          //相当于channelReado, ev 收到服务器端回送的消息
          socket.onmessage = function (ev) {
            console.log('收到信息');
            console.log(ev);//ev.data
            console.log(ev.data);
            let notification = JSON.parse(ev.data);
            let ns = notification.notifications;
            console.log(ns)
            if(that.$store.state.notifications.length > 0){
              that.$store.state.notifications.push(ns[0])
            }else{
              that.$store.state.notifications = ns;
            }
            // let sku = JSON.parse(ns[0].content);

            // that.$notify({
            //   title: '库存紧张',
            //   message: '仓库：' + sku.warehouseName + ' ,商品：' + sku.name + ' ,规格：' + sku.attrValueStr
            //     + ' ，剩余数量：' + sku.num,
            //   type: 'warning'
            // });
          };

          //相当于连接开启(感知到连接开启)
          socket.onopen = function (ev) {
            console.log('连接开启');
            console.log(ev)
          };

          //相当于连接关闭(感知到连接关闭)
          socket.onclose = function (ev) {
            console.log('连接关闭了')
            console.log(ev)
          }
        } else {
          this.$message.error("当前浏览器不支持websocket")
        }
      },

      handleCommand(command) {
        // this.$message('click on item ' + command);
        if(command === 'logout'){
          this.logout();
        }else if(command === 'personCenter'){
          this.personCenter();
        }else if(command === 'sign'){
          this.sign();
        }else if(command === 'help'){
          this.help();
        }
      },
      personCenter(){
        this.$router.push('/mainBox/personCenter');
      },
      sign(){
        this.$message.success('签到成功');
      },
      help(){
        this.$message.warning('度娘');
      },

      logout(){
        //跳转到登录页面
        axios.get('api/logout').then(
          response => {
            if(response.data.code === '101'){
              this.$cookies.remove('token');
              window.location.href = '/#/login'
            }
          }
        )
      }
    }
  };
</script>

<style>
  .thumbnail{
    margin: 0;
    padding: 0;
  }
  html, body{
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .main_body{
    position: absolute;
    width: 100%;
    left: 0;
    top: 60px;
    bottom: 0;
    /*background-color: tan;*/
    z-index: 8;
    overflow: auto;
  }
  .main_body_left{
    float: left;
    width: 280px;
    height: 100%;
    background-color: #F5F5F5;
  }
  .main_body_menu{
    margin: 20px;
    font-size: 16px;
  }
  .main_body_menu_item{
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
  }
  .main_body_menu_item .badge{
    /*margin: 5px 0;*/
    display: block;
    float: right;
  }
  .main_item{
    /*color: #60AD94;*/
  }
  .child_item{
    color: #337AB7;
    /*text-align: center;*/
    padding: 5px 0 5px 40px ;
  }
  .child_item:hover{
    /*background-color: #f5f5f5;*/
    cursor: pointer;
    color: #60AD94;
  }
  .main_body_menu_item_child{
    display: none;
  }
  .main_body_header span{
    /*font: 15px "YouYuan";*/
    font-weight: 100;
  }
  /*.thumbnail{*/
  /*display: inline-block;*/
  /*}*/
  .main_body_header{
    /*padding: 4px 100px;*/
    background-color: #f5f5f5;
    border-bottom: 1px solid #E8E8E8;
  }
  .main_body_header .thumbnail{
    display: inline-block;
  }
  /*.main_body_header .thumbnail:hover{*/
    /*cursor: pointer;*/
    /*border-bottom: 2px solid #60AD94;*/
    /*box-shadow: 0 2px 10px -2px #60AD94;*/
  /*}*/
  .main_body_header .glyphicon-remove:hover{
    color: #CE4844;
  }

  #personal_center{
    background-color: #60AD94;
  }
</style>
