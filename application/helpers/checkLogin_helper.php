<?php
/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/20
 * Time: 17:09
 */

if (!function_exists('checkLogin')) {
    function checkLogin()
    {

        $ci =& get_instance();
        $ci->load->helper('url');
        $d = trim($ci->router->fetch_directory() . '/');
        $c = $ci->router->fetch_class();
        $m = $ci->router->fetch_method();
        if (empty($_SESSION['is_login'])){
                if ($d!='/' ||$c != 'login' || $m !='index') {
                    redirect('login');
                }
            }else{
                if ($d =='/' && $c == 'login' && $m =='index'){
                    redirect('index');
                }
            }


}}