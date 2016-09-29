<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/22
 * Time: 0:38
 */
class pattern extends Controller
{
    function index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('templates/nav');
        $this -> load -> view('pattern');
    }

    function show(){
        $this -> load -> model('Model_pattern');
        $dates=$this-> Model_pattern->show();
        echo json_encode($dates);
    }

    function insert(){
        $json=$this->input->post(null,TRUE);
        $this -> load -> model('Model_pattern');
        $datas=json_decode($json['json']);
        foreach ($datas as $item){
            $this-> Model_pattern->insert($item);
        }
    }

    function delete(){
        $json=$this->input->post(null,TRUE);
        $datas=json_decode($json['json']);
        $this -> load -> model('Model_pattern');
        foreach ($datas as $item){
            $this-> Model_pattern->delete($item);
        }
    }

}