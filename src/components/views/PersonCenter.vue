<template>
    <div class="person-center ">
      <div class="person-photo-div">
        <div class="photo-div">
          <img src="./../../assets/img/2019-05-29_183500.png" height="130px" />
        </div>
        <div class="person-simple-info">
          <span>Xiao</span>
          <span class="role-span">角色：普通会员</span>
        </div>
      </div>
      <div class="person-info-update">
        <div class="person-info-update-left">
          <div class="person-info-menu">
            <div class="person-info-menu-item">基本信息</div>
            <div class="person-info-menu-item">密码修改</div>
            <div class="person-info-menu-item">头像修改</div>
          </div>
        </div>
        <div class="person-info-update-right">right</div>
      </div>
    </div>
</template>

<script>
    export default {}
</script>


<style>
  .person-photo-div{
    /*background: url("./../../assets/img/abstract01.jpg");*/
    /*background-color: #DFDFDF;*/
    /*background-color: #808080;*/
    background-color: #FAFAFA;
    width: 100%;
    height: 180px;
    /*box-shadow: 2px 2px 10px -2px #f5f5f5;*/
    border-bottom: 5px solid #f5f5f5;
    padding: 25px 0 0 400px;
  }
  .photo-div {
    float: left;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    overflow: hidden;
    /*position: absolute;*/
  }
  .person-simple-info{
    float: left;
    /*position: absolute;*/
    font: 25px 'youyuan';
    line-height: 135px;
    padding-left: 50px;
    /*color: #fff;*/
    color: #1A3467;

  }
  .person-simple-info .role-span{
    padding-left: 20px;
    font: 18px 'YouYuan';
  }
  .person-info-update{
    position: absolute;
    /*width: 100%;*/
    /*height: 100%;*/
    left: 280px;
    top: 220px;
    right: 0;
    bottom: 0;
    /*background-color: tan;*/
  }
  .person-info-update-left{
    float: left;
    height: 100%;
    width: 250px;
    /*background-color: #60AD94;*/
    position: relative;
  }
  .person-info-update-right{
    float: left;
    height: 100%;
  }
  .person-info-menu{
    float: right;
    width: 130px;
    height: 200px;
    /*background-color: #f7e1b5;*/
    text-align: center;
    font: 16px '微软雅黑';
  }
  .person-info-menu-item{
    padding: 5px 0;
    /*border-bottom: 1px solid #aaa;*/
  }
</style>
