class KMeans {

    constructor(data_points, k=3, accuracy=0.1) {
        this.data = data_points;
        this.accuracy = accuracy;
        this.k = k;
        this.dim = data_points[0].length;
        this.clusters = {};
        this.clusterNames = [];
        for(let i = 0; i < this.k; i++) {
            this.clusters["C" + i] = {
                name: "C" + i,
                point: this.data[Math.floor(Math.random() * this.data.length)],
                elements: []
            };
            this.clusterNames.push("C" + i);
        }
        this.assign();
    }

    assign() {
        for(let i of this.clusterNames) {
            this.clusters[i].elements = [];
        }
        for(let p of this.data) {
            let cluster = this.predict(p);
            this.clusters[cluster].elements.push(p);
        }
    }

    euclideanDistance(x1, x2) {
        let sum = 0;
        for(let i = 0; (i < x1.length) && (i < x2.length); i++) {
            let diff = x2[i] - x1[i];
            sum += diff * diff;
        }
        return Math.pow(sum, (1/2));
    }

    train() {
        let assignment = {};
        for(let i of this.clusterNames) {
            assignment[i] = null;
        }
        let run = true;
        while(run) {
            this.assign();
            // recalc cluster points
            for(let i of this.clusterNames) {
                let cluster = this.clusters[i];
                let numOfPoints = cluster.elements.length;
                if(numOfPoints > 0) {
                    let sumOfPoints = this.sum(cluster.elements);
                    let newAssignment = this.multiply(sumOfPoints, (1 / numOfPoints));
                    if(this.difference(newAssignment, assignment[i], this.accuracy)) 
                        run = false;
                    assignment[i] = newAssignment;
                    cluster.point = newAssignment;
                }
            }
        }
    }

    sum(point_array) {
        if(point_array.length > 0) {
            let point = [];
            for(let i = 0; i < point_array[0].length; i++) {
                let sum = 0; 
                for(let j of point_array) {
                    sum += j[i];
                }
                point.push(sum);
            }
            return point;
        }
        return -1;
    }

    multiply(vec, scalar) {
        for(let i = 0; i < vec.length; i++) {
            vec[i] *= scalar;
        }
        return vec;
    }

    difference(vec1, vec2, limit) {
        if(!vec1 || !vec2)
            return false;
        let diff = 0;
        for(let i = 0; i < vec1.length; i++) {
            diff += Math.abs(vec1[i] - vec2[i]);
        }
        if(diff < limit)
            return true;
        return false;
    }

    predict(point) {
        let cluster = null;
        let minDist = Infinity;
        for(let i of this.clusterNames) {
            let distance = this.euclideanDistance(point, this.clusters[i].point);
            if(distance < minDist) {
                minDist = distance;
                cluster = i;
            }
        }
        return cluster;
    }

    static normalize(array2d) {
        let largestVal = -Infinity;
        for(let i of array2d) {
            for(let j of i) {
                if(j > largestVal) 
                    largestVal = j;
            }
        }
        for(let i = 0; i < array2d.length; i++) {
            for(let j = 0; j < array2d[i].length; j++) {
                array2d[i][j] /= largestVal;
            }
        }
        return array2d;a
    }

    static copy(array2d) {
        let newArr = [];
        for(let i of array2d) {
            let row = [];
            for(let j of i) {
                row.push(j);
            }
            newArr.push(row);
        }
        return newArr;
    }

    renameCluster(old, label) {
        let obj = this.clusters[old];
        for(let i = 0; i < this.clusterNames.length; i++) {
            if(this.clusterNames[i] == old)
                this.clusterNames[i] = label;
        }
        delete this.clusters[old];
        this.clusters[label] = obj;
    }

}