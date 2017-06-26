<?php
require './../model/Datareader.php';
require_once './../config.php';

interface RestAPI{
    const INTEGERREGEXPATTERN = '/^(\+|\-)?[0-9]+((e|E)[0-9]+)?$/';
    public function handle();

}