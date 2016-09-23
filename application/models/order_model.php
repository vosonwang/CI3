<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/21
 * Time: 23:03
 */
class Order_model extends CI_Model
{
    function show(){
        $query = $this -> db -> get('orders');
        return $query -> result();
    }

    function getOrderNo(){
        $this->db->distinct();
        $this->db->select('order_no');
        $query=$this->db->get('orders');
        return $query -> result();
    }
}