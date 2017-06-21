<?php
require 'Datareader.php';
require_once './../config.php';

$datareader = new MongoLoader(URL);
header('Content-Type: application/json');
echo json_encode($datareader->getAllVerdict());
