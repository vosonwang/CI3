<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/22
 * Time: 0:38
 */
class pattern extends Controller
{
    function show(){
        $this -> load -> model('Pattern_model');
        $dates=$this-> Pattern_model->show();
        echo json_encode($dates);
    }
}