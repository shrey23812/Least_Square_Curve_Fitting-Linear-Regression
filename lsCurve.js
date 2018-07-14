class LeastSquareCurve{
	constructor(width){
		this.width=width;
	}

	fit(vector_a, b){
		var degreelist = document.getElementById("degreelist");
		var degree = degreelist.options[degreelist.selectedIndex].value;  // The degree of the polynomial chosen by user
		var A = []; //A in Ax=b 	
		for(var j=0; j<vector_a.length; j++){	
			var i = 0;
			var vector_cx=[];
			while(i<=degree) {
					vector_cx.push(Math.pow(vector_a[j],i)/this.width); //pushes the coefficients of x upto n degree for single point
				i++;
			};
			A.push(vector_cx);// push the x coefficients of all points
		}

		
		return math.multiply(math.multiply(math.inv(math.multiply(math.transpose(A), A)),math.transpose(A)),b); //The main function to calculate error
	}
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pixelColor = "#FF0000";
var pixelClass = 1;

var vector_a = [];
var b = []; // b in Ax=b




//Background
context.fillStyle = "#FFFFFF";
context.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", function(e) {
		var rect = canvas.getBoundingClientRect();

		var x_ = (e.x - rect.left)*canvas.width/parseInt(canvas.style.width) ;
		var y_ = (e.y - rect.top)*canvas.height/parseInt(canvas.style.height) ;

		//console.log(x_ + ", " + y_);
		
		context.fillStyle = pixelColor;
		context.fillRect(Math.floor(x_) , Math.floor(y_), 2, 2);
				
		vector_a.push(x_);
		b.push(y_/canvas.width);//pushes constants
}, true);


function refreshCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  //Clear the arrays
  vector_a = [];
  b = [];
}

function fitLine(){
	
	ls = new LeastSquareCurve(canvas.width);
	var i,j,sum,eq;
	var answer = ls.fit(vector_a,b);// answer has the solution for x []
	
	context.beginPath();
	
	context.moveTo(0,answer[0]);
	for (i=0; i< canvas.width; i++){
		sum=0;
		for(j=0; j<answer.length; j++){
			sum+=Math.pow(i,j)*answer[j];
		}
		context.lineTo(i, sum); // Draws the curve
	}	
	
	context.lineWidth = 1;
	context.strokeStyle = '#00ff00';
	context.stroke();
	for(j=0; j<answer.length; j++){
		console.log(answer[j]+"x^"+j);
	 	eq += answer[j] + "x^" + j;
	}
	console.log(eq);

	document.getElementById("div1").innerHTML = "Equation of curve : " + eq ;
}
