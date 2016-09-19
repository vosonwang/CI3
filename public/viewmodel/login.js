/**
 * Created by voson on 16/8/14.
 * 用于登录验证
 */
$(function () {
    var login = new Vue({
        el: '#login',
        data: {
            userinfo: {}
        },
        methods: {
            login: function () {
                var _self = this;
                var un = _self.userinfo.login_name;
                var pw = _self.userinfo.password;

                //过滤为空的值
                if (un == undefined || pw == undefined || un == "" || pw == "") {
                    toastr.info("请输入用户名或密码！");
                } else {
                    $.ajax({
                        type: 'POST',
                        url: 'login/check',
                        data: _self.userinfo,
                        success: function (msg) {
                            /*console.log(msg);*/
                            var arr=JSON.parse(msg);
                            if(arr[0]==0){
                                toastr.error(arr[1])
                            }else{
                             eval(arr[1]);
                            }
                        }
                    })
                }
            }
        }
    });


});