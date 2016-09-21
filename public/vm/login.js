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
        ready:function(){
            if(localStorage.is_remeber){
                this.is_remeber=localStorage.is_remeber;
                this.userinfo.login_name=localStorage.login_name;
                this.userinfo.password=getDAes(localStorage.password);
                $("[name='checkbox']").attr("checked",true);
                $("[name='login_name']").val(localStorage.login_name);
                $("[name='password']").val(localStorage.password);
            }
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
                    this.remeber();
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
            },
            remeber:function () {
                if($("[name='checkbox']").prop("checked")){
                    var _self = this;
                    var un = _self.userinfo.login_name;
                    var pw = _self.userinfo.password;
                    if (un != undefined && pw != undefined && un != "" && pw != "") {
                        localStorage.login_name=this.userinfo.login_name;
                        localStorage.password=getAES(this.userinfo.password);
                        localStorage.is_remeber=true;
                    }
                }else{
                    localStorage.clear();
                    $("[name='login_name']").val("");
                    $("[name='password']").val("");
                    this.is_remeber=false;
                }
            }
        }
    });

});