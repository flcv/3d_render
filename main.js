//TO-DO:
// - READ POLYGON COORDINATES FROM CSV/TXT FILE
// - FINISH POLYGON CLASS
// - CENTERATORIGIN AND TRANSLATION VECTORS TOGETHER ISSUES
// - ADDING OBJECTS TO SCENE AFTER ATTACHING TO CAMERA DOES NOT SHOW UP
//      - NEED TO REATTACH?
// - LOCAL VS GLOBAL TRANSFORMATIONS
// - ANNOYING PITCH/YAW/ROLL ISSUE AGAIN?
//      - QUATERNIONS?
// - A LOT OF DUMB REPETITIVE CODE CAN BE MASSIVELY IMPROVED
// - DEFAULT VALUE OF TRANSLATION VECTOR IF NOT PROVIDED (FROM ORIGIN TO CENTRE POINT)
// - DRAW FUNCTION ?? NEEDS PROJECTION? DOESN'T TAKE INTO ACCOUNT Z
//      - PUT INTO RENDERER CLASS?

window.onload = ()=>{

    /***********************************/
//FROM GROWING WITH THE WEB .COM
// const times = [];
// let fps;

// function refreshLoop() {  
//   window.requestAnimationFrame(() => {
//     const now = performance.now();
//     while (times.length > 0 && times[0] <= now - 1000) {
//       times.shift();
//     }
//     times.push(now);
//     fps = times.length;
//     if(gameStarted){ //ONLY RENDER IF THE GAME HAS STARTED
//         renderer.font="12px Helvetica";
//         renderer.fillStyle="#309930"
//         renderer.fillText(fps +" FPS",1,11);
//     }
//     refreshLoop();
//   });
// }

// refreshLoop();

/***********************************/
    const GAME_FPS = 15;
    const canvasElement = document.getElementById("mainCanvas");
    const CANVAS_WIDTH = 1280;
    const CANVAS_HEIGHT = 720;
    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;
    const canvasContext = canvasElement.getContext("2d");
    
    var x=3;
    const translationSpeed = 10;
    var p1 = new Point(0,0,0);
    // var p2 = new Point(150,0,150);
    var v1 = new Vector3(50,50,0);
    var p3 = new Point(10,10,10);
    var p4 = new Point(10,10,-10);
    var p5 = new Point(10,-10,10);
    var po1 = new Polygon(p3,p4,p5,v1);

    var v2 = new Vector3(50,50,0);
    var p6 = new Point(10,-10,-10);
    var p7 = new Point(-10,10,10);
    var p8 = new Point(-10,10,-10);
    var po2 = new Polygon(p6,p7,p8,v2);

    
    var v3 = new Vector3(50,50,0);
    var p9 = new Point(10,-10,-10);
    var p10 = new Point(-10,10,10);
    var p11 = new Point(-10,10,-10);
    var po3 = new Polygon(p9,p10,p11,v3);
    /*var p5 = new Point(0,0,0);
    var p6 = new Point(0,-200,0);
    var p7 = new Point(0,0,0);
    var p8 = new Point(0,0,200);*/
    //var l1 = new Line(p3,p4,v1);
    
    // po1.vertices = centreAtOrigin(po1);
    // po2.vertices = centreAtOrigin(po2);
    console.log(po1.centre);
    console.log(centreAtOrigin(po1));
    /*var l2 = new Line(p5,p6);
    var l3 = new Line(p7,p8);*/
    var s1 = new Scene(p1, po1, po2, po3/*l1, l2, l3, p1*/);
    var c1 = new Camera(-CANVAS_WIDTH/2, CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, CANVAS_HEIGHT/2, -500, 500, s1, canvasContext);
    //s1.add(l1);
    var keysDown = new Set();

    function main(){

        
        document.addEventListener("keydown", e=>{
            console.log(1);
            //e.key = e.key.toLowerCase();
            keysDown.add(e.key);
        });
        document.addEventListener("keyup", e=>{
            console.log(2);
            //e.key = e.key.toLowerCase();
            keysDown.delete(e.key);
        });

        handleInput(keysDown);
        
        canvasContext.clearRect(0,0,1280,720);
        canvasContext.fillStyle = "#000";
        canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // drawPoint(p1.coords, "rgba(255,0,0,1)", canvasContext);
        // drawPoint(p2.coords, "rgba(0,255,0,1)", canvasContext);
        c1.drawScene();
    }

    setInterval(main, 1000/GAME_FPS);


    function handleInput(keysDown){
        if(keysDown.has("ArrowUp")){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "x", x);
            }
        } else if(keysDown.has("ArrowDown")){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "x", -x);
            }
        }
        if(keysDown.has("ArrowLeft")){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "y", -x);
            }
        } else if(keysDown.has("ArrowRight")){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "y", x);
            }
        } 
        if(keysDown.has("r")){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "z", -x);
            }
        } else if(keysDown.has("t")){    
            for(let item in s1.objectList){
                s1.objectList[item].coords = rotate(s1.objectList[item], "z", x);
            }
        }
        if(keysDown.has("w")){
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:0,y:-translationSpeed,z:0}, coords2: {x:0,y:-translationSpeed,z:0}});
            }
        } else if(keysDown.has("s")){
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:0,y:translationSpeed,z:0}, coords2: {x:0,y:translationSpeed,z:0}});
            }
        }
         if(keysDown.has("a")){
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:-translationSpeed,y:0,z:0}, coords2: {x:-translationSpeed,y:0,z:0}});
            }
        }  else if(keysDown.has("d")){
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:translationSpeed,y:0,z:0}, coords2: {x:translationSpeed,y:0,z:0}});
            }
        } 
        if(keysDown.has("q")){
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:0,y:0,z:translationSpeed}, coords2: {x:0,y:0,z:translationSpeed}});
            }
        } else if(keysDown.has("e")){
            for(let item in s1.objectList){
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: {x:0,y:0,z:-translationSpeed}, coords2: {x:0,y:0,z:-translationSpeed}});
            }
        } 
    }

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