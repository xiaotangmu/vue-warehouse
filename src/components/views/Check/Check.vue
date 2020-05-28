<template>
  <div class="out-manager-div">
    <div class="main-box-view-title">
      <span class="main-box-view-title-name">盘点管理 <span class="glyphicon glyphicon-question-sign"></span></span>
    </div>

    <el-tabs v-model="outMenu" style="margin-left: 20px;">
      <el-tab-pane label="盘点维护" name="first"></el-tab-pane>
      <el-tab-pane label="盘点添加" name="second"></el-tab-pane>
    </el-tabs>

    <div v-if="outMenu === 'first'">
      <div class="out-manager-content-div">
        <div class="out-manager-content">

          <div class="out-manager-head-btn-group" style="clear: both">

            <el-tag
              effect="plain"
              style="border: none;font-size: 14px;width: 60px"
              type="info"
            >仓库</el-tag>
            <el-select v-model="warehouseId2" placeholder="张老板" style="">
              <el-option
                v-for="item in warehouses"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>


            <el-tag
              effect="plain"
              style="border: none;font-size: 14px; width: 60px"
              type="info"
            >&nbsp;&nbsp;日期</el-tag>
            <el-date-picker
              style="width: 200px"
              v-model="outDate2"
              @change="dateChange(2)"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span @click="checkEntryByCondition(1,5,1)" class="btn btn-info" style="font-size: 13px">
              条件查询
            </span>

            <div style="margin: 5px 0;">
              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;width: 60px"
                type="info"
              >盘点单</el-tag>
              <el-input
                suffix-icon="el-icon-edit el-input__icon"
                v-model="outNum"
                placeholder="202005010030004001"
                style="width: 193px"
              ></el-input>
              <span @click="checkEntryByCondition(1,5,2)" class="btn btn-warning" style="font-size: 13px">
              <i class="el-icon-search"></i>查询
            </span>
            </div>


            <span class="btn btn-primary" @click="checkAll(1,5)" style="font-size: 13px">查看所有</span>

          </div>

          <div class="out-manager-list" style="margin-top: 10px;">
            <el-table
              :data="page.list"
              highlight-current-row
              stripe
              style="width: 100%; border-top: 1px solid #ccc">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="盘点单号" style="margin-right: 40px">
                      <el-tag effect="plain"><span>{{ props.row.checkSn }}</span></el-tag>

                    </el-form-item>
                    <el-form-item label="盘点日期" style="margin-right: 40px">
                      <el-tag effect="plain" type="danger">
                        <span>{{ props.row.checkDate }}</span>
                      </el-tag>

                    </el-form-item>
                    <el-form-item label="仓库" style="margin-right: 40px">
                      <span>{{ props.row.warehouseName }}</span>
                    </el-form-item>
                    <el-form-item label="操作员" style="margin-right: 40px">
                      <span>{{ props.row.operator }}</span>
                    </el-form-item>
                    <el-form-item label="批次" style="margin-right: 40px">
                      <span>{{ props.row.batch }}</span>
                    </el-form-item>
                    <el-form-item label="盈亏" style="margin-right: 40px">
                      <el-tag v-if="props.row.totalPrice > 0" >
                        {{props.row.totalPrice}}
                      </el-tag>
                      <el-tag type="success" v-if="props.row.totalPrice === 0" >
                        0
                      </el-tag>
                      <el-tag type="danger" v-if="props.row.totalPrice < 0" >
                        {{props.row.totalPrice}}
                      </el-tag>￥
                    </el-form-item><br />

                    <div v-if="props.row.productList !== undefined && props.row.productList !== null && props.row.productList.length > 0">
                      <el-divider content-position="left"><span style="float: right;margin-right: 200px">
                        商品
                        <el-tag type="info">
                          颜色表示
                        </el-tag>
                        <el-tag
                          effect="plain"
                          style="border:none">
                          多
                        </el-tag>，
                        <el-tag type="danger"
                                effect="plain"
                                style="border:none">
                          少
                        </el-tag>，
                        <el-tag type="success"
                                effect="plain"
                                style="border:none">
                          一样
                        </el-tag>
                      </span>
                      </el-divider>

                        <el-table
                          @selection-change="changeChoose"
                          :data="props.row.productList"
                          highlight-current-row
                          stripe
                          style="width: 100%; border-top: 1px solid #ccc">
                          <el-table-column
                            type="selection"
                            width="60">
                          </el-table-column>
                          <el-table-column
                            label="商品名称"
                            prop="name">
                          </el-table-column>
                          <el-table-column
                            label="品牌"
                            prop="brandName">
                          </el-table-column>
                          <el-table-column
                            label="规格"
                            prop="attrValueStr">
                          </el-table-column>

                          <el-table-column
                            label="单位"
                            prop="unit">
                          </el-table-column>
                          <el-table-column
                            label="单价(￥)"
                            prop="accountPrice">
                          </el-table-column>

                          <el-table-column label="账面">
                            <el-table-column
                              prop="accountNum"
                              label="数量"
                              width="70">
                            </el-table-column>
                            <el-table-column
                              prop="accountTotalPrice"
                              label="金额"
                              width="70">
                            </el-table-column>
                          </el-table-column>

                          <el-table-column label="实际">
                            <el-table-column
                              prop="checkNum"
                              label="数量"
                              width="70">
                            </el-table-column>
                            <el-table-column
                              prop="checkTotalPrice"
                              label="金额"
                              width="70">
                            </el-table-column>
                          </el-table-column>

                          <el-table-column label="相差" style="text-align: center;">
                            <el-table-column
                              label="数量"
                              width="70">
                              <template slot-scope="scope">
                                <el-tag v-if="scope.row.differenceNum > 0" >
                                  {{Math.abs(scope.row.differenceNum)}}
                                </el-tag>
                                <el-tag type="success" v-if="scope.row.differenceNum === 0" >
                                  {{Math.abs(scope.row.differenceNum)}}
                                </el-tag>
                                <el-tag type="danger" v-if="scope.row.differenceNum < 0" >
                                  {{Math.abs(scope.row.differenceNum)}}
                                </el-tag>
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="金额"
                              width="70">
                              <template slot-scope="scope">
                                <el-tag v-if="scope.row.differenceNum > 0" >
                                  {{Math.abs(scope.row.differencePrice)}}
                                </el-tag>
                                <el-tag type="success" v-if="scope.row.differenceNum === 0" >
                                  {{Math.abs(scope.row.differencePrice)}}
                                </el-tag>
                                <el-tag type="danger" v-if="scope.row.differenceNum < 0" >
                                  {{Math.abs(scope.row.differencePrice)}}
                                </el-tag>
                              </template>
                            </el-table-column>
                          </el-table-column>


                          <el-table-column
                            label="备注"
                            prop="remark">
                          </el-table-column>

                          <el-table-column
                            label="操作"
                          >
                            <template slot-scope="scope">
                              <span @click="open(props.row.id,scope.$index, scope.row)" class="btn btn-info attr-item-edit-span list-item-btn-span" >备注</span>
                              <!--<span @click="levelAddOpen(2,scope.$index, scope.row)" class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                              <!--<span @click="deleteRow(scope.$index, productList)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
                            </template>
                            <!--<span @click="openMymodel(2,index,item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                            <!--<span @click="deleteRow(item,index)" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
                          </el-table-column>
                        </el-table>


                    </div>
                    <!--<el-divider></el-divider>-->
                    <!--<el-form-item  label="备注" style="margin-right: 30px">-->
                      <!--<span @click="open(scope.$index, page.list)" class="btn btn-success attr-item-edit-span list-item-btn-span" style="font-size: 13px;">备注</span>-->

                    <!--</el-form-item>-->

                  </el-form>
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--type="selection"-->
              <!--width="80">-->
              <!--</el-table-column>-->
              <el-table-column
                label="盘点单号"
                prop="checkSn">
              </el-table-column>
              <el-table-column
                label="盘点日期"
                prop="checkDate">
              </el-table-column>
              <el-table-column
                label="仓库"
                prop="warehouseName">
              </el-table-column>
              <el-table-column
                label="操作员"
                prop="operator">
              </el-table-column>
              <el-table-column
                label="批次"
                prop="batch">
              </el-table-column>
              <el-table-column
                label="盈亏"
                prop="totalPrice">
                <template slot-scope="scope">
                <el-tag v-if="scope.row.totalPrice > 0" >
                  +{{scope.row.totalPrice}}
                </el-tag>
                <el-tag type="success" v-if="scope.row.totalPrice === 0" >
                  0
                </el-tag>
                <el-tag type="danger" v-if="scope.row.totalPrice < 0" >
                  {{scope.row.totalPrice}}
                </el-tag>
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--label="操作"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->

                  <!--<span @click="open(scope.$index, page.list)" class="btn btn-success attr-item-edit-span list-item-btn-span" style="font-size: 13px;">备注</span>-->
                  <!--&lt;!&ndash;<span @click="openMymodel(2,scope.$index, page.list)" class="btn btn-info attr-item-edit-span list-item-btn-span" >备注</span>&ndash;&gt;-->
                  <!--&lt;!&ndash;<span @click="deleteRow(scope.$index, page.list)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>&ndash;&gt;-->
                <!--</template>-->
                <!--&lt;!&ndash;<span @click="openMymodel(2,index,item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>&ndash;&gt;-->
                <!--&lt;!&ndash;<span @click="deleteRow(item,index)" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>&ndash;&gt;-->
              <!--</el-table-column>-->
            </el-table>

          </div>
        </div>
      </div>

      <!-- 页面数据 -->
      <div style="font-size: 13px;" v-show="page !== null && page !== undefined && page !== ''">
        <span style="padding-left: 20px">第 {{page.pageNum}} 页，共 {{page.pages}} 页 | {{page.total}} 条记录</span>
      </div>

      <!-- 页面按钮 -->
      <div v-show="page !== null && page !== undefined && page !== ''" class="brand-page-btn-div">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li v-show="page.pageNum !== 1" @click="findAllFlag?checkAll(1, 5):checkEntryByCondition(1,5,3)"><span>首页</span></li>
            <li v-show="page.pageNum !== 1" @click="findAllFlag?checkAll(page.pageNum-1,5):checkEntryByCondition(pageNum-1, 5, 3)">
              <!--<span aria-hidden="true">&laquo;</span>-->
              <span aria-hidden="true">上一页</span>
            </li>
            <li @click="findAllFlag?checkAll(num, 5):checkEntryByCondition(num, 5, 3)" v-for="(num, index) in page.navigatepageNums" :key="index" :class="{ 'active': page.pageNum === num}">
              <span>{{num}}</span>
            </li>
            <li @click="findAllFlag?checkAll(page.pageNum+1,5):checkEntryByCondition(page.pageNum+1,5,3)" v-show="page.pageNum*page.pageSize < page.total">
              <!--<span aria-hidden="true">&raquo;</span>-->
              <span aria-hidden="true">下一页</span>
            </li>
            <li @click="findAllFlag?checkAll(page.pages, 5):checkEntryByCondition(page.pages,5,3)" v-show="page.pageNum*page.pageSize < page.total"><span>尾页</span></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- 备注 添加 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>备注</span>
      <el-input
        suffix-icon="el-icon-edit el-input__icon"
        v-model="description"
        placeholder="老王"
        style="width: 400px"
      ></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateDesc">确 定</el-button>
  </span>
    </el-dialog>


    <div v-if="outMenu === 'second'" style="margin-left: 20px">
      <div class="out_item_div">
        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width:60px"
          type="info"
        >仓库</el-tag>
        <el-select @change="warehouseChange" v-model="warehouseId" placeholder="1号仓库" style="width: 200px">
          <el-option
            v-for="item in warehouses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-tag type="danger" v-show="warehouseErrorFlag">{{warehouseErrorTip}}</el-tag>
      </div>
      <div class="out_item_div">
        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width:60px"
          type="info"
        >日期</el-tag>
        <el-date-picker
          style="width: 200px"
          v-model="checkDate"
          :picker-options="pickerOptions"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-tag type="danger" v-show="dateErrorFlag">{{dateErrorTip}}</el-tag>
      </div>

      <div class="out_item_div">
        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width:60px"
          type="info"
        >操作员</el-tag>
        <el-input
          suffix-icon="el-icon-edit el-input__icon"
          v-model="operator"
          placeholder="老王"
          style="width: 200px"
        ></el-input>
        <el-tag type="danger" v-show="operatorErrorFlag">{{operatorErrorTip}}</el-tag>
      </div>

      <div class="out_item_div">
        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width:60px"
          type="info"
        >批次</el-tag>
        <el-input-number style="width: 150px" v-model="batch" :min="1" :max="99" ></el-input-number>

      </div>

      <el-divider content-position="left">商品</el-divider>

      <div class="out-manager-content-div">
        <div class="out-manager-content">

          <div class="out-manager-head-btn-group" style="clear: both">

            <!--<el-button type="primary">主要按钮</el-button>-->
            <!--<el-button type="success">成功按钮</el-button>-->
            <!--<span class="btn btn-primary" @click="">查看所有</span>-->
            <span class="btn btn-info brand-add-btn" @click="levelAddOpen(1)" style="font-size: 12px">添加商品</span>
            <span @click="deleteRows" class="btn btn-danger" style="font-size: 12px">删除已选</span>
            <span style="float: right;margin-right: 200px">
              <el-tag type="info">
                颜色表示
              </el-tag>
              <el-tag
              effect="plain"
              style="border:none">
                多
              </el-tag>，
              <el-tag type="danger"
                      effect="plain"
                      style="border:none">
                少
              </el-tag>，
              <el-tag type="success"
              effect="plain"
              style="border:none">
                一样
              </el-tag>
            </span>

          </div>

          <div class="out-manager-list" style="margin-top: 10px;">
            <el-table
              @selection-change="changeChoose"
              :data="productList"
              highlight-current-row
              stripe
              style="width: 100%; border-top: 1px solid #ccc">
              <el-table-column
                type="selection"
                width="60">
              </el-table-column>
              <el-table-column
                label="商品名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="品牌"
                prop="brandName">
              </el-table-column>
              <el-table-column
                label="规格"
                prop="attrValueStr">
              </el-table-column>

              <el-table-column
                label="单位"
                prop="unit">
              </el-table-column>
              <el-table-column
                label="单价(￥)"
                prop="price">
              </el-table-column>

              <el-table-column label="账面">
                <el-table-column
                  prop="num"
                  label="数量"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="totalPrice"
                  label="金额"
                  width="90">
                </el-table-column>
              </el-table-column>

              <el-table-column label="实际">
                <el-table-column
                  prop="checkNum"
                  label="数量"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="checkTotalPrice"
                  label="金额"
                  width="90">
                </el-table-column>
              </el-table-column>

              <el-table-column label="相差" style="text-align: center;">
                <el-table-column
                  label="数量"
                  width="90">
                  <template slot-scope="scope">
                  <el-tag v-if="scope.row.differenceNum > 0" >
                    {{Math.abs(scope.row.differenceNum)}}
                  </el-tag>
                  <el-tag type="success" v-if="scope.row.differenceNum === 0" >
                    {{Math.abs(scope.row.differenceNum)}}
                  </el-tag>
                  <el-tag type="danger" v-if="scope.row.differenceNum < 0" >
                    {{Math.abs(scope.row.differenceNum)}}
                  </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  label="金额"
                  width="90">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.differenceNum > 0" >
                      {{Math.abs(scope.row.differencePrice)}}
                    </el-tag>
                    <el-tag type="success" v-if="scope.row.differenceNum === 0" >
                      {{Math.abs(scope.row.differencePrice)}}
                    </el-tag>
                    <el-tag type="danger" v-if="scope.row.differenceNum < 0" >
                      {{Math.abs(scope.row.differencePrice)}}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table-column>


              <el-table-column
                label="备注"
                prop="remark">
              </el-table-column>

              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">

                  <span @click="levelAddOpen(2,scope.$index, scope.row)" class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                  <span @click="deleteRow(scope.$index, productList)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
                </template>
                <!--<span @click="openMymodel(2,index,item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                <!--<span @click="deleteRow(item,index)" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
              </el-table-column>
            </el-table>

          </div>
        </div>
      </div>

      <div class="out_item_div" style="margin-top: 10px;">
        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width: 50px"
          type="info"
        >盈亏</el-tag>
        <el-tag v-if="totalPrice > 0" >
          {{totalPrice}}
        </el-tag>
        <el-tag type="success" v-if="totalPrice === 0" >
          0
        </el-tag>
        <el-tag type="danger" v-if="totalPrice < 0" >
          {{Math.abs(totalPrice)}}
        </el-tag>
      </div>
      <div class="out_item_div" style="width: 100%;">
        <div style="">
          <el-button @click="addEntry" type="primary" style="margin-left: 655px">提交</el-button>
        </div>
        <!--<span class="btn btn-primary brand-add-btn" @click="levelAddOpen(1)" style="font-size: 12px">添加商品</span>-->
        <!--<span @click="" class="btn btn-danger" style="font-size: 12px">删除已选</span>-->
      </div>

    </div>


    <!-- modal -->
    <transition name="tip-alert">
      <div v-if="isShowMymodel" id="out-item-edit-modal" class="my-modal" >
        <div class="my-modal-content-div thumbnail" >
          <div class="my-modal-title">
            <span v-if="flag" class="my-modal-group-edit" style="font-size: 15px">盘点添加</span>
            <span v-if="!flag" class="my-modal-group-edit" style="font-size: 15px">盘点更新</span>
            <span @click="openMymodel" class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="" style="padding: 0;width: 100%">
            <div class="" style="max-height: 650px;overflow: auto;width: 100%">
              <div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >分类</el-tag>
                  <el-cascader
                    v-if="flag"
                    class="out_item_model_input"
                    v-model="selectCatalog"
                    @change="catalogChange"
                    :options="catalogs1"
                    :props="props"
                  ></el-cascader>
                  <el-tag v-if="!flag" effect="plain" style="border: none">
                    {{chooseSku.catalogName}}
                  </el-tag>

                </div>

                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >品牌</el-tag>
                  <el-select v-if="flag" @change="brandChange" v-model="brandId" filterable placeholder="美宜佳" class="out_item_model_input">
                    <el-option
                      v-for="item in brands"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-tag v-if="!flag" effect="plain" style="border: none">
                    {{chooseSku.brandName}}
                  </el-tag>
                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >商品</el-tag>
                  <el-select v-if="flag" @change="skuChange" v-model="skuName" placeholder="华夫饼" class="out_item_model_input">
                    <el-option
                      v-for="item in skuNames"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-tag v-if="!flag" effect="plain" style="border: none">
                    {{chooseSku.name}}
                  </el-tag>

                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >规格</el-tag>
                  <el-select v-if="flag" @change="attrChange" v-model="attrValue" placeholder="华夫饼" class="out_item_model_input">
                    <el-option
                      v-for="item in baseAttrs"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-tag v-if="!flag" effect="plain" style="border: none">
                    {{chooseSku.attrValueStr}}
                  </el-tag>

                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >单位</el-tag>
                  <el-select v-if="flag" @change="unitChange" v-model="unitValue" placeholder="华夫饼" class="out_item_model_input">
                    <el-option
                      v-for="item in units"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-tag v-if="!flag" effect="plain" style="border: none">
                    {{chooseSku.unit}}
                  </el-tag>
                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >数量</el-tag>
                  <!--<el-input-number style="width: 150px" v-model="num" :min="1" :max="chooseSku.num" label="描述文字"></el-input-number>-->
                  <el-tag type="info" effect="plain" style="border: none" v-if="chooseSku !== null && chooseSku !== ''">{{chooseSku.num}}</el-tag>
                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >单价</el-tag>

                  <el-tag type="success" effect="plain" style="border: none;">{{(price).toFixed(2)}}</el-tag>
                  <el-tag type="warning" effect="plain" style="border: none;">￥</el-tag>
                  <el-tag type="danger" v-show="priceErrorFlag">{{priceErrorTip}}</el-tag>

                </div>
                <div class="out_item_model">

                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >总价</el-tag>
                  <el-tag type="success" effect="plain" style="border: none;">
                    <span v-if="chooseSku === null || chooseSku === undefined
                    || chooseSku.num === null || chooseSku.num === '' || chooseSku.num === undefined">
                      0
                    </span>
                    <span v-else>
                      {{(chooseSku.num*price).toFixed(2)}}
                    </span>
                  </el-tag>

                </div>
                <div style="margin: 0 20px;">
                  <el-divider content-position="left" >盘点数据</el-divider>
                </div>


                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >数量</el-tag>
                  <el-input-number style="width: 150px" v-model="checkNum" :min="0" :max="999999999" label="描述文字"></el-input-number>
                  <el-tag type="info" v-if="chooseSku !== null && chooseSku !== ''">当前仓库库元数量：{{chooseSku.num}}</el-tag>
                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >金额</el-tag>
                  <el-tag type="success" effect="plain" style="border: none;">{{(checkNum*price).toFixed(2)}}</el-tag>

                </div>

                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >备注</el-tag>
                  <el-input
                    type="text"
                    placeholder="请输入内容"
                    v-model="checkRemark"
                    maxlength="20"
                    show-word-limit
                    style="width: 280px"
                  ></el-input>
                </div>



              </div>

              <el-button v-if="flag" @click="itemAdd($event)" type="primary" style="margin: 30px 0 20px 490px">
                <i v-if="isLoad" class="el-icon-loading"></i>添加</el-button>

              <el-button v-if="!flag" @click="updateItem($event)" type="success" style="margin: 30px 0 20px 520px">
                <i v-if="isLoad" class="el-icon-loading"></i>更新</el-button>
              <el-button @click="openMymodel" type="info" style="">取消</el-button>



            </div>


          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data(){
      let that = this;
      return{

        //封装查询条件
        conditionCheckData: '',

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        skusOrigin: [],
        skusList: [],
        checkNum: '',//添加盘点数量
        checkRemark: '',//备注
        checkDate: '',

        isShowCityByLetter: true,
        arr: [],

        flag: true,//true -- 添加选择框，false -- 更新
        chooseList: [],//用来保存勾选中的item
        //分页数据
        page: '',
        pageNum: 1,//首页
        pageSize: 5,//每页数据数

        isShowMymodel: false,//是否显示横态框
        //提示信息
        warehouseErrorFlag: false,//是否显示name的提示
        warehouseErrorTip: '',
        dateErrorFlag: false,//是否显示name的提示
        dateErrorTip: '',
        operatorErrorFlag: false,//是否显示name的提示
        operatorErrorTip: '',
        numErrorFlag: false,//是否显示name的提示
        numErrorTip: '',
        priceErrorFlag: false,//是否显示name的提示
        priceErrorTip: '',

        isLoad: '',
        loading: false,
        loading2: false,
        node1: '',
        outMenu: 'first',//菜单
        warehouses: [],//盘点仓库
        outDate: '',//盘点日期
        warehouseId: '',//绑定当前仓库
        operator: '',//绑定当前操作员
        spus: [],//可以选择的商品
        baseAttrs: [],//可以设置的属性
        num: '',//数量
        price: '',//单价
        itemTotalPrice: '',//单商品总价
        spuId: '',//绑定当前 spu
        selectCatalog: '',//绑定当前分类
        brandId: '',//绑定当前品牌
        attrIds: [],//绑定当前attr
        attrValues: [],//绑定当前attr 值
        unit: '',//单位
        index: '',//记录当前index
        data1: '',//table spu
        // totalPrice: 0,//记录盘点单总价

        productList: [],//保存添加的商品信息
        clients: [],//客户
        clientId: '',
        batch: '',//批次
        attrValue: '',//选定的规格
        unitValue: '',//单位
        skus: [],
        skuNames: [],
        skuName: '',//当前选择的sku
        chooseSkus: [],//选择的同名商品
        choose2Skus: [],//选择的同规格商品
        units: [],//同规格商品的单位数组
        chooseSku: '',//当前选定的sku
        outNum: '',//盘点单号
        warehouseId2: '',
        clientId2: '',
        outDate2: '',
        findAllFlag: false,
        checkType: 1,//条件查询类型
        dialogVisible: false,//备注横态框
        description: '',
        index2: '',

        //tip input
        restaurants: [],
        checkId: '',
        openData: '',

        brandIds: '',
        brands: [],
        catalogs1: [],
        catalogs2: [],
        catalogs3: [],
        //分类级联选择
        props: {
          lazy: true,
          label: 'name',
          children: 'list',
          value: 'id',
          lazyLoad (node, resolve) {
            that.loadCatalog2(node,resolve);
          }
        },

      }
    },
    mounted(){
      $(".myScrollBox2").mCustomScrollbar({
        theme: "minimal-dark"
      });

      //提示信息
      $(document).on('mouseenter','.out-item-detail-span, .out-item-edit-span, .out-item-delete-span',function(){
        $(this).popover('show');
      });
      $(document).on('mouseout','.out-item-detail-span, .out-item-edit-span, .out-item-delete-span',function(){
        $(this).popover('hide');
      });


      //tip input
      this.restaurants = this.$store.state.units;

      //获取所有仓库
      this.getWarehouseAll();
      //获取所有仓库
      this.getClient();
    },
    methods: {

      //仓库改变 -- 获取仓库所有商品
      warehouseChange(){
        if(this.warehouseId === null || this.warehouseId === '' || this.warehouseId < 0){
          this.$message.error("数据异常");
          return ;
        }
        const url = 'api/sku/getAllByWarehouseId';
        const data = { warehouseId: this.warehouseId };
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              let extend = response.data.extend;
              if(extend === null || extend ===  undefined || extend === '' || extend.length < 1){
                this.skusOrigin = [];


              }else{
                this.skusOrigin = extend;
              }
              this.skus = this.skusOrigin;
              this.skuNames = [];
              this.skus.forEach(item => {
                this.skuNames.push(item.name);
              });
              this.skuNames = Array.from(new Set(this.skuNames));

              //更新数据
            }
          }
        )
      },

      // numChange(){
      //   if(this.num > this.chooseSku.num){
      //     this.$message.warning('')
      //   }
      // },

      updateDesc(){
        if(this.description.trim() === ''){
          this.$message.warning('请先填写备注信息');
          return;
        }

        const data = { remark: this.description.trim(), checkId: this.checkId, skuId: this.openData.id };
        axios.post('api/check/description', qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.page.list.forEach(item => {
                if(item.id === data.checkId){
                  item.productList[this.index2].remark = this.description.trim();
                }
              });
              // this.page.list[this.index2].description = this.description.trim();
              this.$message({
                type: 'success',
                message: '成功备注： ' + this.description.trim()
              });
              this.dialogVisible = false;
            }
          }
        );
      },

      //修改备注
      async open(checkId, index, dataList) {

        this.checkId = checkId;
        this.index2 = index;
        this.dialogVisible = true;
        this.openData = dataList;
        console.log(checkId);
        console.log(index);
        console.log(dataList);
        // await this.$prompt('请输入备注信息', '备注', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        // }).then(({ value }) => {
        //
        //
        //
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });
        // });
        // console.log(dataList[index])
      },

      checkEntryByCondition(pageNum, pageSize,type){
        const { warehouseId2, outDate2, outNum,conditionCheckData } = this;

        const url = 'api/check/checkByCondition';
        let data = '1';
        if(type === 1){

          if( warehouseId2 === '' && outDate2 === ''){
            this.$message.warning('请先添加查询条件');
            return;
          }

          if(outDate2 === ''){
            data = { warehouseId: warehouseId2, checkDate: ''
              , checkSn: '', pageNum: pageNum, pageSize: pageSize };
          }else{
            data = { warehouseId: warehouseId2, checkDate: outDate2.toLocaleDateString()
              , checkSn: '', pageNum: pageNum, pageSize: pageSize };
          }

        }else if(type === 2){

          if( outNum === ''){
            this.$message.warning('请先添加查询条件');
            return;
          }

          data = { warehouseId: warehouseId2, checkDate: ''
            , checkSn: outNum, pageNum: pageNum, pageSize: pageSize };

        }else{//分页跳页
            data = {warehouseId: conditionCheckData.warehouseId,checkDate: conditionCheckData.checkDate
              ,checkSn: conditionCheckData.checkSn, pageNum: pageNum, pageSize: pageSize};
        }
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              let extend = response.data.extend;
              if(extend === null || extend === '' || extend.list === null || extend.list === undefined || extend.list.length < 1 ){
                extend = '';
                this.$message.warning('暂无数据');
              }
              this.checkType = type;
              this.page = extend;
              this.findAllFlag = false;
              this.pageNum = pageNum;
              this.pageSize = pageSize;
              this.conditionCheckData = data;
              this.pageData();
            }
          }
        )
      },

      checkAll(pageNum, pageSize){
        const url = 'api/check/getAllPage';
        const data = { pageNum: pageNum, pageSize: pageSize};
        axios.post(url,qs.stringify(data)).then(
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
              this.pageNum = pageNum;
              this.pageSize = pageSize;
              this.findAllFlag = true;
              this.pageData();
            }
          }
        )
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
        if(!this.findAllFlag){//是否name查找分页
          this.checkEntryByCondition(this.pageNum, this.pageSize,this.checkType);
        }else{
          this.checkAll(this.pageNum, this.pageSize);
        }
      },

      getClient(){
        axios.get('api/client/getAll').then(
          response => {
            if(response.data.code === '101'){
              let extend = response.data.extend;
              if(extend === null || extend === undefined || extend === ''){
                extend = [];
              }
              this.clients = extend;
            }
          }
        )
      },
      //提交盘点单
      addEntry(){
        const { batch, warehouseId, warehouses, checkDate, operator, productList, totalPrice } = this;
        if(warehouseId === null || warehouseId === undefined || warehouseId === ''){
          this.$message.warning('请先选择仓库');
          return;
        }
        if(checkDate === null || checkDate === undefined || checkDate === ''){
          this.$message.warning('请先选择日期');
          return;
        }
        if(operator === null || operator === undefined || operator === ''){
          this.$message.warning('请先填写操作员');
          return;
        }
        if(productList === null || productList === undefined || productList.length < 1){
          this.$message.warning('请先添加商品');
          return;
        }
        let warehouse = warehouses.find(item => item.id === warehouseId);
        const data = { batch: batch,warehouseId: warehouse.id,warehouseName: warehouse.name, checkDate: checkDate.toLocaleDateString(), operator: operator
          , productList: productList, totalPrice: totalPrice};

        const data2 = { checkStr: JSON.stringify(data)};
        const url = 'api/check/add';
        axios.post(url, qs.stringify(data2)).then(
          response => {
            if(response.data.code === '101'){
              this.$message.success('添加成功');
            }
          }
        )
      },

      //tip input
      querySearch(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      //勾选
      changeChoose(val){
        this.chooseList = val;
      },
      //删除多个
      async deleteRows(){

        if(this.chooseList === null || this.chooseList === undefined || this.chooseList.length <= 0){
          this.$message({
            message: '请先勾选需要删除的属性',
            type: 'warning'
          });
          return;
        }

        //构造数据
        let items = this.chooseList;

        const result = await this.deleteItem(items).then(function (result) {
          return result;
        });
        //更新数据
        if(result){
          //更新页面
          items.forEach(item2 => {
            const index = this.productList.findIndex(item => item.spuId === item2.spuId && item.catalog3Id === item2.catalog3Id
              && item.brandId === item2.brandId && item.attrValues === item2.attrValues && item.price === item2.price);//返回下标
            this.skusOrigin.push(this.productList[index]);
            this.productList.splice(index,1);
          });

        }
      },
      //单个删除
      // async deleteRow(item,index){
      async deleteRow(index,data){

        const item = data[index];

        let items = [];
        items.push(item);
        const result = await this.deleteItem(items).then(function (result) {
          return result;
        });
        //更新数据
        if(result){
          this.skusOrigin.push(data[index]);
          data.splice(index,1);
        }
      },
      //删除item
      async deleteItem(items){//name,id,catalog3Id,brandId -- 用对象封装

        let names = '';
        for(let i = 0; i <= items.length -1; i++){
          if(i === items.length -1){
            names += items[i].name;
          }else{
            names += items[i].name + '、';
          }
        }

        const re1 = await this.$confirm('您要删除 ' +  names + ' 的商品吗?', '提示', {
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
          return false;
        }
        return true;

      },
      async updateItem(e){
        let data = await this.dealItem();
        if(data === 0){
          return;
        }
        this.data1.checkNum = data.checkNum;
        this.data1.remark = data.remark;
        this.data1.checkTotalPrice =  Math.round((data.checkNum*data.price) * 100) / 100;
        //相差
        this.data1.differenceNum = data.checkNum - data.num ;
        this.data1.differencePrice = Math.round(((data.checkNum - data.num)*data.price) * 100) / 100;

        // let list = this.productList;
        //
        // this.productList.forEach(item => {
        //   if(item.id === data.id){
        //     item = data;
        //   }
        // });
        // this.productList = list;
        let name = this.data1.brandName;
        this.data1.brandName = 'hello';//没有getter setter 属性的操作 页面显示数据不更新
        // this.data1.brandName = this.data1.brandName.trim();//没有getter setter 属性的操作 页面显示数据不更新

        console.log(this.productList)

        this.$message.success('更新成功');
        this.openMymodel();
      },
      dealItem(){
        let { checkNum,chooseSku,skuName,baseAttrs, selectCatalog, brandId, spuId, attrValues, num, price,unitValue } = this;
        if(skuName === null || skuName === undefined || skuName === ''){
          this.$message.warning('请先选择商品');
          return 0;
        }
        if(checkNum === null || checkNum === undefined || checkNum === '' || checkNum < 0){
          this.$message.warning('商品数量有误，请修改');
          return 0;
        }
        if(unitValue === null || unitValue === undefined || unitValue === ''){
          this.$message.warning('请先填写商品单位');
          return 0;
        }
        this.chooseSku.totalPrice =  Math.round((this.chooseSku.num*this.chooseSku.price) * 100) / 100;
        this.chooseSku.checkTotalPrice =  Math.round((checkNum*this.chooseSku.price) * 100) / 100;
        this.chooseSku.checkNum = checkNum;
        //相差
        this.chooseSku.differenceNum = checkNum - this.chooseSku.num ;
        this.chooseSku.differencePrice = Math.round(((checkNum - this.chooseSku.num)*this.chooseSku.price) * 100) / 100;

        this.chooseSku.remark = this.checkRemark;

        return this.chooseSku;
      },
      //spu add
      async itemAdd(){
        const data = await this.dealItem();
        if(data === 0){
          return;
        }

        //直接多余的属性改变 不能让页面刷新 要getter setter 数据改变时才触发
        const dataSku = { id: data.id, name: data.name, catalog3Id: data.catalog3Id, catalogName: data.catalogName,
        brandId: data.brandId, brandName: data.brandName, attrValueStr: data.attrValueStr, unit: data.unit, num: data.num,
        totalPrice: data.totalPrice, differenceNum: data.differenceNum, differencePrice: data.differencePrice
        , checkNum: data.checkNum, checkTotalPrice: data.checkTotalPrice, price: data.price, remark: data.remark,
        accountNum: data.num, accountPrice: data.price, accountTotalPrice: data.totalPrice };

        this.productList.push(dataSku);

        let index = this.skusOrigin.findIndex(item => item.id === data.id);
        if(index !== null && index !== undefined && index !== ''){
          this.skusOrigin.splice(index, 1);
        }
        this.$message.success('成功添加');
        this.levelAddOpen(3,'','');
      },
      unitChange(){
        this.chooseSku = '';
        this.choose2Skus.forEach(item => {
          if(item.unit === this.unitValue){
            this.chooseSku = item;
            this.price = item.price;
          }
        })
      },
      attrChange(){
        this.choose2Skus = [];
        this.units = [];
        this.unitValue = '';
        this.chooseSku = '';
        this.chooseSkus.forEach(item => {
          if(item.attrValueStr === this.attrValue){
            this.choose2Skus.push(item);
            this.units.push(item.unit);
          }
        })
      },
      //查看是否可以获取数据
      async skuChange(){
        this.chooseSkus = [];
        this.baseAttrs = [];
        this.attrValue = '';
        this.units = [];
        this.unitValue = '';
        this.chooseSku = '';
        this.choose2Skus = [];
        this.skus.forEach(item => {
          if(item.name === this.skuName){
            this.chooseSkus.push(item);
            this.baseAttrs.push(item.attrValueStr);
          }
        });
        //去重
        this.baseAttrs = Array.from(new Set(this.baseAttrs));
      },
      //catalog 分类 option 选择改变时触发
      catalogChange(){
        this.checkCatalogAndBrand();
      },
      //brand 品牌 option 选择改变时触发
      brandChange(){
        this.checkCatalogAndBrand();
      },
      checkCatalogAndBrand(){

        this.skus = [];
        this.skuNames = [];
        this.skuName = '';
        this.attrValues = [];
        this.attrValue = '';
        this.units = [];
        this.unitValue = '';
        this.chooseSkus = [];
        this.chooseSku = '';
        this.choose2Skus = [];
        this.baseAttrs = [];


        let catalog3Id = this.selectCatalog[2];
        if(catalog3Id === null || catalog3Id === undefined || catalog3Id === '' || catalog3Id < 1){
          this.skusOrigin.forEach(item => {
            if(item.brandId === this.brandId){
              this.skus.push(item);
            }
          });
        }else if(this.brandId === undefined || this.brandId === null || this.brandId === ''  || this.brandId < 0 ){
          this.skusOrigin.forEach(item => {
            if(item.catalog3Id === this.selectCatalog[2]){
              this.skus.push(item);
            }
          });
        }else{
          console.log('hello')
          this.skusOrigin.forEach(item => {
            if(item.brandId === this.brandId && item.catalog3Id === this.selectCatalog[2]){
              this.skus.push(item);
            }
          });
        }


        this.skus.forEach(item2 => {
          this.skuNames.push(item2.name);
        });
        this.skuNames =  Array.from(new Set(this.skuNames));
      },

      //判断日期是否有效
      dateChange(type){
        // console.log(this.outDate);//这是一个日期对象
        // console.log(this.outDate.toLocaleDateString());//获取当前日期 2020/4/15
        let curTime = new Date();
        if(type === 2){
          if(curTime < this.outDate2){
            this.$message.warning('请选择正确日期');
            this.outDate2 = '';
          }
        }else{
          if(curTime < this.outDate){
            this.$message.warning('请选择正确日期');
            this.outDate = '';
          }
        }

      },
      //加载品牌
      loadBrand(){
        const url = 'api/brand/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){
              this.brands = response.data.extend;
              if(this.brands === null ||  this.brands === undefined || this.brands.length <= 0){
                this.$message({
                  message: '当前品牌信息为空！',
                  type: 'warning'
                })
              }
            }
          }
        )
      },
      //加载一级分类
      loadCatalog1(){
        const url = 'api/catalog1/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){
              this.catalogs1 = response.data.extend;
            }
          }
        )
      },
      //加载选项
      loadCatalog2(node, resolve){
        const { level } = node;
        if(level === 1){
          const url = 'api/catalog2/getAll2';
          const data = { catalog1Id: node.data.id };
          axios.get(url, {params: data }).then(
            response => {
              if(response.data.code === '101'){
                let list = response.data.extend;
                let list2 = [];
                let list3 = [];
                list.forEach(item => {
                  if(item.level === 2){
                    list2.push(item);
                  }
                  if(item.level === 3){
                    item.leaf = true;
                    list3.push(item);
                  }

                });
                this.catalogs2 = list2;
                this.catalogs3 = list3;

                resolve(this.catalogs2);
              }
            }
          );
        }else if(level === 2){
          let list4 = [];
          this.catalogs3.forEach(item => {
            if(node.data.ztreeId + '' === item.pid + ''){
              list4.push(item);
            }
          });
          resolve(list4);
        }
      },
      getWarehouseAll(){
        const url = 'api/warehouse/getAll';
        axios.get(url).then(
          response => {
            if(response.data.code === '101'){
              let extend = response.data.extend;
              if(extend === null || extend === undefined || extend === ''){
                extend = [];
              }
              this.warehouses = extend;
            }
          }
        )
      },

      async levelAddOpen(type,index, data){//type 0--编辑 1 -- 添加

        if(this.warehouseId === null || this.warehouseId === undefined ||this.warehouseId === ''){
          this.$message.warning('请先选择仓库');
          return;
        }


        if(this.catalogs1 === null || this.catalogs1 === undefined || this.catalogs1.length === 0){
          await this.loadCatalog1();
        }
        if(this.brands === null || this.brands === undefined || this.brands.length === 0){
          await this.loadBrand();
        }
        if(type === 1 || type === 3){
          this.flag = true;
          //清空数据
          this.selectCatalog = [];
          this.brandId = '';
          // this.skus = [];
          this.chooseSkus = [];
          this.choose2Skus = [];
          this.chooseSku = '';
          this.skuName = '';
          this.skuNames = [];
          this.skusOrigin.forEach(item => {
            this.skuNames.push(item.name);
          });
          this.skuNames = Array.from(new Set(this.skuNames));

          this.baseAttrs = [];
          this.attrValue = '';
          this.unit = '';
          this.units = [];
          this.unitValue = '';
          this.price = 0;
          this.checkNum = 0;
          this.checkRemark = '';
        }else{
          this.flag = false;

          this.index = index;
          this.data1 = data;
          const item = data;

          this.chooseSku = data;
          //赋值
          this.brandId = item.brandId;
          // await this.getSkus(item.catalog3Id,item.brandId);
          this.skuName = item.name;
          // await this.skuChange();

          this.attrValue = item.attrValueStr;
          // await this.attrChange();
          this.unitValue = item.unit;
          // await this.unitChange();
          this.num = item.num;
          this.price = item.price;
          this.checkNum = item.checkNum;
          this.checkRemark = item.remark;
        }
        if(type !== 3){

          this.openMymodel();
        }
      },
      //横态框
      openMymodel(){
        this.isShowMymodel = !this.isShowMymodel;
      },
    },
    computed:{
      ...mapState(['cityList']),
      totalPrice: function(){
        let total = 0;
        this.productList.forEach(item => {
          total += item.differencePrice;
        });
        return total;
      }

    },
  }
</script>

<style>
  .out_item_model_input{
    width: 300px;
  }
  .out_item_model{
    padding: 0 100px;
    margin-top: 20px;
    margin-left: 150px;
  }
  .out_item_div{
    padding-left: 15px;
    margin-bottom: 10px;
  }
  .my-modal-content-div{
    width: 900px;
    background-color: #fff;
    margin: 50px auto;
    /*height: 500px;*/
    /*position: absolute;*/

  }
  .out-manager-content{
    margin-left: 20px;
  }
  .out-manager-list{
    padding-right: 20px;
  }
  .out-manager-list td{
    font-size: 14px;
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

