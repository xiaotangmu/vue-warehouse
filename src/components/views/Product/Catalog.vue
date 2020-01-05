<template>
  <div class="product-catalog thumbnail">
    <div class="product-catalog-choose-div">
      <div class="product-catalog-choose-title">分类选择<span class="glyphicon glyphicon-question-sign" style="padding-left: 10px"></span></div>
      <div class="product-catalog-choose thumbnail">
        <span class="catalog-title">一级分类</span>
        <div class="select-item-div thumbnail">
          <span class="select-item-span glyphicon glyphicon-triangle-bottom" ></span>
          <select class="thumbnail select-item">
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <span class="catalog-title ">二级分类</span>
        <div class="select-item-div thumbnail">
          <span class="select-item-span glyphicon glyphicon-triangle-bottom"></span>
          <select class="thumbnail select-item">
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <span class="catalog-title">三级分类</span>
        <div class="select-item-div thumbnail">
          <span class="select-item-span glyphicon glyphicon-triangle-bottom"></span>
          <select class="thumbnail select-item">
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>

    </div>

    <div class="product-catalog-main thumbnail">
      <div class="product-catalog-main-left">
        <ul class="">
          <li><span class="span-btn btn btn-primary span-btn-catalog1-plus">添加一级分类</span></li>
          <li><span class="span-btn btn btn-primary span-btn-catalog1-plus">添加二级分类</span></li>
          <li><span class="span-btn btn btn-primary span-btn-catalog1-plus">添加三级分类</span></li>
        </ul>
      </div>
      <div class="product-catalog-main-right">
        <div class="product-catalog-main-right-tree">
          <ul id="treeDemo" class="ztree"></ul>
        </div>
      </div>
    </div>

    <!--<input type="hidden" id="input_hidden" data-toggle="modal" data-target="#myModal"/>-->
    <!-- Modal 横态框 -->
    <div id='myModal' class="myModal" style="display: none">
      <div class="myModal-div thumbnail" style="display: none">
        <div class="myModal-title">
          <div class="myModal-title-left">添加分类</div>
          <div class="myModal-title-right"><span class="glyphicon glyphicon-remove catalog-plus-modal-remove"></span></div>
        </div>
        <div class="myModal-content">
          <div class="catalog-form-div">
            <div class="catalog-level1 ">
              <div class="catalog-input-div">
                <label class="catalog-name">一级分类</label>
                <input type="text" class="form-control catalog-input" placeholder="干货">
                <span class="catalog-level1-btn glyphicon glyphicon-plus btn btn-primary" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class='btn-span2'>添加二级分类</span>" data-trigger="hover"></span>
              </div>
            </div>
            <div class="catalog-level2 thumbnail" style="display: none">
              <div class="catalog-input-div">
                <label class="catalog-name">二级分类</label>
                <div class="catalog-level2-div">
                  <input type="text" class="form-control catalog-input" placeholder="干货">
                  <span class="catalog-level2-btn catalog-level2-btn-plus glyphicon glyphicon-plus btn btn-primary" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class='btn-span2'>继续添加二级分类</span>" data-trigger="hover"></span>
                  <span class="catalog-level2-btn catalog-level2-btn-delete glyphicon glyphicon-minus btn btn-danger" data-toggle="popover" data-html="true" data-placement="bottom"  data-content="<span class='btn-span2'>删除</span>" data-trigger="hover"></span>
                </div>

              </div>
            </div>

            <div class="catalog-level1 ">
              <div class="catalog-input-div">
                <!--<label class="catalog-name">一级分类</label>-->
                <span role="btn" class="thumbnail mybtn-span" >添加</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/js/jquery-1.4.4.min.js';
  import '@/assets/js/jquery.ztree.all.min.js';
  export default {
    mounted(){
      var setting = {
        data: {
          // keep : {
          //   leaf: false,//是否锁住叶子，锁了，叶子不能再添加
          //   parent: false,//为true 该父元素子节点全部移除
          // },
          key : {//设置属性/参数名 -- 注意是名不是值 -- 更方便自定义数据
            //这些都是默认值
            checked: "checked",
            children: "children",
            isParent: "isParent",//是否是父元素
            isHidden: "isHidden",
            name: 'name',
            title: "",//提示信息 -- 此时与name一样
            url: "url"
          },
          simpleData: {
            enable: true,//是否使用简单数据，如果设置为 true，请务必设置 setting.data.simpleData 内的其他参数: idKey / pIdKey / rootPId，并且让数据满足父子关系。
            idKey: "id",//也是再设置参数名
            pIdKey: "pId",//父元素唯一标识，也是再设置参数名
            rootPId: null,//pid为null的表示根节点
          }
        },
        async: { //异步获取数据，此时返回的数据格式应该是下列 zNodes 的格式
          enable: true,
          url: "${APP_PATH}/permission/loadData",
          autoParam: ["id", "name=n", "level=lv"],
          type: "post"
        },
        view: {
          showIcon: true,//是否显示图标
          dblClickExpand: true,//双击是否打开
          selectedMulti: false,//是否可以多选
          expandSpeed: "fast",//展开动画
          // fontCss : {color:"red"},//字体样式
          showLine: true,//是否显示连线
          txtSelectedEnable: false,//是否可以选择文本
          addDiyDom: function(treeId, treeNode){//第一次显示/加载的时候触发 -- 出现在窗口的第一次 -- 第一次展开出现等
            //更改文件图标
            var icoObj = $("#" + treeNode.tId + "_ico"); // tId = permissionTree_1, $("#permissionTree_1_ico")
            // alert(treeNode.sex);//调用自己定义的属性，level是默认属性，0为第一层
            // alert(treeNode.tId);//treeDemo_7
            // alert(treeNode.id);//12
            if(treeNode.level === 0){//第一层
              icoObj.removeClass("button ico_docu ico_open").css("background","").append('<span class="glyphicon glyphicon-th"></span>');//使用bootstrap 图标不能指定font类型
            }else if(treeNode.level === 1){//第二层
              icoObj.removeClass("button ico_docu ico_open").css("background","").append('<span class="glyphicon glyphicon-th-list" ></span>');//使用bootstrap 图标不能指定font类型
            }else if(treeNode.level === 2){//第三层
              icoObj.removeClass("button ico_docu ico_open").css("background","").append('<span class="glyphicon glyphicon-th-large" ></span>');//使用bootstrap 图标不能指定font类型
            }
          },
          addHoverDom: function(treeId, treeNode){//鼠标移入触发 -- mouseenter
            var aObj = $("#" + treeNode.tId + "_a"); // tId = permissionTree_1, ==> $("#permissionTree_1_a")
            if (treeNode.editNameFlag || aObj.nextAll('.btn').length>0) return;//正在编辑或者已经存在标签
            var delete_part_span = $("<span class='btn btn-warning ztree-node-span tree-span-delete-part'data-toggle=\"popover\" data-trigger=\"hover\" data-html='true' data-content=\"<span class='span-tip'>删除已选子分类</span>\" data-placement=\"bottom\"><span class='glyphicon glyphicon-minus'></span>")
            var delete_all_span = $("<span class='btn label-danger ztree-node-span tree-span-delete-all' style='color: #fff; ' data-toggle=\"popover\" data-trigger=\"hover\" data-html='true' data-content=\"<span class='span-tip'>删除</span>\" data-placement=\"bottom\"><span class='glyphicon glyphicon-trash' ></span></span>")
            var plus_span = $("<span class='btn btn-primary ztree-node-span tree-span-plus'  data-toggle=\"popover\" data-trigger=\"hover\" data-html='true' data-content=\"<span class='span-tip'>添加</span>\" data-placement=\"bottom\"><span class='glyphicon glyphicon-plus'></span></span>")
            var edit_span = $("<span class='btn btn-info ztree-node-span tree-span-edit' style='margin-left: 10px;' data-toggle=\"popover\" data-trigger=\"hover\" data-html='true' data-content=\"<span class='span-tip'>编辑</span>\" data-placement=\"bottom\"><span class='glyphicon glyphicon-edit'></span></span>")

            if ( treeNode.level === 0 ) {//删除元素 删除已选择的子元素 编辑 添加子元素
              aObj.after(delete_all_span).after(delete_part_span).after(plus_span).after(edit_span);
            } else if ( treeNode.level === 1 ) {//删除元素 删除已选择的子元素 编辑 添加子元素
              aObj.after(delete_all_span).after(delete_part_span).after(plus_span).after(edit_span);
            } else if ( treeNode.level === 2 ) {
              aObj.after(delete_all_span).after(edit_span);
            }
          },
          removeHoverDom: function(treeId, treeNode){// -- mouseleave
            // alert(treeId); //treeDemo
            $("#" + treeNode.tId + "_a").nextAll().remove('.btn');
          }
        },
        check : {
          autoCheckTrigger: false,//是否触发before/oncheck 的回调函数
          chkboxType: { "Y": "ps", "N": "ss" },//Y 为勾选 N 为取消勾选， p为影响父元素 s为影响子元素
          chkStyle: "checkbox",//redio/checkbox 类型
          enable: true,//是否显示单/复选框
          radioType: "level",//...
        },
        callback: {//绑定触发事件
          onClick:onNodeClick,
        }
      };


      var zNodes =[
        { id:1, pId:0, name:"父节点1 - 展开"},//不要使用level 默认属性 从0开始
        { id:11, pId:1, name:"父节点11 - 折叠"},
        { id:111, pId:11, name:"叶子节点111"},
        { id:112, pId:11, name:"叶子节点112"},
        { id:113, pId:11, name:"叶子节点113"},
        { id:114, pId:11, name:"叶子节点114"},
        { id:12, pId:1, name:"父节点12 - 折叠"},
        { id:121, pId:12, name:"叶子节点121"},
        { id:122, pId:12, name:"叶子节点122"},
        { id:123, pId:12, name:"叶子节点123"},
        { id:124, pId:12, name:"叶子节点124"},
        { id:13, pId:1, name:"父节点13 - 没有子节点"},
        { id:2, pId:0, name:"父节点2 - 折叠"},
        { id:21, pId:2, name:"父节点21 - 展开"},
        { id:211, pId:21, name:"叶子节点211"},
        { id:212, pId:21, name:"叶子节点212"},
        { id:213, pId:21, name:"叶子节点213"},
        { id:214, pId:21, name:"叶子节点214"},
        { id:22, pId:2, name:"父节点22 - 折叠"},
        { id:221, pId:22, name:"叶子节点221"},
        { id:222, pId:22, name:"叶子节点222"},
        { id:223, pId:22, name:"叶子节点223"},
        { id:224, pId:22, name:"叶子节点224"},
        { id:23, pId:2, name:"父节点23 - 折叠"},
        { id:231, pId:23, name:"叶子节点231"},
        { id:232, pId:23, name:"叶子节点232"},
        { id:233, pId:23, name:"叶子节点233"},
        { id:234, pId:23, name:"叶子节点234"},
        { id:3, pId:0, name:"父节点3 - 没有子节点"}
      ];

      $(document).ready(function(){
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      });

      function onNodeClick (e,treeId,treeNode) {
        var zTree=$.fn.zTree.getZTreeObj("treeDemo");//单击展开
        zTree.expandNode(treeNode);
      };

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

      //点击添加分类显示横态框
      $('.span-btn-catalog1-plus').click(function(){
        $("#myModal").show();
        $(".myModal-div").show(300);
      });
      //关闭模态框
      $('.catalog-plus-modal-remove').click(function(){
        $("#myModal").hide();
        $(".myModal-div").hide();
      });
    },
    methods: {

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
    margin: 10px 10px 10px 290px;
    height: 590px;
    /*background-color: #60AD94;*/
    overflow: auto;
  }

  .select-item-div {
    display: inline-block;
    position: relative;
    /*background-color: #60AD94;*/
  }

  .select-item {
    display: inline-block;
    width: 260px;
    height: 30px;
    padding-left: 5px;
    /*background-color: #60AD94;*/
    outline: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    /*background: url("../images/select.png") no-repeat scroll right 5px center transparent;*/
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 0;
    color: #17346C;
  }

  .select-item option {
    /*border: 3px solid #60AD94;*/
    /*border-color: #f5f5f5;*/
    color: #337AB7;
  }

  .select-item-span {
    color: #aaa;
    padding: 7px 5px 7px 238px;
  }

  .product-catalog-choose {
    font: 16px 'yunyuan';
    margin-left: 290px;
    padding: 10px 0 10px 40px;
  }

  .product-catalog-choose-title {
    padding: 5px 290px;
    font: 18px '微软雅黑';
    font-weight: 500;
    color: #17346C;
  }

  .product-catalog-choose .catalog-title {
    margin-left: 20px;
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
    left: 420px;
    right: 10px;
    top: 140px;
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
    /*font-size: 13px;*/
    /*line-height: 16px;*/
  }
  .ztree-node-span span{
    font-size: 13px;
    font-weight: 300;
    line-height: 16px;
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
</style>
