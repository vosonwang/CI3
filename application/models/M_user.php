<?php
/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/9/19
 * Time: 10:15
 */

    class M_user extends CI_Model{

        function show(){
            $this -> db -> select('user_id,user_name');
            $query = $this -> db -> get('v_user_detail');
            return $query -> result();
        }

        function insert($arr) {
            $this -> db -> insert('user', $arr);
        }

        function u_update($id, $arr) {
            $this -> db -> where('id', $id);
            $this -> db -> update('user', $arr);
        }

        function u_del($id) {
            $this -> db -> where('id', $id);
            $this -> db -> delete('user');
        }

        function u_select($name) {
            $this -> db -> where('login_name', $name);
            $this -> db -> select('*');
            $query = $this -> db -> get('user');
            return $query -> result();
        }
    }
?>
