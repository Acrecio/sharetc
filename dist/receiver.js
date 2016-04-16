'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};
	/******/
	/******/ // The require function
	/******/function __webpack_require__(moduleId) {
		/******/
		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;
		/******/
		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };
		/******/
		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/
		/******/ // Flag the module as loaded
		/******/module.loaded = true;
		/******/
		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}
	/******/
	/******/
	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;
	/******/
	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;
	/******/
	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";
	/******/
	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

	/***/
},,
/* 1 */
/* 2 */
/***/function (module, exports) {

	'use strict';

	(function () {
		var opts = {
			apiKey: 'ueom2eryn6n1m7vi'
		};
		module.exports = opts;
	})();

	/***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

	//Copyright (C) 2012 Kory Nunn

	//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	/*
 
     This code is not formatted for readability, but rather run-speed and to assist compilers.
 
     However, the code's intention should be transparent.
 
     *** IE SUPPORT ***
 
     If you require this library to work in IE7, add the following after declaring crel.
 
     var testDiv = document.createElement('div'),
         testLabel = document.createElement('label');
 
     testDiv.setAttribute('class', 'a');
     testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
     testDiv.setAttribute('name','a');
     testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
         element.id = value;
     }:undefined;
 
 
     testLabel.setAttribute('for', 'a');
     testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;
 
 
 
 */

	(function (root, factory) {
		if (true) {
			module.exports = factory();
		} else if (typeof define === 'function' && define.amd) {
			define(factory);
		} else {
			root.crel = factory();
		}
	})(this, function () {
		var fn = 'function',
		    obj = 'object',
		    nodeType = 'nodeType',
		    textContent = 'textContent',
		    setAttribute = 'setAttribute',
		    attrMapString = 'attrMap',
		    isNodeString = 'isNode',
		    isElementString = 'isElement',
		    d = (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === obj ? document : {},
		    isType = function isType(a, type) {
			return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === type;
		},
		    isNode = (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === fn ? function (object) {
			return object instanceof Node;
		} :
		// in IE <= 8 Node is an object, obviously..
		function (object) {
			return object && isType(object, obj) && nodeType in object && isType(object.ownerDocument, obj);
		},
		    isElement = function isElement(object) {
			return crel[isNodeString](object) && object[nodeType] === 1;
		},
		    isArray = function isArray(a) {
			return a instanceof Array;
		},
		    appendChild = function appendChild(element, child) {
			if (!crel[isNodeString](child)) {
				child = d.createTextNode(child);
			}
			element.appendChild(child);
		};

		function crel() {
			var args = arguments,
			    //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
			element = args[0],
			    child,
			    settings = args[1],
			    childIndex = 2,
			    argumentsLength = args.length,
			    attributeMap = crel[attrMapString];

			element = crel[isElementString](element) ? element : d.createElement(element);
			// shortcut
			if (argumentsLength === 1) {
				return element;
			}

			if (!isType(settings, obj) || crel[isNodeString](settings) || isArray(settings)) {
				--childIndex;
				settings = null;
			}

			// shortcut if there is only one child that is a string
			if (argumentsLength - childIndex === 1 && isType(args[childIndex], 'string') && element[textContent] !== undefined) {
				element[textContent] = args[childIndex];
			} else {
				for (; childIndex < argumentsLength; ++childIndex) {
					child = args[childIndex];

					if (child == null) {
						continue;
					}

					if (isArray(child)) {
						for (var i = 0; i < child.length; ++i) {
							appendChild(element, child[i]);
						}
					} else {
						appendChild(element, child);
					}
				}
			}

			for (var key in settings) {
				if (!attributeMap[key]) {
					element[setAttribute](key, settings[key]);
				} else {
					var attr = attributeMap[key];
					if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) === fn) {
						attr(element, settings[key]);
					} else {
						element[setAttribute](attr, settings[key]);
					}
				}
			}

			return element;
		}

		// Used for mapping one kind of attribute to the supported version of that in bad browsers.
		crel[attrMapString] = {};

		crel[isElementString] = isElement;

		crel[isNodeString] = isNode;

		if (typeof Proxy !== 'undefined') {
			return new Proxy(crel, {
				get: function get(target, key) {
					!(key in crel) && (crel[key] = crel.bind(null, key));
					return crel[key];
				}
			});
		}

		return crel;
	});

	/***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(2);
	var crel = __webpack_require__(3);

	var DEBUG = true;

	var callback = function callback(e) {
		var ikey = document.getElementById("key");
		if (ikey.value.length <= 0) return;

		var vkey = ikey.value;

		var cryptoKey = {
			alg: "A256GCM",
			ext: true,
			k: vkey,
			kty: "oct"
		};

		var url = window.location.href;
		var idx = url.indexOf("#");
		var hash = idx != -1 ? url.substring(idx + 1) : "";

		var peer = new Peer({ key: config.apiKey, debug: 3 });
		var conn = peer.connect(hash);
		conn.on('data', function (data) {
			if (DEBUG) console.log("receiving");

			var vrdm = data.iv;
			var encrypted = data.encrypted;

			window.crypto.subtle.importKey("jwk", cryptoKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]).then(function (key) {
				if (DEBUG) console.log("importKey");
				if (DEBUG) console.log(key);

				return window.crypto.subtle.decrypt({
					name: "AES-GCM",
					iv: vrdm,
					tagLength: 128
				}, key, encrypted);
			}).then(function (decrypted) {
				if (DEBUG) console.log("decrypted");

				var blob = new Blob([decrypted], { type: 'application/octet-binary' });
				var url = URL.createObjectURL(blob);
				crel(document.getElementById("resultinglink"), crel('a', { 'href': url, 'download': 'document.pdf' }, "Download me"));

				conn.close();
			}).catch(function (err) {
				// @TODO manage importKey error
				console.log(err);
				throw err;
			});
		});

		conn.on('err', function (err) {
			// @TODO manage peer connection error
			console.log(err);
			throw err;
		});
	};

	var ilaunch = document.getElementById("launch");
	ilaunch.addEventListener("click", callback);

	/***/
}
/******/]);
//# sourceMappingURL=receiver.js.map
//# sourceMappingURL=receiver.js.map
