class GVM {
  constructor() {
    this.action = 0177;
    this.hypercube = [];
    for(let index = 0; index < 1024; index++){
        this.hypercube.push(0177);
    }
    this.glyph = [];
    this.svgString = "";
    this.layout = {
        "width": 200,
        "height": 200,
        "unit": 100,
        "x0": 100,
        "y0": 100,
        "theta0": -Math.PI/2
    };
    this.cursor = {
        "x": 100,
        "y": 100,
        "r": 100,
        "theta": -Math.PI/2,
        "thetaStep": Math.PI/2,
        "scaleFactor": 2
    };
    this.style = {
        "color0": "black",
        "color1": "black",
        "color2": "red",
        "color3": "orange",
        "color4": "yellow",
        "color5": "green",
        "color6": "blue",
        "color7": "purple",
        "fill0": "black",
        "fill1": "black",
        "fill2": "red",
        "fill3": "orange",
        "fill4": "yellow",
        "fill5": "green",
        "fill6": "blue",
        "fill7": "purple",
        "line0": 2,
        "line1": 6,
        "line2": 2,
        "line3": 2,
        "line4": 2,
        "line5": 2,
        "line6": 2,
        "line7": 2
    };
  }
}

function drawGlyph(canvas, gvm){
    gvm.svgString = "<svg width=\"" + gvm.layout.width.toString() + "\" height=\"" + gvm.layout.height.toString() + "\" viewbox = \"0 0 " + gvm.layout.width.toString() + " " + gvm.layout.height.toString() + "\"  xmlns=\"http://www.w3.org/2000/svg\">\n";
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, gvm.layout.width, gvm.layout.height);
    ctx.fillStyle = gvm.style.fill0 || "black";
    ctx.strokeStyle = gvm.style.color0 || "black";
    ctx.lineWidth = gvm.style.line0 || 2;     
    
    // Draw glyph actions using explicit index loop
    for(let index = 0; index < gvm.glyph.length; index++){
        gvm.action = gvm.glyph[index];
        geometronAction(ctx, gvm);
    }
    
    this.svgString += "</svg>";    
}


function geometronAction(ctx, gvm){
    switch (gvm.action) {
        case 0300:
            gvm.cursor.x = gvm.layout.x0;
            gvm.cursor.y = gvm.layout.y0;
            gvm.cursor.r = gvm.layout.unit;
            break;
        case 0304:
            gvm.cursor.thetaStep = Math.PI/2;
            break;
        case 0305:
            gvm.cursor.thetaStep = 2*Math.PI/5;
            break;
        case 0306:
            gvm.cursor.thetaStep = 2*Math.PI/3;
            break;
        case 0310:
            gvm.cursor.scaleFactor = Math.sqrt(2);
            break;
        case 0311:
            gvm.cursor.scaleFactor = (Math.sqrt(5) + 1)/2;
            break;
        case 0312:
            gvm.cursor.scaleFactor = Math.sqrt(3);
            break;
        case 0313:
            gvm.cursor.scaleFactor = 2;
            break;
        case 0314:
            gvm.cursor.scaleFactor = 3;
            break;
        case 0315:
            gvm.cursor.scaleFactor = 1.1755705;
            break;
        case 0316:
            gvm.cursor.scaleFactor = 5;
            break;
        case 0320:
            ctx.strokeStyle = gvm.style.color0;
            ctx.fillStyle = gvm.style.fill0;
            ctx.lineWidth = gvm.style.line0;    
            break;
        case 0321:
            ctx.strokeStyle = gvm.style.color1;
            ctx.fillStyle = gvm.style.fill1;
            ctx.lineWidth = gvm.style.line1;    
            break;
        case 0322:
            ctx.strokeStyle = gvm.style.color2;
            ctx.fillStyle = gvm.style.fill2;
            ctx.lineWidth = gvm.style.line2;    
            break;
        case 0323:
            ctx.strokeStyle = gvm.style.color3;
            ctx.fillStyle = gvm.style.fill3;
            ctx.lineWidth = gvm.style.line3;    
            break;
        case 0324:
            ctx.strokeStyle = gvm.style.color4;
            ctx.fillStyle = gvm.style.fill4;
            ctx.lineWidth = gvm.style.line4;    
            break;
        case 0325:
            ctx.strokeStyle = gvm.style.color5;
            ctx.fillStyle = gvm.style.fill5;
            ctx.lineWidth = gvm.style.line5;    
            break;
        case 0326:
            ctx.strokeStyle = gvm.style.color6;
            ctx.fillStyle = gvm.style.fill6;
            ctx.lineWidth = gvm.style.line6;    
            break;
        case 0327:
            ctx.strokeStyle = gvm.style.color7;
            ctx.fillStyle = gvm.style.fill7;
            ctx.lineWidth = gvm.style.line7;    
            break;
        case 0330:
            gvm.cursor.x += gvm.cursor.r*Math.cos(gvm.cursor.theta);
            gvm.cursor.y += gvm.cursor.r*Math.sin(gvm.cursor.theta);    
            break;
        case 0331:
            gvm.cursor.x -= gvm.cursor.r*Math.cos(gvm.cursor.theta);
            gvm.cursor.y -= gvm.cursor.r*Math.sin(gvm.cursor.theta);    
            break;
        case 0332:
            gvm.cursor.x -= gvm.cursor.r*Math.cos(gvm.cursor.theta - gvm.cursor.thetaStep);
            gvm.cursor.y -= gvm.cursor.r*Math.sin(gvm.cursor.theta - gvm.cursor.thetaStep);    
            break;
        case 0333:
            gvm.cursor.x -= gvm.cursor.r*Math.cos(gvm.cursor.theta + gvm.cursor.thetaStep);
            gvm.cursor.y -= gvm.cursor.r*Math.sin(gvm.cursor.theta + gvm.cursor.thetaStep);    
            break;
        case 0334:
            gvm.cursor.theta -= gvm.cursor.thetaStep; // CCW
            break;
        case 0335:
            gvm.cursor.theta += gvm.cursor.thetaStep; // CCW
            break;
        case 0336:
            gvm.cursor.side /= gvm.cursor.scaleFactor; // -
            break;           
        case 0337:
            gvm.cursor.side *= gvm.cursor.scaleFactor; // +
            break;
        case 0340:
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, ctx.lineWidth, 0, 2 * Math.PI);
            ctx.fill();	
            ctx.closePath();
            gvm.svgString += "<circle cx=\"";
            gvm.svgString += Math.round(gvm.cursor.x).toString();
            gvm.svgString += "\" cy = \"";
            gvm.svgString += Math.round(gvm.cursor.y).toString();
            gvm.svgString += "\" r = \"" + ctx.lineWidth.toString() + "\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" ";
            gvm.svgString += "fill = \"" + ctx.strokeStyle + "\" />\n";	    
            break;
            
            
            
    }
}

