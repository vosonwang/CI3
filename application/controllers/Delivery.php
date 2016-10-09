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
}