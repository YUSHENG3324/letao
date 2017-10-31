

$(function () {

    var currentPage = 1;
    var pageSize = 2;

    function render() {

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {

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


//    显示模态框
    $(".btn_add").on('click',function () {
        $('#addModal').modal('show');
    })


//    表单校验
    var $form =$('#form');

    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空"
                    }
                }
            }

        }
    });

    $form.on('success.form.bv',function (e) {
        e.preventDefault();


        $.ajax({
            type:'post',
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();


                    // console.log($form);
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();
                }
            }
        })
    })






















});