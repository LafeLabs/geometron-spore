<?php
    $from = $_POST["from"]; //get data 
    $to = $_POST["to"];//get filename
    rename($from,$to);
?>