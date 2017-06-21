<?php
require 'Datareader.php';
require_once './../config.php';


$datareader = new MongoLoader(URL);
header('Content-Type: application/json');

if(!(isset($_GET['von']) && isset($_GET['bis']))){
    echo json_encode($datareader->getAllDocuments());
};

if(isset($_GET['von']) && isset($_GET['bis'])){
    $von = stringToInteger($_GET['von']);
    $bis = stringToInteger($_GET['bis']);
    echo json_encode($datareader->getDocumentsIntervall($von,$bis));
};




function stringToInteger($string){
    if (preg_match('/^(\+|\-)?[0-9]+((e|E)[0-9]+)?$/', $string)) {
        $int = (int)$string;
        return  $int;
    }
}