$(function(){
  $(function(){
    $("#main_body_content").html("[(~{components/personalCenter::#personal_center})]");
  });

  $(".main_head_right_photo").hover(
    function(){
      $(".dropdown-menu").show("slow");
    },
    function(){
      $(".dropdown-menu").hide("slow");
    }
  );

  $(".main_body_menu_item").click(function(){
    var flag = $(this).attr("open-child-flag");
    if (flag === "open") {//打开状态，再次点击关闭
      $(this).find(".main_body_menu_item_child").hide(300);
      $(this).attr("open-child-flag", "close");
      return ;
    }
    //打开该items
    //先关闭其他 -- 防止撑开页面
    $(".main_body_menu_item").find(".main_body_menu_item_child").hide(300);
    $(".main_body_menu_item").attr("open-child-flag", "close");
    $(this).attr("open-child-flag", "open");
    $(this).find(".main_body_menu_item_child").show(300);
  });
});
