brushstroke = [];
thispoint = {};
thispoint.x = 0;
thispoint.y = 0;
shapeTable = [];

audioOn = true;

feedDisplay = false;

shapeTableIndex = 9;  //multiply by 16 to get base hypercube address for shape table
//gvm.address = 16*shapeTableIndex + localIndex for bottom row
//gvm.address = 16*shapeTableIndex + 8 + localIndex for top row

function setup() {
    createCanvas(innerWidth,innerHeight);  

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
    mainGVM.canvas.height = mainGVM.canvas.width;
    mainGVM.canvas.x0 = 0.5 * mainGVM.canvas.width; 
    mainGVM.canvas.y0 = 0.5 * mainGVM.canvas.height;
    mainGVM.canvas.unit = 0.25 * mainGVM.canvas.width; 
    mainGVM.style.line0 = 5; 
    spellGVM = new GVM(); 
    spellGVM.hypercube = hypercube0; 
    spellGVM.canvas.width = 0.48 * innerWidth; 
    spellGVM.canvas.height = 0.97 * innerHeight;
    spellGVM.glyph = mainGVM.glyph; 
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
//            mainGVM.canvas = geometronJSON.canvas;
//            mainGVM.style = geometronJSON.style;

            mainGVM.glyph = mainGVM.hypercube[mainGVM.address];
            spellGVM.glyph = mainGVM.glyph;
            mainGVM.glyph =  mainGVM.glyph.filter(item => item !== 0o207);
            spellGVM.glyph =  spellGVM.glyph.filter(item => item !== 0o207);
            mainGVM.glyph.push(0o207);
            spellGVM.glyph.push(0o207);
            drawGlyph(geometronCanvas, mainGVM);
            spellGlyph(geometronSpellCanvas, spellGVM);

            setText();
  
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
        rect(0, 0, width, height); 
        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();
        vertex(0,height);
        for (let index = 0; index < audio_spectrum.length; index++) {
            vertex(index, map(audio_spectrum[index], 0, 255, height, 0));
        }
        vertex(width,height);
        endShape(); 
        stroke(0);
        strokeWeight(30);        
    }
   
    let cellSize = 0.5*innerWidth/8;
    
    if(mouseX > 0 && mouseX < 0.5*width && mouseY > height - 2*cellSize && mouseY < height){
       if(mouseX != pmouseX || mouseY != pmouseY){
            for(let index = 0;index < 8; index++){
                strokeWeight(5);
                rect(index*cellSize,height-cellSize,cellSize,cellSize);
                rect(index*cellSize,height-2*cellSize,cellSize,cellSize);
                strokeWeight(0);
                textSize(20);
                fill(0);
                text( "0" +(16*shapeTableIndex + index).toString(8),index*cellSize + 10,height-cellSize + 0.5*cellSize);
                text( "0" +(16*shapeTableIndex + 8 + index).toString(8),index*cellSize + 10,height - 2*cellSize + 0.5*cellSize);                
                noFill();
            }
            fill("#00000080");
            rect(cellSize*Math.floor(mouseX/cellSize),height - cellSize - cellSize*Math.floor((height-mouseY)/cellSize),cellSize,cellSize);
        }
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
        document.getElementById("geometron-canvas").style.display="none";
        document.getElementById("geometron-glyph-scroll").innerHTML = "";
        //put all the existing images in here with delete key
        
        fileNameBase = "geometron-glyph-" + Math.floor(Date.now() / 1000);
        fileNameSVG = fileNameBase + ".svg";
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
        //add new image to top of feed with delete key as well but it's its own thing
        document.querySelector('#geometron-glyph-scroll').insertAdjacentHTML('afterbegin', mainGVM.svgString);
        return false; 
    }
    if (key === 'Escape') {
        console.log("Escape key was pressed!");
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
    
    drawGlyph(geometronCanvas, mainGVM);
    spellGlyph(geometronSpellCanvas, spellGVM);

    setText();
 
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

function setText(){
    ctx = document.getElementById("geometron-spell-canvas").getContext("2d");
    ctx.font = '40px Arial';
    let spellStatusX = 10;
    let spellStatusY = 38;
    
    switch (mainGVM.address){
        case 0o220:
            ctx.fillText("Q:",spellStatusX,spellStatusY);
            break;
        case 0o221:
            ctx.fillText("W:",spellStatusX,spellStatusY);
            break;
        case 0o222:
            ctx.fillText("E:",spellStatusX,spellStatusY);
            break;
        case 0o223:
            ctx.fillText("R:",spellStatusX,spellStatusY);
            break;
        case 0o224:
            ctx.fillText("T:",spellStatusX,spellStatusY);
            break;
        case 0o225:
            ctx.fillText("Y:",spellStatusX,spellStatusY);
            break;
        case 0o226:
            ctx.fillText("U:",spellStatusX,spellStatusY);
            break;
        case 0o227:
            ctx.fillText("I:",spellStatusX,spellStatusY);
            break;
        case 0o230:
            ctx.fillText("A:",spellStatusX,spellStatusY);
            break;
        case 0o231:
            ctx.fillText("S:",spellStatusX,spellStatusY);
            break;
        case 0o232:
            ctx.fillText("D:",spellStatusX,spellStatusY);
            break;
        case 0o233:
            ctx.fillText("F:",spellStatusX,spellStatusY);
            break;
        case 0o234:
            ctx.fillText("G:",spellStatusX,spellStatusY);
            break;
        case 0o235:
            ctx.fillText("H:",spellStatusX,spellStatusY);
            break;
        case 0o236:
            ctx.fillText("J:",spellStatusX,spellStatusY);
            break;
        case 0o237:
            ctx.fillText("K:",spellStatusX,spellStatusY);
            break;
    
    }       
}
