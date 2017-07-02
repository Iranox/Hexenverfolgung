<?php
require "../../vendor/autoload.php";

class MongoLoader
{
    function __construct($uri){
        $this->uri = $uri;
        $this->collection = (new MongoDB\Client($this->uri))->hexenverfolgung->verfolgung;
    }

    public function insertDocuments($data){
        for ($i = 0; $i < count($data); $i++) {
            $this->collection->insertMany([$data[$i]]);
        }
    }

    public function insertLocations($data){
        foreach ($data as $row){
               $this->collection->updateMany(["Ort"=>$row["Ort"]],
                                           ['$set' =>["Coordinaten" =>
                                              ["lat"=>$row["Breitengrad"], "lon"=>$row["Längengrad"]]
                                           ]]);
        }

    }

    public function getAllDocuments(){
        $reponse = $this->collection->find();
        $result = $this->resultToArray($reponse);
        return $result;
    }

    public function getallLocation(){
        $reponse = $this->collection->aggregate([
            ['$group' => ["_id"=>'$Ort','quantity' => ['$sum' => 1],'lat'=>['$first' =>'$Coordinaten.lat' ],
                         'lon'=>['$first' =>'$Coordinaten.lon' ]]]
        ]);
        $result = $this->resultToArray($reponse);
        return $result;
    }

    public function getWitchByLocation($ort){
        $reponse = $this->collection->aggregate([
            ['$match' =>
                ['Ort' => $ort]
            ]
        ]);
        $result = $this->resultToArray($reponse);
        return $result;
    }

    public function getDocumentsIntervall($von,$bis){
        $reponse = $this->collection->aggregate([
            ['$match' =>
                ['Jahr' => ['$gte' => $von, '$lte' => $bis]]
            ]
        ]);
        $result = $this->resultToArray($reponse);
        return $result;
    }

    public function getAllVerdict(){
        $reponse = $this->collection->aggregate([
            ['$project' =>
                ['Urteilsspruch' => 1, 'Gestorben'=>1]
            ]
        ]);
        $result = $this->resultToArray($reponse);

        return $result;
    }

    public function getAllByDeathly($death){
        $reponse = $this->collection->aggregate([
            ['$match' =>
                ['Gestorben' => $death]
            ]
        ]);
        $result = $this->resultToArray($reponse);

        return $result;
    }

    public function getAllByGender($gender){
        $reponse = $this->collection->aggregate([
            ['$match' =>
                ['weiblich' => $gender]
            ]
        ]);
        $result = $this->resultToArray($reponse);

        return $result;
    }

    function __destruct(){
        unset($this->uri);
        unset($this->collection);
    }

    /**
     * @param $reponse
     * @return array
     */
    private function resultToArray($reponse){
        $result = array();
        foreach ($reponse as $entry) {
            array_push($result, $entry);
        }
        return $result;
    }
}
