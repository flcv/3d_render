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
    constructor(point1, point2, id=""){
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
    }

    get vertices(){
        return {
            vertex1: this.point1.coords, 
            vertex2: this.point2.coords
        };
    }
    get coords(){
        return this.vertices;
    }

    set vertices(newVertices){
        if(typeof(newVertices)=="object" 
        && "vertex1" in newVertices
        && "vertex2" in newVertices
        && (newVertices.vertex1.x!=null && typeof(newVertices.vertex1.x)=="number") 
        && (newVertices.vertex1.y!=null && typeof(newVertices.vertex1.y)=="number") 
        && (newVertices.vertex1.z!=null && typeof(newVertices.vertex1.z)=="number")
        && (newVertices.vertex2.x!=null && typeof(newVertices.vertex2.x)=="number") 
        && (newVertices.vertex2.y!=null && typeof(newVertices.vertex2.y)=="number") 
        && (newVertices.vertex2.z!=null && typeof(newVertices.vertex2.z)=="number")){
            this.vertices.vertex1.x = newVertices.vertex1.x;
            this.vertices.vertex1.y = newVertices.vertex1.y;
            this.vertices.vertex1.z = newVertices.vertex1.z;
            this.vertices.vertex2.x = newVertices.vertex2.x;
            this.vertices.vertex2.y = newVertices.vertex2.y;
            this.vertices.vertex2.z = newVertices.vertex2.z;
            return true;
        } else {
            return false; //INVALID ARGUMENTS
        }
    }

    set coords(newVertices){
        return this.vertices = newVertices;
    }
};

class Polygon {
    constructor(point1, point2, point3, id=""){ 
        //A POLYGON IS THREE SIDE, WITH EACH EDGE BEING A LINE, AND EACH VERTEX A POINT
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.id = id;
    }

    get vertices(){
        return {
            vertex1: this.point1.coords, 
            vertex2: this.point2.coords,
            vertex3: this.point3.coords
        };
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
        return {
            vertex1: {
                x: obj1.coords.vertex1.x + obj2.coords.x,
                y: obj1.coords.vertex1.y + obj2.coords.y,
                z: obj1.coords.vertex1.z + obj2.coords.z
            },
            vertex2: {
                x: obj1.coords.vertex2.x + obj2.coords2.x,
                y: obj1.coords.vertex2.y + obj2.coords2.y,
                z: obj1.coords.vertex2.z + obj2.coords2.z
            }
        };
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
            vertex1: rotatePoint(obj1.vertices.vertex1),
            vertex2: rotatePoint(obj1.vertices.vertex2)
        };
    }
    
}
