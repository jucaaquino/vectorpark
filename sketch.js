const circle = [
    [ 0.00, -1.00],
    [ 0.55, -1.00],
    [ 1.00, -0.55],
    [ 1.00,  0.00],
    [ 1.00,  0.55],
    [ 0.55,  1.00],
    [ 0.00,  1.00],
    [-0.55,  1.00],
    [-1.00,  0.55],
    [-1.00,  0.00],
    [-1.00, -0.55],
    [-0.55, -1.00],
]

function drawCircle(p) {
    for (i = 0; i < p.length; ++i) {
        p[i] = convertCoord(p[i]);
    }

    beginShape();
    vertex(      p[ 0][0], p[ 0][1]);
    bezierVertex(p[ 1][0], p[ 1][1], 
                 p[ 2][0], p[ 2][1],
                 p[ 3][0], p[ 3][1]);
    bezierVertex(p[ 4][0], p[ 4][1], 
                 p[ 5][0], p[ 5][1],
                 p[ 6][0], p[ 6][1]);
    bezierVertex(p[ 7][0], p[ 7][1], 
                 p[ 8][0], p[ 8][1],
                 p[ 9][0], p[ 9][1]);
    bezierVertex(p[10][0], p[10][1], 
                 p[11][0], p[11][1],
                 p[ 0][0], p[ 0][1]);
    endShape();

}

function convertCoord(p) {
    return [p[0] * 50.0 + 50.0, p[1] * 50.0 + 50.0];
}

function matxvec(m, p) {
    p = [p[0], p[1], p[2], 1.0];

    const result = [0.0, 0.0, 0.0, 0.0];

    for (let i = 0; i < 4; ++i)
    for (let j = 0; j < 4; ++j) {
        result[i] += m[i+4*j] * p[j];
    }

    return [
        result[0] / result[3],
        result[1] / result[3],
        result[2] / result[3]
    ];
}

function matxmat(m1, m2) {
    const result = [
        0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0
    ];

    for (let i = 0; i < 4; ++i)
    for (let j = 0; j < 4; ++j)
    for (let k = 0; k < 4; ++k) {
        result[i+4*j] += m1[j+4*k] * m2[4*i+k];
    }

    return result;
}

function setup() {
    createCanvas(100, 100, SVG);
    colorMode(RGB, 100);
    background(0, 0, 0);
    fill(50);
    //strokeWeight(0);
    stroke(100);

    const fov = 40.0 * (Math.PI / 180.0);
    const aspect = 1.0;
    const near = 0.1;
    const far = 10.0;

    const f = 1.0 / tan(fov / 2.0);
    const nf = 1.0 / (near - far);
    const m1 = [
        f / aspect,  0.0,    0.0,                       0.0,
        0.0,         f,      0.0,                       0.0,
        0.0,         0.0,   (far + near) * nf,         -1.0,
        0.0,         0.0,   (2.0 * far * near) * nf,    0.0
    ];

    const angle = 60.0 * (Math.PI / 180.0);

    const m2 = [
        1.0, 0.0,              0.0,             0.0,
        0.0, Math.cos(angle), -Math.sin(angle), 0.0,
        0.0, Math.sin(angle),  Math.cos(angle), 0.0,
        0.0, 0.0,              0.0,             1.0
    ];

    const tx = 0.0;
    const ty = 0.0;
    const tz = -5.0;

    const m3 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        tx,  ty,  tz,  1.0
    ];

    

    let points = new Array();
    for (i = 0; i < circle.length; ++i) { points.push([1.0, circle[i][0], circle[i][1]]); }
    for (i = 0; i < points.length; ++i) { points[i] = matxvec(m2, points[i]); }
    drawCircle(points);


    points = new Array();
    for (i = 0; i < circle.length; ++i) { points.push([circle[i][0], circle[i][1], 1.0]); }
    for (i = 0; i < points.length; ++i) { points[i] = matxvec(m2, points[i]); }
    drawCircle(points);


    points = new Array();
    for (i = 0; i < circle.length; ++i) { points.push([circle[i][0], 1.0, circle[i][1]]); }
    for (i = 0; i < points.length; ++i) { points[i] = matxvec(m2, points[i]); }
    drawCircle(points);


}
