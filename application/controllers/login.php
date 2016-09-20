<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Login extends CI_Controller {
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
                // 如果提交的密码与正确密码一致，则创建session
                $msg=[1,"window.location.href='receiving'"];
                $arr = array('s_id' => $user[0] -> id);
                // 把用户ID存入数组
                $this -> session -> set_userdata($arr);
                //设置session
        } else {
                $msg=[0,"密码错误！"];
            }
        } else {
            $msg=[0,"登陆名不正确！"];
        }

        $msg=json_encode($msg);
        echo $msg;
    }

    function is_login() {

        if ($this -> session -> userdata('s_id')) {
            // 如果能取得这个ID的session，就意味着处于登录状态
            echo "$_SESSION";
        } else {
            echo "no login";
        }
    }

    function logout() {

        // 载入CI的session库
        $this -> session -> unset_userdata('s_id');
        // 删除此ID是session
    }

}