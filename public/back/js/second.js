
$(function () {

    var currentPage = 1;
    var pageSize = 3;
    
    function render() {

        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                // console.log(data);

                $('tbody').html(template('tpl',data));

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    size:'small',
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function (event,originalEvent,type,page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })

    }
    render();

//    添加类
    $('.btn_add').on('click',function () {
        $('#addModal').modal('show');

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function (data) {
                console.log(data);
                $('.dropdown-menu').html(template('tpl1',data));

            }
        })

    });

    $('.dropdown-menu').on('click','a',function () {
        $('.dropdown-text').text($(this).text());

        
    })























});