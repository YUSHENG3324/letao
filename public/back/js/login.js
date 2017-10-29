//表单校验功能
//1. 用户名不能为空
//2. 用户密码不能为空
//3. 用户密码必须是6-12位


$(function () {

    //    初始化表单校验插件
    var $form = $('#form');

    $form.bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: "用户名错误"
                    }
                }
            },

            password: {
                validators: {
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码的长度为6-12位'
                    },
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    callback: {
                        message: "用户密码错误"
                    }
                }


            }
        }

    })


    //获取表单校验实例

    var validator = $form.data('bootstrapValidator');

//    给表单注册一个校验成功实例

    $form.on('success.form.bv', function (e) {

        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            success: function (data) {
                //    console.log(data);
                //    {error: 1000, message: "用户名不存在! "} 失败
                //    {success: true} 成功
                if(data.success){
                    location.href = 'index.html';
                }else{

                    if(data.error === 1000){
                        // console.log(validator.updateStatus);
                        validator.updateStatus("username","INVALID","callback");
                    }

                    if(data.error === 1001){
                        validator.updateStatus("password","INVALID","callback");
                    }

                }
            }

        })


    })


    //重置表单
    $("[type='reset']").on('click',function () {
        validator.resetForm().callback();
    })


});