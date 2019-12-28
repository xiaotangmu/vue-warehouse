$(function(){
  $("#register_username").change(function(){
    usernameValidate(this);
  });
  $("#register_pwd1").change(function(){
    usernameValidate(this);
    $("#register_pwd1").next().hide();
  });
  $("#register_pwd2").change(function(){
    if (usernameValidate(this)) {
      //验证两次密码是否相等
      isEqualPwdTwice();
    }
  });
  $("#register_email").change(function(){
    emailValidate(this);
  });

  //邮箱格式验证
  function emailValidate(element){
    var format = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
    var tip = "请输入正确邮箱";
    return formatDoing($(element), format, tip);
  }

  //验证两次密码是否相等
  function isEqualPwdTwice(){
    if (!($("#register_pwd2").val() === $("#register_pwd1").val())) {
      $("#register_pwd2").next().hide();
      $("#register_pwd1").next().hide();
      $("#register_pwd2").parent(".register_main_input").addClass("has-error");
      $("#register_pwd2").parent(".register_main_input").addClass("has-error");
      $("#register_pwd2").parent(".register_main_input").find("span").eq(2).text("两次密码输入不相等").show();
      return false;
    }
    $("#register_pwd1").next().show();
    return true;
  }

  function usernameValidate(element) {
    var validate_format = /^[\w.!?_-]{6,18}$/;
    var tip_data = "数据是由字母、数字和字符. ! _ - ?组成的6-18位字符串";
    return formatDoing(element, validate_format, tip_data);
  }
  //格式统一处理
  function formatDoing(element, format, tip){
    $(element).next().hide();
    $(element).parent(".register_main_input").removeClass("has-error");
    if (!notBlank2(element)) {
      $(element).parent(".register_main_input").find("span").eq(2).text("内容不能为空").show();
//                $(element).next(".register_span_tip_format").text("内容不能为空").show();//用next获取不到数据
      $(element).parent(".register_main_input").addClass("has-error");
      return false;
    }
    if (!validate2(element, format)) {
      $(element).parent(".register_main_input").find("span").eq(2).text(tip).show();
//                $(element).next(".register_span_tip_format").val(tip).show();
      $(element).parent(".register_main_input").addClass("has-error");
      return false;
    }
    //验证成功
//            $(element).next(".register_span_tip_format").hide();
    $(element).parent(".register_main_input").find("span").eq(2).hide();
    $(element).next().show();//直接next可以使用
    return true;
  }
  //格式检查
  function validate2(element, format){//元素，格式
    return format.test($(element).val());
  }
  //非空检查 -- 与login与的提示框不同
  function notBlank2(element){
    return !($(element).val() === null || $(element).val() === ""); //后面统一处理，以便后面复用
  }
});
