//TO-DO:
// - WRITE ROTATE/TRANSLATE/ETC FOR LINE
// - FINISH POLYGON CLASS
// - ADDING OBJECTS TO SCENE AFTER ATTACHING TO CAMERA DOES NOT SHOW UP
//      - NEED TO REATTACH?
// - LOCAL VS GLOBAL TRANSFORMATIONS
// - ANNOYING PITCH/YAW/ROLL ISSUE AGAIN
//      - QUATERNIONS?
// - A LOT OF DUMB REPETITIVE CODE CAN BE MASSIVELY IMPROVED

window.onload = ()=>{
    
    const canvasElement = document.getElementById("mainCanvas");
    const CANVAS_WIDTH = 1280;
    const CANVAS_HEIGHT = 720;
    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;
    const canvasContext = canvasElement.getContext("2d");
    
    var x=3;
    const translationSpeed = 10;
    var p1 = new Point(50,0,0);
    // var p2 = new Point(150,0,150);
    var p3 = new Point(0,0,0);
    var p4 = new Point(200,0,0);
    var p5 = new Point(0,0,0);
    var p6 = new Point(0,-200,0);
    var p7 = new Point(0,0,0);
    var p8 = new Point(0,0,200);
    var l1 = new Line(p3,p4);
    var l2 = new Line(p5,p6);
    var l3 = new Line(p7,p8);
    var s1 = new Scene(l1, l2, l3, p1);
    var c1 = new Camera(-CANVAS_WIDTH/2, CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, CANVAS_HEIGHT/2, -500, 500, s1, canvasContext);
    //s1.add(l1);
    document.addEventListener("keydown", e=>{
        console.log(1);
        e.key = e.key.toLowerCase();
        if(e.key=="ArrowUp"){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "x", x);
                console.log(s1.objectList[item].coords);
            }
            // p1.coords = rotate(p1, "z", x);
            // l1.coords = rotate(l1, "y", x);
        } else if(e.key=="ArrowDown"){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "x", -x);
                console.log(s1.objectList[item].coords);
            }
            // p1.coords = rotate(p1, "z", x);
            // l1.coords = rotate(l1, "y", x);
        } else if(e.key=="ArrowLeft"){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "y", -x);
                console.log(s1.objectList[item].coords);
            }
            // p1.coords = rotate(p1, "z", x);
            // l1.coords = rotate(l1, "y", x);
        } else if(e.key=="ArrowRight"){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "y", x);
                console.log(s1.objectList[item].coords);
            }
            // p1.coords = rotate(p1, "z", x);
            // l1.coords = rotate(l1, "y", x);
        } else if(e.key=="r"){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "z", -x);
                console.log(s1.objectList[item].coords);
            }
            // p1.coords = rotate(p1, "z", x);
            // l1.coords = rotate(l1, "y", x);
        } else if(e.key=="t"){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "z", x);
                console.log(s1.objectList[item].coords);
            }
            // p1.coords = rotate(p1, "z", x);
            // l1.coords = rotate(l1, "y", x);
        } else if(e.key=="w"){
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:0,y:-translationSpeed,z:0}, coords2: {x:0,y:-translationSpeed,z:0}});
                console.log(s1.objectList[item].coords);
            }
            
        } else if(e.key=="a"){
            p1.coords = translate(p1, {coords: {x:-translationSpeed,y:0,z:0}});
        } else if(e.key=="s"){
            //p1.coords = translate(p1, {coords: {x:0,y:translationSpeed,z:0}});
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:0,y:translationSpeed,z:0}, coords2: {x:0,y:translationSpeed,z:0}});
                console.log(s1.objectList[item].coords);
            }
        } else if(e.key=="d"){
            p1.coords = translate(p1, {coords: {x:translationSpeed,y:0,z:0}});
        } else if(e.key=="q"){
            p1.coords = translate(p1, {coords: {x:0,y:0,z:translationSpeed}});
        } else if(e.key=="e"){
            p1.coords = translate(p1, {coords: {x:0,y:0,z:-translationSpeed}});
        } 

        canvasContext.clearRect(0,0,1280,720);
        // drawPoint(p1.coords, "rgba(255,0,0,1)", canvasContext);
        // drawPoint(p2.coords, "rgba(0,255,0,1)", canvasContext);
        c1.drawScene();
    });
};

var previousX, previousY = 0;
// canvas.addEventListener("mousemove", (e)=>{ 
//     //console.log(`x: ${e.offsetX - previousX} | y: ${e.offsetY - previousY}`);
    
//     let ydiff = e.offsetY - previousY;
//     let xdiff = e.offsetX - previousX;
//     for(let box in world){
//         world[box] = rotate3DCamera(world[box], ydiff*mouseCameraModifierY, "y");
//         world[box] = rotate3DCamera(world[box], xdiff*mouseCameraModifierX, "x");
//     }
//     //console.log(coords);

//     previousX = e.offsetX;
//     previousY = e.offsetY;
//     //rotate3DCamera(e.offsetY, "y");
// });