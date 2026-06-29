class GVM {       //Geometron Virtual Machine
  constructor() {
    this.action = 0o177;
    this.hypercube = [];
    for(let index = 0; index < 1024; index++){
        this.hypercube.push([0o177]);
    }
    this.glyph = [];
    this.svgString = "";
    this.word = "";
    this.cursorStack = [];
    this.canvas = {
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
    gvm.svgString = "<svg width=\"" + gvm.canvas.width.toString() + "\" height=\"" + gvm.canvas.height.toString() + "\" viewbox = \"0 0 " + gvm.canvas.width.toString() + " " + gvm.canvas.height.toString() + "\"  xmlns=\"http://www.w3.org/2000/svg\">\n";
    ctx = canvas.getContext("2d");
    canvas.width = gvm.canvas.width;
    canvas.height = gvm.canvas.height;

    ctx.clearRect(0, 0, gvm.canvas.width, gvm.canvas.height);
    ctx.fillStyle = gvm.style.fill0 || "black";
    ctx.strokeStyle = gvm.style.color0 || "black";
    ctx.lineWidth = gvm.style.line0 || 2;     
    
    // Draw glyph actions using explicit index loop
    for(let index = 0; index < gvm.glyph.length; index++){
        geometronAction(ctx, gvm,gvm.glyph[index]);
    }
    
    gvm.svgString += "</svg>";    
}


function geometronAction(ctx, gvm,action){
    let x2, y2, localString, localInt, pathX2, pathY2; 
    if(action >= 0o200 && action <= 0o277){
        for(let index = 0;index < gvm.hypercube[action].length;index++){
            geometronAction(ctx, gvm,gvm.hypercube[action][index]);
        }
    }
    switch (action) {
        case 0o300:
            gvm.cursor.x = gvm.canvas.x0;
            gvm.cursor.y = gvm.canvas.y0;
            gvm.cursor.r = gvm.canvas.unit;
            gvm.cursor.thetaStep = Math.PI/2;
            gvm.cursor.theta = gvm.canvas.theta0;
            gvm.cursor.scaleFactor = 2;      
            gvm.word = "";
            ctx.strokeStyle = gvm.style.color0;
            ctx.fillStyle = gvm.style.fill0;
            ctx.lineWidth = gvm.style.line0;                
            
            break;
        case 0o304:
            gvm.cursor.thetaStep = Math.PI/2;
            break;
        case 0o305:
            gvm.cursor.thetaStep = 2*Math.PI/5;
            break;
        case 0o306:
            gvm.cursor.thetaStep = 2*Math.PI/3;
            break;
        case 0o310:
            gvm.cursor.scaleFactor = Math.sqrt(2);
            break;
        case 0o311:
            gvm.cursor.scaleFactor = (Math.sqrt(5) + 1)/2;
            break;
        case 0o312:
            gvm.cursor.scaleFactor = Math.sqrt(3);
            break;
        case 0o313:
            gvm.cursor.scaleFactor = 2;
            break;
        case 0o314:
            gvm.cursor.scaleFactor = 3;
            break;
        case 0o315:
            gvm.cursor.scaleFactor = 1.1755705;
            break;
        case 0o316:
            gvm.cursor.scaleFactor = 5;
            break;
        case 0o320:
            ctx.strokeStyle = gvm.style.color0;
            ctx.fillStyle = gvm.style.fill0;
            ctx.lineWidth = gvm.style.line0;    
            break;
        case 0o321:
            ctx.strokeStyle = gvm.style.color1;
            ctx.fillStyle = gvm.style.fill1;
            ctx.lineWidth = gvm.style.line1;    
            break;
        case 0o322:
            ctx.strokeStyle = gvm.style.color2;
            ctx.fillStyle = gvm.style.fill2;
            ctx.lineWidth = gvm.style.line2;    
            break;
        case 0o323:
            ctx.strokeStyle = gvm.style.color3;
            ctx.fillStyle = gvm.style.fill3;
            ctx.lineWidth = gvm.style.line3;    
            break;
        case 0o324:
            ctx.strokeStyle = gvm.style.color4;
            ctx.fillStyle = gvm.style.fill4;
            ctx.lineWidth = gvm.style.line4;    
            break;
        case 0o325:
            ctx.strokeStyle = gvm.style.color5;
            ctx.fillStyle = gvm.style.fill5;
            ctx.lineWidth = gvm.style.line5;    
            break;
        case 0o326:
            ctx.strokeStyle = gvm.style.color6;
            ctx.fillStyle = gvm.style.fill6;
            ctx.lineWidth = gvm.style.line6;    
            break;
        case 0o327:
            ctx.strokeStyle = gvm.style.color7;
            ctx.fillStyle = gvm.style.fill7;
            ctx.lineWidth = gvm.style.line7;    
            break;
        case 0o330:
            gvm.cursor.x += gvm.cursor.r*Math.cos(gvm.cursor.theta);
            gvm.cursor.y += gvm.cursor.r*Math.sin(gvm.cursor.theta);    
            break;
        case 0o331:
            gvm.cursor.x -= gvm.cursor.r*Math.cos(gvm.cursor.theta);
            gvm.cursor.y -= gvm.cursor.r*Math.sin(gvm.cursor.theta);    
            break;
        case 0o332:
            gvm.cursor.x -= gvm.cursor.r*Math.cos(gvm.cursor.theta - gvm.cursor.thetaStep);
            gvm.cursor.y -= gvm.cursor.r*Math.sin(gvm.cursor.theta - gvm.cursor.thetaStep);    
            break;
        case 0o333:
            gvm.cursor.x -= gvm.cursor.r*Math.cos(gvm.cursor.theta + gvm.cursor.thetaStep);
            gvm.cursor.y -= gvm.cursor.r*Math.sin(gvm.cursor.theta + gvm.cursor.thetaStep);    
            break;
        case 0o334:
            gvm.cursor.theta -= gvm.cursor.thetaStep; // CCW
            break;
        case 0o335:
            gvm.cursor.theta += gvm.cursor.thetaStep; // CCW
            break;
        case 0o336:
            gvm.cursor.r /= gvm.cursor.scaleFactor; // -
            break;           
        case 0o337:
            gvm.cursor.r *= gvm.cursor.scaleFactor; // +
            break;
        case 0o340:
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
        case 0o341:
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();   
            gvm.svgString += "<circle cx=\"";
            gvm.svgString += Math.round(gvm.cursor.x).toString();
            gvm.svgString += "\" cy = \"";
            gvm.svgString += Math.round(gvm.cursor.y).toString();
            gvm.svgString += "\" r = \"" + gvm.cursor.r.toString() + "\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" ";
            gvm.svgString += "fill = \"none\" />\n";		
            break;
        case 0o342:
            ctx.beginPath();
            ctx.moveTo(gvm.cursor.x,gvm.cursor.y);
            ctx.lineTo(gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta),gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta));
            ctx.stroke();		
            ctx.closePath();    
            x2 = Math.round(gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta));
            y2 = Math.round(gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta));
            gvm.svgString += "    <line x1=\""+Math.round(gvm.cursor.x).toString()+"\" y1=\""+Math.round(gvm.cursor.y).toString()+"\" x2=\"" + x2.toString()+"\" y2=\"" + y2.toString()+"\" style=\"stroke:" + ctx.strokeStyle + ";stroke-width:" + (ctx.lineWidth).toString() + "\" />\n";
            break;
        case 0o343:
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, gvm.cursor.theta - gvm.cursor.thetaStep,gvm.cursor.theta + gvm.cursor.thetaStep);
            ctx.stroke();
            ctx.closePath();
            localString = "";
            localString += "  <path d=\"";	
            localString += "M";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            localString += " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            gvm.svgString += localString;
            localString = "           A" + gvm.cursor.r.toString() + " " + gvm.cursor.r.toString() + " 0 0 1 ";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString() + " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString() + "\" fill = \"none\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" />\n";
            gvm.svgString += localString;
            break;
        case 0o344:
            // Line segment as part of path
            ctx.lineTo(gvm.cursor.x + gvm.cursor.r * Math.cos(gvm.cursor.theta), gvm.cursor.y + gvm.cursor.r * Math.sin(gvm.cursor.theta));
            ctx.stroke();		
            
            // Fixed: Changed from let x2/y2 to unique names pathX2/pathY2
            pathX2 = Math.round(gvm.cursor.x + gvm.cursor.r * Math.cos(gvm.cursor.theta));
            pathY2 = Math.round(gvm.cursor.y + gvm.cursor.r * Math.sin(gvm.cursor.theta));
            
            gvm.svgString += "L" + pathX2 + " " + pathY2 + " ";            
            break;

        case 0o345:
            //arc as part of path, to the right (CW)
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, gvm.cursor.theta - gvm.cursor.thetaStep,gvm.cursor.theta + gvm.cursor.thetaStep);
            ctx.stroke();
            localString = "";
            localString += "M";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            localString += " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            gvm.svgString += localString;
            localString = "           A" + gvm.cursor.r.toString() + " " + gvm.cursor.r.toString() + " 0 0 1 ";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString() + " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString();
            gvm.svgString += localString;            
            break;
        case 0o346:
            //arc, reverse direction (CCW)
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, gvm.cursor.theta + gvm.cursor.thetaStep,gvm.cursor.theta - gvm.cursor.thetaStep,true);
            ctx.stroke();   
            localString = "";
            localString += "M";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            localString += " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            gvm.svgString += localString;
            localString = "           A" + gvm.cursor.r.toString() + " " + gvm.cursor.r.toString() + " 0 0 1 ";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString() + " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString();
            gvm.svgString += localString;
            break;
        case 0o347:
            //filled circle
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            gvm.svgString += "    <circle cx=\"";
            gvm.svgString += Math.round(gvm.cursor.x).toString();
            gvm.svgString += "\" cy = \"";
            gvm.svgString += Math.round(gvm.cursor.y).toString();
            gvm.svgString += "\" r = \"" + gvm.cursor.r.toString() + "\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" ";
            gvm.svgString += "fill = \"" + ctx.fillStyle + "\" />\n";
            break;
        case 0o350:
            gvm.cursor.thetaStep /= 2;  //angle/2
            break;
        case 0o351:
            gvm.cursor.thetaStep *= 2;  //angle/2
            break;
        case 0o352:
            gvm.cursor.thetaStep /= 3;  //angle/2
            break;
        case 0o353:
            gvm.cursor.thetaStep *= 3;  //angle/2
            break;
        case 0o354:
            //end a closed but not filled path
            ctx.closePath();
            ctx.stroke();		
            gvm.svgString += "Z\""+ " stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" fill = \"" + "none" + "\" "+"/>";
            break;

        case 0o360:
            //first part of bezier in middle of a path
            ctx.moveTo(Math.round(gvm.cursor.x),Math.round(gvm.cursor.y));
            gvm.cpx1 = Math.round(gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta));
            gvm.cpy1 = Math.round(gvm.cursor.y + gvm.cursor.r*Math.sin(this.theta));
            gvm.svgString += " M";
            gvm.svgString += (Math.round(gvm.cursor.x)).toString() + ",";
            gvm.svgString += (Math.round(gvm.cursor.y)).toString() + " C";
            gvm.svgString += gvm.cpx1.toString() + "," + gvm.cpy1.toString() + " ";
            break;


        case 0o370:
            gvm.cursorStack.push({...gvm.cursor});
            break;
        case 0o371:
            gvm.cursor = gvm.cursorStack.pop();
            break;
            
    }
}

