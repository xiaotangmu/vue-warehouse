<template>
    <div class="spu-edit-div">
      <div class="form-inline spu-search-div">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="jane.doe@example.com">
          <span class="btn btn-info"><span class="glyphicon glyphicon-search"></span> 查找</span>
        </div>
      </div>
      <div class="spu-item-list">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>序号</th>
              <th><span class="checkbox-choose"></span></th>
              <th>商品分类</th>
              <th>商品品牌</th>
              <th>商品名称</th>
              <th>商品描述</th>
              <th>商品属性</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-1-sort">100</td>
              <td class="td-2-checkbox"><span class="checkbox-choose"></span></td>
              <td class="td-3-text1">食品/饼干/华夫饼</td>
              <td class="td-3-text1">阿里巴巴华夫饼</td>
              <td class="td-3-text1">华夫饼</td>
              <td class="td-4-text2">这是一个不错的饼干</td>
              <td class="td-3-text1">重量 & 数量 & 什么 &xxx</td>
              <td class="td-5-btn">
                <span class="btn btn-primary spu-item-edit" data-toggle="popover" data-placement="bottom" data-content="编辑" data-trigger="hover" data-container="body"><span class="glyphicon glyphicon-pencil"></span></span>
                <span class="btn btn-danger spu-item-delete" data-toggle="popover" data-placement="bottom" data-content="删除" data-trigger="hover" data-container="body"><span class="glyphicon glyphicon-trash"></span></span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-btn-div">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li><span>首页</span></li>
              <li>
                <span aria-hidden="true">&laquo;</span>
              </li>
              <li><span>1</span></li>
              <li><span>1</span></li>
              <li class="active"><span >1</span></li>
              <li><span>1</span></li>
              <li><span>1</span></li>
              <li>

                <span aria-hidden="true">&raquo;</span>
              </li>
              <li><span>尾页</span></li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Modal -->
      <div id="spu-item-edit-modal" class="my-modal" style="display: none">
        <div class="my-modal-content-div thumbnail" style="display: none">
          <div class="my-modal-title">
            <span>商品修改</span>
            <span class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content">
            <SpuEditModal></SpuEditModal>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import SpuEditModal from './SpuEditModal'
    export default {
      components:{
        SpuEditModal,
      },
      mounted(){
        //编辑按钮的提示
        $(document).on('mouseenter', '.spu-item-edit', function(){
          $(this).popover('show');
        });
        //删除按钮的提示
        $(document).on('mouseenter', '.spu-item-delete', function(){
          $(this).popover('show');
        });
        //修改spu
        //显示修改模态框
        $(document).on('click', '.spu-item-edit', function(){
          $('#spu-item-edit-modal').show();
          $('#spu-item-edit-modal .my-modal-content-div').show('slow');
        });
        //关闭模态框
        $('.my-modal-remove').click(function(){
          $('#spu-item-edit-modal').hide();
          $('#spu-item-edit-modal .my-modal-content-div').hide();
        });
        // $('.spu-item-edit')
      }
    }
</script>

<style>
  .spu-edit-div{
    padding: 10px 10px 10px 290px;
    /*background-color: #6CB7A0;*/
  }
  .spu-search-div{
    padding: 10px 500px;
    border-bottom: 1px solid #f5f5f5;
  }
  .spu-item-list{
    font-size: 15px;
    /*background-color: #6CB7A0;*/
    height: 480px;
    position: relative;
  }
  .spu-item-list th{
    font-weight: bold;
  }
  .checkbox-choose{
    display: inline-block;
    width: 16px;
    height: 16px;
    /*background-color: #6CB7A0;*/
    background: url("./../../../assets/css/img/non-choose.jpg");
  }
  .spu-item-list .btn{
    font-size: 14px;
    padding: 0 20px;
  }
  .spu-item-list table{
    /*padding: 20px;*/
    margin: 10px;
    border-bottom: 1px solid #ccc;
    /*background-color: #dff0d8;*/
  }
  .td-1-sort{
    width: 90px;
    /*background-color: #dff0d8;*/
  }
  .td-2-checkbox {
    width: 40px;
    /*background-color: red;*/
  }
  .td-3-text1 {
    width: 150px;
    /*background-color: yellow;*/
    /*border-right: 2px solid #6CB7A0;*/
  }
  .td-5-btn{
    width: 140px;
    /*background-color: #6CB7A0;*/
  }
  .td-4-text2{
    width: 300px;
    /*background-color: #dff0d8;*/
  }
  .spu-item-list .page-btn-div{
    /*position: absolute;*/
    /*background-color: #6CB7A0;*/
    /*width: 100px;*/
    /*height: 40px;*/
    /*left: 500px;*/
    /*top: 500px;*/
  }
  .spu-item-list .page-btn-div{
    /*background-color: #dff0d8;*/
    /*margin-left: 290px;*/
    width: 100%;
    text-align: center;
  }
  .spu-item-list .page-btn-div nav{
    display: inline-block;
    /*background-color: #316AC5;*/
    margin: 0 auto;
    padding: 20px 0 0 0;
  }


</style>
