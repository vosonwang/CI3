<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/23
 * Time: 9:32
 */
class M_order_detail extends CI_Model
{
    function show(){
        $query = $this -> db -> get('v_order_detail');
        return $query -> result();
    }



    function order_detail($order_no){
        $this->db->select('id,pattern,pieces,totaldelivery');
        $this->db->where('order_no', $order_no);
        $query=$this->db->get('v_order_detail');
        return $query -> result();
    }

    function delete($id){
        $this->db->delete('order_pattern', array('id' => $id));
    }

}