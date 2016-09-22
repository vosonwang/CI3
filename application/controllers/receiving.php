<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Receiving extends Controller
{
    public function index()
    {
        $this->load->view('templates/header');
        $this->load->view('templates/nav');
        $this->load->view('receiving');
    }

    function show()
    {
        $this->load->model('Receiving_model');
        $dates = $this->Receiving_model->show();
        echo json_encode($dates);
    }

    function insert()
    {
        $this->load->model('Receiving_model');
        $json = ($this->input->post(NULL, TRUE));
        $dates = json_decode($json['json']);
        foreach ($dates as $item) {
                $this->Receiving_model->insert($item);
        }

    }

    function delete()
    {

    }
}