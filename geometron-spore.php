<?php
$spore = "https://raw.githubusercontent.com/LafeLabs/geometron-spore/refs/heads/main/geometron-spore.php";
$baseurl = explode("geometron-spore.php",$spore)[0];

@copy($baseurl."geometron.html","geometron.html");
@copy($baseurl."geometron.css","geometron.css");
@copy($baseurl."geometron.js","geometron.js");
@copy($baseurl."hypercube.json","hypercube.json");
@copy($baseurl."sketch.js","sketch.js");


?>
<a href = "geometron.html">geometron.html</a>
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