$(function () {

    var currentPage = 1;
    var pageSize = 5;
    var $form = $('#form');
    var imgArr = [];

    function render() {

        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
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


//    显示模态框
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');

    //    发送ajax请求获取二级分类数据
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function (data) {
                $('.second').html(template('tpl1',data));
            }
        })

    });


//    给dropdown-menu里面的按标签添加点击事件
    $('.dropdown-menu').on('click','a',function () {
        $('.dropdown-text').text($(this).text());

        $('#brandId').val($(this).data('id'));

        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
    });


    //校验应该要先实例化一个校验对象



    $('#fileupload').fileupload({
        dataType:'json',
        done:function (e,data) {
            console.log(data);
            $('.img_box').append('<img src=\" '+ data.result.picAddr +'\" width=\"100\" height=\"100\" alt=\"\">');

            imgArr.push(data.result);
            // console.log(data);

            if(imgArr.length === 3){
                $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
            }else{
                $form.data("bootstrapValidator").updateStatus('brandLogo','INVALID');
            }
        }
    })

    $form.bootstrapValidator({
        //默认不校验的配置
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        //必须是0以上的数字
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个大于0的库存"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺寸"
                    },
                    regexp:{
                        //33-55
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确的尺码（30-50）"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品的折扣价"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传三张图片"
                    }
                }
            }
        }
    });


    $form.on('success.form.bv',function (e) {
        e.preventDefault();

        var param = $form.serialize();

        param += "&picName1="+ imgArr[0] + "&picAddr1=" + imgArr[0].picAddr;
        param += "&picName2="+ imgArr[1] + "&picAddr2=" + imgArr[1].picAddr;
        param += "&picName2="+ imgArr[2] + "&picAddr3=" + imgArr[2].picAddr;


        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:param,
            success:function (data) {
            //    关闭模态框
                $('#addModal').modal('hide');

                currentPage = 1;
                render();


            //    重置数据

                $form[0].reset();
                $form.data('bootstrapValidator').resetForm();

                $('.img_box img').remove();
                $('.dropdown-text').text("请选择二级分类");
                imgArr = [];
            }
        })

    })

});