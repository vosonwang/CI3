<?php  defined('BASEPATH') OR exit('No direct script access allowed');
class Receiving extends Controller{
    function __construct()
    {
        parent::__construct();
    }

    public  function  index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('templates/nav');
        $this -> load -> view('receiving');
    }

    function show(){
        $this -> load -> model('V_receiving');
        $dates=$this-> V_receiving->show();
        echo json_encode($dates);
    }

    function delete(){

    }
}