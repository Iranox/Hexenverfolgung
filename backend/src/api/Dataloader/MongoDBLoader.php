<?php
require "../../vendor/autoload.php"; // include Composer's autoloader

class CSVParser{
    private function loadCSV($file)
    {
        if (($handle = fopen($file,'r')) === false) {
            die('Error opening file');
        }

        $headers = fgetcsv($handle, 1024, ',');
        $complete = array();

        while ($row = fgetcsv($handle, 1024, ',')) {
            $tmp = array();
            foreach ($row as $a){
                if (!preg_match('/^(\+|\-)?[0-9]+((e|E)[0-9]+)?$/', $a)) {
                     array_push($tmp,$a);

                } else {
                    $int = (int) $a;
                    array_push($tmp,$int);
                }

            }
            $complete[] = array_combine($headers, $tmp);
        }

        fclose($handle);

        return $complete;
    }

    public function parse($file)
    {
         return $this->loadCSV($file);
    }
}

class MongoLoader{
    public function insertDocuments($data,$uri)
    {
        $client = new MongoDB\Client($uri);
        $collection = $client->hexenverfolgung->verfolgung;

        for ($i = 0; $i < count($data); $i++) {
             $collection->insertMany([$data[$i]]);
        }
    }
}


?>
