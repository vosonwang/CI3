<title>注册</title>

<div class="container">
    <div style="margin-bottom: 20px">&nbsp;</div>
    <div class="row">
        <div class="col-md-offset-4 col-md-4" id="register">
            <form class="form-horizontal" @submit.prevent>
                <div class="form-group">
                    <label class="col-sm-3 col-xs-12 control-label">登录名</label>
                    <div class="col-sm-7 col-xs-12">
                        <input type="text" class="form-control text-left" v-model="userinfo.login_name" name="login_name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 col-xs-12 control-label">姓名</label>
                    <div class="col-sm-7 col-xs-12">
                        <input type="text" class="form-control text-left" v-model="userinfo.user_name" name="user_name">
                    </div>
                </div>
                <div class="form-group">
                    <label  class="col-sm-3 col-xs-12 control-label">密码</label>
                    <div class="col-sm-7 col-xs-12">
                        <input type="password" class="form-control text-left" v-model="userinfo.password" name="password" autocomplete="off">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-5 col-sm-3">
                        <button  class="btn btn-default" @click="register">注册</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="public/vm/register.js"></script>