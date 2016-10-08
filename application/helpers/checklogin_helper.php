<?php
/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/20
 * Time: 17:09
 */

if (!function_exists('checklogin')) {
    function checklogin()
    {
        $ci =& get_instance();
        $ci->load->helper('url');
        $d = trim($ci->router->fetch_directory() . '/');
        $c = $ci->router->fetch_class();
        $m = $ci->router->fetch_method();
        $is_ajax = $ci->input->is_ajax_request();

        if (empty($_SESSION['is_login'])) {     //未登录
            //判断是否是ajax请求
            if ($is_ajax) {
                if($d != '/' || $c != 'login' || $m != 'check'){
                    echo "alert('非法请求!') ";
                    exit;
                }
            } else {
                //判断是否是跳转链接，如果是则不做下一步判断
                if (!isset($_SESSION['HTTP_REFERER'])) {
                    if ($d != '/' || $c != 'login' || $m != 'index') {
                        redirect('login');
                    }
                }
            }
        } else {                    //已登录
            if (!$is_ajax) {
                if (!isset($_SESSION['HTTP_REFERER'])) {
                    if ($d == '/' && $c == 'login' && $m == 'index') {
                        redirect('delivery');
                    }
                }
            }
        }
    }
}