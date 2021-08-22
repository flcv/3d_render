const DRAW_X_OFFSET = 640;
const DRAW_Y_OFFSET = 360;

function draw(obj, targetCanvasContext=CanvasRenderingContext2D, {lineWidth=2, colour="rgba(0,0,0,0)"}){

    if(obj instanceof Point){
        try {
            targetCanvasContext.fillStyle = colour;
            targetCanvasContext.fillRect(obj.coords.x+DRAW_X_OFFSET, obj.coords.y+DRAW_Y_OFFSET, lineWidth, lineWidth);
        } catch(e){ console.error(e); }
    } else if(obj instanceof Line){
        try {
            targetCanvasContext.beginPath();
            let newX1 = convert3DcoordsToViewPlane2D([obj.vertices.vertex1.x, obj.vertices.vertex1.z]);
            let newY1 = convert3DcoordsToViewPlane2D([obj.vertices.vertex1.y, obj.vertices.vertex1.z]);
            let newX2 = convert3DcoordsToViewPlane2D([obj.vertices.vertex2.x, obj.vertices.vertex2.z]);
            let newY2 = convert3DcoordsToViewPlane2D([obj.vertices.vertex2.y, obj.vertices.vertex2.z]);
            targetCanvasContext.moveTo(newX1+DRAW_X_OFFSET, newY1+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(newX2+DRAW_X_OFFSET, newY2+DRAW_Y_OFFSET);
            // targetCanvasContext.moveTo(obj.vertices.vertex1.x+DRAW_X_OFFSET, obj.vertices.vertex1.y+DRAW_Y_OFFSET);
            // targetCanvasContext.lineTo(obj.vertices.vertex2.x+DRAW_X_OFFSET, obj.vertices.vertex2.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineWidth = lineWidth;
            targetCanvasContext.strokeStyle = colour;
            targetCanvasContext.stroke();
        } catch(e){ console.error(e); }
    } else if(obj instanceof Polygon){
        try {
            let newX1 = convert3DcoordsToViewPlane2D([obj.vertices.vertex1.x, obj.vertices.vertex1.z]);
            let newY1 = convert3DcoordsToViewPlane2D([obj.vertices.vertex1.y, obj.vertices.vertex1.z]);
            let newX2 = convert3DcoordsToViewPlane2D([obj.vertices.vertex2.x, obj.vertices.vertex2.z]);
            let newY2 = convert3DcoordsToViewPlane2D([obj.vertices.vertex2.y, obj.vertices.vertex2.z]);
            let newX3 = convert3DcoordsToViewPlane2D([obj.vertices.vertex3.x, obj.vertices.vertex3.z]);
            let newY3 = convert3DcoordsToViewPlane2D([obj.vertices.vertex3.y, obj.vertices.vertex3.z]);
            targetCanvasContext.beginPath();
            targetCanvasContext.moveTo(newX1+DRAW_X_OFFSET, newY1+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(newX2+DRAW_X_OFFSET, newY2+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(newX3+DRAW_X_OFFSET, newY3+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(newX1+DRAW_X_OFFSET, newY1+DRAW_Y_OFFSET);
            // targetCanvasContext.moveTo(obj.vertices.vertex1.x+DRAW_X_OFFSET, obj.vertices.vertex1.y+DRAW_Y_OFFSET);
            // targetCanvasContext.lineTo(obj.vertices.vertex2.x+DRAW_X_OFFSET, obj.vertices.vertex2.y+DRAW_Y_OFFSET);
            // targetCanvasContext.lineTo(obj.vertices.vertex3.x+DRAW_X_OFFSET, obj.vertices.vertex3.y+DRAW_Y_OFFSET);
            // targetCanvasContext.lineTo(obj.vertices.vertex1.x+DRAW_X_OFFSET, obj.vertices.vertex1.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineWidth = 0.5;
            targetCanvasContext.strokeStyle = colour;
            targetCanvasContext.stroke();
        } catch(e){ console.error(e); }
    }
}

/**
 * Performs a projection of a point onto a view plane a certain distance away
 * @param {Array} coords [x,z] or [y,z]
 * @param {Number} viewPlaneDistance Distance of the view plane from the camera
 * @returns Number; x or y on the view plane
 */
 function convert3DcoordsToViewPlane2D(coords = [0,0], viewPlaneDistance = 10, cameraMagnificationValue=10){
    return ((coords[0]*(viewPlaneDistance/coords[1]))*cameraMagnificationValue);
}

function drawText(targetCanvasContext, {font="12px Consolas", color="#00FF00", x=0, y=0, text=`Null text`, lineHeight=11}){
    try {
        var newText = text.split("\n"); //SUPPORT FOR NEW LINES, SUCH AS IN `ABC\nDEF` OR ACTUAL NEWLINES IN A GIVEN CODE EDITOR
        targetCanvasContext.font=font;
        targetCanvasContext.fillStyle=color;
        for(let lineIndex in newText){
            targetCanvasContext.fillText(newText[lineIndex],x,y+lineHeight*lineIndex);
        }
    } catch(e) {
        console.error(e);
        return false;
    }
    return true;
}

class Scene{
    constructor(...objs){
        this.objectList = [];
        for(let item of objs){
            this.objectList.push(item);
        }
    }

    add(...obj){
        var results = [];
        var alreadyExists = false;
        for(let item of obj){
            alreadyExists = false;
            for(let existingItem in this.objectList){
                if(this.objectList[existingItem].id == item.id){
                    results.push(false); //FAIL; AN OBJECT ALREADY EXISTS WITH THIS id
                    alreadyExists = true;
                    break;
                }
            }
            if(!alreadyExists){
                this.objectList.push(item);
                results.push(true);
            }
        }
        return results;
    }

    
    remove(...objIds){
        var results = [];
        for(let id of objIds){
            for(let item in this.objectList){
                if(this.objectList[item].id == id){
                    results.push[this.objectList.splice(item,1).length ? true : false];
                }
            }
        }
        return results;
    }

};

class Camera{
    constructor(xMin, xMax, yMin, yMax, zMin, zMax, scene, targetCanvasContext=null){
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
        this.zMin = zMin;
        this.zMax = zMax;
        this.scene = scene;
        this.targetCanvasContext = targetCanvasContext;
    }

    drawScene(targetCanvasContext=this.targetCanvasContext){
        for(let item in this.scene.objectList){
            if(this.scene.objectList[item] instanceof Model){ //MODELS ARE COLLECTIONS OF POLYGONS SO EACH POLYGON MUST BE CHECKED INDIVIDUALLY
                for(let poly of this.scene.objectList[item].polygonsList){ //GO THROUGH ALL POLYGONS OF MODEL, AND CHECK...
                    if(this.objectWithinCameraCoundaries(poly.vertices)){ //IF THIS SPECIFIC POLYGON IS WITHIN BOUNDS, THEN DRAW IT
                        draw(poly, targetCanvasContext, {colour: "#0F0"});
                    }
                }
            } else {
                if(this.objectWithinCameraCoundaries(this.scene.objectList[item].vertices)){
                    draw(this.scene.objectList[item], targetCanvasContext, {colour: "#EEE"});
                }
            }
        }
    }

    objectWithinCameraCoundaries(obj1){
        if(typeof obj1 != "object"){ return false; }
        try {
            var vertices = Object.keys(obj1);
            for(let v of vertices){
                if(!(["x", "y", "z"].every(k=>Object.keys(obj1[v]).includes(k)))){ //ONE OF THE OBJECT'S VERTICES DOES NOT CONTAIN ONE OF x, y, z VALUES
                    return false;
                }
                if(obj1[v].x >= this.xMin && obj1[v].x <= this.xMax     //TEST THAT THE COORDS OF THIS SPECIFIC VECTOR
                    && obj1[v].y >= this.yMin && obj1[v].y <= this.yMax //ARE WITHIN THE CAMERA'S VIEWING BOUNDARIES
                    && obj1[v].z >= this.zMin && obj1[v].z <= this.zMax){
                    
                } else { return false; } //FAIL IF A VERTEX IS NOT WITHIN THE CAMERA'S BOUNDARIES
            }
        } catch(e){
            console.error(e);
            return false;
        }    
        return true;
    }
};