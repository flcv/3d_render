//TO-DO:
// - TRANSLATE CODE CAN BE COMPLETELY COLLAPSED INTO 1 OR 2 LOC, GIVEN SMALL CHANGES TO POINT AND LINE CLASS
// - PLAY AROUND WITH CAMERA MAGNIFICATION, VIEW PLANE DISTANCE, NEAREST AND FURTHEST Z VALUES TO GET PERFECT RENDERING
//      - HAVE THEM WITHIN THE CAMERA CLASS?
// - LOCAL VS GLOBAL TRANSFORMATIONS
// - REWORK VERTEX ID SYSTEM
// - ADD MOUSE ROTATION (ARROW KEYS FEELS VERY UNNATURAL)
// - MOVE MODEL ROTATION CODE FROM handleInput() TO rotate() FUNCTION AND MODEL set coords/vertices FUNCS
//      - SAME FOR TRANSLATION
// - CENTERATORIGIN AND TRANSLATION VECTORS TOGETHER ISSUES
// - ADDING OBJECTS TO SCENE AFTER ATTACHING TO CAMERA DOES NOT SHOW UP
//      - NEED TO REATTACH?
// - ANNOYING PITCH/YAW/ROLL ISSUE AGAIN?
//      - QUATERNIONS?
// - A LOT OF DUMB REPETITIVE CODE CAN BE MASSIVELY IMPROVED
// - DRAW FUNCTION ?? NEEDS PROJECTION? DOESN'T TAKE INTO ACCOUNT Z
//      - PUT INTO RENDERER CLASS?

window.onload = ()=>{


    const canvasElement = document.getElementById("mainCanvas");
    const CANVAS_WIDTH = 1280;
    const CANVAS_HEIGHT = 720;
    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;
    const canvasContext = canvasElement.getContext("2d");
    const instructionsText = `=====================\nW, A, S, D, Q, E -> move (translation)\nArrow Keys, T, R -> rotate`;
    
    const nearestZ = 30; //NEAREST AND FURTHEST THE CAMERA CAN SEE BEFORE THE POLYGON IS CULLED
    const furthestZ = 500; //BOTH WERE CHOSEN ARBITRARILY
    const rotationSpeed=3;
    const translationSpeed = 10;
    var p1 = new Point(0,0,0);
    // var p2 = new Point(150,0,150);


    var v1 = new Vector3(0,0,furthestZ);
    var v2 = new Vector3(0,300,0);
    // var p3 = new Point(-100,-100,0);
    // var p4 = new Point(100,-100,0);
    // var p5 = new Point(-100,100,0);
    // var p6 = new Point(0,0,200);
    // var po1 = new Polygon(p4, p5, p3, v1);
    // var po2 = new Polygon(p4, p6, p5, v1);
    // var po3 = new Polygon(p4, p3, p6, v1);
    // var po4 = new Polygon(p5, p6, p3, v1);
    // var m1 = new Model(po1, po2, po3, po4);
    var m1 = createModelFromBlender(model_blenderMonkey.verts, model_blenderMonkey.faces, v1);
    var m2 = createModelFromBlender(model_wonkyTetrahedron.verts, model_wonkyTetrahedron.faces, v2);
    var m3 = createModelFromBlender(model_cube.verts, model_cube.faces, v1);

    // var v2 = new Vector3(50,50,0);
    // var p6 = new Point(10,-10,-10);
    // var p7 = new Point(-10,10,10);
    // var p8 = new Point(-10,10,-10);
    // var po2 = new Polygon(p6,p7,p8,v2);

    
    // var v3 = new Vector3(50,50,0);
    // var p9 = new Point(10,-10,-10);
    // var p10 = new Point(-10,10,10);
    // var p11 = new Point(-10,10,-10);
    // var po3 = new Polygon(p9,p10,p11,v3);
    /*var p5 = new Point(0,0,0);
    var p6 = new Point(0,-200,0);
    var p7 = new Point(0,0,0);
    var p8 = new Point(0,0,200);*/
    var l1 = new Line(new Point(0,0,0),new Point(100,0,0),v1); //REPRESENTATION OF X AXIS
    var l2 = new Line(new Point(0,0,0),new Point(0,100,0),v1); //REPRESENTATION OF Y AXIS
    var l3 = new Line(new Point(0,0,0),new Point(0,0,100),v1); //REPRESENTATION OF Z AXIS
    var staticElementsUnder = [l1,l2,l3];
    
    var boundingBoxB = new Line(new Point(-200,200,0),new Point(300,200,0),v1); //EXAMPLE OF SOMETHING RENDERED OVER CAMERA'S SCENE
    var boundingBoxR = new Line(new Point(300,200,0),new Point(300,-200,0),v1); 
    var boundingBoxT = new Line(new Point(300,-200,0),new Point(-200,-200,0),v1); 
    var boundingBoxL = new Line(new Point(-200,-200,0),new Point(-200,200,0),v1); 
    var staticElementsOver = [boundingBoxB,boundingBoxL,boundingBoxR,boundingBoxT];

    // po1.vertices = centreAtOrigin(po1);
    // po2.vertices = centreAtOrigin(po2);
    // console.log(po1.centre);
    // console.log(centreAtOrigin(po1));
    /*var l2 = new Line(p5,p6);
    var l3 = new Line(p7,p8);*/
    var s1 = new Scene(p1, m1, m2, m3/*po1, po2, po3, po4*//*l1, l2, l3, p1*/);
    var c1 = new Camera(/*-CANVAS_WIDTH/2*/-200, /*CANVAS_WIDTH/2*/300, /*-CANVAS_HEIGHT/2*/-200, /*CANVAS_HEIGHT/2*/200, nearestZ, furthestZ, s1, canvasContext);
    //s1.add(l1);
    var keysDown = new Set();
    var fps = 0;
    var oldTime = 0;
    window.requestAnimationFrame(main);

    function main(currentTime){
        //FPS COUNTER
        fps = Math.floor(1000/(currentTime - oldTime));
        oldTime = currentTime;
        

        //INPUT
        document.addEventListener("keydown", e=>{
            //console.log(1);
            //e.key = e.key.toLowerCase();
            keysDown.add(e.key.toLowerCase());
        });
        document.addEventListener("keyup", e=>{
            //console.log(2);
            //e.key = e.key.toLowerCase();
            keysDown.delete(e.key.toLowerCase());
        });
        handleInput(keysDown);
        
        //RENDERING
        canvasContext.clearRect(0,0,1280,720);
        canvasContext.fillStyle = "#000";
        canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawText(canvasContext, {x: 1, y: 10, text:`${fps} FPS`}); //FPS
        drawText(canvasContext, {x: 1, y: 20, text:instructionsText}); //INSTRUCTIONS
        for(let element of staticElementsUnder){
            draw(element, canvasContext, {colour: "#444"});
        }
        c1.drawScene();
        for(let element of staticElementsOver){
            draw(element, canvasContext, {colour: "#BBB"});
        }
        
        
        //REFRESH
        window.requestAnimationFrame(main);
    }



    function handleInput(keysDown){
        var rotationQueue = [];
        if(keysDown.has("arrowup")){    
            rotationQueue.push(["x", rotationSpeed]);
        } else if(keysDown.has("arrowdown")){    
            rotationQueue.push(["x", -rotationSpeed]);
        }
        if(keysDown.has("arrowleft")){    
            rotationQueue.push(["y", -rotationSpeed]);
        } else if(keysDown.has("arrowright")){    
            rotationQueue.push(["y", rotationSpeed]);
        } 
        if(keysDown.has("r")){    
            rotationQueue.push(["z", -rotationSpeed]);
        } else if(keysDown.has("t")){    
            rotationQueue.push(["z", rotationSpeed]);
        }

        rotationQueue.forEach(v=>{
            for(let item in s1.objectList){
                if(s1.objectList[item] instanceof Model){
                    for(let poly of s1.objectList[item].polygonsList){
                        poly.coords = rotate(poly, ...v);
                    }
                } else {
                    s1.objectList[item].coords = rotate(s1.objectList[item], ...v);
                }
            }
        });
        

        var translationOptions = {x: 0, y: 0, z: 0};
        if(keysDown.has("w")){
            translationOptions.y = -translationSpeed;
        } else if(keysDown.has("s")){
            translationOptions.y = translationSpeed;
        }
         if(keysDown.has("a")){
            translationOptions.x = -translationSpeed;
        }  else if(keysDown.has("d")){
            translationOptions.x = translationSpeed;
        } 
        if(keysDown.has("q")){
            translationOptions.z = translationSpeed;
        } else if(keysDown.has("e")){
            translationOptions.z = -translationSpeed;
        } 
        for(let item in s1.objectList){
            if(s1.objectList[item] instanceof Model){
                for(let poly of s1.objectList[item].polygonsList){
                    poly.coords = translate(poly, {coords: translationOptions});
                }
            } else {
                s1.objectList[item].coords = translate(s1.objectList[item], {coords: translationOptions});
            }
        }
    }

};

// var previousX, previousY = 0;
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