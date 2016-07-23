/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}

/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "9d7f2b3c40296f4044fd"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, (function(name) {
/******/ 					return {
/******/ 						configurable: true,
/******/ 						enumerable: true,
/******/ 						get: function() {
/******/ 							return __webpack_require__[name];
/******/ 						},
/******/ 						set: function(value) {
/******/ 							__webpack_require__[name] = value;
/******/ 						}
/******/ 					};
/******/ 				}(name)));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailableFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailableFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(__webpack_require__.s === moduleId) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					var unacceptedParents = [];
/******/ 					module = installedModules[moduleId];
/******/ 					if(module) {
/******/ 						for(i = 0; i < module.parents.length; i++) {
/******/ 							var parentId = module.parents[i];
/******/ 							var parent = installedModules[parentId];
/******/ 							if(parent && !parent.hot._acceptedDependencies[moduleId]) {
/******/ 								unacceptedParents.push(parentId);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					var message = "Aborted because " + moduleId + " is not accepted";
/******/ 					if(unacceptedParents.length > 0)
/******/ 						message += " (used by " + unacceptedParents.join(", ") + ")";
/******/ 					return Promise.reject(new Error(message));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					dependency = moduleOutdatedDependencies[j];
/******/ 					idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(10)(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* Riot v2.5.0, @license MIT */

	;(function(window, undefined) {
	  'use strict';
	var riot = { version: 'v2.5.0', settings: {} },
	  // be aware, internal usage
	  // ATTENTION: prefix the global dynamic variables with `__`

	  // counter to give a unique id to all the Tag instances
	  __uid = 0,
	  // tags instances cache
	  __virtualDom = [],
	  // tags implementation cache
	  __tagImpl = {},

	  /**
	   * Const
	   */
	  GLOBAL_MIXIN = '__global_mixin',

	  // riot specific prefixes
	  RIOT_PREFIX = 'riot-',
	  RIOT_TAG = RIOT_PREFIX + 'tag',
	  RIOT_TAG_IS = 'data-is',

	  // for typeof == '' comparisons
	  T_STRING = 'string',
	  T_OBJECT = 'object',
	  T_UNDEF  = 'undefined',
	  T_FUNCTION = 'function',
	  // special native tags that cannot be treated like the others
	  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
	  RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,
	  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
	  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],

	  // version# for IE 8-11, 0 for others
	  IE_VERSION = (window && window.document || {}).documentMode | 0,

	  // detect firefox to fix #1374
	  FIREFOX = window && !!window.InstallTrigger
	/* istanbul ignore next */
	riot.observable = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {}

	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice

	  /**
	   * Private Methods
	   */

	  /**
	   * Helper function needed to get and loop all the events in a string
	   * @param   { String }   e - event string
	   * @param   {Function}   fn - callback
	   */
	  function onEachEvent(e, fn) {
	    var es = e.split(' '), l = es.length, i = 0, name, indx
	    for (; i < l; i++) {
	      name = es[i]
	      indx = name.indexOf('.')
	      if (name) fn( ~indx ? name.substring(0, indx) : name, i, ~indx ? name.slice(indx + 1) : null)
	    }
	  }

	  /**
	   * Public Api
	   */

	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given space separated list of `events` and
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } events - events ids
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(events, fn) {
	        if (typeof fn != 'function')  return el

	        onEachEvent(events, function(name, pos, ns) {
	          (callbacks[name] = callbacks[name] || []).push(fn)
	          fn.typed = pos > 0
	          fn.ns = ns
	        })

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Removes the given space separated list of `events` listeners
	     * @param   { String } events - events ids
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(events, fn) {
	        if (events == '*' && !fn) callbacks = {}
	        else {
	          onEachEvent(events, function(name, pos, ns) {
	            if (fn || ns) {
	              var arr = callbacks[name]
	              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                if (cb == fn || ns && cb.ns == ns) arr.splice(i--, 1)
	              }
	            } else delete callbacks[name]
	          })
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Listen to the given space separated list of `events` and
	     * execute the `callback` at most once
	     * @param   { String } events - events ids
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(events, fn) {
	        function on() {
	          el.off(events, on)
	          fn.apply(el, arguments)
	        }
	        return el.on(events, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Execute all callback functions that listen to
	     * the given space separated list of `events`
	     * @param   { String } events - events ids
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(events) {

	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns

	        for (var i = 0; i < arglen; i++) {
	          args[i] = arguments[i + 1] // skip first argument
	        }

	        onEachEvent(events, function(name, pos, ns) {

	          fns = slice.call(callbacks[name] || [], 0)

	          for (var i = 0, fn; fn = fns[i]; ++i) {
	            if (fn.busy) continue
	            fn.busy = 1
	            if (!ns || fn.ns == ns) fn.apply(el, fn.typed ? [name].concat(args) : args)
	            if (fns[i] !== fn) { i-- }
	            fn.busy = 0
	          }

	          if (callbacks['*'] && name != '*')
	            el.trigger.apply(el, ['*', name].concat(args))

	        })

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  })

	  return el

	}
	/* istanbul ignore next */
	;(function(riot) {

	/**
	 * Simple client-side router
	 * @module riot-route
	 */


	var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
	  EVENT_LISTENER = 'EventListener',
	  REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	  ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	  HAS_ATTRIBUTE = 'hasAttribute',
	  REPLACE = 'replace',
	  POPSTATE = 'popstate',
	  HASHCHANGE = 'hashchange',
	  TRIGGER = 'trigger',
	  MAX_EMIT_STACK_LEVEL = 3,
	  win = typeof window != 'undefined' && window,
	  doc = typeof document != 'undefined' && document,
	  hist = win && history,
	  loc = win && (hist.location || win.location), // see html5-history-api
	  prot = Router.prototype, // to minify more
	  clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	  started = false,
	  central = riot.observable(),
	  routeFound = false,
	  debouncedEmit,
	  base, current, parser, secondParser, emitStack = [], emitStackLevel = 0

	/**
	 * Default parser. You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_PARSER(path) {
	  return path.split(/[/?#]/)
	}

	/**
	 * Default parser (second). You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @param {string} filter - filter string (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_SECOND_PARSER(path, filter) {
	  var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
	    args = path.match(re)

	  if (args) return args.slice(1)
	}

	/**
	 * Simple/cheap debounce implementation
	 * @param   {function} fn - callback
	 * @param   {number} delay - delay in seconds
	 * @returns {function} debounced function
	 */
	function debounce(fn, delay) {
	  var t
	  return function () {
	    clearTimeout(t)
	    t = setTimeout(fn, delay)
	  }
	}

	/**
	 * Set the window listeners to trigger the routes
	 * @param {boolean} autoExec - see route.start
	 */
	function start(autoExec) {
	  debouncedEmit = debounce(emit, 1)
	  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit)
	  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
	  doc[ADD_EVENT_LISTENER](clickEvent, click)
	  if (autoExec) emit(true)
	}

	/**
	 * Router class
	 */
	function Router() {
	  this.$ = []
	  riot.observable(this) // make it observable
	  central.on('stop', this.s.bind(this))
	  central.on('emit', this.e.bind(this))
	}

	function normalize(path) {
	  return path[REPLACE](/^\/|\/$/, '')
	}

	function isString(str) {
	  return typeof str == 'string'
	}

	/**
	 * Get the part after domain name
	 * @param {string} href - fullpath
	 * @returns {string} path from root
	 */
	function getPathFromRoot(href) {
	  return (href || loc.href)[REPLACE](RE_ORIGIN, '')
	}

	/**
	 * Get the part after base
	 * @param {string} href - fullpath
	 * @returns {string} path from base
	 */
	function getPathFromBase(href) {
	  return base[0] == '#'
	    ? (href || loc.href || '').split(base)[1] || ''
	    : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '')
	}

	function emit(force) {
	  // the stack is needed for redirections
	  var isRoot = emitStackLevel == 0
	  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return

	  emitStackLevel++
	  emitStack.push(function() {
	    var path = getPathFromBase()
	    if (force || path != current) {
	      central[TRIGGER]('emit', path)
	      current = path
	    }
	  })
	  if (isRoot) {
	    while (emitStack.length) {
	      emitStack[0]()
	      emitStack.shift()
	    }
	    emitStackLevel = 0
	  }
	}

	function click(e) {
	  if (
	    e.which != 1 // not left click
	    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	    || e.defaultPrevented // or default prevented
	  ) return

	  var el = e.target
	  while (el && el.nodeName != 'A') el = el.parentNode

	  if (
	    !el || el.nodeName != 'A' // not A tag
	    || el[HAS_ATTRIBUTE]('download') // has download attr
	    || !el[HAS_ATTRIBUTE]('href') // has no href attr
	    || el.target && el.target != '_self' // another window or frame
	    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
	  ) return

	  if (el.href != loc.href) {
	    if (
	      el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	      || base != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	    ) return
	  }

	  e.preventDefault()
	}

	/**
	 * Go to the path
	 * @param {string} path - destination path
	 * @param {string} title - page title
	 * @param {boolean} shouldReplace - use replaceState or pushState
	 * @returns {boolean} - route not found flag
	 */
	function go(path, title, shouldReplace) {
	  if (hist) { // if a browser
	    path = base + normalize(path)
	    title = title || doc.title
	    // browsers ignores the second parameter `title`
	    shouldReplace
	      ? hist.replaceState(null, title, path)
	      : hist.pushState(null, title, path)
	    // so we need to set it manually
	    doc.title = title
	    routeFound = false
	    emit()
	    return routeFound
	  }

	  // Server-side usage: directly execute handlers for the path
	  return central[TRIGGER]('emit', getPathFromBase(path))
	}

	/**
	 * Go to path or set action
	 * a single string:                go there
	 * two strings:                    go there with setting a title
	 * two strings and boolean:        replace history with setting a title
	 * a single function:              set an action on the default route
	 * a string/RegExp and a function: set an action on the route
	 * @param {(string|function)} first - path / action / filter
	 * @param {(string|RegExp|function)} second - title / action
	 * @param {boolean} third - replace flag
	 */
	prot.m = function(first, second, third) {
	  if (isString(first) && (!second || isString(second))) go(first, second, third || false)
	  else if (second) this.r(first, second)
	  else this.r('@', first)
	}

	/**
	 * Stop routing
	 */
	prot.s = function() {
	  this.off('*')
	  this.$ = []
	}

	/**
	 * Emit
	 * @param {string} path - path
	 */
	prot.e = function(path) {
	  this.$.concat('@').some(function(filter) {
	    var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter))
	    if (typeof args != 'undefined') {
	      this[TRIGGER].apply(null, [filter].concat(args))
	      return routeFound = true // exit from loop
	    }
	  }, this)
	}

	/**
	 * Register route
	 * @param {string} filter - filter for matching to url
	 * @param {function} action - action to register
	 */
	prot.r = function(filter, action) {
	  if (filter != '@') {
	    filter = '/' + normalize(filter)
	    this.$.push(filter)
	  }
	  this.on(filter, action)
	}

	var mainRouter = new Router()
	var route = mainRouter.m.bind(mainRouter)

	/**
	 * Create a sub router
	 * @returns {function} the method of a new Router object
	 */
	route.create = function() {
	  var newSubRouter = new Router()
	  // assign sub-router's main method
	  var router = newSubRouter.m.bind(newSubRouter)
	  // stop only this sub-router
	  router.stop = newSubRouter.s.bind(newSubRouter)
	  return router
	}

	/**
	 * Set the base of url
	 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	 */
	route.base = function(arg) {
	  base = arg || '#'
	  current = getPathFromBase() // recalculate current path
	}

	/** Exec routing right now **/
	route.exec = function() {
	  emit(true)
	}

	/**
	 * Replace the default router to yours
	 * @param {function} fn - your parser function
	 * @param {function} fn2 - your secondParser function
	 */
	route.parser = function(fn, fn2) {
	  if (!fn && !fn2) {
	    // reset parser for testing...
	    parser = DEFAULT_PARSER
	    secondParser = DEFAULT_SECOND_PARSER
	  }
	  if (fn) parser = fn
	  if (fn2) secondParser = fn2
	}

	/**
	 * Helper function to get url query as an object
	 * @returns {object} parsed query
	 */
	route.query = function() {
	  var q = {}
	  var href = loc.href || current
	  href[REPLACE](/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v })
	  return q
	}

	/** Stop routing **/
	route.stop = function () {
	  if (started) {
	    if (win) {
	      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit)
	      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
	      doc[REMOVE_EVENT_LISTENER](clickEvent, click)
	    }
	    central[TRIGGER]('stop')
	    started = false
	  }
	}

	/**
	 * Start routing
	 * @param {boolean} autoExec - automatically exec after starting if true
	 */
	route.start = function (autoExec) {
	  if (!started) {
	    if (win) {
	      if (document.readyState == 'complete') start(autoExec)
	      // the timeout is needed to solve
	      // a weird safari bug https://github.com/riot/route/issues/33
	      else win[ADD_EVENT_LISTENER]('load', function() {
	        setTimeout(function() { start(autoExec) }, 1)
	      })
	    }
	    started = true
	  }
	}

	/** Prepare the router **/
	route.base()
	route.parser()

	riot.route = route
	})(riot)
	/* istanbul ignore next */

	/**
	 * The riot template engine
	 * @version v2.4.0
	 */
	/**
	 * riot.util.brackets
	 *
	 * - `brackets    ` - Returns a string or regex based on its parameter
	 * - `brackets.set` - Change the current riot brackets
	 *
	 * @module
	 */

	var brackets = (function (UNDEF) {

	  var
	    REGLOB = 'g',

	    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

	    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,

	    S_QBLOCKS = R_STRINGS.source + '|' +
	      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
	      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,

	    FINDBRACES = {
	      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
	    },

	    DEFAULT = '{ }'

	  var _pairs = [
	    '{', '}',
	    '{', '}',
	    /{[^}]*}/,
	    /\\([{}])/g,
	    /\\({)|{/g,
	    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
	    DEFAULT,
	    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
	    /(^|[^\\]){=[\S\s]*?}/
	  ]

	  var
	    cachedBrackets = UNDEF,
	    _regex,
	    _cache = [],
	    _settings

	  function _loopback (re) { return re }

	  function _rewrite (re, bp) {
	    if (!bp) bp = _cache
	    return new RegExp(
	      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
	    )
	  }

	  function _create (pair) {
	    if (pair === DEFAULT) return _pairs

	    var arr = pair.split(' ')

	    if (arr.length !== 2 || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(pair)) { // eslint-disable-line
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(/(?=[[\]()*+?.^$|])/g, '\\').split(' '))

	    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr)
	    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr)
	    arr[6] = _rewrite(_pairs[6], arr)
	    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB)
	    arr[8] = pair
	    return arr
	  }

	  function _brackets (reOrIdx) {
	    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
	  }

	  _brackets.split = function split (str, tmpl, _bp) {
	    // istanbul ignore next: _bp is for the compiler
	    if (!_bp) _bp = _cache

	    var
	      parts = [],
	      match,
	      isexpr,
	      start,
	      pos,
	      re = _bp[6]

	    isexpr = start = re.lastIndex = 0

	    while ((match = re.exec(str))) {

	      pos = match.index

	      if (isexpr) {

	        if (match[2]) {
	          re.lastIndex = skipBraces(str, match[2], re.lastIndex)
	          continue
	        }
	        if (!match[3]) {
	          continue
	        }
	      }

	      if (!match[1]) {
	        unescapeStr(str.slice(start, pos))
	        start = re.lastIndex
	        re = _bp[6 + (isexpr ^= 1)]
	        re.lastIndex = start
	      }
	    }

	    if (str && start < str.length) {
	      unescapeStr(str.slice(start))
	    }

	    return parts

	    function unescapeStr (s) {
	      if (tmpl || isexpr) {
	        parts.push(s && s.replace(_bp[5], '$1'))
	      } else {
	        parts.push(s)
	      }
	    }

	    function skipBraces (s, ch, ix) {
	      var
	        match,
	        recch = FINDBRACES[ch]

	      recch.lastIndex = ix
	      ix = 1
	      while ((match = recch.exec(s))) {
	        if (match[1] &&
	          !(match[1] === ch ? ++ix : --ix)) break
	      }
	      return ix ? s.length : recch.lastIndex
	    }
	  }

	  _brackets.hasExpr = function hasExpr (str) {
	    return _cache[4].test(str)
	  }

	  _brackets.loopKeys = function loopKeys (expr) {
	    var m = expr.match(_cache[9])

	    return m
	      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
	      : { val: expr.trim() }
	  }

	  _brackets.array = function array (pair) {
	    return pair ? _create(pair) : _cache
	  }

	  function _reset (pair) {
	    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	      _cache = _create(pair)
	      _regex = pair === DEFAULT ? _loopback : _rewrite
	      _cache[9] = _regex(_pairs[9])
	    }
	    cachedBrackets = pair
	  }

	  function _setSettings (o) {
	    var b

	    o = o || {}
	    b = o.brackets
	    Object.defineProperty(o, 'brackets', {
	      set: _reset,
	      get: function () { return cachedBrackets },
	      enumerable: true
	    })
	    _settings = o
	    _reset(b)
	  }

	  Object.defineProperty(_brackets, 'settings', {
	    set: _setSettings,
	    get: function () { return _settings }
	  })

	  /* istanbul ignore next: in the browser riot is always in the scope */
	  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {}
	  _brackets.set = _reset

	  _brackets.R_STRINGS = R_STRINGS
	  _brackets.R_MLCOMMS = R_MLCOMMS
	  _brackets.S_QBLOCKS = S_QBLOCKS

	  return _brackets

	})()

	/**
	 * @module tmpl
	 *
	 * tmpl          - Root function, returns the template value, render with data
	 * tmpl.hasExpr  - Test the existence of a expression inside a string
	 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	 */

	var tmpl = (function () {

	  var _cache = {}

	  function _tmpl (str, data) {
	    if (!str) return str

	    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
	  }

	  _tmpl.haveRaw = brackets.hasRaw

	  _tmpl.hasExpr = brackets.hasExpr

	  _tmpl.loopKeys = brackets.loopKeys

	  _tmpl.errorHandler = null

	  function _logErr (err, ctx) {

	    if (_tmpl.errorHandler) {

	      err.riotData = {
	        tagName: ctx && ctx.root && ctx.root.tagName,
	        _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
	      }
	      _tmpl.errorHandler(err)
	    }
	  }

	  function _create (str) {
	    var expr = _getTmpl(str)

	    if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr

	/* eslint-disable */

	    return new Function('E', expr + ';')
	/* eslint-enable */
	  }

	  var
	    CH_IDEXPR = '\u2057',
	    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	    RE_DQUOTE = /\u2057/g,
	    RE_QBMARK = /\u2057(\d+)~/g

	  function _getTmpl (str) {
	    var
	      qstr = [],
	      expr,
	      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1)

	    if (parts.length > 2 || parts[0]) {
	      var i, j, list = []

	      for (i = j = 0; i < parts.length; ++i) {

	        expr = parts[i]

	        if (expr && (expr = i & 1

	            ? _parseExpr(expr, 1, qstr)

	            : '"' + expr
	                .replace(/\\/g, '\\\\')
	                .replace(/\r\n?|\n/g, '\\n')
	                .replace(/"/g, '\\"') +
	              '"'

	          )) list[j++] = expr

	      }

	      expr = j < 2 ? list[0]
	           : '[' + list.join(',') + '].join("")'

	    } else {

	      expr = _parseExpr(parts[1], 0, qstr)
	    }

	    if (qstr[0]) {
	      expr = expr.replace(RE_QBMARK, function (_, pos) {
	        return qstr[pos]
	          .replace(/\r/g, '\\r')
	          .replace(/\n/g, '\\n')
	      })
	    }
	    return expr
	  }

	  var
	    RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    }

	  function _parseExpr (expr, asText, qstr) {

	    expr = expr
	          .replace(RE_QBLOCK, function (s, div) {
	            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
	          })
	          .replace(/\s+/g, ' ').trim()
	          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1')

	    if (expr) {
	      var
	        list = [],
	        cnt = 0,
	        match

	      while (expr &&
	            (match = expr.match(RE_CSNAME)) &&
	            !match.index
	        ) {
	        var
	          key,
	          jsb,
	          re = /,|([[{(])|$/g

	        expr = RegExp.rightContext
	        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1]

	        while (jsb = (match = re.exec(expr))[1]) skipBraces(jsb, re)

	        jsb  = expr.slice(0, match.index)
	        expr = RegExp.rightContext

	        list[cnt++] = _wrapExpr(jsb, 1, key)
	      }

	      expr = !cnt ? _wrapExpr(expr, asText)
	           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0]
	    }
	    return expr

	    function skipBraces (ch, re) {
	      var
	        mm,
	        lv = 1,
	        ir = RE_BREND[ch]

	      ir.lastIndex = re.lastIndex
	      while (mm = ir.exec(expr)) {
	        if (mm[0] === ch) ++lv
	        else if (!--lv) break
	      }
	      re.lastIndex = lv ? expr.length : ir.lastIndex
	    }
	  }

	  // istanbul ignore next: not both
	  var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
	    JS_VARNAME = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/

	  function _wrapExpr (expr, asText, key) {
	    var tb

	    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	      if (mvar) {
	        pos = tb ? 0 : pos + match.length

	        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	          match = p + '("' + mvar + JS_CONTEXT + mvar
	          if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '['
	        } else if (pos) {
	          tb = !JS_NOPROPS.test(s.slice(pos))
	        }
	      }
	      return match
	    })

	    if (tb) {
	      expr = 'try{return ' + expr + '}catch(e){E(e,this)}'
	    }

	    if (key) {

	      expr = (tb
	          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
	        ) + '?"' + key + '":""'

	    } else if (asText) {

	      expr = 'function(v){' + (tb
	          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
	        ) + ';return v||v===0?v:""}.call(this)'
	    }

	    return expr
	  }

	  // istanbul ignore next: compatibility fix for beta versions
	  _tmpl.parse = function (s) { return s }

	  _tmpl.version = brackets.version = 'v2.4.0'

	  return _tmpl

	})()

	/*
	  lib/browser/tag/mkdom.js

	  Includes hacks needed for the Internet Explorer version 9 and below
	  See: http://kangax.github.io/compat-table/es5/#ie8
	       http://codeplanet.io/dropping-ie8/
	*/
	var mkdom = (function _mkdom() {
	  var
	    reHasYield  = /<yield\b/i,
	    reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
	    reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
	    reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig
	  var
	    rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
	    tblTags = IE_VERSION && IE_VERSION < 10
	      ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/

	  /**
	   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	   *
	   * @param   {string} templ  - The template coming from the custom tag definition
	   * @param   {string} [html] - HTML content that comes from the DOM element where you
	   *           will mount the tag, mostly the original tag in the page
	   * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
	   */
	  function _mkdom(templ, html) {
	    var
	      match   = templ && templ.match(/^\s*<([-\w]+)/),
	      tagName = match && match[1].toLowerCase(),
	      el = mkEl('div', isSVGTag(tagName))

	    // replace all the yield tags with the tag inner html
	    templ = replaceYield(templ, html)

	    /* istanbul ignore next */
	    if (tblTags.test(tagName))
	      el = specialTags(el, templ, tagName)
	    else
	      setInnerHTML(el, templ)

	    el.stub = true

	    return el
	  }

	  /*
	    Creates the root element for table or select child elements:
	    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	  */
	  function specialTags(el, templ, tagName) {
	    var
	      select = tagName[0] === 'o',
	      parent = select ? 'select>' : 'table>'

	    // trim() is important here, this ensures we don't have artifacts,
	    // so we can check if we have only one element inside the parent
	    el.innerHTML = '<' + parent + templ.trim() + '</' + parent
	    parent = el.firstChild

	    // returns the immediate parent if tr/th/td/col is the only element, if not
	    // returns the whole tree, as this can include additional elements
	    if (select) {
	      parent.selectedIndex = -1  // for IE9, compatible w/current riot behavior
	    } else {
	      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	      var tname = rootEls[tagName]
	      if (tname && parent.childElementCount === 1) parent = $(tname, parent)
	    }
	    return parent
	  }

	  /*
	    Replace the yield tag from any tag template with the innerHTML of the
	    original tag in the page
	  */
	  function replaceYield(templ, html) {
	    // do nothing if no yield
	    if (!reHasYield.test(templ)) return templ

	    // be careful with #1343 - string on the source having `$1`
	    var src = {}

	    html = html && html.replace(reYieldSrc, function (_, ref, text) {
	      src[ref] = src[ref] || text   // preserve first definition
	      return ''
	    }).trim()

	    return templ
	      .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
	        return src[ref] || def || ''
	      })
	      .replace(reYieldAll, function (_, def) {        // yield without any "from"
	        return html || def || ''
	      })
	  }

	  return _mkdom

	})()

	/**
	 * Convert the item looped into an object used to extend the child tag properties
	 * @param   { Object } expr - object containing the keys used to extend the children tags
	 * @param   { * } key - value to assign to the new object returned
	 * @param   { * } val - value containing the position of the item in the array
	 * @returns { Object } - new object containing the values of the original item
	 *
	 * The variables 'key' and 'val' are arbitrary.
	 * They depend on the collection type looped (Array, Object)
	 * and on the expression used on the each tag
	 *
	 */
	function mkitem(expr, key, val) {
	  var item = {}
	  item[expr.key] = key
	  if (expr.pos) item[expr.pos] = val
	  return item
	}

	/**
	 * Unmount the redundant tags
	 * @param   { Array } items - array containing the current items to loop
	 * @param   { Array } tags - array containing all the children tags
	 */
	function unmountRedundant(items, tags) {

	  var i = tags.length,
	    j = items.length,
	    t

	  while (i > j) {
	    t = tags[--i]
	    tags.splice(i, 1)
	    t.unmount()
	  }
	}

	/**
	 * Move the nested custom tags in non custom loop tags
	 * @param   { Object } child - non custom loop tag
	 * @param   { Number } i - current position of the loop tag
	 */
	function moveNestedTags(child, i) {
	  Object.keys(child.tags).forEach(function(tagName) {
	    var tag = child.tags[tagName]
	    if (isArray(tag))
	      each(tag, function (t) {
	        moveChildTag(t, tagName, i)
	      })
	    else
	      moveChildTag(tag, tagName, i)
	  })
	}

	/**
	 * Adds the elements for a virtual tag
	 * @param { Tag } tag - the tag whose root's children will be inserted or appended
	 * @param { Node } src - the node that will do the inserting or appending
	 * @param { Tag } target - only if inserting, insert before this tag's first child
	 */
	function addVirtual(tag, src, target) {
	  var el = tag._root, sib
	  tag._virts = []
	  while (el) {
	    sib = el.nextSibling
	    if (target)
	      src.insertBefore(el, target._root)
	    else
	      src.appendChild(el)

	    tag._virts.push(el) // hold for unmounting
	    el = sib
	  }
	}

	/**
	 * Move virtual tag and all child nodes
	 * @param { Tag } tag - first child reference used to start move
	 * @param { Node } src  - the node that will do the inserting
	 * @param { Tag } target - insert before this tag's first child
	 * @param { Number } len - how many child nodes to move
	 */
	function moveVirtual(tag, src, target, len) {
	  var el = tag._root, sib, i = 0
	  for (; i < len; i++) {
	    sib = el.nextSibling
	    src.insertBefore(el, target._root)
	    el = sib
	  }
	}


	/**
	 * Manage tags having the 'each'
	 * @param   { Object } dom - DOM node we need to loop
	 * @param   { Tag } parent - parent tag instance where the dom node is contained
	 * @param   { String } expr - string contained in the 'each' attribute
	 */
	function _each(dom, parent, expr) {

	  // remove the each property from the original tag
	  remAttr(dom, 'each')

	  var mustReorder = typeof getAttr(dom, 'no-reorder') !== T_STRING || remAttr(dom, 'no-reorder'),
	    tagName = getTagName(dom),
	    impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
	    useRoot = SPECIAL_TAGS_REGEX.test(tagName),
	    root = dom.parentNode,
	    ref = document.createTextNode(''),
	    child = getTag(dom),
	    isOption = tagName.toLowerCase() === 'option', // the option tags must be treated differently
	    tags = [],
	    oldItems = [],
	    hasKeys,
	    isVirtual = dom.tagName == 'VIRTUAL'

	  // parse the each expression
	  expr = tmpl.loopKeys(expr)

	  // insert a marked where the loop tags will be injected
	  root.insertBefore(ref, dom)

	  // clean template code
	  parent.one('before-mount', function () {

	    // remove the original DOM node
	    dom.parentNode.removeChild(dom)
	    if (root.stub) root = parent.root

	  }).on('update', function () {
	    // get the new items collection
	    var items = tmpl(expr.val, parent),
	      // create a fragment to hold the new DOM nodes to inject in the parent tag
	      frag = document.createDocumentFragment()

	    // object loop. any changes cause full redraw
	    if (!isArray(items)) {
	      hasKeys = items || false
	      items = hasKeys ?
	        Object.keys(items).map(function (key) {
	          return mkitem(expr, key, items[key])
	        }) : []
	    }

	    // loop all the new items
	    var i = 0,
	      itemsLength = items.length

	    for (; i < itemsLength; i++) {
	      // reorder only if the items are objects
	      var
	        item = items[i],
	        _mustReorder = mustReorder && typeof item == T_OBJECT && !hasKeys,
	        oldPos = oldItems.indexOf(item),
	        pos = ~oldPos && _mustReorder ? oldPos : i,
	        // does a tag exist in this position?
	        tag = tags[pos]

	      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item

	      // new tag
	      if (
	        !_mustReorder && !tag // with no-reorder we just update the old tags
	        ||
	        _mustReorder && !~oldPos || !tag // by default we always try to reorder the DOM elements
	      ) {

	        tag = new Tag(impl, {
	          parent: parent,
	          isLoop: true,
	          hasImpl: !!__tagImpl[tagName],
	          root: useRoot ? root : dom.cloneNode(),
	          item: item
	        }, dom.innerHTML)

	        tag.mount()

	        if (isVirtual) tag._root = tag.root.firstChild // save reference for further moves or inserts
	        // this tag must be appended
	        if (i == tags.length || !tags[i]) { // fix 1581
	          if (isVirtual)
	            addVirtual(tag, frag)
	          else frag.appendChild(tag.root)
	        }
	        // this tag must be insert
	        else {
	          if (isVirtual)
	            addVirtual(tag, root, tags[i])
	          else root.insertBefore(tag.root, tags[i].root) // #1374 some browsers reset selected here
	          oldItems.splice(i, 0, item)
	        }

	        tags.splice(i, 0, tag)
	        pos = i // handled here so no move
	      } else tag.update(item, true)

	      // reorder the tag if it's not located in its previous position
	      if (
	        pos !== i && _mustReorder &&
	        tags[i] // fix 1581 unable to reproduce it in a test!
	      ) {
	        // update the DOM
	        if (isVirtual)
	          moveVirtual(tag, root, tags[i], dom.childNodes.length)
	        else root.insertBefore(tag.root, tags[i].root)
	        // update the position attribute if it exists
	        if (expr.pos)
	          tag[expr.pos] = i
	        // move the old tag instance
	        tags.splice(i, 0, tags.splice(pos, 1)[0])
	        // move the old item
	        oldItems.splice(i, 0, oldItems.splice(pos, 1)[0])
	        // if the loop tags are not custom
	        // we need to move all their custom tags into the right position
	        if (!child && tag.tags) moveNestedTags(tag, i)
	      }

	      // cache the original item to use it in the events bound to this node
	      // and its children
	      tag._item = item
	      // cache the real parent tag internally
	      defineProperty(tag, '_parent', parent)
	    }

	    // remove the redundant tags
	    unmountRedundant(items, tags)

	    // insert the new nodes
	    root.insertBefore(frag, ref)
	    if (isOption) {

	      // #1374 FireFox bug in <option selected={expression}>
	      if (FIREFOX && !root.multiple) {
	        for (var n = 0; n < root.length; n++) {
	          if (root[n].__riot1374) {
	            root.selectedIndex = n  // clear other options
	            delete root[n].__riot1374
	            break
	          }
	        }
	      }
	    }

	    // set the 'tags' property of the parent tag
	    // if child is 'undefined' it means that we don't need to set this property
	    // for example:
	    // we don't need store the `myTag.tags['div']` property if we are looping a div tag
	    // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
	    if (child) parent.tags[tagName] = tags

	    // clone the items array
	    oldItems = items.slice()

	  })

	}
	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */
	var styleManager = (function(_riot) {

	  if (!window) return { // skip injection on the server
	    add: function () {},
	    inject: function () {}
	  }

	  var styleNode = (function () {
	    // create a new style element with the correct type
	    var newNode = mkEl('style')
	    setAttr(newNode, 'type', 'text/css')

	    // replace any user node or insert the new one into the head
	    var userNode = $('style[type=riot]')
	    if (userNode) {
	      if (userNode.id) newNode.id = userNode.id
	      userNode.parentNode.replaceChild(newNode, userNode)
	    }
	    else document.getElementsByTagName('head')[0].appendChild(newNode)

	    return newNode
	  })()

	  // Create cache and shortcut to the correct property
	  var cssTextProp = styleNode.styleSheet,
	    stylesToInject = ''

	  // Expose the style node in a non-modificable property
	  Object.defineProperty(_riot, 'styleNode', {
	    value: styleNode,
	    writable: true
	  })

	  /**
	   * Public api
	   */
	  return {
	    /**
	     * Save a tag style to be later injected into DOM
	     * @param   { String } css [description]
	     */
	    add: function(css) {
	      stylesToInject += css
	    },
	    /**
	     * Inject all previously saved tag styles into DOM
	     * innerHTML seems slow: http://jsperf.com/riot-insert-style
	     */
	    inject: function() {
	      if (stylesToInject) {
	        if (cssTextProp) cssTextProp.cssText += stylesToInject
	        else styleNode.innerHTML += stylesToInject
	        stylesToInject = ''
	      }
	    }
	  }

	})(riot)


	function parseNamedElements(root, tag, childTags, forceParsingNamed) {

	  walk(root, function(dom) {
	    if (dom.nodeType == 1) {
	      dom.isLoop = dom.isLoop ||
	                  (dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each'))
	                    ? 1 : 0

	      // custom child tag
	      if (childTags) {
	        var child = getTag(dom)

	        if (child && !dom.isLoop)
	          childTags.push(initChildTag(child, {root: dom, parent: tag}, dom.innerHTML, tag))
	      }

	      if (!dom.isLoop || forceParsingNamed)
	        setNamed(dom, tag, [])
	    }

	  })

	}

	function parseExpressions(root, tag, expressions) {

	  function addExpr(dom, val, extra) {
	    if (tmpl.hasExpr(val)) {
	      expressions.push(extend({ dom: dom, expr: val }, extra))
	    }
	  }

	  walk(root, function(dom) {
	    var type = dom.nodeType,
	      attr

	    // text node
	    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
	    if (type != 1) return

	    /* element */

	    // loop
	    attr = getAttr(dom, 'each')

	    if (attr) { _each(dom, tag, attr); return false }

	    // attribute expressions
	    each(dom.attributes, function(attr) {
	      var name = attr.name,
	        bool = name.split('__')[1]

	      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
	      if (bool) { remAttr(dom, name); return false }

	    })

	    // skip custom tags
	    if (getTag(dom)) return false

	  })

	}
	function Tag(impl, conf, innerHTML) {

	  var self = riot.observable(this),
	    opts = inherit(conf.opts) || {},
	    parent = conf.parent,
	    isLoop = conf.isLoop,
	    hasImpl = conf.hasImpl,
	    item = cleanUpData(conf.item),
	    expressions = [],
	    childTags = [],
	    root = conf.root,
	    tagName = root.tagName.toLowerCase(),
	    attr = {},
	    propsInSyncWithParent = [],
	    dom

	  // only call unmount if we have a valid __tagImpl (has name property)
	  if (impl.name && root._tag) root._tag.unmount(true)

	  // not yet mounted
	  this.isMounted = false
	  root.isLoop = isLoop

	  // keep a reference to the tag just created
	  // so we will be able to mount this tag multiple times
	  root._tag = this

	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  defineProperty(this, '_riot_id', ++__uid) // base 1 allows test !t._riot_id

	  extend(this, { parent: parent, root: root, opts: opts}, item)
	  // protect the "tags" property from being overridden
	  defineProperty(this, 'tags', {})

	  // grab attributes
	  each(root.attributes, function(el) {
	    var val = el.value
	    // remember attributes with expressions only
	    if (tmpl.hasExpr(val)) attr[el.name] = val
	  })

	  dom = mkdom(impl.tmpl, innerHTML)

	  // options
	  function updateOpts() {
	    var ctx = hasImpl && isLoop ? self : parent || self

	    // update opts from current DOM attributes
	    each(root.attributes, function(el) {
	      var val = el.value
	      opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val
	    })
	    // recover those with expressions
	    each(Object.keys(attr), function(name) {
	      opts[toCamel(name)] = tmpl(attr[name], ctx)
	    })
	  }

	  function normalizeData(data) {
	    for (var key in item) {
	      if (typeof self[key] !== T_UNDEF && isWritable(self, key))
	        self[key] = data[key]
	    }
	  }

	  function inheritFromParent () {
	    if (!self.parent || !isLoop) return
	    each(Object.keys(self.parent), function(k) {
	      // some properties must be always in sync with the parent tag
	      var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k)
	      if (typeof self[k] === T_UNDEF || mustSync) {
	        // track the property to keep in sync
	        // so we can keep it updated
	        if (!mustSync) propsInSyncWithParent.push(k)
	        self[k] = self.parent[k]
	      }
	    })
	  }

	  /**
	   * Update the tag expressions and options
	   * @param   { * }  data - data we want to use to extend the tag properties
	   * @param   { Boolean } isInherited - is this update coming from a parent tag?
	   * @returns { self }
	   */
	  defineProperty(this, 'update', function(data, isInherited) {

	    // make sure the data passed will not override
	    // the component core methods
	    data = cleanUpData(data)
	    // inherit properties from the parent
	    inheritFromParent()
	    // normalize the tag properties in case an item object was initially passed
	    if (data && isObject(item)) {
	      normalizeData(data)
	      item = data
	    }
	    extend(self, data)
	    updateOpts()
	    self.trigger('update', data)
	    update(expressions, self)

	    // the updated event will be triggered
	    // once the DOM will be ready and all the re-flows are completed
	    // this is useful if you want to get the "real" root properties
	    // 4 ex: root.offsetWidth ...
	    if (isInherited && self.parent)
	      // closes #1599
	      self.parent.one('updated', function() { self.trigger('updated') })
	    else rAF(function() { self.trigger('updated') })

	    return this
	  })

	  defineProperty(this, 'mixin', function() {
	    each(arguments, function(mix) {
	      var instance,
	        props = [],
	        obj

	      mix = typeof mix === T_STRING ? riot.mixin(mix) : mix

	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix()
	      } else instance = mix

	      // build multilevel prototype inheritance chain property list
	      do props = props.concat(Object.getOwnPropertyNames(obj || instance))
	      while (obj = Object.getPrototypeOf(obj || instance))

	      // loop the keys in the function prototype or the all object keys
	      each(props, function(key) {
	        // bind methods to self
	        if (key != 'init' && !self[key])
	          // apply method only if it does not already exist on the instance
	          self[key] = isFunction(instance[key]) ?
	            instance[key].bind(self) :
	            instance[key]
	      })

	      // init method will be called automatically
	      if (instance.init) instance.init.bind(self)()
	    })
	    return this
	  })

	  defineProperty(this, 'mount', function() {

	    updateOpts()

	    // add global mixins
	    var globalMixin = riot.mixin(GLOBAL_MIXIN)
	    if (globalMixin)
	      for (var i in globalMixin)
	        if (globalMixin.hasOwnProperty(i))
	          self.mixin(globalMixin[i])

	    // initialiation
	    if (impl.fn) impl.fn.call(self, opts)

	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions(dom, self, expressions)

	    // mount the child tags
	    toggle(true)

	    // update the root adding custom attributes coming from the compiler
	    // it fixes also #1087
	    if (impl.attrs)
	      walkAttributes(impl.attrs, function (k, v) { setAttr(root, k, v) })
	    if (impl.attrs || hasImpl)
	      parseExpressions(self.root, self, expressions)

	    if (!self.parent || isLoop) self.update(item)

	    // internal use only, fixes #403
	    self.trigger('before-mount')

	    if (isLoop && !hasImpl) {
	      // update the root attribute for the looped elements
	      root = dom.firstChild
	    } else {
	      while (dom.firstChild) root.appendChild(dom.firstChild)
	      if (root.stub) root = parent.root
	    }

	    defineProperty(self, 'root', root)

	    // parse the named dom nodes in the looped child
	    // adding them to the parent as well
	    if (isLoop)
	      parseNamedElements(self.root, self.parent, null, true)

	    // if it's not a child tag we can trigger its mount event
	    if (!self.parent || self.parent.isMounted) {
	      self.isMounted = true
	      self.trigger('mount')
	    }
	    // otherwise we need to wait that the parent event gets triggered
	    else self.parent.one('mount', function() {
	      // avoid to trigger the `mount` event for the tags
	      // not visible included in an if statement
	      if (!isInStub(self.root)) {
	        self.parent.isMounted = self.isMounted = true
	        self.trigger('mount')
	      }
	    })
	  })


	  defineProperty(this, 'unmount', function(keepRootTag) {
	    var el = root,
	      p = el.parentNode,
	      ptag,
	      tagIndex = __virtualDom.indexOf(self)

	    self.trigger('before-unmount')

	    // remove this tag instance from the global virtualDom variable
	    if (~tagIndex)
	      __virtualDom.splice(tagIndex, 1)

	    if (p) {

	      if (parent) {
	        ptag = getImmediateCustomParentTag(parent)
	        // remove this tag from the parent tags object
	        // if there are multiple nested tags with same name..
	        // remove this element form the array
	        if (isArray(ptag.tags[tagName]))
	          each(ptag.tags[tagName], function(tag, i) {
	            if (tag._riot_id == self._riot_id)
	              ptag.tags[tagName].splice(i, 1)
	          })
	        else
	          // otherwise just delete the tag instance
	          ptag.tags[tagName] = undefined
	      }

	      else
	        while (el.firstChild) el.removeChild(el.firstChild)

	      if (!keepRootTag)
	        p.removeChild(el)
	      else {
	        // the riot-tag and the data-is attributes aren't needed anymore, remove them
	        remAttr(p, RIOT_TAG_IS)
	        remAttr(p, RIOT_TAG) // this will be removed in riot 3.0.0
	      }

	    }

	    if (this._virts) {
	      each(this._virts, function(v) {
	        if (v.parentNode) v.parentNode.removeChild(v)
	      })
	    }

	    self.trigger('unmount')
	    toggle()
	    self.off('*')
	    self.isMounted = false
	    delete root._tag

	  })

	  // proxy function to bind updates
	  // dispatched from a parent tag
	  function onChildUpdate(data) { self.update(data, true) }

	  function toggle(isMount) {

	    // mount/unmount children
	    each(childTags, function(child) { child[isMount ? 'mount' : 'unmount']() })

	    // listen/unlisten parent (events flow one way from parent to children)
	    if (!parent) return
	    var evt = isMount ? 'on' : 'off'

	    // the loop tags will be always in sync with the parent automatically
	    if (isLoop)
	      parent[evt]('unmount', self.unmount)
	    else {
	      parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount)
	    }
	  }


	  // named elements available for fn
	  parseNamedElements(dom, this, childTags)

	}
	/**
	 * Attach an event to a DOM node
	 * @param { String } name - event name
	 * @param { Function } handler - event callback
	 * @param { Object } dom - dom node
	 * @param { Tag } tag - tag instance
	 */
	function setEventHandler(name, handler, dom, tag) {

	  dom[name] = function(e) {

	    var ptag = tag._parent,
	      item = tag._item,
	      el

	    if (!item)
	      while (ptag && !item) {
	        item = ptag._item
	        ptag = ptag._parent
	      }

	    // cross browser event fix
	    e = e || window.event

	    // override the event properties
	    if (isWritable(e, 'currentTarget')) e.currentTarget = dom
	    if (isWritable(e, 'target')) e.target = e.srcElement
	    if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode

	    e.item = item

	    // prevent default behaviour (by default)
	    if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	      if (e.preventDefault) e.preventDefault()
	      e.returnValue = false
	    }

	    if (!e.preventUpdate) {
	      el = item ? getImmediateCustomParentTag(ptag) : tag
	      el.update()
	    }

	  }

	}


	/**
	 * Insert a DOM node replacing another one (used by if- attribute)
	 * @param   { Object } root - parent node
	 * @param   { Object } node - node replaced
	 * @param   { Object } before - node added
	 */
	function insertTo(root, node, before) {
	  if (!root) return
	  root.insertBefore(before, node)
	  root.removeChild(node)
	}

	/**
	 * Update the expressions in a Tag instance
	 * @param   { Array } expressions - expression that must be re evaluated
	 * @param   { Tag } tag - tag instance
	 */
	function update(expressions, tag) {

	  each(expressions, function(expr, i) {

	    var dom = expr.dom,
	      attrName = expr.attr,
	      value = tmpl(expr.expr, tag),
	      parent = expr.dom.parentNode

	    if (expr.bool) {
	      value = !!value
	    } else if (value == null) {
	      value = ''
	    }

	    // #1638: regression of #1612, update the dom only if the value of the
	    // expression was changed
	    if (expr.value === value) {
	      return
	    }
	    expr.value = value

	    // textarea and text nodes has no attribute name
	    if (!attrName) {
	      // about #815 w/o replace: the browser converts the value to a string,
	      // the comparison by "==" does too, but not in the server
	      value += ''
	      // test for parent avoids error with invalid assignment to nodeValue
	      if (parent) {
	        if (parent.tagName === 'TEXTAREA') {
	          parent.value = value                    // #1113
	          if (!IE_VERSION) dom.nodeValue = value  // #1625 IE throws here, nodeValue
	        }                                         // will be available on 'updated'
	        else dom.nodeValue = value
	      }
	      return
	    }

	    // ~~#1612: look for changes in dom.value when updating the value~~
	    if (attrName === 'value') {
	      dom.value = value
	      return
	    }

	    // remove original attribute
	    remAttr(dom, attrName)

	    // event handler
	    if (isFunction(value)) {
	      setEventHandler(attrName, value, dom, tag)

	    // if- conditional
	    } else if (attrName == 'if') {
	      var stub = expr.stub,
	        add = function() { insertTo(stub.parentNode, stub, dom) },
	        remove = function() { insertTo(dom.parentNode, dom, stub) }

	      // add to DOM
	      if (value) {
	        if (stub) {
	          add()
	          dom.inStub = false
	          // avoid to trigger the mount event if the tags is not visible yet
	          // maybe we can optimize this avoiding to mount the tag at all
	          if (!isInStub(dom)) {
	            walk(dom, function(el) {
	              if (el._tag && !el._tag.isMounted)
	                el._tag.isMounted = !!el._tag.trigger('mount')
	            })
	          }
	        }
	      // remove from DOM
	      } else {
	        stub = expr.stub = stub || document.createTextNode('')
	        // if the parentNode is defined we can easily replace the tag
	        if (dom.parentNode)
	          remove()
	        // otherwise we need to wait the updated event
	        else (tag.parent || tag).one('updated', remove)

	        dom.inStub = true
	      }
	    // show / hide
	    } else if (attrName === 'show') {
	      dom.style.display = value ? '' : 'none'

	    } else if (attrName === 'hide') {
	      dom.style.display = value ? 'none' : ''

	    } else if (expr.bool) {
	      dom[attrName] = value
	      if (value) setAttr(dom, attrName, attrName)
	      if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
	        dom.__riot1374 = value   // #1374
	      }

	    } else if (value === 0 || value && typeof value !== T_OBJECT) {
	      // <img src="{ expr }">
	      if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
	        attrName = attrName.slice(RIOT_PREFIX.length)
	      }
	      setAttr(dom, attrName, value)
	    }

	  })

	}
	/**
	 * Specialized function for looping an array-like collection with `each={}`
	 * @param   { Array } els - collection of items
	 * @param   {Function} fn - callback function
	 * @returns { Array } the array looped
	 */
	function each(els, fn) {
	  var len = els ? els.length : 0

	  for (var i = 0, el; i < len; i++) {
	    el = els[i]
	    // return false -> current item was removed by fn during the loop
	    if (el != null && fn(el, i) === false) i--
	  }
	  return els
	}

	/**
	 * Detect if the argument passed is a function
	 * @param   { * } v - whatever you want to pass to this function
	 * @returns { Boolean } -
	 */
	function isFunction(v) {
	  return typeof v === T_FUNCTION || false   // avoid IE problems
	}

	/**
	 * Get the outer html of any DOM node SVGs included
	 * @param   { Object } el - DOM node to parse
	 * @returns { String } el.outerHTML
	 */
	function getOuterHTML(el) {
	  if (el.outerHTML) return el.outerHTML
	  // some browsers do not support outerHTML on the SVGs tags
	  else {
	    var container = mkEl('div')
	    container.appendChild(el.cloneNode(true))
	    return container.innerHTML
	  }
	}

	/**
	 * Set the inner html of any DOM node SVGs included
	 * @param { Object } container - DOM node where we will inject the new html
	 * @param { String } html - html to inject
	 */
	function setInnerHTML(container, html) {
	  if (typeof container.innerHTML != T_UNDEF) container.innerHTML = html
	  // some browsers do not support innerHTML on the SVGs tags
	  else {
	    var doc = new DOMParser().parseFromString(html, 'application/xml')
	    container.appendChild(
	      container.ownerDocument.importNode(doc.documentElement, true)
	    )
	  }
	}

	/**
	 * Checks wether a DOM node must be considered part of an svg document
	 * @param   { String }  name - tag name
	 * @returns { Boolean } -
	 */
	function isSVGTag(name) {
	  return ~SVG_TAGS_LIST.indexOf(name)
	}

	/**
	 * Detect if the argument passed is an object, exclude null.
	 * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
	 * @param   { * } v - whatever you want to pass to this function
	 * @returns { Boolean } -
	 */
	function isObject(v) {
	  return v && typeof v === T_OBJECT         // typeof null is 'object'
	}

	/**
	 * Remove any DOM attribute from a node
	 * @param   { Object } dom - DOM node we want to update
	 * @param   { String } name - name of the property we want to remove
	 */
	function remAttr(dom, name) {
	  dom.removeAttribute(name)
	}

	/**
	 * Convert a string containing dashes to camel case
	 * @param   { String } string - input string
	 * @returns { String } my-string -> myString
	 */
	function toCamel(string) {
	  return string.replace(/-(\w)/g, function(_, c) {
	    return c.toUpperCase()
	  })
	}

	/**
	 * Get the value of any DOM attribute on a node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { String } name - name of the attribute we want to get
	 * @returns { String | undefined } name of the node attribute whether it exists
	 */
	function getAttr(dom, name) {
	  return dom.getAttribute(name)
	}

	/**
	 * Set any DOM attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  dom.setAttribute(name, val)
	}

	/**
	 * Detect the tag implementation by a DOM node
	 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	 */
	function getTag(dom) {
	  return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) ||
	    getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()]
	}
	/**
	 * Add a child tag to its parent into the `tags` object
	 * @param   { Object } tag - child tag instance
	 * @param   { String } tagName - key where the new tag will be stored
	 * @param   { Object } parent - tag instance where the new child tag will be included
	 */
	function addChildTag(tag, tagName, parent) {
	  var cachedTag = parent.tags[tagName]

	  // if there are multiple children tags having the same name
	  if (cachedTag) {
	    // if the parent tags property is not yet an array
	    // create it adding the first cached tag
	    if (!isArray(cachedTag))
	      // don't add the same tag twice
	      if (cachedTag !== tag)
	        parent.tags[tagName] = [cachedTag]
	    // add the new nested tag to the array
	    if (!contains(parent.tags[tagName], tag))
	      parent.tags[tagName].push(tag)
	  } else {
	    parent.tags[tagName] = tag
	  }
	}

	/**
	 * Move the position of a custom tag in its parent tag
	 * @param   { Object } tag - child tag instance
	 * @param   { String } tagName - key where the tag was stored
	 * @param   { Number } newPos - index where the new tag will be stored
	 */
	function moveChildTag(tag, tagName, newPos) {
	  var parent = tag.parent,
	    tags
	  // no parent no move
	  if (!parent) return

	  tags = parent.tags[tagName]

	  if (isArray(tags))
	    tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0])
	  else addChildTag(tag, tagName, parent)
	}

	/**
	 * Create a new child tag including it correctly into its parent
	 * @param   { Object } child - child tag implementation
	 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	 * @param   { String } innerHTML - inner html of the child node
	 * @param   { Object } parent - instance of the parent tag including the child custom tag
	 * @returns { Object } instance of the new child tag just created
	 */
	function initChildTag(child, opts, innerHTML, parent) {
	  var tag = new Tag(child, opts, innerHTML),
	    tagName = getTagName(opts.root),
	    ptag = getImmediateCustomParentTag(parent)
	  // fix for the parent attribute in the looped elements
	  tag.parent = ptag
	  // store the real parent tag
	  // in some cases this could be different from the custom parent tag
	  // for example in nested loops
	  tag._parent = parent

	  // add this tag to the custom parent tag
	  addChildTag(tag, tagName, ptag)
	  // and also to the real parent tag
	  if (ptag !== parent)
	    addChildTag(tag, tagName, parent)
	  // empty the child node once we got its template
	  // to avoid that its children get compiled multiple times
	  opts.root.innerHTML = ''

	  return tag
	}

	/**
	 * Loop backward all the parents tree to detect the first custom parent tag
	 * @param   { Object } tag - a Tag instance
	 * @returns { Object } the instance of the first custom parent tag found
	 */
	function getImmediateCustomParentTag(tag) {
	  var ptag = tag
	  while (!getTag(ptag.root)) {
	    if (!ptag.parent) break
	    ptag = ptag.parent
	  }
	  return ptag
	}

	/**
	 * Helper function to set an immutable property
	 * @param   { Object } el - object where the new property will be set
	 * @param   { String } key - object key where the new property will be stored
	 * @param   { * } value - value of the new property
	* @param   { Object } options - set the propery overriding the default options
	 * @returns { Object } - the initial object
	 */
	function defineProperty(el, key, value, options) {
	  Object.defineProperty(el, key, extend({
	    value: value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options))
	  return el
	}

	/**
	 * Get the tag name of any DOM node
	 * @param   { Object } dom - DOM node we want to parse
	 * @returns { String } name to identify this dom node in riot
	 */
	function getTagName(dom) {
	  var child = getTag(dom),
	    namedTag = getAttr(dom, 'name'),
	    tagName = namedTag && !tmpl.hasExpr(namedTag) ?
	                namedTag :
	              child ? child.name : dom.tagName.toLowerCase()

	  return tagName
	}

	/**
	 * Extend any object with other properties
	 * @param   { Object } src - source object
	 * @returns { Object } the resulting extended object
	 *
	 * var obj = { foo: 'baz' }
	 * extend(obj, {bar: 'bar', foo: 'bar'})
	 * console.log(obj) => {bar: 'bar', foo: 'bar'}
	 *
	 */
	function extend(src) {
	  var obj, args = arguments
	  for (var i = 1; i < args.length; ++i) {
	    if (obj = args[i]) {
	      for (var key in obj) {
	        // check if this property of the source object could be overridden
	        if (isWritable(src, key))
	          src[key] = obj[key]
	      }
	    }
	  }
	  return src
	}

	/**
	 * Check whether an array contains an item
	 * @param   { Array } arr - target array
	 * @param   { * } item - item to test
	 * @returns { Boolean } Does 'arr' contain 'item'?
	 */
	function contains(arr, item) {
	  return ~arr.indexOf(item)
	}

	/**
	 * Check whether an object is a kind of array
	 * @param   { * } a - anything
	 * @returns {Boolean} is 'a' an array?
	 */
	function isArray(a) { return Array.isArray(a) || a instanceof Array }

	/**
	 * Detect whether a property of an object could be overridden
	 * @param   { Object }  obj - source object
	 * @param   { String }  key - object property
	 * @returns { Boolean } is this property writable?
	 */
	function isWritable(obj, key) {
	  var props = Object.getOwnPropertyDescriptor(obj, key)
	  return typeof obj[key] === T_UNDEF || props && props.writable
	}


	/**
	 * With this function we avoid that the internal Tag methods get overridden
	 * @param   { Object } data - options we want to use to extend the tag instance
	 * @returns { Object } clean object without containing the riot internal reserved words
	 */
	function cleanUpData(data) {
	  if (!(data instanceof Tag) && !(data && typeof data.trigger == T_FUNCTION))
	    return data

	  var o = {}
	  for (var key in data) {
	    if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key]
	  }
	  return o
	}

	/**
	 * Walk down recursively all the children tags starting dom node
	 * @param   { Object }   dom - starting node where we will start the recursion
	 * @param   { Function } fn - callback to transform the child node just found
	 */
	function walk(dom, fn) {
	  if (dom) {
	    // stop the recursion
	    if (fn(dom) === false) return
	    else {
	      dom = dom.firstChild

	      while (dom) {
	        walk(dom, fn)
	        dom = dom.nextSibling
	      }
	    }
	  }
	}

	/**
	 * Minimize risk: only zero or one _space_ between attr & value
	 * @param   { String }   html - html string we want to parse
	 * @param   { Function } fn - callback function to apply on any attribute found
	 */
	function walkAttributes(html, fn) {
	  var m,
	    re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g

	  while (m = re.exec(html)) {
	    fn(m[1].toLowerCase(), m[2] || m[3] || m[4])
	  }
	}

	/**
	 * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	 * @param   { Object }  dom - DOM node we want to parse
	 * @returns { Boolean } -
	 */
	function isInStub(dom) {
	  while (dom) {
	    if (dom.inStub) return true
	    dom = dom.parentNode
	  }
	  return false
	}

	/**
	 * Create a generic DOM node
	 * @param   { String } name - name of the DOM node we want to create
	 * @param   { Boolean } isSvg - should we use a SVG as parent node?
	 * @returns { Object } DOM node just created
	 */
	function mkEl(name, isSvg) {
	  return isSvg ?
	    document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
	    document.createElement(name)
	}

	/**
	 * Shorter and fast way to select multiple nodes in the DOM
	 * @param   { String } selector - DOM selector
	 * @param   { Object } ctx - DOM node where the targets of our search will is located
	 * @returns { Object } dom nodes found
	 */
	function $$(selector, ctx) {
	  return (ctx || document).querySelectorAll(selector)
	}

	/**
	 * Shorter and fast way to select a single node in the DOM
	 * @param   { String } selector - unique dom selector
	 * @param   { Object } ctx - DOM node where the target of our search will is located
	 * @returns { Object } dom node found
	 */
	function $(selector, ctx) {
	  return (ctx || document).querySelector(selector)
	}

	/**
	 * Simple object prototypal inheritance
	 * @param   { Object } parent - parent object
	 * @returns { Object } child instance
	 */
	function inherit(parent) {
	  function Child() {}
	  Child.prototype = parent
	  return new Child()
	}

	/**
	 * Get the name property needed to identify a DOM node in riot
	 * @param   { Object } dom - DOM node we need to parse
	 * @returns { String | undefined } give us back a string to identify this dom node
	 */
	function getNamedKey(dom) {
	  return getAttr(dom, 'id') || getAttr(dom, 'name')
	}

	/**
	 * Set the named properties of a tag element
	 * @param { Object } dom - DOM node we need to parse
	 * @param { Object } parent - tag instance where the named dom element will be eventually added
	 * @param { Array } keys - list of all the tag instance properties
	 */
	function setNamed(dom, parent, keys) {
	  // get the key value we want to add to the tag instance
	  var key = getNamedKey(dom),
	    isArr,
	    // add the node detected to a tag instance using the named property
	    add = function(value) {
	      // avoid to override the tag properties already set
	      if (contains(keys, key)) return
	      // check whether this value is an array
	      isArr = isArray(value)
	      // if the key was never set
	      if (!value)
	        // set it once on the tag instance
	        parent[key] = dom
	      // if it was an array and not yet set
	      else if (!isArr || isArr && !contains(value, dom)) {
	        // add the dom node into the array
	        if (isArr)
	          value.push(dom)
	        else
	          parent[key] = [value, dom]
	      }
	    }

	  // skip the elements with no named properties
	  if (!key) return

	  // check whether this key has been already evaluated
	  if (tmpl.hasExpr(key))
	    // wait the first updated event only once
	    parent.one('mount', function() {
	      key = getNamedKey(dom)
	      add(parent[key])
	    })
	  else
	    add(parent[key])

	}

	/**
	 * Faster String startsWith alternative
	 * @param   { String } src - source string
	 * @param   { String } str - test string
	 * @returns { Boolean } -
	 */
	function startsWith(src, str) {
	  return src.slice(0, str.length) === str
	}

	/**
	 * requestAnimationFrame function
	 * Adapted from https://gist.github.com/paulirish/1579671, license MIT
	 */
	var rAF = (function (w) {
	  var raf = w.requestAnimationFrame    ||
	            w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame

	  if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {  // buggy iOS6
	    var lastTime = 0

	    raf = function (cb) {
	      var nowtime = Date.now(), timeout = Math.max(16 - (nowtime - lastTime), 0)
	      setTimeout(function () { cb(lastTime = nowtime + timeout) }, timeout)
	    }
	  }
	  return raf

	})(window || {})

	/**
	 * Mount a tag creating new Tag instance
	 * @param   { Object } root - dom node where the tag will be mounted
	 * @param   { String } tagName - name of the riot tag we want to mount
	 * @param   { Object } opts - options to pass to the Tag instance
	 * @returns { Tag } a new Tag instance
	 */
	function mountTo(root, tagName, opts) {
	  var tag = __tagImpl[tagName],
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML

	  // clear the inner html
	  root.innerHTML = ''

	  if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML)

	  if (tag && tag.mount) {
	    tag.mount()
	    // add this tag to the virtualDom variable
	    if (!contains(__virtualDom, tag)) __virtualDom.push(tag)
	  }

	  return tag
	}
	/**
	 * Riot public api
	 */

	// share methods for other riot parts, e.g. compiler
	riot.util = { brackets: brackets, tmpl: tmpl }

	/**
	 * Create a mixin that could be globally shared across all the tags
	 */
	riot.mixin = (function() {
	  var mixins = {},
	    globals = mixins[GLOBAL_MIXIN] = {},
	    _id = 0

	  /**
	   * Create/Return a mixin by its name
	   * @param   { String }  name - mixin name (global mixin if object)
	   * @param   { Object }  mixin - mixin logic
	   * @param   { Boolean } g - is global?
	   * @returns { Object }  the mixin logic
	   */
	  return function(name, mixin, g) {
	    // Unnamed global
	    if (isObject(name)) {
	      riot.mixin('__unnamed_'+_id++, name, true)
	      return
	    }

	    var store = g ? globals : mixins

	    // Getter
	    if (!mixin) {
	      if (typeof store[name] === T_UNDEF) {
	        throw new Error('Unregistered mixin: ' + name)
	      }
	      return store[name]
	    }
	    // Setter
	    if (isFunction(mixin)) {
	      extend(mixin.prototype, store[name] || {})
	      store[name] = mixin
	    }
	    else {
	      store[name] = extend(store[name] || {}, mixin)
	    }
	  }

	})()

	/**
	 * Create a new riot tag implementation
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   html - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	riot.tag = function(name, html, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs
	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css
	      css = ''
	    } else attrs = ''
	  }
	  if (css) {
	    if (isFunction(css)) fn = css
	    else styleManager.add(css)
	  }
	  name = name.toLowerCase()
	  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
	  return name
	}

	/**
	 * Create a new riot tag implementation (for use by the compiler)
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   html - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	riot.tag2 = function(name, html, css, attrs, fn) {
	  if (css) styleManager.add(css)
	  //if (bpair) riot.settings.brackets = bpair
	  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
	  return name
	}

	/**
	 * Mount a tag using a specific tag implementation
	 * @param   { String } selector - tag DOM selector
	 * @param   { String } tagName - tag implementation name
	 * @param   { Object } opts - tag logic
	 * @returns { Array } new tags instances
	 */
	riot.mount = function(selector, tagName, opts) {

	  var els,
	    allTags,
	    tags = []

	  // helper functions

	  function addRiotTags(arr) {
	    var list = ''
	    each(arr, function (e) {
	      if (!/[^-\w]/.test(e)) {
	        e = e.trim().toLowerCase()
	        list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]'
	      }
	    })
	    return list
	  }

	  function selectAllTags() {
	    var keys = Object.keys(__tagImpl)
	    return keys + addRiotTags(keys)
	  }

	  function pushTags(root) {
	    if (root.tagName) {
	      var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG)

	      // have tagName? force riot-tag to be the same
	      if (tagName && riotTag !== tagName) {
	        riotTag = tagName
	        setAttr(root, RIOT_TAG_IS, tagName)
	        setAttr(root, RIOT_TAG, tagName) // this will be removed in riot 3.0.0
	      }
	      var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts)

	      if (tag) tags.push(tag)
	    } else if (root.length) {
	      each(root, pushTags)   // assume nodeList
	    }
	  }

	  // ----- mount code -----

	  // inject styles into DOM
	  styleManager.inject()

	  if (isObject(tagName)) {
	    opts = tagName
	    tagName = 0
	  }

	  // crawl the DOM to find the tag
	  if (typeof selector === T_STRING) {
	    if (selector === '*')
	      // select all the tags registered
	      // and also the tags found with the riot-tag attribute set
	      selector = allTags = selectAllTags()
	    else
	      // or just the ones named like the selector
	      selector += addRiotTags(selector.split(/, */))

	    // make sure to pass always a selector
	    // to the querySelectorAll function
	    els = selector ? $$(selector) : []
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    els = selector

	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectAllTags()
	    // if the root els it's just a single tag
	    if (els.tagName)
	      els = $$(tagName, els)
	    else {
	      // select all the children for all the different root elements
	      var nodeList = []
	      each(els, function (_el) {
	        nodeList.push($$(tagName, _el))
	      })
	      els = nodeList
	    }
	    // get rid of the tagName
	    tagName = 0
	  }

	  pushTags(els)

	  return tags
	}

	/**
	 * Update all the tags instances created
	 * @returns { Array } all the tags instances
	 */
	riot.update = function() {
	  return each(__virtualDom, function(tag) {
	    tag.update()
	  })
	}

	/**
	 * Export the Virtual DOM
	 */
	riot.vdom = __virtualDom

	/**
	 * Export the Tag constructor
	 */
	riot.Tag = Tag
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (typeof exports === T_OBJECT)
	    module.exports = riot
	  else if ("function" === T_FUNCTION && typeof __webpack_require__(20) !== T_UNDEF)
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return riot }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else
	    window.riot = riot

	})(typeof window != 'undefined' ? window : void 0);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function($window) {
	    'use strict'

	    function environment() {

	        var _locationSplitted = $window.location.hostname.split("-");
	        var _environment;

	        if (_locationSplitted[0] === "localhost") {
	            _environment = {
	                env: "localhost",
	                envPrefix: "",
	                isLocalhost: true
	            };

	        } else {

	            _environment = {
	                env: "pro",
	                envPrefix: "",
	                isLocalhost: false
	            };

	        }

	        return _environment;

	    }

	    function checkIfIsUTS(path) {

	        var _planePath = path.map(function(item) {

	            var _auxString = "";
	            _auxString += (item.id || "");

	            return _auxString;

	        }).join(" ");

	        return ((_planePath.indexOf('uts') >= 0) || (_planePath.indexOf('medium-editor') >= 0));

	    }

	    /**
	     * Get full CSS path of any element
	     *
	     * Returns a jQuery-style CSS path, with IDs, classes and ':nth-child' pseudo-selectors.
	     *
	     * Can either build a full CSS path, from 'html' all the way to ':nth-child()', or a
	     * more optimised short path, stopping at the first parent with a specific ID,
	     * eg. "#content .top p" instead of "html body #main #content .top p:nth-child(3)"
	     */
	    function cssPath(el) {
	        var fullPath = 0, // Set to 1 to build ultra-specific full CSS-path, or 0 for optimised selector
	            useNthChild = 0, // Set to 1 to use ":nth-child()" pseudo-selectors to match the given element
	            cssPathStr = '',
	            testPath = '',
	            parents = [],
	            parentSelectors = [],
	            tagName,
	            cssId,
	            cssClass,
	            tagSelector,
	            vagueMatch,
	            nth,
	            i,
	            c;

	        // Go up the list of parent nodes and build unique identifier for each:
	        while (el) {
	            vagueMatch = 0;

	            // Get the node's HTML tag name in lowercase:
	            tagName = el.nodeName.toLowerCase();

	            // Get node's ID attribute, adding a '#':
	            cssId = (el.id) ? ('#' + el.id) : false;

	            // Get node's CSS classes, replacing spaces with '.':
	            cssClass = (el.className) ? ('.' + el.className.replace(/\s+/g, ".")) : '';

	            // Build a unique identifier for this parent node:
	            if (cssId) {
	                // Matched by ID:
	                tagSelector = tagName + cssId + cssClass;
	            } else if (cssClass) {
	                // Matched by class (will be checked for multiples afterwards):
	                tagSelector = tagName + cssClass;
	            } else {
	                // Couldn't match by ID or class, so use ":nth-child()" instead:
	                vagueMatch = 1;
	                tagSelector = tagName;
	            }

	            // Add this full tag selector to the parentSelectors array:
	            parentSelectors.unshift(tagSelector)

	            // If doing short/optimised CSS paths and this element has an ID, stop here:
	            if (cssId && !fullPath)
	                break;

	            // Go up to the next parent node:
	            el = el.parentNode !== document ? el.parentNode : false;

	        } // endwhile


	        // Build the CSS path string from the parent tag selectors:
	        for (i = 0; i < parentSelectors.length; i++) {
	            cssPathStr += ' ' + parentSelectors[i]; // + ' ' + cssPathStr;

	            // If using ":nth-child()" selectors and this selector has no ID / isn't the html or body tag:
	            if (useNthChild && !parentSelectors[i].match(/#/) && !parentSelectors[i].match(/^(html|body)$/)) {

	                // If there's no CSS class, or if the semi-complete CSS selector path matches multiple elements:
	                if (!parentSelectors[i].match(/\./) || $(cssPathStr).length > 1) {

	                    // Count element's previous siblings for ":nth-child" pseudo-selector:
	                    for (nth = 1, c = el; c.previousElementSibling; c = c.previousElementSibling, nth++);

	                    // Append ":nth-child()" to CSS path:
	                    cssPathStr += ":nth-child(" + nth + ")";
	                }
	            }

	        }

	        // Return trimmed full CSS path:
	        return cssPathStr.replace(/^[ \t]+|[ \t]+$/, '');
	    }

	    function getCSSPath(node) {
	        var ind, parts, siblingsArr, str;
	        parts = [];
	        while (node.parentElement) {
	            str = node.tagName.toLowerCase();
	            if (node.id) {
	                str += "#" + node.id;
	                //parts.unshift(str);
	                //break;
	            }
	            siblingsArr = Array.prototype.slice.call(node.parentElement.childNodes);
	            ind = siblingsArr.filter(function(n) {
	                return n.attributes != null;
	            }).indexOf(node);
	            parts.unshift(str + (":nth-child(" + (ind + 1) + ")"));
	            node = node.parentElement;
	        }
	        return parts.join(' > ');
	    }

	    function purgue(selector) {

	        var ANGULAR_PURGUE_CLASSES = /.ng-isolate-scope|.ng-pristine|.ng-valid|.ng-scope|/g;

	        return selector.replace(ANGULAR_PURGUE_CLASSES, '').replace(/\.\./g, '.');

	    }

	    function submit(selector) {

	        var _element;
	        var evt = document.createEvent("HTMLEvents");
	        evt.initEvent("submit", false, true);

	        if (typeof selector === "object") {
	            if (selector === document.body) {
	                return;
	            } else {
	                selector.dispatchEvent(evt);
	                submit(selector.parentElement);
	            }
	        } else {
	            _element = document.querySelector(selector)
	            _element.dispatchEvent(evt);
	            submit(_element.parentElement);
	        }

	    }

	    function change(selector) {

	        var _element = document.querySelector(selector);

	        if ("createEvent" in document) {

	            var evt = document.createEvent("HTMLEvents");
	            evt.initEvent("change", false, true);
	            _element.dispatchEvent(evt);

	        } else {

	            //_element.fireEvent("onchange");
	            //_element.fireEvent("onsubmit");

	        }

	    }

	    function jsonExport(pJson) {

	        var thisDate = new Date();
	        var fileName = location.host + "_" +
	            thisDate.getFullYear() + "_" +
	            thisDate.getMonth() + "_" +
	            thisDate.getDate() + "_" +
	            thisDate.getHours() + "_" +
	            thisDate.getMinutes() + "_" +
	            thisDate.getSeconds() + ".json";

	        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pJson));
	        var dlAnchorElem = document.createElement('a');
	        dlAnchorElem.setAttribute("href", dataStr);
	        dlAnchorElem.setAttribute("download", fileName);
	        dlAnchorElem.click();

	    }

	    function setStyle(pStyle) {
	        return JSON.stringify(pStyle).replace(/{|}|"/g, "").replace(",", ";"); //"
	    }

	    /* Public Methods */
	    exports.environment = environment;
	    exports.purgue = purgue;
	    exports.submit = submit;
	    exports.change = change;
	    exports.getCSSPath = getCSSPath;
	    exports.checkIfIsUTS = checkIfIsUTS;
	    exports.jsonExport = jsonExport;
	    exports.setStyle = setStyle;

	})(window);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict'

	    var request = __webpack_require__(4);
	    var properties = __webpack_require__(3).properties;
	    var utils = __webpack_require__(1);
	    var OAUTH_TOKEN = TOKENOAUTH;

	    exports.get = function(pOptions, callback) {

	        var url = properties.url[utils.environment().env].tour + "/" + pOptions.apiKey + "/" + pOptions.id;

	        request.get(url)
	        .set('token', OAUTH_TOKEN)
	        .end(callback);

	    };

	    exports.save = function(pTour, callback) {

	        request.post(properties.url[utils.environment().env].tour)
	            .send(pTour)
	            .set('token', OAUTH_TOKEN)
	            .end(callback);
	    }

	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	(function() {
	    'use strict'

	    var _connector = '/api';

	    exports.properties = {

	        url: {

	            localhost: {
	                icons: _connector + "/icons/bubble",
	                tour: "http://localhost:8080" + _connector + "/tours",
	            },
	            pro: {
	                icons: _connector + "/icons/bubble",
	                tour: "https://zahorijs-nefele.rhcloud.com" + _connector + "/tours",
	            }

	        }

	    }

	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  console.warn("Using browser-only version of superagent in non-browser environment");
	  root = this;
	}

	var Emitter = __webpack_require__(19);
	var requestBase = __webpack_require__(17);
	var isObject = __webpack_require__(5);

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Expose `request`.
	 */

	var request = module.exports = __webpack_require__(18).bind(null, Request);

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  throw Error("Browser-only verison of superagent could not find XHR");
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pushEncodedKeyValuePair(pairs, key, obj[key]);
	    }
	  }
	  return pairs.join('&');
	}

	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */

	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  } else if (isObject(val)) {
	    for(var subkey in val) {
	      pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	    }
	    return;
	  }
	  pairs.push(encodeURIComponent(key)
	    + '=' + encodeURIComponent(val));
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] =
	        decodeURIComponent(pair.slice(pos + 1));
	    }
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */

	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return str.split(/ *; */).reduce(function(obj, str){
	    var parts = str.split(/ *= */),
	        key = parts.shift(),
	        val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this._setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this._parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype._setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype._parseBody = function(str){
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype._setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    var new_err;
	    try {
	      if (res.status < 200 || res.status >= 300) {
	        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	        new_err.original = err;
	        new_err.response = res;
	        new_err.status = res.status;
	      }
	    } catch(e) {
	      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
	    }

	    // #1000 don't catch errors from the callback to avoid double calling it
	    if (new_err) {
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}

	/**
	 * Mixin `Emitter` and `requestBase`.
	 */

	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'basic'
	    }
	  }

	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	    break;

	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};

	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;

	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;

	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype._timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */

	Request.prototype._appendQueryString = function(){
	  var query = this._query.join('&');
	  if (query) {
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (0 == status) {
	      if (self.timedout) return self._timeoutError();
	      if (self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = 'download';
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  this._appendQueryString();

	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }

	  // send stuff
	  this.emit('request', this);

	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};


	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.options = function(url, data, fn){
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	request['del'] = del;
	request['delete'] = del;

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return null !== obj && 'object' === typeof obj;
	}

	module.exports = isObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function(riot) {
	    'use strict'

	    __webpack_require__(12);
	    __webpack_require__(14);
	    __webpack_require__(15);
	    __webpack_require__(16);
	    __webpack_require__(13);
	    var Steps = __webpack_require__(8);
	    var Tours = __webpack_require__(9);

	    function Editor() {

	        /* Revealing Methods */
	        this.init = init.bind(this);
	        this.tours = new Tours();
	        this.steps = new Steps();

	    }

	    /**
	     * Initialise our application's code.
	     */
	    function init() {

	        document.body.appendChild(document.createElement('ut-editor'));
	        riot.mount('*');

	    }

	    module.exports = Editor;

	})(window.riot);


/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function(riot) {
	    'use strict'

	    var tour = __webpack_require__(2);

	    function Steps() {

	        riot.observable(this);
	        this.data = [];
	        this.toSave = false;

	        /* Revealing Methods */

	        /* Event Handlers */
	        this.on('add', add.bind(this));
	        this.on('edit', edit.bind(this));
	        this.on('updateSteps', update.bind(this));
	    }

	    /*Private Methods*/

	    /**
	     * Method that adds a new step in steps Array
	     * @param {object} step Step object
	     */
	    function add(step) {

	        this.toSave = true;
	        step.id = new Date().getTime().toString();
	        this.data.push(JSON.parse(JSON.stringify(step)));
	        this.trigger('updated');

	    }

	    /**
	     * Method that edit a n-element from Steps
	     * @param  {integer} pIndex index integer
	     * @param  {object} pStep  step object
	     * @return {NA}        NA
	     */
	    function edit(pIndex, pStep) {

	        this.toSave = true;
	        this.data[pIndex] = pStep;
	        this.trigger('updated');

	    }

	    function update(pSteps){

	        this.data = pSteps;
	        this.trigger('updated');

	    }

	    module.exports = Steps;

	})(window.riot);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function(riot) {
	    'use strict'

	    var tour = __webpack_require__(2);

	    /**
	     * Main Tour class
	     */
	    function Tours() {

	        //Do this object observable to riotjs
	        riot.observable(this);

	        /* Public Variables */
	        this.activeTour;
	        this.isLoading = false;

	        /* Revealing Methods */
	        this.saveTour = saveTour.bind(this);
	        this.saveSteps = saveSteps.bind(this);

	        /* Event Handlers */
	        this.on('load', load.bind(this));
	    }

	    /*Private Methods*/

	    /**
	     * Method that load tours from back services
	     * @return {NA} NA
	     */
	    function load( pOptions ) {

	        loading.call(this, true);

	        tour.get(pOptions, function(err, data) {

	            if (data && data.body) {
	                this.activeTour = data.body;
	                this.trigger('updateTours', this.activeTour.steps);
	            }else{
	                this.activeTour = null;
	                this.trigger('updateTours', []);
	            }

	            loading.call(this, false);

	        }.bind(this));

	    }

	    function loading(isLoading){
	        this.isLoading = isLoading;
	        this.trigger('updated');
	    }

	    /**
	     * Method that save steps in a tour.
	     * @param  {Array} pSteps     steps array
	     * @param  {[type]} pOnsuccess [description]
	     * @param  {[type]} pOnError   [description]
	     * @return {[type]}            [description]
	     */
	    function saveSteps(pSteps, pOnsuccess, pOnError) {

	        loading.call(this, true);
	        this.activeTour.steps = pSteps;
	        this.activeTour.stepIdList = [];

	        for (var i = 0; i < this.activeTour.steps.length; i++) {
	            this.activeTour.stepIdList[i] = this.activeTour.steps[i].id;
	        }

	        tour.save(this.activeTour, function(err, data) {

	            loading.call(this, false);

	        }.bind(this));

	    }

	    function saveTour(pOptions, pOnsuccess, pOnError) {

	        loading.call(this, true);
	        
	        this.activeTour.apiKey = this.activeTour.apiKey || pOptions.apiKey;
	        this.activeTour.id = this.activeTour.id || pOptions.id;

	        this.activeTour.steps = this.activeTour.steps || [];
	        this.activeTour.stepIdList = this.activeTour.stepIdList || [];
	        this.activeTour.published = false;

	        for (var i = 0; i < this.activeTour.steps.length; i++) {
	            this.activeTour.stepIdList[i] = this.activeTour.steps[i].id;
	        }

	        tour.save(this.activeTour, function(err, data) {

	          if (data && data.body) {

	              this.activeTour = data.body;
	              this.trigger('updateTours', this.activeTour.steps);
	              loading.call(this, false);

	          }

	        }.bind(this));

	    }

	    module.exports = Tours;

	})(window.riot);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function($window) {

	    $window.riot = __webpack_require__(0);
	    __webpack_require__(7);
	    var Editor = __webpack_require__(6);

	    $window.zahorijs = $window.zahorijs || {};
	    $window.zahorijs = $window.zahorijs || {};

	    $window.zahorijs.editor = new Editor();
	    $window.zahorijs.editor.init();

	})(window);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict'

	    var request = __webpack_require__(4);
	    var properties = __webpack_require__(3).properties;
	    var utils = __webpack_require__(1);

	    exports.get = function(callback) {

	        request.get(properties.url[utils.environment().env].icons)
	            .end(callback);

	    }

	})();


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2('ut-editor', '<pointer></pointer> <step-stack></step-stack> <modal-editor></modal-editor>', 'ut-editor *,[riot-tag="ut-editor"] *,[data-is="ut-editor"] *{ line-height : 1; margin: 0; line-height: 1!important; font-family: sans-serif; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; box-sizing: border-box; } @media all and (min-width: 1px){ ut-editor *,[riot-tag="ut-editor"] *,[data-is="ut-editor"] *{ line-height : 1; margin: 0; line-height: 1!important; font-family: sans-serif; font-size: 16px!important; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; box-sizing: border-box!important; color: #444444; } ut-editor [type="checkbox"]:not(:checked),[riot-tag="ut-editor"] [type="checkbox"]:not(:checked),[data-is="ut-editor"] [type="checkbox"]:not(:checked),ut-editor [type="checkbox"]:checked,[riot-tag="ut-editor"] [type="checkbox"]:checked,[data-is="ut-editor"] [type="checkbox"]:checked{ position: initial; left: initial; visibility: initial; } ut-editor h1,[riot-tag="ut-editor"] h1,[data-is="ut-editor"] h1,ut-editor h2,[riot-tag="ut-editor"] h2,[data-is="ut-editor"] h2,ut-editor h3,[riot-tag="ut-editor"] h3,[data-is="ut-editor"] h3,ut-editor h4,[riot-tag="ut-editor"] h4,[data-is="ut-editor"] h4,ut-editor h5,[riot-tag="ut-editor"] h5,[data-is="ut-editor"] h5,ut-editor label,[riot-tag="ut-editor"] label,[data-is="ut-editor"] label{ display: block; margin-bottom: 10px; } ut-editor h1,[riot-tag="ut-editor"] h1,[data-is="ut-editor"] h1,ut-editor h2,[riot-tag="ut-editor"] h2,[data-is="ut-editor"] h2,ut-editor h3,[riot-tag="ut-editor"] h3,[data-is="ut-editor"] h3,ut-editor h4,[riot-tag="ut-editor"] h4,[data-is="ut-editor"] h4,ut-editor h5,[riot-tag="ut-editor"] h5,[data-is="ut-editor"] h5{ font-weight: bold; } ut-editor nav i,[riot-tag="ut-editor"] nav i,[data-is="ut-editor"] nav i{ height: initial; } ut-editor nav ul li a:hover,[riot-tag="ut-editor"] nav ul li a:hover,[data-is="ut-editor"] nav ul li a:hover,ut-editor nav ul li.active,[riot-tag="ut-editor"] nav ul li.active,[data-is="ut-editor"] nav ul li.active{ background-color: initial; } } ut-editor article,[riot-tag="ut-editor"] article,[data-is="ut-editor"] article,ut-editor aside,[riot-tag="ut-editor"] aside,[data-is="ut-editor"] aside,ut-editor details,[riot-tag="ut-editor"] details,[data-is="ut-editor"] details,ut-editor figcaption,[riot-tag="ut-editor"] figcaption,[data-is="ut-editor"] figcaption,ut-editor figure,[riot-tag="ut-editor"] figure,[data-is="ut-editor"] figure,ut-editor footer,[riot-tag="ut-editor"] footer,[data-is="ut-editor"] footer,ut-editor header,[riot-tag="ut-editor"] header,[data-is="ut-editor"] header,ut-editor main,[riot-tag="ut-editor"] main,[data-is="ut-editor"] main,ut-editor menu,[riot-tag="ut-editor"] menu,[data-is="ut-editor"] menu,ut-editor nav,[riot-tag="ut-editor"] nav,[data-is="ut-editor"] nav,ut-editor section,[riot-tag="ut-editor"] section,[data-is="ut-editor"] section,ut-editor summary,[riot-tag="ut-editor"] summary,[data-is="ut-editor"] summary{ display: block; } ut-editor audio,[riot-tag="ut-editor"] audio,[data-is="ut-editor"] audio,ut-editor canvas,[riot-tag="ut-editor"] canvas,[data-is="ut-editor"] canvas,ut-editor progress,[riot-tag="ut-editor"] progress,[data-is="ut-editor"] progress,ut-editor video,[riot-tag="ut-editor"] video,[data-is="ut-editor"] video{ display: inline-block; vertical-align: baseline; } ut-editor audio:not([controls]),[riot-tag="ut-editor"] audio:not([controls]),[data-is="ut-editor"] audio:not([controls]){ display: none; height: 0; } ut-editor [hidden],[riot-tag="ut-editor"] [hidden],[data-is="ut-editor"] [hidden],ut-editor template,[riot-tag="ut-editor"] template,[data-is="ut-editor"] template{ display: none; } ut-editor a,[riot-tag="ut-editor"] a,[data-is="ut-editor"] a{ background-color: transparent; } ut-editor a:active,[riot-tag="ut-editor"] a:active,[data-is="ut-editor"] a:active,ut-editor a:hover,[riot-tag="ut-editor"] a:hover,[data-is="ut-editor"] a:hover{ outline: 0; } ut-editor abbr[title],[riot-tag="ut-editor"] abbr[title],[data-is="ut-editor"] abbr[title]{ border-bottom: none; text-decoration: underline; text-decoration: underline dotted; } ut-editor b,[riot-tag="ut-editor"] b,[data-is="ut-editor"] b,ut-editor strong,[riot-tag="ut-editor"] strong,[data-is="ut-editor"] strong{ font-weight: inherit; } ut-editor b,[riot-tag="ut-editor"] b,[data-is="ut-editor"] b,ut-editor strong,[riot-tag="ut-editor"] strong,[data-is="ut-editor"] strong{ font-weight: bolder; } ut-editor dfn,[riot-tag="ut-editor"] dfn,[data-is="ut-editor"] dfn{ font-style: italic; } ut-editor h1,[riot-tag="ut-editor"] h1,[data-is="ut-editor"] h1{ font-size: 2em; margin: 0.67em 0; } ut-editor mark,[riot-tag="ut-editor"] mark,[data-is="ut-editor"] mark{ background-color: #ff0; color: #000; } ut-editor small,[riot-tag="ut-editor"] small,[data-is="ut-editor"] small{ font-size: 80%; } ut-editor sub,[riot-tag="ut-editor"] sub,[data-is="ut-editor"] sub,ut-editor sup,[riot-tag="ut-editor"] sup,[data-is="ut-editor"] sup{ font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } ut-editor sup,[riot-tag="ut-editor"] sup,[data-is="ut-editor"] sup{ top: -0.5em; } ut-editor sub,[riot-tag="ut-editor"] sub,[data-is="ut-editor"] sub{ bottom: -0.25em; } ut-editor img,[riot-tag="ut-editor"] img,[data-is="ut-editor"] img{ border: 0; } ut-editor svg:not(:root),[riot-tag="ut-editor"] svg:not(:root),[data-is="ut-editor"] svg:not(:root){ overflow: hidden; } ut-editor figure,[riot-tag="ut-editor"] figure,[data-is="ut-editor"] figure{ margin: 1em 40px; } ut-editor hr,[riot-tag="ut-editor"] hr,[data-is="ut-editor"] hr{ box-sizing: content-box; height: 0; overflow: visible; } ut-editor pre,[riot-tag="ut-editor"] pre,[data-is="ut-editor"] pre{ overflow: auto; } ut-editor code,[riot-tag="ut-editor"] code,[data-is="ut-editor"] code,ut-editor kbd,[riot-tag="ut-editor"] kbd,[data-is="ut-editor"] kbd,ut-editor pre,[riot-tag="ut-editor"] pre,[data-is="ut-editor"] pre,ut-editor samp,[riot-tag="ut-editor"] samp,[data-is="ut-editor"] samp{ font-family: monospace, monospace; font-size: 1em; } ut-editor button,[riot-tag="ut-editor"] button,[data-is="ut-editor"] button,ut-editor input,[riot-tag="ut-editor"] input,[data-is="ut-editor"] input,ut-editor optgroup,[riot-tag="ut-editor"] optgroup,[data-is="ut-editor"] optgroup,ut-editor select,[riot-tag="ut-editor"] select,[data-is="ut-editor"] select,ut-editor textarea,[riot-tag="ut-editor"] textarea,[data-is="ut-editor"] textarea{ font: inherit; margin: 0; } ut-editor button,[riot-tag="ut-editor"] button,[data-is="ut-editor"] button{ overflow: visible; } ut-editor button,[riot-tag="ut-editor"] button,[data-is="ut-editor"] button,ut-editor select,[riot-tag="ut-editor"] select,[data-is="ut-editor"] select{ text-transform: none; } ut-editor button,[riot-tag="ut-editor"] button,[data-is="ut-editor"] button,ut-editor html input[type="button"],[riot-tag="ut-editor"] html input[type="button"],[data-is="ut-editor"] html input[type="button"],ut-editor input[type="reset"],[riot-tag="ut-editor"] input[type="reset"],[data-is="ut-editor"] input[type="reset"],ut-editor input[type="submit"],[riot-tag="ut-editor"] input[type="submit"],[data-is="ut-editor"] input[type="submit"]{ -webkit-appearance: button; cursor: pointer; } ut-editor button[disabled],[riot-tag="ut-editor"] button[disabled],[data-is="ut-editor"] button[disabled],ut-editor html input[disabled],[riot-tag="ut-editor"] html input[disabled],[data-is="ut-editor"] html input[disabled]{ cursor: default; } ut-editor button::-moz-focus-inner,[riot-tag="ut-editor"] button::-moz-focus-inner,[data-is="ut-editor"] button::-moz-focus-inner,ut-editor input::-moz-focus-inner,[riot-tag="ut-editor"] input::-moz-focus-inner,[data-is="ut-editor"] input::-moz-focus-inner{ border: 0; padding: 0; } ut-editor button:-moz-focusring,[riot-tag="ut-editor"] button:-moz-focusring,[data-is="ut-editor"] button:-moz-focusring,ut-editor input:-moz-focusring,[riot-tag="ut-editor"] input:-moz-focusring,[data-is="ut-editor"] input:-moz-focusring{ outline: 1px dotted ButtonText; } ut-editor input,[riot-tag="ut-editor"] input,[data-is="ut-editor"] input{ line-height: normal; box-sizing: border-box; margin-top: 10px; } ut-editor input[type="checkbox"],[riot-tag="ut-editor"] input[type="checkbox"],[data-is="ut-editor"] input[type="checkbox"],ut-editor input[type="radio"],[riot-tag="ut-editor"] input[type="radio"],[data-is="ut-editor"] input[type="radio"]{ box-sizing: border-box; padding: 0; } ut-editor input[type="number"]::-webkit-inner-spin-button,[riot-tag="ut-editor"] input[type="number"]::-webkit-inner-spin-button,[data-is="ut-editor"] input[type="number"]::-webkit-inner-spin-button,ut-editor input[type="number"]::-webkit-outer-spin-button,[riot-tag="ut-editor"] input[type="number"]::-webkit-outer-spin-button,[data-is="ut-editor"] input[type="number"]::-webkit-outer-spin-button{ height: auto; } ut-editor input[type="search"],[riot-tag="ut-editor"] input[type="search"],[data-is="ut-editor"] input[type="search"]{ -webkit-appearance: textfield; } ut-editor input[type="search"]::-webkit-search-cancel-button,[riot-tag="ut-editor"] input[type="search"]::-webkit-search-cancel-button,[data-is="ut-editor"] input[type="search"]::-webkit-search-cancel-button,ut-editor input[type="search"]::-webkit-search-decoration,[riot-tag="ut-editor"] input[type="search"]::-webkit-search-decoration,[data-is="ut-editor"] input[type="search"]::-webkit-search-decoration{ -webkit-appearance: none; } ut-editor fieldset,[riot-tag="ut-editor"] fieldset,[data-is="ut-editor"] fieldset{ border: 1px solid #c0c0c0; margin: 0 2px; padding: 0.35em 0.625em 0.75em; } ut-editor legend,[riot-tag="ut-editor"] legend,[data-is="ut-editor"] legend{ border: 0; padding: 0; } ut-editor textarea,[riot-tag="ut-editor"] textarea,[data-is="ut-editor"] textarea{ overflow: auto; } ut-editor optgroup,[riot-tag="ut-editor"] optgroup,[data-is="ut-editor"] optgroup{ font-weight: bold; } ut-editor p,[riot-tag="ut-editor"] p,[data-is="ut-editor"] p{ margin: 0; } ut-editor .uts-btn,[riot-tag="ut-editor"] .uts-btn,[data-is="ut-editor"] .uts-btn{ -webkit-appearance: none; align-items: flex-start; background-color: rgb(91, 183, 91); background-image: linear-gradient(rgb(98, 196, 98), rgb(81, 163, 81)); background-repeat: repeat-x; border-bottom-color: rgba(0, 0, 0, 0.247059); border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; border-bottom-style: solid; border-bottom-width: 1px; border-image-outset: 0px; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; border-left-color: rgba(0, 0, 0, 0.0980392); border-left-style: solid; border-left-width: 1px; border-right-color: rgba(0, 0, 0, 0.0980392); border-right-style: solid; border-right-width: 1px; border-top-color: rgba(0, 0, 0, 0.0980392); border-top-left-radius: 4px; border-top-right-radius: 4px; border-top-style: solid; border-top-width: 1px; box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.0470588) 0px 1px 2px 0px; box-sizing: border-box; color: rgb(255, 255, 255); cursor: pointer; display: inline-block; font-family: sans-serif; font-size: 14px; font-stretch: normal; font-style: normal; font-variant: normal; font-weight: normal; height: 30px; letter-spacing: normal; line-height: 20px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; overflow-x: visible; overflow-y: visible; padding-bottom: 4px; padding-left: 12px; padding-right: 12px; padding-top: 4px; text-align: center; text-indent: 0px; text-rendering: auto; text-shadow: rgba(0, 0, 0, 0.247059) 0px -1px 0px; text-transform: none; vertical-align: middle; word-spacing: 0px; writing-mode: lr-tb; -webkit-writing-mode: horizontal-tb; } ut-editor .uts-btn:hover,[riot-tag="ut-editor"] .uts-btn:hover,[data-is="ut-editor"] .uts-btn:hover{ color: #fff; background-color: #47a447; border-color: #398439; }', '', function(opts) {


	      this.tours = zahorijs.editor.tours;
	      this.steps = zahorijs.editor.steps;

	      this.on('mount', function(){

	          this.tours.on('updated', function(){
	              this.update();
	          }.bind(this));

	          this.steps.on('updated', function(){
	              this.update();
	          }.bind(this));

	      }.bind(this));

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2('modal-editor', '<div id="uts-modal-editor" class="uts-modal-editor {open: isOpen}"> <div class="uts-modal-editor-container"> <div class="uts uts-close-icon" onclick="{close.bind(this, true)}"></div> <div class="uts page-header"> <h1>User Tour Editor</h1> <div class="uts buttons-group ng-scope"> <button type="button" class="uts uts-btn btn-success" onclick="{close.bind(this, true)}">Cancel</button> <button if="{!editing}" type="button" class="uts uts-btn btn-info" onclick="{addStep}" __disabled="{!step.title.es_ES || !step.title.en_US}">Add</button> <button if="{editing}" type="button" class="uts uts-btn btn-info" onclick="{saveStep}" __disabled="{!step.title.es_ES || !step.title.en_US}">Save</button> </div> </div> <div id="uts-modal-editor-content" class="uts-modal-editor-content"> <div class="uts uts-jumbotron"> <h2>Step Action</h2> <div class="uts checkbox" if="{!this.step.typewrite}"> <label><input id="doClick" type="checkbox" onchange="{toggleDoClick}"> Do Click</label> </div> <div class="uts checkbox" if="{!this.step.doClick}"> <label><input id="typewrite" type="checkbox" onchange="{toggleTypewrite}"> Typewrite</label> <label if="{this.step.typewrite}">Typewrite String</label> <input if="{this.step.typewrite}" id="typewriteValue" placeholder="Write something" type="text" class="uts form-control"> </div> </div> <div class="uts uts-jumbotron"> <h2>Step DOM Selector</h2> <div class="uts checkbox"> <label><input id="showDOMSelectorCheckbox" type="checkbox" onchange="{toggleShowDOMSelector}"> Change calculated DOM Selector</label> <label if="{showDomSelector}" class="uts-warning">ONLY DO IT IF YOU KNOW EXACTLY THE DOM SELECTOR</label> <label if="{showDomSelector}">DOM String Selector</label> <input id="DOMSelector" if="{showDomSelector}" type="text" class="uts form-control" value="{this.step.selector}"> </div> </div> <div class="uts uts-jumbotron"> <h2>Step title</h2> <label>Title (es_ES)</label> <input id="es_ES" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}"> <p></p> <label>Title (en_US)</label> <input id="en_US" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}"> <p></p> </div> <div class="uts uts-jumbotron"> <h2>Icon Selector</h2> <p></p> <button type="button" class="uts uts-btn btn-info" onclick="{showIconSelector}" if="{!showIconS}">Show Icon Selector</button> <button type="button" class="uts uts-btn btn-info" onclick="{hideIconSelector}" if="{showIconS}">Hide Icon Selector</button> <img class="uts-step-icon" riot-src="{step.icon.imageUrl}" if="{step.icon.imageUrl}"><div class="uts uts-close-icon uts-close-icon-selector" if="{step.icon.imageUrl}" onclick="{clearIconSelection}"></div> <p></p> <div class="uts-image-selector" if="{showIconS}"> <ul> <li each="{icon in icons}" class="{uts-image-selected: step.icon.id == icon.id}" onclick="{selectIcon}"> <img riot-src="{icon.imageUrl}"> </li> </ul> </div> </div> <p></p> <p></p> <div class="uts uts-jumbotron"> <h2>Description</h2> <label>Description (es_ES)</label> <div id="medium_editor_toolbar_01"></div> <textarea id="description_es_ES" placeholder="Give me a description" type="text" class="uts" name="description_es_ES"></textarea> <p></p> <label>Description (en_US)</label> <div id="medium_editor_toolbar_02"></div> <textarea id="description_en_US" placeholder="Give me a description" type="text" class="uts" name="description_en_US"></textarea> <p></p> </div> <div class="uts uts-jumbotron"> <h2>Custom Button</h2> <p></p> <div class="uts checkbox"> <label><input id="enableCustomButton" type="checkbox" onchange="{toggleCustomButton}"> Custom Button enabled</label> </div> <div if="{step.enableCustomButton}"> <label>Custom Button URL</label> <input id="urlCustomButton" placeholder="http://wikipedia.org" type="text" class="uts form-control"> <p></p> <label>Custom Button Name (es_ES)</label> <input id="customButtonEs_ES" placeholder="Give me a title" type="text" class="uts form-control"> <p></p> <label>Custom Button Name (en_US)</label> <input id="customButtonEn_US" placeholder="Give me a title" type="text" class="uts form-control"> <p></p> </div> </div> </div> </div> </div>', 'modal-editor input[type=\'checkbox\'],[riot-tag="modal-editor"] input[type=\'checkbox\'],[data-is="modal-editor"] input[type=\'checkbox\']{ display: inline-block; } modal-editor textarea,[riot-tag="modal-editor"] textarea,[data-is="modal-editor"] textarea{ display: none!important; } modal-editor .uts-modal-editor,[riot-tag="modal-editor"] .uts-modal-editor,[data-is="modal-editor"] .uts-modal-editor{ font-family: sans-serif; position: fixed; padding: 0px; width: 0px; height: 0px; margin: 0px; left: 0; background-color: rgba(128, 128, 128, 0.64); overflow: hidden; z-index: 9999999999999; } modal-editor .uts-modal-editor .uts-modal-editor-container,[riot-tag="modal-editor"] .uts-modal-editor .uts-modal-editor-container,[data-is="modal-editor"] .uts-modal-editor .uts-modal-editor-container{ padding: 20px; width: 60%; height: 100%; background-color: white; margin-left: auto; margin-right: auto; left: 0; right: 0; z-index: 99999999999999; bottom: 0; border: 1px solid #E0E0E0; border-radius: 5px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3); overflow: hidden; -webkit-transition: all 0.2s ease-out; -moz-transition: all 0.2s ease-out; -ms-transition: all 0.2s ease-out; -o-transition: all 0.2s ease-out; transition: all 0.2s ease-out; position: relative; } modal-editor .uts-modal-editor .uts-modal-editor-container .page-header,[riot-tag="modal-editor"] .uts-modal-editor .uts-modal-editor-container .page-header,[data-is="modal-editor"] .uts-modal-editor .uts-modal-editor-container .page-header{ margin: 0 0 12px 0; } modal-editor .uts-modal-editor .uts-modal-editor-container .uts-modal-editor-content,[riot-tag="modal-editor"] .uts-modal-editor .uts-modal-editor-container .uts-modal-editor-content,[data-is="modal-editor"] .uts-modal-editor .uts-modal-editor-container .uts-modal-editor-content{ overflow: auto; height: calc(100% - 100px); } modal-editor .uts-modal-editor.open,[riot-tag="modal-editor"] .uts-modal-editor.open,[data-is="modal-editor"] .uts-modal-editor.open{ top: 0; width: 100%; height: 100%; padding: 20px; } modal-editor .uts-modal-editor .h1,[riot-tag="modal-editor"] .uts-modal-editor .h1,[data-is="modal-editor"] .uts-modal-editor .h1,modal-editor .uts-modal-editor h1,[riot-tag="modal-editor"] .uts-modal-editor h1,[data-is="modal-editor"] .uts-modal-editor h1{ font-size: 26px; } modal-editor .uts-modal-editor .row,[riot-tag="modal-editor"] .uts-modal-editor .row,[data-is="modal-editor"] .uts-modal-editor .row{ margin-left: -15px; margin-right: -15px; } modal-editor .uts-modal-editor .uts-jumbotron,[riot-tag="modal-editor"] .uts-modal-editor .uts-jumbotron,[data-is="modal-editor"] .uts-modal-editor .uts-jumbotron{ padding: 30px; margin-bottom: 30px; color: inherit; background-color: #eee; border-radius: 6px; margin: 10px; } modal-editor .uts-modal-editor .uts-jumbotron p,[riot-tag="modal-editor"] .uts-modal-editor .uts-jumbotron p,[data-is="modal-editor"] .uts-modal-editor .uts-jumbotron p{ margin-bottom: 15px; font-size: 14px; font-weight: 200; } modal-editor .uts-modal-editor .form-control,[riot-tag="modal-editor"] .uts-modal-editor .form-control,[data-is="modal-editor"] .uts-modal-editor .form-control{ display: block; width: 100%; height: 34px; padding: 6px 12px; font-size: 14px; line-height: 1.42857143; color: #555; background-color: #fff; background-image: none; border: 1px solid #ccc; border-radius: 4px; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075); -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; } modal-editor .uts-modal-editor .uts-warning,[riot-tag="modal-editor"] .uts-modal-editor .uts-warning,[data-is="modal-editor"] .uts-modal-editor .uts-warning{ color: red; font-size: 14px!important; } modal-editor .uts-modal-editor .uts-btn,[riot-tag="modal-editor"] .uts-modal-editor .uts-btn,[data-is="modal-editor"] .uts-modal-editor .uts-btn{ display: inline-block; margin-bottom: 0; font-weight: 400; text-align: center; vertical-align: middle; cursor: pointer; background-image: none; border: 1px solid transparent; white-space: nowrap; padding: 6px 12px; font-size: 14px; line-height: 1.42857143; border-radius: 4px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } modal-editor .uts-modal-editor .btn-success,[riot-tag="modal-editor"] .uts-modal-editor .btn-success,[data-is="modal-editor"] .uts-modal-editor .btn-success{ color: #fff; background-color: #5cb85c; border-color: #4cae4c; } modal-editor .uts-modal-editor .btn-success:hover,[riot-tag="modal-editor"] .uts-modal-editor .btn-success:hover,[data-is="modal-editor"] .uts-modal-editor .btn-success:hover{ color: #fff; background-color: #47a447; border-color: #398439; } modal-editor .uts-modal-editor .btn-info,[riot-tag="modal-editor"] .uts-modal-editor .btn-info,[data-is="modal-editor"] .uts-modal-editor .btn-info{ color: #fff; background-color: #5bc0de; border-color: #46b8da; } modal-editor .uts-modal-editor .btn-info:hover,[riot-tag="modal-editor"] .uts-modal-editor .btn-info:hover,[data-is="modal-editor"] .uts-modal-editor .btn-info:hover{ color: #fff; background-color: #39b3d7; border-color: #269abc; } modal-editor .uts-modal-editor .uts-close-icon,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon{ top: 5px; position: absolute; right: 5px; display: inline-block; width: 17px; height: 17px; overflow: hidden; cursor: pointer; margin: 6px; } modal-editor .uts-modal-editor .uts-close-icon:hover::before,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon:hover::before,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon:hover::before,modal-editor .uts-modal-editor .uts-close-icon:hover::after,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon:hover::after,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon:hover::after{ background: #2f2f2f; } modal-editor .uts-modal-editor .uts-close-icon::before,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon::before,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon::before,modal-editor .uts-modal-editor .uts-close-icon::after,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon::after,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon::after{ content: \'\'; position: absolute; height: 1px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #b9b9b9; } modal-editor .uts-modal-editor .uts-close-icon::before,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon::before,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon::before{ -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); } modal-editor .uts-modal-editor .uts-close-icon::after,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon::after,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon::after{ -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); } modal-editor .uts-modal-editor .btn-info.disabled,[riot-tag="modal-editor"] .uts-modal-editor .btn-info.disabled,[data-is="modal-editor"] .uts-modal-editor .btn-info.disabled,modal-editor .uts-modal-editor .btn-info[disabled],[riot-tag="modal-editor"] .uts-modal-editor .btn-info[disabled],[data-is="modal-editor"] .uts-modal-editor .btn-info[disabled],modal-editor .uts-modal-editor .btn-info.disabled:hover,[riot-tag="modal-editor"] .uts-modal-editor .btn-info.disabled:hover,[data-is="modal-editor"] .uts-modal-editor .btn-info.disabled:hover{ background-color: #BDC9CD;; border-color: #46b8da; } modal-editor .uts-modal-editor .btn.disabled,[riot-tag="modal-editor"] .uts-modal-editor .btn.disabled,[data-is="modal-editor"] .uts-modal-editor .btn.disabled,modal-editor .uts-modal-editor .btn[disabled],[riot-tag="modal-editor"] .uts-modal-editor .btn[disabled],[data-is="modal-editor"] .uts-modal-editor .btn[disabled]{ cursor: not-allowed; pointer-events: none; opacity: .65; filter: alpha(opacity=65); -webkit-box-shadow: none; box-shadow: none; } modal-editor .uts-modal-editor .uts-image-selector,[riot-tag="modal-editor"] .uts-modal-editor .uts-image-selector,[data-is="modal-editor"] .uts-modal-editor .uts-image-selector{ background-color: #ffffff; } modal-editor .uts-modal-editor .uts-image-selector ul,[riot-tag="modal-editor"] .uts-modal-editor .uts-image-selector ul,[data-is="modal-editor"] .uts-modal-editor .uts-image-selector ul{ list-style: none; margin: 0px; padding: 0; max-height: 400px; overflow: auto; } modal-editor .uts-modal-editor .uts-image-selector li,[riot-tag="modal-editor"] .uts-modal-editor .uts-image-selector li,[data-is="modal-editor"] .uts-modal-editor .uts-image-selector li{ margin: 3px; border: 2px solid #ffffff; padding: 2px; display: inline-block; width: 35px; text-align: center; } modal-editor .uts-image-selector li.uts-image-selected,[riot-tag="modal-editor"] .uts-image-selector li.uts-image-selected,[data-is="modal-editor"] .uts-image-selector li.uts-image-selected{ border: 2px solid rgb(71, 164, 255); } modal-editor .uts-modal-editor .uts-image-selector li img,[riot-tag="modal-editor"] .uts-modal-editor .uts-image-selector li img,[data-is="modal-editor"] .uts-modal-editor .uts-image-selector li img{ max-width: 28px; vertical-align: middle; } modal-editor .uts-modal-editor .uts-step-icon,[riot-tag="modal-editor"] .uts-modal-editor .uts-step-icon,[data-is="modal-editor"] .uts-modal-editor .uts-step-icon{ max-width: 35px; margin-left: 10px; vertical-align: middle; } modal-editor .uts-modal-editor .uts-close-icon.uts-close-icon-selector,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector{ position: relative; margin-left: 15px; vertical-align: sub; } modal-editor .uts-modal-editor .uts-close-icon.uts-close-icon-selector::before,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector::before,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector::before,modal-editor .uts-modal-editor .uts-close-icon.uts-close-icon-selector::after,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector::after,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector::after{ background: #D63838; height: 2px; } modal-editor .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::before,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::before,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::before,modal-editor .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::after,[riot-tag="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::after,[data-is="modal-editor"] .uts-modal-editor .uts-close-icon.uts-close-icon-selector:hover::after{ background: #FF9292; }', '', function(opts) {


	  var utils = __webpack_require__(1);
	  var icons = __webpack_require__(11);

	  var tours = zahorijs.editor.tours;
	  var steps = zahorijs.editor.steps;

	  var OPTIONS_DESCRIPTION_ES_ES_EDITOR = {
	          selector: '#description_es_ES',
	          height: 200,
	          menubar: false,
	          mode : "textareas",
	          elementpath: false,
	          toolbar: 'undo redo | bold underline italic',
	          plugins: "wordcount",
	          valid_elements : 'strong/b,i,br',
	          keep_styles: false,
	          force_br_newlines : true,
	          force_p_newlines : false,
	          forced_root_block : ''
	      },
	      OPTIONS_DESCRIPTION_EN_US_EDITOR = {
	          selector: '#description_en_US',
	          height: 200,
	          menubar: false,
	          mode : "textareas",
	          elementpath: false,
	          toolbar: 'undo redo | bold underline italic',
	          plugins: "wordcount",
	          valid_elements : 'strong/b,i,br',
	          keep_styles: false,
	          force_br_newlines : true,
	          force_p_newlines : false,
	          forced_root_block : ''
	      };

	  var _oldBodyOverflow,
	      stepBackup;

	  this.step = {
	      title : {},
	      intro : {},
	      doClick : false,
	      typewrite : false,
	      typewriteValue : null,
	      icon : {},
	      enableCustomButton : false,
	      customButton : {},
	      urlCustomButton : null,
	  };

	  this.isOpen = false;
	  this.editing = false;
	  this.currentSelector;
	  this.stepIndex;
	  this.icons;
	  this.showIconS = false;
	  this.showDomSelector = false;

	  this.on('mount', function(e){});

	  this.open = open.bind(this);
	  this.openStep = openStep.bind(this);
	  this.close = close.bind(this);

	  this.readTitles = readTitles.bind(this);
	  this.toggleDoClick = toggleDoClick.bind(this);
	  this.toggleTypewrite = toggleTypewrite.bind(this);
	  this.toggleCustomButton = toggleCustomButton.bind(this);
	  this.toggleShowDOMSelector = toggleShowDOMSelector.bind(this);

	  this.showIconSelector = showIconSelector.bind(this);
	  this.hideIconSelector = hideIconSelector.bind(this);
	  this.selectIcon = selectIcon.bind(this);
	  this.clearIconSelection = clearIconSelection.bind(this);

	  this.addStep = addStep.bind(this);

	  this.saveStep = saveStep.bind(this);

	  function open(selector){

	      this.editing = false;
	      this["uts-modal-editor-content"].scrollTop = 0;

	      tinymceStart.call(this, function(){

	          reset.call(this);
	          if(!this.icons) {
	            loadIcons.call(this);
	          }
	          this.step.selector = selector;
	          this.isOpen = true;
	          _oldBodyOverflow = document.body.style.overflow;
	          document.body.style.overflow = "hidden";

	          this.update();

	      }.bind(this));

	  }

	  function openStep( pIndex, pStep ){

	    this.stepIndex = pIndex;
	    this.editing = true;

	    this["uts-modal-editor-content"].scrollTop = 0;

	    tinymceStart.call(this, function(){

	        reset.call(this);
	        if(!this.icons) {
	          loadIcons.call(this);
	        }
	        fillFields.call(this, pStep);
	        this.isOpen = true;

	        this.update();

	    }.bind(this));

	    stepBackup = JSON.parse(JSON.stringify(pStep));

	  }

	  function close( cancel ){

	      this.isOpen = false;
	      document.body.style.overflow = _oldBodyOverflow;

	      if(cancel && stepBackup){
	        fillFields.call(this, JSON.parse(JSON.stringify(stepBackup)));
	      }
	  }

	  function reset(){

	      this.doClick.checked = false;
	      this.typewrite.checked = false;
	      this.typewriteValue.value = "";
	      this.showDOMSelectorCheckbox.checked = false;
	      this.showDomSelector = false;

	      this.es_ES.value = "";
	      this.en_US.value = "";

	      this.description_es_ES.value = "";
	      this.description_en_US.value = "";

	      if(this.description_es_ES_Editor){
	          tinymce.get('description_es_ES').setContent("")
	      }

	      if(this.description_en_US_Editor){
	          tinymce.get('description_en_US').setContent("")
	      }

	      this.enableCustomButton.checked = false;
	      this.urlCustomButton.value = "";
	      this.customButtonEs_ES.value = "";
	      this.customButtonEn_US.value = "";

	      this.step = {
	          title : {},
	          intro : {},
	          doClick : false,
	          typewrite : false,
	          typewriteValue : null,
	          icon : {},
	          enableCustomButton : false,
	          customButton : {},
	          urlCustomButton : null,
	      };

	  }

	  function fillFields( pStep ){

	      this.doClick.checked = pStep.doClick;
	      this.typewrite.checked = pStep.typewrite;
	      this.typewriteValue.value = pStep.typewriteValue;

	      this.DOMSelector.value = pStep.selector;

	      this.es_ES.value = pStep.title.es_ES;
	      this.en_US.value = pStep.title.en_US;

	      if(this.description_es_ES_Editor){
	          tinymce.get('description_es_ES').setContent(pStep.intro.es_ES)
	      }

	      if(this.description_en_US_Editor){
	          tinymce.get('description_en_US').setContent(pStep.intro.en_US)
	      }

	      this.step.icon = pStep.icon;
	      this.enableCustomButton.checked = pStep.enableCustomButton;
	      this.urlCustomButton.value = pStep.urlCustomButton;
	      this.customButtonEs_ES.value = pStep.customButton.es_ES;
	      this.customButtonEn_US.value = pStep.customButton.en_US;
	      this.step = JSON.parse(JSON.stringify(pStep));

	      this.update();

	  }

	  function tinymceStart( callback ){

	      if(this.description_es_ES_Editor && this.description_en_US_Editor){

	          callback();

	      }else{

	          OPTIONS_DESCRIPTION_ES_ES_EDITOR.setup = setupTinyMCE.bind(this);
	          OPTIONS_DESCRIPTION_EN_US_EDITOR.setup = setupTinyMCE.bind(this);

	          if(!this.description_es_ES_Editor){
	              tinymce.init(OPTIONS_DESCRIPTION_ES_ES_EDITOR)
	          }

	          if(!this.description_en_US_Editor){
	              tinymce.init(OPTIONS_DESCRIPTION_EN_US_EDITOR)
	          }

	          function setupTinyMCE (ed) {

	            ed.on('init', function(args) {

	                console.debug(args.target.id);

	                if(args.target.id == "description_es_ES"){
	                  this.description_es_ES_Editor = true;
	                }

	                if(args.target.id == "description_en_US"){
	                  this.description_en_US_Editor = true;
	                }

	                if(this.description_es_ES_Editor && this.description_en_US_Editor){
	                  callback();
	                }

	            }.bind(this));

	          };

	      }

	  }

	  function readTitles( e ){
	      this.step.title[e.target.id] = e.target.value;
	  }

	  function toggleCustomButton(e) {
	      this.step.enableCustomButton = e.target.checked;
	  }

	  function toggleDoClick(e) {
	      this.step.doClick = e.target.checked;
	  }

	  function toggleTypewrite(e) {
	      this.step.typewrite = e.target.checked;
	  }

	  function toggleShowDOMSelector(e){
	      this.showDomSelector = e.target.checked;
	  }

	  function readFields(){

	      this.step.typewriteValue = this.typewriteValue.value;

	      if(this.showDomSelector){
	          this.step.selector = this.DOMSelector.value;
	      }

	      this.step.intro.es_ES = tinymce.get()[0].getContent();
	      this.step.intro.en_US = tinymce.get()[1].getContent();
	      this.step.urlCustomButton = this.urlCustomButton.value;
	      this.step.customButton.es_ES = this.customButtonEs_ES.value;
	      this.step.customButton.en_US = this.customButtonEn_US.value;

	  }

	  function showIconSelector(){
	      this.showIconS = true;
	  }

	  function hideIconSelector(){
	      this.showIconS = false;
	  }

	  function loadIcons(){

	      icons.get(function(err, data){

	          if(data && data.body && data.body.data && data.body.data.list){
	              this.icons = data.body.data.list;
	              this.update();
	          }

	      }.bind(this));

	  }

	  function selectIcon(event){
	      this.step.icon = event.item.icon;
	      this.step.iconId = this.step.icon.id
	      this.showIconS = false;
	  }

	  function clearIconSelection(){
	      this.step.icon = {};
	      this.step.iconId = null;
	      this.showIconS = false;
	  }

	  function addStep(){

	      readFields.call(this);

	      steps.trigger('add', this.step);
	      this.close();

	      if(this.step.doClick){
	          document.querySelector(this.step.selector).click();
	      }

	      if(this.step.typewrite){

	        var input = document.querySelector(this.step.selector);
	        input.value = this.step.typewriteValue;

	        utils.change(this.step.selector);
	        utils.submit(this.step.selector);

	      }

	  }

	  function saveStep(){

	      readFields.call(this);

	      steps.trigger('edit', this.stepIndex, this.step);
	      this.close();

	      if(this.step.doClick){
	          document.querySelector(this.step.selector).click();
	      }

	      if(this.step.typewrite){

	          var input = document.querySelector(this.step.selector);
	          input.value = this.step.typewriteValue;

	          utils.change(this.step.selector);
	          utils.submit(this.step.selector);

	      }

	  }

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2('pointer', '', '', '', function(opts) {

	        var utils = __webpack_require__(1);

	        var tours = zahorijs.editor.tours;

	        var CONTEXT_UTS_HIGHLIGHT_CLASS = "uts-highlight";
	        var modalEditor;

	        this.tours = tours;
	        this.currentSelector;

	        this.on('mount', build.bind(this));

	        function build() {

	            modalEditor = this.parent.tags['modal-editor'];
	            mouseListener.call(this);
	            clickListener.call(this);

	        }

	        function mouseListener(){

	            document.addEventListener('mouseover', function(event) {

	                if(!this.tours.activeTour || this.tours.isLoading || this.tours.stopRecord ){
	                  return;
	                }

	                var selector = utils.getCSSPath(event.target);

	                if (selector) {

	                    if(utils.checkIfIsUTS(event.path)){
	                      return;
	                    }

	                    var element = document.querySelector(selector);

	                    if(element){
	                        element.className = element.className + " uts-highlight";

	                        var removeLayer = function(e) {

	                            if (e.target) {
	                                e.target.className = e.target.className.replace(" uts-highlight", "");
	                                e.target.removeEventListener('mouseout', removeLayer);
	                            }

	                        }

	                        element.addEventListener('mouseout', removeLayer);

	                    }

	                }

	            }.bind(this));

	        }

	        function clickListener() {

	            document.addEventListener("click", function(e) {

	              if (e.target.className.indexOf(CONTEXT_UTS_HIGHLIGHT_CLASS) >= 0) {
	                  e.stopPropagation();
	                  e.preventDefault();
	                  this.currentSelector = utils.getCSSPath(e.target).replace('.' + CONTEXT_UTS_HIGHLIGHT_CLASS, '');
	                  addSimpleStep.call(this, this.currentSelector);
	              }

	            }.bind(this), true);
	        }

	        function addSimpleStep( ){
	            modalEditor.open(this.currentSelector);
	        }

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2('step-stack', '<nav id="utsStepsStack" class="uts-steps-stack {uts-to-left : toTheLeft}"> <div class="uts-steps-stack-header"> <p class="uts-steps-stack-to-left" title="move editor to the left" onclick="{toLeft}" if="{!toTheLeft}">&#8647;</p> <p class="uts-steps-stack-to-left" title="move editor to the right" onclick="{toRight}" if="{toTheLeft}">&#8649;</p> <div class="uts-steps-stack-record-icon" title="restart user tour recording" if="{steps.data.length > 0 && !tours.isLoading && tours.stopRecord}" onclick="{restartRecord}"><i class="fa fa-circle"></i></div> <div class="uts-steps-stack-record-icon" title="stop user tour recording" if="{steps.data.length > 0 && !tours.isLoading && !tours.stopRecord}" onclick="{stopRecord}"><i class="fa fa-pause"></i></div> <h2 class="uts-steps-stack-title">ZahoriJs.</h2> <div class="uts-steps-stack-play-icon" title="preview user tour" if="{steps.data.length > 0 && !tours.isLoading}" onclick="{play}"></div> </div> <div if="{tours.isLoading}">loading</div> <tour-manager id="tourManager" if="{!tours.isLoading}"></tour-manager> <ul class="uts-steps-stack__items" if="{!isEditingTour && !isConfiguratingEditor && !tours.isLoading}"> <li class="uts-steps-stack__item" each="{item, i in steps.data}" onclick="{playOnlyOne}"> <a class="uts-steps-stack__link" if="{!item.deleting}">{item.title.es_ES}</a> <div class="uts-steps-stack__buttons_wrapper" if="{!item.deleting}"><i class="fa fa-trash" title="delete step" data-deleting="true" onclick="{deleting}"></i><i class="fa fa-pencil" title="edit step" onclick="{editStep}"></i></div> <a class="uts-steps-stack__link uts-steps-stack__link__deleting" if="{item.deleting}">Are you sure?</a> <div class="uts-steps-stack__buttons_wrapper uts-steps-stack__link__deleting" if="{item.deleting}"><span class="uts-ok" data-stepindex="{i}" onclick="{deleteStep}">YES</span><span class="uts-no" data-deleting="false" onclick="{deleting}">NO</span></div> </li> </ul> <div class="uts-steps-stack-footer" if="{!isEditingTour && !isConfiguratingEditor}"> <div if="{!tours.isLoading}"> <i class="fa fa-cog uts-to-right" title="configure app ID" onclick="{configureEditor.bind(this,true)}" if="{!importingTour && showConfigButton}"></i> <div if="{tours.activeTour}"> <i class="fa fa-floppy-o" onclick="{saveSteps}" title="persist user tour in back" if="{!importingTour && steps.toSave}"> Save</i> <i class="fa fa-download uts-to-right" title="export user tour to JSON" onclick="{exportTour}" if="{!importingTour && (steps.data.length > 0)}"></i> <i class="fa fa-upload uts-to-right" title="import user tour from JSON" onclick="{openImportTour}" if="{!importingTour}"></i> <i class="fa fa-ban" onclick="{closeImportTour}" if="{importingTour}"> Cancel</i> <div class="uts-steps-stack-import-tour" if="{importingTour}"> <input type="file" id="selectedFile" onchange="{importFile}" style="display:none" accept=".json"> <input type="button" value="Browse..." onclick="document.getElementById(\'selectedFile\').click();"> </div> </div> </div> </div> </nav>', 'step-stack .uts-steps-stack,[riot-tag="step-stack"] .uts-steps-stack,[data-is="step-stack"] .uts-steps-stack{ height: initial; font-family: sans-serif; cursor: pointer; position: fixed; z-index: 999999; width: 350px; background-color: transparent; box-shadow: 1px 1px 2px #cfcfcf; bottom: 20px; right: 20px; -webkit-box-shadow: 0 2px 6px rgba(0,0,0,0.2); -moz-box-shadow: 0 2px 6px rgba(0,0,0,0.2); box-shadow: 0 2px 6px rgba(0,0,0,0.2); } step-stack .uts-steps-stack.uts-to-left,[riot-tag="step-stack"] .uts-steps-stack.uts-to-left,[data-is="step-stack"] .uts-steps-stack.uts-to-left{ font-size: 20px; left: 20px; color: #ffffff; } step-stack .uts-steps-stack .uts-steps-stack-header,[riot-tag="step-stack"] .uts-steps-stack .uts-steps-stack-header,[data-is="step-stack"] .uts-steps-stack .uts-steps-stack-header{ padding: 10px; text-align: center; border-bottom: 1px solid #EAEAEA; background-color: #2B2B2B; color: white; border: #2B2B2B; } step-stack .uts-steps-stack .uts-steps-stack-title,[riot-tag="step-stack"] .uts-steps-stack .uts-steps-stack-title,[data-is="step-stack"] .uts-steps-stack .uts-steps-stack-title{ font-weight: initial; color: #ffffff; font-size: 18px!important; font-weight: bold; padding: 0; margin: 0!important; } step-stack .uts-steps-stack .uts-steps-stack-footer,[riot-tag="step-stack"] .uts-steps-stack .uts-steps-stack-footer,[data-is="step-stack"] .uts-steps-stack .uts-steps-stack-footer{ min-height: 34px; font-family: sans-serif; font-size: 16px; padding: 4px 12px; border-bottom: 1px solid #EAEAEA; background-color: #D3D3D3; color: white; cursor: default; border: 1px solid #B7B7B7; } step-stack .uts-steps-stack-footer i,[riot-tag="step-stack"] .uts-steps-stack-footer i,[data-is="step-stack"] .uts-steps-stack-footer i{ color : #000000; cursor: pointer; margin-right: 20px; } step-stack .uts-steps-stack-footer i.uts-to-right,[riot-tag="step-stack"] .uts-steps-stack-footer i.uts-to-right,[data-is="step-stack"] .uts-steps-stack-footer i.uts-to-right{ float: right; margin-right: 0; margin-left: 15px; margin-top: 5px; } step-stack .uts-steps-stack-footer i:hover,[riot-tag="step-stack"] .uts-steps-stack-footer i:hover,[data-is="step-stack"] .uts-steps-stack-footer i:hover{ color: #576AAA; } step-stack .uts-steps-stack-import-tour,[riot-tag="step-stack"] .uts-steps-stack-import-tour,[data-is="step-stack"] .uts-steps-stack-import-tour{ padding: 3px; } step-stack .uts-steps-stack-import-tour textarea,[riot-tag="step-stack"] .uts-steps-stack-import-tour textarea,[data-is="step-stack"] .uts-steps-stack-import-tour textarea{ margin: 0px 0px 10px; height: 72px; width: 100%; box-sizing: border-box; height: 100%; resize: none; display: none; } step-stack .uts-steps-stack-to-left,[riot-tag="step-stack"] .uts-steps-stack-to-left,[data-is="step-stack"] .uts-steps-stack-to-left{ float: left; font-size: 22px!important; cursor: pointer; color: #ffffff; } step-stack .uts-steps-stack-to-right,[riot-tag="step-stack"] .uts-steps-stack-to-right,[data-is="step-stack"] .uts-steps-stack-to-right{ float: left; font-size: 22px; cursor: pointer; } step-stack .uts-steps-stack--active,[riot-tag="step-stack"] .uts-steps-stack--active,[data-is="step-stack"] .uts-steps-stack--active{ display: block; } step-stack .uts-steps-stack__items,[riot-tag="step-stack"] .uts-steps-stack__items,[data-is="step-stack"] .uts-steps-stack__items{ list-style: none; margin: 0; padding: 0; max-height: 250px; overflow: auto; background-color: white; } step-stack .uts-steps-stack__item,[riot-tag="step-stack"] .uts-steps-stack__item,[data-is="step-stack"] .uts-steps-stack__item{ display: block; margin-bottom: 4px; position: relative; width: 100%; } step-stack .uts-steps-stack__item:hover,[riot-tag="step-stack"] .uts-steps-stack__item:hover,[data-is="step-stack"] .uts-steps-stack__item:hover{ background-color: #F4F5F7; } step-stack .uts-steps-stack__item:last-child,[riot-tag="step-stack"] .uts-steps-stack__item:last-child,[data-is="step-stack"] .uts-steps-stack__item:last-child{ margin-bottom: 0; } step-stack .uts-steps-stack__link,[riot-tag="step-stack"] .uts-steps-stack__link,[data-is="step-stack"] .uts-steps-stack__link{ display: block; padding: 4px 12px; color: #565656; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: calc(100% - 75px); } step-stack .uts-steps-stack__buttons_wrapper,[riot-tag="step-stack"] .uts-steps-stack__buttons_wrapper,[data-is="step-stack"] .uts-steps-stack__buttons_wrapper{ color: #576AAA; position: absolute; top: 0; right: 0; width: 90px; text-align: right; padding: 4px 15px; visibility: hidden; } step-stack .uts-steps-stack__item:hover .uts-steps-stack__buttons_wrapper,[riot-tag="step-stack"] .uts-steps-stack__item:hover .uts-steps-stack__buttons_wrapper,[data-is="step-stack"] .uts-steps-stack__item:hover .uts-steps-stack__buttons_wrapper{ visibility: visible; } step-stack .uts-steps-stack__buttons_wrapper i,[riot-tag="step-stack"] .uts-steps-stack__buttons_wrapper i,[data-is="step-stack"] .uts-steps-stack__buttons_wrapper i{ margin-left: 15px; } step-stack .uts-steps-stack__buttons_wrapper .fa-trash,[riot-tag="step-stack"] .uts-steps-stack__buttons_wrapper .fa-trash,[data-is="step-stack"] .uts-steps-stack__buttons_wrapper .fa-trash{ color: #E95F5F; } step-stack .uts-steps-stack__link.uts-steps-stack__link__deleting,[riot-tag="step-stack"] .uts-steps-stack__link.uts-steps-stack__link__deleting,[data-is="step-stack"] .uts-steps-stack__link.uts-steps-stack__link__deleting{ color: #E95F5F; } step-stack .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting,[riot-tag="step-stack"] .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting,[data-is="step-stack"] .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting{ visibility: visible; width: 140px; } step-stack .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-ok,[riot-tag="step-stack"] .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-ok,[data-is="step-stack"] .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-ok{ color: #E95F5F; } step-stack .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-no,[riot-tag="step-stack"] .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-no,[data-is="step-stack"] .uts-steps-stack__item .uts-steps-stack__buttons_wrapper.uts-steps-stack__link__deleting .uts-no{ color: green; margin-right: 15px; margin-left: 30px; } step-stack .uts-steps-stack-play-icon,[riot-tag="step-stack"] .uts-steps-stack-play-icon,[data-is="step-stack"] .uts-steps-stack-play-icon{ width: 0; height: 0; border-style: solid; border-width: 7.5px 0 7.5px 13.0px; border-color: transparent transparent transparent #ffffff; position: absolute; right: 15px; top: 15px; cursor: pointer; } step-stack .uts-steps-stack-record-icon,[riot-tag="step-stack"] .uts-steps-stack-record-icon,[data-is="step-stack"] .uts-steps-stack-record-icon{ position: absolute; right: 46px; top: 15px; vertical-align: middle; } step-stack .uts-steps-stack-record-icon .fa-circle,[riot-tag="step-stack"] .uts-steps-stack-record-icon .fa-circle,[data-is="step-stack"] .uts-steps-stack-record-icon .fa-circle{ color: red; } step-stack .uts-steps-stack-record-icon .fa-pause,[riot-tag="step-stack"] .uts-steps-stack-record-icon .fa-pause,[data-is="step-stack"] .uts-steps-stack-record-icon .fa-pause{ color: white; }', '', function(opts) {


	      var utils = __webpack_require__(1);

	      var tours = zahorijs.editor.tours;
	      var steps = zahorijs.editor.steps;

	      var modalEditor,
	          tourManager;

	      this.tours = tours;
	      this.steps = steps;
	      this.toTheLeft = false;
	      this.importingTour = false;
	      this.isEditingTour = false;
	      this.isConfiguratingEditor = false;
	      this.showConfigButton = true;

	      this.play = play.bind(this);
	      this.playOnlyOne = playOnlyOne.bind(this);
	      this.toLeft = toLeft.bind(this);
	      this.toRight = toRight.bind(this);
	      this.deleting = deleting.bind(this);
	      this.deleteStep = deleteStep.bind(this);
	      this.editStep = editStep.bind(this);
	      this.exportTour = exportTour.bind(this);
	      this.openImportTour = openImportTour.bind(this);
	      this.closeImportTour = closeImportTour.bind(this);
	      this.saveSteps = saveSteps.bind(this);
	      this.configureEditor = configureEditor.bind(this);
	      this.editingTour = editingTour.bind(this);
	      this.stopRecord = stopRecord.bind(this);
	      this.restartRecord = restartRecord.bind(this);
	      this.importFile = importFile.bind(this);

	      this.on('mount', mounted.bind(this));

	      function mounted(){

	        modalEditor = this.parent.tags['modal-editor'];
	        tourManager = this.tags['tour-manager'];

	      }

	      function play(){
	          if(zahorijs && zahorijs.tour){
	            zahorijs.configure({header : this.tours.activeTour.header});
	            zahorijs.tour.start(steps.data);
	          }
	      }

	      function playOnlyOne( e ){
	          if(zahorijs && zahorijs.tour){
	              zahorijs.configure({header : this.tours.activeTour.header});
	              zahorijs.tour.start([steps.data[e.item.i]]);
	          }
	      }

	      function toLeft(){
	        this.toTheLeft = true;
	      }

	      function toRight(){
	        this.toTheLeft = false;
	      }

	      function deleting(e){
	        e.stopPropagation();
	        e.item.item.deleting = ( e.target.dataset.deleting == "true");
	      }

	      function deleteStep(e){
	        e.stopPropagation();
	        this.steps.data.splice(e.target.dataset.stepindex, 1);
	        this.steps.toSave = true;
	      }

	      function editStep(e){
	          e.stopPropagation();
	          modalEditor.openStep(e.item.i, this.steps.data[e.item.i]);
	      }

	      function exportTour(){
	          utils.jsonExport(this.steps.data);
	      }

	      function openImportTour(){
	          this.importingTour = true;
	          this.selectedFile.value = null;
	      }

	      function importFile(evt){

	          var file = evt.target.files[0];

	          if(!file){
	              return;
	          }

	          var reader = new FileReader();

	          reader.onload = (function(theFile) {

	              return function(e) {

	                  try{
	                      this.steps.data = JSON.parse(e.target.result);
	                  }catch(e){
	                      console.log("error importing tour json");
	                  }

	                  this.importingTour = false;
	                  this.steps.toSave = true;
	                  this.update();

	              }.bind(this);

	          }.bind(this))(file);

	          reader.readAsText(file);
	      }

	      function closeImportTour(){
	          this.importingTour = false;
	      }

	      function saveSteps(){
	          this.tours.saveSteps(this.steps.data);
	          this.steps.toSave = false;
	          this.update();
	      }

	      function editingTour( editing ){
	          this.isEditingTour = editing;
	          this.update();
	      }

	      function configureEditor( configure ){
	          this.isConfiguratingEditor = configure;
	          tourManager.configureEditor(configure);
	      }

	      function stopRecord(){
	          tours.stopRecord = true;
	          this.update();
	      }

	      function restartRecord(){
	          tours.stopRecord = false;
	          this.update();
	      }

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2('tour-manager', '<div id="utsToursManager" class="uts-tours-manager-wrapper"> <div if="{tours.activeTour && !configuratingEditor}" class="uts-tour-title"> <div class="uts-tour-title-text" if="{!creatingTour}">Tour: {tours.activeTour.name.es_ES}</div> <div class="uts-title__buttons_wrapper" title="edit user tour info" if="{!creatingTour}"><i class="fa fa-pencil" onclick="{showEditTour}" if="{!creatingTour}"></i></div> </div> <div if="{(!tours.activeTour && !configuratingEditor) || creatingTour}" class="uts-tour-editor-wrapper"> <button type="button" class="uts uts-btn btn-success" onclick="{showEditTour}" if="{!creatingTour}">Create Tour</button> <div if="{creatingTour}"> <label>Title (es_ES)</label> <input id="es_ES" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}" value="{tours.activeTour.name.es_ES}"> <p></p> <label>Title (en_US)</label> <input id="en_US" placeholder="Give me a title" type="text" class="uts form-control" onkeyup="{readTitles}" value="{tours.activeTour.name.en_US}"> <p></p> <i class="fa fa-ban" onclick="{hideEditTour.bind(this, true)}"> Cancel</i> <i class="fa fa-check" onclick="{saveTour}" if="{tours.activeTour.name.es_ES && tours.activeTour.name.en_US}"> Accept</i> </div> </div> <div if="{configuratingEditor}" class="uts-tour-editor-wrapper"> <div> <label>App ID</label> <input id="api_key" placeholder="API KEY" type="text" class="uts form-control" value="{editor.apiKey}"> <p></p> <label>App ID</label> <input id="app_id" placeholder="App ID" type="text" class="uts form-control" value="{editor.id}"> <p></p> <i class="fa fa-ban" onclick="{configureEditor.bind(this, false, false)}"> Cancel</i> <i class="fa fa-check" onclick="{setApiKey}"> Accept</i> </div> </div> </div>', 'tour-manager p,[riot-tag="tour-manager"] p,[data-is="tour-manager"] p{ margin-bottom: 10px; } tour-manager .uts-tours-manager-wrapper,[riot-tag="tour-manager"] .uts-tours-manager-wrapper,[data-is="tour-manager"] .uts-tours-manager-wrapper{ width: 100%; background-color: #E6E6E6; border: 1px solid #CCCCCC; } tour-manager .uts-tours-manager-wrapper .uts-tour-editor-wrapper,[riot-tag="tour-manager"] .uts-tours-manager-wrapper .uts-tour-editor-wrapper,[data-is="tour-manager"] .uts-tours-manager-wrapper .uts-tour-editor-wrapper{ padding: 10px; } tour-manager .uts-tours-manager-wrapper .form-control,[riot-tag="tour-manager"] .uts-tours-manager-wrapper .form-control,[data-is="tour-manager"] .uts-tours-manager-wrapper .form-control{ display: block; width: 100%; height: 34px; padding: 6px 12px; font-size: 14px; line-height: 1.42857143; color: #555; background-color: #fff; background-image: none; border: 1px solid #ccc; border-radius: 4px; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075); -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; } tour-manager .uts-tours-manager-wrapper .uts-tour-title,[riot-tag="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title,[data-is="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title{ position: relative; } tour-manager .uts-tours-manager-wrapper .uts-tour-title .uts-tour-title-text,[riot-tag="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title .uts-tour-title-text,[data-is="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title .uts-tour-title-text{ display: block; padding: 4px 12px; color: #576AAA; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: calc(100% - 75px); } tour-manager .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper,[riot-tag="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper,[data-is="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper{ color: #576AAA; position: absolute; top: 0; right: 0; width: 80px; text-align: right; padding: 4px 15px; } tour-manager .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper i,[riot-tag="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper i,[data-is="tour-manager"] .uts-tours-manager-wrapper .uts-tour-title .uts-title__buttons_wrapper i{ margin-left: 10px; } tour-manager .uts-tours-manager-wrapper .uts-tour-editor-wrapper i:hover,[riot-tag="tour-manager"] .uts-tours-manager-wrapper .uts-tour-editor-wrapper i:hover,[data-is="tour-manager"] .uts-tours-manager-wrapper .uts-tour-editor-wrapper i:hover{ color: #576AAA; }', '', function(opts) {


	      var utils = __webpack_require__(1);
	      var tour = __webpack_require__(2);

	      var tours = zahorijs.editor.tours;
	      var steps = zahorijs.editor.steps;

	      var tourInfoBackup,
	          apiKeyBackup;

	      this.tours = tours;
	      this.steps = steps;
	      this.creatingTour = false;
	      this.configuratingEditor = false;
	      this.editor = {
	          setApiKey : null
	      };

	      this.showEditTour = showEditTour.bind(this);
	      this.hideEditTour = hideEditTour.bind(this);
	      this.configureEditor = configureEditor.bind(this);
	      this.readTitles = readTitles.bind(this);
	      this.saveTour = saveTour.bind(this);
	      this.readApiKey = readApiKey.bind(this);
	      this.setApiKey = setApiKey.bind(this);
	      this.checkIsNumber = checkIsNumber.bind(this);

	      this.on('mount', onMount.bind(this));

	      function onMount(){

	        this.tours.on('updateTours', function(data){
	            this.steps.trigger('updateSteps', data);
	            this.update();
	        }.bind(this));

	        readApiKey.call(this);
	        this.tours.trigger('load', {apiKey : this.editor.apiKey, id : this.editor.id});

	      }

	      function readApiKey(){

	        this.editor.apiKey = localStorage.getItem("zahorijs.editor.apiKey");
	        this.editor.id = localStorage.getItem("zahorijs.editor.id");

	      }

	      function setApiKey( ){

	        this.editor.apiKey = this.api_key.value;
	        this.tours.activeTour = this.tours.activeTour || {};
	        this.tours.activeTour.name = this.tours.activeTour.name || {};
	        this.tours.activeTour.apiKey = this.editor.apiKey;

	        this.editor.id = this.app_id.value;
	        this.tours.activeTour.id = this.editor.id;

	        localStorage.setItem("zahorijs.editor.apiKey", this.api_key.value);
	        localStorage.setItem("zahorijs.editor.id", this.app_id.value);
	        this.tours.trigger('load', {apiKey : this.editor.apiKey, id : this.editor.id});
	        configureEditor.call(this, true, true);
	      }

	      function showEditTour(){

	          tourInfoBackup = JSON.parse(JSON.stringify(this.tours.activeTour));
	          this.creatingTour = true;
	          this.parent.editingTour(true);

	      }

	      function hideEditTour( cancel ){

	          if(cancel ){
	            this.tours.activeTour = JSON.parse(JSON.stringify(tourInfoBackup));
	          }

	          this.creatingTour = false;
	          this.parent.editingTour(false);
	          this.update();
	      }

	      function configureEditor( configure, forceClose){

	          if(forceClose){

	              this.configuratingEditor = false;
	              this.parent.isConfiguratingEditor = false;
	              this.parent.update();
	              return;

	          }

	          if(configure){

	              apiKeyBackup = this.editor.apiKey;

	          }else{

	              this.editor.apiKey = apiKeyBackup;
	              this.api_key.value = apiKeyBackup;

	          }

	          this.configuratingEditor = configure;
	          this.parent.isConfiguratingEditor = configure;

	          this.parent.update();
	      }

	      function readTitles( event ){
	          this.tours.activeTour = this.tours.activeTour || {};
	          this.tours.activeTour.name = this.tours.activeTour.name || {};
	          this.tours.activeTour.name[event.target.id] = event.target.value;
	      }

	      function checkIsNumber(evt){

	          var charCode = (evt.which) ? evt.which : evt.keyCode;

	          if((charCode > 31 && (charCode < 48 || charCode > 57))){
	              evt.preventDefault();
	              return false;
	          }

	          return true;

	      }

	      function saveTour(){
	          hideEditTour.call(this);
	          this.tours.saveTour({apiKey : this.editor.apiKey, id : this.editor.id});
	      }

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(5);

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */

	exports.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */

	exports.serialize = function serialize(fn){
	  this._serializer = fn;
	  return this;
	};

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.timeout = function timeout(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @return {Request}
	 */

	exports.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
	      self.end(function(err, res){
	        if (err) innerReject(err); else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	}

	/**
	 * Allow for extension
	 */

	exports.use = function use(fn) {
	  fn(this);
	  return this;
	}


	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	exports.get = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */

	exports.getHeader = exports.get;

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function(name, val) {
	  this._getFormData().append(name, val);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	exports.abort = function(){
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	exports.withCredentials = function(){
	  // This is browser-only functionality. Node side is no-op.
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.redirects = function(n){
	  this._maxRedirects = n;
	  return this;
	};

	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */

	exports.toJSON = function(){
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header
	  };
	};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	exports._isHost = function _isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.send = function(data){
	  var obj = isObject(data);
	  var type = this._header['content-type'];

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || this._isHost(data)) return this;

	  // default to json
	  if (!type) this.type('json');
	  return this;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }

	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }

	  return new RequestConstructor(method, url);
	}

	module.exports = request;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ]);