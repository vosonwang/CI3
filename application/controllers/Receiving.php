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
        $this->load->model('Model_receiving');
        $dates = $this->Model_receiving->show();
        echo json_encode($dates);
    }

    function insert()
    {
        $this->load->model('Model_receiving');
        $json = ($this->input->post(NULL, TRUE));
        $dates = json_decode($json['json']);
        foreach ($dates as $item) {
                $this->Model_receiving->insert($item);
        }

    }

    function delete()
    {
        $this->load->model('Model_receiving');
        $json = ($this->input->post(NULL, TRUE));
        $dates = json_decode($json['json']);
        foreach ($dates as $item) {
            $this->Model_receiving->insert($item);
        }
    }
}