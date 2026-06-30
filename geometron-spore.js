document.addEventListener("DOMContentLoaded", () => {
  const geometronCanvas = document.getElementById("geometron-canvas"); 
  mainGVM = new GVM(); 
  mainGVM.hypercube = hypercube0; 
  mainGVM.canvas.width = 0.48 * innerWidth; 
  mainGVM.canvas.height = 0.97 * innerHeight;
  mainGVM.canvas.x0 = 0.5 * mainGVM.canvas.width; 
  mainGVM.canvas.y0 = 0.5 * mainGVM.canvas.height; 
  mainGVM.canvas.unit = 0.25 * mainGVM.canvas.width; 
  mainGVM.style.line0 = 5; 
  mainGVM.glyph = [0o332,0o332,0o1341,0o1333,0o1341,0o1207]; 
  drawGlyph(geometronCanvas, mainGVM);
});
