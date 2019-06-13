(function($, win) {
	'use strict';
	var global = this || Function('return this')(),
		RegExp = global.RegExp, Object = global.Object;
	var SUPER = '_super',
		CTOR_NAME = '_init',
		PROTO = 'prototype',
		initializing = false,
		fnTest = /xyz/.test(function(){return 'xyz';}) ? new RegExp('\\b' + SUPER + '\\b') : /.*/;
	var // Style tokens.
	STYLES = {
		'backgroundColor' : 1,
		'backgroundRepeat': 1,
		'border'          : 1,
		'borderBottom'    : 1,
		'color'           : 1,
		'cursor'          : 1,
		'display'         : 1,
		'filter'          : 1,
		'font'            : 1,
		'fontWeight'      : 1,
		'height'          : 1,
		'left'            : 1,
		'lineHeight'      : 1,
		'overflow'        : 1,
		'overflowX'       : 1,
		'padding'         : 1,
		'position'        : 1,
		'styleFloat'      : 1,
		'textAlign'       : 1,
		'top'             : 1,
		'whiteSpace'      : 1,
		'width'           : 1,
		'verticalAlign'   : 1,
		'zIndex'          : 1,
		'tableLayout'     : 1,
		'zoom'            : 1
	},
	// Add in properties whose names you wish to fix before
	// setting or getting the value
	ATTR_PROPS = {
		'for': 'htmlFor',
		'class': 'className',
		'html': 'innerHTML',
		readonly: 'readOnly',
		maxlength: 'maxLength',
		cellspacing: 'cellSpacing',
		rowspan: 'rowSpan',
		colspan: 'colSpan',
		tabindex: 'tabIndex',
		usemap: 'useMap',
		frameborder: 'frameBorder'
	};

	// Save a reference to some core methods
	var OP = Object[PROTO],
		toString = OP.toString,
		hasOwn = OP.hasOwnProperty,
		slice = Array[PROTO].slice,
		nativeBind = Function[PROTO].bind,
		empty = {},
		os = {toString: 1},
		hasEnumBug = !os['propertyIsEnumerable']('toString'),
		extraNames = !hasEnumBug ? [] : ['propertyIsEnumerable', 'hasOwnProperty', 'valueOf', 'isPrototypeOf',
			'toLocaleString', 'toString', 'constructor'],
		extraLen = extraNames.length,
		empty = {};
		// ES5 {{{

		/** Fix for required method in ECMA-262 5th Edition */
		//
		// String
		// ======
		//
		// ES5 15.5.4.20
		if (!String.prototype.trim) {
			// http://blog.stevenlevithan.com/archives/faster-trim-javascript
			// http://perfectionkills.com/whitespace-deviations/
			var s = '[\x09\x0A\-\x0D\x20\xA0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]';
			var trimBeginRegexp = new RegExp('^' + s + s + '*');
			var trimEndRegexp = new RegExp(s + s + '*$');
			String.prototype.trim = function() {
				return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
			};
		}
	/**
	 * summary:
	 *
	 * Adds all properties and methods of source to target. This addition
	 * is "prototype extension safe", so that instances of objects
	 * will not pass along prototype defaults.
	 */
	var mix = function(/*Object*/ r, /*Object*/ s, /*Boolean*/ overwrite, /*Array*/ whitelist) {

		var exists, l, k, v;

		if (!r || !s) return;//瑕佹湁婧愬拰鐩爣

		if (whitelist) {//鐧藉悕鍗�

			l = whitelist.length;
			while (l--) {
				k = whitelist[l];

				if (!hasOwn.call(s, k)) {
					continue;
				}

				// The `k in to` check here is (sadly) intentional for backwards
				// compatibility reasons. It prevents undesired shadowing of
				// prototype members on `receiver`.
				exists = overwrite ? false : key in r;

				if (overwrite || !exists) r[k] = s[k];
			}
		}
		else {

			for (k in s) {
				// the "empty" condition avoid copying properties in "s"
				// inherited from Object.prototype.  For example, if obj has a custom
				// toString() method, don't overwrite it with the toString() method
				// that props inherited from Object.prototype
				v = s[k];
				if (!(k in r) || (overwrite && r[k] !== v && (!(k in empty) || empty[k] !== v))) {
					r[k] = v;
				}
			}

			// IE doesn't recognize some custom functions in for..in
			if (hasEnumBug && (l = extraLen)) while (l) {
				k = extraNames[--l];
				v = s[k];
				if (!(k in r) || (r[k] !== v && (!(k in empty) || empty[k] !== v))) { r[k] = v; }
			}
		}

		return r;
	},
	mixin = function(r, s /*, force */) {

		var args = slice.call(arguments, 1),
			i = -1,
			l = args.length,
			force = typeof args[l - 1] === 'boolean' && !!args[--l];

		if (s === undefined) {
			args[0] = s = r;
			r = this;
		}
		while (i < l) mix(r, args[++i], force);

		return r;
	},
	getProp = function( /*Array*/ parts, /*Boolean*/ create, /*Object?*/ context) {
		var obj = context || global;
		for (var i = 0, p; obj && (p = parts[i]); i++) {
			obj = (p in obj ? obj[p] : (create ? obj[p] = {} : undefined));
		}
		return obj; // mixed
	},
	setObject = function( /*String*/ name, /*Object*/ value, /*Object?*/ context, /*Boolean?*/ overwrite) {
		var parts = name.split('.'), p = parts.pop(), obj = getProp(parts, true, context);
		if (obj && p) {
			if (!overwrite && value && typeof value === 'object' && obj[p] !== undefined) {
				obj = obj[p] || (obj[p] = {});
				for (p in value) {
					if (hasOwn.call(value, p)) {
						obj[p] = value[p];
					}
				}
			} else {
				obj[p] = value;
			}
			return value;
		}
	},
	/**
	 * @method declare
	 *
	 * @param {function|object|string} receiver Object to be augmented or a
	 * `namespace` from a dot-separated string, If any part of the requested namespace
	 * already exists, the current object will be left in place.
	 * @param {function|object} supplier Object that supplies the prototype properties with
	 * which to augment the _receiver_.
	 * @param {boolean} [overwrite=false] If `true`, properties already on the receiver
	 * will be overwritten if found on the supplier.
	 * @return The value augmented.
	 */
	declare = function(receiver, supplier, force) {
		if (typeof receiver === 'string') {
			return setObject(receiver, supplier, this, force);
		} else {
			if (typeof supplier !== 'object') {
				supplier = receiver;
				receiver = this;
			}
			if (supplier) {
				mix(receiver, supplier, force);
				return supplier;
			}
			return null;
		}
	},
	create = Object.create || (function() {
		// Reusable constructor function for the Object.create() shim.
		function F() {}

		// The actual shim.
		return function(o) {
			F.prototype = o;
			return new F;
		};
	}()),
	extend = function(r, s, px, sx) {
		if (!s || !r) {
			R.error('extend failed, verify dependencies');
		}

		var sp = s.prototype, rp = create(sp);
		r.prototype = rp;

		rp.constructor = r;
		r.superclass = sp;

		// assign constructor property
		if (s !== Object && sp.constructor === octor) {
			sp.constructor = s;
		}

		// add prototype overrides
		if (px) {
			mixin(rp, px, true);
		}

		// add object overrides
		if (sx) {
			mixin(r, sx, true);
		}

		return r;
	},
	/**
	 * Creates a class and returns a constructor function for instances of
	 * the class. Calling the constructor function (typically as part of a
	 * new statement) will invoke the `_init` method.
	 *
	 * @param {string} name The class name (with pkgs) to define.
	 * @param {function} superctor The super constructor been inherited.
	 * @param {function} factory The definition factory.
	 */
	klass = function(name, superctor, factory){
		var tf;
		//fixes args
		if (typeof name !== 'string') {
			alert('class create failed, verify definitions');
		}
		if(!factory) {
			if (!superctor) {
				alert('class create failed, verify definitions');
				return;
			}
			factory = superctor;
			superctor = null;
		}
		function F(){
			if (!initializing) {
				if (superctor) {
					this._superprototype = superctor[PROTO];
				}
				this[CTOR_NAME].apply(this, arguments);
			}
		}
		function methods(factory){
			for (var key in factory){
				if(factory.hasOwnProperty(key)) {
					// 濡傛灉姝ょ被缁ф壙鑷埗绫籹uperctor&&鐖剁被鍘熷瀷涓瓨鍦ㄥ悓鍚嶅嚱鏁発ey&&鍑芥暟涓皟鐢ㄧ埗绫诲嚱鏁�
					if(superctor &&
						typeof (factory[key]) === "function" &&
						typeof (F[PROTO][key]) === "function" &&
						fnTest.test(factory[key])) {
							F[PROTO][key] = (function(key, fn) {
							return function() {
							this[SUPER] = superctor[PROTO][key];
							return fn.apply(this, arguments);
							};
						})(key, factory[key]);
					}else{
						F[PROTO][key] = factory[key];
					}
				}
			}
		}
		if(superctor){
			initializing = true;
			F[PROTO] = new superctor();
			F[PROTO].constructor = F;
			initializing = false;
		}

		tf = typeof factory;
		if(tf === 'object'){
			methods(factory);
		}else if (tf === 'function'){
			factory.call(F[PROTO], superctor ? superctor[PROTO] : null);
		}

		if (name) {
			F[PROTO].$name = name.split('.').pop();
			F[PROTO].$namespace = name;

			// host it to currently sandbox.
			R.declare(name, F);
		}
		return F;
	},
	clone = function(obj) {
		var o, k, l;
		if (obj && typeof obj === 'object') {
			l = obj.length;
			if (typeof l === 'number') {
				o = new Array(l);
				while (l--) o[l] = clone(obj[l]);
			} else {
				o = {};
				for (k in obj) {
					if (obj.hasOwnProperty(k)) {
						o[k] = clone(obj[k]);
					}
				}
			}
			return o;
		}
		return obj;
	},
	/**
	 * Returns a function that will be executed at most one time, no matter how
	 * often you call it. Useful for lazy initialization.
	 *
	 * @method once
	 * @param {function} fn The function need to lazy initialize.
	 * @return {function}
	 */
	once = function(fn) {
		var ran = false, memo;
		return function() {
			if (ran) return memo;
			ran = true;
			return memo = fn.apply(this, arguments);
		};
	};
	// 鐗规€ф娴�
	var support = function() {
		var div, p, a;

		div = document.createElement('div');
		div.className = 'a';
		div.innerHTML = '<p style="color:red;"><a href="#" style="opacity:.45;float:left;">a</a></p>';
		div.setAttribute('class', 't');
		
		p = div.getElementsByTagName('p')[0];
		a = p.getElementsByTagName('a')[0];
		
		var setAttr = div.className === 't',
			cssText = /;/.test(p.style.cssText),
			opacity = /^0.45$/.test(a.style.opacity),
			getComputedStyle = !!(document.defaultView && document.defaultView.getComputedStyle);
		
		return {
			setAttr : setAttr,
			cssText : cssText,
			opacity : opacity,
			classList : !!div.classList,
			cssFloat : !!a.style.cssFloat,
			getComputedStyle : getComputedStyle
		};
	}();

	function R(){}
	mix(R, {
			'declare' : declare,
			'klass'   : klass,
			'clone'   : clone,
			'once'    : once
	});
	R.declare('dom', {
		getViewPort : function(el) {
			el = el || document.documentElement;
			var rect = {
				"x": el.scrollLeft,
				"y": el.scrollTop,
				"w": el.clientWidth,
				"h": el.clientHeight,
				"sw": Math.max(el.clientWidth, el.scrollWidth),
				"sh": Math.max(el.clientHeight, el.scrollHeight)
			};
			return rect;
		},
		setOpacity: function(el, val) {
			if(support.opacity) {
				el.style.opacity = (val === 1 ? '' : '' + val);
			}
			else {
				el.style.filter = 'alpha(opacity=' + val * 100 + ');';
				el.style.zoom = 1;
			}
		},
		createElement : function(el, props, style, context) {
			if (!el) return null;

			var html, k, n;
			context = context || document;

			if (el.toUpperCase() === 'TABLE') {
				el = '<table>' + (props.html || props.innerHTML || '') + '</table>';
			}

			if (el.charAt(0) === '<') {

				// Convert html string into DOM nodes
				if (!rhtml.test(el)) {
					return context.createTextNode(el);

				} else {
					// Fix "XHTML"-style tags in all browsers
					el = el.replace(rxhtmlTag, '<$1></$2>');

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = (rtagName.exec(el) || ['', ''])[1].toLowerCase(),
						wrap = wrapMap[tag] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement('div');

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + el + wrap[2];

					// Move to the right depth
					while (depth--) div = div.lastChild;

					el = div.lastChild;
				}

				if (props) {
					n = props.html ? 'html' : props.innerHTML ? 'innerHTML' : '';
					n && delete props[n];
				}

			} else {
				el = context.createElement(el);
			}

			if (props) for (k in props) R.dom.setAttribute(el, k, props[k]);
			if (style) for (k in style) el.style[k] = style[k];

			return el;
		},
		/**
		 * Append a new node to the specific parentNode with rich properties.
		 *
		 * @method appendNode
		 * @param {HtmlElement} parent The target node reference will append to.
		 * @param {string} tag The new node tagname or html strings.
		 * @param {object} props properties mixes with attributes and styles.
		 */
		node: function(parent, tag, props) {
			var el, k, attrs = {}, styles = {};

			for (k in props) {
				(STYLES[k] ? styles : attrs)[k] = props[k];
			}
			el = R.dom.createElement(tag, attrs, styles, parent && parent.ownerDocument);

			if (parent) {
				parent.appendChild(el);
				if (el.nodeType === 0x0B) { // Node.DOCUMENT_FRAGMENT_NODE
					el = parent.lastChild;
				}
			}

			return el;
		},
		setAttribute : function(el, p, v) {
			p = ATTR_PROPS[p] || p;

			// TODO: Make sure the element has the ability to set an attribute
			if (p === 'className' || p === 'innerHTML') {
				el[p] = v;
			} else {
				// If the user is setting the value to true,
				// Set it equal to the name of the attribute
				// (handles boolean attributes nicely)
				el.setAttribute(p, v === true ? p : v);

				// TODO: handle property name equ `style`;
			}
		},
		setWH: function(el, w, h) {
			var txt = 'width:' + w + 'px;height:' + h + 'px';
			this.setCSSText(el, txt);
		},
		setCSSText: function(el, strCss) {
			var sty = el.style, cssText = sty.cssText || '';
			if (!support.cssText) {
				cssText += ';';
			}
			sty.cssText = cssText + strCss;
		}
	});
	/*涓轰互鍚庤劚绂籮query*/
	R.declare('event', {
		on : function(el, type, fun, scope){
			if (!el || (typeof type === 'string' && !fun)) {
				console.log('addListener failed, invalid element or callback');
			}
			$(el).on(type, {"me":scope}, fun);
		},
		un : function(el, type, fn) {
			$(el).off(type, fn);
		},
		trigger : function(el, type){
			$(el).trigger(type);
		}
	});
	R.declare('string', {
		encodeHTML : function(el) {
			el = el || document.documentElement;
			var rect = {
				"x": el.scrollLeft,
				"y": el.scrollTop,
				"w": el.clientWidth,
				"h": el.clientHeight
			};
			return rect;
		}
	});
	/**
	 * @date helper methods declarations.
	 */
	R.declare('date', {// {{{

		/**
		 * Parse date string to date instance with a specific format.
		 */
		parse: function(date, format) {
			format || (format = 'yyyy-MM-dd');
			format = format.replace(/\W/g, ',').split(',');
			date = date.replace(/\D/g, ',').split(',');
			var y = 2E3, M = 0, d = 1, h = 0, m = 0, s = 0, N = Number;
			R.each(format, function(v, i) {
				if (date[i] !== '' && !isNaN(date[i])) {
					if (find(v, 'y')) y = N(date[i]);
					if (find(v, 'M')) M = N(date[i]) - 1;
					if (find(v, 'd')) d = N(date[i]);
					if (find(v, 'h')) h = N(date[i]);
					if (find(v, 'm')) m = N(date[i]);
					if (find(v, 's')) s = N(date[i]);
					if (find(v, 'w')) s = N(date[i])
				}
			});
			return new Date(y, M, d, h, m, s);
		},

		/**
		 * TODO: Format data string with a specific format string.
		 * @param {date} date The date instance to format.
		 * @param {string} format The {IFormat} string.
		 * @return {string} string value.
		 */
		format: function(date, format) {

			var y = date.getFullYear(),
				m = date.getMonth() + 1,
				d = date.getDate(),
				h = date.getHours(),
				n = date.getMinutes(),
				s = date.getSeconds();

			switch (format) {
			case 10:
				// yyyy骞磎鏈坉鏃�(鏄熸湡浜�) 涓嬪崍02:29
				return y + '骞�' + m + '鏈�' + d + '鏃�' + '(鏄熸湡' + ('鏃ヤ竴浜屼笁鍥涗簲鍏�'.charAt(date.getDay())) + ') ' + (['涓婂崍', '涓嬪崍'][date.getHours() < 12 ? 0 : 1]) + (h < 10 ? '0' + h : h) + ':' + (n < 10 ? '0' + n : n);
			default:
				return y + '-' + m + '-' + d + ' ' + h + ':' + n + ':' + s;
			}
		}
	});
R.klass('ui.Component', function() {
		var DOM = R.dom,
			/** @singleton */
			getModalPanel = R.once(function() {
				var panel = new R.ui.ModalPanel(), obj = document.createElement('div');
				panel.init(obj);
				panel.setVisible(false);
				document.body.appendChild(obj);
				obj = null;
				return panel;
			}),
			getModalPanel1 = function() {
				var panel = new R.ui.ModalPanel(), obj = document.createElement('div');
				panel.init(obj);
				panel.setVisible(false);
				document.body.appendChild(obj);
				obj = null;
				return panel;
			};
		this._init = function(){
			this._parent = null;//鐖跺鍣�
			this._doc = null;
			this._self = null;
			this._width = null;
			this._height = null;
			this._dockRect = {x: 0, y: 0, w: 0, h: 0}; //鍋滈潬浠ュ悗缁勪欢鐨勪綅缃俊鎭�
		};
		this.init = function(obj){
			this._self = obj;
		};
		/**
		 * @method initParentDocEnv
		 * @param {Document} parent DOM鍏冪礌
		 * @desc 鍒濆鍖杦indow锛宒ocument绛夌幆澧�
		 */
		this.initParentDocEnv = function(obj) {
			if (obj) {
				this._parent = obj;
				if (!this._doc) {
					var doc = this._doc = obj.ownerDocument || (obj._self && obj._self.ownerDocument) || document;
					this._win = doc.parentWindow || doc.defaultView;
				}
			}
		};
		this.resize = function(w, h) {
			this.setWidth(Number(w));
			this.setHeight(Number(h));
		};
		/**
		 * @method setWidth
		 * @param {Number} v 瀹藉害鍊�
		 * @desc  璁剧疆缁勪欢鐨勫搴�
		 */
		this.setWidth = function(v) {
			v = !v || v < 0 ? 0 : v;
			this._width = v;
			this.setStyle('width', v + 'px');
			if (this._dockRect.w == 0) this._dockRect.w = v;
		};

		/**
		 * @method setHeight
		 * @param {Number} v 瀹藉害鍊�
		 * @desc  璁剧疆缁勪欢鐨勯珮搴�
		 */
		this.setHeight = function(v) {
			v = !v || v < 0 ? 0 : v;
			this._height = v;
			this.setStyle('height', v + 'px');
			if (this._dockRect.h == 0) this._dockRect.h = v;
		};
		/**
		 * @method setStyle
		 * @param {Strinng} name 鏍峰紡鍚嶇О
		 * @param {Object} value 鏍峰紡鍊�
		 * @desc  璁剧疆缁勪欢鎵€鍏宠仈鐨凞OM鍏冪礌鐨� name 鏍峰紡鍊�
		 */
		this.setStyle = function(name, value) {
			this._self.style[name] = value;
		};
		/**
		 * @method getViewPort
		 * @return {Object}
		 * @desc   鑾峰彇缁勪欢鐨勭煩褰俊鎭紝鍖呮嫭x锛寉锛屽搴﹀拰楂樺害绛夈€�
		 */
		this.getViewPort = function() {
			var node = this._self;
			return {
				'x': node.scrollLeft,
				'y': node.scrollTop,
				'w': node.clientWidth,
				'h': Math.max(node.clientHeight, node.parentNode.clientHeight)
			};
		};
		/**
		 * @method moveTo
		 * @param {Number} x x鍧愭爣
		 * @param {Number} y y鍧愭爣
		 * @desc  鎶婄粍浠剁Щ鍔ㄥ埌(x, y)浣嶇疆
		 */
		this.moveTo = function(x, y) {
			this.setLeft(x);
			this.setTop(y);
		};
		/**
		 * @method moveToCenter
		 * @desc   鎶婄粍浠剁Щ鍔ㄥ埌鐖跺鍣ㄧ殑涓績浣嶇疆
		 */
		this.moveToCenter = function() {
			var rect = this._parent && this._parent.getViewPort ? this._parent.getViewPort() : DOM.getViewPort(),
				scrolltop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                scrollleft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                dw = this._width || this._self.offsetWidth,
				dh = this._height || this._self.offsetHeight;
			this.moveTo(scrollleft + rect.x + Math.round((rect.w - dw) / 2), scrolltop + rect.y + Math.round((rect.h - dh) / 2));
		};
		/**
		 * @method setLeft
		 * @param {Number} v
		 * @desc  璁剧疆缁勪欢鐨剎鍧愭爣
		 */
		this.setLeft = function(v) {
			this._left = v;
			this.setStyle('left', v + 'px');
		};

		/**
		 * @method setTop
		 * @param {Number} v
		 * @desc  璁剧疆缁勪欢鐨剏鍧愭爣
		 */
		this.setTop = function(v) {
			this._top = v;
			this.setStyle('top', v + 'px');
		};
		/**
		 * @method showModal
		 * @param {Boolean} v 鏄惁鏄剧ず閬僵
		 * @desc 鏄惁鏄剧ず閬僵
		 */
		this.showModal = function(v) {
			var panel = getModalPanel();
			return panel.setVisible(v);
		};
		/**
		 * @method setVisible
		 * @param {Boolean} v
		 * @desc  璁剧疆缁勪欢鏄惁鍙
		 */
		this.setVisible = function(v) {
			if (v == this._visible) return;
			this._visible = v;
			if (v) {
				this.setStyle('display', ',A,B,I,U,SPAN,INPUT,BUTTON,'.indexOf(this._self.tagName) != -1 ? '' : 'block');
			} else {
				this.setStyle('display', 'none');
			}
		};
		/**
		 * @method setOpacity
		 * @param {Number} v
		 * @desc  璁剧疆缁勪欢鐨勪笉閫忔槑搴︼紝鍙敤鍊间负0-1
		 */
		this.setOpacity = function(v) {
			if (this._opacity != v) {
				this._opacity = v;
				DOM.setOpacity(this._self, v)
			}
		};
	});
	// }}}
	/* 浜嬩欢浠ｇ悊绫� 锛屼负鎸囧畾鍏冪礌鍐呯殑鎵€鏈夊瓙鍏冪礌瀹炵幇浠ｇ悊
	*
	* var delegate =
	*  new R.util.Delegation(
	*      el,   浠ｇ悊鍏冪礌
	*      type, 浜嬩欢绫诲瀷  鍙€�(榛樿click)
	*      hook, 浜嬩欢婧愭爣璇� 鍙€�(榛樿"_act")
	*  );
	*  delegate.add(
	*      'actName', _act鐨勫€�
	*      handler(target, ev, data), 鍝嶅簲鍑芥暟
	*      scope,   鍝嶅簲鍑芥暟鎵ц涓婁笅鏂� 鍙€� (榛樿涓轰簨浠舵簮瀵硅薄)
	*      data,    鍝嶅簲鍑芥暟鐨勫弬鏁� 鍙€� (榛樿涓轰簨浠舵簮瀵硅薄)
	*  );
	*/
	R.klass('util.Delegation', function(){
		var HOOK = '_act',
			E = R.event;
		function getActParent(target, el, attrName) {
			if (!target || target.nodeType !== 1) return null;
			while (target) {
				if (target === el) return null;
				else if (target.getAttribute && target.getAttribute(attrName)) {
					return target;
				}
				target = target.parentNode;
			}
		}
		function makeArray(o){
			Array.prototype.slice.call(o);
		}
		this._init = function(){
			this._self  = this;
			this.el   = null;
			this.type = 'click';
			this.hook = HOOK;
			this.hash = {};

			this.inited = false;
		};
		this.init = function(){
			var args = makeArray(arguments), el;
			this.el = el = arguments[0];
			this.type = arguments[1] || 'click';
			this.hook = arguments[2] || HOOK;
			if(this.inited) return;
			E.on(el, this.type, this.handle, this);
			//el.on(this.type, {"me":this}, this.handle);

			this.inited = true;
		};
		this.dispose = function() {
			var me = this,
				el = me.el;
			E.un(el, me.type || HOOK, me.handle);
			// el.off(me.type || HOOK, me.handle);
			me.el = null;
			for(var a in me.hash){
				me.hach[a] = null;
			}
		};
		this.handle = function( ev ) {
			var me = ev.data.me,
				hook = me.hook,
				target = ev.target,
				action = target.getAttribute( hook ),
				pNode;

			if( !action && ( pNode = getActParent( target, me.el, me.hook) ) ) {
				return exec( pNode );
			}

			exec();

			function exec( srcEl ) {
				var srcEl =  srcEl || target,
					action = action || srcEl.getAttribute( hook ),
					handlerObj = me.hash && me.hash[ action ];

				if(!handlerObj) return;

				var scope   = handlerObj.scope,
					data    = handlerObj.data,
					handler = handlerObj.handler,
					isFunc  = typeof data === 'function';

				if( me.handlerDispatch ) {
					me.handlerDispatch(action, srcEl);
				}

				if( isFunc && data.apply(scope || srcEl, [srcEl]) === false) {
					return;
				}

				// 閬垮厤A鍦ㄦ祻瑙堝櫒鍦板潃鏍忓姞涓�#
				if(target.nodeName !== 'INPUT') {
					ev.preventDefault();
				}
				ev.stopPropagation();

				handler.apply( scope || srcEl, [srcEl, ev, !isFunc && data] );
			}
		};
		this.add = function( action, handler, scope, data ) {
			if(action in this.hash) {
				return;
			}
			this.hash[action] = {
				handler: handler,
				scope: scope,
				data: data
			};
		};
		this.on = function( obj, scope ) {
			var action, actionObj;
			for(action in obj) {
				actionObj = obj[action];
				this.add( action, actionObj.handler, scope || actionObj.scope, actionObj.data );
			}
		};
		this.remove = function( action ) {
			delete this.hash[action];
		};
	});
	/* 鍩烘湰鎷栨嫿绫伙紝璁╀换涓€DOM鍏冪礌鍙嫋鎷�
	 * new R.ui.Dragdrop({
	 *      target   鎷栨嫿鍏冪礌 HTMLElemnt 蹇呴€�
	 *      bridge   鎸囧畾榧犳爣鎸変笅鍝釜鍏冪礌鏃跺紑濮嬫嫋鎷斤紝瀹炵幇妯℃€佸璇濇鏃剁敤鍒�
	 *      dragable 鏄惁鍙嫋鎷�    (true)榛樿
	 *      dragX    true/false false姘村钩鏂瑰悜涓嶅彲鎷栨嫿 (true)榛樿
	 *      dragY    true/false false鍨傜洿鏂瑰悜涓嶅彲鎷栨嫿 (true)榛樿
	 *      area     [minX,maxX,minY,maxY] 鎸囧畾鎷栨嫿鑼冨洿 榛樿浠绘剰鎷栧姩
	 *      cursor   榧犳爣鎷栧姩鏍峰紡 榛樿涓�'move'
	 *      mousedownObj {
	 *          fn 鍒濆鍖栧嚱鏁�,
	 *          scope 鎵ц涓婁笅鏂�
	 *      }
	 *      mouesupObj {
	 *          fn 鍒濆鍖栧嚱鏁�
	 *          scope 鎵ц涓婁笅鏂�
	 *      }
	 *      mousemoveObj {
	 *          fn 鎷栨嫿杩囩▼涓殑鍥炶皟鍑芥暟
	 *          scope 鎵ц涓婁笅鏂�
	 *          params 鍥炶皟鍑芥暟鐨勫弬鏁�(鏁扮粍)
	 *      }
	 * });
	 */
	R.klass('ui.DragDrop', function() {
		var E = R.event;
		this._init = function(){
			this.target     = null;
			this.bridge     = null;
			this.dragable   = true;
			this.dragX      = 0;
			this.dragY      = 0;
			this.area       = null;
			this.mousedownObj = null;
			this.mouseupObj   = null;
			this.mousemoveObj = null;
			this.diffX = 0;
			this.diffY = 0;
			this.cursor = 'move';
		};

		this.init = function(opt){
			this.target     = opt.target;
			this.bridge     = opt.bridge;
			this.dragable   = opt.dragable != false;
			this.dragX      = opt.dragX != false;
			this.dragY      = opt.dragY != false;
			this.area       = opt.area;
			this.cursor     = opt.cursor || 'move';
			this.mousedownObj   = opt.mousedownObj;
			this.mouseupObj     = opt.mouseupObj;
			this.mousemoveObj   = opt.mousemoveObj;
			var elDown = this.bridge || this.target;
			var me = this;
			// E.on(elDown, 'mouseover', function(){
			// 	this.style.cursor = me.cursor;
			// });
			E.on(elDown, 'mouseover', function(){
				this.style.cursor = me.cursor;
			}, this);
			E.on(elDown, 'mousedown', this.onMouseDown, this);


			// elDown.on('mouseover', {"me":this}, function(){
			// 	this.style.cursor = me.cursor;
			// });
			// E.on(elDown, 'mousedown', this.onMouseDown, this);
			// elDown.on('mousedown', {"me":this}, this.onMouseDown);
		};

		this.dragX = function(){
			this.dragX = true;
			this.dragY = false;
		};

		this.dragY = function(b){
			this.dragY = true;
			this.dragX = false;
		};

		this.dragAll = function(){
			this.dragX = true;
			this.dragY = true;
		};

		this.setArea = function(a){
			this.area = a;
		};

		this.setBridge = function(b){
			this.bridge = b;
		};

		this.setDragable = function(b){
			this.dragable = b;
		};

		this.getDragX = function(){
			return this.dragX;
		};

		this.getDragY = function(){
			return this.dragY;
		};

		this.onMouseDown = function(e){
			var _this = e.data.me,
				el = _this.target,
				mousedownObj = _this.mousedownObj;
			// console.log('down');
			
			el.style.position = 'absolute';

			if(mousedownObj && mousedownObj.fn){
				mousedownObj.fn.call(mousedownObj.scope);
			}
			if(window.captureEvents){ //鏍囧噯DOM
				e.stopPropagation();
				e.preventDefault();
				$(window).on('blur', {"me":_this}, _this.onMouseUp);
				// E.on(window, "blur", this.onMouseUp, this);
			}else if(el.setCapture){ // IE
				el.setCapture();
				e.cancelBubble = true;
				$(el).bind('losecapture', {"me":_this}, _this.onMouseUp);
				// E.on(el, "losecapture", this.onMouseUp, this);
			}
			_this.diffX = e.clientX - el.offsetLeft;
			_this.diffY = e.clientY - el.offsetTop;
			$(document).on('mousemove', {"me":_this}, _this.onMouseMove);
			$(document).on('mouseup', {"me":_this}, function(e){
				e.data.me.onMouseUp(e);
			});
			// E.on(document, 'mousemove', this.onMouseMove, this);
			// E.on(document, 'mouseup', this.onMouseUp, this);
		};

		this.onMouseMove = function(e){
			var _this = e.data.me,
				el = _this.target,
				moveX = e.clientX - _this.diffX,
				moveY = e.clientY - _this.diffY;

			var minX, maxX, minY, maxY;
			if(_this.area){
				minX = _this.area[0];
				maxX = _this.area[1];
				minY = _this.area[2];
				maxY = _this.area[3];
				moveX < minX && (moveX = minX); // left 鏈€灏忓€�
				moveX > maxX && (moveX = maxX); // left 鏈€澶у€�
				moveY < minY && (moveY = minY); // top 鏈€灏忓€�
				moveY > maxY && (moveY = maxY); // top 鏈€澶у€�
			}
			if(_this.dragable){
				//璁剧疆浣嶇疆锛屽苟淇margin
				moveX = moveX - (parseInt(el.style.marginLeft, 10) || 0);
				moveY = moveY - (parseInt(el.style.marginTop, 10) || 0);
				_this.dragX && (el.style.left = moveX + 'px');
				_this.dragY && (el.style.top =  moveY + 'px');
				var mousemoveObj = _this.mousemoveObj;
				if(mousemoveObj) {
					mousemoveObj.fn.apply(mousemoveObj.scope);
				}
			}
		};

		this.onMouseUp = function(e){
			// console.log('ss1');
			// var el = this.target,
			// 	mouseupObj = this.mouseupObj;
			var _this = e.data.me,
				el = _this.target,
				mouseupObj = _this.mouseupObj;
			_this.bridge.style.cursor = '';
			// console.log('ss');
			if(mouseupObj && mouseupObj.fn){
				mouseupObj.fn.call(mouseupObj.scope);
			}
			$(document).unbind('mousemove');
			$(document).unbind('mouseup', _this.onMouseUp);
			// E.un(document, 'mousemove', this.onMouseMove);
			// E.un(document, 'mouseup'v, this.onMouseUp);
			if(window.releaseEvents){ //鏍囧噯DOM
				$(window).off('blur', {"me":_this}, _this.onMouseUp);
				// E.un(window, "blur", this.onMouseUp);
			}
			if(el.releaseCapture){ //IE
				$(el).off('losecapture', {"me":_this}, _this.onMouseUp);
				// E.un(el, "losecapture", this.onMouseUp);
				el.releaseCapture();
			}
			return false;
		}
	});
	R.klass('ui.Dailog', R.ui.Component, function(_super){
		var E = R.event,
			DOM = R.dom,
			KEY_ESC = 27,
			doc = document;
		function returnFalse() {
			return false;
		}
		this._init = function(){
			_super._init.call(this);
			this._head = null;
			this._body = null;
			this._footer = null;
			this._close = null;
			this._caption = "瀵硅瘽妗嗘爣棰�";
			this._tpl = '';
			this._keepAlive = true; //true 鐨勬椂鍊欏叧闂椂涓嶉攢姣佹湰瀵硅瘽妗�
			this._modal = null;
			this._callback = null;// 纭畾鐨勫洖璋冨嚱鏁�
			this._defaulttpl = '<div class="dheader">'+
								'<span>鏍囬</span><a _act="close" style="z-index:99" class="close-btn" href="javascript:void(0);" id="popup_close"><i></i></a>'+
								'</div><div class="dbody"></div><div class="dfooter"><span _act="ok">纭畾</span><span _act="close">鍙栨秷</span></div>';
		};
		this.init = function(obj){
			_super.init.apply(this, arguments);
			this._head = this._self.childNodes[0];
			this._body = this._self.childNodes[1];
			this._footer = this._self.childNodes[1];
			this._caption = this._head.firstChild;
			this._btnClose = this._head.lastChild;
			this._dragdrop = new R.ui.DragDrop();

			var me = this, el = this._self;
			this._dragdrop.init({
				bridge: this._head,
				target: el,
				mousedownObj: {
					fn: function(){
						var rect = DOM.getViewPort();
						me._dragdrop.setArea([0, rect.sw-el.offsetWidth, 0, rect.sh-el.offsetHeight]);
						me.UnActiveUserSelect();
					},
					scope: this
				},
				mouseupObj: {
					fn: this.ActiveUserSelect,
					scope: this
				}
			});
			E.on(this._self, 'keyup', this.onKeyUp, this);
			this.initAction();
		};
		this.create = function(params){
			var obj = document.createElement('div');
			obj.className = params.cls || 'popup-box';
			obj.innerHTML = this._defaulttpl;
			document.body.appendChild(obj);
			this.init(obj);
			if(params.tpl){
				this._body.innerHTML = params.tpl;
			}
			if(params.caption) {
				this.setCaption(params.caption);
			}
			if(params.width && params.height) {
				this.resize(params.width, params.height);
			}
			if(params.callback){
				this._callback = params.callback;
			}
			this.showModal(true);
			this.moveToCenter();
		};
		this.setCaption = function(c){
			this._caption.innerHTML = c;
		};
		// 鎷栨嫿鏃剁姝㈤€夊畾椤甸潰鏂囨湰
		this.UnActiveUserSelect = function(){
			// for IE6/7/8/9/Chrome/Safari
			this._head.onselectstart = returnFalse;
			// for Firefox
			document.body.style.MozUserSelect = 'none';
			// Opera ?
		};

		// 榧犳爣鏉捐捣鏃舵仮澶嶆枃鏈€夊畾
		this.ActiveUserSelect = function(){
			// for Firefox
			document.body.style.MozUserSelect = '';
		};
		this.setHeadStyle = function(cls){
			DOM.addClass(this._head, cls);
		};
		this.hideHead = function(){
			this._head.style.display = 'none';
		};
		this.hideFooter = function(){
			this._footer.style.display = 'none';
		};
		this.hideClose = function(){
			this._btnClose.style.display = 'none';
		};
		this.initAction = function() {
			this._delegate = new R.util.Delegation();
			this._delegate.init(this._self);
			this._delegate.add('close', this.do_close, this);
			this._delegate.add('ok', this.do_ok, this);
		};
		this.showModal = function(v){
			var zindex = _super.showModal.apply(this, arguments);
			if(v){
				this._self.style.zIndex = zindex + 1;
			}
			this._modal = v;
			this.setVisible(v);
			//v && this._btnClose.focus();
		};
		this.onKeyUp = function(ev) {
			var _this = ev.data.me;
			switch(ev.keyCode){
			case KEY_ESC:
				E.trigger(_this._btnClose, 'click'); //鍏抽棴瀵硅瘽妗�
				break;
			}
		};
		this.close = function() {
			if(this._modal) {
				this.showModal(false);
			}
            if(this._keepAlive){
                this._self.style.display = 'none';
            }else{
                if(this._self && this._self.parentNode) {
                    this._self.parentNode.removeChild(this._self);
                }
            }
		};
		this.do_close = function(sender, ev){
			this.close();
		};
		this.do_ok = function(sender, ev){
			if(this._callback){
				this._callback.call(this);
			}
			this.close();
		};
		this.do_dlg_min = function(){
			this.close();
		};
        this.show = function(){
            this.showModal(true);
            this.moveToCenter();
        };
	});
	R.klass("ui.ModalPanel", R.ui.Component, function(_super) {
		var ua = navigator.userAgent,
			ie = /MSIE\s([^;]*)/.test(ua) || /MSIE([^;]*)/.test(ua),
			DOM = R.dom,
			E = R.event;

		this._init = function() {
			_super._init.call(this);
			this._iframe = null; // 鐢ㄦ潵閬尅SELECT绛塂IV閬尅涓嶄綇鐨勭粍浠�
			this._panel = null; // 鍐嶇敤杩欎釜DIV閬尅鍦↖FRAME涓婇潰
			this._zindex = 120;
		};

		this.init = function(obj) {
			_super.init.apply(this, arguments);
			this._self.className = "wui-ModalPanel";
			this._self.style.zIndex = this._zindex;
			this.moveTo(0, 0);
			this.setOpacity(0.4);
			if (ie) {
				this._iframe = DOM.node(this._self, 'iframe', {
					scrolling: "no",
					frameBorder: "0",
					frameSpacing: "0",
					src: "about:blank",
					display: "none",
					width: "100%",
					height: "100%"
				});
				this._panel = DOM.node(this._self, 'div', {
					display: "none",
					position: "absolute",
					left: "0px",
					top: "0px"
				});
			}
			var _this = this;
			E.on(window, 'resize', function() {
				setTimeout(function() {
					var documentElement = document.documentElement,
						w = Math.max(documentElement.clientWidth, documentElement.scrollWidth),
						h = Math.max(documentElement.clientHeight, documentElement.scrollHeight);
					_this.resize(w, h);
				}, 10);
			}, this);
		};

		this.dispose = function() {
			if (this._disposed) return;
			if (ie) {
				this._panel = null;
				this._iframe = null;
			}
			_super.dispose.apply(this);
		};

		this.setVisible = function(v){
			//瀵逛簬澶氫釜瀵硅瘽妗嗗悓鏃跺嚭鐜扮殑鎯呭喌杩涜澶勭悊
			if(!v && this._zindex > 120){
				this._zindex =  this._zindex - 2;
				this._self.style.zIndex = this._zindex;
				return this._zindex;
			}
			this._self.style.zIndex = this._zindex = (v ? this._zindex + 2 : this._zindex - 2);
			_super.setVisible.apply(this, arguments);
			var rect = DOM.getViewPort();
			this.resize(rect.sw, rect.sh);
			if (ie) {
				this._iframe.style.display = v ? "" : "none";
				this._panel.style.display = v ? "" : "none";
			}
			return this._zindex;
		};

		this.resize = function(w, h) {
			_super.resize.apply(this, arguments);
			if (ie) {
				DOM.setWH(this._panel, w, h);
			}
		};

	});
	R.klass('util.TestObj', {
		_init : function(){
			alert('TestObj__init');
		},
		init : function(){
			alert('TestObj_init');
		}
	});
	R.klass('util.TestObj1', R.util.TestObj, function(_super){
		this._init = function(){
			_super._init.call(this);
			alert('TestObj1__init');
		};
		this.init = function(){
			alert('TestObj1_init');
		};
	});
	R.klass('util.TestFun', function(){
		this._init = function(){
			alert('TestFun__init');
		};
		this.init = function(){
			alert('TestFun_init');
		};
	});
	R.klass('util.TestFun1', R.util.TestFun, function(_super){
		this._init = function(){
			_super._init.call(this);
			alert('TestFun1__init');
		};
		this.init = function(){
			alert('TestFun1_init');
		};
	});
	win.R = R;
})(jQuery, window);
// var dailog = new R.ui.Dailog();
// var params = {
// 	caption: '鎴戞槸鍏抽棴绐楀彛',
// 	tpl: '<div><br><br><br><br><br><br><br>鎴戞槸绐楀彛鍐呭</div>',
// 	width: 420,
// 	height: 295
// };
// dailog.create(params);
// var TestObj = new R.util.TestObj();
// var TestObj1 = new R.util.TestObj1();
// var TestFun1 = new R.util.TestFun1();

