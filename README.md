# MPClass
A javascript inheritance function works just like opp
### Here is some example 
<pre>
var Shape = MPClass({
	    init : function(a,b){
		      this.a = a;
		      this.b = b;
	    },
	    add : function(){
		      return this.a+this.b;
	    }
  });
  var shape = new Shape(1,2);
  //shape.add() === 3
  var Trangle = Shape.extend({
	    init : function(a,b,c){
		      this.c = c;
	    },
	    add : function(){
		      return this.a+this.b+this.c;
	    }
  });
  var trangle = new Trangle(1,2,3);
  //shape.add() === 6
  trangle.is(Trangle);  // true;
  trangle.is(Shape);    // true;
</pre>
If you want to add some private methods or some private param,you can write like following
<pre>
	var Cls = MPClass(function(){
		var private_param = 1;
		var private_method = function(){
		
		}
		return {
			public_method = function(){}
		}
	}());
	var cls = new Cls();
</pre>
