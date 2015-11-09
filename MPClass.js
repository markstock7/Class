(function(global){
	var MPClass = (function(){
		var initializing = false,
			fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /,*/;
		var MPClass = function(prop){
			return  MPClass.extend.call(MPClass,prop);
		};
		MPClass.fn = MPClass.prototype = {
			constructor : MPClass,
			// we can add some prototype function in here
			is : function(parent){
				return (this.parent === parent || this.me === parent) ? true : false;
			},
			hasattr : function(){
				
			},
			getattr : function(){
				
			},
			dir : function(){
				
			},
			setattr: function(){
				
			}
		};
		MPClass.extend = function(prop) {
			initializing = true;
			var proto, _super;
			if (this === MPClass) {
				proto = _.extend({},this.fn);
				_super = _.extend({},this.fn);
			}
			else {
				proto = new this();
				_super = this.prototype;
			}
			initializing = false;
			var setStatic;
			if('setStatic' in prop){
				setStatic = prop['setStatic'];
				delete prop['setStatic'];
			}
			for (var name in prop) {
				proto[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" &&
				fnTest.test(prop[name]) ?
					(function (name, fn) {
						return function () {
							var tmp = this._super;
							this._super = _super[name];
							var ret = fn.apply(this, arguments);
							this._super = tmp;
							return ret;
						};
					})(name, prop[name]) : prop[name];
			}
			function Class() {
				if (!initializing && this.init){
					if(_super['init'] && typeof _super['init'] === 'function')
						_super['init'].apply(this,arguments);
					this.init.apply(this, arguments);
				}
			}
			if(_.isFunction(setStatic))
				setStatic(Class);
			Class.prototype = proto;
			Class.constructor = Class;
			Class.prototype.parent = this.constructor;
			Class.prototype.me = Class;
			Class.extend = arguments.callee;
			return Class;
		};
		return MPClass;
	})();
	global.MPClass = MPClass;
})(global);
