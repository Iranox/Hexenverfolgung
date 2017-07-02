<?php
require 'RestAPI.php';

class WitchTrial implements RestAPI {
    private $dataReader;
    const INTEGERREGEXPATTERN = '/^(\+|\-)?[0-9]+((e|E)[0-9]+)?$/';

    public function handle(){
        $this->dataReader = new MongoLoader(URL);
        header('Content-Type: application/json');
        if (isset($_GET['from']) && isset($_GET['until'])) {
            echo $this->getAllDocumentsBetweenInterval();
        }

        if (isset($_GET['all'])) {
            echo $this->getAllDocuments();
        }

        if(isset($_GET['allByGender'])){
            echo $this->getAllSortedByGender();
        }

        if(isset($_GET['allByDeathly'])){
            echo $this->getAllSortedByDeath();
        }

        if(isset($_GET['verdict'])){
            echo $this->getAllVerdict() ;
        }

        if (isset($_GET['location'])) {
            if($_GET['location'] === null){
                echo  $this->getAllLocation();
            } else {
                echo $this->getWitchByLocation($_GET['location']);
            }

        }
    }

    private function getAllLocation(){
        return json_encode($this->dataReader->getallLocation());
    }

    private function getAllVerdict(){
        return json_encode($this->dataReader->getAllVerdict());
    }

    private function getAllDocuments(){
        return json_encode($this->dataReader->getAllDocuments());
    }

    private function getWitchByLocation($ort){
        return json_encode($this->dataReader->getWitchByLocation($ort));
    }

    private function getAllDocumentsBetweenInterval(){
        $from = $this->stringToInteger($_GET['from']);
        $until = $this->stringToInteger($_GET['until']);
        return json_encode($this->dataReader->getDocumentsIntervall($from, $until));
    }

    private function stringToInteger($string){
        if (preg_match($this->INTEGERREGEXPATTERN, $string)) {
            $int = (int)$string;
            return $int;
        }
    }

    private function getAllSortedByDeath(){
        $answer = array("death" => $this->dataReader->getAllByDeathly("true"),
            "live" => $this->dataReader->getAllByDeathly("false"),
            "unknown" => $this->dataReader->getAllByDeathly("")
        );
        return json_encode($answer);
    }

    private function getAllSortedByGender(){
        $answer = array("female" => $this->dataReader->getAllByGender("true"),
            "male" => $this->dataReader->getAllByGender("false"),
            "unknown" => $this->dataReader->getAllByGender("")
        );
        return json_encode($answer);
    }
}