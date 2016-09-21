<?php  defined('BASEPATH') OR exit('No direct script access allowed');
class index extends Controller{
    public  function  index(){
        $this -> load -> view('templates/nav');
        $this -> load -> view('templates/header');
    }

}