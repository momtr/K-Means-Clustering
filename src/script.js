let kmeans;
let points = [];
const k = 3;

function setup() {
    createCanvas(600, 600);
    noStroke();
}

function draw() {
    background(40);
    for(let i of points) {
        fill(240)
        ellipse(i[0], i[1], 10, 10);
    }
    // prediction
    if(kmeans) {
        for(let y = 0; y < height; y += 20) {
            for(let x = 0; x < width; x += 20) {
                let cluster = kmeans.predict([x, y]);
                if(cluster == 'C0')          fill(255, 0, 0, 50);
                else if(cluster == 'C1')     fill(0, 255, 0, 50);
                else if(cluster == 'C2')     fill(0, 0, 255, 50);
                rect(x, y, 20, 20);
            }
        }
        // mid points
        for(let i of kmeans.clusterNames) {
            let point = kmeans.clusters[i].point;
            fill(0);
            ellipse(point[0], point[1], 20, 20);
        }
    }
}

function mousePressed() {
    points.push([mouseX, mouseY]);
}

function keyPressed() {
    if(key == 's') {
        kmeans = new KMeans(points, k);
        kmeans.train();
    }
}