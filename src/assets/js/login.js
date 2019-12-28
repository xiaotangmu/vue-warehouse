
$(function(){
  $(".login_right_main_input input").focus(function(){
    $(this).parent(".login_right_main_input").css("box-shadow", "0px 7px 7px -7px #60AD94");
    $(this).parent(".login_right_main_input").find("span").eq(0).css("color", "#60AD94");
    $(this).parent(".login_right_main_input").css("border-bottom", "2px solid #60AD94");
    $(this).popover('hide');
  });
  $(".login_right_main_input input").blur(function(){
    $(this).parent(".login_right_main_input").css("box-shadow", "");
    $(this).parent(".login_right_main_input").find("span").eq(0).css("color", "");
    $(this).parent(".login_right_main_input").css("border-bottom", "");
    notBlank(this);
  });

//用户名格式：由字母、数字和字符. ! _ - ?组成的6-18位字符串 -- /^[a-zA-Z0-9.!?_-]{6,18}$/ -- /^[\w.!?_-]{6,18}$/
  $("#login_username").change(function(){
    if (!notBlank(this)) {
      return false;
    }
    user_name_validate();
  });
  $("#login_pwd").change(function(){
    if (!notBlank(this)) {
      return false;
    }
    pwd_validate();
  });
//用户名格式验证
  function user_name_validate(){
    var validate_format = /^[\w.!?_-]{6,18}$/;
    var tip_data = "用户名是由字母、数字和字符. ! _ - ?组成的6-18位字符串";
    return validate($("#login_username"), validate_format, tip_data);
  }
//密码格式验证
  function pwd_validate(){
    var validate_format = /^[\w.!?_-]{6,18}$/;
    var tip_data = "用户名是由字母、数字和字符. ! _ - ?组成的6-18位字符串";
    return validate($("#login_pwd"), validate_format, tip_data);
  }
//格式验证看注册的验证代码
//格式验证
  function validate(event, format, tip){
    if (!format.test($(event).val())) {
      $(event).attr("data-content", tip);
      $(event).popover('show');
      return false;
    }
    return true;
  }
//非空验证
  function notBlank(event){
    if($(event).val() === null || $(event).val() === ""){
      $(event).attr("data-content", "内容不能为空");
      $(event).popover('show');
      return false;
    }
    return true;//不为空
  }

  $("#pwd_eye").click(function(){
    if($("#login_pwd").attr("type") === "password"){
      $("#login_pwd").attr("type", "text");
      $(this).removeClass("glyphicon-eye-close");
      $(this).addClass("glyphicon-eye-open");
    }else{
      $("#login_pwd").attr("type", "password");
      $(this).removeClass("glyphicon-eye-open");
      $(this).addClass("glyphicon-eye-close");
    }
  });
  $('#drag').drag();
});



