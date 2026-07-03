brushstroke = [];
thispoint = {};
thispoint.x = 0;
thispoint.y = 0;
shapeTable = [];

audioOn = false;

    

function setup() {
    createCanvas(0.48*innerWidth,0.97*innerHeight);  
    if(audioOn){
        mic = new p5.AudioIn();
        mic.start();
        fft = new p5.FFT();
        fft.setInput(mic);
        
    }
//    frameRate(20); 
    stroke(0);
    strokeWeight(20);
    geometronCanvas = document.getElementById("geometron-canvas");
    geometronSpellCanvas = document.getElementById("geometron-spell-canvas");
    mainGVM = new GVM(); 
    mainGVM.hypercube = hypercube0; 
    mainGVM.canvas.width = 0.48 * innerWidth; 
    mainGVM.canvas.height = 0.97 * innerHeight;
    mainGVM.canvas.x0 = 0.5 * mainGVM.canvas.width; 
    mainGVM.canvas.y0 = 0.5 * mainGVM.canvas.height;
    mainGVM.canvas.unit = 0.25 * mainGVM.canvas.width; 
    mainGVM.style.line0 = 5; 
    mainGVM.glyph = [0o341,0o306,0o332,0o341,0o207]; 
//    drawGlyph(geometronCanvas, mainGVM);
    spellGVM = new GVM(); 
    spellGVM.hypercube = hypercube0; 
    spellGVM.canvas.width = 0.48 * innerWidth; 
    spellGVM.canvas.height = 0.97 * innerHeight;
    spellGVM.glyph = mainGVM.glyph; 
  //  spellGlyph(geometronSpellCanvas, spellGVM);
    geometronJSON = {};
    fetch('load-file.php?filename=geometron.json')
        .then(xhr => xhr.text())
        .then(rawJSON => {
            geometronJSON = JSON.parse(rawJSON);
            shapes = geometronJSON.shapeTable;
            symbols = geometronJSON.symbolTable;
            for(let index = 0;index < shapes.length;index++){
                mainGVM.hypercube[0o220 + index] = shapes[index];
                spellGVM.hypercube[0o220 + index] = shapes[index];
                mainGVM.hypercube[0o1220 + index] = symbols[index];
                spellGVM.hypercube[0o1220 + index] = symbols[index];
            }
            mainGVM.cursor = geometronJSON.cursor;
            mainGVM.canvas = geometronJSON.canvas;
            mainGVM.style = geometronJSON.canvas;

            mainGVM.glyph = mainGVM.hypercube[mainGVM.address];
            spellGVM.glyph = mainGVM.glyph;
            mainGVM.glyph =  mainGVM.glyph.filter(item => item !== 0o207);
            spellGVM.glyph =  spellGVM.glyph.filter(item => item !== 0o207);
            mainGVM.glyph.push(0o207);
            spellGVM.glyph.push(0o207);
            drawGlyph(geometronCanvas, mainGVM);
            spellGlyph(geometronSpellCanvas, spellGVM);
            ctx = document.getElementById("geometron-spell-canvas").getContext("2d");
            ctx.font = '16px Arial';
            ctx.fillText("0" + mainGVM.address.toString(8) + ":",10,20);
            

        });

}

inLine = false;
function draw(){

    if(audioOn){
        audio_spectrum = fft.analyze();
        nyquistFreq = sampleRate() / 2;
        spectrum_bin_frequency = nyquistFreq / (audio_spectrum.length);
        fill(255);
        noStroke();     
        rect(0, height - 100, width, height); 
        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();
        vertex(0,height);
        for (let index = 0; index < audio_spectrum.length; index++) {
            vertex(index, map(audio_spectrum[index], 0, 255, height, height - 100));
        }
        vertex(width,height);
        endShape(); 
        stroke(0);
        strokeWeight(30);        
    }

    
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
   
    }
    
    
}

function mouseWheel(event) {
    if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
        if(event.delta > 0){ 
        }
        else{
        }
    }
}

function keyPressed() {

    if ((keyIsDown(CONTROL) || keyIsDown(91)) && key === 's') {
        fileNameBase = "geometron-glyph-" + Math.floor(Date.now() / 1000);
        fileNameSVG = fileNameBase + ".svg";
        fileNameJSON = fileNameBase + ".json";
        mainGVM.glyph = mainGVM.glyph.filter(cursorCode => cursorCode !== 0o207);
        drawGlyph(geometronCanvas, mainGVM);
        mainGVM.svgString = mainGVM.svgString.split("<json>")[0] + "<json>" + JSON.stringify(geometronJSON,null,"  ") + "</json>" + mainGVM.svgString.split("</json>")[1];
        
        data = encodeURIComponent(mainGVM.svgString);
        fetch('save-file.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            body: 'data=' + data + '&filename=' + fileNameSVG
        });
        
        mainGVM.glyph.push(0o207);
        return false; 
    }
    let actionKey = null;
    if (key.length === 1) {
        actionKey = key.charCodeAt(0);
    } else {
        // Map special keys to unique integers below 32
        if (keyCode === BACKSPACE) actionKey = 0o10;  
        if (keyCode === ENTER)     actionKey = 0o12; 
        if (keyCode === LEFT_ARROW)  actionKey = 0o20;  
        if (keyCode === RIGHT_ARROW) actionKey = 0o21;  
        if (keyCode === UP_ARROW)    actionKey = 0o22;  
        if (keyCode === DOWN_ARROW)  actionKey = 0o23;  
    }
    
    if(actionKey >= 0o40 && actionKey < 0o177){
        if(mainGVM.hypercube[actionKey][0] < 0o40){
            rootMagic(mainGVM,mainGVM.hypercube[actionKey][0]);
        } else{
            let oldGlyph = mainGVM.glyph;
            mainGVM.glyph = [];
            for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
                if(oldGlyph[glyphIndex] != 0o207){
                    mainGVM.glyph.push(oldGlyph[glyphIndex]);
                } else{
                        mainGVM.glyph.push();
                        mainGVM.glyph.push(mainGVM.hypercube[actionKey][0]);
                        mainGVM.glyph.push(0o207);
                }
            }
        }
    }
    if (actionKey === 0o10) {
        //delete character before the cursor
        rootMagic(mainGVM,0o10);
    }
    if (actionKey === 0o12) {
        //ENTER key
        //mode switch from shape to font to word        
    }
    if (actionKey === 0o20) {
        //0o20 left arrow, cursor back
        rootMagic(mainGVM,0o20);
    }
    if (actionKey === 0o21) {
        //right arrow, cursor forward
        rootMagic(mainGVM,0o21);
    }
    if (actionKey === 0o22) {
        //up arrow, move up in hypercube
        rootMagic(mainGVM,0o22);
    }
    if (actionKey === 0o23) {
        //down arrow,move down in hypercube
        rootMagic(mainGVM,0o23);
    }
    
    drawGlyph(geometronCanvas, mainGVM);
    spellGVM.glyph = mainGVM.glyph; 
    spellGlyph(geometronSpellCanvas, spellGVM);
    
    ctx = document.getElementById("geometron-spell-canvas").getContext("2d");
    ctx.font = '16px Arial';
    ctx.fillText("0" + mainGVM.address.toString(8) + ":",10,25);
    
    //put current glyph into hypercube
    //put current glyph into either shape or symbols array
    mainGVM.hypercube[mainGVM.address] = mainGVM.glyph.filter(cursorCode => cursorCode !== 0o207);
    if(mainGVM.address < 0o1000){
        shapes[mainGVM.address - 0o220] = mainGVM.glyph.filter(cursorCode => cursorCode !== 0o207);
    } else{
        symbols[mainGVM.address - 0o220] = mainGVM.glyph.filter(cursorCode => cursorCode !== 0o207);
    }
    
    geometronJSON.canvas = mainGVM.canvas;
    geometronJSON.style = mainGVM.style;
    geometronJSON.cursor = mainGVM.cursor;
    fetch('save-file.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        body: 'data=' + JSON.stringify(geometronJSON,null,"    ") + '&filename=geometron.json'
    });
}


function mouseClicked() {

    
}