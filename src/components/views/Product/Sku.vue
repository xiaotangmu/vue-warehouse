<template>
    <div class="sku-div">
      <div class="main-box-view-title sku-div-menu">
        <!--<ul class="nav nav-tabs">-->
          <!--<li role="presentation" class="sku-menu-li sku-add-li"><router-link to="/index/mainBox/sku/skuAdd">商品添加</router-link></li>-->
          <!--<li role="presentation" class="sku-menu-li sku-edit-li"><router-link to="/index/mainBox/sku/skuEdit">商品维护</router-link></li>-->
        <!--</ul>-->
        <span style="line-height: 40px;padding-left: 10px" class="main-box-view-title-name">库元商品管理 <span class="span-sku-help glyphicon glyphicon-question-sign " data-toggle="popover" data-content="帮助" data-container="body" data-trigger="hover" data-placement="bottom"></span></span>

      </div>


      <el-tabs v-model="menu" style="margin-left: 10px;">
        <el-tab-pane label="库元维护" name="first"></el-tab-pane>
        <el-tab-pane label="库元添加" name="second"></el-tab-pane>
        <el-tab-pane label="库元修改记录" name="third"></el-tab-pane>
      </el-tabs>

      <div v-if="menu === 'third'" style="margin: 0 10px;">
        <div class="out-manager-content-div">
          <div class="out-manager-content">

            <div class="out-manager-head-btn-group" style="clear: both">

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;width: 50px"
                type="info"
              >仓库</el-tag>
              <el-select v-model="warehouseIdEdit" placeholder="张老板" style="">
                <el-option
                  v-for="item in warehouses"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px; width: 50px"
                type="info"
              >&nbsp;&nbsp;范围</el-tag>
              <el-select v-model="limit" placeholder="半个月内" style="">
                <el-option
                  v-for="item in limits"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>


              <el-tag
                effect="plain"
                style="border: none;font-size: 14px; width: 50px"
                type="info"
              >&nbsp;&nbsp;日期</el-tag>
              <el-date-picker
                style="width: 200px"
                v-model="skuEditDate"
                :picker-options="pickerOptions"
                type="date"
                placeholder="具体日期">
              </el-date-picker>
              <span @click="findItem2(0,1,5)" class="btn btn-info" style="font-size: 13px">
              条件查询
            </span>



              <span class="btn btn-primary" @click="checkAll2(1,5)" style="font-size: 13px">查看所有</span>

            </div>

            <div class="out-manager-list" style="margin-top: 10px;">
              <el-table
                :data="page2.list"
                highlight-current-row
                stripe
                style="width: 100%; border-top: 1px solid #ccc">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="仓库" style="margin-right: 40px">
                        <span>{{ props.row.warehouseName }}</span>
                      </el-form-item>
                      <el-form-item label="商品" style="margin-right: 40px">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="分类" style="margin-right: 40px">
                        <span>{{ props.row.catalogName }}</span>
                      </el-form-item>
                      <el-form-item label="品牌" style="margin-right: 40px">
                        <span>{{ props.row.brandName }}</span>
                      </el-form-item>
                      <el-form-item label="规格" style="margin-right: 40px">
                        <span>{{ props.row.attrValueStr }}</span>
                      </el-form-item>
                      <el-form-item label="单位" style="margin-right: 40px">
                        <span>{{ props.row.unit }}</span>
                      </el-form-item>

                      <el-form-item  label="修改日期" style="margin-right: 30px">
                        <span >{{props.row.editDate}}</span>
                      </el-form-item>
                      <el-form-item  label="操作账号" style="margin-right: 30px">
                        <span >{{props.row.operator}}</span>
                      </el-form-item>
                      <div>
                        <el-form-item  label="备注" style="margin-right: 30px">
                          <span >{{props.row.remark}}</span>
                        </el-form-item>
                      </div>

                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="仓库"
                  prop="warehouseName">
                </el-table-column>
                <el-table-column
                  label="商品"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="类型"
                  >
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.type === '0'">
                      修改
                    </el-tag>
                    <el-tag v-else type="danger">
                      删除
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="修改前">
                  <el-table-column
                    prop="num"
                    label="数量"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="单价"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="货架/位置"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="alarmValue"
                    label="警界值"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="description"
                    label="描述"
                    width="90">
                  </el-table-column>
                </el-table-column>

                <el-table-column label="修改后">
                  <el-table-column
                    label="数量"
                    width="90">
                    <template slot-scope="scope">
                      <el-tag effect="dark" type="success" v-if="scope.row.num !== scope.row.newNum && scope.row.type === '0'">
                        {{scope.row.newNum}}
                      </el-tag>
                      <span v-else>
                        {{scope.row.newNum}}
                      </span>
                    </template>

                  </el-table-column>
                  <el-table-column
                    label="单价"
                    width="90">
                    <template slot-scope="scope">
                      <el-tag effect="dark"  v-if="scope.row.price !== scope.row.newPrice && scope.row.type === '0'">
                        {{scope.row.newPrice}}
                      </el-tag>
                      <span v-else>{{scope.row.newPrice}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="货架/位置"
                    width="90">
                    <template slot-scope="scope">
                      <el-tag type="warning"  effect="dark" v-if="scope.row.address !== scope.row.newAddress && scope.row.type === '0'">
                        {{scope.row.newAddress}}
                      </el-tag>
                      <span v-else>{{scope.row.newAddress}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="警界值"
                    width="90">
                    <template slot-scope="scope">
                      <el-tag type="danger" effect="dark" v-if="scope.row.alarmValue !== scope.row.newAlarmValue && scope.row.type === '0'">
                        {{scope.row.newAlarmValue}}
                      </el-tag>
                      <span v-else>{{scope.row.newAlarmValue}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="描述"
                    width="90">
                    <template slot-scope="scope">
                      <el-tag type="info" effect="dark" v-if="scope.row.description !== scope.row.newDesc && scope.row.type === '0'">
                        {{scope.row.newDesc}}
                      </el-tag>
                      <span v-else>{{scope.row.newDesc}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>

                <!--<el-table-column-->
                  <!--label="总价"-->
                  <!--prop="totalPrice">-->
                <!--</el-table-column>-->
                <el-table-column
                  label="操作"
                >
                  <template slot-scope="scope">

                    <span @click="openEditDialog(scope.$index, page2.list)" class="btn btn-success attr-item-edit-span list-item-btn-span" style="font-size: 13px;">备注</span>
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
        <div style="font-size: 13px;" v-show="page2 !== null && page2 !== undefined && page2 !== ''">
          <span style="padding-left: 20px">第 {{page2.pageNum}} 页，共 {{page2.pages}} 页 | {{page2.total}} 条记录</span>
        </div>

        <!-- 页面按钮 -->
        <div v-show="page2 !== null && page2 !== undefined && page2 !== ''" class="brand-page-btn-div">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li v-show="page2.pageNum !== 1" @click="findAllFlag2?checkAll2(1, 5):findItem2(1,1,5)"><span>首页</span></li>
              <li v-show="page2.pageNum !== 1" @click="findAllFlag2?checkAll2(page2.pageNum-1,5):findItem2(1, pageNum2-1, 5)">
                <!--<span aria-hidden="true">&laquo;</span>-->
                <span aria-hidden="true">上一页</span>
              </li>
              <li @click="findAllFlag2?checkAll2(num, 5):findItem2(1, num, 5)" v-for="(num, index) in page2.navigatepageNums" :key="index" :class="{ 'active': page2.pageNum === num}">
                <span>{{num}}</span>
              </li>
              <li @click="findAllFlag2?checkAll2(page2.pageNum+1,5):findItem2(1,page2.pageNum+1,5)" v-show="page2.pageNum*page2.pageSize < page2.total">
                <!--<span aria-hidden="true">&raquo;</span>-->
                <span aria-hidden="true">下一页</span>
              </li>
              <li @click="findAllFlag2?checkAll2(page2.pages, 5):findItem2(1,page2.pages,5)" v-show="page2.pageNum*page2.pageSize < page2.total"><span>尾页</span></li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- 备注 添加 -->
      <el-dialog
        title="提示"
        :visible.sync="editDialogVisible"
        width="30%"
      >
        <span>备注</span>
        <el-input
          suffix-icon="el-icon-edit el-input__icon"
          v-model="editRemark"
          placeholder="老王"
          maxlength="20"
          style="width: 400px"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateEditRemark">确 定</el-button>
        </span>
      </el-dialog>


      <div v-if="menu === 'first'" style="margin: 0 10px">
        <div class="" style="padding: 0 0 10px 10px;" >
          <span class="btn btn-primary" @click="checkAll(1, 5)">查看所有</span>
          <span @click="deleteRows()" class="btn btn-danger">删除已选</span>
          <span class="form-inline" style="padding-left: 280px;">
              <input v-model="findData" class=" form-control" type="text" placeholder="仓库/商品/品牌/分类"/>
              <span @click="findItem(0,1,5)" class="btn btn-warning"><span class="glyphicon glyphicon-search"></span> 查找</span>
            </span>
        </div>

        <div class="sku-item-list">

          <el-table
            @selection-change="changeChoose"
            :data="page.list"
            highlight-current-row
            style="width: 100%;border-top: 1px solid #ccc">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="分类" style="margin-right: 50px;">
                    <span>{{ props.row.catalogName }}</span>
                  </el-form-item>
                  <el-form-item label="品牌" style="margin-right: 50px;">
                    <el-tag
                      type="warning"
                      effect="plain">
                      <span>{{ props.row.brandName }}</span>
                    </el-tag>
                  </el-form-item>
                  <el-form-item label="商品名称" style="margin-right: 50px;">
                    <el-tag><span>{{ props.row.name }}</span></el-tag>
                  </el-form-item>
                  <el-form-item label="商品 ID" style="margin-right: 50px;">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="规格">
                    <el-tag type="warning"><span>{{ props.row.attrValueStr }}</span></el-tag>
                  </el-form-item><br />
                  <el-form-item label="仓库" style="margin-right: 50px;">
                    <el-tag type="success"><span>{{ props.row.warehouseName }}</span></el-tag>
                  </el-form-item>
                  <el-form-item label="货架/位置" style="margin-right: 50px;">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="库存数量" style="margin-right: 50px;">
                    <el-tag
                      type="success"
                      effect="plain">
                      <span>{{ props.row.num }}</span>
                    </el-tag>
                  </el-form-item>
                  <el-form-item label="定价(￥)">
                    <span>{{ props.row.price }}</span>
                  </el-form-item><br />
                  <el-form-item label="警戒值">
                    <el-tag type="danger" effect="plain" style="margin-right: 10px"><span>{{ props.row.alarmValue }}</span></el-tag>
                    <el-tag
                      type="info"
                      >
                      <span>为0，表示不作警报处理</span>
                    </el-tag>
                  </el-form-item><br />
                  <el-form-item label="备注">
                    <span>{{ props.row.description }}</span>
                  </el-form-item><br />
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="80">
            </el-table-column>
            <el-table-column
              label="仓库"
              prop="warehouseName">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="name">
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
              label="数量"
              prop="num">
            </el-table-column>
            <el-table-column
              label="单价"
              prop="price">
            </el-table-column>
            <el-table-column
              label="警界值"
              prop="alarmValue">
            </el-table-column>
            <el-table-column
              label="操作"
              >
              <template slot-scope="scope">
                <span @click="openMymodel(scope.$index, scope.row)" class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>
                <!--<span @click="dialogFormVisible = true" class="btn btn-primary attr-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>-->
                <span @click="deleteRow(scope.$index, page.list)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>
              </template>
            </el-table-column>
          </el-table>

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

        <!--<router-view></router-view>-->
      </div>

      <!-- 横态框 -->
      <el-dialog title="库元更新" :visible.sync="dialogFormVisible">

        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >仓库</el-tag>
          <el-tag type="success" effect="plain">{{sku.warehouseName}}</el-tag>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >品牌</el-tag>
          <el-tag type="success" effect="plain">{{sku.brandName}}</el-tag>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >商品</el-tag>
          <el-tag type="success" effect="plain">{{sku.name}}</el-tag>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >规格</el-tag>
          <el-tag type="success" effect="plain">{{sku.attrValueStr}}</el-tag>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >数量</el-tag>
          <el-input-number style="width: 150px" v-model="updateNum" :min="0" :max="99999999" ></el-input-number>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >定价</el-tag>
          <el-input-number style="width: 150px" v-model="updatePrice" :precision="2" :step="1" :min="0" :max="99999999" ></el-input-number>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            type="danger"
            style="font-size: 13px;width:60px"
          >警界值</el-tag>
          <el-input-number style="width: 150px" v-model="updateAlarmValue" :min="0" :max="99999999" ></el-input-number>
          <el-tag type="info" >为0，不作警报处理</el-tag>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px;position: relative;left: -20px;"
            type="info"
          >货架/位置</el-tag>
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="updateAddress"
            maxlength="20"
            show-word-limit
            style="max-height: 200px; width: 300px"
          >
          </el-input>
        </div>
        <div class="entry_item_model" style="margin: 0 0 20px 120px">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:60px"
            type="info"
          >备注</el-tag>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="updateDesc"
            maxlength="30"
            show-word-limit
            style="max-height: 200px; width: 300px"
          >
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer" style="margin-right: 100px">
          <el-button @click="openOrShowMymodel">取 消</el-button>
          <!--<el-button type="primary" @click="updateItem($event)"> 定</el-button>-->
          <el-button v-if="flag" @click="updateItem($event)" type="primary">
            <i v-if="isLoad" class="el-icon-loading"></i>更 新</el-button>
        </div>
      </el-dialog>

      <div v-if="menu === 'second'" style="padding: 0 0 10px 10px;">
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px"
            type="info"
          >分类</el-tag>
          <el-cascader
            class="sku_item_model_input"
            v-model="selectCatalog"
            @change="catalogChange"
            :options="catalogs1"
            :props="props"
          ></el-cascader>

        </div>
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px"
            type="info"
          >品牌</el-tag>
          <el-select @change="brandChange" v-model="brandId" filterable placeholder="美宜佳" class="sku_item_model_input">
            <el-option
              v-for="item in brands"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px"
            type="info"
          >商品</el-tag>
          <el-select @change="spuChange" v-model="spuId" placeholder="华夫饼" class="sku_item_model_input">
            <el-option
              v-for="item in spus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </div>
        <div v-if="baseAttrs !== null && baseAttrs !== '' && baseAttrs.length > 0">
          <el-divider  content-position="left">商品规格</el-divider>
          <div class="sku_item_model" v-for="(item,index) in baseAttrs" :key="index">
            <el-tag
              effect="plain"
              style="border: none;font-size: 14px;width:70px"
              type="info"
            >{{item.name}}</el-tag>
            <el-select v-model="attrValues[index]" placeholder="1号仓库" class="sku_item_model_input">
              <el-option
                v-for="item2 in item.value"
                :key="item2"
                :label="item2"
                :value="item2">
              </el-option>
            </el-select>
          </div>
        </div>

        <el-divider></el-divider>
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px"
            type="info"
          >仓库</el-tag>
          <el-select v-model="warehouseId" placeholder="1号仓库" style="width: 300px">
            <el-option
              v-for="item in warehouses"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-tag type="danger" v-show="warehouseErrorFlag">{{warehouseErrorTip}}</el-tag>
        </div>
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px;"
            type="info"
          >货架/位置</el-tag>
          <el-input
            suffix-icon="el-icon-edit el-input__icon"
            v-model="address"
            placeholder="3/第四堆/西南角"
            style="width: 300px"
          ></el-input>
        </div>
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px"
            type="info"
          >数量</el-tag>
          <el-input-number style="width: 150px" v-model="num" :min="0" :max="988999999" label="描述文字"></el-input-number>
          <!--<el-input-->
          <!--v-model="num"-->
          <!--placeholder="22"-->
          <!--style="width: 150px"-->
          <!--@change="numChange"-->
          <!--&gt;</el-input>-->
          <el-tag type="danger" v-show="numErrorFlag">{{numErrorTip}}</el-tag>
        </div>
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px"
            type="info"
          >单位</el-tag>
          <el-autocomplete
            class="inline-input"
            v-model="unit"
            :fetch-suggestions="querySearch"
            placeholder="请输入"
            style="width: 150px"
          ></el-autocomplete>
        </div>
        <div class="sku_item_model">
          <el-tag
            effect="plain"
            style="border: none;font-size: 14px;width:70px"
            type="info"
          >定价</el-tag>

          <el-input-number style="width: 150px"  v-model="price" :precision="2" :step="1" :max="1000000000000"></el-input-number>

          <!--<el-input-->
          <!--v-model="price"-->
          <!--@change="priceChange"-->
          <!--placeholder="请输入内容"-->
          <!--style="width: 150px"-->
          <!--&gt;</el-input>-->
          <el-tag type="warning">￥</el-tag>
          <el-tag type="danger" v-show="priceErrorFlag">{{priceErrorTip}}</el-tag>

        </div>
        <div class="sku_item_model">
          <el-tag
            style="border: none;font-size: 14px;width:60px;margin-right: 10px;"
            type="danger"
          >警报值</el-tag>
          <el-input-number style="width: 150px" v-model="updateAlarmValue" :min="0" :max="999999" label="描述文字"></el-input-number>
          <el-tag
            type="info"
          >为0, 不报警</el-tag>

        </div>
        <div class="sku_item_model">


          <el-button v-if="flag" @click="itemAdd($event)" type="primary" style="margin: 20px 0 0 180px ;">
            <i v-if="isLoad" class="el-icon-loading"></i>添加</el-button>


        </div>

      </div>

      <!-- Modal -->
      <div id="sku-help-modal" class="my-modal" style="display: none">
        <div class="my-modal-content-div thumbnail" style="display: none">
          <div class="my-modal-title">
            <span>添加商品说明</span>
            <span class="my-modal-remove glyphicon glyphicon-remove"></span>
          </div>
          <div class="my-modal-content">
            <p>请先添加商品需要的品牌，属性等信息</p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    export default {
      data(){
        let that = this;

        return{

          priceErrorTip: '',
          warehouseErrorFlag: '',
          warehouseErrorTip: '',
          numErrorFlag: '',
          numErrorTip: '',
          priceErrorFlag: '',


          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
          limit: '',
          warehouseIdEdit: '',
          skuEditDate: '',
          page2: '',
          pageNum2: 1,//首页
          pageSize2: 5,//每页数据数
          findAllFlag2: '',//true -- 查找所有，false -- 条件查询
          //封装查询条件
          conditionCheckData: '',
          limits: ['一个星期内', '一个月内', '三个月内', '半年内', '一年内', '两年内'],
          editRemark: '',
          editDialogVisible: false,
          editIndex: '',
          editData: '',


          menu: 'first',
          spus: [],//可以选择的商品
          num: '',//数量
          price: '',//单价
          itemTotalPrice: '',//单商品总价
          spuId: '',//绑定当前 spu
          selectCatalog: '',//绑定当前分类
          attrIds: [],//绑定当前attr
          attrValues: [],//绑定当前attr 值
          unit: '',//单位
          address: '',//
          updateAddress: '',

          dialogFormVisible: false,
          catalogs1: [],
          catalogs2: [],
          catalogs3: [],
          selectData: [],//选中数据 -- 返回的是数组 三个id
          flag: true,//true -- 添加选择框，false -- 更新
          myAttr: '',//input 绑定
          // myAttr2: '',//更新时比较是否原来那个
          tempAttr: '',//用来暂存更新前的属性数据
          index: '',//记录当前要更新的数据下标
          chooseList: [],//用来保存勾选中的item
          brandIds: '',
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

          isLoad: false,
          brands: [],
          itemName1: '',
          itemName2: '',

          baseAttrs: [],//记录加载的属性列表
          baseAttrs2: [],//记录选中的属性
          brandId: '',//选中的品牌id
          description: '',//横态框 -- 描述数据
          findData: '',//搜索框绑定
          findData2: '',//搜索框绑定 -- 用来更新列表

          //分页数据
          page: '',
          pageNum: 1,//首页
          pageSize: 5,//每页数据数

          updateData: '',//暂存更新前的数据 -- item
          catalogName: '',//更新时记录三级分类 -- 不让修改
          findAllFlag: '',//true -- 查找所有，false -- 条件查询
          warehouses: [],//入库仓库
          warehouseId: '',//绑定当前仓库

          inputVisible: false,
          inputValue: '',
          formLabelWidth: '120px',

          sku: '',//记录当前编辑的sku
          updateNum: '',
          updatePrice: '',
          updateAlarmValue: '',
          updateDesc: '',
        }

      },
      // computed:{
      //   totalPrice: function(){
      //     let total = 0;
      //     this.productList.forEach(item => {
      //       total += item.totalPrice;
      //     });
      //     return total;
      //   }
      //
      // },
      mounted(){
        $(".sku-menu-li").click(function(){
          $(this).parent().find('li').each(function(){
            $(this).removeClass('active');
            $(this).find('a').css('color', '#337AB7');
          });
          $(this).addClass('active');
          $(this).find('a').css('color', '#60AD94');

        });
        //帮助提示
        $('.span-sku-help').hover(function(){
          $(this).popover('show');
        });
        $('.span-sku-help').click(function(){
          // $('#myModal').show();
          $('#sku-help-modal').show();
          $('#sku-help-modal .my-modal-content-div').show('slow');
        });
        $('#sku-help-modal .my-modal-remove').click(function(){
          $('#sku-help-modal').hide();
          $('#sku-help-modal .my-modal-content-div').hide();
        });

        //tip input
        this.restaurants = this.$store.state.units;
        this.getWarehouseAll();
        this.loadCatalog1();
        this.loadBrand();
      },
      methods: {
        updateEditRemark(){
          const url = 'api/sku/updateEditRemark';
          const data = { remark: this.editRemark.trim(), id: this.editData.id };
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.editData.remark = data.remark;
                this.$message.success('更新成功');
                this.editDialogVisible = false;
              }
            }
          )
        },
        openEditDialog(index, list){

          this.editIndex = index;
          this.editData = list[index];
          this.editRemark = this.editData.remark;
          this.editDialogVisible = true;
        },
        //修改记录
        //查询所有
        async checkAll2(pageNum, pageSize){
          const url = 'api/sku/getAllEdit';
          const data = {pageNum: pageNum, pageSize: pageSize};
          await axios.post(url,qs.stringify(data)).then(
            response => {
              if(response.data.code === '101' || response.data.code === '102'){
                let page1 = response.data.extend;
                if(page1 === null || page1.list === null || page1.list.length === 0){
                  this.$message({
                    message: '暂无数据',
                    type: 'warning'
                  });
                  this.page2 = '';
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
                this.page2 = response.data.extend;
                this.findAllFlag2 = true;
                this.pageData2();
              }

            }
          );
        },
        //page 数据处理 -- 用于分页
        pageData2(){
          this.pageNum2 = this.page2.pageNum;
          this.pageSize2 = this.page2.pageSize;
          let p1 = this.page2.total/this.page2.pageSize;//会保留余数
          this.page2.pages = Math.ceil(p1);
          this.page2.navigatepage = 5;
          if(this.page2.pages > 5) {
            if(this.page2.pageNum <= 3){
              this.page2.navigatepageNums = [1,2,3,4,5];
            }
            if(this.page2.pageNum > 3 && (this.page2.pageNum + 2) >= this.page2.pages){
              this.page2.navigatepageNums = [this.page2.pages-4,this.page2.pages-3,this.page2.pages-2,this.page2.pages-1,this.page2.pages];
            }else if(this.page2.pageNum > 3 && (this.page2.pageNum + 2) < this.page2.pages){
              this.page2.navigatepageNums = [this.page2.pageNum-2,this.page2.pageNum-1,this.page2.pageNum,this.page2.pageNum+1,this.page2.pageNum+2];
            }
          }else if(this.page2.pages <= 5){
            this.page2.navigatepageNums = [];
            for (let i=1; i <= this.page2.pages; i++){
              this.page2.navigatepageNums.push(i);
            }
          }
        },
        //查找信息
        findItem2(type, pageNum, pageSize){//type: 0 -- 由 find 查找分页，1 -- 更新，换页
          const {limit, warehouseIdEdit, skuEditDate,conditionCheckData } = this;
          let data = '';
          // let str = this.findData.trim();
          if(type === 0){
            if(limit === '' && warehouseIdEdit === '' && skuEditDate ===  '' ){
              this.$message({
                message: '请选择查找条件',
                type: 'warning'
              });
              return;
            }
            if(skuEditDate === null || skuEditDate === ''){
              data = {limit: limit,warehouseId: warehouseIdEdit,skuEditDate: '', pageNum: 1, pageSize: 5};//首页
            }else{

              data = {limit: limit,warehouseId: warehouseIdEdit,skuEditDate: skuEditDate.toLocaleDateString(), pageNum: 1, pageSize: 5};//首页
            }
          }else{
            data = {limit: conditionCheckData.limit,warehouseId: conditionCheckData.warehouseId,skuEditDate: conditionCheckData.skuEditDate, pageNum: pageNum, pageSize: pageSize};
          }

          const url = 'api/sku/getSkuEdit';
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101' || response.data.code === '102'){
                if(response.data.extend === null){
                  this.$message({
                    message: '暂无数据',
                    type: 'warning'
                  });
                  this.page2 = '';
                  return;
                }

                if(type === 0){
                  this.conditionCheckData = data;
                }
                this.page2 = response.data.extend;
                this.findAllFlag2 = false;//条件查询

                this.pageData2();
              }

            }
          );
        },

        // async menuChange(){
        //   if(this.menu === 'second'){
        //     if(this.catalogs1 === null || this.catalogs1 === undefined || this.catalogs1.length === 0){
        //       await this.loadCatalog1();
        //     }
        //     if(this.brands === null || this.brands === undefined || this.brands.length === 0){
        //       await this.loadBrand();
        //     }
        //
        //
        //   }
        // },

        async updateItem(e){
          const { sku, updateNum, updatePrice, updateAlarmValue, updateDesc, updateAddress } = this;

          if(updateNum === sku.num && updatePrice === sku.price && updateAlarmValue === sku.alarmValue && updateDesc === sku.description && updateAddress === sku.description){
            this.$message.warning('请先修改数据');
            return;
          }

          this.isLoad = true;
          $(e.target).attr("disabled", "disabled");

          const data = { id: sku.id, num: updateNum, price: updatePrice, alarmValue: updateAlarmValue, description: updateDesc, address: updateAddress, skuEdit: '' };

          const data2 = { skuId: sku.id, warehouseId: sku.warehouseId, warehouseName: sku.warehouseName, catalogName: sku.catalogName, brandName: sku.brandName,
            unit: sku.unit, attrValueStr: sku.attrValueStr, num: sku.num, description: sku.description, alarmValue: sku.alarmValue,
            price: sku.price, address: sku.address, newNum: updateNum, newPrice: updatePrice, newDesc: updateDesc, newAddress: updateAddress,
            editDate: new Date().toLocaleDateString(), remark: '', operator: this.$store.state.user.name, type: '0', name: sku.name,
            newAlarmValue: updateAlarmValue
          };
          data.skuEdit = JSON.stringify(data2);
          await axios.post('api/sku/update', qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message.success('更新成功');

                //更新数据
                this.sku.num = data.num;
                this.sku.price = data.price;
                this.sku.alarmValue = data.alarmValue;
                this.sku.description = data.description;
                this.address = data.address;
                this.openOrShowMymodel();
              }
            }
          );
          this.isLoad = false;
          $(e.target).removeAttr("disabled");


        },
        dealItem(){
          let { baseAttrs, selectCatalog, brandId, spuId, attrValues, num, price,unit, warehouses,warehouseId } = this;
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
          if(spuId === null || spuId === undefined || spuId === '' || spuId < 1){
            this.$message.warning('请先选择商品');
            return 0;
          }
          if(warehouseId === null || warehouseId === undefined || warehouseId === '' || warehouseId < 1){
            this.$message.warning('请先选择仓库');
            return 0;
          }

          if(num === null || num === undefined || num === '' || num < 0){
            this.$message.warning('商品数量有误，请修改');
            return 0;
          }
          if(unit === null || unit === undefined || unit === ''){
            this.$message.warning('请先填写商品单位');
            return 0;
          }

          let c3 = this.catalogs3.find(item => item.id === selectCatalog[2]);
          let c2 = this.catalogs2.find(item => item.id === selectCatalog[1]);
          let c1 = this.catalogs1.find(item => item.id === selectCatalog[0]);
          let b1 = this.brands.find(item => item.id === brandId);
          let s1 = this.spus.find(item => item.id === spuId);
          let w1 = this.warehouses.find(item => item.id === warehouseId);
          let attr = [];
          for(let i = 0; i < attrValues.length; i++){
            if(attrValues[i] !== undefined && attrValues[i] != null && attrValues[i] !== ''){
              let item = baseAttrs[i];
              const a = { id: item.id, name: item.name, valueStr: attrValues[i]};
              attr.push(a);
            }
          }

          let attrValueStr = '';
          attr.forEach(item => {
            if(item !== undefined || item !== null){
              attrValueStr = attrValueStr + item.name + ': ' + item.valueStr + '; ';
            }
          });

          let s = attrValueStr.substring(0,attrValueStr.length -2);

          const data = { catalog3Id: selectCatalog[2], catalogName: c1.name + '/' + c2.name + '/' + c3.name, brandId: brandId, brandName: b1.name,
            name: s1.name, spuId: spuId, baseAttrs: attr, num: num, price: price, totalPrice: Math.round((num*price) * 100) / 100, unit: unit,attrValues: attrValues,
            selectCatalog: selectCatalog,alarmValue: this.updateAlarmValue, warehouseId: warehouseId, warehouseName: w1.name, attrValueStr: s };

          return data;
        },
        //spu add
        async itemAdd(e){
          const data = await this.dealItem();
          if(data === 0){
            return;
          }

          this.isLoad = true;
          $(e.target).attr("disabled", "disabled");

          const url = 'api/sku/add';
          const data2 = { skuStr: JSON.stringify(data)};
          await axios.post(url, qs.stringify(data2)).then(
            response => {
              if(response.data.code === '101'){
                this.$message.success('成功添加');
              }
            }
          )
          this.isLoad = false;
          $(e.target).removeAttr("disabled");

          //清空数据
          // this.selectCatalog = [];
          // this.brandId = '';
          // this.spuId = '';
          // this.attrValues = [];
          // this.baseAttrs = [];
          // this.num = 1;

          // this.productList.push(data);


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
        //查看是否可以获取数据
        async spuChange(){
          if(this.spuId === null || this.spuId === undefined || this.spuId === '' || this.spuId === 0){
            return;
          }
          const url = 'api/baseAttr/getAttrAndValue';
          const data = { spuId: this.spuId };
          await axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                let extend = response.data.extend;
                if(extend === null || extend === undefined || extend === ''){
                  extend = [];
                }
                this.baseAttrs = extend;
                console.log(this.baseAttrs)
              }
            }
          )
        },
        //catalog 分类 option 选择改变时触发
        catalogChange(){
          this.spuId = '';
          this.spus = [];
          this.baseAttrs = [];
          this.attrValues = [];
          this.checkCatalogAndBrand();
        },
        //brand 品牌 option 选择改变时触发
        brandChange(){
          this.spuId = '';
          this.spus = [];
          this.baseAttrs = [];
          this.attrValues = [];
          this.checkCatalogAndBrand();
        },
        checkCatalogAndBrand(){
          let catalog3Id = this.selectCatalog[2];
          if(catalog3Id === null || catalog3Id === undefined || catalog3Id === '' || catalog3Id < 1){
            return false;
          }
          if(this.brandId === undefined || this.brandId === null || this.brandId === ''  || this.brandId < 0 ){
            return false;
          }
          this.getSpus(catalog3Id, this.brandId);
          return true;
        },
        //获取当前catalog 和 brand 下的spus
        async getSpus(catalog3Id, brandId){
          const url = 'api/spu/getAll';
          const data = { catalog3Id: catalog3Id , brandId: brandId };
          await axios.get(url, {params: data}).then(
            response => {
              if(response.data.code === '101'){
                let extend = response.data.extend;
                if(extend === null || extend === undefined || extend === ''){
                  extend = [];
                }
                this.spus = extend;
              }
            }
          )
        },

        //勾选
        changeChoose(val){
          this.chooseList = val;
        },


        //查找信息
        findItem(type, pageNum, pageSize){//type: 0 -- 由 find 查找分页，1 -- 更新，换页
          let data = '';
          let str = this.findData.trim();
          if(type === 0){
            if(str === '' || str === null || str ===  undefined ){
              this.$message({
                message: '请输入要查找的信息',
                type: 'warning'
              });
              return;
            }
            data = {name: str, pageNum: 1, pageSize: 5};//首页
          }else{
            data = {name: this.findData2, pageNum: pageNum, pageSize: pageSize};
          }

          const url = 'api/sku/find';
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101' || response.data.code === '102'){
                if(response.data.extend === null){
                  this.$message({
                    message: '暂无数据',
                    type: 'warning'
                  });
                  this.page = '';
                  return;
                }
                if(type === 0){
                  this.findData2 = str;
                }
                this.page = response.data.extend;
                this.findAllFlag = false;//条件查询

                this.pageData();
              }

            }
          );
        },

        //删除多个
        async deleteRows(){

          console.log(this.chooseList)

          if(this.chooseList.length <= 0){
            this.$message({
              message: '请先勾选要删除的行',
              type: 'warning'
            });
            return false;
          }

          const result = await this.deleteItem(this.chooseList).then(function (result) {
            return result;
          });
          //更新数据
          if(result){
            let indexs = [];
            this.chooseList.forEach(item => {
              let index = this.page.list.findIndex(item2 => item2.id === item.id);
              // this.page.list.splice(index, 1);//直接移除会出错 index 下移
              if(index != null){
                indexs.push(index);
              }
            });
            //给index 排序 从大到小删除，就不会造成移位
            indexs = indexs.sort();
            for(let i = 0; i < indexs.length; i++){
              let i2 = indexs[indexs.length - 1 - i];
              this.page.list.splice(i2, 1);
            }
          }
        },
        //单个删除
        async deleteRow(index,data){
          // console.log(index);
          // console.log(data);
          // this.tableData.splice(index, 1);

          let data1 = [];
          data1.push(data[index]);
          const result = await this.deleteItem(data1).then(function (result) {
            return result;
          });
          //更新数据
          if(result){
            data.splice(index, 1);
          }
        },
        //删除item
        async deleteItem(items){//name,id,catalog3Id,brandId -- 用对象封装


          console.log(items);
          let names = '';
          let ids = '';
          let skuEdit = '';
          for(let i = 0; i <= items.length -1; i++){
            names += items[i].name + '、';
            ids += items[i].id + '-';
            items[i].editDate = new Date().toLocaleDateString();
            items[i].type = '1';
            items[i].operator = this.$store.state.user.name;
            items[i].remark = '';
            skuEdit += JSON.stringify(items[i]) + '---' ;
          }


          let s = names.substring(0, names.length -1);
          let idStr = ids.substring(0, ids.length -1);
          let skuEditStr = skuEdit.substring(0, skuEdit.length -3);

          const re1 = await this.$confirm('请慎重删除数据，在删除前请下载好绑定的表单数据，您确定要删除 ' +  s + ' 的数据吗?', '提示', {
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

          const url = 'api/sku/delete';
          const data = { idStr: idStr, skuEditStr: skuEditStr };

          return await axios.post(url,qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message({
                  message: '成功删除',
                  type: 'success'
                });
                return true;
              }
              return false;
            }
          );
        },

        //查询所有
        async checkAll(pageNum, pageSize){
          const url = 'api/sku/getAllPage';
          const data = {pageNum: pageNum, pageSize: pageSize};
          await axios.get(url,{params: data}).then(
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
                this.findAllFlag = true;
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
          if(this.isCheckName){//是否name查找分页
            this.findItem(1, this.pageNum, this.pageSize);
          }else{
            this.checkAll(this.pageNum, this.pageSize);
          }
        },

        //加载品牌
        async loadBrand(){
          const url = 'api/brand/getAll';
          await axios.get(url).then(
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
        async loadCatalog1(){
          const url = 'api/catalog1/getAll';
          await axios.get(url).then(
            response => {
              if(response.data.code === '101'){
                this.catalogs1 = response.data.extend;
              }
            }
          )
        },
        //捕捉选项, 并加载列表
        optionChange(catalog3Id){
          // console.log(this.selectData[2]);
          const url = 'api/baseAttr/getAll';
          let data = '';
          if(this.flag){//添加获取数据
            data = { catalog3Id: this.selectData[2] };
          }else{
            data = { catalog3Id: catalog3Id };
          }

          axios.get(url, {params: data}).then(
            response => {
              if(response.data.code === '101'){
                this.baseAttrs = response.data.extend;
                if(this.flag){//添加置零
                  this.baseAttrs2 = [];
                }
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
        //显示编辑框
        async openMymodel(index, data){
          this.sku = data;
          this.index = index;

          this.updateNum = this.sku.num;
          if(this.sku.description === null){
            this.updateDesc = "";
          }else{
            this.updateDesc = this.sku.description + "";
          }

          this.updatePrice = this.sku.price;
          this.updateAlarmValue = this.sku.alarmValue;
          this.updateAddress = this.sku.address;
          this.openOrShowMymodel();

        },
        //开关横态框
        openOrShowMymodel(){
          this.dialogFormVisible = !this.dialogFormVisible;
        },
      }
    }
</script>

<style>

  .sku-div-menu{
    padding: 5px;
    /*background-color: #60AD94;*/
    height: 50px;
    width: 100%;
  }
  .span-sku-help{
    display: inline-block;
    float: right;
    font-size: 20px;
    margin: 10px 40px;
  }
  .my-modal-content-div{
    /*width: 900px;*/
    /*background-color: #fff;*/
    /*height: 500px;*/
    /*position: absolute;*/
    margin: 50px auto 0;
  }
  .sku-item-list th{
    font-weight: bold;
  }
  .sku-item-list .btn{
    font-size: 14px;
    padding: 0 20px;
  }
  .sku-item-list .page-btn-div nav{
    display: inline-block;
    /*background-color: #316AC5;*/
    margin: 0 auto;
    padding: 20px 0 0 0;
  }
  .sku_item_model{
    /*border: 1px solid #60AD94;*/
    width: 500px;
    margin: 10px auto;

  }

</style>
