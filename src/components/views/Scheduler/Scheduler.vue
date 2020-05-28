<template>
  <div class="out-manager-div">
    <div class="main-box-view-title">
      <span class="main-box-view-title-name">定时清除 <span class="glyphicon glyphicon-question-sign"></span></span>
    </div>

    <el-tabs v-model="menu" style="margin-left: 20px;">
      <el-tab-pane label="入库" name="entry"></el-tab-pane>
      <el-tab-pane label="出库/送货" name="out"></el-tab-pane>
      <el-tab-pane label="盘点" name="check"></el-tab-pane>
      <el-tab-pane label="消息" name="notification"></el-tab-pane>
      <el-tab-pane label="库存修改记录" name="record"></el-tab-pane>
      <!--<el-tab-pane label="库存空商品" name="empty"></el-tab-pane>-->
    </el-tabs>

    <div v-if="menu === 'entry'" style="margin: 0 20px">
      <el-divider content-position="left">入库单定时清除</el-divider>
      <div>
        <div style="margin: 10px 10px">
          <el-tag type="info" v-if="entryData.status === '0'">
            暂无任务
          </el-tag>
          <el-tag v-else>
            当前任务：
            <span style="margin-right: 20px">
              年
              <span v-if="entryData.year === null || entryData.year === '' || entryData.year === undefined">*</span>
              <span v-else>{{entryData.year}}</span>
            </span>
            <span style="margin-right: 20px">
              月
              <span v-if="entryData.month === null || entryData.month === '' || entryData.month === undefined">*</span>
              <span v-else>{{entryData.month}}</span>
            </span>
            <span style="margin-right: 20px">
              日
              <span v-if="entryData.date === null || entryData.date === '' || entryData.date === undefined">*</span>
              <span v-else>{{entryData.date}}</span>
            </span>
            <span style="margin-right: 20px">
              时间
              <span v-if="entryData.time === null || entryData.time === '' || entryData.time === undefined">*</span>
              <span v-else>{{entryData.time}}</span>
            </span>
            <span style="margin-right: 20px">
              范围
              <span >{{entryData.limit}}</span>
            </span>
          </el-tag>
        </div>
        <!--<el-button>永不清除</el-button>-->
        <span @click="closeScheduler($event)" :disabled="entryData.status === '0'" class="btn btn-danger" style="margin-left: 8px; font-size: 12px">关闭任务</span>
        <el-tag type="info"
                effect="plain"
                style="border: none;">
          永不删除
        </el-tag>
      </div>
      <el-divider content-position="left">定时清除</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          年
        </el-tag>
        <el-date-picker
        v-model="entryYear"
        type="year"
        placeholder="选择年">
      </el-date-picker>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          月
        </el-tag>
        <el-select v-model="entryMonth" placeholder="请选择">
        <el-option
          v-for="item in months"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          日
        </el-tag>
        <el-select v-model="entryDate" placeholder="请选择">
          <el-option
            v-for="item in dates"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          时间
        </el-tag>
        <el-time-picker
          v-model="entryTime"
          placeholder="任意时间点">
        </el-time-picker>
        <div></div>
        <el-tag style="margin:10px 0 0 10px;" >
          年月日为空，表示每年/每月/每日执行；时间为空，表示晚上0点执行
        </el-tag>

      </div>
      <el-divider content-position="left">清除范围</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          范围
        </el-tag>
        <el-select v-model="entryLimit" placeholder="请选择">
        <el-option
          v-for="item in limits"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      </div>

      <div style="margin: 20px 0">
        <!--<el-button><i class="el-icon-s-tools"></i> 设置</el-button>-->
        <span  @click="setScheduler" class="btn btn-info" style="margin-left: 8px;font-size: 12px"><i class="el-icon-s-tools"></i> 设置</span>
      </div>

    </div>
    <div v-if="menu === 'out'" style="margin: 0 20px">
      <el-divider content-position="left">出库单定时清除</el-divider>
      <div>
        <div style="margin: 10px 10px">
          <el-tag type="info" v-if="outData.status === '0'">
            暂无任务
          </el-tag>
          <el-tag v-else>
            当前任务：
            <span style="margin-right: 20px">
              年
              <span v-if="outData.year === null || outData.year === '' || outData.year === undefined">*</span>
              <span v-else>{{outData.year}}</span>
            </span>
            <span style="margin-right: 20px">
              月
              <span v-if="outData.month === null || outData.month === '' || outData.month === undefined">*</span>
              <span v-else>{{outData.month}}</span>
            </span>
            <span style="margin-right: 20px">
              日
              <span v-if="outData.date === null || outData.date === '' || outData.date === undefined">*</span>
              <span v-else>{{outData.date}}</span>
            </span>
            <span style="margin-right: 20px">
              时间
              <span v-if="outData.time === null || outData.time === '' || outData.time === undefined">*</span>
              <span v-else>{{outData.time}}</span>
            </span>
            <span style="margin-right: 20px">
              范围
              <span >{{outData.limit}}</span>
            </span>
          </el-tag>
        </div>
        <!--<el-button>永不清除</el-button>-->
        <span @click="closeScheduler($event)" :disabled="outData.status === '0'" class="btn btn-danger" style="margin-left: 8px; font-size: 12px">关闭任务</span>
        <el-tag type="info"
                effect="plain"
                style="border: none;">
          永不删除
        </el-tag>
      </div>
      <el-divider content-position="left">定时清除</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          年
        </el-tag>
        <el-date-picker
        v-model="outYear"
        type="year"
        placeholder="选择年">
      </el-date-picker>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          月
        </el-tag>
        <el-select v-model="outMonth" placeholder="请选择">
        <el-option
          v-for="item in months"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          日
        </el-tag>
        <el-select v-model="outDate" placeholder="请选择">
          <el-option
            v-for="item in dates"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          时间
        </el-tag>
        <el-time-picker
          v-model="outTime"
          placeholder="任意时间点">
        </el-time-picker>
        <div></div>
        <el-tag style="margin:10px 0 0 10px;" >
          年月日为空，表示每年/每月/每日执行；时间为空，表示晚上0点执行
        </el-tag>

      </div>
      <el-divider content-position="left">清除范围</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          范围
        </el-tag>
        <el-select v-model="outLimit" placeholder="请选择">
        <el-option
          v-for="item in limits"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      </div>

      <div style="margin: 20px 0">
        <!--<el-button><i class="el-icon-s-tools"></i> 设置</el-button>-->
        <span  @click="setScheduler" class="btn btn-info" style="margin-left: 8px;font-size: 12px"><i class="el-icon-s-tools"></i> 设置</span>
      </div>

    </div>
    <div v-if="menu === 'check'" style="margin: 0 20px">
      <el-divider content-position="left">盘点单定时清除</el-divider>
      <div>
        <div style="margin: 10px 10px">
          <el-tag type="info" v-if="checkData.status === '0'">
            暂无任务
          </el-tag>
          <el-tag v-else>
            当前任务：
            <span style="margin-right: 20px">
              年
              <span v-if="checkData.year === null || checkData.year === '' || checkData.year === undefined">*</span>
              <span v-else>{{checkData.year}}</span>
            </span>
            <span style="margin-right: 20px">
              月
              <span v-if="checkData.month === null || checkData.month === '' || checkData.month === undefined">*</span>
              <span v-else>{{checkData.month}}</span>
            </span>
            <span style="margin-right: 20px">
              日
              <span v-if="checkData.date === null || checkData.date === '' || checkData.date === undefined">*</span>
              <span v-else>{{checkData.date}}</span>
            </span>
            <span style="margin-right: 20px">
              时间
              <span v-if="checkData.time === null || checkData.time === '' || checkData.time === undefined">*</span>
              <span v-else>{{checkData.time}}</span>
            </span>
            <span style="margin-right: 20px">
              范围
              <span >{{checkData.limit}}</span>
            </span>
          </el-tag>
        </div>
        <!--<el-button>永不清除</el-button>-->
        <span @click="closeScheduler($event)" :disabled="checkData.status === '0'" class="btn btn-danger" style="margin-left: 8px; font-size: 12px">关闭任务</span>
        <el-tag type="info"
                effect="plain"
                style="border: none;">
          永不删除
        </el-tag>
      </div>
      <el-divider content-position="left">定时清除</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          年
        </el-tag>
        <el-date-picker
        v-model="checkYear"
        type="year"
        placeholder="选择年">
      </el-date-picker>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          月
        </el-tag>
        <el-select v-model="checkMonth" placeholder="请选择">
        <el-option
          v-for="item in months"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          日
        </el-tag>
        <el-select v-model="checkDate" placeholder="请选择">
          <el-option
            v-for="item in dates"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          时间
        </el-tag>
        <el-time-picker
          v-model="checkTime"
          placeholder="任意时间点">
        </el-time-picker>
        <div></div>
        <el-tag style="margin:10px 0 0 10px;" >
          年月日为空，表示每年/每月/每日执行；时间为空，表示晚上0点执行
        </el-tag>

      </div>
      <el-divider content-position="left">清除范围</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          范围
        </el-tag>
        <el-select v-model="checkLimit" placeholder="请选择">
        <el-option
          v-for="item in limits"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      </div>

      <div style="margin: 20px 0">
        <!--<el-button><i class="el-icon-s-tools"></i> 设置</el-button>-->
        <span  @click="setScheduler" class="btn btn-info" style="margin-left: 8px;font-size: 12px"><i class="el-icon-s-tools"></i> 设置</span>
      </div>

    </div>
    <div v-if="menu === 'notification'" style="margin: 0 20px">
      <el-divider content-position="left">消息定时清除</el-divider>
      <div>
        <div style="margin: 10px 10px">
          <el-tag type="info" v-if="notificationData.status === '0'">
            暂无任务
          </el-tag>
          <el-tag v-else>
            当前任务：
            <span style="margin-right: 20px">
              年
              <span v-if="notificationData.year === null || notificationData.year === '' || notificationData.year === undefined">*</span>
              <span v-else>{{notificationData.year}}</span>
            </span>
            <span style="margin-right: 20px">
              月
              <span v-if="notificationData.month === null || notificationData.month === '' || notificationData.month === undefined">*</span>
              <span v-else>{{notificationData.month}}</span>
            </span>
            <span style="margin-right: 20px">
              日
              <span v-if="notificationData.date === null || notificationData.date === '' || notificationData.date === undefined">*</span>
              <span v-else>{{notificationData.date}}</span>
            </span>
            <span style="margin-right: 20px">
              时间
              <span v-if="notificationData.time === null || notificationData.time === '' || notificationData.time === undefined">*</span>
              <span v-else>{{notificationData.time}}</span>
            </span>
            <span style="margin-right: 20px">
              范围
              <span >{{notificationData.limit}}</span>
            </span>
          </el-tag>
        </div>
        <!--<el-button>永不清除</el-button>-->
        <span @click="closeScheduler($event)" :disabled="notificationData.status === '0'" class="btn btn-danger" style="margin-left: 8px; font-size: 12px">关闭任务</span>
        <el-tag type="info"
                effect="plain"
                style="border: none;">
          永不删除
        </el-tag>
      </div>
      <el-divider content-position="left">定时清除</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          年
        </el-tag>
        <el-date-picker
        v-model="notificationYear"
        type="year"
        placeholder="选择年">
      </el-date-picker>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          月
        </el-tag>
        <el-select v-model="notificationMonth" placeholder="请选择">
        <el-option
          v-for="item in months"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          日
        </el-tag>
        <el-select v-model="notificationDate" placeholder="请选择">
          <el-option
            v-for="item in dates"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          时间
        </el-tag>
        <el-time-picker
          v-model="notificationTime"
          placeholder="任意时间点">
        </el-time-picker>
        <div></div>
        <el-tag style="margin:10px 0 0 10px;" >
          年月日为空，表示每年/每月/每日执行；时间为空，表示晚上0点执行
        </el-tag>

      </div>
      <el-divider content-position="left">清除范围</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          范围
        </el-tag>
        <el-select v-model="notificationLimit" placeholder="请选择">
        <el-option
          v-for="item in limits"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      </div>

      <div style="margin: 20px 0">
        <!--<el-button><i class="el-icon-s-tools"></i> 设置</el-button>-->
        <span  @click="setScheduler" class="btn btn-info" style="margin-left: 8px;font-size: 12px"><i class="el-icon-s-tools"></i> 设置</span>
      </div>

    </div>
    <div v-if="menu === 'record'" style="margin: 0 20px">
      <el-divider content-position="left">库存修改记录定时清除</el-divider>
      <div>
        <div style="margin: 10px 10px">
          <el-tag type="info" v-if="recordData.status === '0'">
            暂无任务
          </el-tag>
          <el-tag v-else>
            当前任务：
            <span style="margin-right: 20px">
              年
              <span v-if="recordData.year === null || recordData.year === '' || recordData.year === undefined">*</span>
              <span v-else>{{recordData.year}}</span>
            </span>
            <span style="margin-right: 20px">
              月
              <span v-if="recordData.month === null || recordData.month === '' || recordData.month === undefined">*</span>
              <span v-else>{{recordData.month}}</span>
            </span>
            <span style="margin-right: 20px">
              日
              <span v-if="recordData.date === null || recordData.date === '' || recordData.date === undefined">*</span>
              <span v-else>{{recordData.date}}</span>
            </span>
            <span style="margin-right: 20px">
              时间
              <span v-if="recordData.time === null || recordData.time === '' || recordData.time === undefined">*</span>
              <span v-else>{{recordData.time}}</span>
            </span>
            <span style="margin-right: 20px">
              范围
              <span >{{recordData.limit}}</span>
            </span>
          </el-tag>
        </div>
        <!--<el-button>永不清除</el-button>-->
        <span @click="closeScheduler($event)" :disabled="recordData.status === '0'" class="btn btn-danger" style="margin-left: 8px; font-size: 12px">关闭任务</span>
        <el-tag type="info"
                effect="plain"
                style="border: none;">
          永不删除
        </el-tag>
      </div>
      <el-divider content-position="left">定时清除</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          年
        </el-tag>
        <el-date-picker
        v-model="recordYear"
        type="year"
        placeholder="选择年">
      </el-date-picker>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          月
        </el-tag>
        <el-select clearable v-model="recordMonth" placeholder="请选择">
        <el-option
          v-for="item in months"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          日
        </el-tag>
        <el-select clearable v-model="recordDate" placeholder="请选择">
          <el-option
            v-for="item in dates"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          时间
        </el-tag>
        <el-time-picker
          v-model="recordTime"
          placeholder="任意时间点">
        </el-time-picker>
        <div></div>
        <el-tag style="margin:10px 0 0 10px;" >
          年月日为空，表示每年/每月/每日执行；时间为空，表示晚上0点执行
        </el-tag>

      </div>
      <el-divider content-position="left">清除范围</el-divider>
      <div>
        <el-tag type="info"
                effect="plain"
                style="border: none;"
        >
          范围
        </el-tag>
        <el-select clearable v-model="recordLimit" placeholder="请选择">
        <el-option
          v-for="item in limits"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>


      </div>

      <div style="margin: 20px 0">
        <!--<el-button><i class="el-icon-s-tools"></i> 设置</el-button>-->
        <span  @click="setScheduler" class="btn btn-info" style="margin-left: 8px;font-size: 12px"><i class="el-icon-s-tools"></i> 设置</span>
      </div>

    </div>

    </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
      data(){
        return{
          menu: 'entry',
          dates: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//日
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],//月份
          limits: ['一个月前', '三个月前', '半年前', '一年前', '两年前'],//范围

          entryYear: '',
          entryMonth: '',
          entryDate: '',
          entryTime: '',
          entryLimit: '',

          outYear: '',
          outMonth: '',
          outDate: '',
          outTime: '',
          outLimit: '',

          checkYear: '',
          checkMonth: '',
          checkDate: '',
          checkTime: '',
          checkLimit: '',

          notificationYear: '',
          notificationMonth: '',
          notificationDate: '',
          notificationTime: '',
          notificationLimit: '',

          recordYear: '',
          recordMonth: '',
          recordDate: '',
          recordTime: '',
          recordLimit: '',

          emptyYear: '',
          emptyMonth: '',
          emptyDate: '',
          emptyTime: '',
          emptyLimit: '',

          schedulerJob: [],
          entryData: '',
          outData: '',
          checkData: '',
          notificationData: '',
          recordData: '',

        }
      },
      mounted(){
        // this.initDates();
        this.getAllScheduler();
      },
      methods: {
        // initDates(){
        //   let date = 31;
        //   this.dates = [];
        //   for (let i = 1; i <= date; i++){
        //     this.dates.push(i);
        //   }
        //   let month = 12;
        //   this.months = [];
        //   for (let i = 1; i <= month; i++){
        //     this.months.push(i);
        //   }
        //   console.log(this.dates)
        //   console.log(this.months)
        // },
        getAllScheduler(){
          axios.post('api/scheduler/getAll').then(
            response => {
              if(response.data.code === '101'){
                this.schedulerJob = response.data.extend;
                this.schedulerJob.forEach(item => {
                  if(item.jobName === 'entry'){
                    this.entryData = item;
                  }else if(item.jobName === 'out'){
                    this.outData = item;
                  }else if(item.jobName === 'check'){
                    this.checkData = item;
                  }else if(item.jobName === 'notification'){
                    this.notificationData = item;
                  }else if(item.jobName === 'record'){
                    this.recordData = item;
                  }

                })
              }
            }
          )
        },

        async closeScheduler(e){
          if($(e.target).attr('disabled') === 'disabled' || $(e.target).attr('disabled') === true){
            return;
          }
          let result = await this.$confirm('是否关闭该定时任务?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return true;
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消关闭'
            });
            return false;
          });

          if(!result){
            return;
          }

          const data = { jobName: this.menu };
          axios.post('api/scheduler/closeTask', qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message.success('成功关闭');

                if(this.menu === 'entry'){
                  this.entryData.status = '0';
                }else if(this.menu === 'out'){
                  this.outData.status = '0';
                }else if(this.menu === 'check'){
                  this.checkData.status = '0';
                }else if(this.menu === 'notification'){
                  this.notificationData.status = '0';
                }else if(this.menu === 'record'){
                  this.recordData.status = '0';
                }

              }
            }
          )
        },
        setScheduler(){
          let data = '';
          if(this.menu === 'entry'){
            data = { jobName: this.menu,year: '', month: this.entryMonth, date: this.entryDate,
              time: '', limit: this.entryLimit };

            if(this.entryYear !== ''){
              data.year = this.entryYear.getFullYear();
            }
            if(this.entryTime !== ''){
              data.time = this.entryTime.getHours() + ":" + this.entryTime.getMinutes() + ':' + this.entryTime.getSeconds();
            }
          }else if(this.menu === 'out'){
            data = { jobName: this.menu,year: '', month: this.outMonth, date: this.outDate,
              time: '', limit: this.outLimit };

            if(this.outYear !== ''){
              data.year = this.outYear.getFullYear();
            }
            if(this.outTime !== ''){
              data.time = this.outTime.getHours() + ":" + this.outTime.getMinutes() + ':' + this.outTime.getSeconds();
            }
          }else if(this.menu === 'check'){
            data = { jobName: this.menu,year: '', month: this.checkMonth, date: this.checkDate,
              time: '', limit: this.checkLimit };

            if(this.checkYear !== ''){
              data.year = this.checkYear.getFullYear();
            }
            if(this.checkTime !== ''){
              data.time = this.checkTime.getHours() + ":" + this.checkTime.getMinutes() + ':' + this.checkTime.getSeconds();
            }
          }else if(this.menu === 'notification'){
            data = { jobName: this.menu,year: '', month: this.notificationMonth, date: this.notificationDate,
              time: '', limit: this.notificationLimit };

            if(this.notificationYear !== ''){
              data.year = this.notificationYear.getFullYear();
            }
            if(this.notificationTime !== ''){
              data.time = this.notificationTime.getHours() + ":" + this.notificationTime.getMinutes() + ':' + this.notificationTime.getSeconds();
            }
          }else if(this.menu === 'record'){
            data = { jobName: this.menu,year: '', month: this.recordMonth, date: this.recordDate,
              time: '', limit: this.recordLimit };

            if(this.recordYear !== ''){
              data.year = this.recordYear.getFullYear();
            }
            if(this.recordTime !== ''){
              data.time = this.recordTime.getHours() + ":" + this.recordTime.getMinutes() + ':' + this.recordTime.getSeconds();
            }
          }else if(this.menu === 'empty'){
            data = { jobName: this.menu,year: '', month: this.emptyMonth, date: this.emptyDate,
              time: '', limit: this.emptyLimit };

            if(this.emptyYear !== ''){
              data.year = this.emptyYear.getFullYear();
            }
            if(this.emptyTime !== ''){
              data.time = this.emptyTime.getHours() + ":" + this.emptyTime.getMinutes() + ':' + this.emptyTime.getSeconds();
            }

          }
          console.log(data);
          if(data.limit === null || data.limit === undefined || data.limit === ''){
            this.$message.warning('请先选择删除范围');
            return;
          }
          if(data.year === '' && data.month === '' && data.date === '' && data.time === '' ){
            this.$message.warning('请先选择任务触发时间');
            return;
          }
          axios.post('api/scheduler/setTask', qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message.success('任务设置成功');

                if(this.menu === 'entry'){
                  this.entryData.year = data.year;
                  this.entryData.month = data.month;
                  this.entryData.date = data.date;
                  this.entryData.time = data.time;
                  this.entryData.limit = data.limit;
                  this.entryData.status = '1';
                }else if(this.menu === 'out'){
                  this.outData.year = data.year;
                  this.outData.month = data.month;
                  this.outData.date = data.date;
                  this.outData.time = data.time;
                  this.outData.limit = data.limit;
                  this.outData.status = '1';
                }else if(this.menu === 'check'){
                  this.checkData.year = data.year;
                  this.checkData.month = data.month;
                  this.checkData.date = data.date;
                  this.checkData.time = data.time;
                  this.checkData.limit = data.limit;
                  this.checkData.status = '1';
                }else if(this.menu === 'notification'){
                  this.notificationData.year = data.year;
                  this.notificationData.month = data.month;
                  this.notificationData.date = data.date;
                  this.notificationData.time = data.time;
                  this.notificationData.limit = data.limit;
                  this.notificationData.status = '1';
                }else if(this.menu === 'record'){
                  this.recordData.year = data.year;
                  this.recordData.month = data.month;
                  this.recordData.date = data.date;
                  this.recordData.time = data.time;
                  this.recordData.limit = data.limit;
                  this.recordData.status = '1';
                }
              }
            }
          )

        },


        checkScheduler(){
          alert('hello');
          const url = 'api/scheduler/jobs';
          axios.post(url).then(
            response => {
              console.log(response.data)
            }
          )
        },
        scheduler(type, index){//type ：1 -- 添加， 2 -- 更新；index ：1 -- 任务1 ；2 -- 任务2；
          let url = 'api/scheduler/task2';
          let data = '';
          if(type === 1){
            if(index === 1){
              data = { jobName: 'job1'};
            }else{
              data = { jobName: 'job2'};
            }
          }else{
            if(index === 1){
              data = { jobName: 'job1'};
            }else{
              data = { jobName: 'job2'};
            }
          }

          axios.post(url, qs.stringify(data)).then(
            response => {
              console.log(response.data)
            }
          )
        }
      },

    }
</script>

<style>

</style>
