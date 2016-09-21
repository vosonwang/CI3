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
        var_dump($_POST);
    }

    function delete(){

    }
}