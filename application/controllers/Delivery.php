<?php  defined('BASEPATH') OR exit('No direct script access allowed');
class Delivery extends Controller{
    public  function  index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('templates/nav');
        $this -> load -> view('V_delivery');
    }

    function show(){
        $this -> load -> model('M_delivery');
        $dates=$this-> M_delivery->show();
        echo json_encode($dates);
    }

    function save(){
        $json=$this->input->post(null,true);
        $json=json_decode($json['json'],true);
        $this -> load -> model('M_delivery');
        foreach ($json as $item){
            $bool=$this-> M_delivery->save($item);
        }
        if($bool!=false){
            echo "成功！";
        }else{
            echo '失败！';
        }
    }
}