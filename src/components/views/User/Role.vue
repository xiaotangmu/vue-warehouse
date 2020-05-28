<template>

  <div class="role-item thumbnail" v-loading="loading">
    <div class="role-item-choose-div" >
      <div class="role-item-choose-title">角色管理<span class="glyphicon glyphicon-question-sign" style="padding-left: 10px"></span></div>
    </div>

    <div class="role-item-main thumbnail" style="padding: 5px 10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="first"></el-tab-pane>
        <el-tab-pane label="角色赋予" name="second"></el-tab-pane>
      </el-tabs>

      <div v-if="activeName === 'first'" style="padding-top: 10px;">
        <span class="btn btn-primary" @click="getAll">查看所有</span>
        <span class="btn btn-info brand-add-btn" @click="modelOpenNode('','',2)">添加角色</span>
        <span @click="removeNodes()" class="btn btn-danger">删除已选</span>
        <span class="form-inline" style="padding-left: 100px">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="checkName"
            style="width: 150px;"
          >
          </el-input>
          <span @click="findItem" class="btn btn-warning"><span class="glyphicon glyphicon-search" >查找</span></span>
        </span>
        <!--<el-divider></el-divider>-->

        <el-table
          @selection-change="changeChoose"
          ref="multipleTable"
          :data="roleList"
          tooltip-effect="dark"
          :highlight-current-row="true"
          max-height="520"
          style="width: 100%;border-top: 1px solid #E4E7ED;margin-top: 10px;"
        >
          <el-table-column type="expand" width="70">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="角色名称">
                  <span>{{ props.row.roleName }}</span>
                </el-form-item>
                <el-form-item label="角色描述">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-divider content-position="left">角色权限</el-divider>
                <el-form-item v-if="item.level === 2" v-for="(item,index) in props.row.authorities" :key="index" label="">
                  <span >{{item.authName}}</span>
                </el-form-item>
                <el-form-item v-if="props.row.authorities.length === 0" label="">
                  <span >暂无权限</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            label="编号"
          >
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="modelOpenNode(scope.$index, roleList, 1)" class="btn btn-primary brand-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
              <span @click="removeNode(scope.$index, roleList)" class="btn btn-danger brand-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="activeName === 'second'" style="padding-top: 10px;">

        <!--<span class="btn btn-primary" @click="checkAll(1, 5)">查看所有</span>-->
        <!--<span class="btn btn-info brand-add-btn" @click="levelAddOpen(1)">添加角色</span>-->
        <!--<span @click="deleteBatch()" class="btn btn-danger">删除已选</span>-->

        <span class="form-inline" style="padding-left: 100px">

          <span
            style="border: none;font-size: 14px;padding: 0 10px;"
          >用户查找</span>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="checkName2"
            style="width: 150px;"
          >
          </el-input>
          <span @click="findItem2()" class="btn btn-warning"><span class="glyphicon glyphicon-search" >查找</span></span>
        </span>
        <!--<el-divider></el-divider>-->


        <div v-if="hasUser" class="catalog-form-div">
          <div class=" " >
            <el-divider content-position="left">当前用户</el-divider>


            <div  style="padding: 0 100px;margin-top: 20px;">
              <el-tag
                effect="plain"
                style="border: none;font-size: 14px"
                type="info"
              >用户</el-tag>
              <el-tag type="success">{{user.name}}</el-tag>

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;margin-left: 20px;"
                type="info"
              >昵称</el-tag>
              <el-tag type="">{{user.nickname}}</el-tag>

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;margin-left: 20px;"
                type="info"
              >邮箱</el-tag>
              <el-tag type="warning">{{user.email}}</el-tag>

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;margin-left: 20px;"
                type="info"
              >手机</el-tag>
              <el-tag type="info">{{user.phone}}</el-tag>

            </div>

            <el-divider content-position="left">权限赋予</el-divider>

            <el-transfer
              :titles="title2"
              filterable
              :filter-method="filterMethod2"
              filter-placeholder="请输入角色名"
              target-order="unshift"
              :props="{
                  key: 'id',
                  label: 'roleName'
                }"
              v-model="chooseRoles"
              :data="roles"
              style="padding: 0 100px"
            >
            </el-transfer>

            <el-button type="primary" style="margin: 30px 0 20px 350px" @click="updateRole($event)">
              <i v-if="isLoad" class="el-icon-loading"></i>更新
            </el-button>
          </div>


        </div>

        <div v-if="!hasUser" class="catalog-form-div">
          <div class=" " >
            <el-divider content-position="left">当前用户</el-divider>

            <div style="padding: 0 100px;margin-top: 20px;">
              <el-tag
                effect="plain"
                style="border: none;font-size: 14px"
                type="info"
              >暂无用户</el-tag>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!--<input type="hidden" id="input_hidden" data-toggle="modal" data-target="#myModal"/>-->
    <!-- Modal 横态框 -->
    <transition name="tip-alert">
    <div v-if="isShowMymodel" class="myModal" style="z-index: 2">
      <div class="myModal-div thumbnail">
        <div class="myModal-title">
          <div class="myModal-title-left" style="font-size: 16px">角色管理</div>
          <div class="myModal-title-right"><span @click="openMymodel()" class="glyphicon glyphicon-remove catalog-plus-modal-remove"></span></div>
        </div>
        <div class="myModal-content">
          <div class="catalog-form-div">
            <div class="catalog-level1 ">
              <div style="padding: 0 100px; margin-top: 20px">
                <el-tag
                  effect="plain"
                  style="border: none;font-size: 14px"
                  type="info"
                >角色名称</el-tag>
                <el-input
                  suffix-icon="el-icon-edit el-input__icon"
                  v-model="roleName1"
                  @change="nameChange"
                  placeholder="请输入内容"
                  style="width: 200px"
                ></el-input>
                <el-tag type="danger" v-show="roleNameErrorFlag">{{roleNameErrorTip}}</el-tag>

              </div>
              <div style="padding: 0 100px;margin-top:10px;">
                <el-tag
                  effect="plain"
                  style="border: none;font-size: 14px;position: relative;top: -40px;"
                  type="info"
                >角色描述</el-tag>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="description"
                  maxlength="30"
                  show-word-limit
                  style="width: 480px;"
                >
                </el-input>

              </div>
              <el-divider content-position="left">权限赋予</el-divider>

              <el-transfer
                :titles="title"
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入"
                target-order="unshift"
                :props="{
                  key: 'id',
                  label: 'authName'
                }"
                v-model="chooseAuthorities"
                :data="authorities3"
                style="padding: 0 100px"
              >
              </el-transfer>

              <el-button v-if="flag" @click="itemAdd($event)" type="primary" style="margin: 30px 0 20px 520px">
                <i v-if="isLoad" class="el-icon-loading"></i>添加</el-button>

              <el-button v-if="!flag" @click="updateItem($event)" type="success" style="margin: 30px 0 20px 520px">
                <i v-if="isLoad" class="el-icon-loading"></i>更新</el-button>
              <el-button @click="openMymodel" type="info" style="">取消</el-button>



            </div>


          </div>
        </div>
        </div>
      </div>
    </transition>


  </div>


</template>

<script>
  import '@/assets/js/jquery-1.4.4.min.js';
  import '@/assets/js/jquery.ztree.all.min.js';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data(){

      return{

        hasUser: false,//是否有用户,没有则不显示数据
        roleName1: '',
        activeName: 'first',
        multipleSelection: [],

        filterMethod(query, item) {
          return item.authName.indexOf(query) > -1;
        },
        filterMethod2(query, item) {
          return item.roleName.indexOf(query) > -1;
        },
        title: ['未授权','已授权'],
        title2: ['可赋角色','已有角色'],
        isShowMymodel: false,//是否显示横态框
        roleNameErrorFlag: false,//是否显示name的提示
        roleNameErrorTip: '',

        isLoad: '',
        loading: false,
        loading2: false,
        data1: '',
        node1: '',

        authorities: [],//保存所有权限
        authorities3: [],//只保留叶子权限 -- 菜单不做选择
        authorities3Copy: [],//只保留叶子权限 -- 菜单不做选择
        chooseAuthorities: [],//选择的权限
        chooseRoles: [],//选择的角色
        roleList: [],
        flag: true,//true -- add false -- update
        description: '',
        checkName: '',//角色搜索
        checkName2: '',//用户搜索
        chooseList: '',//勾选数据
        user: {},//记录当前用户
        roles: [],

      }
    },
    mounted(){

      //先声明方法，后面再添加的元素用这方法调用
      $(document).on('mouseenter', '.tree-span-delete-part',function(event){
        $(this).popover('show')
      });
      $(document).on('mouseenter', '.tree-span-delete-all',function(event){
        $(this).popover('show')
      });
      $(document).on('mouseenter', '.tree-span-plus',function(event){
        $(this).popover('show')
      });
      $(document).on('mouseenter', '.tree-span-edit',function(event){
        $(this).popover('show')
      });
      $(document).on('click', '.tree-span-delete-part',function(event){
        // $("#input_hidden").trigger('click')
        alert(this.level3s);
        $('.myModal').modal('show');
      });

      $(".catalog-level1-btn").hover(function(){
        $(this).popover('show')
      });
      $(".catalog-level1-btn").click(function(){
        $('.catalog-level2 span').hide();
        $('.catalog-level2').show(300);
        $('.catalog-level2 span').show();
      });
      //横态框 -- 添加二级分类输入框
      $(document).on('click', '.catalog-level2-btn-plus', function(event){
        $(this).parent().after('<div class="catalog-level2-div">\n' +
          '                  <input type="text" class="form-control catalog-input" placeholder="干货">\n' +
          '                  <span class="catalog-level2-btn catalog-level2-btn-plus glyphicon glyphicon-plus btn btn-primary" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class=\'btn-span2\'>继续添加二级分类</span>" data-trigger="hover"></span>\n' +
          '                  <span class="catalog-level2-btn catalog-level2-btn-delete glyphicon glyphicon-minus btn btn-danger" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class=\'btn-span2\'>删除</span>" data-trigger="hover"></span>\n' +
          '                </div>');
      });
      //横态框 -- 删除二级分类输入框
      $(document).on('click', '.catalog-level2-btn-delete',function(){
        //判读是否是最后一个输入框
        if($(this).parent().parent().find('.catalog-level2-div').length === 1 ){
          $(this).parent().parent().parent().hide(300);
          $(this).parent().find('input').val('');
          return ;
        }
        $(this).parent().remove();
      });
      //二级分类按钮提示框
      $(document).on('mouseenter', '.catalog-level2-btn-plus', function(event){
        $(this).popover('show');
      });
      $(document).on('mouseenter', '.catalog-level2-btn-delete', function(event){
        $(this).popover('show');
      });


      //获取权限
      this.getAllAuthority();

    },
    methods: {
      handleClick(tab, event) {
        if(this.activeName.trim() === 'second'){
          this.getAll2();
        }
      },

      //用户添加角色
      async updateRole(e){
        let url = 'api/user/updateRole';
        let data = { userId: this.user.id, roleIds: '' };

        let roleIds = '';
        let roleIdsList = [];
        let roleList = [];
        this.chooseRoles.forEach(item => {
          let find = this.roles.find(item2 => item2.id === item);
          if(find !== null && find!== undefined){
            roleIds += find.id + '-';
            roleIdsList.push(find.id);
            roleList.push(find);
          }
        });

        //查看是否修改
        let checkList = this.user.roles;
        let checkList2 = [];
        if(checkList === null || checkList === undefined){
          checkList = [];
        }else{
          checkList.forEach(item => {
            checkList2.push(item.id)
          })

        }

        let roleIdsList2 = Array.from(new Set(roleIdsList));
        // console.log(authIdsList2.sort())


        roleIdsList2.sort();
        checkList2.sort();

        // checkList2.sort(function (a, b) { //a, b 都为数组元素     this.announcements 是数组
        //   let index1 = a.id;    //负数变为降序 ，数据直接比较为升序
        //   let index2 = b.id;
        //   return index1 - index2
        // });
        // roleList2.sort(function (a, b) { //a, b 都为数组元素     this.announcements 是数组
        //   let index1 = a.id;    //负数变为降序 ，数据直接比较为升序
        //   let index2 = b.id;
        //   return index1 - index2
        // });


        console.log(checkList2)
        console.log(roleIdsList2)

        if(JSON.stringify(checkList2) === JSON.stringify(roleIdsList2)){
          this.$message.warning('请先修改数据！');
          return;
        }


        this.isLoad = true;
        $(e.target).attr("disabled", "disabled");
        data.roleIds = roleIds;

        await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === '101') {
              this.$message.success('成功修改');
              //更新数据
            }else if(response.data.code === '102'){
              this.$message.warning(response.data.message);
            }
          }
        );
        this.isLoad = false;
        $(e.target).removeAttr("disabled");
      },
      //用户查找
      findItem2(){//

        this.checkName2 = this.checkName2.trim();
        if(this.checkName2 === '' || this.checkName2 === null || this.checkName2 ===  undefined ){
          this.$message.warning('请输入要查找的用户');
          return;
        }
        let data = { name: this.checkName2 };
        const url = 'api/user/find';
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101' || response.data.code === '102'){

              console.log(response.data.extend);
              if(response.data.extend === null || response.data.extend === undefined){
                this.$message.warning('无此用户');
                this.hasUser = false;
                return;
              }else{
                this.user = response.data.extend;
                //设置已选角色
                let list = this.user.roles;
                this.chooseRoles = [];
                if(list === null || list === undefined || list.length === 0){
                  this.user.roles = [];
                }else{
                  list.forEach(item => {
                    this.chooseRoles.push(item.id);
                  });
                }

                this.hasUser = true;

              }
            }
          }
        );
      },



      getAllAuthority(){
        const url = 'api/authority/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){
              this.authorities = response.data.extend;
              if(this.authorities == null || this.authorities === undefined || this.authorities === ''){
                this.authorities  = [];
              }
              this.authorities.forEach(item => {
                if(item.level+ '' === '2'){//叶子权限
                  this.authorities3.push(item);
                }
              });
              this.authorities3Copy = this.authorities3;
            }
          }
        )
      },
      //获取所有角色
      getAll(){
        const url = 'api/role/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){
              const list = response.data.extend;
              if(list === null|| list === undefined || list.length < 1){
                this.roleList = [];
              }else{
                this.roleList = list;
              }
            }
          }
        )
      },
      //获取所有角色
      getAll2(){
        const url = 'api/role/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){
              const list = response.data.extend;
              if(list === null|| list === undefined || list.length < 1){
                this.roles = [];
              }else{
                this.roles = list;
              }
            }
          }
        )
      },
      //查找信息
      findItem(){//

        this.checkName = this.checkName.trim();
        if(this.checkName === '' || this.checkName === null || this.checkName ===  undefined ){
          this.$message.warning('请输入要查找的角色');
          return;
        }
        let data = { name: this.checkName.trim() };
        const url = 'api/role/find';
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101' || response.data.code === '102'){

              if(response.data.extend === null || response.data.extend.length === 0){
                this.$message.warning('暂无数据');
                this.roleList = [];
                return;
              }
              this.roleList = response.data.extend;
            }
          }
        );
      },

      //勾选
      changeChoose(val){
        this.chooseList = val;
      },
      async removeNode(index, data) {//删除该节点


        const reqData = { ids: data[index].id + '' };
        let tip = '您确定要删除 '+ data[index].roleName + ' 角色吗?';;
        const re1 = await this.$confirm(tip, '提示', {
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
          return false;
        });
        if(!re1){
          return;
        }
        this.loading = true;
        const re = await this.deleteItem(reqData);
        if(re){
          data.splice(index, 1);
        }
        this.loading = false;
      },
      async removeNodes(){//删除选中的子节点

        if(this.chooseList === null || this.chooseList === undefined || this.chooseList.length <= 0){
          this.$message({
            message: '请先勾选需要删除的属性',
            type: 'warning'
          });
          return;
        }

        //构造数据
        let ids = '';
        let names = '';
        let indexs = [];
        console.log(this.chooseList)
        this.chooseList.forEach(item => {
          const index = this.roleList.findIndex(item2 => item2.id === item.id);
          indexs.push(index);
          names += item.roleName + '-';
          ids += item.id + '-';
          // ids += item.date + '-';
        });
        console.log(ids + names  + indexs);

        //处理数据
        names = names.substring(0, names.length-1);
        ids = ids.substring(0, ids.length-1);

        const re1 = await this.$confirm('您要删除 '+ names + ' 角色信息吗？', '提示', {
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
          return false;
        });
        if(!re1){
          return;
        }

        this.loading = true;
        let reqData = { ids: ids };
        const re = await this.deleteItem(reqData);
        if(re){
          //移除节点
          //更新数据
          // let i = 0;
          // indexs.forEach(index => {
          //   this.roleList.splice(index-i,1);//删除使原数组下标 -1
          //   i++
          // });
          indexs = indexs.sort();
          for(let i = 0; i < indexs.length ; i++){
            this.roleList.splice(indexs[indexs.length - 1 - i]);
          }
        }
        this.loading = false;
      },
      async deleteItem(data){
        let url = 'api/role/delete';
        return await axios.post(url,qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              return true;
            }else{
              this.$message({
                message: '删除失败!',
                type: 'error'
              });
              return false;
            }
          }
        )
      },
      //更新数据
      async updateItem(e){
        let url = 'api/role/update';
        let data = '';

        //查重
        if(this.roleName1.trim() !== this.data1.roleName){
          const re = await this.nameChange();
          if (!re) {
            return false;
          }
        }

        data = { roleName: this.roleName1.trim(), id: parseInt(this.data1.id),oldName: this.data1.roleName,
          description: this.description, authIds: '' };

        let authIds = '';
        let authIdsList = [];
        let authList = [];
        let authorities3 = [];
        this.chooseAuthorities.forEach(item => {
          let find = this.authorities3.find(item2 => item2.id === item);
          if(find !== null && find!== undefined){
            authorities3.push(find);
            authIds += find.id + '-';
            authIdsList.push(find.id);
            authList.push(find);
          }
        });

        //找菜单
        let authorities2 = [];
        if(authorities3.length > 0){
          authorities3.forEach(item => {
            let find = this.authorities.find(item2 => item2.id === item.pid);
            if(find !== null && find!== undefined){
              authorities2.push(find);
              authIds += find.id + '-';
              authIdsList.push(find.id);
              authList.push(find);
            }
          })
        }
        let authorities1 = [];
        if(authorities2.length > 0){
          authorities2.forEach(item => {
            let find = this.authorities.find(item2 => item2.id === item.pid);if(find !== null && find!== undefined){
              authorities1.push(find);
              authIds += find.id + '-';
              authIdsList.push(find.id);
              authList.push(find);
            }
          })
        }


        //查看是否修改
        let checkList = this.data1.authorities;
        let checkList2 = [];
        if(checkList === null || checkList === undefined){
          checkList = [];
        }else{
          checkList.forEach(item => {
            checkList2.push(item.id)
          })

        }
        // JSON.stringify(baseAttrs2.sort()) === JSON.stringify(attrsTemp.sort())
        // console.log(authorities3)
        // console.log(this.chooseAuthorities)
        // console.log(this.data1)
        // console.log(checkList2.sort())
        // console.log(authIdsList)

        let authIdsList2 = Array.from(new Set(authIdsList));
        let authList2 = Array.from(new Set(authList));
        // console.log(authIdsList2.sort())
        console.log(authList2);

        if(this.data1.roleName === this.roleName1.trim() && this.data1.description + '' === this.description
          && JSON.stringify(checkList2.sort()) === JSON.stringify(authIdsList2.sort())){
          this.$message.warning('请先修改数据！');
          return;
        }


        data.authIds = authIds;

        this.isLoad = true;
        $(e.target).attr("disabled", "disabled");

        await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === '101') {
              this.$message.success('成功修改');
              //关闭横态框
              this.openMymodel();
              //更新数据
              this.data1.roleName = data.roleName;
              this.data1.description = data.description;
              this.data1.authorities = authList2;
            }else if(response.data.code === '102'){
              this.$message.warning(response.data.message);
            }
          }
        );
        this.isLoad = false;
        $(e.target).removeAttr("disabled");
      },
      //添加
      async itemAdd(e){
        try {
          let url = 'api/role/add';

          console.log(this.chooseAuthorities)
          //看是否有权限
          if(this.chooseAuthorities === null || this.chooseAuthorities === undefined || this.chooseAuthorities.length < 1){
            this.$message.warning('请先赋予权限');
            return;
          }
          if (this.roleName1.trim() === "" || this.roleName1 === null || this.roleName1 === undefined) {
            this.$message.warning('name不能为空');
            this.roleNameErrorTip = 'name不能为空';
            this.roleNameErrorFlag = true;
            return;
          }
          //查重
          const result = await this.nameChange();
          if (!result) {
            return;
          }

          const data = { roleName: this.roleName1.trim(), description: this.description, authIds: '' }
          // let authorities = [];//携带不了数组
          // this.chooseAuthorities.forEach(item => {
          //   let find = this.authorities.find(item2 => item2.id + '' === item + '');
          //   if(find !== null || find !== undefined){
          //     const authority = { id: find.id, authName: find.authName, description: find.description, icon: find.icon, resource: find.resource, level: find.level,pId: find.pid }
          //     authorities.push(authority);
          //   }
          // });
          // data.authorities = authorities;

          let authIds = '';
          let authIdsList = [];
          let authorities3 = [];
          this.chooseAuthorities.forEach(item => {
            let find = this.authorities3.find(item2 => item2.id === item);
            if(find !== null && find!== undefined){
              authorities3.push(find);
              authIds += find.id + '-';
              authIdsList.push(find);
            }
          });
          //找菜单
          let authorities2 = [];
          if(authorities3.length > 0){
            authorities3.forEach(item => {
              let find = this.authorities.find(item2 => item2.id === item.pid);
              if(find !== null && find!== undefined){
                authorities2.push(find);
                authIds += find.id + '-';
                authIdsList.push(find);
              }
            })
          }

          let authorities1 = [];
          if(authorities2.length > 0){
            authorities2.forEach(item => {
              let find = this.authorities.find(item2 => item2.id === item.pid);if(find !== null && find!== undefined){
                authorities1.push(find);
                authIds += find.id + '-';
                authIdsList.push(find);
              }
            })
          }

          data.authIds = authIds;
          // let arr3 = [...authIdsList];
          let arr3 = Array.from(new Set(authIdsList));

          this.isLoad = true;
          $(e.target).attr("disabled", "disabled");
          await axios.post(url, qs.stringify(data)).then(
            response => {
              if (response.data.code === '101') {
                // alert('成功处理');
                this.$message.success('成功添加');
                this.data1.authorities = arr3;

              } else if (response.data.code === '102') {
                this.$message.warning(response.data.message);
              }
            }
          );
        }finally {
          this.isLoad = false;
          $(e.target).removeAttr("disabled");
        }
      },

      //name输入检查是否已经存在
      async nameChange(){
        //清空设置
        this.roleNameErrorFlag = false;

        const name = this.roleName1.trim();
        //brandName 为空
        if(name === '' || this.roleName1 === null || this.roleName1 === undefined){
          return false;
        }
        const url = 'api/role/nameCheck';
        const data = { name: name };
        if(this.flag){//true 为添加横态框，false 为更新横态框
          return await this.checkNameFun(url, data);
        }else{//更新
          if(this.roleName1.trim() !== this.data1.roleName){
            //检查
            // this.checkNameFun(url, data);//异步方法 返回数据有点反常
            // return this.result;
            return await this.checkNameFun(url, data);
          }
        }
        return false;
      },
      //检查name是否重复
      async checkNameFun(url, data){
        return await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === "101" && response.data.extend + '' === "0") {//无该品牌记录
              this.roleNameErrorFlag = false;
              return true;
            }else if(response.data.code === "101" && response.data.extend + '' === "1"){//已经存在该品牌
              this.roleNameErrorFlag = true;
              this.roleNameErrorTip = 'name 已经存在';
              // this.$message.warning('name 已经存在');
            }
            return false;
          }
        );
      },

      modelOpenNode(index,data,type){//type 1--编辑 2 -- 添加
        console.log(data)
        this.data1 = data[index];

        if(type === 1){//编辑
          this.flag = false;
          this.roleName1 = this.data1.roleName;
          this.description = this.data1.description;

          let list = this.data1.authorities;
          console.log(this.data1)
          this.chooseAuthorities = [];
          if(list != null || list !== undefined || list.length > 1){
            list.forEach(item => {
              if(item.level === 2){
                this.chooseAuthorities.push(item.id);
              }
            })
          }
          // console.log(list)
          // console.log(this.data1)
        }else if(type === 2){
          this.flag = true;
          this.roleName1 = '';
          this.description = '';
          console.log(this.chooseAuthorities)

          this.chooseAuthorities = [];
        }
        this.openMymodel();
      },

      // levelAddOpen(type){
      //   this.flag = true;
      //   this.roleName1 = '';
      //   this.description = '';
      //   this.resource = '';
      //   this.openMymodel();
      // },
      //横态框
      openMymodel(){
        this.isShowMymodel = !this.isShowMymodel;
      },

    }

  }
</script>

@import "@/assets/css/awesome.css";
<style>
  .role-item {

  }

  .role-item-title {
    font: 18px 'yunyuan';
    line-height: 36px;
    height: 36px;
    /*background-color: #aaa;*/
    box-shadow: 1px 1px 7px 1px #dfdfdf;
  }

  .role-item-title span {
    padding-left: 15px;
  }

  .role-item-main {
    margin: 10px 10px 10px 10px;
    height: 640px;
    /*background-color: #60AD94;*/
    overflow: auto;
    position: relative;
  }
  .role-item-choose {
    font: 16px 'yunyuan';
    margin-left: 10px;
    padding: 10px 0 10px 40px;
    /*background-color: #60AD94;*/
  }

  .role-item-choose-title {
    padding: 5px 10px;
    font: 18px '微软雅黑';
    font-weight: 500;
    color: #17346C;
  }

  .role-item-main-left{
    display: inline-block;
    width: 130px;
    border-right: 1px solid #DDDDDD;
    height: 100%;
    font: 14px 'yunyuan';
    text-align: center;
  }
  .role-item-main-left ul li{
    /*border-bottom: 1px solid #DDDDDD;*/
    /*padding: 5px 10px;*/
    margin: 10px 0;
  }
  .span-btn{
    /*background-color: #2e6da4;*/
    /*color: #fff;*/
    /*padding: 10px;*/
  }
  .role-item-main-right{
    display: inline-block;
    position: absolute;
    /*background-color: #60AD94;*/
    left: 120px;
    right: 10px;
    top: 10px;
    bottom: 15px;
    overflow: auto;
    /*padding: 10px;*/
  }
  .span-tip{
    padding: 10px;
    font: 14px 'yuanyuan';
    color: #17346C;
  }
  .ztree-node-span{
    padding: 0 20px;
    /*font-size: 11px;*/
    /*line-height: 16px;*/
    /*height: 15px;*/
  }
  .ztree-node-span span{
    font-size: 10px;
    /*font-weight: 300;*/
    /*line-height: 15px;*/
  }
  .role-item-main-right-tree{
    /*background-color: #f7e1b5;*/
    padding: 0 100px;
  }
  .myModal{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(43,43,43,0.5);
  }
  .myModal-div{
    margin: 50px auto 0;
    width: 800px;
    /*height: 300px;*/
    background-color: #fff;
    box-shadow: 2px 2px 10px 2px #505050;
  }
  .myModal-title{
    border-bottom: 1px solid #E5E5E5;
    height: 60px;
    font: 20px 'yunyuan';
    line-height: 60px;
    padding: 0 20px;
    color: #17346C;
  }
  .myModal-title-left{
    float: left;
  }
  .myModal-title-right{
    float: right;
    font-size: 16px;
    color: #aaa;
  }
  .myModal-title-right span:hover{
    cursor: pointer;
    color: darkred;
  }
  .catalog-form-div{
    font: 18px 'yunyuan';
    color: #17346C;
    width: 100%;
    /*background-color: #f7e1b5;*/
    /*padding: 10px;*/
    padding-bottom: 20px;
  }
  .catalog-input-div{
    position: relative;
  }
  /*.catalog-input-div span{*/
    /*font-size: 15px;*/
    /*!*color: #000;*!*/
  /*}*/
  .catalog-name{
    position: absolute;
    /*display: none;*/
    left: 100px;
    top: 10px;
  }
  .catalog-input{
    display: inline-block;
    width: 400px;
    margin: 5px 0 5px 190px;
  }
  .catalog-form-div .form-group label{
    /*margin: 0 10px 0 150px;*/
    /*background-color: #60AD94;*/
  }
  .catalog-level1,
  .catalog-level2{
    margin: 10px 0;
    padding: 10px;
    /*-ms-overflow-style: none;  !*IE 10+*!*/
    /*scrollbar-width: none;  */
  }
  .catalog-level1-btn,
  .catalog-level2-btn{
    padding: 0 10px;
  }
  .mybtn-span{
    width: 400px;
    color: #fff;
    background-color: #58BF9D;
    text-align: center;
    padding: 5px 0;
    margin-left: 190px;
  }
  .mybtn-span:hover{
    background-color: #60AD94;
    cursor: pointer;
  }
  .catalog-level2-div{
    display: inline-block;
  }
  /*.catalog-level2-div span{*/
    /*display: none;*/
  /*}*/
  .catalog-level2{
    max-height: 450px;
    overflow: auto;
    min-height: 100px;
  }
  .select-item-choose{
    background-color: red;
    display: inline-block;
    width: 200px;
    height: 30px;
  }

</style>
