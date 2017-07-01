<?php
require './../model/Datareader.php';
require_once './../config.php';

interface RestAPI{
    public function handle();

}