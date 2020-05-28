<template>
    <div>
      <div class="main-box-view-title">
        <span class="main-box-view-title-name">报表分析 <span class="glyphicon glyphicon-question-sign"></span></span>
      </div>

      <el-tabs v-model="menu" style="margin-left: 20px;">
        <el-tab-pane label="入库单" name="entry"></el-tab-pane>
        <el-tab-pane label="出库单" name="out"></el-tab-pane>
        <el-tab-pane label="送货单" name="delivery"></el-tab-pane>
        <el-tab-pane label="盘点单" name="check"></el-tab-pane>
      </el-tabs>

      <div v-if="menu === 'entry'" style="margin: 0 20px">
        <div class="entry-manager-content-div">
          <div class="entry-manager-content">

            <div class="entry-manager-head-btn-group" style="clear: both">

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;width: 60px"
                type="info"
              >仓库</el-tag>
              <el-select clearable v-model="entryWarehouseId" placeholder="张老板" style="">
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
              >供应商</el-tag>
              <el-select clearable  v-model="entrySupplierId" placeholder="张老板" style="">
                <el-option
                  v-for="item in suppliers"
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
                v-model="entryDate"
                :picker-options="pickerOptions"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-tag
                effect="plain"
                style="border: none;font-size: 14px; width: 60px"
                type="info"
              >&nbsp;&nbsp;范围</el-tag>
              <el-select clearable  v-model="entryLimit" placeholder="张老板" style="">
                <el-option
                  v-for="item in limits"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>

              <span @click="checkEntryByCondition(1,5,1)" class="btn btn-info" style="font-size: 13px">
              条件查询
            </span>

              <div style="margin: 5px 0;">
                <el-tag
                  effect="plain"
                  style="border: none;font-size: 14px;width: 60px"
                  type="info"
                >入库单</el-tag>
                <el-input
                  suffix-icon="el-icon-edit el-input__icon"
                  v-model="entryNum"
                  placeholder="202005010030004001"
                  style="width: 193px"
                ></el-input>
                <span @click="checkEntryByCondition(1,5,2)" class="btn btn-warning" style="font-size: 13px">
              <i class="el-icon-search"></i>查询
            </span>
              </div>


              <span class="btn btn-primary" @click="checkAllEntry(1,5)" style="font-size: 13px">查看所有</span>

            </div>

            <div class="entry-manager-list" style="margin-top: 10px;">
              <el-table
                :data="entryPage.list"
                highlight-current-row
                stripe
                style="width: 100%; border-top: 1px solid #ccc">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="入库单号" style="margin-right: 40px">
                        <span>{{ props.row.entryNum }}</span>
                      </el-form-item>
                      <el-form-item label="入库日期" style="margin-right: 40px">
                        <span>{{ props.row.entryDate }}</span>
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
                      <el-form-item label="总价" style="margin-right: 40px">
                        <span>{{ props.row.totalPrice }}</span>
                        ￥
                      </el-form-item><br />

                      <div v-if="props.row.productList !== undefined && props.row.productList !== null && props.row.productList.length > 0">
                        <el-divider content-position="left">商品</el-divider>
                        <div  v-for="(item, index) in props.row.productList" :key="index">
                          <el-form-item  label="分类" style="margin-right: 30px">
                            <span >{{item.catalogName}}</span>
                          </el-form-item>
                          <el-form-item  label="品牌" style="margin-right: 30px">
                            <span >{{item.brandName}}</span>
                          </el-form-item>
                          <el-form-item  label="商品名称" style="margin-right: 30px">
                            <span >{{item.name}}</span>
                          </el-form-item>
                          <el-form-item  label="商品规格" style="margin-right: 30px">
                            <span >{{item.attrValueStr}}</span>
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
                      <!--<el-divider></el-divider>-->
                      <!--<el-form-item  label="备注" style="margin-right: 30px">-->
                        <!--<span >{{props.row.description}}</span>-->
                      <!--</el-form-item>-->

                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="入库单号"
                  prop="entryNum">
                </el-table-column>
                <el-table-column
                  label="入库日期"
                  prop="entryDate">
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
                  label="总价"
                  prop="totalPrice">
                </el-table-column>
                <el-table-column
                  label="备注"
                  prop="description">
                </el-table-column>
                <!--<el-table-column-->
                  <!--label="操作"-->
                <!--&gt;-->
                  <!--<template slot-scope="scope">-->

                    <!--<span @click="open(scope.$index, entryPage.list)" class="btn btn-success attr-item-edit-span list-item-btn-span" style="font-size: 13px;">备注</span>-->
                    <!--&lt;!&ndash;<span @click="openMymodel(2,scope.$index, entryPage.list)" class="btn btn-info attr-item-edit-span list-item-btn-span" >备注</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<span @click="deleteRow(scope.$index, entryPage.list)"  class="btn btn-danger attr-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>&ndash;&gt;-->
                  <!--</template>-->
                  <!--&lt;!&ndash;<span @click="openMymodel(2,index,item)" class="btn btn-primary warehouse-item-edit-span list-item-btn-span" ><span class="glyphicon glyphicon-pencil"></span></span>&ndash;&gt;-->
                  <!--&lt;!&ndash;<span @click="deleteRow(item,index)" class="btn btn-danger warehouse-item-delete-span list-item-btn-span"><span class="glyphicon glyphicon-trash"></span></span>&ndash;&gt;-->
                <!--</el-table-column>-->
              </el-table>

            </div>
          </div>
        </div>

        <!-- 页面数据 -->
        <div style="font-size: 13px;" v-show="entryPage !== null && entryPage !== undefined && entryPage !== ''">
          <span style="padding-left: 20px">第 {{entryPage.pageNum}} 页，共 {{entryPage.pages}} 页 | {{entryPage.total}} 条记录</span>
        </div>

        <!-- 页面按钮 -->
        <div v-show="entryPage !== null && entryPage !== undefined && entryPage !== ''" class="brand-page-btn-div">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li v-show="entryPage.pageNum !== 1" @click="entryFindAllFlag?checkAllEntry(1, 5):checkEntryByCondition(1,5,3)"><span>首页</span></li>
              <li v-show="entryPage.pageNum !== 1" @click="entryFindAllFlag?checkAllEntry(entryPage.pageNum-1,5):checkEntryByCondition(entryPageNum-1, 5, 3)">
                <!--<span aria-hidden="true">&laquo;</span>-->
                <span aria-hidden="true">上一页</span>
              </li>
              <li @click="entryFindAllFlag?checkAllEntry(num, 5):checkEntryByCondition(num, 5, 3)" v-for="(num, index) in entryPage.navigatepageNums" :key="index" :class="{ 'active': entryPage.pageNum === num}">
                <span>{{num}}</span>
              </li>
              <li @click="entryFindAllFlag?checkAllEntry(entryPage.pageNum+1,5):checkEntryByCondition(entryPage.pageNum+1,5,3)" v-show="entryPage.pageNum*entryPage.pageSize < entryPage.total">
                <!--<span aria-hidden="true">&raquo;</span>-->
                <span aria-hidden="true">下一页</span>
              </li>
              <li @click="entryFindAllFlag?checkAllEntry(entryPage.pages, 5):checkEntryByCondition(entryPage.pages,5,3)" v-show="entryPage.pageNum*entryPage.pageSize < entryPage.total"><span>尾页</span></li>
            </ul>
          </nav>
        </div>
      </div>

      <div v-if="menu === 'out'" style="margin: 0 20px">
        <div class="">
          <div class="">

            <div class="out-manager-head-btn-group" style="clear: both">

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;width: 60px"
                type="info"
              >仓库</el-tag>
              <el-select clearable v-model="outWarehouseId" placeholder="张老板" style="">
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
              >&nbsp;&nbsp;客户</el-tag>
              <el-select clearable v-model="outClientId" placeholder="张老板" style="">
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
                v-model="outDate"
                :picker-options="pickerOptions"
                type="date"
                placeholder="选择日期">
              </el-date-picker>

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px; width: 60px"
                type="info"
              >&nbsp;&nbsp;范围</el-tag>
              <el-select clearable  v-model="outLimit" placeholder="张老板" style="">
                <el-option
                  v-for="item in limits"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>

              <span @click="checkOutByCondition(1,5,1)" class="btn btn-info" style="font-size: 13px">
              条件查询
            </span>

              <div style="margin: 5px 0;">
                <el-tag
                  effect="plain"
                  style="border: none;font-size: 14px;width: 60px"
                  type="info"
                >出库单</el-tag>
                <el-input
                  suffix-icon="el-icon-edit el-input__icon"
                  v-model="outNum"
                  placeholder="202005010030004001"
                  style="width: 193px"
                ></el-input>
                <span @click="checkOutByCondition(1,5,2)" class="btn btn-warning" style="font-size: 13px">
              <i class="el-icon-search"></i>查询
            </span>
              </div>


              <span class="btn btn-primary" @click="checkAllOut(1,5)" style="font-size: 13px">查看所有</span>

            </div>

            <div class="out-manager-list" style="margin-top: 10px;">
              <el-table
                :data="outPage.list"
                highlight-current-row
                stripe
                style="width: 100%; border-top: 1px solid #ccc">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="出库单号" style="margin-right: 40px">
                        <span>{{ props.row.outNum }}</span>
                      </el-form-item>
                      <el-form-item label="出库日期" style="margin-right: 40px">
                        <span>{{ props.row.outDate }}</span>

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
                      <el-form-item label="总价" style="margin-right: 40px">
                        <span>{{ props.row.totalPrice }}</span>
                        ￥
                      </el-form-item><br />

                      <div v-if="props.row.productList !== undefined && props.row.productList !== null && props.row.productList.length > 0">
                        <el-divider content-position="left">商品</el-divider>
                        <div  v-for="(item, index) in props.row.productList" :key="index">
                          <el-form-item  label="分类" style="margin-right: 30px">
                            <span >{{item.catalogName}}</span>
                          </el-form-item>
                          <el-form-item  label="品牌" style="margin-right: 30px">
                            <span >{{item.brandName}}</span>
                          </el-form-item>
                          <el-form-item  label="商品名称" style="margin-right: 30px">
                            <span >{{item.name}}</span>
                          </el-form-item>
                          <el-form-item  label="商品规格" style="margin-right: 30px">
                            <span >{{item.attrValueStr}}</span>
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
                      <!--<el-divider></el-divider>-->
                      <!--<el-form-item  label="备注" style="margin-right: 30px">-->
                        <!--<span >{{props.row.description}}</span>-->
                      <!--</el-form-item>-->

                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="出库单号"
                  prop="outNum">
                </el-table-column>
                <el-table-column
                  label="出库日期"
                  prop="outDate">
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
                  label="总价"
                  prop="totalPrice">
                </el-table-column>
                <el-table-column
                  label="备注"
                  prop="description">
                </el-table-column>
                <!--<el-table-column-->
                  <!--label="操作"-->
                <!--&gt;-->
                  <!--<template slot-scope="scope">-->

                    <!--<span @click="open(scope.$index, outPage.list)" class="btn btn-success attr-item-edit-span list-item-btn-span" style="font-size: 13px;">备注</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              </el-table>

            </div>
          </div>
        </div>

        <!-- 页面数据 -->
        <div style="font-size: 13px;" v-show="outPage !== null && outPage !== undefined && outPage !== ''">
          <span style="padding-left: 20px">第 {{outPage.pageNum}} 页，共 {{outPage.pages}} 页 | {{outPage.total}} 条记录</span>
        </div>

        <!-- 页面按钮 -->
        <div v-show="outPage !== null && outPage !== undefined && outPage !== ''" class="brand-page-btn-div">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li v-show="outPage.pageNum !== 1" @click="outFindAllFlag?checkAllOut(1, 5):checkOutByCondition(1,5,3)"><span>首页</span></li>
              <li v-show="outPage.pageNum !== 1" @click="outFindAllFlag?checkAllOut(outPage.pageNum-1,5):checkOutByCondition(outPageNum-1, 5, 3)">
                <!--<span aria-hidden="true">&laquo;</span>-->
                <span aria-hidden="true">上一页</span>
              </li>
              <li @click="outFindAllFlag?checkAllOut(num, 5):checkOutByCondition(num, 5, 3)" v-for="(num, index) in outPage.navigatepageNums" :key="index" :class="{ 'active': outPage.pageNum === num}">
                <span>{{num}}</span>
              </li>
              <li @click="outFindAllFlag?checkAllOut(outPage.pageNum+1,5):checkOutByCondition(outPage.pageNum+1,5,3)" v-show="outPage.pageNum*outPage.pageSize < outPage.total">
                <!--<span aria-hidden="true">&raquo;</span>-->
                <span aria-hidden="true">下一页</span>
              </li>
              <li @click="outFindAllFlag?checkAllOut(outPage.pages, 5):checkOutByCondition(outPage.pages,5,3)" v-show="outPage.pageNum*outPage.pageSize < outPage.total"><span>尾页</span></li>
            </ul>
          </nav>
        </div>
      </div>

      <div v-if="menu === 'delivery'" style="margin: 0 20px">
        <div class="">
          <div class="">

            <div class="out-manager-head-btn-group" style="clear: both">


              <el-tag
                effect="plain"
                style="border: none;font-size: 14px; width: 60px"
                type="info"
              >&nbsp;&nbsp;客户</el-tag>
              <el-select clearable v-model="deliveryClientId" placeholder="张老板" style="">
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
                v-model="deliveryDate"
                :picker-options="pickerOptions"
                type="date"
                placeholder="选择日期">
              </el-date-picker>

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px; width: 60px"
                type="info"
              >&nbsp;&nbsp;范围</el-tag>
              <el-select clearable  v-model="deliveryLimit" placeholder="张老板" style="">
                <el-option
                  v-for="item in limits"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>

              <span @click="checkDeliveryByCondition(1,5,1)" class="btn btn-info" style="font-size: 13px">
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
                <span @click="checkDeliveryByCondition(1,5,2)" class="btn btn-warning" style="font-size: 13px">
              <i class="el-icon-search"></i>查询
            </span>
              </div>


              <span class="btn btn-primary" @click="checkAllDelivery(1,5)" style="font-size: 13px">查看所有</span>

            </div>

            <div class="out-manager-list" style="margin-top: 10px;">
              <el-table
                :data="deliveryPage.list"
                highlight-current-row
                stripe
                style="width: 100%; border-top: 1px solid #ccc">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="送货单号" style="margin-right: 40px">
                        <span>{{ props.row.deliveryNum }}</span>

                      </el-form-item>
                      <el-form-item label="送货日期" style="margin-right: 40px">
                        <span>{{ props.row.deliveryDate }}</span>

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
                        <span>{{ props.row.out.totalPrice }}</span>
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
                      <!--<el-divider></el-divider>-->
                      <!--<el-form-item  label="备注" style="margin-right: 30px">-->
                        <!--<span >{{props.row.description}}</span>-->
                      <!--</el-form-item>-->

                    </el-form>
                  </template>
                </el-table-column>
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
                <!--<el-table-column-->
                  <!--label="操作"-->
                <!--&gt;-->
                  <!--<template slot-scope="scope">-->

                    <!--<span @click="open(scope.$index, deliveryPage.list)" class="btn btn-success attr-item-edit-span list-item-btn-span" style="font-size: 13px;">备注</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              </el-table>

            </div>
          </div>
        </div>

        <!-- 页面数据 -->
        <div style="font-size: 13px;" v-show="deliveryPage !== null && deliveryPage !== undefined && deliveryPage !== ''">
          <span style="padding-left: 20px">第 {{deliveryPage.pageNum}} 页，共 {{deliveryPage.pages}} 页 | {{deliveryPage.total}} 条记录</span>
        </div>

        <!-- 页面按钮 -->
        <div v-show="deliveryPage !== null && deliveryPage !== undefined && deliveryPage !== ''" class="brand-page-btn-div">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li v-show="deliveryPage.pageNum !== 1" @click="deliveryFindAllFlag?checkAllDelivery(1, 5):checkDeliveryByCondition(1,5,3)"><span>首页</span></li>
              <li v-show="deliveryPage.pageNum !== 1" @click="deliveryFindAllFlag?checkAllDelivery(deliveryPage.pageNum-1,5):checkDeliveryByCondition(deliveryPageNum-1, 5, 3)">
                <!--<span aria-hidden="true">&laquo;</span>-->
                <span aria-hidden="true">上一页</span>
              </li>
              <li @click="deliveryFindAllFlag?checkAllDelivery(num, 5):checkDeliveryByCondition(num, 5, 3)" v-for="(num, index) in deliveryPage.navigatepageNums" :key="index" :class="{ 'active': deliveryPage.pageNum === num}">
                <span>{{num}}</span>
              </li>
              <li @click="deliveryFindAllFlag?checkAllDelivery(deliveryPage.pageNum+1,5):checkDeliveryByCondition(deliveryPage.pageNum+1,5,3)" v-show="deliveryPage.pageNum*deliveryPage.pageSize < deliveryPage.total">
                <!--<span aria-hidden="true">&raquo;</span>-->
                <span aria-hidden="true">下一页</span>
              </li>
              <li @click="deliveryFindAllFlag?checkAllDelivery(deliveryPage.pages, 5):checkDeliveryByCondition(deliveryPage.pages,5,3)" v-show="deliveryPage.pageNum*deliveryPage.pageSize < deliveryPage.total"><span>尾页</span></li>
            </ul>
          </nav>
        </div>
      </div>

      <div v-if="menu === 'check'" style="margin: 0 20px">
        <div class="">
          <div class="">

            <div class="out-manager-head-btn-group" style="clear: both">

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px;width: 60px"
                type="info"
              >仓库</el-tag>
              <el-select v-model="checkWarehouseId" placeholder="张老板" style="">
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
                v-model="checkDate"
                :picker-options="pickerOptions"
                type="date"
                placeholder="选择日期">
              </el-date-picker>

              <el-tag
                effect="plain"
                style="border: none;font-size: 14px; width: 60px"
                type="info"
              >&nbsp;&nbsp;范围</el-tag>
              <el-select clearable  v-model="checkLimit" placeholder="张老板" style="">
                <el-option
                  v-for="item in limits"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>

              <span @click="checkCheckByCondition(1,5,1)" class="btn btn-info" style="font-size: 13px">
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
                  v-model="checkNum"
                  placeholder="202005010030004001"
                  style="width: 193px"
                ></el-input>
                <span @click="checkCheckByCondition(1,5,2)" class="btn btn-warning" style="font-size: 13px">
              <i class="el-icon-search"></i>查询
            </span>
              </div>


              <span class="btn btn-primary" @click="checkAllCheck(1,5)" style="font-size: 13px">查看所有</span>

            </div>

            <div class="out-manager-list" style="margin-top: 10px;">
              <el-table
                :data="checkPage.list"
                highlight-current-row
                stripe
                style="width: 100%; border-top: 1px solid #ccc">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="盘点单号" style="margin-right: 40px">
                        <span>{{ props.row.checkSn }}</span>

                      </el-form-item>
                      <el-form-item label="盘点日期" style="margin-right: 40px">
                        <span>{{ props.row.checkDate }}</span>

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

                          <!--<el-table-column-->
                            <!--label="操作"-->
                          <!--&gt;-->
                            <!--<template slot-scope="scope">-->
                              <!--<span @click="open(props.row.id,scope.$index, scope.row)" class="btn btn-info attr-item-edit-span list-item-btn-span" >备注</span>-->
                            <!--</template>-->
                          <!--</el-table-column>-->
                        </el-table>


                      </div>

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
              </el-table>

            </div>
          </div>
        </div>

        <!-- 页面数据 -->
        <div style="font-size: 13px;" v-show="checkPage !== null && checkPage !== undefined && checkPage !== ''">
          <span style="padding-left: 20px">第 {{checkPage.pageNum}} 页，共 {{checkPage.pages}} 页 | {{checkPage.total}} 条记录</span>
        </div>

        <!-- 页面按钮 -->
        <div v-show="checkPage !== null && checkPage !== undefined && checkPage !== ''" class="brand-page-btn-div">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li v-show="checkPage.pageNum !== 1" @click="checkFindAllFlag?checkAllCheck(1, 5):checkCheckByCondition(1,5,3)"><span>首页</span></li>
              <li v-show="checkPage.pageNum !== 1" @click="checkFindAllFlag?checkAllCheck(checkPage.pageNum-1,5):checkCheckByCondition(checkPageNum-1, 5, 3)">
                <!--<span aria-hidden="true">&laquo;</span>-->
                <span aria-hidden="true">上一页</span>
              </li>
              <li @click="checkFindAllFlag?checkAllCheck(num, 5):checkCheckByCondition(num, 5, 3)" v-for="(num, index) in checkPage.navigatepageNums" :key="index" :class="{ 'active': checkPage.pageNum === num}">
                <span>{{num}}</span>
              </li>
              <li @click="checkFindAllFlag?checkAllCheck(checkPage.pageNum+1,5):checkCheckByCondition(checkPage.pageNum+1,5,3)" v-show="checkPage.pageNum*checkPage.pageSize < checkPage.total">
                <!--<span aria-hidden="true">&raquo;</span>-->
                <span aria-hidden="true">下一页</span>
              </li>
              <li @click="checkFindAllFlag?checkAllCheck(checkPage.pages, 5):checkCheckByCondition(checkPage.pages,5,3)" v-show="checkPage.pageNum*checkPage.pageSize < checkPage.total"><span>尾页</span></li>
            </ul>
          </nav>
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
          //公共数据
          menu: 'entry',
          warehouses: [],
          clients: [],
          suppliers: [],
          limits: ['本月份','上一个月份','上第二个月份', '上第三个月份','上三个月份','一个月内','三个月内','半年内', '一年内','两年内'],
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
          },


          //入库数据
          entryWarehouseId: '',
          entrySupplierId: '',
          entryPage: '',
          entryDate: '',
          entryNum: '',
          entryFindAllFlag: '',
          entryConditionCheckData: '',//封装查询条件
          entryPageNum: '',
          entryPageSize: '',
          entryLimit: '',


          //出库数据
          outWarehouseId: '',
          outClientId: '',
          outPage: '',
          outDate: '',
          outNum: '',
          outFindAllFlag: '',
          outConditionCheckData: '',//封装查询条件
          outPageNum: '',
          outPageSize: '',
          outLimit: '',


          //送货数据
          deliveryClientId: '',
          deliveryPage: '',
          deliveryDate: '',
          deliveryNum: '',
          deliveryFindAllFlag: '',
          deliveryConditionCheckData: '',//封装查询条件
          deliveryPageNum: '',
          deliveryPageSize: '',
          deliveryLimit: '',


          //盘点数据
          checkWarehouseId: '',
          checkClientId: '',
          checkPage: '',
          checkDate: '',
          checkNum: '',
          checkFindAllFlag: '',
          checkConditionCheckData: '',//封装查询条件
          checkPageNum: '',
          checkPageSize: '',
          checkLimit: '',


        }
      },
      mounted(){
        this.getWarehouseAll();
        this.getSupplier();
      },
      methods: {
        //公共方法
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
        getSupplier(){
          axios.get('api/supplier/getAll').then(
            response => {
              if(response.data.code === '101'){
                let extend = response.data.extend;
                if(extend === null || extend === undefined || extend === ''){
                  extend = [];
                }
                this.suppliers = extend;
              }
            }
          )
        },


        //入库方法
        checkAllEntry(pageNum, pageSize){
          const url = 'api/entry/getAllPage';
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
                  this.entryPage = '';
                  return;
                }
                this.entryPage = response.data.extend;
                this.entryPageNum = pageNum;
                this.entryPageSize = pageSize;
                this.entryFindAllFlag = true;
                this.entryPageData();
              }
            }
          )
        },
        checkEntryByCondition(pageNum, pageSize,type){
          const { entryWarehouseId, entrySupplierId, entryDate, entryNum, entryConditionCheckData, entryLimit } = this;

          const url = 'api/entry/checkByConditionForm';
          let data = '1';
          if(type === 1){
            if(entryWarehouseId === '' && entrySupplierId === '' && entryDate === '' && entryLimit === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }
            //编号 》 范围 》日期
            if(entryDate === ''){

              data = { warehouseId: entryWarehouseId, supplierId: entrySupplierId, entryDate: ''
                , entryNum: '', pageNum: pageNum, pageSize: pageSize, limit: entryLimit };
            }else{
              data = { warehouseId: entryWarehouseId, supplierId: entrySupplierId, entryDate: entryDate.toLocaleDateString()
                , entryNum: '', pageNum: pageNum, pageSize: pageSize, limit: entryLimit };
            }

          }else if(type === 2){

            if(entryNum === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }

            data = { warehouseId: entryWarehouseId, supplierId: entrySupplierId, entryDate: ''
              , entryNum: entryNum, pageNum: pageNum, pageSize: pageSize, limit: '' };

          }else{
            if(entryConditionCheckData === ''){
              return;
            }
            data = { warehouseId: entryConditionCheckData.warehouseId, supplierId: entryConditionCheckData.supplierId, entryDate: entryConditionCheckData.entryDate
              , entryNum: entryConditionCheckData.entryNum, pageNum: pageNum, pageSize: pageSize, limit: entryConditionCheckData.limit };
          }
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                let extend = response.data.extend;
                if(extend === null || extend === '' || extend.list === null || extend.list === undefined || extend.list.length < 1 ){
                  extend = '';
                  this.$message.warning('暂无数据');
                }
                // this.checkType = type;
                this.entryPage = extend;
                this.entryFindAllFlag = false;
                this.entryPageNum = pageNum;
                this.entryPageSize = pageSize;
                this.entryConditionCheckData = data;
                this.entryPageData();
              }
            }
          )
        },
        //page 数据处理 -- 用于分页
        entryPageData(){
          this.entryPageNum = this.entryPage.pageNum;
          this.entryPageSize = this.entryPage.pageSize;
          let p1 = this.entryPage.total/this.entryPage.pageSize;//会保留余数
          this.entryPage.pages = Math.ceil(p1);
          this.entryPage.navigatepage = 5;
          if(this.entryPage.pages > 5) {
            if(this.entryPage.pageNum <= 3){
              this.entryPage.navigatepageNums = [1,2,3,4,5];
            }
            if(this.entryPage.pageNum > 3 && (this.entryPage.pageNum + 2) >= this.entryPage.pages){
              this.entryPage.navigatepageNums = [this.entryPage.pages-4,this.entryPage.pages-3,this.entryPage.pages-2,this.entryPage.pages-1,this.entryPage.pages];
            }else if(this.entryPage.pageNum > 3 && (this.entryPage.pageNum + 2) < this.entryPage.pages){
              this.entryPage.navigatepageNums = [this.entryPage.pageNum-2,this.entryPage.pageNum-1,this.entryPage.pageNum,this.entryPage.pageNum+1,this.entryPage.pageNum+2];
            }
          }else if(this.entryPage.pages <= 5){
            this.entryPage.navigatepageNums = [];
            for (let i=1; i <= this.entryPage.pages; i++){
              this.entryPage.navigatepageNums.push(i);
            }
          }
        },


        //出库方法
        checkOutByCondition(pageNum, pageSize,type){
          const { outWarehouseId, outClientId, outDate, outNum , outConditionCheckData, outLimit} = this;

          const url = 'api/out/checkByConditionForm';
          let data = '1';
          if(type === 1){

            if(outWarehouseId === '' && outClientId === '' && outDate === '' && outLimit === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }

            if(outDate === ''){
              data = { warehouseId: outWarehouseId, clientId: outClientId, outDate: ''
                , outNum: '', pageNum: pageNum, pageSize: pageSize, limit: outLimit };
            }else{
              data = { warehouseId: outWarehouseId, clientId: outClientId, outDate: outDate.toLocaleDateString()
                , outNum: '', pageNum: pageNum, pageSize: pageSize, limit: outLimit };
            }

          }else if(type === 2){

            if(outNum === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }

            data = { warehouseId: outWarehouseId, clientId: outClientId, outDate: ''
              , outNum: outNum, pageNum: pageNum, pageSize: pageSize, limit: '' };

          }else {
            data = { warehouseId: outConditionCheckData.warehouseId, clientId: outConditionCheckData.clientId, outDate: outConditionCheckData.outDate
              , outNum: outConditionCheckData.outNum, pageNum: pageNum, pageSize: pageSize };
          }
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                let extend = response.data.extend;
                if(extend === null || extend === '' || extend.list === null || extend.list === undefined || extend.list.length < 1 ){
                  extend = '';
                  this.$message.warning('暂无数据');
                }
                this.outPage = extend;
                this.outFindAllFlag = false;
                this.outPageNum = pageNum;
                this.outPageSize = pageSize;
                this.outConditionCheckData = data;
                this.outPageData();
              }
            }
          )
        },
        checkAllOut(pageNum, pageSize){
          const url = 'api/out/getAllPage';
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
                  this.outPage = '';
                  return;
                }
                this.outPage = response.data.extend;
                this.outPageNum = pageNum;
                this.outPageSize = pageSize;
                this.outFindAllFlag = true;
                this.outPageData();
              }
            }
          )
        },
        //page 数据处理 -- 用于分页
        outPageData(){
          this.outPageNum = this.outPage.pageNum;
          this.outPageSize = this.outPage.pageSize;
          let p1 = this.outPage.total/this.outPage.pageSize;//会保留余数
          this.outPage.pages = Math.ceil(p1);
          this.outPage.navigatepage = 5;
          if(this.outPage.pages > 5) {
            if(this.outPage.pageNum <= 3){
              this.outPage.navigatepageNums = [1,2,3,4,5];
            }
            if(this.outPage.pageNum > 3 && (this.outPage.pageNum + 2) >= this.outPage.pages){
              this.outPage.navigatepageNums = [this.outPage.pages-4,this.outPage.pages-3,this.outPage.pages-2,this.outPage.pages-1,this.outPage.pages];
            }else if(this.outPage.pageNum > 3 && (this.outPage.pageNum + 2) < this.outPage.pages){
              this.outPage.navigatepageNums = [this.outPage.pageNum-2,this.outPage.pageNum-1,this.outPage.pageNum,this.outPage.pageNum+1,this.outPage.pageNum+2];
            }
          }else if(this.outPage.pages <= 5){
            this.outPage.navigatepageNums = [];
            for (let i=1; i <= this.outPage.pages; i++){
              this.outPage.navigatepageNums.push(i);
            }
          }
        },

        //送货方法
        checkDeliveryByCondition(pageNum, pageSize,type){
          const { deliveryClientId, deliveryDate, deliveryNum, deliveryConditionCheckData, deliveryLimit } = this;

          const url = 'api/delivery/checkByConditionForm';
          let data = '1';
          if(type === 1){

            if( deliveryClientId === '' && deliveryDate === '' && deliveryLimit === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }

            if(deliveryDate === null || deliveryDate === ''){
              data = {  clientId: deliveryClientId, deliveryNum: '', pageNum: pageNum,
                pageSize: pageSize, limit: deliveryLimit, deliveryDate: '' };
            }else{
              data = {  clientId: deliveryClientId, deliveryDate2: deliveryDate.toLocaleDateString()
                , deliveryNum: '', pageNum: pageNum, pageSize: pageSize, limit: deliveryLimit };
            }

          }else if(type === 2){

            if( deliveryNum === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }

            data = {  clientId: deliveryClientId, deliveryNum: deliveryNum, pageNum: pageNum,
              pageSize: pageSize,deliveryDate: '', deliveryLimit: '' };


          }else{
            data = { clientId: deliveryConditionCheckData.clientId, deliveryDate: deliveryConditionCheckData.deliveryDate
              , deliveryNum: deliveryConditionCheckData.deliveryNum, pageNum: pageNum, pageSize: pageSize, limit: deliveryConditionCheckData.limit };
          }
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                let extend = response.data.extend;
                if(extend === null || extend === '' || extend.list === null || extend.list === undefined || extend.list.length < 1 ){
                  extend = '';
                  this.$message.warning('暂无数据');
                }
                this.deliveryPage = extend;
                this.deliveryFindAllFlag = false;
                this.deliveryPageNum = pageNum;
                this.deliveryPageSize = pageSize;
                this.deliveryConditionCheckData = data;
                this.deliveryPageData();
              }
            }
          )
        },
        checkAllDelivery(pageNum, pageSize){
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
                  this.deliveryPage = '';
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
                this.deliveryPage = response.data.extend;
                this.deliveryPageNum = pageNum;
                this.deliveryPageSize = pageSize;
                this.deliveryFindAllFlag = true;
                this.deliveryPageData();
              }
            }
          )
        },
        //page 数据处理 -- 用于分页
        deliveryPageData(){
          this.deliveryPageNum = this.deliveryPage.pageNum;
          this.deliveryPageSize = this.deliveryPage.pageSize;
          let p1 = this.deliveryPage.total/this.deliveryPage.pageSize;//会保留余数
          this.deliveryPage.pages = Math.ceil(p1);
          this.deliveryPage.navigatepage = 5;
          if(this.deliveryPage.pages > 5) {
            if(this.deliveryPage.pageNum <= 3){
              this.deliveryPage.navigatepageNums = [1,2,3,4,5];
            }
            if(this.deliveryPage.pageNum > 3 && (this.deliveryPage.pageNum + 2) >= this.deliveryPage.pages){
              this.deliveryPage.navigatepageNums = [this.deliveryPage.pages-4,this.deliveryPage.pages-3,this.deliveryPage.pages-2,this.deliveryPage.pages-1,this.deliveryPage.pages];
            }else if(this.deliveryPage.pageNum > 3 && (this.deliveryPage.pageNum + 2) < this.deliveryPage.pages){
              this.deliveryPage.navigatepageNums = [this.deliveryPage.pageNum-2,this.deliveryPage.pageNum-1,this.deliveryPage.pageNum,this.deliveryPage.pageNum+1,this.deliveryPage.pageNum+2];
            }
          }else if(this.deliveryPage.pages <= 5){
            this.deliveryPage.navigatepageNums = [];
            for (let i=1; i <= this.deliveryPage.pages; i++){
              this.deliveryPage.navigatepageNums.push(i);
            }
          }
        },


        //盘点方法
        checkCheckByCondition(pageNum, pageSize,type){
          const { checkWarehouseId, checkDate, checkNum,checkConditionCheckData, checkLimit } = this;

          const url = 'api/check/checkByConditionForm';
          let data = '1';
          if(type === 1){

            if( checkWarehouseId === '' && checkDate === '' && checkLimit === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }

            if(checkDate === ''){
              data = { warehouseId: checkWarehouseId, checkDate: ''
                , checkSn: '', pageNum: pageNum, pageSize: pageSize, limit: checkLimit };
            }else{
              data = { warehouseId: checkWarehouseId, checkDate: checkDate.toLocaleDateString()
                , checkSn: '', pageNum: pageNum, pageSize: pageSize, limit: checkLimit };
            }

          }else if(type === 2){

            if( checkNum === ''){
              this.$message.warning('请先添加查询条件');
              return;
            }

            data = { warehouseId: checkWarehouseId, checkDate: '',limit: ''
              , checkSn: checkNum, pageNum: pageNum, pageSize: pageSize };

          }else{//分页跳页
            data = {warehouseId: checkConditionCheckData.warehouseId,checkDate: checkConditionCheckData.checkDate
              ,checkSn: checkConditionCheckData.checkSn, pageNum: pageNum, pageSize: pageSize
              ,limit: checkConditionCheckData.limit };
          }
          axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                let extend = response.data.extend;
                if(extend === null || extend === '' || extend.list === null || extend.list === undefined || extend.list.length < 1 ){
                  extend = '';
                  this.$message.warning('暂无数据');
                }
                this.checkPage = extend;
                this.checkFindAllFlag = false;
                this.checkPageNum = pageNum;
                this.checkPageSize = pageSize;
                this.checkConditionCheckData = data;
                this.checkPageData();
              }
            }
          )
        },
        checkAllCheck(pageNum, pageSize){
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
                  this.checkPage = '';
                  return;
                }
                this.checkPage = response.data.extend;
                this.checkPageNum = pageNum;
                this.checkPageSize = pageSize;
                this.checkFindAllFlag = true;
                this.checkPageData();
              }
            }
          )
        },
        //page 数据处理 -- 用于分页
        checkPageData(){
          this.checkPageNum = this.checkPage.pageNum;
          this.checkPageSize = this.checkPage.pageSize;
          let p1 = this.checkPage.total/this.checkPage.pageSize;//会保留余数
          this.checkPage.pages = Math.ceil(p1);
          this.checkPage.navigatepage = 5;
          if(this.checkPage.pages > 5) {
            if(this.checkPage.pageNum <= 3){
              this.checkPage.navigatepageNums = [1,2,3,4,5];
            }
            if(this.checkPage.pageNum > 3 && (this.checkPage.pageNum + 2) >= this.checkPage.pages){
              this.checkPage.navigatepageNums = [this.checkPage.pages-4,this.checkPage.pages-3,this.checkPage.pages-2,this.checkPage.pages-1,this.checkPage.pages];
            }else if(this.checkPage.pageNum > 3 && (this.checkPage.pageNum + 2) < this.checkPage.pages){
              this.checkPage.navigatepageNums = [this.checkPage.pageNum-2,this.page.pageNum-1,this.checkPage.pageNum,this.checkPage.pageNum+1,this.checkPage.pageNum+2];
            }
          }else if(this.checkPage.pages <= 5){
            this.checkPage.navigatepageNums = [];
            for (let i=1; i <= this.checkPage.pages; i++){
              this.checkPage.navigatepageNums.push(i);
            }
          }
        },


      }
    }
</script>

<style>

</style>
