<?php
$spore = "https://raw.githubusercontent.com/LafeLabs/geometron-spore/refs/heads/main/geometron-spore.php";
$baseurl = explode("geometron-spore.php",$spore)[0];

@copy($baseurl."geometron.js","geometron.js");
@copy($baseurl."geometron-spore.html","geometron-spore.html");
@copy($baseurl."geometron-spore.css","geometron-spore.css");
@copy($baseurl."geometron-spore.js","geometron-spore.js");
@copy($baseurl."sketch.js","sketch.js");
@copy($baseurl."geometron-spore.php","geometron-spore.php");

?>
<a href = "index.html">index.html</a>
<style>
body{
    font-size:3em;
    font-family:arial;
}
a{
    font-size:3em;
    color:blue;
}
</style>