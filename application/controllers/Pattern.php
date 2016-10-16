<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/22
 * Time: 0:38
 */
class Pattern extends Controller
{
    function index(){
        $this -> load -> view('templates/header');
        $this -> load -> view('templates/nav');
        $this -> load -> view('V_pattern');
        $this->load->view('templates/footer');
    }

    function show(){
        $this -> load -> model('M_pattern');
        $dates=$this-> M_pattern->show();
        echo json_encode($dates);
    }

    function insert(){
        $this -> load -> model('M_pattern');

        $json=$this->input->post(null,TRUE);
        $datas=json_decode($json['json']);

        foreach ($datas as $item){
            $this-> M_pattern->insert($item);
        }
    }

    function delete(){
        $json=$this->input->post(null,TRUE);
        $datas=json_decode($json['json']);
        $this -> load -> model('M_pattern');
        foreach ($datas as $item){
            $this-> M_pattern->delete($item);
        }
    }

    function update(){
        $this -> load -> model('M_pattern');

        $json=$this->input->post(null,TRUE);

        $datas = json_decode($json['json'], true);


        $this-> M_pattern->update($datas);


    }

}