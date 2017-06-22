<?php
require './../model/Datareader.php';
require './CSVParser.php';
require_once './../config.php';

$parser = new CSVParser();
$database = new MongoLoader(URL);
$database->insertDocuments($parser->parse(CSV));

