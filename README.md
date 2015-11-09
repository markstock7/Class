# MPClass
A javascript inheritance function works just like opp
### Here is some example 
<pre>
var CLS = MPClass(function(){
	var privateAttr = 'p1';
	function privateFn(){	//define private method in here };
	var setStatic = function(scope){
		_.extend(scope,{
			staticFn : function(){
				return 'this is static funtion'
			}
		});
	}
	return {
	    setStatic : funtion(scope){
	    	setStatic(scope);
	    },
	    init : function(){
	    	// define constructor in here, and it will call its father's init first
	    }
	    publicFn : function(){ //define public method in here },
	    publicAttr : 'publicAttr'
	}
}());

var CLS2 = CLS.extend(function(){
	//inherit from CLS, And we can define its own properties
}());
</pre>
