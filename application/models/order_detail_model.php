<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/23
 * Time: 9:32
 */
class Order_detail_model extends CI_Model
{
    function show(){
        $query = $this -> db -> get('v_order_detail');
        return $query -> result();
    }



    function order_detail($order_no){
        $this->db->select('id,pattern,pieces');
        $this->db->where('order_no', $order_no);
        $query=$this->db->get('v_order_detail');
        return $query -> result();
    }



}