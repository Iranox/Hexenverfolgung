<?php
require '../vendor/autoload.php'; // include Composer's autoloader

class CSVParser{
    private function loadCSV($file)
    {
        $csv = array_map('str_getcsv', file($file));
        array_walk($csv, function (&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); # remove column header
        return $csv;
    }

    public function parse($file)
    {
        return $this->loadCSV($file);
    }
}

class MongoLoader{
    public function insertDocuments($data)
    {
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->hexenverfolgung->verfolgung;

        for ($i = 0; $i < count($data); $i++) {
             $collection->insertMany([$data[$i]]);
        }
    }
}


?>
