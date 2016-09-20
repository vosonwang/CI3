<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Login extends Controller {
    // 构造方法
    function __construct() {
        parent::__construct();
    }


    public  function  index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('login');
    }

    function check() {
        // 载入CI的session库
        $this -> load -> model('User');
        $user = $this -> User -> u_select($_POST['login_name']);
        //调用User_test模型的u_select方法查询提交的用户名的信息
        if ($user) {
            // 如果此用户存在
            if (password_verify($_POST['password'],$user[0] -> password)) {
                $_SESSION['is_login']=1;
                $_SESSION['user_name']=$user[0]->user_name;
                $msg=[1,"window.location.href='index'"];
        } else {
                $msg=[0,"密码错误！"];
            }
        } else {
            $msg=[0,"登陆名不正确！"];
        }

        $msg=json_encode($msg);
        echo $msg;
    }


    function logout() {

        session_destroy();
    }

}