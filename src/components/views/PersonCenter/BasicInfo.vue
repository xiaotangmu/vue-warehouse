<template>
  <div class="person-detail">
    <div class="form-group">
      <span>姓名</span>
      <input type="text" class="form-control info-edit"  placeholder="Jane Doe" disabled="disabled">
      <div class="info-edit-tip">hello</div>
      <!--<span class="glyphicon glyphicon-pencil"></span>-->
    </div>
    <div class="form-group">
      <span>性别</span>
      <input type="radio" class="input-radio" name="gender" value="1" disabled="disabled" checked="checked"><span>男</span>
      <input type="radio" class="input-radio"  name="gender" value="0" disabled="disabled"><span>女</span>
    </div>
    <div class="form-group">
      <span>手机</span>
      <input type="text" class="form-control info-edit"  placeholder="1308777983298" disabled="disabled"/>
      <div class="info-edit-tip">hello</div>
    </div>
    <div class="form-group">
      <span >邮箱</span>
      <input type="email" class="form-control info-edit" placeholder="jane.doe@example.com" disabled="disabled"/>
      <div class="info-edit-tip">hello</div>
    </div>
    <div class="person-info-btn">
      <button class="btn btn-info">信息修改</button>
    </div>
  </div>
</template>

<script>
    export default {
      mounted(){
        $(".person-info-btn").click(function(){
          $(this).parent('.person-detail').find('input').attr('disabled', false);//可编辑状态
          $(this).find('button').text('更新').removeClass('btn-info').addClass('mybtn-submit').css('color', '#fff');
        });
      }
    }
</script>

<style>

</style>
