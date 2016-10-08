/**
 * Created by voson on 2016/10/8.
 */


$(function () {
    var register = new Vue({
        el: '#register',
        data: {
            userinfo: {}
        },
        methods: {
            register: function () {
                var _self = this;
                var ul = _self.userinfo.login_name;
                var uu = _self.userinfo.user_name;
                var pw = _self.userinfo.password;
                //过滤为空的值
                if (ul == undefined || uu == undefined || pw == undefined|| ul == "" || uu == ""|| pw == "") {
                    toastr.info("请输入登录名、姓名或密码！");
                } else {
                    $.ajax({
                        type: 'POST',
                        url: 'Register/newUser',
                        data: _self.userinfo,
                        success: function (msg) {
                            /*console.log(msg);*/

                        }
                    })
                }
            }


        }
    })
});