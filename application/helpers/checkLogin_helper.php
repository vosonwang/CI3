<?php
/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/20
 * Time: 17:09
 */

if(!function_exists('checkLogin')){
    function checkLogin(){
        $ci =& get_instance();
        $ci->load->helper('url');
        $d = trim($ci->router->fetch_directory().'/');
        $c = $ci->router->fetch_class();
        $m = $ci->router->fetch_method();
        echo $d;
        /*$username = $ci->session->userdata('username');
        if ($d = 'controllers' && $c = 'login' && $m !='check'){
            if (empty($username)){
                redirect('admin/Index/login?back_url='.uri_string());
            }
        }*/
    }
}