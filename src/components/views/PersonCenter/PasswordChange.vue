<template>
  <div class="person-detail2">
    <div class="form-group">
      <span class="span1">密码</span>
      <input type="text" class="form-control"  placeholder="Jane Doe">
      <!--<span class="glyphicon glyphicon-pencil"></span>-->
      <div class="info-edit-tip">hello</div>
    </div>
    <div class="form-group">
      <span class="span1">新密码</span>
      <input type="text" class="form-control"  placeholder="1308777983298">
      <div class="info-edit-tip">hello</div>
    </div>
    <div class="form-group">
      <span class="span1">确认密码</span>
      <input type="email" class="form-control" placeholder="jane.doe@example.com">
      <div class="info-edit-tip">hello</div>
    </div>
    <div class="person-info-btn">
      <button class="btn mybtn-submit">信息修改</button>
    </div>
  </div>
</template>

<script>
    export default {
      mounted(){
        $('.mybtn-submit').css('color', '#fff');
      }
    }
</script>

<style>
  .form-group .span1{
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .person-detail2{
    font: 16px 'yunyuan';
    /*padding: 50px 40px;*/
    margin: 50px 210px;
  }
  .person-detail2 span{
    margin-right: 15px;
    margin-left: 5px;
  }
  .person-detail2 .info-edit-tip{
    display: none;
    position: absolute;
    left: 98px;
    top: 55px;
    font: 14px 'yunyuan';
    color: darkred;
  }
  .person-detail2 .person-info-btn{
    margin-left: 95px;
    margin-top: 30px;
  }
</style>
