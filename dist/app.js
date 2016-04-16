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

	module.exports = __webpack_require__(1);

	/***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(2);
	var crel = __webpack_require__(3);

	var DEBUG = true;

	var opts = {
		accept: false,
		readAsDefault: 'ArrayBuffer',
		on: {
			progress: function progress(e, file) {
				if (DEBUG) console.log("progress");
				var progressbar = document.getElementById("progress");
				if (e.lengthComputable) {
					var total = e.total;
					var loaded = e.loaded;
					var percent = loaded * 100 / total;
					if (DEBUG) console.log(percent);
					progressbar.style.width = percent + "%";
				}
			},
			loadstart: function loadstart(e, file) {
				if (DEBUG) console.log("loadstart");
			},
			load: function load(e, file) {
				if (DEBUG) console.log("loaded");

				var blob = e.target.result;
				var vrdm = window.crypto.getRandomValues(new Uint8Array(12));

				// @TODO find a way to remove this ugly global
				var key = void 0;

				// @TODO first encrypt try
				window.crypto.subtle.generateKey({
					name: "AES-GCM",
					length: 256
				}, true, ["encrypt", "decrypt"]).then(function (k) {
					if (DEBUG) console.log("generateKey");
					key = k;

					return window.crypto.subtle.exportKey("jwk", key);
				}).then(function (keyData) {
					document.getElementById("key").value = keyData.k;
					document.getElementById("key").style.display = 'block';

					return window.crypto.subtle.encrypt({
						name: "AES-GCM",
						iv: vrdm,
						tagLength: 128
					}, key, blob);
				}).then(function (encrypted) {
					if (DEBUG) console.log("encrypted");

					return new Promise(function (resolve, reject) {

						var peer = new Peer({ key: config.apiKey, debug: 3 });
						peer.on('open', function (id) {
							if (DEBUG) console.log('My peer ID is: ' + id);

							crel(document.getElementById("link"), { 'value': window.location.href + 'uploaded.html#' + id });
							document.getElementById("displayLink").style.display = 'block';

							peer.on('connection', function (conn) {
								if (DEBUG) console.log("connected");

								conn.on('open', function () {
									if (DEBUG) console.log("opened");
									conn.send({ 'iv': vrdm, 'encrypted': encrypted });
									resolve(peer);
								});

								conn.on('error', function (err) {
									// @TODO manage peer connection error
									if (DEBUG) console.log(err);
									reject(err);
								});
							});

							peer.on('error', function (err) {
								// @TODO manage peer error
								if (DEBUG) console.log(err);
								reject(err);
							});
						});
					});
				})
				// @TODO add close connection after successful send
				.catch(function (err) {
					if (DEBUG) console.log(err);
					throw err;
				});
			},
			error: function error(e, file) {
				// @TODO manage upload error
				if (DEBUG) console.log(e, file);
				throw e;
			}
		}
	};

	document.addEventListener("DOMContentLoaded", function () {

		var clipboard = new Clipboard('#copy-btn');

		FileReaderJS.setupInput(document.getElementById("archive"), opts);
	});

	/***/
},
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
}
/******/]);
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
