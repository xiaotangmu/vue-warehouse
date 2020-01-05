<template>
    <div class="spu-div">
      <div class="spu-div-menu">
        <ul class="nav nav-tabs">
          <li role="presentation" class="spu-menu-li spu-add-li"><router-link to="/index/mainBox/spu/spuAdd">商品添加</router-link></li>
          <li role="presentation" class="spu-menu-li spu-edit-li"><router-link to="/index/mainBox/spu/spuEdit">商品维护</router-link></li>
        </ul>
        <span class="span-spu-help glyphicon glyphicon-question-sign " data-toggle="popover" data-content="帮助" data-container="body" data-trigger="hover" data-placement="bottom"></span>
      </div>
      <div>
        <router-view></router-view>
      </div>

      <!-- Modal -->
      <div id="spu-help-modal" class="my-modal" style="display: none">
        <div class="my-modal-content-div thumbnail" style="display: none">
          <div class="my-modal-title">
            <span>添加商品说明</span>
            <span class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content">
            <p>请先添加商品需要的品牌，属性等信息</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      mounted(){
        $(".spu-menu-li").click(function(){
          $(this).parent().find('li').each(function(){
            $(this).removeClass('active');
            $(this).find('a').css('color', '#337AB7');
          });
          $(this).addClass('active');
          $(this).find('a').css('color', '#60AD94');

        });
        //帮助提示
        $('.span-spu-help').hover(function(){
          $(this).popover('show');
        });
        $('.span-spu-help').click(function(){
          // $('#myModal').show();
          $('#spu-help-modal').show();
          $('#spu-help-modal .my-modal-content-div').show('slow');
        });
        $('#spu-help-modal .my-modal-remove').click(function(){
          $('#spu-help-modal').hide();
          $('#spu-help-modal .my-modal-content-div').hide();
        });

      }
    }
</script>

<style>
  .spu-div-menu{
    padding: 5px;
    /*background-color: #60AD94;*/
    height: 50px;
    width: 100%;
  }
  .spu-div-menu .nav{
    display: inline-block;
    /*width: 100%;*/
    position: absolute;
    left: 280px;
    right: 0;
    margin: 0 10px;
  }
  .spu-menu-li-click{
    color: #60AD94;
  }
  .spu-menu-li{
    font-size: 16px;
    /*color: #60AD94;*/
  }
  .span-spu-help{
    display: inline-block;
    float: right;
    font-size: 20px;
    margin: 10px 40px;
  }
  .my-modal-content-div{
    /*width: 900px;*/
    /*background-color: #fff;*/
    /*height: 500px;*/
    /*position: absolute;*/
    margin: 50px auto 0;
  }
</style>
