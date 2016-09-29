<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/21
 * Time: 23:05
 */
class order extends Controller
{
    function index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('templates/nav');
        $this -> load -> view('order');
    }

    function show(){
        $this -> load -> model('Model_order');
        $dates=$this-> Model_order->show();
        echo json_encode($dates);
    }
}