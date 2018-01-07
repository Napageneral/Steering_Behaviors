var font;
var vehicles=[];

//var texts = ['Hey','Dena','How\'s it going?','I think','I\'m starting to','get the hang','of this'];
//var texts = ['Hey Dad','I think','I\'m starting to','get the hang of this'];
//var texts = ['Hey Mom','I think','I\'m starting to','get the hang of this'];
//var texts = ['Sup Blaze Birds','Don\'t you hate it when...','Your dad gets you'];
//var texts=['train'];
var texts=['What\'s Up Connor','I would like to make this','as a page on my website','to take the place of a gift'];
var nextT=0;
var maxChangeForce=20;
var fontsize=160;

function preload(){
	font=loadFont('AvenirNextLTPro-Demi.otf');
}


function setup() {
	createCanvas(windowWidth,windowHeight);
	background(51);

	var bounds=font.textBounds(texts[nextT],0,0,fontsize,{
			sampleFactor: 0.1
	});
	var posx=width/2-bounds.w/2;
	var posy=height/2+bounds.h/2;

	var points=font.textToPoints(texts[nextT],posx,posy,fontsize);

	for(var i=0;i<points.length;i++){
		var pt = points[i];
		var vehicle=new Vehicle(pt.x,pt.y);
		vehicles.push(vehicle);
	}
}

function draw() {
	background(51);
	for(var i=0;i<vehicles.length;i++){
		var v=vehicles[i];
		v.behavior();
		v.update();
		v.show();
	}
}

function mouseClicked(){
	nextT++;
	if(nextT>texts.length-1){
		nextT=0;
	}

	var bounds = font.textBounds(texts[nextT], 0, 0, fontsize);
  var posx = width / 2 - bounds.w / 2;
  var posy = height / 2 + bounds.h / 2;

  var points = font.textToPoints(texts[nextT], posx, posy, fontsize, {
      sampleFactor: 0.1
  });

	if (points.length < vehicles.length) {
        var toSplice = vehicles.length - points.length;
        vehicles.splice(points.length - 1, toSplice);

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    } else if (points.length > vehicles.length) {

        for (var i = vehicles.length; i < points.length; i++) {
            var v = vehicles[i - vehicles.length].clone();

            vehicles.push(v);
        }

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }

    } else {
        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    }
}
