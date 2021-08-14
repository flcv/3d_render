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
            targetCanvasContext.lineWidth = lineWidth;
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
            if(this.scene.objectList[item] instanceof Point){
                let tmpCoords = this.scene.objectList[item].coords; //PREVENT REPETITIVE RE-LOOKUP
                if(tmpCoords.x >= this.xMin && tmpCoords.x <= this.xMax
                && tmpCoords.y >= this.yMin && tmpCoords.y <= this.yMax
                && tmpCoords.z >= this.zMin && tmpCoords.z <= this.zMax){
                    draw(this.scene.objectList[item], targetCanvasContext, {colour: "#EEE"});
                }
            } else if(this.scene.objectList[item] instanceof Line){
                let tmpVertices = this.scene.objectList[item].vertices; //PREVENT REPETITIVE RE-LOOKUP
                if(tmpVertices.vertex1.x >= this.xMin && tmpVertices.vertex1.x <= this.xMax //COORDS OF FIRST VERTEX
                && tmpVertices.vertex1.y >= this.yMin && tmpVertices.vertex1.y <= this.yMax
                && tmpVertices.vertex1.z >= this.zMin && tmpVertices.vertex1.z <= this.zMax
                && tmpVertices.vertex2.x >= this.xMin && tmpVertices.vertex2.x <= this.xMax //COORDS OF SECOND VERTEX
                && tmpVertices.vertex2.y >= this.yMin && tmpVertices.vertex2.y <= this.yMax
                && tmpVertices.vertex2.z >= this.zMin && tmpVertices.vertex2.z <= this.zMax){
                        draw(this.scene.objectList[item], targetCanvasContext, {colour: "#EEE"});
                    }
            } else if(this.scene.objectList[item] instanceof Polygon){
                let tmpVertices = this.scene.objectList[item].vertices; //PREVENT REPETITIVE RE-LOOKUP
                if(tmpVertices.vertex1.x >= this.xMin && tmpVertices.vertex1.x <= this.xMax //COORDS OF FIRST VERTEX
                && tmpVertices.vertex1.y >= this.yMin && tmpVertices.vertex1.y <= this.yMax
                && tmpVertices.vertex1.z >= this.zMin && tmpVertices.vertex1.z <= this.zMax
                && tmpVertices.vertex2.x >= this.xMin && tmpVertices.vertex2.x <= this.xMax //COORDS OF SECOND VERTEX
                && tmpVertices.vertex2.y >= this.yMin && tmpVertices.vertex2.y <= this.yMax
                && tmpVertices.vertex2.z >= this.zMin && tmpVertices.vertex2.z <= this.zMax
                && tmpVertices.vertex3.x >= this.xMin && tmpVertices.vertex3.x <= this.xMax //COORDS OF SECOND VERTEX
                && tmpVertices.vertex3.y >= this.yMin && tmpVertices.vertex3.y <= this.yMax
                && tmpVertices.vertex3.z >= this.zMin && tmpVertices.vertex3.z <= this.zMax){
                        draw(this.scene.objectList[item], targetCanvasContext, {colour: "#EEE"});
                    }
            }
        }
    }
};