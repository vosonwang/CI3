<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Receiving extends Controller
{
    public function index()
    {
        $this->load->view('templates/header');
        $this->load->view('templates/nav');
        $this->load->view('V_receiving');
        $this->load->view('templates/footer');
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

    function remove()
    {
        $this->load->model('M_receiving');
        $json = ($this->input->post(NULL, TRUE));
        $json = json_decode($json['json']);
        foreach ($json as $id) {
            $this->M_receiving->remove($id);
        }
    }

    function update(){
        $json=$this->input->post(null,true);
        $json=json_decode($json['json'],true);
        $this->load->model('M_receiving');
        $this->M_receiving->update($json);
    }
}