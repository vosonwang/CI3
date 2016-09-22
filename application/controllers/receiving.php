<?php  defined('BASEPATH') OR exit('No direct script access allowed');
class Receiving extends Controller{
    public  function  index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('templates/nav');
        $this -> load -> view('receiving');
    }

    function show(){
        $this -> load -> model('Receiving_model');
        $dates=$this-> Receiving_model->show();
        echo json_encode($dates);
    }

    function insert(){
        $json=($this->input->post(NULL, TRUE));
        $dates=json_decode($json[json]);
        foreach($dates as $item){
            foreach ( $item as $key=>$value){
                if($key==order_id || $key==pattern_id || $key==user_id){

                }
            }
        }



            //开启数据库事务
        $this->db->trans_start();
        $this->db->insert('orders', $data);
        $this->db->trans_complete();

    }

    function delete(){

    }
}