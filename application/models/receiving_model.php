<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/19
 * Time: 14:51
 */
class Receiving_model extends CI_Model{
    function show() {
        $this -> db -> select('*');
        $query = $this -> db -> get('v_receiving');
        return $query -> result();
    }

    function insert(){

    }
}