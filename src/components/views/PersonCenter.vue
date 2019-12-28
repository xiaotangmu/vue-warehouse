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
    height: 200px;
    /*box-shadow: 2px 2px 10px -2px #f5f5f5;*/
    border-bottom: 7px solid #f5f5f5;
    padding: 35px 0 0 400px;
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
</style>
