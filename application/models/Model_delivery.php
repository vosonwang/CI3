<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/29
 * Time: 14:22
 */
class Model_delivery extends CI_Model
{
    function show(){
        $query = $this -> db -> get('v_deliveries');
        return $query -> result();
    }



}