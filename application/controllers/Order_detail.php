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
        $this -> load -> model('M_order');
        $orders=$this-> M_order->show();

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

    function delete(){
        $this -> load -> model('M_order_detail');
        $t=$this->input->post(null,true);
        foreach(json_decode($t['json']) as $item){
            $this-> M_order_detail->delete($item);
        }
    }


}