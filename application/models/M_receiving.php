<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/19
 * Time: 14:51
 */
class M_receiving extends CI_Model{
    function show() {
        $query = $this -> db -> get('v_receiving');
        return $query -> result();
    }

    function insert($arr){
        $this->db->insert('receiving', $arr);
    }
}