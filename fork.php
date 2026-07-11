<?php

$fork = isset($_GET["fork"]) ? $_GET["fork"] : "fork";

if (!is_dir($fork)) {
    mkdir($fork);
}

$files = json_decode(file_get_contents('spore.json'), true);

foreach ($files as $file) {
    copy($file, $fork . "/" . $file);
}

?>
<a href="<?php echo $fork?>/index.html"><?php echo $fork?>/index.html</a>
<style>
body {
    font-size: 3em;
    font-family: arial;
}
a {
    font-size: 3em;
    color: blue;
}
</style>
