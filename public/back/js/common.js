

// 进度条
// $(document).ajaxStart(function () {
//     NProgress.start();
// })
//
// $(document).ajaxStop(function () {
//     NProgress.done();
// })

if(location.href.indexOf("login.html") < 0){
    
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        success:function (data) {
            if(data.success === 400){
                location.href = "login.html";
            }
        }
    });
    
}



$('.child').prev().on('click',function () {
    $(this).next().slideToggle();
})

$('.icon_menu').on('click',function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
    $('.lt_header').toggleClass('now');
    // console.log('jhjk');
})



//退出功能

$('.icon_logout').on('click',function () {
    $('#logoutModal').modal('show');
})

$('.btn_logout').on('click',function () {
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        success:function (data) {
            // console.log(data);
            if(data.success){
                location.href = "login.html";
            }
        }
    })
})


