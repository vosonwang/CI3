<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/19
 * Time: 14:51
 */
class V_receiving extends CI_Model{
    function __construct()
    {
        parent::__construct();
        $this -> load -> database();
    }

    function show() {
        $this -> db -> select('*');
        $query = $this -> db -> get('v_receiving');
        return $query -> result();
    }
}