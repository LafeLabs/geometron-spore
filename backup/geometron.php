<?php
$spore = "https://raw.githubusercontent.com/LafeLabs/geometron-spore/refs/heads/main/geometron.php";
$baseurl = explode("geometron.php",$spore)[0];

@copy($baseurl."geometron.html","geometron.html");
@copy($baseurl."geometron.css","geometron.css");
@copy($baseurl."geometron.js","geometron.js");
@copy($baseurl."sketch.js","sketch.js");
@copy($baseurl."gvm.json","gvm.json");
@copy($baseurl."hypercube.json","hypercube.json");
@copy($baseurl."geometron.md","geometron.md");

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