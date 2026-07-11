<?php
$spore = "https://raw.githubusercontent.com/LafeLabs/geometron-spore/refs/heads/main/geometron-spore.php";
$baseurl = explode("geometron-spore.php",$spore)[0];

@copy($baseurl."geometron.html","geometron.html");
@copy($baseurl."geometron.css","geometron.css");
@copy($baseurl."geometron.js","geometron.js");
@copy($baseurl."hypercube.json","hypercube.json");
@copy($baseurl."sketch.js","sketch.js");
@copy($baseurl."geometron-glyph-feed.html","geometron-glyph-feed.html");

@copy($baseurl."index.html","index.html");
@copy($baseurl."README.md","README.md");
@copy($baseurl."editor.html","editor.html");
@copy($baseurl."load-file.php","load-file.php");
@copy($baseurl."save-file.php","save-file.php");
@copy($baseurl."list-files.php","list-files.php");

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