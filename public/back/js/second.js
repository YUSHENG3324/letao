$(function () {

    var currentPage = 1;
    var pageSize = 3;
    var $form = $('#form');

    function render() {

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);

                $('tbody').html(template('tpl', data));

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    size: 'small',
                    totalPages: Math.ceil(data.total / pageSize),
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })

    }

    render();

//    添加类
    $('.btn_add').on('click', function () {

        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                // console.log(data);
                $('.dropdown-menu').html(template('tpl1', data));

            }
        })

    });

    $('.dropdown-menu').on('click', 'a', function () {
        $('.dropdown-text').text($(this).text());

        $('#categoryId').val($(this).data('id'));

        //    让categoryId验证通过
        $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })


    //初始化文件上传
    $('#fileupload').fileupload({
        dataType: 'json',
        //导尿管文件上传成功的时候执行的函数
        done: function (e, data) {
            $('.img_box img').attr('src', data.result.picAddr);

            // console.log(data);
            $('#brandLogo').val(data.result.picAddr);
            $form.data("bootstrapValidator").updateStatus('brandLogo',"VALID");
        }
    });


    $form.bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择logo"
                    }
                }
            }
        }

    });


    $form.on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function (data) {
                // console.log(data);
                //1. 关闭模态框
                $('#addModal').modal('hide');
                 //2.渲染第一页
                    currentPage = 1;
                    render();
                // 3. 重置表单

                $form[0].reset();
                $form.data('bootstrapValidator').resetForm();

                $('.img_box img').attr('src','images/none.png');
                $('.dropdown-text').text('请选择一级分类');
            }
        })

    })


});