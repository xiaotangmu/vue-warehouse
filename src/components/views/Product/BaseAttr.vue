<template>
    <div class="base-attr-div">
      <div class="main-box-view-title">
        <span class="main-box-view-title-name">商品属性管理 <span class="glyphicon glyphicon-question-sign"></span></span>
      </div>

      <div class="base-attr-main-div">
        <div class="base-attr-main">
          <div class="base-attr-group ">
            <div class="base-attr-item-title-textArea">
              <div class="base-attr-item-title-div-textArea">
                <span>商品分类</span>
              </div>
            </div>
            <div class="base-attr-item-content spu-catalog-div">
              <div class="form-control base-attr-catalog thumbnail" ><span class="spu-catalog-value">hhhh</span><span class="base-attr-list glyphicon glyphicon-triangle-bottom"></span></div>
              <div class="spu-catalog-choose-list innerbox thumbnail" style="display: none">
                <div class="spu-catalog-choose-list0 spu-catalog-choose-list-left myScrollBox" >
                  <div class="spu-catalog-item spu-catalog1-item" item-index="1">hello</div>
                  <div class="spu-catalog-item spu-catalog1-item" item-index="2">hello</div>
                  <div class="spu-catalog-item spu-catalog1-item" item-index="3">hello</div>
                  <div class="spu-catalog-item spu-catalog1-item" item-index="4">hello</div>
                  <div class="spu-catalog-item spu-catalog1-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                </div>
                <div class="spu-catalog-choose-list0 spu-catalog-choose-list-center myScrollBox">
                  <div class="spu-catalog-item spu-catalog2-item" item-index="1">hello</div>
                  <div class="spu-catalog-item spu-catalog2-item" item-index="2">hello</div>
                  <div class="spu-catalog-item spu-catalog2-item" item-index="3">hello</div>
                  <div class="spu-catalog-item spu-catalog2-item" item-index="4">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                </div>
                <div class="spu-catalog-choose-list0 spu-catalog-choose-list-right myScrollBox">
                  <div class="spu-catalog-item spu-catalog3-item" item-index="1">hello</div>
                  <div class="spu-catalog-item spu-catalog3-item" item-index="2">hello</div>
                  <div class="spu-catalog-item spu-catalog3-item" item-index="3">hello</div>
                  <div class="spu-catalog-item spu-catalog3-item" item-index="4">hello</div>
                  <div class="spu-catalog-item spu-catalog3-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                  <div class="spu-catalog-item">hello</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 属性添加 -->
          <div class="attr-list-box attr-list-box1" style="display:none;">
            <div class="base-attr-group ">
              <div class="base-attr-item-title-textArea">
                <div class="base-attr-item-title-div-textArea base-attr-title-name">
                  <span>商品属性</span>
                </div>
              </div>
              <div class="base-attr-item-content spu-catalog-div">
                <div class="base-attr-input-box myScrollBox">
                  <div class="base-attr-item">
                    <input type="text" class="form-control base-attr-item-input" placeholder="葵花宝典">
                    <div class="base-attr-span-box" style="display: none">
                      <span class="btn btn-info glyphicon glyphicon-plus"></span>
                      <span class="btn btn-danger glyphicon glyphicon-minus"></span>
                    </div>
                  </div>
                  <div class="base-attr-item">
                    <input type="text" class="form-control base-attr-item-input" placeholder="葵花宝典">
                    <div class="base-attr-span-box" style="display: none">
                      <span class="btn btn-info glyphicon glyphicon-plus"></span>
                      <span class="btn btn-danger glyphicon glyphicon-minus"></span>
                    </div>
                  </div>
                  <div class="base-attr-item">
                    <input type="text" class="form-control base-attr-item-input" placeholder="葵花宝典">
                    <div class="base-attr-span-box" style="display: none">
                      <span class="btn btn-info glyphicon glyphicon-plus"></span>
                      <span class="btn btn-danger glyphicon glyphicon-minus"></span>
                    </div>
                  </div>
                  <div class="base-attr-item">
                    <input type="text" class="form-control base-attr-item-input" placeholder="葵花宝典">
                    <div class="base-attr-span-box" style="display: none">
                      <span class="btn btn-info glyphicon glyphicon-plus"></span>
                      <span class="btn btn-danger glyphicon glyphicon-minus"></span>
                    </div>
                  </div>
                  <div class="base-attr-item">
                    <input type="text" class="form-control base-attr-item-input" placeholder="葵花宝典">
                    <div class="base-attr-span-box" style="display: none">
                      <span class="base-attr-span-plus btn btn-info glyphicon glyphicon-plus"></span>
                      <span class="base-attr-span-delete btn btn-danger glyphicon glyphicon-minus"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="base-attr-group" style="display:none;">
            <div class="base-attr-item-title-textArea"> </div>
            <div class="base-attr-item-content spu-catalog-div">
              <div class="form-control thumbnail" >
                <div class="btn btn-primary form-control">添加</div>
              </div>
            </div>
          </div>

          <!-- 属性列表 -->
          <div class="attr-list-box attr-list-box2 base-attr-item">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th><span class="checkbox-choose"></span></th>
                  <th>属性</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><span class="checkbox-choose"></span></td>
                  <td>重量</td>
                  <td>
                    <span class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                    <span class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery-1.11.0.min.js';
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery-ui-1.10.4.min.js';
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery.mousewheel-3.0.6.min.js';
  import './../../../../plugins/malihu-custom-scrollbar/js/minified/jquery.mCustomScrollbar.min.js';
  export default {
    data: {
      catalogChooseFlag: false,
      //用来记录分类index
      firstFlag: 0,
      secondFlag: false,
      thirdFlag: false,
      firstValue: '',
      secondValue: '',
      thirdValue: '',
    },
    mounted() {
      let {firstFlag, secondFlag, thirdFlag, firstValue, secondValue, thirdValue} = this;
      //分类框滚动条主题 -- 滚动条类 -- myScrollBox
      $(".myScrollBox").mCustomScrollbar({
        theme: "minimal"
      });
      //一级分类样式变化
      $('.base-attr-item-content .spu-catalog1-item').hover(
        function () {
          $('.base-attr-item-content .spu-catalog1-item').each(function () {
            $(this).removeClass('spu-catalog-item-hover');
          });
          $(this).addClass('spu-catalog-item-hover');
          firstFlag = $(this).attr('item-index');
          firstValue = $(this).text();
        });
      //二级分类样式
      $('.base-attr-item-content .spu-catalog2-item').hover(
        function () {
          $('.base-attr-item-content .spu-catalog2-item').each(function () {
            $(this).removeClass('spu-catalog-item-hover');
          });
          $(this).addClass('spu-catalog-item-hover');
          secondFlag = $(this).attr('item-index');
          secondValue = $(this).text();
        });

      //三级分类样式
      $('.base-attr-item-content .spu-catalog3-item').hover(
        function () {
          $('.base-attr-item-content .spu-catalog3-item').each(function () {
            $(this).removeClass('spu-catalog-item-hover');
          });
          $(this).addClass('spu-catalog-item-hover');
          thirdFlag = $(this).attr('item-index');
          thirdValue = $(this).text();
        });

      //三级分类选择
      $('.base-attr-item-content .spu-catalog3-item').click(function () {
        $('.base-attr-item-content .spu-catalog3-item').each(function () {
          $(this).removeClass('catalog-chose');
        });
        $(this).addClass('catalog-chose');
        //显示分类值
        $('.base-attr-item-content .spu-catalog-value').text(firstValue + ' / ' + secondValue + ' / ' + thirdValue);
      });

      //是否显示分类选择框
      $('.base-attr-catalog').click(function () {
        $('.spu-catalog-choose-list').toggle();
        $('.base-attr-catalog').addClass('spu-add-catalog-hover');
      });
      $('.spu-catalog-div').mouseleave(function () {
        $('.spu-catalog-choose-list').hide();
        $('.base-attr-catalog').removeClass('spu-add-catalog-hover');
      });

      //显示属性继续添加或删除
      $(document).on('mouseenter', '.base-attr-item', function(){
        $(this).find('.base-attr-span-box').show();
      });
      $(document).on('mouseleave', '.base-attr-item', function(){
        $(this).find('.base-attr-span-box').hide();
      });
      //添加与移除
      $(document).on('click', '.base-attr-span-plus', function(){
        $(this).parent().parent().after('<div class="base-attr-item">\n' +
          '          <input type="text" class="form-control base-attr-item-input" placeholder="葵花宝典">\n' +
          '          <div class="base-attr-span-box" style="display: none">\n' +
          '          <span class="base-attr-span-plus btn btn-info glyphicon glyphicon-plus"></span>\n' +
          '          <span class="base-attr-span-delete btn btn-danger glyphicon glyphicon-minus"></span>\n' +
          '          </div>\n' +
          '          </div>');
      });
      $(document).on('click', '.base-attr-span-delete', function(){
        $(this).parent().parent().remove();
      });

    }
  }
</script>

<style>
  @import "./../../../../plugins/malihu-custom-scrollbar/jquery.mCustomScrollbar.min.css";
  .main-box-view-title{
    font-size: 18px;
    color: #1C5F95;
    padding: 10px 290px ;
    border-bottom: 1px solid #f5f5f5;
    /*line-height: 38px;*/
  }

  .base-attr-group{
    /*background-color: #f7e1b5;*/
    /*width: 1000px;*/
    /*margin: 0 auto;*/
    font-size: 16px;
    margin: 20px 0;
  }
  .base-attr-item-content{
    display: inline-block;
    /*background-color: #60AD94;*/
    width: 500px;
  }
  .base-attr-item-title-textArea{
    float: left;
    margin: 5px 5px 0 290px;
    width: 150px;
    padding-right: 10px;
    text-align: right;
  }
  .base-attr-catalog{
    height: 35px;
    border-color: #cccccc;
    line-height: 35px;
    font-size: 15px;
    padding-left: 10px;
  }
  .base-attr-list{
    float: right;
    margin: 10px;
    color: #ccc;
  }
  .spu-catalog-choose-list{
    position: absolute;
    width: 500px;
    height: 200px;
    /*background-color: #f5f5f5;*/
    background-color: #fff;
    overflow: auto;
    z-index: 13;
  }

  .spu-catalog-choose-list0{
    float: left;
    width: 166px;
    height: 100%;
    overflow: auto;
  }
  ._mCS_5 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_4 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_3 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_2 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar,
  ._mCS_1 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar{
    /*background: rgba(0,0,0,0.4);*/
    background: red;
    width:3px;
  }
  ._mCS_5 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_4 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_3 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_2 .mCSB_scrollTools .mCSB_draggerRail,
  ._mCS_1 .mCSB_scrollTools .mCSB_draggerRail{
    /*background: rgba(0,0,0,0.6);*/
    background: #333333;
    width:3px;
  }
  .spu-catalog-item{
    /*background-color: #dff0d8;*/
    /*color: #316AC5;*/
    font: 14px 'yunyuan';
    text-align: left;
    padding: 5px 10px;

  }
  .spu-catalog-item-hover{
    background-color: #ccc;
    /*background-color: #5394EC;*/
    cursor: pointer;
  }
  .spu-add-catalog-hover{
    box-shadow: 1px 1px 5px 1px #66AFE9;
  }
  .base-attr-div .base-attr-input-box{
    max-height: 430px;
    /*background-color: #6CB7A0;*/
    overflow: auto;
    /*padding-right: 10px;*/
    width: 650px;
  }
  .base-attr-div .base-attr-input-box input{
    display: inline-block;
    width: 500px;
  }
  .base-attr-div .attr-list-box{
    border-top: 1px solid #f5f5f5;
    /*background-color: #dff0d8;*/
  }
  .base-attr-div .base-attr-input-box input{
    margin: 0 0 10px 0;
  }
  .base-attr-div .base-attr-item{
    position: relative;
  }
  .base-attr-div .base-attr-span-box{
    display: inline-block;
    position: absolute;
    left: 510px;
    top: 0;
    line-height: 30px;
  }
  .base-attr-div .base-attr-span-box span{
    padding: 0 20px;
    line-height: 20px;
    font-size: 14px;
    height: 20px;
  }
  .attr-list-box2 table{
    max-width: 1400px;
    background-color: #6CB7A0;
  }

</style>
