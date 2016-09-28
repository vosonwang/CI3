<?php
/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/19
 * Time: 10:27
 */

if ( ! function_exists('css_url'))
{
    function css_url($uri = '')
    {
        $CI =& get_instance();
        $css_string = "<link rel='stylesheet' type='text/css' href='".$CI->config->base_url("/public/css".$uri)."' media='all'>";
        return $css_string;
    }
}
//---------------------------------
if ( ! function_exists('js_url'))
{
    function js_url($uri = '')
    {
        $CI =& get_instance();
        $javascript_string = "<script type='text/javascript' src='".base_url("/public/js".$uri)."'></script>";
        return $javascript_string;
    }
}


