<?php

if(isset($_GET["fork"])){
    $fork = $_GET["fork"];
}
else{
    $fork = "cold-switch-network";
}

mkdir($fork);

@copy("geometron.html",$fork."/geometron.html");
@copy("geometron.css",$fork."/geometron.css");
@copy("geometron.js",$fork."/geometron.js");
@copy("hypercube.json",$fork."/hypercube.json");
@copy("sketch.js",$fork."/sketch.js");
@copy("geometron-glyph-feed.html",$fork."/geometron-glyph-feed.html");

@copy("index.html",$fork."/index.html");
@copy("editor.html",$fork."/editor.html");
@copy("save-file.php",$fork."/save-file.php");
@copy("save-file-get.php",$fork."/save-file-get.php");
@copy("load-file.php",$fork."/load-file.php");
@copy("list-files.php",$fork."/list-files.php");
@copy("list-directories.php",$fork."/list-directories.php");
@copy("README.md",$fork."/README.md");
@copy("fork.php",$fork."/fork.php");
@copy("wall.txt",$fork."/wall.txt");

?>
<a href = "<?php echo $fork?>/index.html"><?php echo $fork?>/index.html</a>
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