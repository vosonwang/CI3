<?php  defined('BASEPATH') OR exit('No direct script access allowed');
class index extends Controller{
    // 构造方法
    function __construct()
    {
        parent::__construct();
    }

    public  function  index(){
        $this -> load -> view('templates/nav');
        $this -> load -> view('templates/header');
    }

}