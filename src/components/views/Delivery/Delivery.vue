<template>
  <div class="out-manager-div">
    <div class="main-box-view-title">
      <span class="main-box-view-title-name">送货管理 <span class="glyphicon glyphicon-question-sign"></span></span>
    </div>

    <el-tabs v-model="outMenu" style="margin-left: 20px;">
      <el-tab-pane label="送货维护" name="first"></el-tab-pane>
      <el-tab-pane label="送货添加" name="second"></el-tab-pane>
    </el-tabs>

    <div v-if="outMenu === 'first'">
      <div class="out-manager-content-div">
        <div class="out-manager-content">

          <div class="out-manager-head-btn-group" style="clear: both">


            <el-tag
              effect="plain"
              style="border: none;font-size: 14px; width: 60px"
              type="info"
            >&nbsp;&nbsp;客户</el-tag>
            <el-select clearable v-model="clientId2" placeholder="张老板" style="">
              <el-option
                v-for="item in clients"
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
              v-model="deliveryDate2"
              :picker-options="pickerOptions"
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
              >送货单</el-tag>
              <el-input
                suffix-icon="el-icon-edit el-input__icon"
                v-model="deliveryNum"
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
                    <el-form-item label="送货单号" style="margin-right: 40px">
                      <el-tag effect="plain"><span>{{ props.row.deliveryNum }}</span></el-tag>

                    </el-form-item>
                    <el-form-item label="送货日期" style="margin-right: 40px">
                      <el-tag effect="plain" type="danger">
                        <span>{{ props.row.deliveryDate }}</span>
                      </el-tag>

                    </el-form-item>
                    <el-form-item label="操作员" style="margin-right: 40px">
                      <span>{{ props.row.operator }}</span>
                    </el-form-item>
                    <el-form-item label="批次" style="margin-right: 40px">
                      <span>{{ props.row.batch }}</span>
                    </el-form-item>
                    <el-form-item label="出库单号" style="margin-right: 40px">
                      <span>{{ props.row.outNum }}</span>
                    </el-form-item>
                    <el-form-item label="仓库" style="margin-right: 40px">
                      <span>{{ props.row.out.warehouseName }}</span>
                    </el-form-item>
                    <el-form-item label="总价" style="margin-right: 40px">
                      <el-tag type="success" effect="plain"><span>{{ props.row.out.totalPrice }}</span> </el-tag>
                      ￥
                    </el-form-item><br />

                    <div v-if="props.row.out.productList !== undefined && props.row.out.productList !== null && props.row.out.productList.length > 0">
                      <el-divider content-position="left">商品</el-divider>
                      <div  v-for="(item, index) in props.row.out.productList" :key="index">
                        <el-form-item  label="分类" style="margin-right: 30px">
                          <span >{{item.catalogName}}</span>
                        </el-form-item>
                        <el-form-item  label="品牌" style="margin-right: 30px">
                          <span >{{item.brandName}}</span>
                        </el-form-item>
                        <el-form-item  label="商品名称" style="margin-right: 30px">
                          <el-tag effect="plain" type="success">
                            <span >{{item.name}}</span>
                          </el-tag>
                        </el-form-item>
                        <el-form-item  label="商品规格" style="margin-right: 30px">
                          <el-tag effect="plain" type="warning">
                            <span >{{item.attrValueStr}}</span>
                          </el-tag>
                        </el-form-item>
                        <el-form-item  label="数量" style="margin-right: 30px">
                          <span >{{item.num}}</span>
                        </el-form-item>
                        <el-form-item  label="单位" style="margin-right: 30px">
                          <span >{{item.unit}}</span>
                        </el-form-item>
                        <el-form-item  label="单价" style="margin-right: 30px">
                          <span >{{item.price}}</span>
                        </el-form-item>
                        <el-form-item  label="总价" style="margin-right: 30px">
                          <span >{{item.totalPrice}}</span>
                        </el-form-item>

                      </div>

                    </div>
                    <el-divider></el-divider>
                    <el-form-item  label="备注" style="margin-right: 30px">
                      <span >{{props.row.description}}</span>
                    </el-form-item>

                  </el-form>
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--type="selection"-->
              <!--width="80">-->
              <!--</el-table-column>-->
              <el-table-column
                label="送货单号"
                prop="deliveryNum">
              </el-table-column>
              <el-table-column
                label="送货日期"
                prop="deliveryDate">
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
                label="总价"
                prop="out.totalPrice">
              </el-table-column>
              <el-table-column
                label="备注"
                prop="description">
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">

                  <span @click="open(scope.$index, page.list)" class="btn btn-success attr-item-edit-span list-item-btn-span" style="font-size: 13px;">备注</span>
                  <!--<span @click="openMymodel(2,scope.$index, page.list)" class="btn btn-info attr-item-edit-span list-item-btn-span" >备注</span>-->
                  <!--<span @click="deleteRow(scope.$index, page.list)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
                </template>
                <!--<span @click="openMymodel(2,index,item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                <!--<span @click="deleteRow(item,index)" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
              </el-table-column>
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
        >客户</el-tag>
        <el-select clearable @change="clientChange" v-model="clientId" placeholder="张老板" style="width: 200px">
          <el-option
            v-for="item in clients"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width:60px;margin-left: 20px"
          type="info"
        >城市</el-tag>
        <el-select clearable v-model="client.city" filterable placeholder="张老板" style="width: 200px">
          <el-option-group
            v-for="group in cityList"
            :key="group.initialLetter"
            :label="group.initialLetter">
            <el-option
              v-for="item in group.cities"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-option-group>
        </el-select>

        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width:60px;margin-left: 20px"
          type="info"
        >地址</el-tag>
        <el-input v-model="client.address" placeholder="请输入内容" style="width: 350px"></el-input>

        <div style="margin-top: 10px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >联系人</el-tag>
          <el-input v-model="client.contact" placeholder="请输入内容" style="width: 200px"></el-input>

          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px;margin-left: 20px"
            type="info"
          >电话</el-tag>
          <el-input v-model="client.phone" placeholder="请输入内容" style="width: 200px"></el-input>


        </div>

        <div style="margin-top: 10px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px;position: relative; left: -10px"
            type="info"
          >送货日期</el-tag>
          <el-date-picker
            style="width: 200px"
            v-model="deliveryDate"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px;margin-left: 20px;"
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
        <div style="margin-top: 10px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px;"
            type="info"
          >批次</el-tag>
          <el-input-number style="width: 150px" v-model="batch" :min="1" :max="99" ></el-input-number>

        </div>


      </div>

      <!--<el-divider></el-divider>-->
      <el-divider content-position="left">出库信息</el-divider>

      <div class="out_item_div">
        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width:60px"
          type="info"
        >仓库</el-tag>
        <el-select clearable @change="warehouseChange" v-model="warehouseId" placeholder="1号仓库" style="width: 200px">
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
          style="border: none;font-size: 14px;width:60px;position: relative;left: -10px"
          type="info"
        >出库日期</el-tag>
        <el-date-picker
          style="width: 200px"
          v-model="outDate"
          @change="dateChange"
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
        >出库单</el-tag>
        <el-select clearable @change="outChange" v-model="outId" placeholder="1号仓库" style="width: 200px">
          <el-option
            v-for="item in outs"
            :key="item.id"
            :label="item.outNum"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <!--<div class="out_item_div">-->
        <!--<el-tag-->
          <!--effect="plain"-->
          <!--style="border: none;font-size: 14px;width:60px"-->
          <!--type="info"-->
        <!--&gt;操作员</el-tag>-->
        <!--<el-input-->
          <!--suffix-icon="el-icon-edit el-input__icon"-->
          <!--v-model="operator"-->
          <!--placeholder="老王"-->
          <!--style="width: 200px"-->
        <!--&gt;</el-input>-->
        <!--<el-tag type="danger" v-show="operatorErrorFlag">{{operatorErrorTip}}</el-tag>-->
      <!--</div>-->

      <!--<div class="out_item_div">-->
        <!--<el-tag-->
          <!--effect="plain"-->
          <!--style="border: none;font-size: 14px;width:60px"-->
          <!--type="info"-->
        <!--&gt;批次</el-tag>-->
        <!--<el-input-number style="width: 150px" v-model="batch" :min="1" :max="99" ></el-input-number>-->

      <!--</div>-->

      <el-divider content-position="left">商品</el-divider>

      <div class="out-manager-content-div">
        <div class="out-manager-content">

          <div class="out-manager-head-btn-group" style="clear: both">

            <!--<el-button type="primary">主要按钮</el-button>-->
            <!--<el-button type="success">成功按钮</el-button>-->
            <!--<span class="btn btn-primary" @click="">查看所有</span>-->
            <!--<span class="btn btn-info brand-add-btn" @click="levelAddOpen(1)" style="font-size: 12px">添加商品</span>-->
            <!--<span @click="deleteRows" class="btn btn-danger" style="font-size: 12px">删除已选</span>-->
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
                label="数量"
                prop="num">
              </el-table-column>
              <el-table-column
                label="单位"
                prop="unit">
              </el-table-column>
              <el-table-column
                label="单价(￥)"
                prop="price">
              </el-table-column>
              <el-table-column
                label="总价"
                prop="totalPrice">
              </el-table-column>
              <!--<el-table-column-->
                <!--label="操作"-->
              <!--&gt;-->
                <!--<template slot-scope="scope">-->

                  <!--<span @click="levelAddOpen(2,scope.$index, scope.row)" class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                  <!--<span @click="deleteRow(scope.$index, productList)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>-->
                <!--</template>-->
                <!--&lt;!&ndash;<span @click="openMymodel(2,index,item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>&ndash;&gt;-->
                <!--&lt;!&ndash;<span @click="deleteRow(item,index)" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>&ndash;&gt;-->
              <!--</el-table-column>-->
            </el-table>

          </div>
        </div>
      </div>

      <div class="out_item_div" style="margin-top: 10px;">
        <el-tag
          effect="plain"
          style="border: none;font-size: 14px;width: 50px"
          type="info"
        >总价</el-tag>
        <el-tag type="success">{{totalPrice}}</el-tag>
      </div>
      <div class="out_item_div" style="width: 100%;">
        <div style="">
          <el-button @click="addEntry($event)" type="primary" style="margin-left: 655px">
            <i v-if="isLoad" class="el-icon-loading"></i>
            提交
          </el-button>
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
            <span class="my-modal-group-edit" style="font-size: 16px">出库添加</span>
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
                    class="out_item_model_input"
                    v-model="selectCatalog"
                    @change="catalogChange"
                    :options="catalogs1"
                    :props="props"
                  ></el-cascader>

                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >品牌</el-tag>
                  <el-select clearable @change="brandChange" v-model="brandId" filterable placeholder="美宜佳" class="out_item_model_input">
                    <el-option
                      v-for="item in brands"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >商品</el-tag>
                  <el-select clearable @change="skuChange" v-model="skuName" placeholder="华夫饼" class="out_item_model_input">
                    <el-option
                      v-for="item in skuNames"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>

                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >规格</el-tag>
                  <el-select clearable @change="attrChange" v-model="attrValue" placeholder="华夫饼" class="out_item_model_input">
                    <el-option
                      v-for="item in baseAttrs"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>

                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >单位</el-tag>
                  <!--<el-autocomplete-->
                  <!--class="inline-input"-->
                  <!--v-model="unit"-->
                  <!--:fetch-suggestions="querySearch"-->
                  <!--placeholder="请输入"-->
                  <!--style="width: 150px"-->
                  <!--&gt;</el-autocomplete>-->
                  <el-select clearable @change="unitChange" v-model="unitValue" placeholder="华夫饼" class="out_item_model_input">
                    <el-option
                      v-for="item in units"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >数量</el-tag>
                  <el-input-number style="width: 150px" v-model="num" :min="1" :max="chooseSku.num" label="描述文字"></el-input-number>
                  <el-tag type="info" v-if="chooseSku !== null && chooseSku !== ''">当前仓库库元数量：{{chooseSku.num}}</el-tag>
                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >单价</el-tag>

                  <el-input-number style="width: 150px"  v-model="price" :precision="2" :step="1" :min="0" :max="999999999"></el-input-number>

                  <el-tag type="warning">￥</el-tag>
                  <el-tag type="danger" v-show="priceErrorFlag">{{priceErrorTip}}</el-tag>

                </div>
                <div class="out_item_model">
                  <el-tag
                    effect="plain"
                    style="border: none;font-size: 14px;width:60px"
                    type="info"
                  >总价</el-tag>
                  <el-tag type="success">{{(num*price).toFixed(2)}}</el-tag>

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
        conditionCheckData: '',

        deliveryDate: '',//送货日期
        outs: [],
        outId: '',

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },

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
        warehouses: [],//出库仓库
        outDate: '',//出库日期
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
        // totalPrice: 0,//记录出库单总价

        productList: [],//保存添加的商品信息
        clients: [],//客户
        client: '',
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
        deliveryNum: '',//出库单号
        warehouseId2: '',
        clientId2: '',
        deliveryDate2: '',
        findAllFlag: false,
        checkType: 1,//条件查询类型
        dialogVisible: false,//备注横态框
        description: '',
        index2: '',

        //tip input
        restaurants: [],

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

      //获取出库商品
      outChange(){
        if(this.outId ===  null ||this.outId === undefined || this.outId < 1){
          return;
        }
        const url = 'api/out/getSkus';
        const data = { outId: this.outId };
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              let extend =  response.data.extend;

              if(extend !== undefined && extend !== null && extend.length > 0){
                this.productList = extend;
              }else{
                this.productList = [];
              }
            }
          }
        )
      },
      warehouseChange() {
        if(this.warehouseId > 0 && this.outDate !== ''){
          //获取出库单
          this.getOut();
        }
      },
      dateChange(){
        if(this.warehouseId > 0 && this.outDate !== ''){
          //获取出库单
          this.getOut();
        }
      },
      //获取出库单
      getOut(){
        //更新数据
        this.productList = [];
        this.outs = [];
        this.outId = '';
        const url = 'api/out/getOutByDateWarehouse';
        const data = { warehouseId: this.warehouseId, outDate: this.outDate.toLocaleDateString()};
        axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              let extend = response.data.extend;
              console.log(extend);
              if(extend !== undefined && extend !== null && extend.length > 0){
                this.outs = extend;
              }else{
                this.outs = [];
              }
            }
          }
        )
      },

      clientChange(){
        let client = this.clients.find(item => item.id === this.clientId);
        this.client = client;
        console.log(client);
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

        const data = { description: this.description.trim(), id: this.page.list[this.index2].id };
        axios.post('api/delivery/description', qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              this.page.list[this.index2].description = this.description.trim();
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
      async open(index, dataList) {

        this.index2 = index;
        this.dialogVisible = true;
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
        const { clientId2, deliveryDate2, deliveryNum, conditionCheckData } = this;

        const url = 'api/delivery/checkByCondition';
        let data = '1';
        if(type === 1){

          if( clientId2 === '' && deliveryDate2 === ''){
            this.$message.warning('请先添加查询条件');
            return;
          }

          if(deliveryDate2 === null || deliveryDate2 === ''){
            data = {  clientId: clientId2, deliveryNum: '', pageNum: pageNum,
              pageSize: pageSize, deliveryDate: '' };
          }else{
            data = {  clientId: clientId2, deliveryDate2: deliveryDate2.toLocaleDateString()
              , deliveryNum: '', pageNum: pageNum, pageSize: pageSize };
          }

        }else if(type === 2){

          if( deliveryNum === ''){
            this.$message.warning('请先添加查询条件');
            return;
          }

          data = {  clientId: clientId2, deliveryNum: deliveryNum, pageNum: pageNum,
            pageSize: pageSize,deliveryDate: ''};


        }else{
          data = { clientId: conditionCheckData.clientId, deliveryDate: conditionCheckData.deliveryDate
            , deliveryNum: conditionCheckData.deliveryNum, pageNum: pageNum, pageSize: pageSize };
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
        const url = 'api/delivery/getAllPage';
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
      //提交出库单
      addEntry(e){
        // console.log(this.client);
        // return;

        try{
          $(e.target).attr("disabled", "disabled");
          this.isLoad = true;

          const { batch, clientId, clients, warehouseId, warehouses, outNum, outId, outs
            , deliveryDate, operator} = this;

          if(this.client === null || this.client === undefined || this.client === ''){
            this.$message.warning('请先选择客户');
            return;
          }
          if(clientId === null || clientId === undefined || clientId === ''){
            this.$message.warning('请先选择客户');
            return;
          }
          if(this.client.city === null || this.client.city === undefined || this.client.city === ''){
            this.$message.warning('请添加客户城市信息');
            return;
          }
          if(this.client.address === null || this.client.address === undefined || this.client.address === ''){
            this.$message.warning('请添加具体地址');
            return;
          }
          if(this.client.phone === null || this.client.phone === undefined || this.client.phone === ''){
            this.$message.warning('请填写联系人电话');
            return;
          }
          if(this.client.contact === null || this.client.contact === undefined || this.client.contact === ''){
            this.$message.warning('请添加联系人');
            return;
          }
          if(deliveryDate === null || deliveryDate === undefined || deliveryDate === ''){
            this.$message.warning('请先选择日期');
            return;
          }

          if(batch === null || batch === undefined || batch === '' || batch < 1){
            this.$message.warning('请先填写送货批次');
            return;
          }
          if(operator === null || operator === undefined || operator === ''){
            this.$message.warning('请先填写操作员');
            return;
          }

          if(outs === null || outs === undefined || outs.length < 1){
            this.$message.warning('请先选择出库单');
            return;
          }

          let out = outs.find(item => item.id === outId);
          if(out.outNum === null || out.outNum === undefined || out.outNum === ''){
            this.$message.warning('请先选择出库单');
            return;
          }



          const data = { batch: batch, clientId: this.client.id, clientName: this.client.name, operator: operator
            , city: this.client.city, contact: this.client.contact, address: this.client.address, phone: this.client.phone, deliveryDate: deliveryDate.toLocaleDateString()
            , outId: out.id, outNum: out.outNum };

          const url = 'api/delivery/add';
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message.success('添加成功');
              }
            }
          )

        }finally {
          $(e.target).removeAttr("disabled");
          this.isLoad = false;
        }

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
        // let items = [];
        // $('.spuCheckbox').each(function(){
        //   if($(this).attr('isCheck')){//是否已选
        //     let itemId = $(this).attr('itemId');
        //     let itemName = $(this).attr('itemName');
        //     let itemCatalog3Id = $(this).attr('catalog3Id');
        //     let itemBrandId = $(this).attr('brandId');
        //
        //     const data = {id: itemId, name: itemName, catalog3Id: itemCatalog3Id, brandId: itemBrandId };
        //     items.push(data);
        //   }
        // });
        // if(items.length <= 0){
        //   this.$message({
        //     message: '请先勾选要删除的行',
        //     type: 'warning'
        //   });
        //   return false;
        // }

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
          // this.checkAll(this.pageNum, this.pageSize);
          // $('.spuCheckbox').each(function(){
          //   $(this).removeClass('checkbox-choose-full');
          //   $(this).attr('isCheck', '');
          // });
          //更新页面
          items.forEach(item2 => {
            const index = this.productList.findIndex(item => item.spuId === item2.spuId && item.catalog3Id === item2.catalog3Id
              && item.brandId === item2.brandId && item.attrValues === item2.attrValues && item.price === item2.price);//返回下标
            this.productList.splice(index);
          });

        }
      },
      //单个删除
      // async deleteRow(item,index){
      async deleteRow(index,data){
        // console.log(index);
        // console.log(data);
        // this.tableData.splice(index, 1);

        // let data = [];
        // data.push(item);
        // const result = await this.deleteItem(data).then(function (result) {
        //   return result;
        // });
        // //更新数据
        // if(result){
        //   if(this.findAllFlag){
        //     this.checkAll(this.pageNum,this.pageSize);
        //   }else{
        //     this.findItem(1,this.pageNum,this.pageSize);
        //   }
        //
        // }

        const item = data[index];

        let items = [];
        items.push(item);
        const result = await this.deleteItem(items).then(function (result) {
          return result;
        });
        //更新数据
        if(result){
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
        this.data1.catalog3Id = data.catalog3Id;
        this.data1.catalogName = data.catalogName;
        this.data1.brandId = data.brandId;
        this.data1.brandName = data.brandName;
        this.data1.name = data.name;
        this.data1.skuId = data.id;
        this.data1.attrValueStr = data.attrValueStr;
        this.data1.num = data.num;
        this.data1.price = data.price;
        this.data1.totalPrice = data.totalPrice;
        this.data1.unit = data.unit;

        this.$message.success('更新成功');
        this.openMymodel();
      },
      dealItem(){
        let { chooseSku,skuName,baseAttrs, selectCatalog, brandId, spuId, attrValues, num, price,unitValue } = this;
        // console.log(this.selectCatalog);
        // console.log(this.brandId);
        // console.log(this.spuId);
        // console.log(this.attrValues);
        // console.log(this.num);
        // console.log(this.price);
        // console.log(this.num*this.price);

        if(selectCatalog === null || selectCatalog === undefined || selectCatalog.length < 1){
          this.$message.warning('请先选择分类');
          return 0;
        }
        if(brandId === null || brandId === undefined || brandId === '' || brandId < 1){
          this.$message.warning('请先选择品牌');
          return 0;
        }
        if(skuName === null || skuName === undefined || skuName === ''){
          this.$message.warning('请先选择商品');
          return 0;
        }
        if(num === null || num === undefined || num === '' || num < 1){
          this.$message.warning('商品数量有误，请修改');
          return 0;
        }
        if(unitValue === null || unitValue === undefined || unitValue === ''){
          this.$message.warning('请先填写商品单位');
          return 0;
        }

        // let c3 = this.catalogs3.find(item => item.id === selectCatalog[2]);
        // let c2 = this.catalogs2.find(item => item.id === selectCatalog[1]);
        // let c1 = this.catalogs1.find(item => item.id === selectCatalog[0]);
        // let b1 = this.brands.find(item => item.id === brandId);
        // let s1 = this.spus.find(item => item.id === spuId);
        // let attr = [];
        // for(let i = 0; i < attrValues.length; i++){
        //   if(attrValues[i] !== undefined && attrValues[i] != null && attrValues[i] !== ''){
        //     let item = baseAttrs[i];
        //     const a = { id: item.id, name: item.name, valueStr: attrValues[i]};
        //     attr.push(a);
        //   }
        // }
        //
        // const data = { catalog3Id: selectCatalog[2], catalogName: c1.name + '/' + c2.name + '/' + c3.name, brandId: brandId, brandName: b1.name,
        //   name: s1.name, spuId: spuId, baseAttrs: attr, num: num, price: price, totalPrice: Math.round((num*price) * 100) / 100, unit: unit,attrValues: attrValues,
        //   selectCatalog: selectCatalog };
        this.chooseSku.price = price;
        this.chooseSku.num = num;
        this.chooseSku.totalPrice =  Math.round((num*price) * 100) / 100;

        return this.chooseSku;
      },
      //spu add
      async itemAdd(){
        const data = await this.dealItem();
        if(data === 0){
          return;
        }


        //清空数据
        // this.selectCatalog = [];
        // this.brandId = '';
        // this.spuId = '';
        // this.attrValues = [];
        // this.baseAttrs = [];
        // this.num = 1;

        console.log(data);
        this.productList.push(data);
        this.$message.success('成功添加');

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
        // if(this.spuId === null || this.spuId === undefined || this.spuId === '' || this.spuId === 0){
        //   return;
        // }
        // const url = 'api/baseAttr/getAttrAndValue';
        // const data = { spuId: this.spuId };
        // await axios.post(url, qs.stringify(data)).then(
        //   response => {
        //     if(response.data.code === '101'){
        //       let extend = response.data.extend;
        //       if(extend === null || extend === undefined || extend === ''){
        //         extend = [];
        //       }
        //       this.baseAttrs = extend;
        //       console.log(this.baseAttrs)
        //     }
        //   }
        // )
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
          return false;
        }
        if(this.brandId === undefined || this.brandId === null || this.brandId === ''  || this.brandId < 0 ){
          return false;
        }
        this.getSkus(catalog3Id, this.brandId);
        return true;
      },
      //获取当前catalog 和 brand 下的spus
      async getSkus(catalog3Id, brandId){
        const url = 'api/sku/getAllByCBWId';
        const data = { catalog3Id: catalog3Id , brandId: brandId, warehouseId: this.warehouseId };
        await axios.post(url, qs.stringify(data)).then(
          response => {
            if(response.data.code === '101'){
              let extend = response.data.extend;
              if(extend === null || extend === undefined || extend === ''){
                extend = [];
              }
              this.skus = extend;

              this.skuNames = [];
              this.skus.forEach(item => {
                this.skuNames.push(item.name);
              });
              //去重
              this.skuNames = Array.from(new Set(this.skuNames));
            }
          }
        )
      },



      //判断日期是否有效
      // dateChange(type){
      //   // console.log(this.outDate);//这是一个日期对象
      //   // console.log(this.outDate.toLocaleDateString());//获取当前日期 2020/4/15
      //   let curTime = new Date();
      //   if(type === 2){
      //     if(curTime < this.outDate2){
      //       this.$message.warning('请选择正确日期');
      //       this.outDate2 = '';
      //     }
      //   }else{
      //     if(curTime < this.outDate){
      //       this.$message.warning('请选择正确日期');
      //       this.outDate = '';
      //     }
      //   }

// //把字符串格式转化为日期类
//         var starttime = new Date(Date.parse(begintime));
//         var endtime = new Date(Date.pares(endtime));
//进行比较
//         return (curTime>=starttime && cutTime<=endtime);
//       },
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
        if(type === 1){
          this.flag = true;
          //清空数据
          this.selectCatalog = [];
          this.brandId = '';
          this.skus = [];
          this.chooseSkus = [];
          this.choose2Skus = [];
          this.chooseSku = '';
          this.skuName = '';
          this.baseAttrs = [];
          this.attrValue = '';
          this.unit = '';
          this.num = 1;
          this.units = [];
          this.unitValue = '';
          this.price = 0;
        }else{
          this.flag = false;
          this.index = index;
          this.data1 = data;
          const item = data;
          //赋值
          this.brandId = item.brandId;
          await this.getSkus(item.catalog3Id,item.brandId);
          this.skuName = item.name;
          await this.skuChange();
          this.attrValue = item.attrValueStr;
          await this.attrChange();
          this.unitValue = item.unit;
          await this.unitChange();
          this.num = item.num;
          this.price = item.price;
        }
        this.openMymodel();
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
          total += item.totalPrice;
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

