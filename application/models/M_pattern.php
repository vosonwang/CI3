<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/22
 * Time: 0:37
 */
class M_pattern extends CI_Model
{
    function show(){
        $query = $this -> db -> get('pattern');
        return $query -> result();
    }

    function insert($arr){
        $this->db->insert('pattern', $arr);
    }

    function delete($id){
        $this->db->delete('pattern', array('id' => $id));
    }

    function update($arr){
        $this->db->set('pattern', $arr['pattern']);
        $this->db->where('id', $arr['id']);
        $this->db->update('pattern');
    }
}