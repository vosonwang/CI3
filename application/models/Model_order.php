<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/21
 * Time: 23:03
 */
class Model_order extends CI_Model
{
    function show(){
        $query = $this -> db -> get('orders');
        return $query -> result();
    }

    function getOrderNo(){
        $this->db->distinct();
        $this->db->select('id,order_no,expiration_date');
        $query=$this->db->get('orders');
        return $query -> result();
    }

    function getOrderId($order_no){
        $this->db->select('id');
        $this->db->where('order_no', $order_no);
        $query=$this->db->get('orders');
        return $query -> row();
    }
}