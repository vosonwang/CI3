<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class index extends CI_Controller{
    // 构造方法
    function __construct()
    {
        parent::__construct();
    }

    public  function  index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('index');
    }

}