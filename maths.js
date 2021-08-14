class Point{
    constructor(x,y,z,id=""){
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        //this.coords = [x,y,z];
    }


    get coords(){
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
    set coords(newCoords){
        if(typeof(newCoords)=="object" 
        && (newCoords.x!=null && typeof(newCoords.x)=="number") 
        && (newCoords.y!=null && typeof(newCoords.y)=="number") 
        && (newCoords.z!=null && typeof(newCoords.z)=="number")){
            this.x = newCoords.x;
            this.y = newCoords.y;
            this.z = newCoords.z;
            return true;
        } else {
            return false; //INVALID ARGUMENTS
        }
    }
    
    // set id(newId){
    //     this.id = newId;
    // }
};

class Vector3{
    constructor(x,y,z,id=""){
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
    }
    
    get coords(){
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
    set coords(newCoords){
        if(typeof(newCoords)=="object" 
        && (newCoords.x!=null && typeof(newCoords.x)=="number") 
        && (newCoords.y!=null && typeof(newCoords.y)=="number") 
        && (newCoords.z!=null && typeof(newCoords.z)=="number")){
            this.x = newCoords.x;
            this.y = newCoords.y;
            this.z = newCoords.z;
            return true;
        } else {
            return false; //INVALID ARGUMENTS
        }
    }
    
    // set id(newId){
    //     this.id = newId;
    // }
};

class Line {
    constructor(point1, point2, translationVector, id=""){
        //A LINE IS A CONNECTION BETWEEN TWO POINTS
        this.point1 = {
            coords: {
                x: point1.coords.x,
                y: point1.coords.y,
                z: point1.coords.z
            }
        }; //point1;
        this.point2 = {
            coords: {
                x: point2.coords.x,
                y: point2.coords.y,
                z: point2.coords.z
            }
        } //point2;
        this.id = id;
        this.translationVector = translationVector;
    }

    get vertices(){
        return {
            vertex1: {
                x: this.point1.coords.x+this.translationVector.x,
                y: this.point1.coords.y+this.translationVector.y,
                z: this.point1.coords.z+this.translationVector.z
            }, 
            vertex2: {
                x: this.point2.coords.x+this.translationVector.x,
                y: this.point2.coords.y+this.translationVector.y,
                z: this.point2.coords.z+this.translationVector.z
            }
        };
    }
    get coords(){
        return this.vertices;
    }
    get rawVertices(){
        return {
            vertex1: this.point1.coords,
            vertex2: this.point2.coords
        };
    }
    get rawCoords(){
        return this.rawVertices;
    }

    get centre(){ //RETURNS THE CENTRE-POINT OF THE LINE
        return {
            x: (this.vertices.vertex1.x + this.vertices.vertex2.x)/2,
            y: (this.vertices.vertex1.y + this.vertices.vertex2.y)/2,
            z: (this.vertices.vertex1.z + this.vertices.vertex2.z)/2
        };
    }

    set vertices(newTransVec){
        if(newTransVec instanceof Vector3 //TRANSLATION
        && "coords" in newTransVec
        && "x" in newTransVec.coords
        && "y" in newTransVec.coords
        && "z" in newTransVec.coords
        && typeof(newTransVec.coords.x) == "number"
        && typeof(newTransVec.coords.y) == "number"
        && typeof(newTransVec.coords.z) == "number"){
            this.translationVector = newTransVec;
            return true;
        } else if(typeof(newTransVec)=="object" //LOCAL ROTATION
        && "vertex1" in newTransVec
        && "vertex2" in newTransVec
        && (newTransVec.vertex1.x!=null && typeof(newTransVec.vertex1.x)=="number") 
        && (newTransVec.vertex1.y!=null && typeof(newTransVec.vertex1.y)=="number") 
        && (newTransVec.vertex1.z!=null && typeof(newTransVec.vertex1.z)=="number")
        && (newTransVec.vertex2.x!=null && typeof(newTransVec.vertex2.x)=="number") 
        && (newTransVec.vertex2.y!=null && typeof(newTransVec.vertex2.y)=="number") 
        && (newTransVec.vertex2.z!=null && typeof(newTransVec.vertex2.z)=="number")){
            this.rawVertices.vertex1.x = newTransVec.vertex1.x;
            this.rawVertices.vertex1.y = newTransVec.vertex1.y;
            this.rawVertices.vertex1.z = newTransVec.vertex1.z;
            this.rawVertices.vertex2.x = newTransVec.vertex2.x;
            this.rawVertices.vertex2.y = newTransVec.vertex2.y;
            this.rawVertices.vertex2.z = newTransVec.vertex2.z;
            return true;
        }
        return false;
    }

    set coords(newTransVec){
        return this.vertices = newTransVec;
    }
};

class Polygon {
    constructor(point1, point2, point3, translationVector, id=""){ 
        //A POLYGON IS THREE SIDED, AND COMPOSED OF THREE VERTICES (POINTS)
        this.point1 = {
            coords: {
                x: point1.coords.x,
                y: point1.coords.y,
                z: point1.coords.z
            }
        }; 
        this.point2 = {
            coords: {
                x: point2.coords.x,
                y: point2.coords.y,
                z: point2.coords.z
            }
        };
        this.point3 = {
            coords: {
                x: point3.coords.x,
                y: point3.coords.y,
                z: point3.coords.z
            }
        };
        this.id = id;
        this.translationVector = translationVector;
    }

    get vertices(){
        return {
            vertex1: {
                x: this.point1.coords.x+this.translationVector.x,
                y: this.point1.coords.y+this.translationVector.y,
                z: this.point1.coords.z+this.translationVector.z
            }, 
            vertex2: {
                x: this.point2.coords.x+this.translationVector.x,
                y: this.point2.coords.y+this.translationVector.y,
                z: this.point2.coords.z+this.translationVector.z
            },
            vertex3: {
                x: this.point3.coords.x+this.translationVector.x,
                y: this.point3.coords.y+this.translationVector.y,
                z: this.point3.coords.z+this.translationVector.z
            }
        };
    }
    get coords(){
        return this.vertices;
    }
    get rawVertices(){
        return {
            vertex1: this.point1.coords,
            vertex2: this.point2.coords,
            vertex3: this.point3.coords
        };
    }
    get rawCoords(){
        return this.rawVertices;
    }

    get centre(){ //RETURNS THE CENTRE-POINT OF THE POLYGON
        return {
            x: (this.rawVertices.vertex1.x + this.rawVertices.vertex2.x + this.rawVertices.vertex3.x)/3,
            y: (this.rawVertices.vertex1.y + this.rawVertices.vertex2.y + this.rawVertices.vertex3.y)/3,
            z: (this.rawVertices.vertex1.z + this.rawVertices.vertex2.z + this.rawVertices.vertex3.z)/3
        };
    }

    set vertices(newTransVec){
        if(newTransVec instanceof Vector3 //TRANSLATION
        && "coords" in newTransVec
        && "x" in newTransVec.coords
        && "y" in newTransVec.coords
        && "z" in newTransVec.coords
        && typeof(newTransVec.coords.x) == "number"
        && typeof(newTransVec.coords.y) == "number"
        && typeof(newTransVec.coords.z) == "number"){
            this.translationVector = newTransVec;
            return true;
        } else if(typeof(newTransVec)=="object" //LOCAL ROTATION
        && "vertex1" in newTransVec
        && "vertex2" in newTransVec
        && "vertex3" in newTransVec
        && (newTransVec.vertex1.x!=null && typeof(newTransVec.vertex1.x)=="number") 
        && (newTransVec.vertex1.y!=null && typeof(newTransVec.vertex1.y)=="number") 
        && (newTransVec.vertex1.z!=null && typeof(newTransVec.vertex1.z)=="number")
        && (newTransVec.vertex2.x!=null && typeof(newTransVec.vertex2.x)=="number") 
        && (newTransVec.vertex2.y!=null && typeof(newTransVec.vertex2.y)=="number") 
        && (newTransVec.vertex2.z!=null && typeof(newTransVec.vertex2.z)=="number")
        && (newTransVec.vertex3.x!=null && typeof(newTransVec.vertex3.x)=="number") 
        && (newTransVec.vertex3.y!=null && typeof(newTransVec.vertex3.y)=="number") 
        && (newTransVec.vertex3.z!=null && typeof(newTransVec.vertex3.z)=="number")){
            this.rawVertices.vertex1.x = newTransVec.vertex1.x;
            this.rawVertices.vertex1.y = newTransVec.vertex1.y;
            this.rawVertices.vertex1.z = newTransVec.vertex1.z;
            this.rawVertices.vertex2.x = newTransVec.vertex2.x;
            this.rawVertices.vertex2.y = newTransVec.vertex2.y;
            this.rawVertices.vertex2.z = newTransVec.vertex2.z;
            this.rawVertices.vertex3.x = newTransVec.vertex3.x;
            this.rawVertices.vertex3.y = newTransVec.vertex3.y;
            this.rawVertices.vertex3.z = newTransVec.vertex3.z;
            return true;
        }
        return false;
    }

    set coords(newTransVec){
        return this.vertices = newTransVec;
    }
};

function add(obj1, obj2){
    return {
        x: obj1.coords.x+obj2.coords.x,
        y: obj1.coords.y+obj2.coords.y,
        z: obj1.coords.z+obj2.coords.z
    };
}

function subtract(obj1, obj2){
    return {
        x: obj1.coords.x-obj2.coords.x,
        y: obj1.coords.y-obj2.coords.y,
        z: obj1.coords.z-obj2.coords.z
    };
}

function translate(obj1, obj2){
    if(obj1 instanceof Point){
        if(typeof(obj2)=="object"){
            return {
                x: obj1.coords.x + obj2.coords.x,
                y: obj1.coords.y + obj2.coords.y,
                z: obj1.coords.z + obj2.coords.z
            };
        } else if(typeof(obj2)=="number"){
            return {
                x: obj1.coords.x + obj2,
                y: obj1.coords.y + obj2,
                z: obj1.coords.z + obj2
            };
        } else { //INVALID ARGUMENT, DO NOTHING
            return obj1;
        }
    } else if(obj1 instanceof Line){
        return new Vector3(obj1.translationVector.x + obj2.coords.x, obj1.translationVector.y + obj2.coords.y, obj1.translationVector.z + obj2.coords.z);
        // {
        //     vertex1: {
        //         x: obj1.coords.vertex1.x + obj2.coords.x,
        //         y: obj1.coords.vertex1.y + obj2.coords.y,
        //         z: obj1.coords.vertex1.z + obj2.coords.z
        //     },
        //     vertex2: {
        //         x: obj1.coords.vertex2.x + obj2.coords2.x,
        //         y: obj1.coords.vertex2.y + obj2.coords2.y,
        //         z: obj1.coords.vertex2.z + obj2.coords2.z
        //     }
        // };
    } else if(obj1 instanceof Polygon){
        return new Vector3(obj1.translationVector.x + obj2.coords.x, obj1.translationVector.y + obj2.coords.y, obj1.translationVector.z + obj2.coords.z);
    }
}

/**
 * !!NOT TO BE CONFUSED WITH dotProd and crossProd!!
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns 
 */
function multiply(obj1, obj2){
    if(typeof(obj2)=="object"){
        return {
            x: obj1.coords.x * obj2.coords.x,
            y: obj1.coords.y * obj2.coords.y,
            z: obj1.coords.z * obj2.coords.z
        };
    } else if(typeof(obj2)=="number"){
        return {
            x: obj1.coords.x * obj2,
            y: obj1.coords.y * obj2,
            z: obj1.coords.z * obj2
        };
    } else { //INVALID ARGUMENT, DO NOTHING
        return obj1;
    }
}

function centreAtOrigin(obj1){
    if(obj1 instanceof Line){ // TEST THIS
        return {
            vertex1: {
                x: obj1.point1.coords.x - obj1.centre.x,
                y: obj1.point1.coords.y - obj1.centre.y,
                z: obj1.point1.coords.z - obj1.centre.z
            },
            vertex2: {
                x: obj1.point2.coords.x - obj1.centre.x,
                y: obj1.point2.coords.y - obj1.centre.y,
                z: obj1.point2.coords.z - obj1.centre.z
            }
        };
    } else if(obj1 instanceof Polygon){
        return {
            vertex1: {
                x: obj1.point1.coords.x - obj1.centre.x,
                y: obj1.point1.coords.y - obj1.centre.y,
                z: obj1.point1.coords.z - obj1.centre.z
            },
            vertex2: {
                x: obj1.point2.coords.x - obj1.centre.x,
                y: obj1.point2.coords.y - obj1.centre.y,
                z: obj1.point2.coords.z - obj1.centre.z
            },
            vertex3: {
                x: obj1.point3.coords.x - obj1.centre.x,
                y: obj1.point3.coords.y - obj1.centre.y,
                z: obj1.point3.coords.z - obj1.centre.z
            }
        };
    }
}

function rotate(obj1, axis, degrees){
    const radians = degrees * (Math.PI/180);
    const rotatePoint = (coords)=>{
        if(axis.toLowerCase() == "z"){
            return {
                x: coords.x*Math.cos(radians) - coords.y*Math.sin(radians),
                y: coords.y*Math.cos(radians) + coords.x*Math.sin(radians),
                z: coords.z,
            };
        } else if (axis.toLowerCase() == "y"){
            return {
                x: coords.x*Math.cos(radians) + coords.z*Math.sin(radians),
                y: coords.y, 
                z: coords.z*Math.cos(radians) - coords.x*Math.sin(radians)
            };
        } else if (axis.toLowerCase() == "x"){
            return {
                x: coords.x,
                y: coords.y*Math.cos(radians) - coords.z*Math.sin(radians),
                z: coords.z*Math.cos(radians) + coords.y*Math.sin(radians)
            };
        } else {
            return coords;
        }
    }

    if(obj1 instanceof Point){
        return rotatePoint(obj1.coords);
    } else if(obj1 instanceof Line){
        return {
            vertex1: rotatePoint(obj1.rawVertices.vertex1),
            vertex2: rotatePoint(obj1.rawVertices.vertex2)
        };
    } else if(obj1 instanceof Polygon){
        return {
            vertex1: rotatePoint(obj1.rawVertices.vertex1),
            vertex2: rotatePoint(obj1.rawVertices.vertex2),
            vertex3: rotatePoint(obj1.rawVertices.vertex3)
        };
    }
    
}
