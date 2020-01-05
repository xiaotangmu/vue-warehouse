<template>
  <div>
    <!-- Modal -->
    <div id="spu-help-modal" class="my-modal" style="display: none">
      <div class="my-modal-content-div thumbnail" style="display: none">
        <div class="my-modal-title">
          <span>主题</span>
          <span class="my-modal-remove glyphicon glyphicon-remove"></span>
        </div>
        <div class="my-modal-content">

        </div>
      </div>
    </div>

    <!-- mainbox title -->
    <div class="main-box-view-title">
      <span class="main-box-view-title-name">商品属性管理 <span class="glyphicon glyphicon-question-sign"></span></span>
    </div>


  </div>


</template>

<script>
    export default {
      mounted(){
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
  .main-box-view-title{
    font-size: 18px;
    color: #1C5F95;
    padding: 10px 290px;
    border-bottom: 1px solid #f5f5f5;
    /*line-height: 38px;*/
  }
</style>
