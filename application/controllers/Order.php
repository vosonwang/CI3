<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/21
 * Time: 23:05
 */
class Order extends Controller
{
    function index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('templates/nav');
        $this -> load -> view('V_order');
    }

    function show(){
        $this -> load -> model('M_order');
        $dates=$this-> M_order->show();
        echo json_encode($dates);
    }
}