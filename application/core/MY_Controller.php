<?php

//防止直接通过文件路径直接访问
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller{

    //构造函数：在构造函数中判断用户是否已经登陆，如果登陆，可进入后台控制器，返回跳转到登陆页面  
    public function __construct(){
        parent::__construct();
        $this->load->helper('checkLogin');
        checkLogin();
    }

}
?>  