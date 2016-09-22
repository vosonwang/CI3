<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/22
 * Time: 0:37
 */
class Pattern_model extends CI_Model
{
    function show(){
        $query = $this -> db -> get('pattern');
        return $query -> result();
    }
}