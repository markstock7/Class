(function(global){
	var MPClass = (function(){
		var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
		var MPClass = function(prop){
			return  MPClass.extend.call(MPClass,prop);
		};
		MPClass.fn = MPClass.prototype = {
			constructor : MPClass,
			// we can add some prototype function in here
			hasattr : function(){},
			getattr : function(){},
			dir : function(){},
			setattr: function(){},
			init:function(){}
		};
		MPClass.extend = function(prop) {
			// 原型链继承
			initializing = true;
			var proto, _super;
			if (this === MPClass) {
				proto = _.extend({},this.fn);
				_super = _.extend({},this.fn);
			} else {
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
							// 保留其原有的_super通同名函数
							var tmp = this._super;
							// 调用其父方法中的同名函数
							this._super = _super[name];
							var ret = fn.apply(this, arguments);
							this._super = tmp;
							return ret;
						};
					})(name, prop[name]) : prop[name];
			}

			// 包装构造函数
			if(!initializing && proto.init){
				var fn = proto.init;
				proto.init = (function(){
					return function(){
						_super['init'].apply(this,arguments);
						fn.apply(this,arguments);
					}
				}());
			} else {
				throw 'Missing init function';
			}
			function Class() {
				// 构造函数自动运行
				if (!initializing && this.init){
					this.init.apply(this,  _.toArray(arguments));
				}
			}
			/**
			 * 继承父类的静态方法
			 */
			var parent = this.constructor,
				s;
			for(s in parent){
				if(parent.hasOwnProperty(s) && !(s in Class)){
					Class[s] = parent[s];
				}
			}
			/**
			 * 自己的静态方法,不会覆盖从父类继承过来的
			 */
			if(_.isFunction(setStatic)) {
				var statics = setStatic() || {};
				for (s in statics) {
					if (!(s in Class)) {
						Class[s] = statics[s];
					}parent
				}
			}
			Class.prototype = proto;
			Class.constructor = Class;

			Class.extend = arguments.callee;
			return Class;
		};
		return MPClass;
	})();
	global.MPClass = MPClass;
})(global);
