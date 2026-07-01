<?php
$spore = "https://raw.githubusercontent.com/LafeLabs/geometron-spore/refs/heads/main/geometron.php";
$baseurl = explode("geometron.php",$spore)[0];

@copy($baseurl."README.md","geometron.md");
@copy($baseurl."geometron.js","geometron.js");
@copy($baseurl."geometron.html","geometron.html");
@copy($baseurl."geometron.css","geometron.css");
@copy($baseurl."geometron.json","geometron-spore.json");
@copy($baseurl."geometron.py","geometron-spore.py");
@copy($baseurl."sketch.js","sketch.js");

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