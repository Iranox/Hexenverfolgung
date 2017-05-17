<?php
class ImportCSV {
  private function loadCSV($file){
    $csv = array_map('str_getcsv', file($file));
    array_walk($csv, function(&$a) use ($csv) {
      $a = array_combine($csv[0], $a);
   });
   array_shift($csv); # remove column header
   return $csv;
  }

  private function parseToJSON(){
    echo "not implement";
  }

  public function loadToMongoDB($file){
    return $this->loadCSV($file);

  }
}
 ?>
