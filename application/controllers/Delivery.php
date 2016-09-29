<?php  defined('BASEPATH') OR exit('No direct script access allowed');
class Delivery extends Controller{
    public  function  index(){
        $this -> load -> view('templates/nav');
        $this -> load -> view('templates/header');
        $this -> load -> view('delivery');
    }

    function show(){
        $this -> load -> model('Model_delivery');
        $dates=$this-> Model_delivery->show();
        echo json_encode($dates);
    }
}