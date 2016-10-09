<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Receiving extends Controller
{
    public function index()
    {
        $this->load->view('templates/header');
        $this->load->view('templates/nav');
        $this->load->view('V_receiving');
    }

    function show()
    {
        $this->load->model('M_receiving');
        $dates = $this->M_receiving->show();
        echo json_encode($dates);
    }

    function insert()
    {
        $this->load->model('M_receiving');
        $json = ($this->input->post(NULL, TRUE));
        $dates = json_decode($json['json']);
        foreach ($dates as $item) {
                $this->M_receiving->insert($item);
        }

    }

    function delete()
    {
        $this->load->model('M_receiving');
        $json = ($this->input->post(NULL, TRUE));
        $dates = json_decode($json['json']);
        foreach ($dates as $item) {
            $this->M_receiving->insert($item);
        }
    }
}