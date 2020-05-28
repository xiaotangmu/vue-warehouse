<template>

  <div class="product-catalog thumbnail" v-loading="loading">
    <div class="product-catalog-choose-div" >
      <div class="product-catalog-choose-title">分类选择<span class="glyphicon glyphicon-question-sign" style="padding-left: 10px"></span></div>
      <div class="product-catalog-choose thumbnail">
        <div style="display: inline-block; position: relative;margin-right: 20px;">
          <span class="select-title">一级分类</span>
          <div class="select-item-div thumbnail" @click="downListShow($event, 1)" tabindex="1" @blur="blurDownList($event,1)">
            <span class="select-item-span glyphicon glyphicon-triangle-bottom" ></span>
            <span style="padding: 2px 5px" class="select-item thumbnail">{{level1Name2}}</span>
            <div v-if="level1sFlag" class="myScrollBox down-list-content-div thumbnail ">
              <div @click="optionChoose($event, 1, item)" class="down-list-content-item" v-for="(item,index) in level1s" :key="index" :value="item.id">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div style="display: inline-block; position: relative;margin-right: 20px;">
          <span class="select-title">二级分类</span>
          <div class="select-item-div thumbnail" @click="downListShow($event,2)" tabindex="1" @blur="blurDownList($event,2)">
            <span class="select-item-span glyphicon glyphicon-triangle-bottom" ></span>
            <span style="padding: 2px 5px" class="select-item thumbnail">{{level2Name2}}</span>
            <div v-if="level2sFlag" class="myScrollBox down-list-content-div thumbnail ">
              <div @click="optionChoose($event, 2, item)" class="down-list-content-item" v-for="(item,index) in level2s" :key="index" :value="item.id">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div style="display: inline-block; position: relative;margin-right: 20px;">
          <span class="select-title">三级分类</span>
          <div class="select-item-div thumbnail" @click="downListShow($event,3)" tabindex="1" @blur="blurDownList($event,3)">
            <span class="select-item-span glyphicon glyphicon-triangle-bottom" ></span>
            <span style="padding: 2px 5px" class="select-item thumbnail">{{level3Name2}}</span>
            <div v-if="level3sFlag" class="myScrollBox down-list-content-div thumbnail ">
              <div @click="optionChoose($event, 3, item)" class="down-list-content-item" v-for="(item,index) in level3s" :key="index" :value="item.id">{{item.name}}</div>
            </div>
          </div>
        </div>


      </div>

    </div>

    <div class="product-catalog-main thumbnail">
      <div class="product-catalog-main-left">
        <ul class="">
          <li><span @click="levelAddOpen(1)" class="span-btn btn btn-primary span-btn-catalog1-plus">添加一级分类</span></li>
          <li><span @click="levelAddOpen(2)" class="span-btn btn btn-primary span-btn-catalog1-plus">添加二级分类</span></li>
          <li><span @click="levelAddOpen(3)" class="span-btn btn btn-primary span-btn-catalog1-plus">添加三级分类</span></li>
        </ul>
      </div>
      <div class="product-catalog-main-right">
        <div class="product-catalog-main-right-tree">
          <!--<ul id="treeDemo" class="ztree">-->



          <!--</ul>-->
          <!--<el-tree style="font-size: 14px;" :data="dataZtree" show-checkbox node-key="ztreeId" :expand-on-click-node="false" highlight-current :props="defaultProps" @node-click="handleNodeClick">-->
          <el-tree v-loading="loading2" style="font-size: 14px;" :data="dataZtree" show-checkbox node-key="ztreeId" :expand-on-click-node="false" highlight-current :props="defaultProps" >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
          <span style="position: relative;right: -200px">
            <el-tooltip content="编辑" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => modelOpenNode(node,data,1)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="data.level !== 3" content="添加" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => modelOpenNode(node,data,2)">
            <i class="el-icon-plus"></i>
          </el-button>
            </el-tooltip>
            <el-tooltip v-if="data.level !== 3" content="删除选中子节点" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => removeNodes(node, data)">
            <i class="el-icon-minus"></i>
          </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="bottom" effect="light">
              <el-button
                type="text"
                @click="() => removeNode(node, data)">
            <i class="el-icon-delete"></i>
          </el-button>
            </el-tooltip>

            </span>


            </span>
          </el-tree>


        </div>
      </div>
    </div>

    <!--<input type="hidden" id="input_hidden" data-toggle="modal" data-target="#myModal"/>-->
    <!-- Modal 横态框 -->
    <transition name="tip-alert">
    <div v-if="isShowMymodel" class="myModal" style="z-index: 2">
      <div class="myModal-div thumbnail">
        <div class="myModal-title">
          <div class="myModal-title-left">添加分类</div>
          <div  class="myModal-title-right"><span @click="openMymodel()" class="glyphicon glyphicon-remove catalog-plus-modal-remove"></span></div>
        </div>
        <div class="myModal-content">
          <div class="catalog-form-div">
            <div class="catalog-level1 ">
              <div class="catalog-input-div">
                <label class="catalog-name">一级分类</label>
                <!--<input v-model="level1Name" :disabled="level1" type="text" class="form-control catalog-input" placeholder="干货">-->
                <!--<span class="catalog-level1-btn glyphicon glyphicon-plus btn btn-primary" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class='btn-span2'>添加二级分类</span>" data-trigger="hover"></span>-->
                <input v-model="level1Name" :disabled="!level1" @change="nameChange1()" class="catalog-level1Name form-control catalog-input" type="text" placeholder="美宜佳"/>
                <span v-show="nameOkSign1" class="glyphicon glyphicon-ok-sign ok-sign brand-name-ok-sign" aria-hidden="true"></span>
                <span v-show="nameRemoveSign1" class="brand-name-remove-sign remove-sign">
                    <span class="glyphicon glyphicon-remove-sign " aria-hidden="true"></span>
                    <span v-text="nameRemoveSignTip1"></span>
                  </span>
              </div>
            </div>
            <div v-if="level2 || level3" class="catalog-level1 ">
              <div class="catalog-input-div">
                <label class="catalog-name">二级分类</label>
                <!--<input v-model="level2Name" :disabled="!level3" type="text" class="form-control catalog-input" placeholder="干货">-->
                <!--<span class="catalog-level1-btn glyphicon glyphicon-plus btn btn-primary" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class='btn-span2'>添加二级分类</span>" data-trigger="hover"></span>-->
                <input v-model="level2Name" :disabled="level3" @change="nameChange2()" class="catalog-level2Name form-control catalog-input" type="text" placeholder="美宜佳"/>
                <span v-show="nameOkSign2" class="glyphicon glyphicon-ok-sign ok-sign brand-name-ok-sign" aria-hidden="true"></span>
                <span v-show="nameRemoveSign2" class="brand-name-remove-sign remove-sign">
                    <span class="glyphicon glyphicon-remove-sign " aria-hidden="true"></span>
                    <span v-text="nameRemoveSignTip2"></span>
                  </span>
              </div>
            </div>
            <div v-if="level3" class="catalog-level1 ">
              <div class="catalog-input-div">
                <label class="catalog-name">三级分类</label>
                <!--<input v-model="level2Name" :disabled="!level3" type="text" class="form-control catalog-input" placeholder="干货">-->
                <!--<span class="catalog-level1-btn glyphicon glyphicon-plus btn btn-primary" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class='btn-span2'>添加二级分类</span>" data-trigger="hover"></span>-->
                <input v-model="level3Name" @change="nameChange3()" class="catalog-level3Name form-control catalog-input" type="text" placeholder="美宜佳"/>
                <span v-show="nameOkSign3" class="glyphicon glyphicon-ok-sign ok-sign brand-name-ok-sign" aria-hidden="true"></span>
                <span v-show="nameRemoveSign3" class="brand-name-remove-sign remove-sign">
                    <span class="glyphicon glyphicon-remove-sign " aria-hidden="true"></span>
                    <span v-text="nameRemoveSignTip3"></span>
                  </span>
              </div>
            </div>

            <div class="catalog-level1 ">
              <div class="catalog-input-div">
                <!--<label class="catalog-name">一级分类</label>-->
                <!--<span  role="btn" class="thumbnail mybtn-span" >添加</span>-->
                <div v-show="flag" @click="itemAdd($event)" class="thumbnail mybtn-span mybtn-span my-modal-form-submit form-control btn btn-primary">
                  <span v-show="!isLoad" >添加</span>
                  <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                    <div class='loader'></div>
                  </div>
                </div>

                <div v-show="!flag" @click="updateItem($event)" class="thumbnail mybtn-span mybtn-span my-modal-form-submit form-control btn btn-info">
                  <span v-show="!isLoad">更新</span>
                  <div style="margin-top: -5px" v-show="isLoad" class='load-container'>
                    <div class='loader'></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        </div>
      </div>
    </transition>

    <!-- 提示框 -->
    <transition name="tip-alert">
      <div v-if="tipAlertShow === '000'" id="brand-tip-alert" class="alert alert-danger tip-alert" role="alert">
        <!--<span class="glyphicon glyphicon-remove-circle tip-alert-img" aria-hidden="true"></span>-->
        <span class="tip-alert-message">
            <strong>{{tipMessage}}</strong>
          </span>
      </div>
      <div v-if="tipAlertShow === '111'" class="alert alert-success tip-alert" role="alert">
        <!--<span class="glyphicon glyphicon-remove-circle tip-alert-img" aria-hidden="true"></span>-->
        <span class="tip-alert-message">
            <strong>{{tipMessage}}</strong>
          </span>
      </div>
      <div v-if="tipAlertShow === '222'" class="alert alert-warning tip-alert" role="alert">
        <!--<span class="glyphicon glyphicon-remove-circle tip-alert-img" aria-hidden="true"></span>-->
        <span class="tip-alert-message">
            <strong>{{tipMessage}}</strong>
          </span>
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
        tipMessage: 'hello',//提示框信息
        tipAlertShow: '',//000 -- 错误；111 -- 成功；222 -- 警告
        isLoad: false,
        level1: false,//判断当前横态框是哪级分类在操作
        level2: false,
        level3: false,
        level1Name: '',//记录横态框数据
        level2Name: '',
        level3Name: '',
        level1Name2: '',//记录下拉列表数据
        level2Name2: '',
        level3Name2: '',
        level1Id: '',
        level2Id: '',
        level3Id: '',
        nameOkSign1: false,//横态框提示信息
        nameRemoveSign1: false,
        nameRemoveSignTip1: '',
        nameOkSign2: false,
        nameRemoveSign2: false,
        nameRemoveSignTip2: '',
        nameOkSign3: false,
        nameRemoveSign3: false,
        nameRemoveSignTip3: '',
        flag: true,
        // flag1: true,//记录更新或添加横态框
        // flag2: true,
        // flag3: true,
        level1s: [],//下拉列表数据
        level2s: [],
        level3s: [],
        level1sFlag: false,//判断是否通过click 事件来获取下拉列表数据 -- 加载/选择
        level2sFlag: false,
        level3sFlag: false,
        isShowMymodel: false,//横态框是否显示
        // level2sAll: [],//记录所有二级数据
        level3sAll: [],//记录所有三级数据

        //ztree
        zNodes:[],
        defaultProps: {
          children: 'list',
          label: 'name',
          value: 'ztreeId',
        },
        dataZtree: [],
        level1Id2: '',
        level2Id2: '',
        level3Id2: '',
        level1Name3: '',
        level2Name3: '',
        level3Name3: '',
        node1: '',//缓存当前要操作的节点 和 数据 -- 地址传递 数据都是字符串类型 不能直接和数据比较
        data1: '',
        result: false,//异步方法返回
        openType: 1,//1 -- 左边添加进入，2 -- tree 进入横态框

        loading: false,
        loading2: false,
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



      //获取一级分类
      this.getLevel1s();

    },
    methods: {

      modelOpenNode(node,data,type){//type 1--编辑 2 -- 添加
        const level = parseInt(data.level);
        const id = parseInt(data.id);
        if(level === 3){
          const parent = node.parent;
          const parentData = node.parent.data;
          this.level1Name = parent.parent.data.name;
          this.level2Name = parentData.name;
          this.level2Id2 = parseInt(parentData.id);
          this.level1Id2 = parseInt(parent.parent.data.id);
          this.level3Name = data.name;
          this.level3Name3 = data.name;//保留用来更新比对
          this.level3Id2 = id;
        }else if(level === 2){
          this.level1Name = node.parent.data.name;
          this.level2Id2 = parseInt(data.id);
          this.level1Id2 = parseInt(node.parent.data.id);
          this.level2Name = data.name;
          this.level2Name3 = data.name;
          this.level2Id2 = id;
          this.level3Name = '';
        }else if(level === 1){
          this.level1Name = data.name;
          this.level1Name3 = data.name;
          this.level1Id2 = id;
          this.level2Name = '';
        }

        if(type === 1){//编辑
          this.flag = false;
          this.openMymodelData(level, 2);
        }else if(type === 2){
          this.flag = true;
          this.openMymodelData(level+1, 2);
        }

        this.openMymodel();
        this.node1 = node;
        this.data1 = data;

      },
      // editNode(data){
      //   data.name = 'hello';
      // },
      // appendNode(data) {
      //   const newChild = { id: 'hhhh', name: 'testtest', children: [] };
      //   if (data.list === null) {
      //     this.$set(data, 'children', []);
      //   }
      //   data.list.push(newChild);
      //   // this.$refs['tree'].updateKeyChildren(data.id,data.children.push(newChild));
      // },
      // removeNode(node, data) {
      //   const parent = node.parent;
      //   const children = parent.data.list || parent.data;
      //   const index = children.findIndex(d => d.id === data.id);
      //   children.splice(index, 1);
      // },
      // removeNodes(node, data){
      //   // alert(node.checked);
      //   node.childNodes.forEach(item => {
      //     // alert(item.checked);
      //     if(item.checked === true){
      //       // item.data.name = 'hello';
      //       item.remove();
      //     }
      //   })
      // },
      async removeNode(node, data) {//删除该节点

        const level = parseInt(data.level);
        const id = parseInt(data.id);
        const strId = data.id + '';
        let reqData = '';
        if(level === 1){
          reqData = { id: id, name: data.name };
        }else if(level === 2){
          reqData = { ids: strId, names: data.name, ztreeIds: data.ztreeId, catalog1Id: parseInt(node.parent.data.id) };
        }else if(level === 3){
          reqData = { ids: strId, names: data.name, ztreeIds: data.ztreeId, catalog1Id: parseInt(node.parent.parent.data.id), catalog2Id: parseInt(node.parent.data.id) }
        }

        const re1 = await this.$confirm('您确定要删除 '+ data.name + ' 分类信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
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
        const re = await this.deleteItem(level, reqData).then(function (result) {
          return result;
        });

        if(re){
          let list = [];
          //清除数据
          if(level === 1){
            this.level1Name2 = '';
            this.level1Id = '';
            this.level2s = [];
            this.level2Name = '';
            this.level2Id = '';
            this.level3s = [];
            this.level3Name2 = '';
            this.level3Id = '';

            this.level1s.forEach(item => {
              if(item.id !== id){
                list.push(item);
              }
            });
            this.level1s = list;

          }else if(level === 2){
            if(this.level2Id + '' === strId){
              this.level2Id = '';
              this.level2Name2 = '';
              this.level3s = [];
              this.level3Id = '';
              this.level3Name2 = '';
            }
            this.level2s.forEach(item => {
              if(item.id  !== id){
                list.push(item);
              }
            });
            this.level2s = list;
          }else if(level === 3){
            this.level3s.forEach(item => {
              if(item.id  !== id){
                list.push(item);
              }
            });
            this.level3s = list;

            let list3 = [];
            //更新level3sAll
            this.level3sAll.forEach(item => {
              if(item.id + '' !== data.id + ''){
                list3.push(item);
              }
            });
            this.level3sAll = list3;
          }
          node.remove();

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message({
            message: '删除失败!',
            type: 'error'
          });
        }
        this.loading = false;


      },
      async removeNodes(node, data){//删除选中的子节点
        const level = parseInt(data.level);
        const id = parseInt(data.id);

        let checkNodes = [];//记录勾选节点 node
        let catalogs = [];
        let catalog1Id = '';
        let catalog2Id = '';
        let reqData = {};
        let idsStr = '';
        let namesStr = '';
        let ztreeIdsStr = '';

        node.childNodes.forEach(item => {
          if(item.checked === true){
            idsStr += item.data.id + '-';
            namesStr += item.data.name + '-';
            ztreeIdsStr += item.data.ztreeId + '-';
            // item.remove();
            catalogs.push(item.data);
            checkNodes.push(item);
          }
        });
        if(catalogs.length <= 0){//判断是否有勾选的数据
          this.$message({
            message: '请先选择需要删除的子类',
            type: 'warning'
          });
          return;//没有勾选子类
        }

        //截取字符串
        idsStr = idsStr.substring(0, (idsStr.length -1));
        namesStr = namesStr.substring(0, (namesStr.length -1));
        ztreeIdsStr = ztreeIdsStr.substring(0, (ztreeIdsStr.length -1));

        const re1 = await this.$confirm('您要删除 '+ data.name + ' 分类的子类：' + namesStr +' 的信息吗?', '提示', {
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

        if(level === 1){
          catalog1Id = id;
          reqData = { ids: idsStr, names: namesStr, ztreeIds: ztreeIdsStr, catalog1Id: catalog1Id };
        }else if(level === 2){
          catalog2Id = id;
          catalog1Id = parseInt(node.parent.data.id);
          reqData = { ids: idsStr, names: namesStr, ztreeIds: ztreeIdsStr, catalog1Id: catalog1Id, catalog2Id: catalog2Id};
        }
        const re = await this.deleteItem(level + 1, reqData).then(function (result) {
          return result;
        });
        if(re){
          let list2 = [];
          if(level === 1){

            this.level2s.forEach(c => {
              let f = false;
              catalogs.forEach(item => {
                if(c.id + '' === item.id + ''){
                  f = true;
                }
              });
              if(!f){
                list2.push(c);
              }
            });
            this.level2s = list2;
            //直接清空数据
            this.level3s = [];
            this.level2Id = '';
            this.level3Id = '';
            this.level2Name2 = '';
            this.level3Name2 = '';
          }else if(level === 2){
            if(this.level2Id + '' === data.id + ''){//判断是否需要更新下拉列表数据
              let f = false;
              this.level3s.forEach(c => {
                catalogs.forEach(item => {
                  if(c.id + '' === item.id + ''){
                    f = true;
                  }
                });
                if(!f){
                  list2.push(c)
                }
              });
              this.level3s = list2;
            }

            //更新this.level3sAll
            let list3 = [];
            this.level3sAll.forEach(item => {
              let f = false;
              catalogs.forEach(c => {
                if(item.id + '' === c.id + ''){
                  f = true;
                }
              });
              if(!f){
                list3.push(item);
              }
            });
            this.level3sAll = list3;
          }

          //移除节点
          checkNodes.forEach(item => {
            item.remove();
          });

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message({
            type: 'danger',
            message: '删除失败!'
          });
        }
        this.loading = false;

      },
      async deleteItem(level,data){
        let url = '';
        // let data = '';
        if(level === 1){//一级分类
          url = 'api/catalog1/delete';
          // data = {id: this.data1.id, name: this.data1.name, ztreeId: this.data1.ztreeId};
        }else if(level === 2){//二级分类
          url = 'api/catalog2/delete';
          // data = {id: this.data1.id, name: this.data1.name, ztreeId: this.data1.ztreeId, catalog1Id: this.data1.catalog1Id };
        }else if(level === 3){//三级分类
          url = 'api/catalog3/delete';
          // data = {id: this.data1.id, name: this.data1.name, ztreeId: this.data1.ztreeId, catalog1Id: this.data1.catalog1Id, catalog2Id: this.data1.catalog2Id};
        }
        return await axios.post(url,qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.result = true;
              return true;
            }else{
              this.result = false;
              return false;
            }
          }
        )
      },
      // handleNodeClick(obj, node, data) {
      //   console.log(node);
      //   console.log(data);
      // },


      //下拉列表数据加载
      getLevel1s(){
        const url = 'api/catalog1/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){

              this.level1s = response.data.extend;

            }
          },
          error => {
            this.tipAlert('服务器异常！', 0);
          }
        );
      },
      async getLevel2s(){
        const url = 'api/catalog2/getAll2';
        const data = {catalog1Id: this.level1Id };
        await axios.get(url, {params: data}).then(
          response => {
            if(response.data.code === '101'){
              // this.level2s = response.data.extend;
              const list = response.data.extend;
              this.refreshLevels(list);
              // this.freshZtree(list);
              this.loading2 = false;
            }
          },
          error => {
            this.tipAlert('服务器异常！', 0);
          }
        )
      },
      getLevel3s(){
        const url = 'api/catalog3/getAll2';
        const data = {catalog2Id: this.level2Id, catalog1Id: this.level1Id };
        axios.get(url, {params: data}).then(
          response => {
            if(response.data.code === '101'){
              // this.level3s = response.data.extend;
              const list = response.data.extend;
              this.refreshLevels(list);
              // this.freshZtree(list);
              this.refreshLevel3();
            }
          },
          error => {
            this.tipAlert('服务器异常！', 0);
          }
        )
      },
      refreshLevels(list){
        this.level2s = [];

        this.level3sAll = [];
        this.zNodes = [];
        let data = '';
        if(list !== null){
          //更新ztree
          list.forEach(item => {
            this.zNodes.push(item);
            if(item.level === 1){
              data = item;
              data.list = [];
            }
            if(item.level === 2){
              this.level2s.push(item);
            }else if(item.level === 3){
              this.level3sAll.push(item);
            }
          });

          if(this.level2s.length > 0){
            this.level2s.forEach(item1 => {
              item1.list = [];
              if(this.level3sAll.length > 0){
                this.level3sAll.forEach(item2 => {
                  if(item1.ztreeId === item2.pid){
                    item1.list.push(item2);
                  }
                })
              }
              if(data.list === null || data.list.length < 0){
                data.list = [];
              }
              data.list.push(item1);
            })
          }
          this.dataZtree = [];
          this.dataZtree.push(data);
          console.log(this.dataZtree)
          $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
        }
      },
      refreshLevel3(){
        this.level3s = [];
        this.level3sAll.forEach(item => {
          if(item.pid === 'catalog2' + this.level2Id){
            this.level3s.push(item);
          }
        })
      },

      //更新数据
      async updateItem(e){
        let url = '';
        let data = '';
        if(this.level1){
          const re = await this.nameChange1().then(function (result) {
            return result;
          });
          if (!re) {
            return false;
          }
          url = 'api/catalog1/update';
          data = { name: this.level1Name.trim(), id: this.level1Id,oldName: this.level1Name3 };
        }else if(this.level2){
          const re = await this.nameChange2().then(function (result) {
            return result;
          });
          if (!re) {
            return false;
          }
          url = 'api/catalog2/update';
          data = { name: this.level2Name.trim(), id: this.level2Id2, catalog1Id: this.level1Id2, oldName: this.level2Name3.trim() };
        }else if(this.level3){
          const re = await this.nameChange3().then(function (result) {
            return result;
          });
          if (!re) {
            return false;
          }
          url = 'api/catalog3/update';
          data = { name: this.level3Name.trim(), id: this.level3Id2,catalog2Id: this.level2Id2, catalog1Id: this.level1Id2,oldName: this.level3Name3 };
        }

        this.isLoad = true;
        $(e.target).attr("disabled", "disabled");

        // this.data1.name = 'tan';
        // console.log(this.dataZtree);
        await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === '101') {
              this.tipAlert('成功修改',1);
              //关闭横态框
              this.openMymodel();
              //更新数据
              if(this.level1){
                const str = this.level1Name.trim();
                this.level1Name2 = str;
                this.data1.name = str;
                this.level1Name3 = str;

                //更新下拉列表数据
                this.getLevel1s();

              }else if(this.level2){
                this.level3s = '';
                this.level3Id = '';
                this.level2Id = parseInt(this.data1.id);
                const str = this.level2Name.trim();
                this.level2Name2 = str;
                this.data1.name = str;
                this.level2Name3 = str;
                this.level2s = [];
                this.node1.parent.data.list.forEach(item => {
                  this.level2s.push(item);
                });

                this.level3Id = '';
                this.level3Name2 = '';
                this.level3s = [];
                this.data1.list.forEach(item => {
                  this.level3s.push(item);
                })
              }else if(this.level3){
                this.level3Id = parseInt(this.data1.id);
                const str = this.level3Name.trim();
                this.level3Name2 = str;
                this.data1.name = str;
                this.level3Name3 = str;
                this.level2Id = parseInt(this.node1.parent.data.id);
                this.level2Name2 = this.node1.parent.data.name;
                this.level3s = [];
                this.node1.parent.data.list.forEach(item => {
                  this.level3s.push(item);
                });

                // this.level3sAll.forEach(item => {
                //   if(item.id + '' === this.data1.id + ''){
                //     item.name = this.data1.name;
                //   }
                // })
              }
            }else if(response.data.code === '102'){
              this.addNameTip(response.data.message);
            }
          }
        );
        this.isLoad = false;
        $(e.target).removeAttr("disabled");
      },
      //添加item
      async itemAdd(e){
        let url = '';
        let data = '';
        if(this.level1){
          if (this.level1Name.trim() === "" || this.level1Name === null || this.level1Name === undefined) {
            this.addNameTip('name不能为空');
            return;
          }
          url = 'api/catalog1/add';
          data = { name: this.level1Name.trim(), pId: 0 ,level: 1};
        }
        if(this.level2){
          if (this.level2Name.trim() === "" || this.level2Name === null || this.level2Name === undefined) {
            this.addNameTip('name不能为空');
            return;
          }
          url = 'api/catalog2/add';
          data = { name: this.level2Name.trim(), catalog1Id: this.level1Id, pId: 'catalog1' + this.level1Id, level: 2 };
        }
        if(this.level3){
          if (this.level3Name.trim() === "" || this.level3Name === null || this.level3Name === undefined) {
            this.addNameTip('name不能为空');
            return;
          }
          url = 'api/catalog3/add';
          if(this.openType === 1){
            data = { name: this.level3Name.trim(), catalog2Id: this.level2Id, pId: 'catalog2' + this.level2Id, catalog1Id: this.level1Id,level: 3 };
          }else if(this.openType === 2){
            data = { name: this.level3Name.trim(), catalog2Id: parseInt(this.data1.id), pId: 'catalog2' + parseInt(this.data1.id), catalog1Id: parseInt(this.node1.parent.data.id),level: 3 };
          }
        }
        // if (this.name.trim() === "" || this.name === null || this.name === undefined) {
        //   this.addNameTip('name不能为空');
        //   return;
        // }

        this.isLoad = true;
        $(e.target).attr("disabled", "disabled");
        await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === '101') {
              // alert('成功处理');
              this.tipAlert('成功添加',1);
              if(this.openType === 2){
                console.log('hello');
                //list 为null 不能直接添加
                if(this.data1.list === null || this.data1.list.length < 0){
                  this.data1.list = [];
                }
                this.data1.list.push(response.data.extend);

              }

              console.log('hello');
              //更新数据
              if(this.level1){
                this.level2s = '';
                this.level3s = '';
                this.level2Id = '';
                this.level3Id = '';
                this.getLevel1s();
              }else if(this.level2){
                this.level3s = '';
                this.level3Id = '';
                // this.getLevel2s();
                if(this.openType === 1){
                  this.getLevel2s();
                }else if(this.openType === 2){
                  this.level2s = [];
                  this.data1.list.forEach(item => {
                    this.level2s.push(item);
                  });
                  // this.level2s = this.datal.list;//不能直接传 传的是地址，上面length = 0 时，清空tree list
                }
              }else if(this.level3){
                console.log('hello');
                // this.getLevel3s();
                if(this.openType === 1){
                  this.getLevel3s();
                }else if(this.openType === 2){
                  this.level3sAll.push(response.data.extend);
                  this.refreshLevel3();
                }
              }


            }else if(response.data.code === '102'){
              this.addNameTip(response.data.message);
            }
          }
        );
        console.log('hello');
        this.isLoad = false;
        $(e.target).removeAttr("disabled");
        // $("#brand-modal-add-btn").removeAttr("disabled");
      },

      //name输入检查是否已经存在
      async nameChange1(){
        //清空设置
        this.nameOkSign1 = false;
        this.nameRemoveSign1 = false;
        // $("#warehouse-name-input").removeClass("remove-sign");
        $('.catalog-level1Name').removeClass("remove-sign");

        //brandName 为空
        if(this.level1Name.trim() === '' || this.level1Name === null || this.level1Name === undefined){
          return false;
        }
        console.log('hello');
        const url = 'api/catalog1/nameCheck';
        const data = {name: this.level1Name.trim()};
        if(this.flag){//true 为添加横态框，false 为更新横态框
          return await this.checkNameFun(url, data).then(function (result) {
            return result;
          });
        }else{//更新
          if(this.level1Name.trim() !== this.level1Name2){
            //检查
            // this.checkNameFun(url, data);//异步方法 返回数据有点反常
            // return this.result;
            return await this.checkNameFun(url, data).then(function (result) {
              return result;
            });
          }
        }
        return false;
      },
      async nameChange2(){
        //清空设置
        this.nameOkSign2 = false;
        this.nameRemoveSign2 = false;
        // $("#warehouse-name-input").removeClass("remove-sign");
        $('.catalog-level2Name').removeClass("remove-sign");

        //brandName 为空
        if(this.level2Name.trim() === '' || this.level2Name === null || this.level2Name === undefined){
          return false;
        }

        const url = 'api/catalog2/nameCheck';
        const data = {name: this.level2Name.trim(), level1Id: this.level1Id};
        if(this.flag){//true 为添加横态框，false 为更新横态框
          return await this.checkNameFun(url, data).then(function (result) {
            return result;
          });
        }else{//更新
          if(this.level2Name.trim() !== this.level2Name3){
            //检查
            return await this.checkNameFun(url, data).then(function (result) {
              return result;
            });
          }
        }
        return false;
      },
      async nameChange3(){
        //清空设置
        this.nameOkSign3 = false;
        this.nameRemoveSign3 = false;
        // $("#warehouse-name-input").removeClass("remove-sign");
        $('.catalog-level3Name').removeClass("remove-sign");

        //brandName 为空
        if(this.level3Name.trim() === '' || this.level3Name === null || this.level3Name === undefined){
          return false;
        }

        const url = 'api/catalog3/nameCheck';
        let data = {};
        if(this.openType === 1){
          data = {name: this.level3Name.trim(), level2Id: this.level2Id};
        }else if(this.openType === 2){
          data = {name: this.level3Name.trim(), level2Id: parseInt(this.data1.id) };
        }

        if(this.flag){//true 为添加横态框，false 为更新横态框
          return await this.checkNameFun(url, data).then(function (result) {
            return result;
          });
        }else{//更新
          if(this.level3Name.trim() !== this.level3Name3){
            //检查
            return await this.checkNameFun(url, data).then(function (result) {
              return result;
            });
          }
        }
        return false;
      },
      //检查name是否重复
      async checkNameFun(url, data){
       return await axios.post(url, qs.stringify(data)).then(
          response => {
            if (response.data.code === "101" && response.data.extend === "0") {//无该品牌记录
              if(this.level1){
                this.nameOkSign1 = true;
              }
              if(this.level2){
                this.nameOkSign2 = true;
              }
              if(this.level3){
                this.nameOkSign3 = true;
              }
              return true;
            }else if(response.data.code === "101" && response.data.extend === "1"){//已经存在该品牌
              this.addNameTip('该分类已经存在');
            }
            return false;
          }
        );
      },
      //显示添加品牌时品牌名的错误信息
      addNameTip(tipStr){
        if(this.level1){
          this.nameOkSign1 = false;
          this.nameRemoveSign1 = true;
          $("#catalog-name-input1").addClass("remove-sign");
          this.nameRemoveSignTip1 = tipStr;
        }
        if(this.level2){
          this.nameOkSign2 = false;
          this.nameRemoveSign2 = true;
          $("#catalog-name-input2").addClass("remove-sign");
          this.nameRemoveSignTip2 = tipStr;
        }
        if(this.level3){
          this.nameOkSign3 = false;
          this.nameRemoveSign3 = true;
          $("#catalog-name-input3").addClass("remove-sign");
          this.nameRemoveSignTip3 = tipStr;
        }

      },
      //提示框
      tipAlert(tipStr, type){//type: 0 -- 错误，1 -- 成功处理, 2 -- 警告
        if (type === 0) {
          this.tipAlertShow = '000';
        }else if(type === 1){
          this.tipAlertShow = '111';
        }else if(type === 2){
          this.tipAlertShow = '222';
        }

        this.tipMessage = tipStr;
        setTimeout(this.closeAlert, 2000);
      },

      //关闭错误提示框
      closeAlert(){
        this.tipAlertShow = '';
        // this.tipAlertShowOk = false;
      },
      levelAddOpen(type){
        this.flag = true;
        this.openMymodelData(type, 1);
        this.openMymodel();
      },
      openMymodelData(level,type){//级别，处理类型 1 -- 左边添加进入 2 -- tree 进入
        this.openType = type;
        if(level === 1){
          this.level1 = true;
          this.level2 = false;
          this.level3 = false;
        }
        if(level === 2){
          if(type === 1){
            if(this.level1Name2.trim() === '' || this.level1Name2 === null || this.level1Name2 === undefined){
              this.tipAlert('请先在下拉列表选择一级分类', 2);
              return;
            }
            this.level1Name = this.level1Name2;
          }

          this.level1 = false;
          this.level2 = true;
          this.level3 = false;
        }
        if(level === 3){
          if(type === 1){
            if(this.level2Name2.trim() === '' || this.level2Name2 === null || this.level2Name2 === undefined){
              this.tipAlert('请先在下拉列表选择二级分类', 2);
              return;
            }
            this.level1Name = this.level1Name2;
            this.level2Name = this.level2Name2;
          }
          this.level1 = false;
          this.level2 = false;
          this.level3 = true;
        }
      },
      //横态框
      openMymodel(){
        this.isShowMymodel = !this.isShowMymodel;
      },
      //下拉列表显示
      downListShow(e, type){//type: 1 -- level1; 2 -- level2 ; 3 -- level3;
        if(type === 1){
          this.level1sFlag = !this.level1sFlag;
        } else if(type === 2){
          this.level2sFlag = !this.level2sFlag;
        } else if(type === 3){
          this.level3sFlag = !this.level3sFlag;
        }
      },
      blurDownList(e, type){//失焦隐藏 //type: 1 -- level1; 2 -- level2 ; 3 -- level3;
        if(type === 1){
          this.level1sFlag = false;
        } else if(type === 2){
          this.level2sFlag = false;
        } else if(type === 3){
          this.level3sFlag = false;
        }
      },
      //拉下项选择
      optionChoose(e, type, item){//type: 1 -- level1; 2 -- level2 ; 3 -- level3;
        if(type === 1){
          this.loading2 = true;

          this.level1Id = $(e.target).attr('value');
          this.level1Name2 = $(e.target).text().trim();
          //更新ztree
          this.zNodes = [];
          this.getLevel2s();
          this.level2Name2 = '';
          this.level3Name2 = '';
          this.level2Id = '';
          this.level3Id = '';

        } else if(type === 2){
          this.level2Id = $(e.target).attr('value');
          this.level2Name2 = $(e.target).text().trim();
          // this.getLevel3s();
          //更新level3
          // this.level3s = [];
          this.level3Name2 = '';
          this.level3Id = '';
          this.refreshLevel3();
        } else if(type === 3){
          this.level3Id = $(e.target).attr('value');
          this.level3Name2 = $(e.target).text().trim();
        }

        // alert(this.level1Id);
      }
    }

  }
</script>

@import "@/assets/css/awesome.css";
<style>
  .product-catalog {

  }

  .product-catalog-title {
    font: 18px 'yunyuan';
    line-height: 36px;
    height: 36px;
    /*background-color: #aaa;*/
    box-shadow: 1px 1px 7px 1px #dfdfdf;
  }

  .product-catalog-title span {
    padding-left: 15px;
  }

  .product-catalog-main {
    margin: 10px 10px 10px 10px;
    height: 580px;
    /*background-color: #60AD94;*/
    overflow: auto;
    position: relative;
  }
  .product-catalog-choose {
    font: 16px 'yunyuan';
    margin-left: 10px;
    padding: 10px 0 10px 40px;
    /*background-color: #60AD94;*/
  }

  .product-catalog-choose-title {
    padding: 5px 10px;
    font: 18px '微软雅黑';
    font-weight: 500;
    color: #17346C;
  }

  .product-catalog-main-left{
    display: inline-block;
    width: 130px;
    border-right: 1px solid #DDDDDD;
    height: 100%;
    font: 14px 'yunyuan';
    text-align: center;
  }
  .product-catalog-main-left ul li{
    /*border-bottom: 1px solid #DDDDDD;*/
    /*padding: 5px 10px;*/
    margin: 10px 0;
  }
  .span-btn{
    /*background-color: #2e6da4;*/
    /*color: #fff;*/
    /*padding: 10px;*/
  }
  .product-catalog-main-right{
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
  .product-catalog-main-right-tree{
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
