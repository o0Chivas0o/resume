/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(6);

var _View = __webpack_require__(8);

var _View2 = _interopRequireDefault(_View);

var _Model = __webpack_require__(9);

var _Model2 = _interopRequireDefault(_Model);

var _Controller = __webpack_require__(10);

var _Controller2 = _interopRequireDefault(_Controller);

var _removeLoading = __webpack_require__(11);

var _removeLoading2 = _interopRequireDefault(_removeLoading);

var _autoSlideUp = __webpack_require__(12);

var _autoSlideUp2 = _interopRequireDefault(_autoSlideUp);

var _message = __webpack_require__(13);

var _message2 = _interopRequireDefault(_message);

var _initSwiper = __webpack_require__(14);

var _initSwiper2 = _interopRequireDefault(_initSwiper);

var _smoothlyNavigation = __webpack_require__(15);

var _smoothlyNavigation2 = _interopRequireDefault(_smoothlyNavigation);

var _stickyTopbar = __webpack_require__(16);

var _stickyTopbar2 = _interopRequireDefault(_stickyTopbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _View2.default)();
(0, _Model2.default)();
(0, _Controller2.default)();
(0, _removeLoading2.default)();
(0, _autoSlideUp2.default)();
(0, _message2.default)();
(0, _initSwiper2.default)();
(0, _smoothlyNavigation2.default)();
(0, _stickyTopbar2.default)();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(4);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./loading.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./loading.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".loading{width:40px;height:40px;position:relative;margin:100px auto}.loading:after,.loading:before{content:\"\";width:100%;height:100%;border-radius:50%;background-color:#333;opacity:.6;position:absolute;top:0;left:0;animation:a 2s infinite ease-in-out}.loading:after{animation-delay:-1s}@keyframes a{0%,to{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "body{background:#efefef;margin:0;overflow:auto}a{color:inherit;text-decoration:none}*{margin:0;padding:0}hr{height:0;border:none;border-top:1px solid #dedede}ol,ul{list-style:none}h1,h2,h3,h4,h5,h6{font-weight:400}[data-x].offset{transform:translateY(100px);opacity:0}[data-x]{transform:translate(0);opacity:1;transition:all .5s}.icon{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden}.clearfix:after{content:\"\";display:block;clear:both}.site-welcome{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#ddd;z-index:1;justify-content:center;align-items:center}.site-welcome.active{display:flex}.topNavBar.sticky{background:#fff;padding:10px 0;z-index:1;box-shadow:0 0 15px rgba(0,0,0,.5);color:#3d4451}.topNavBar-inner{padding:0 16px}.topNavBar{padding:20px 0;position:fixed;top:0;left:0;width:100%;transition:all .5s;color:#b7b7b7}.topNavBar nav{padding-top:5px}.topNavBar nav ul{list-style:none;margin:0;padding:0}.topNavBar nav ul li{float:left;margin-left:17px;margin-right:17px;position:relative}.topNavBar nav ul li a{font-size:16px;color:inherit;font-weight:700;border-top:3px solid transparent;border-bottom:3px solid transparent;padding-top:5px;padding-bottom:5px;display:block;position:relative;font-family:monospace,Menlo}.topNavBar .submenu{display:none;position:absolute;top:100%;right:0;background:#fff;color:#3d4451;box-shadow:0 0 5px rgba(0,0,0,.5)}.topNavBar .submenu>li{white-space:nowrap;padding:5px 10px}.topNavBar .logo{font-size:24px;font-family:Arial Black;padding-top:3px;padding-bottom:4px}.topNavBar .logo .rs{margin-right:4px;color:#e6686a}.topNavBar .logo .card{color:#9a9da2}.topNavBar nav>ul>li.active>a:after,.topNavBar nav>ul>li.highlight>a:after{content:\"\";display:block;background:#e06567;position:absolute;top:100%;left:0;height:3px;width:100%;animation:a .3s linear}.topNavBar li.active>.submenu{display:block;animation:b .3s}.banner{height:515px;background-image:url(https://i.loli.net/2018/02/24/5a917d5812a64.jpg);background-position:50%;background-size:cover}.banner .mask{height:515px;background-color:rgba(0,0,0,.5)}.userCard{max-width:940px;margin-left:auto;margin-right:auto;background-color:#fff;box-shadow:0 1px 5px 0 rgba(0,0,0,.5)}.userCard .welcome{background:#e6686a;color:#fff;display:inline-block;padding:4px 16px;line-height:22px;position:relative;margin-bottom:10px}.userCard .welcome .triangle{display:block;border:10px solid transparent;width:0;border-left-color:#e6686a;border-top-width:0;position:absolute;left:4px;top:100%}.userCard .picture{float:left}.userCard .text{float:left;margin-left:65px;width:470px}.userCard .text h1{margin-top:18px}.userCard .text hr{margin:20px 0}.userCard .pictureAndText{padding:50px}.userCard footer.media{background:#e6686a;text-align:center}.userCard footer.media a{display:inline-block;width:40px;line-height:30px;padding:5px 0;border-radius:50%;margin:16px}.userCard footer.media a:hover{background:#cf5d5f}.userCard .icon{width:30px;height:30px;fill:#fff;vertical-align:top}.userCard dl dd,.userCard dl dt{float:left;padding:5px 0}.userCard dl dt{width:30%;font-weight:700}.userCard dl dd{width:70%;color:#9da0a7}main{margin-top:-340px}main .downloadResume-wrapper{text-align:center}main .downloadResume{font-size:14px;line-height:16px;padding:21px 55px;border:1px solid #cdcfd1;background:#efefef;display:inline-block;border-radius:2px;color:#3d4451;font-weight:700;margin:32px 0;transition:box-shadow .2s}main .downloadResume:hover{box-shadow:0 4px 13px 0 rgba(0,0,0,.2)}.selfIntroduction{max-width:940px;margin-left:auto;margin-right:auto;text-align:center;font-family:kai;line-height:1.8;font-size:18px}section.message,section.portfolio,section.skills{max-width:940px;margin:60px auto 0}section.message>h2,section.portfolio>h2,section.skills>h2{text-align:center;color:#3d4451;font-size:34px;line-height:1.2;font-weight:600}section.skills h3{font-size:14px;line-height:1.1;padding-right:40px}section.skills ol{background:#fff;box-shadow:0 1px 5px 0 rgba(0,0,0,.5);padding:42px 50px 10px;margin-top:30px}section.skills ol li{float:left;width:48%;box-sizing:border-box}section.skills ol li:nth-child(2n){float:right}section.skills .progressBar{height:5px;background:#fae1e1;border-radius:2px;margin:4px 0 40px;overflow:hidden}section.skills .progressBar .progress{height:100%;background:#e6686a;width:70%;border-radius:2px;transform:translateX(0);transition:all 1s}section.skills.offset .progressBar>.progress{transform:translateX(-100%)}section.portfolio{text-align:center;height:650px}section.portfolio,section.portfolio h2{margin-bottom:100px}section.portfolio .swiper-container{width:900px;height:450px;position:relative}section.portfolio .swiper-container .swiper-wrapper .swiper-slide{position:relative}section.portfolio .swiper-container .swiper-wrapper .swiper-slide img{height:450px;width:900px}section.message ol{max-width:940px;margin:50px auto}section.message ol li{border:1px solid #ddd;background:#fff;position:relative;margin:10px auto;box-shadow:1px 1px 2px 0 hsla(0,0%,79%,.8)}section.message ol li p{font-size:16px;padding-bottom:60px;color:rgba(0,0,0,.8)}section.message ol li h3{color:rgba(0,0,0,.8);position:absolute;font-size:18px;bottom:0;right:0}section.message form{max-width:940px;margin:50px auto 300px}section.message form .name{position:relative;width:100%}section.message form .name input{outline:none;width:40%;padding:15px}section.message form .name svg{position:absolute;top:0;right:5%;width:24px;height:24px}section.message form .message{position:relative;width:100%}section.message form .message input{outline:none;width:40%;padding:15px}section.message form .message svg{position:absolute;top:0;right:5%;width:24px;height:24px}section.message form .submit{width:11%;padding:16px;background:#e86766;color:#fff;outline:none;float:right;border:none;display:block;margin:0}@keyframes a{0%{width:0}to{width:100%}}@keyframes b{0%{transform:translateX(-50%);opacity:0}to{transform:translateX(0);opacity:1}}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  window.View = function (view) {
    return document.querySelector(view);
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  window.Model = function (options) {
    var resourceName = options.resourceName;
    return {
      init: function init() {
        var APP_ID = 'JLMh9Uyk8yngdHl7RjiKtBvJ-gzGzoHsz';
        var APP_KEY = 'eFTOCJrbFsKTdigcxbv3jRog';
        AV.init({ appId: APP_ID, appKey: APP_KEY });
      },
      fetch: function fetch() {
        var query = new AV.Query(resourceName);
        return query.find();
      },
      save: function save(object) {
        var X = AV.Object.extend(resourceName);
        var x = new X();
        return x.save(object);
      }
    };
  };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  window.Controller = function (options) {
    var _init = options.init; // B

    var object = {
      view: null,
      model: null,
      init: function init(view, model) {
        // A
        this.view = view;
        this.model = model;
        this.model.init();
        _init.call(this, view, model); //
        this.bindEvents.call(this);
      }
    };
    for (var key in options) {
      if (key !== 'init') {
        object[key] = options[key];
      }
    }
    return object;
  };
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !function () {
    var view = View('#siteWelcome');
    var controller = {
      view: null,
      init: function init(view) {
        this.view = view;
        this.deActive();
      },
      deActive: function deActive() {
        this.view.classList.remove('active');
      }
    };
    controller.init(view);
  }.call();
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !function () {
    // 添加 offset 类
    var specialTags = document.querySelectorAll('[data-x]');
    for (var i = 0; i < specialTags.length; i++) {
      specialTags[i].classList.add('offset');
    }

    setTimeout(function () {
      findClosestAndRemoveOffset();
    }, 300);
    window.addEventListener('scroll', function () {
      findClosestAndRemoveOffset();
    });

    /*helper*/
    function findClosestAndRemoveOffset() {
      // 滚动到对应锚点 二级菜单对应标签高亮
      var specialTags = document.querySelectorAll('[data-x]');
      var minIndex = 0;
      for (var _i = 0; _i < specialTags.length; _i++) {
        if (Math.abs(specialTags[_i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
          minIndex = _i;
        }
      }
      // 去除默认offset类
      specialTags[minIndex].classList.remove('offset');

      var id = specialTags[minIndex].id;
      var a = document.querySelector('a[href="#' + id + '"]');
      var li = a.parentNode;
      var siblings = li.parentNode.children;
      // 找到最近的类

      // 给二级菜单添加highlight类
      for (var _i2 = 0; _i2 < siblings.length; _i2++) {
        siblings[_i2].classList.remove('highlight');
      }
      li.classList.add('highlight');
    }

    // 二级菜单展示
    var liTags = document.querySelectorAll('nav.menu > ul > li');
    for (var _i3 = 0; _i3 < liTags.length; _i3++) {
      liTags[_i3].onmouseenter = function (e) {
        e.currentTarget.classList.add('active');
      };
      liTags[_i3].onmouseleave = function (e) {
        e.currentTarget.classList.remove('active');
      };
    }
  }.call();
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !function () {
    var view = View('section.message');
    var model = Model({ resourceName: 'Message' });
    var controller = Controller({
      form: null,
      messageList: null,
      init: function init(view, model) {
        this.messageList = view.querySelector('#messageList');
        this.form = view.querySelector('#postMessage');
        this.loadMessages();
      },
      loadMessages: function loadMessages() {
        var _this = this;

        this.model.fetch().then(function (messages) {
          var array = messages.map(function (item) {
            return item.attributes;
          });
          array.forEach(function (item) {
            var li = document.createElement('li');
            var p = document.createElement('p');
            var h3 = document.createElement('h3');
            h3.innerText = 'Name:' + item.user;
            p.innerText = '' + item.content;
            li.appendChild(p);
            li.appendChild(h3);
            _this.messageList.append(li);
          });
        });
      },
      bindEvents: function bindEvents() {
        var _this2 = this;

        this.form.addEventListener('submit', function (e) {
          // 监听表单防止 监听submit落空
          e.preventDefault();
          _this2.saveMessage();
        });
      },
      saveMessage: function saveMessage() {
        var myForm = this.form;
        var user = myForm.querySelector('#messageUser').value;
        var content = myForm.querySelector('#messageContent').value;
        if (!user) {
          alert('请输入用户名');
        } else if (!content) {
          alert('请输入留言内容');
        } else if (user && content) {
          this.model.save({ user: user, content: content }).then(function (object) {
            var li = document.createElement('li');
            var p = document.createElement('p');
            var h3 = document.createElement('h3');
            var messageList = document.querySelector('#messageList');
            h3.innerText = 'Name:' + object.attributes.user;
            p.innerText = '' + object.attributes.content;
            li.appendChild(p);
            li.appendChild(h3);
            messageList.append(li);
            alert('发送成功');
            myForm.querySelector('#messageUser').value = '';
            myForm.querySelector('#messageContent').value = '';
          });
        }
      }
    });
    controller.init(view, model);
  }.call();
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !function () {
    var view = View('#mySlide');
    var controller = {
      view: null,
      swiper: null,
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        // effect: '', swiper主题
        grabCursor: false,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      init: function init(view) {
        this.view = view;
        this.initSwiper();
      },
      initSwiper: function initSwiper() {
        this.swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions);
      }
    };
    controller.init(view);
  }.call();
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !function () {
    var view = View('nav.menu');
    var controller = {
      view: null,
      aTags: null,
      init: function init(view) {
        this.view = view;
        this.initAnimation();
        this.bindEvents();
      },
      initAnimation: function initAnimation() {
        function animate(time) {
          requestAnimationFrame(animate);
          TWEEN.update(time);
        }
        requestAnimationFrame(animate);
      },
      scrollToElement: function scrollToElement(element) {
        var top = element.offsetTop;
        var currentTop = window.scrollY;
        var targetTop = top - 80;
        var s = targetTop - currentTop;
        var t = Math.abs(s / 100 * 300);
        if (t > 500) {
          t = 500;
        }
        var coords = { y: currentTop };
        var tween = new TWEEN.Tween(coords).to({ y: targetTop }, t).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
          window.scrollTo(0, coords.y);
        }).start();
      },
      bindEvents: function bindEvents() {
        var aTags = this.view.querySelectorAll('ul > li > a');
        for (var i = 0; i < aTags.length; i++) {
          aTags[i].onclick = function (e) {
            e.preventDefault();
            // let a = e.currentTarget
            // let href = a.getAttribute('href')
            // a.href 是浏览器解析后的带HTTP的地址,不是我想要的地址 这里得到的结果是 '#siteAbout'
            // let element = document.querySelector(href)
            // let top= element.offsetTop  // 获取对应锚点距离浏览器高度
            var element = document.querySelector(e.currentTarget.getAttribute('href'));
            this.scrollToElement(element);
          }.bind(this);
        }
      }
    };
    controller.init(view);
  }.call();
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !function () {
    var view = View('#topNavBar');
    var controller = {
      view: null,
      init: function init(view) {
        this.view = view;
        this.bindEvents(); // this.bindEvents.call(this)
      },
      bindEvents: function bindEvents() {
        var _this = this;

        view = this.view;
        window.addEventListener('scroll', function () {
          window.scrollY > 0 ? _this.active() : _this.deActive();
        });
      },
      // bindEvents: function () {
      //   view = this.view
      //   window.addEventListener('scroll', function (e) {
      //     window.scrollY > 0 ? this.active() : this.deActive()
      //   }.bind(this))
      // },
      active: function active() {
        this.view.classList.add('sticky');
      },
      deActive: function deActive() {
        this.view.classList.remove('sticky');
      }
    };
    controller.init(view); // controller.init.call(controller, view)
  }.call();
};

/***/ })
/******/ ]);