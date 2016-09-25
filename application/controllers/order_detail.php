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
        $this -> load -> model('Order_detail_model');
        $orders=$this-> Order_model->getOrderNo();

        foreach ($orders as $item){
            $dates=$this-> Order_detail_model->order_detail($item->order_no);
            $item->detail=$dates;
            

        }

        echo json_encode($orders);
    }

}