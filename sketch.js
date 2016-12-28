function preload() {
    body = loadImage('images/gingerbread_body.png');
    sx = loadImage('images/gingerbread_sx.png');
    dx = loadImage('images/gingerbread_dx.png');
    bg = loadImage('images/gingerbread_background.png');
    note = loadImage('images/gingerbread_notes.png');
}

function setup() {
    createCanvas(360,640);
    angleMode(DEGREES);

    //Deal with microphone
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    var volume = mic.getLevel();

    //If the volume is not enought, re-map it (set a higher newMax).
    var newMax = 1;
    volume = map(volume,0,1,0,newMax);
    
    // BACKGROUND
    background('#41934b');
    image(bg,0,0);
    
    push();  //Start with transformations
    translate(width/2,366);
    
    // ARMS
    push();
    var size = map(volume,0,1,-5,25);
    rotate(size);
    image(sx,-width/2,-366);
    pop();
    
    push();
    var size = map(volume,0,1,5,-25);
    rotate(size);
    image(dx,-width/2,-366);
    pop();

    // BODY
    push();
    image(body,-width/2,-366);
    pop();
      
    // BUTTONS
    push();
    noStroke();
    var myColor = lerpColor(color('#8875ba'),color('#635193'), volume); 
    fill(myColor);
    ellipse(0,0,20,20);
    ellipse(0,30,20,20);
    ellipse(0,60,20,20); 
    pop();
    
    // MOUTH
    push();
    noFill();
    stroke('#ca151c');
    strokeWeight(5);
    var size = map(volume,0,1,45,90);
    arc(0,-55,size,size,0,180,PIE)
    pop();
    
    // EYES
    push();
    noFill();
    stroke('#37c4d3');
    strokeWeight(5);
    var size = map(volume,0,1,10,30);
    arc(-18,-78,20,size,180,0,OPEN);
    arc(18,-78,20,size,180,0,OPEN);
    pop();
    
    // NOTES
    push();
    if(volume>=0.4){
        image(note,-180,90);
    }
    pop();
    
    //TEXT
    push();
    textSize(30);
    textAlign(CENTER);
    textFont("Satisfy");
    fill(255);
    text('Sing with us!',0,220)
    pop();
    
    pop();  //All transformation are now dropped and the coordinate system is resetted.
  
}
