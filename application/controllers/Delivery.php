<?php  defined('BASEPATH') OR exit('No direct script access allowed');
class Delivery extends CI_Controller{
    public  function  index(){
        $this -> load -> view('templates/nav');
        $this -> load -> view('templates/header');
        $this -> load -> view('delivery');
    }

    function show(){
        $this -> load -> model('');
        $dates=$this-> V_receiving->show();
        echo json_encode($dates);
    }
}