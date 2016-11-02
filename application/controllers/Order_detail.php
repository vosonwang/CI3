<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/23
 * Time: 9:40
 */

class Order_detail extends Controller
{
    function show(){
        $this -> load -> model('M_order_detail');
        $dates=$this-> M_order_detail->show();
        echo json_encode($dates);
    }

    function getDetail(){
        $this -> load -> model('M_order');
        $this -> load -> model('M_order_detail');
        $orders=$this-> M_order->getOrderNo();

        foreach ($orders as $item){
            $dates=$this-> M_order_detail->order_detail($item->order_no);
            $item->detail=$dates;
        }

        echo json_encode($orders);
    }

    function remove(){
        $this -> load -> model('M_order_detail');
        $t=$this->input->post(null,true);
        foreach(json_decode($t['json']) as $item){
            $this-> M_order_detail->remove($item);
        }
    }

    function insert(){
        $json=$this->input->post(null,true);
        $json=json_decode($json['json'],true);
        $this -> load -> model('M_order_detail');
        foreach ($json as $item){
            $this-> M_order_detail->insert($item);
        }
    }


}