<template>
  <div>
    <div class="main_head clearfix">
      <div class="main_head_left">物流<span>仓库</span>管理平台</div>
      <div class="main_head_right">
        <div class="main_head_right_other form-inline">
          <div class="form-control">
            <input placeholder="Search"/>
            <span class="glyphicon glyphicon-search" aria-hidden="true" @click="changeRoute"></span>
          </div>
          <div class="span_icon">
            <!--<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>-->
            <span class="glyphicon glyphicon-bell" aria-hidden="true"></span>
          </div>
        </div>
        <div class="main_head_right_photo">
          <span class="img_span dropdown-toggle"><img height="35px" src="./../assets/img/2019-05-29_183500.png"/></span>
          <ul class="dropdown-menu">
            <li><a href="#"><span class="glyphicon glyphicon-user"> 个人中心</span></a></li>
            <li><a href="#"><span class="glyphicon glyphicon-check"> 签到</span></a></li>
            <li><a href="#"><span class="glyphicon glyphicon-question-sign"> 帮助</span></a></li>
            <li><a href="#"><span class="glyphicon glyphicon-log-out"> 退出</span></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main_body">
      <div class="main_body_left">
        <div class="main_body_menu thumbnail">
          <div class="main_body_menu_item main_item">
            <span class="glyphicon glyphicon-home"> 主页</span>
          </div>
          <div class="main_body_menu_item">
            <div class="clearfix">
              <span class="glyphicon glyphicon-phone-alt"> 客户管理</span>
              <span class="badge">4</span>
            </div>
            <div class="main_body_menu_item_child">
              <div class="child_item"><span class="glyphicon glyphicon-th-list"></span> 供应商管理</div>
              <div class="child_item"><span class="glyphicon glyphicon-envelope"></span> 客户管理</div>
            </div>
          </div>
          <div class="main_body_menu_item">
            <div class="clearfix">
              <span class="glyphicon glyphicon-th"> 商品管理</span>
              <span class="badge">4</span>
            </div>
            <div class="main_body_menu_item_child">
              <div class="child_item"><span class="glyphicon glyphicon-th-list"></span> 供应商管理</div>
              <div class="child_item"><span class="glyphicon glyphicon-envelope"></span> 客户管理</div>
            </div>
          </div>
          <div class="main_body_menu_item">
            <div class="clearfix">
              <span class=" glyphicon glyphicon-tags "> 库存管理</span>
              <span class="badge">5</span>
            </div>
            <div class="main_body_menu_item_child">
            </div>
          </div>
          <div class="main_body_menu_item">
            <div class="clearfix">
              <span class="glyphicon glyphicon-duplicate"> 报表分析</span>
              <span class="badge">3</span>
            </div>
            <div class="main_body_menu_item_child">
            </div>
          </div>
          <div class="main_body_menu_item">
            <div class="clearfix">
              <span class="glyphicon glyphicon-user"> 用户管理</span>
              <span class="badge">2</span>
            </div>
            <div class="main_body_menu_item_child">
            </div>
          </div>
        </div>
      </div>
      <div class="main_body_right ">
        <div class="main_body_header ">
                  <span class="thumbnail">
                      <span class="">个人中心 </span><span class="glyphicon glyphicon-remove" style="margin-left: 10px"></span>
                  </span>
          <span class="thumbnail">
                      <span class="">个人中心 </span><span class="glyphicon glyphicon-remove" style="margin-left: 10px"></span>
                  </span>
        </div>
        <div class="main_body_right_main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import './../assets/js/main.js'
  // import PubSub from 'pubsub-js'// 已经全局配置
  export default {
    name: 'MainBox',
    methods:{
      changeRoute(){
        PubSub.publish("changeRoute", "login");
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
    padding: 4px 100px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #E8E8E8;
  }
  .main_body_header .thumbnail{
    display: inline-block;
    padding: 5px 10px;
  }
  .main_body_header .thumbnail:hover{
    cursor: pointer;
    border-bottom: 2px solid #60AD94;
    box-shadow: 0 2px 10px -2px #60AD94;
  }
  .main_body_header .glyphicon-remove:hover{
    color: #CE4844;
  }

  #personal_center{
    background-color: #60AD94;
  }
</style>
