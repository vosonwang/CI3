<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/22
 * Time: 0:41
 */
class C_user extends Controller
{
    function show(){
        $this -> load -> model('M_user');
        $dates=$this-> M_user->show();
        echo json_encode($dates);
    }
}