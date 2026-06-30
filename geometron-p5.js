let mic, fft;

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
    frameRate(20); 
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
    if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
        //p5jsData.keystroke = key;
    }
}

function mouseClicked() {

    
}