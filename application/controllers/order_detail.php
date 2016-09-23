<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/23
 * Time: 9:40
 */

class order_detail extends Controller
{
    function show(){
        $this -> load -> model('Order_model');
        $orders=$this-> Order_model->show();

        $this -> load -> model('Order_detail_model');
        $dates=$this-> Order_detail_model->show();
        echo json_encode($dates);
    }

    function getDetail(){
        $this -> load -> model('Order_model');
        $orders=$this-> Order_model->getOrderNo();

        $this -> load -> model('Order_detail_model');
        foreach ($orders as $item){
            $dates=$this-> Order_detail_model->order_detail($item->order_no);
            $item->detail=$dates;

            $id=$this-> Order_detail_model->order_pattern_id($item->order_no);
            $item->id=$id;

        }

        echo json_encode($orders);
    }

}