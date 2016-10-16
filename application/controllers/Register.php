<?php

/**
 * Created by PhpStorm.
 * User: voson
 * Date: 2016/10/8
 * Time: 14:43
 */
class Register extends Controller
{
    public function index()
    {
        $this -> load -> view('templates/header');
        $this -> load -> view('V_register');
        $this->load->view('templates/footer');
    }

    function newUser(){
        $json=$this->input->post(null,TRUE);
        $json['role_id']=1;
        $json['password']=password_hash($json['password'], PASSWORD_DEFAULT);
        $this -> load -> model('Model_user');
        $this -> Model_user ->insert($json);
    }

}