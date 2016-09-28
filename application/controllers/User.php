<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/22
 * Time: 0:41
 */
class user extends Controller
{
    function show(){
        $this -> load -> model('User_model');
        $dates=$this-> User_model->show();
        echo json_encode($dates);
    }
}