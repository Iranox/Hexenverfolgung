<?php
require 'MongoDBLoader.php'; // include Composer's autoloader

$parser = new CSVParser();
$database = new MongoLoader();
$database->insertDocuments($parser->parse("/home/iranox/Hexenverfolgung/data/Hexendaten.csv"));

 ?>
