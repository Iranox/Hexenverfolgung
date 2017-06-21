<?php

class CSVParser
{
    private function loadCSV($file)
    {
        if (($handle = fopen($file, 'r')) === false) {
            die('Error opening file');
        }

        $headers = fgetcsv($handle, 1024, ',');
        $complete = array();

        while ($row = fgetcsv($handle, 1024, ',')) {

            $tmp = $this->parseStringToInteger($row);
            $complete[] = array_combine($headers, $tmp);
        }

        fclose($handle);

        return $complete;
    }

    public function parse($file)
    {
        return $this->loadCSV($file);
    }

    /**
     * @param $row
     * @return mixed
     */
    private function parseStringToInteger($row)
    {
        $tmp = array();
        foreach ($row as $a) {
            if (!preg_match('/^(\+|\-)?[0-9]+((e|E)[0-9]+)?$/', $a)) {
                array_push($tmp, $a);
            } else {
                $int = (int)$a;
                array_push($tmp, $int);
            }

        }
        return $tmp;
    }
}



