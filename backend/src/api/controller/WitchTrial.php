<?php
require 'RestAPI.php';

class WitchTrial implements RestAPI {
    private $dataReader;

    public function handle(){
        $this->dataReader = new MongoLoader(URL);
        header('Content-Type: application/json');
        if (isset($_GET['from']) && isset($_GET['until'])) {
            echo $this->getAllDocumentsBetweenInterval();
        }

        if (isset($_GET['all'])) {
            echo $this->getAllDocuments();
        }

        if(isset($_GET['verdict'])){
            echo $this->getAllVerdict() ;
        }

    }

    private function getAllVerdict(){
        return json_encode($this->dataReader->getAllVerdict());
    }

    private function getAllDocuments(){
        return json_encode($this->dataReader->getAllDocuments());
    }

    private function getAllDocumentsBetweenInterval(){
        $from = $this->stringToInteger($_GET['from']);
        $until = $this->stringToInteger($_GET['until']);
        return json_encode($this->dataReader->getDocumentsIntervall($from, $until));
    }

    private function stringToInteger($string){
        if (preg_match(RestAPI::INTEGERREGEXPATTERN, $string)) {
            $int = (int)$string;
            return $int;
        }
    }
}