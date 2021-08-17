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
            targetCanvasContext.moveTo(obj.vertices.vertex1.x+DRAW_X_OFFSET, obj.vertices.vertex1.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(obj.vertices.vertex2.x+DRAW_X_OFFSET, obj.vertices.vertex2.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineWidth = lineWidth;
            targetCanvasContext.strokeStyle = colour;
            targetCanvasContext.stroke();
        } catch(e){ console.error(e); }
    } else if(obj instanceof Polygon){
        try {
            targetCanvasContext.beginPath();
            targetCanvasContext.moveTo(obj.vertices.vertex1.x+DRAW_X_OFFSET, obj.vertices.vertex1.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(obj.vertices.vertex2.x+DRAW_X_OFFSET, obj.vertices.vertex2.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(obj.vertices.vertex3.x+DRAW_X_OFFSET, obj.vertices.vertex3.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineTo(obj.vertices.vertex1.x+DRAW_X_OFFSET, obj.vertices.vertex1.y+DRAW_Y_OFFSET);
            targetCanvasContext.lineWidth = 0.5;
            targetCanvasContext.strokeStyle = colour;
            targetCanvasContext.stroke();
        } catch(e){ console.error(e); }
    }
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