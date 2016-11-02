<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/23
 * Time: 9:32
 */
class M_order_detail extends CI_Model
{
    function show()
    {
        $query = $this->db->get('v_order_detail');
        return $query->result();
    }


    function order_detail($order_no)
    {
        $this->db->select('pattern,pieces,totaldelivery,pattern_id');
        $this->db->where('order_no', $order_no);
        $query = $this->db->get('v_order_detail');
        return $query->result();
    }

    function remove($id)
    {
        $this->db->where('order_id',$id->order_id);
        $this->db->where('pattern_id',$id->pattern_id);
        $this->db->delete('order_pattern');
    }

    function insert($arr)
    {
        $this->db->insert('order_pattern', $arr);
    }


}