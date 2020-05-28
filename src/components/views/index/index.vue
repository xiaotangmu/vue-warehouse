<template>
    <div>
      <div style="width: 100%;padding: 20px ">

        <div style="background-color: #F2F2F2;height: 300px">
          <span style="color: #474747;font-size: 60px;padding: 60px;">
            Welcome.
          </span>
          <span style="margin-left: 30px;color: #60AD94;font-size: 20px;">{{user.name}}</span>

          <el-card class="box-card" :body-style="{ padding: '0px' }"
                   style="width: 100px; height: 100px; font-size: 16px;
                   text-align: center;line-height: 100px;position: relative;left: 50px; top: 100px;">
            <div @click="goToPersonCenter" style="height: 100%">
              个人中心
            </div>
          </el-card>
          <el-card  class="box-card" :body-style="{ padding: '0px' }"
                   style="width: 100px; height: 100px; font-size: 16px;
                   text-align: center;line-height: 100px;position: relative; left: 160px;">
            <div @click="goToMessage" style="height: 100%">
              消息
            </div>
          </el-card>
        </div>



        <el-card class="box-card" style="width: 300px;display: inline-block;position: relative;top: -30px; left: 650px;"
                 :body-style="{ padding: '0px' }">
          <div style="background-color: #474747;color: #fff;height: 50px;
          font-size: 18px;padding-left: 20px;line-height: 50px;margin-bottom: 1px">客户分布</div>
          <div >
            <!--<el-image-->
              <!--style="width: 100%; height: 300px"-->
              <!--:src="src1"-->
              <!--:fit="fit"-->
            <!--&gt;</el-image>-->
            <img style="width: 100%; height: 200px" src="../../../assets/img/world.jpg" class="image">
          </div>
        </el-card>
        <el-card class="box-card" :body-style="{ padding: '0px' }"
                 style="width: 300px;display: inline-block;position: relative;top: -30px; left: 680px;">
          <div style="background-color: #474747;color: #fff;height: 50px;
          font-size: 18px;padding-left: 20px;line-height: 50px;margin-bottom: 1px">年度业绩</div>
          <div >
            <!--<el-image-->
            <!--style="width: 100%; height: 300px"-->
            <!--:src="src1"-->
            <!--:fit="fit"-->
            <!--&gt;</el-image>-->
            <img style="width: 100%; height: 200px" src="../../../assets/img/line.jpg" class="image">
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
      data(){
        return{
          list: ['个人中心', '消息'],
        }
      },
      methods: {
        goToPersonCenter(){
          this.$router.push('/mainBox/personCenter')
        },
        goToMessage(){
          this.$router.push('/mainBox/notification')
        }
      },
      computed:{
        ...mapState(['user']),
      }
    }
</script>

<style>
  .box-card:hover{
    cursor: pointer;
  }
  .box-card:active{
    background-color: #FAFAFA;

  }

</style>
