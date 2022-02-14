var dots = [];
var c = [];
var p , touched;
var pass="2589" ,currentPass="";

function setup() {
alert("The correct pattern is L from middle or 2589\n\nSwipe from the top first to begin else it wont take you swipe correctly (Code Playground error not mine)\n\nMore features coming soon , maybe ;)")
    createCanvas(innerWidth,innerHeight);
    p = document.getElementsByTagName('p')[0];
 
    for(var i=0, j=1, k=1 ; i<9;i++){
        var l = new Vector(1/100*width+j*width/4,25/100*height+k*width/4);
        dots[i] = new Dot(i,l);

        if(j==3){
            j=1; 
            k++;
        }else{
            j++;
        }
    }
    drawDots();
}

function touchStarted(){
    p.innerHTML = "";
    touched = true;
    getLines();
    drawLines(255,255,255);
}
function touchMoved(){
touched = true;
    getLines();
    drawLines(255,255,255);
}
function touchEnded () {
    touched = false;
    check();
}

function getLines(){
    for(var i = 0 ; i<dots.length ; i++){
        var d = dist(dots[i].x,dots[i].y,mouseX,mouseY);
        if(d<25){
            var b =true;
            for(var j = 0;j<c.length;j++){
                if(dots[i].id==c[j]){
                    b = false;
                }
            }
            if(b){
                c.push(dots[i].id);        
               currentPass+=dots[i].id+1;                   
               p.innerHTML=currentPass;
            }
        }
    }
}
function drawLines(r,g,b) {
    drawDots();
    stroke(r,g,b);
    strokeWeight(10);
    for(var i = 0 ;i<c.length-1;i++){
        line(dots[c[i]].x,dots[c[i]].y,dots[c[i+1]].x,dots[c[i+1]].y);
    }
    
    if(c.length>0 && c.length<9 && touched){
        line(mouseX,mouseY,dots[c[c.length-1]].x,dots[c[c.length-1]].y);
    }
}

function check(){
    if(currentPass !=""){
        if(currentPass == pass) {
            fill(200,100,100);
            drawDots();    
            alert("Unlocked 😎,Leave a like");
            reset();
            p.innerHTML = "";
        }else{
            drawLines(200,100,100);
            reset();
        }
    }
}
 
function drawDots(){
    background(100);
    for (var i = 0; i<dots.length; i++) {
        dots[i].display();
    }
}

function reset(){
    c = [];
    currentPass = "";
}

function Dot(id,loc){
    this.id=id;
    this.x = loc.x;
    this.y = loc.y;
    this.display = function () {
        noStroke();
        fill(255);
        ellipse(this.x,this.y,20,20);
    }
}
function Vector(x,y){
    this.x = x ;
    this.y = y ;
}