<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Delivery extends CI_Controller{
    function __construct()
    {
        parent::__construct();
    }

    public  function  index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('index');
    }

    function show(){
        $this -> load -> model('V_receiving');
        $dates=$this-> V_receiving->show();
        echo json_encode($dates);
    }
}