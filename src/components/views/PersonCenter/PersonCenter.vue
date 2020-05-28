<template>
    <div class="person-center clearfix">
      <div class="person-photo-div thumbnail">
        <div class="person-photo-title">关于自己</div>
        <div class="person-photo-main">
          <span v-if="user.photo === undefined || user.photo === null || user.photo === ''">
            <img src="../../../assets/img/photo.png" height="130px"/>
          </span>
          <img v-else :src="user.photo" height="130px"/>
        </div>
        <div class="person-simple-info1">Xiao</div>
        <!--<div class="person-simple-info2">角色：<span>{{}}</span></div>-->

      </div>
      <div class="person-center-main thumbnail" >
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <div class="person-detail" style="padding: 30px">
              <div class="form-group">
                <el-tag effect="plain" style="border: none;margin: 0 10px;" type="info">
                  姓名
                </el-tag>
                <el-input style="width: 400px" v-model="nickname" placeholder="请输入内容"
                          suffix-icon="el-icon-edit el-input__icon"
                          @change="nicknameChange"></el-input>
                <el-tag v-if="nicknameFlag" type="danger">
                  {{nicknameTip}}
                </el-tag>
              </div>
              <div class="form-group">
                <el-tag effect="plain" style="border: none;margin: 0 10px;" type="info">
                  性别
                </el-tag>
                <el-radio-group v-model="gender">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </div>
              <div class="form-group">
                <el-tag effect="plain" style="border: none;margin: 0 10px;" type="info">
                  手机
                </el-tag>
                <el-input style="width: 400px" v-model="phone" placeholder="请输入内容"
                          suffix-icon="el-icon-edit el-input__icon"
                          @change="dataChange(phone, /^[0-9]{11}$/, '请输入正确的手机号码',1)"></el-input>
                <el-tag v-if="phoneFlag" type="danger">
                  {{phoneTip}}
                </el-tag>
              </div>
              <div class="form-group">
                <el-tag effect="plain" style="border: none;margin: 0 10px;" type="info">
                  邮箱
                </el-tag>
                <el-input style="width: 400px" v-model="email" placeholder="请输入内容"
                          suffix-icon="el-icon-edit el-input__icon"
                          @change="dataChange(email, /^([a-z0-9_\.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '请输入正确的邮箱',2)"></el-input>
                <el-tag v-if="emailFlag" type="danger">
                  {{emailTip}}
                </el-tag>
              </div>
              <div class="person-info-btn">
                <button @click="updateUser($event)" class="btn btn-info" style="font-size: 12px;margin: 20px 0 0 65px">
                  <i v-if="isLoad" class="el-icon-loading"></i>
                  信息修改
                </button>
              </div>
            </div>
          </el-tab-pane>


          <el-tab-pane label="密码修改" name="second">

            <div class="person-detail2" style="padding: 30px">
              <div class="form-group">
                <el-tag effect="plain" style="border: none;margin: 0 10px;width: 60px;text-align: right" type="info">
                  密码
                </el-tag>
                <el-input style="width: 400px" v-model="oldPassword" placeholder="请输入内容"
                          suffix-icon="el-icon-edit el-input__icon"
                          @change="dataChange(oldPassword, /^[a-zA-Z0-9_\-!\?,\.]{6,18}$/, '请输入正确的密码',3)"></el-input>
                <el-tag v-if="oldPasswordFlag" type="danger">
                  {{oldPasswordTip}}
                </el-tag>
              </div>
              <div class="form-group">
                <el-tag effect="plain" style="border: none;margin: 0 10px;width: 60px;text-align: right" type="info">
                  新密码
                </el-tag>
                <el-input @change="passwrod1Change" style="width: 400px" v-model="newPassword1" placeholder="请输入内容" suffix-icon="el-icon-edit el-input__icon"></el-input>
                <el-tag v-if="newPassword1Flag" type="danger">
                  {{newPassword1Tip}}
                </el-tag>
              </div>
              <div class="form-group">
                <el-tag effect="plain" style="border: none;margin: 0 10px;width: 60px;text-align: right" type="info">
                  确认密码
                </el-tag>
                <el-input @change="passwrod2Change" style="width: 400px" v-model="newPassword2" placeholder="请输入内容" suffix-icon="el-icon-edit el-input__icon"></el-input>
                <el-tag v-if="newPassword2Flag" type="danger">
                  {{newPassword2Tip}}
                </el-tag>
              </div>
              <div class="person-info-btn">
                <button @click="updatePassword($event)" class="btn btn-info" style="font-size: 12px;margin: 20px 0 0 85px">
                  <i class="el-icon-loading" v-if="isLoad"></i>信息修改</button>
              </div>
            </div>


          </el-tab-pane>

          <el-tab-pane label="头像修改" name="third">
            <div class="photo-change">
              <div id="img_origin_div" class="photo-choose img_upload_origin_img">
                <div v-if="photo === ''" class="img_none_plus" style="height: 100%; width: 100%;background-color: #FBFDFF;text-align: center;line-height: 300px">
                  <i slot="default" class="el-icon-plus" style="font-size: 40px;color: #8C939D;"></i>
                </div>
                <div v-else>
                  <div id="img_choose_div" class="img_upload_origin_choose"></div>
                  <img id="img_origin" src="#"/>
                </div>
              </div>
              <div class="img_upload_preview">
                <div v-show="photoProgress !== ''"  style="width: 100%;height: 100%;position: absolute; line-height: 400px">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="photoProgress" style="margin-top: 230px"></el-progress>
                </div>
                <div class="img_upload_preview_img " style="position: relative;">

                  <img id="img_photo_preview" src="#"/>
                </div>
              </div>
              <div class="photo-change-btn">
                <input id="file" type="file" />
                <button id="find_img" class="btn btn-info">选择图片</button>
                <button class="btn btn-primary fileUpload" >
                  <i class="el-icon-loading" v-show="isLoad" ></i> 确定修改</button>
              </div>

            </div>
          </el-tab-pane>
        </el-tabs>
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
          photoProgress: '',

          activeName: 'first',

          nickname: '',
          nicknameTip: '',
          nicknameFlag: false,

          phone: '',
          phoneFlag: '',
          phoneTip: '',

          email: '',
          emailFlag: '',
          emailTip: '',

          gender: '1',

          user1: '',
          isLoad: false,

          oldPassword: '',
          oldPasswordTip: '',
          oldPasswordFlag: '',

          newPassword1: '',
          newPassword1Tip: '',
          newPassword1Flag: '',

          newPassword2: '',
          newPassword2Tip: '',
          newPassword2Flag: '',

          photo: '',
        }
      },
      methods:{
        updatePhoto(){
          if(this.user.photo !== undefined || this.user.photo !== null){
            this.photo = this.user.photo;
          }
        },

        getUser(){
          this.user1 = this.user;
          // console.log(this.user1);
          this.nickname = this.user.nickname;
          this.phone = this.user.phone;
          this.email = this.user.email;
          if(this.user.gender === undefined || this.user.gender === null || this.user.gender === ''){
            this.gender = '1';
          }else{
            this.gender = this.user.gender;
          }
        },



        async updatePassword(e){
          this.isLoad = true;
          $(e.target).attr("disabled","disabled");

          //验证格式
          let flag = 0;
          //password1
          let r3 = this.dataChange(this.oldPassword, /^[a-zA-Z0-9_\-!\?,\.]{6,18}$/, '请输入正确的密码',3);
          if(r3 === -1){
            flag++;
            this.oldPasswordTip = '密码不能为空';
            this.oldPasswordFlag = true;
          }else if(r3 === 0){
            flag++;
          }
          //password1
          let r5 = this.passwrod1Change();
          if(r5 === -1){
            flag++;
            this.newPassword1Tip = '密码不能为空';
            this.newPassword1Flag = true;
          }else if(r5 === 0){
            flag++;
          }
          //password2
          let r6 = this.passwrod2Change();
          if(r6 === -1){
            flag++;
            this.newPassword2Tip = '密码不能为空';
            this.newPassword2Flag = true;
          }else if(r6 === 0){
            flag++;
          }
          if(flag > 0){
            this.isLoad = false;
            $(e.target).removeAttr("disabled");
            return;
          }

          const url = 'api/user/updatePassword';
          const data = { name: this.user.name, id: this.user.id, oldPassword: this.this.oldPassword, password: this.newPassword1 };
          let result = await axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                if(response.data.extend === 1){
                  this.$message.success('修改成功');
                }else {
                  this.$message.error('密码错误');
                  this.oldPasswordTip = '密码错误';
                  this.oldPasswordFlag = true;
                }
                return true;
              }
              return false;
            }
          );
          this.isLoad = false;
          $(e.target).removeAttr("disabled");
        },

        //password1 Change
        passwrod1Change(){
          const i = this.dataChange(this.newPassword1, /^[a-zA-Z0-9_\-!\?,\.]{6,18}$/, '格式：包含字母数字_-!?,.的6-16位字符',5);
          if(i === 1){//格式正确
            const i2 = this.dataChange(this.newPassword2, /^[a-zA-Z0-9_\-!\?,\.]{6,18}$/, '格式：包含字母数字_-!?,.的6-16位字符',6);
            if(i2 === 1){//格式也正确
              const p1 = this.newPassword1.trim();
              const p2 = this.newPassword2.trim();
              if(p1 !== p2){
                this.newPassword1Tip = '两次密码不相等';
                this.newPassword1Flag = true;
                return -2;
              }else{
                return 1;
              }
            }
          }
          return i;
        },
        passwrod2Change(){
          const i = this.dataChange(this.newPassword2, /^[a-zA-Z0-9_\-!\?\.]{6,18}$/, '格式：包含字母数字_-?!,.的6-16位字符',6);
          if(i === 1){//格式正确
            const i2 = this.dataChange(this.newPassword1, /^[a-zA-Z0-9_!,\-\?\.]{6,18}$/, '格式：包含字母数字_-?!,.的6-16位字符',5);
            if(i2 === 1){//格式也正确
              const p1 = this.newPassword2.trim();
              const p2 = this.newPassword1.trim();
              if(p1 !== p2){
                this.newPassword2Tip = '两次密码不相等';
                this.newPassword2Flag = true;
                return -2;
              }else{
                return 1;
              }
            }
          }
          return i;
        },


        async updateUser(e){
          this.isLoad = true;
          $(e.target).attr("disabled","disabled");

          //验证格式
          let flag = 0;

          //nickname
          let r2 = this.nicknameChange();
          if(!r2){
            flag++;
          }
          //phone
          let r3 = this.dataChange(this.phone, /^[0-9]{11}$/, '请输入正确的手机号码',1);
          if(r3 === -1){
            this.phoneTip = '不能为空';
            this.phoneFlag = true;
            flag++;
          }else if(r3 === 0){
            this.phoneTip = '格式不对';
            this.phoneFlag = true;
            flag++;
          }else{
            this.phoneFlag = false;
          }
          //email
          let r4 = this.dataChange(this.email, /^([a-z0-9_\.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '请输入正确的邮箱',2);
          if(r4 === -1){
            this.emailTip = '不能为空';
            this.emailFlag = true;
            flag++;
          }else if(r4 === 0){
            this.emailTip = '格式不对';
            this.emailFlag = true;
            flag++;
          }else{
            this.emailFlag = false;
          }
          if(flag > 0){
            this.isLoad = false;
            $("#register_btn_id").removeAttr("disabled");
            return;
          }

          const url = 'api/user/updateInfo';
          const data = { name: this.user.name, id: this.user.id, nickname: this.nickname, phone: this.phone, email: this.email, gender: this.gender };
          await axios.post(url, qs.stringify(data)).then(
            response => {
              if(response.data.code === '101'){
                this.$message.success('更新成功');
                this.user.nickname = data.nickname;
                this.user.phone = data.phone;
                this.user.email = data.email;
                this.user.gengder = data.gender;
                return true;
              }
              return false;
            }
          );
          this.isLoad = false;
          $(e.target).removeAttr("disabled");

        },
        //nickname change
        nicknameChange(){
          let s = this.nickname.trim();
          if(s.length > 20){
            this.nicknameTip = '请输入少于20个字符';
            this.nicknameFlag = true;
          }else if(s.length === 0){
            this.nicknameTip = '请输入名字';
            this.nicknameFlag = true;
            return false;
          }else{
            this.nicknameTip = '';
            this.nicknameFlag = false;
          }
          return true;
        },
        dataChange(name, format, tipStr,type){
          const s = name;
          if(s === undefined || s === null || s === ''){//为空不用理会
            switch (type) {
              case 1:
                this.phoneTip = '';
                this.phoneFlag = false;
                break;
              case 2:
                this.emailTip = '';
                this.emailFlag = false;
                break;
              case 3:
                this.oldPasswordTip = '';
                this.oldPasswordFlag = false;
                break;
              case 5:
                this.newPassword1Tip = '';
                this.newPassword1Flag = false;
                break;
              case 6:
                this.newPassword2Tip = '';
                this.newPassword2Flag = false;
                break;
            }
            return -1;
          }
          //格式验证
          if(!format.test(s)){
            switch (type) {
              case 1:
                this.phoneTip = tipStr;
                this.phoneFlag = true;
                break;
              case 2:
                this.emailTip = tipStr;
                this.emailFlag = true;
                break;
              case 3:
                this.oldPasswordTip = tipStr;
                this.oldPasswordFlag = true;
                break;
              case 5:
                this.newPassword1Tip = tipStr;
                this.newPassword1Flag = true;
                break;
              case 6:
                this.newPassword2Tip = tipStr;
                this.newPassword2Flag = true;
                break;
            }
            return 0;
          }else{
            switch (type) {
              case 1:
                this.phoneTip = '';
                this.phoneFlag = false;
                break;
              case 2:
                this.emailTip = '';
                this.emailFlag = false;
                break;
              case 3:
                this.oldPasswordTip = '';
                this.oldPasswordFlag = false;
                break;
              case 5:
                this.newPassword1Tip = '';
                this.newPassword1Flag = false;
                break;
              case 6:
                this.newPassword2Tip = '';
                this.newPassword2Flag = false;
                break;
            }
            return 1;
          }
        },
      },
      mounted(){
        // this.updatePhoto();

        this.getUser();

        // if(sessionStorage.getItem('personCenter-router') === 'basic'){
        //   $('.basic').addClass('active');
        // }else if(sessionStorage.getItem('personCenter-router') === 'password'){
        //   $('.password').addClass('active');
        // }else if(sessionStorage.getItem('personCenter-router') === 'photo'){
        //   $('.photo').addClass('active');
        // }
        //
        // $('.active a').css('color', "#60AD94");
        // $(".nav-li").click(function(){
        //   $('.nav-li').each(function(){
        //     $(this).removeClass('active');
        //     $(this).find('a').css('color', '#547AC4');
        //   });
        //   $(this).addClass('active');
        //   $(this).find('a').css('color', '#60AD94');
        //   sessionStorage.setItem('personCenter-router', $(this).find('a').attr('flag').trim());
        // });




        $('#find_img').click(function(){
          $("#file").trigger("click");
        });

        $('.img_none_plus').click(function(){
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
            that.$message.warning("文件有误，请重新上传");
            return false;
          }
//            fileName.lastIndexOf(".");//返回的是位置下标

          var fileType = fileName.substring(fileName.lastIndexOf(".")+1);//截取文件类型

          //几种常见的图片格式
          var imgFileType = ["gif", "jpg", "jpeg", "bmp", "png", "psd"];
          if(imgFileType.indexOf(fileType) === -1){//不包含
            that.$message.warning("请上传正确图片文件");
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
                that.$message.warning("图片大小必须大于150px * 150px");
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

            that.photo = data;
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

        let that = this;

        $('.fileUpload').click(function () {
          that.isLoad = true;
          $(this).attr("disabled", "disabled");
          uploadImage()
        });

        //点击上传图片
        function uploadImage(){
          var myform = new FormData();//用来封装要上传的数据

          myform.append('file', $("#file")[0].files[0]);
          if($("#file")[0].files[0] === null || $("#file")[0].files[0] === "" || $("#file")[0].files[0] === undefined){
            that.$message.warning("文件为空");
            return;
          }
          //获取文件名
          var fileName = $("#file")[0].files[0].name;
          if(fileName != null && fileName.lastIndexOf(".") === -1){//是否包含 .
            that.$message.warning("文件有误，请重新上传");
            return;
          }
//            fileName.lastIndexOf(".");//返回的是位置下标

          var fileType = fileName.substring(fileName.lastIndexOf(".")+1);//截取文件类型

          //几种常见的图片格式
          var imgFileType = ["gif", "jpg", "jpeg", "bmp", "png", "psd"];
          if(imgFileType.indexOf(fileType) === -1){//不包含
            that.$message.warning("请上传正确图片文件");
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
          myform.append('name', that.user.name);


          $.ajax({
            url: "api/fileUpload",
            type: "POST",
            data: myform,
            // async: false,//有他获取不到进度
            contentType: false,
            processData: false,
            xhr: function() {        //ajax进度条，直接拿过去就可以用
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
              xhr.upload.addEventListener("progress", function (e) {
                var loaded = e.loaded; //已经上传大小情况
                var tot = e.total; //附件总大小
                var per = Math.floor(100 * loaded / tot); //已经上传的百分比
                // console.log(per)
                that.photoProgress = per;
                // $('.progress-bar').css('width',per+'%');   //这里指的是进度条的宽度等于完成的百分比
                // $.fn.progressInit.draw(per + '%'); //绘制经度条
              }, false);
              return xhr;
            }
          },
              success: function (result) {
              // console.log(result)
              // that.$message.warning(result.code);
              if(result.code === '101'){
                $("#photo_img").attr("src", result.extend);
                that.user.photo = result.extend;
                that.photo = result.extend;
                that.$message.success('头像修改成功');
              }
              that.photoProgress = '';

              that.isLoad = false;
              $('.fileUpload').removeAttr("disabled");
            },
            error: function (data) {
            }
          });

        }
      },
      computed:{
        ...mapState(['user']),
      }
    }
</script>


<style>
  .img_none_plus:hover{
    cursor: pointer;
    background-color: red;
    border: 3px solid #F2F2F2;
  }
  .person-center{
    position: relative;
    /*background-color: red;*/
    height: 685px;
    width: 100%;
  }

  .person-photo-div{
    /*margin: 5px;*/
    width: 260px;
    height: 280px;
    /*background-color: #f7e1b5;*/
    /*position: absolute;*/
    /*left: 280px;*/
    /*top: 107px;*/
    float: left;
  }
  .person-photo-title{
    color: #60AD94;
    text-align: center;
    font: 16px 'Yunyuan';
    border-bottom: 1px solid #aaa;
    padding: 10px 0;
    font-weight: 600;
  }
  .person-photo-main{
    width: 130px;
    height: 130px;
    overflow: hidden;
    border-radius: 50%;
    margin: 20px auto;
  }
  .person-photo-main:hover{
    cursor: pointer;
  }
  .person-simple-info1{
    text-align: center;
    font: 18px 'yunyuan';
  }
  .person-simple-info2{
    text-align: center;
    font: 13px 'yunyuan';
  }
  .person-center-main{
    /*height: 100%;*/
    position: absolute;
    left: 270px;
    bottom: 0;
    right: 0;
    padding: 10px;
    /*top: 0;*/
    /*float: left;*/
    margin: 0 10px 0 20px;
    /*width: 100%;*/
    height: 100%;
  }
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
    /*z-index: 10;*/
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
    /*z-index: 10;*/
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
    /*background-color: #aaa;*/
    border: 2px solid #aaa;
    position: absolute;
    left: 75px;
    opacity: 0.3;
    z-index: 1;
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
