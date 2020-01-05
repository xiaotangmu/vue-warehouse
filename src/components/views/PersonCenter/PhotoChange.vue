<template>
    <div class="photo-change">
      <div id="img_origin_div" class="photo-choose img_upload_origin_img">
        <div id="img_choose_div" class="img_upload_origin_choose"></div>
        <img id="img_origin" src="#"/>
      </div>
      <div class="img_upload_preview">
        <div class="img_upload_preview_img ">
          <img id="img_photo_preview" src="#"/>
        </div>
      </div>
      <div class="photo-change-btn">
        <input id="file" type="file" />
        <button class="btn btn-info">选择图片</button>
        <button class="btn btn-primary">确定修改</button>
      </div>
    </div>
</template>

<script>
    export default {
      mounted(){
        $('.btn-info').click(function(){
          $("#file").trigger("click");
        });

        //设置初始图片宽高 -- px
        var originHeight = 150;
        var originWidth = 150;

        //记录图片真实宽高
        var width = 0;
        var height = 0;

        //加载/预览图片
        //1. 获取上传图片的信息
        //2. 比较图片宽高，决定宽为定值，还是高为定值
        //3. 完成图片缩放功能
        //4. 完成图片拖动功能
        //5. 完成头像预览
        $('#file').change(function(){
          var src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
          $('#img_origin').attr('src', src);//需要先给图片 -- 可以是其他div -- 不设置，后面originwidth 。。不准确

          //获取文件名
          var fileName = $("#file")[0].files[0].name;
          if(fileName != null && fileName.lastIndexOf(".") === -1){//是否包含 .
            alert("文件有误，请重新上传");
            return false;
          }
//            fileName.lastIndexOf(".");//返回的是位置下标

          var fileType = fileName.substring(fileName.lastIndexOf(".")+1);//截取文件类型

          //几种常见的图片格式
          var imgFileType = ["gif", "jpg", "jpeg", "bmp", "png", "psd"];
          if(imgFileType.indexOf(fileType) === -1){//不包含
            alert("请上传正确图片文件");
            return;
          }

          //获取图片相应数据
          var f = this.files[0];
          var reader = new FileReader();
          reader.onload = function (e) {
            var data = e.target.result;
            //alert(data);//data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWE...... -- base64 文件数据 -- 所以此时上传的文件不能太大
            //加载图片获取图片真实宽度和高度
            var image = new Image();
            image.onload=function(){
              width = image.width;//获取图片真实宽，单位px
              height = image.height;//高，px
//                    var size = f.size();//获取图片真实大小，单位 B，字节，（并没有变成base64 数据的大小 -- 大原文件的1/3大小）

              //先判断图片宽高必须大于 150px*150px
              if (width < 150 || height < 150) {
                $("#file").val("");
                alert("图片大小必须大于150px * 150px");
                return;
              }
              var whoLong = "";//记录谁长
              if(width > height){
                //高小，高位定值
//                        $("#img_origin").attr("height", "150px");
                $("#img_origin").width("");//清除原来宽度
                $("#img_origin").height("150px");
                whoLong = "width";
              }else{
//                        $("#img_origin").attr("width", "150px");
                $("#img_origin").height("");
                $("#img_origin").width("150px");
                whoLong = "height";
              }
              //复原位置
              $("#img_origin").css("left", "75px");
              $("#img_origin").css("top", "0px");

              $("#img_origin").attr("src", src);
              originHeight = $("#img_origin").height();
              originWidth = $("#img_origin").width();
//                    alert($("#img_origin").width() + " : " + $("#img_origin").height());
              //设置位置
              if(whoLong === "width"){
                if(originWidth > $("#img_origin_div").width()){//是否大于父元素宽度
                  $("#img_origin").css("left", "0px");
                }else{
                  $("#img_origin").css("left", 75 - (originWidth - 150)/2 + "px");
                }
              }
              //预览图片
              previewPhoto();
            };
            image.src= data;
          };
          reader.readAsDataURL(f);
        });


        //监听滚动事件
        var myimage =document.getElementById("img_origin_div");
        if (myimage.addEventListener) {
          // IE9, Chrome, Safari, Opera
          myimage.addEventListener("mousewheel", MouseWheelHandler, false);
          // Firefox
          myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        } else {//attachEvent适用于旧的 IE浏览器，IE 6/7/8
          myimage.attachEvent("onmousewheel", MouseWheelHandler);
        }
        //滚动缩放图片
        function MouseWheelHandler(e) {
          var myimage1 =document.getElementById("img_origin");
          var e = window.event || e;
          var delta = Math.max(-1, Math.min(1, (e.wheelDelta|| -e.detail)));

          //宽高最小也不能比原来小
          //按照比例缩放
          //Xnow/Xorigin = Yn/Yo -- YnXo = XnYo -- Yn = XnYo/Xo
          var Xo = myimage1.width;//原来的宽数据
          var Xn = myimage1.width + (30 * delta);
          var Yo = myimage1.height;
          var Yn = Xn*Yo/Xo;
          var swo = myimage1.width;// -- 不带px
          var sho = myimage1.height;
          myimage1.style.width = Math.max(originWidth, Xn) + "px";// -- 带 px parseInt() 可以得到数值 -- 傻逼
          myimage1.style.height = Math.max(originHeight, Yn) + "px";
          $("#img_origin").css("left", (parseInt($("#img_origin").css("left")) - (myimage1.width -swo)/2) + "px");
          $("#img_origin").css("top", parseInt($("#img_origin").css("top")) - (myimage1.height - sho)/2 + "px");
          //由于精确度问题，会造成图片下移 -- 位置信息还是正确的
          //强制复原
          if(parseInt($("#img_origin").css("top")) > 0){
            $("#img_origin").css("top", "0");
          }
          //由于移动造成图片走位, 缩放时会造成越界
          //防止越界
          if($("#img_origin").offset().left > $("#img_choose_div").offset().left){//左边
            $("#img_origin").css("left", $("#img_choose_div").css("left"));
          }
          if($("#img_origin").offset().left + $("#img_origin").width() < $("#img_choose_div").offset().left + 150){//右边
            var num = (parseInt($("#img_choose_div").css("left")) + 150 - $("#img_origin").width());
            $("#img_origin").css("left", num +"px");
          }
          if($("#img_origin").offset().top > $("#img_choose_div").offset().top){//上边
            $("#img_origin").css("top", $("#img_choose_div").css("top"));
          }
          if($("#img_origin").offset().top + $("#img_origin").height() < $("#img_choose_div").offset().top + 150){//下边
            var num = (parseInt($("#img_choose_div").css("top")) + 150 - $("#img_origin").height());
            $("#img_origin").css("top", num +"px");
          }

          //预览图片
          previewPhoto();

          return false;
        }

        //拖动图片
        //声明标记，默认为不可拖动
        var imgMoveFlag = false;
        //记录鼠标位置
        var Xmouo = 0;
        var Ymouo = 0;
        //按下图片，设置可移动标记
        $("#img_origin_div").mousedown(function(event){
          imgMoveFlag = true;
          Xmouo = event.clientX;
          Ymouo = event.clientY;
        });
        //放开鼠标，设置为不可移动
        $("#img_origin_div").mouseup(function(){
          imgMoveFlag = false;
        });
        //离开图片范围，设置为不可移动
        $("#img_origin_div").mouseout(function(){
          imgMoveFlag = false;
        });
        //碰触限制，重复赋值
        var limitFlag = false;
        //鼠标控制图片移动
        $("#img_origin_div").mousemove(function(event){
          if (imgMoveFlag) {
            if(limitFlag){
              Xmouo = event.clientX;
              Ymouo = event.clientY;
              limitFlag = false;
              return;
            }
            //当前鼠标位置
            var Xmoun = event.clientX;
            var Ymoun = event.clientY;
            //偏移量
            var Xoffset = Xmoun - Xmouo;
            var Yoffset = Ymoun - Ymouo;
            //限制移动 -- 相对于 img_choose_div
            if($("#img_origin").offset().left + Xoffset > $("#img_choose_div").offset().left){//左边
              limitFlag = true;
              $("#img_origin").offset().left = $("#img_choose_div").offset().left;
            }
            if($("#img_origin").offset().left + $("#img_origin").width() + Xoffset < $("#img_choose_div").offset().left + 150){//右边
              limitFlag = true;
              $("#img_origin").offset().left = $("#img_choose_div").offset().left + 150 - $("#img_origin").width();
            }
            if($("#img_origin").offset().top + Yoffset > $("#img_choose_div").offset().top){//上边
              limitFlag = true;
              $("#img_origin").offset().top = $("#img_choose_div").offset().top;
            }
            if($("#img_origin").offset().top + $("#img_origin").height() + Yoffset < $("#img_choose_div").offset().top + 150){//下边
              limitFlag = true;
              $("#img_origin").offset().top = $("#img_choose_div").offset().top + 150 - $("#img_origin").height();
            }
            if(limitFlag){
              return;
            }
            //图片移动
            $("#img_origin").css("left", parseInt($("#img_origin").css("left"))+Xoffset);
            $("#img_origin").css("top", parseInt($("#img_origin").css("top"))+Yoffset);

            //预览头像
            previewPhoto();
//                //父元素作为参考数据
//                var Xf = $("#img_origin_div").offset().left;
//                var Yf = $("#img_origin_div").offset().top;
//                //移动数据
//                var Xmove =

            //更新数据
            Xmouo = Xmoun;
            Ymouo = Ymoun;
          }
        });

        //预览头像
        function previewPhoto(){
          $("#img_photo_preview").attr("src", $("#img_origin").attr("src"));
          $("#img_photo_preview").width($("#img_origin").width());
//            $("#img_photo_preview").height($("#img_origin").height());//设置宽高其中一个就行了。
          //相对位置
          var offsetLeft = parseInt($("#img_origin").css("left")) - parseInt($("#img_choose_div").css("left"));
          var offsetTop = parseInt($("#img_origin").css("top")) - parseInt($("#img_choose_div").css("top"));
          $("#img_photo_preview").css("left", offsetLeft + "px");
          $("#img_photo_preview").css("top", offsetTop + "px");
        }


        //点击上传图片
        function uploadImage(){
          var myform = new FormData();//用来封装要上传的数据

          myform.append('file', $("#file")[0].files[0]);
          if($("#file")[0].files[0] === null || $("#file")[0].files[0] === "" || $("#file")[0].files[0] === undefined){
            alert("文件为空");
            return;
          }
          //获取文件名
          var fileName = $("#file")[0].files[0].name;
          if(fileName != null && fileName.lastIndexOf(".") === -1){//是否包含 .
            alert("文件有误，请重新上传");
            return;
          }
//            fileName.lastIndexOf(".");//返回的是位置下标

          var fileType = fileName.substring(fileName.lastIndexOf(".")+1);//截取文件类型

          //几种常见的图片格式
          var imgFileType = ["gif", "jpg", "jpeg", "bmp", "png", "psd"];
          if(imgFileType.indexOf(fileType) === -1){//不包含
            alert("请上传正确图片文件");
            return;
          }
          //获取截取的头像与原图片的位置信息 -- 参照物 -- 原图
          //起始坐标 -- 缩放后的起始位置
          var Xstart = parseInt($("#img_choose_div").css("left")) - parseInt($("#img_origin").css("left"));
          var Ystart = parseInt($("#img_choose_div").css("top")) - parseInt($("#img_origin").css("top"));

          //在这里切图范围为固定不再传值 -- 需要的话，自己设置，并修改后台相应代码

          //放大倍数 -- 传两个参数让后台自己处理
          var Worigin = width;
          var Wnow = $("#img_origin").width();

          myform.append("Xstart", Xstart);
          myform.append("Ystart", Ystart);
          myform.append("Worigin", Worigin);
          myform.append("Wnow", Wnow);

          $.ajax({
            url: "fileUpload",
            type: "POST",
            data: myform,
            async: false,
            contentType: false,
            processData: false,
            success: function (result) {
              $("#photo_img").attr("src", result);
            },
            error: function (data) {
            }
          });

        }

      }
    }
</script>

<style>
  .photo-change{
    padding: 80px 150px;
  }
  .photo-choose{
    padding: 0;
    display: inline-block;
    width: 300px;
    height: 300px;
    position: relative;
    box-shadow: 1px 1px 3px 1px #aaa;
    /*background-color: #60AD94;*/
    overflow: hidden;
  }
  .img_upload_preview_img{
    display: inline-block;
    width: 150px;
    height: 150px;
    /*background-color: #f5f5f5;*/
    /*margin: 50px auto;*/
    overflow: hidden;
    position: relative;
    border-radius: 50%;
    margin: 75px -75px;
  }
  #img_origin{
    display: block;
    margin: 0 auto;
    position: absolute;
    z-index: 10;
    left: 75px;
    top: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  #img_photo_preview{
    display: block;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  .img_upload_origin_choose{
    width: 150px;
    height: 150px;
    margin: 0 auto;
    background-color: #aaa;
    position: absolute;
    left: 75px;
    opacity: 0.3;
    z-index: 11;
  }
  .img_upload_preview{
    /*box-shadow: 1px 1px 3px 1px #aaa;*/
    background-color: #dfdfdf;
    display: inline-block;
    width: 300px;
    height: 300px;
    margin-left: 80px;
    position: relative;
    text-align: center;
  }
  .photo-change-btn .btn{
    width: 300px;
    margin-right: 80px;
    margin-top: 40px;
  }
  .photo-change-btn input{
    display: none;
  }


</style>
