<template>
  <div class="out-manager-div">
    <div class="main-box-view-title" style="position: relative;">
      <span class="main-box-view-title-name">消息管理 <span class="glyphicon glyphicon-question-sign"></span></span>

      <div style="float: right;margin-right: 40px" >
        <el-button type="success" @click="flagAll">全部标记已读</el-button>
        <el-button type="warning" @click="deleteAllFlag">删除全部已读</el-button>
        <el-button type="danger" @click="deleteAll">删除全部</el-button>
      </div>

    </div>

    <div class="notification_div">
      <div v-if="page === null || page === '' || page.list === undefined || page.list === null ||page.list.length === 0">
        <el-tag>
          暂无数据
        </el-tag>
      </div>

      <div v-else>

      <el-card v-for="(item,index) in page.list" :key="index" class="box-card" style="margin: 10px 0;">
        <div class="notification_item" >
          <div class="notification_item_header">
            <el-badge is-dot class="item" :hidden="item.status === '1'">
              <el-button plain @click="flagRead(index, item)">标记已读</el-button>

            </el-badge>
            <el-tag
              style="border: none;"
              type="success"
              effect="plain">
              标题
            </el-tag>
            <span>{{item.title}}</span>

            <div style="position: absolute; right: 0;top: 0px; padding-right: 20px;">
              <el-tag
                type="warning"
                style="border: none;"
                effect="plain">
                日期
              </el-tag>
              <el-tag
                type="warning"
                style="border: none;padding-right: 20px;font-size: 15px"
                effect="plain">
                {{item.createTime}}
              </el-tag>
              <!--<el-date-picker-->
                <!--v-model="item.createTime"-->
                <!--editable="false"-->
                <!--clearable="false"-->
                <!--type="date"-->
                <!--style="margin-right: 10px;"-->
                <!--disabled="true"-->
                <!--placeholder="选择日期">-->
              <!--</el-date-picker>-->

              <!--<el-button plain >标记已读</el-button>-->
              <el-button plain type="danger" @click="deleteOne(index, item)"><i class="el-icon-delete"></i></el-button>
            </div>

          </div>
          <div class="notification_item_content thumbnail">
            <span class="content_item">
              <el-tag
                style="border:none"
                effect="plain"
              >
                仓库：
              </el-tag>
              <span>{{skus[index].warehouseName}}</span>
            </span>
            <span class="content_item">
              <el-tag
                style="border:none"
                effect="plain"
              >
                商品：
              </el-tag>
              <span>{{skus[index].name}}</span>
            </span>
            <span class="content_item">
              <el-tag
                style="border:none"
                effect="plain"
              >
                品牌：
              </el-tag>
              <span>{{skus[index].brandName}}</span>
            </span>

            <span class="content_item">
              <el-tag
              style="border:none"
              effect="plain"
              >
                规格：
              </el-tag>
              <span>{{skus[index].attrValueStr}}</span>
            </span>
            <span class="content_item">
              <el-tag
                style="border:none"
                effect="plain"
              >
                剩余数量：
              </el-tag>
              <span>{{skus[index].num}}</span>
            </span>
          </div>

        </div>
      </el-card>

      <!-- 页面数据 -->
      <div style="font-size: 13px;" v-show="page !== null && page !== undefined && page !== ''">
        <span style="padding-left: 20px">第 {{page.pageNum}} 页，共 {{page.pages}} 页 | {{page.total}} 条记录</span>
      </div>

      <!-- 页面按钮 -->
      <div v-show="page !== null && page !== undefined && page !== ''" class="brand-page-btn-div">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li v-show="page.pageNum !== 1" @click="findAllFlag?checkAll(1, 5):findItem(1,1,5)"><span>首页</span></li>
            <li v-show="page.pageNum !== 1" @click="findAllFlag?checkAll(page.pageNum-1,5):findItem(1, pageNum-1, 5)">
              <!--<span aria-hidden="true">&laquo;</span>-->
              <span aria-hidden="true">上一页</span>
            </li>
            <li @click="findAllFlag?checkAll(num, 5):findItem(1, num, 5)" v-for="(num, index) in page.navigatepageNums" :key="index" :class="{ 'active': page.pageNum === num}">
              <span>{{num}}</span>
            </li>
            <li @click="findAllFlag?checkAll(page.pageNum+1,5):findItem(1,page.pageNum+1,5)" v-show="page.pageNum*page.pageSize < page.total">
              <!--<span aria-hidden="true">&raquo;</span>-->
              <span aria-hidden="true">下一页</span>
            </li>
            <li @click="findAllFlag?checkAll(page.pages, 5):findItem(1,page.pages,5)" v-show="page.pageNum*page.pageSize < page.total"><span>尾页</span></li>
          </ul>
        </nav>
      </div>
      </div>


    </div>



  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data(){
      return{

        value1: '',

        //分页数据
        page: '',
        pageNum: 1,//首页
        pageSize: 8,//每页数据数

        skus: [],
      }
    },
    mounted(){

      this.checkAll(this.pageNum,this.pageSize);
    },
    methods: {

      //全部标记已读
      flagAll(){
        const url = 'api/notification/flagAll';
        const data = { userId: this.$store.state.user.id };
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.$store.state.notifications = [];
              // this.checkAll(1,8);
              this.page.list.forEach(item => {
                item.status = '1';
              })
            }

          }
        )
      },

      //删除全部标记
      async deleteAllFlag(){
        let result = await this.$confirm('您确定要删除全部已读消息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        if(result){
          const url = 'api/notification/deleteFlag';
          const data = { userId: this.$store.state.user.id };
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$store.state.notifications = [];
                this.$message.success("删除成功");
                this.checkAll(1,8);
              }

            }
          )
        }
      },

      //删除全部
      async deleteAll(){

        let result = await this.$confirm('您确定要删除全部消息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        if(result){
          const url = 'api/notification/deleteAll';
          const data = { userId: this.$store.state.user.id };
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$store.state.notifications = [];
                this.page.list = [];
                this.$message.success("删除成功");
                // this.checkAll(1,8);
              }

            }
          )
        }
      },
      async deleteOne(index, item){
        let result = await this.$confirm('您确定要删除该消息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        if(result){
          const url = 'api/notification/delete';
          const data = { userId: this.$store.state.user.id, notId: item.id };
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101') {
                //成功，更新数据
                if (item.status === '1') {
                  let index2 = this.$store.state.notifications.findIndex(item2 => item2.id = item.id);
                  if (index2 !== undefined && index2 !== null && index2 >= 0) {
                    this.$store.state.notifications.splice(index2, 1);
                  }
                }
                this.checkAll(this.pageNum, this.pageSize)
              }

            }
          )
        }
      },

      //标记已读
      flagRead(index, item){
        if(item.status === '1'){
          return;
        }
        const data = {userId: this.$store.state.user.id, notId: item.id };
        axios.post('api/notification/flag',qs.stringify(data) ).then(
          response => {
            if(response.data.code === '101'){
              //成功，更新数据
              item.status = '1';
              let index2 = this.$store.state.notifications.findIndex(item2 => item2.id = item.id);
              if(index2 !== undefined && index2 !== null && index2 >= 0){
                this.$store.state.notifications.splice(index2, 1);
              }
            }
          }
        )
      },

      //查询所有
      async checkAll(pageNum, pageSize){
        const url = 'api/notification/getAllPage';
        const data = {userId: this.$store.state.user.id, pageNum: pageNum, pageSize: pageSize};
        await axios.post(url,qs.stringify(data)).then(
          response => {
            if(response.data.code === '101' || response.data.code === '102'){
              let page1 = response.data.extend;
              if(page1 === null || page1.list === null || page1.list.length === 0){
                this.$message({
                  message: '暂无数据',
                  type: 'warning'
                });
                this.page = '';
                return;
              }
              // else if(response.data.extend.list.length === 1){
              //   if(response.data.extend.list[0] === null){//防止击穿的数据
              //     this.$message({
              //       message: '暂无数据',
              //       type: 'warning'
              //     });
              //     this.page = '';
              //     return;
              //   }
              // }
              this.page = response.data.extend;
              this.skus = [];
              this.page.list.forEach(item => {
                this.skus.push(JSON.parse(item.content));
              });
              // this.findAllFlag = true;
              this.pageData();
            }

          }
        );
      },
      //page 数据处理 -- 用于分页
      pageData(){
        this.pageNum = this.page.pageNum;
        this.pageSize = this.page.pageSize;
        let p1 = this.page.total/this.page.pageSize;//会保留余数
        this.page.pages = Math.ceil(p1);
        this.page.navigatepage = 5;
        if(this.page.pages > 5) {
          if(this.page.pageNum <= 3){
            this.page.navigatepageNums = [1,2,3,4,5];
          }
          if(this.page.pageNum > 3 && (this.page.pageNum + 2) >= this.page.pages){
            this.page.navigatepageNums = [this.page.pages-4,this.page.pages-3,this.page.pages-2,this.page.pages-1,this.page.pages];
          }else if(this.page.pageNum > 3 && (this.page.pageNum + 2) < this.page.pages){
            this.page.navigatepageNums = [this.page.pageNum-2,this.page.pageNum-1,this.page.pageNum,this.page.pageNum+1,this.page.pageNum+2];
          }
        }else if(this.page.pages <= 5){
          this.page.navigatepageNums = [];
          for (let i=1; i <= this.page.pages; i++){
            this.page.navigatepageNums.push(i);
          }
        }
      },
      //分页更新
      pageUpdate(){
        this.checkAll(this.pageNum, this.pageSize);
      },

    },
    computed:{

    },
  }
</script>

<style>
  .content_item{
    margin-right: 30px;
  }
  .notification_div{
    padding: 10px 20px;
  }
  .notification_item{
    position: relative;
    /*background-color: #60AD94;*/
    /*width: 100%;*/
    /*height: 200px;*/

  }
  .notification_item_header{
    margin: 5px;
  }
  .notification_item_content{
    /*background-color: #60AD94;*/
    /*margin-top: 5px;*/
    width: 100%;
    height: 80px;
    padding: 10px;
  }
  .down-list-nav-item a{
    display: block;
    color: #31708f;
    font-size: 12px;
    text-decoration: none;
  }
  .down-list-nav-item a:hover{
    background-color: #dff0d8;
    color: #60AD94;
    border-radius: 50%;
    font-weight: bold;
  }

</style>

