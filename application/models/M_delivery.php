<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/29
 * Time: 14:22
 */
class M_delivery extends CI_Model
{
    function show(){
        $query = $this -> db -> get('v_deliveries');
        return $query -> result();
    }

    function save($arr){
        $this->db->set('price', $arr['price'], FALSE);
        $this->db->where('id', $arr['id']);
        $bool=$this->db->update('deliveries');
        return $bool;
    }

}