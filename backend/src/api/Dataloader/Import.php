<?php
require 'MongoDBLoader.php';
require_once './../config.php';

$parser = new CSVParser();
$database = new MongoLoader();
//$parser->parse(CSV);
$database->insertDocuments($parser->parse(CSV), URL);

