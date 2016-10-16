<?php

/**
 * Created by PhpStorm.
 * User: Voson_2
 * Date: 2016/9/21
 * Time: 23:05
 */
class Order extends Controller
{
    function index()
    {
        $this->load->view('templates/header');
        $this->load->view('templates/nav');
        $this->load->view('V_order');
        $this->load->view('templates/footer');
    }

    function show()
    {
        $this->load->model('M_order');
        $dates = $this->M_order->show();
        echo json_encode($dates);
    }

    function insert()
    {
        $json = $this->input->post(null, true);
        $json = json_decode($json['json'], true);
        $this->load->model('M_order');
        foreach ($json as $item) {
            $this->M_order->insert($item);
        }
    }

    function delete()
    {
        $id = $this->input->post(null, true);
        $this->load->model('M_order');
        $this->M_order->delete($id['id']);
    }


}