
document.addEventListener("DOMContentLoaded", () => {
  geometronCanvas = document.getElementById("geometron-canvas");
  mainGVM = new GVM(); 
  mainGVM.hypercube = hypercube0; 
  mainGVM.canvas.width = 0.48 * innerWidth; 
  mainGVM.canvas.height = 0.97 * innerHeight;
  mainGVM.canvas.x0 = 0.5 * mainGVM.canvas.width; 
  mainGVM.canvas.y0 = 0.5 * mainGVM.canvas.height; 
  mainGVM.canvas.unit = 0.25 * mainGVM.canvas.width; 
  mainGVM.style.line0 = 5; 
  mainGVM.glyph = [0o341,0o207]; 
  drawGlyph(geometronCanvas, mainGVM);

});


brushstroke = [];
thispoint = {};
thispoint.x = 0;
thispoint.y = 0;

    
function setup() {
    createCanvas(0.48*innerWidth,0.97*innerHeight);  
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
//    frameRate(20); 
    stroke(0);
    strokeWeight(20);
}

inLine = false;
function draw(){
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
    
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
   
    }
    
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < width){
      if (mouseIsPressed === true) {
        if(inLine == false){
            var point = {};
            point.x = Math.round(1024*mouseX/width);
            point.y = Math.round(1024*mouseY/width);
            brushstroke.push(point);
        }
        line(mouseX, mouseY, pmouseX, pmouseY);
        inLine = true;
        if(mouseX != pmouseX || mouseY != pmouseY){
            var point = {};
            point.x = Math.round(1024*mouseX/width);
            point.y = Math.round(1024*mouseY/width);
            brushstroke.push(point);
        }
      }
      else{
          if(inLine){
              brushstroke = [];
          }
          inLine = false;
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
    let asciiValue = key.charCodeAt(0);
    let oldGlyph = mainGVM.glyph;
    mainGVM.glyph = [];
    for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
        if(oldGlyph[glyphIndex] != 0o207){
            mainGVM.glyph.push(oldGlyph[glyphIndex]);
        }
    }
    mainGVM.glyph.push(mainGVM.hypercube[asciiValue][0]);
    mainGVM.glyph.push(0o207);
    drawGlyph(geometronCanvas, mainGVM);
    console.log(asciiValue.toString(8));
}

function mouseClicked() {

    
}