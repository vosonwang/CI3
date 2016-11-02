<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/19
 * Time: 14:51
 */
class M_receiving extends CI_Model
{
    function show()
    {
        $query = $this->db->get('v_receiving');
        return $query->result();
    }

    function insert($arr)
    {

        $this->db->insert('receiving', $arr);
    }

    function remove($id)
    {
        $this->db->delete('receiving', array('id' => $id));
    }

    function update($arr)
    {
        $this->db->set('receipt_date', $arr['receipt_date']);
        $this->db->set('order_id', $arr['order_id']);
        $this->db->set('pattern_id', $arr['pattern_id']);
        $this->db->set('trips', $arr['trips']);
        $this->db->set('pieces', $arr['pieces']);
        $this->db->set('user_id', $arr['user_id']);
        $this->db->where('id', $arr['id']);
        $this->db->update('receiving');


    }
}