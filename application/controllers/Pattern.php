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
        $this -> load -> model('Pattern_model');
        $dates=$this-> Pattern_model->show();
        echo json_encode($dates);
    }

    function insert(){
        $json=$this->input->post(null,TRUE);
        $this -> load -> model('Pattern_model');
        $datas=json_decode($json['json']);
        foreach ($datas as $item){
            $this-> Pattern_model->insert($item);
        }
    }

    function delete(){
        $json=$this->input->post(null,TRUE);
        $datas=json_decode($json['json']);
        $this -> load -> model('Pattern_model');
        foreach ($datas as $item){
            $this-> Pattern_model->delete($item);
        }
    }

}