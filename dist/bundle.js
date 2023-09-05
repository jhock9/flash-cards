/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = \"function\" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || \"@@iterator\", asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\", toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, \"\"); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, \"_invoke\", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: \"normal\", arg: fn.call(obj, arg) }; } catch (err) { return { type: \"throw\", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { [\"next\", \"throw\", \"return\"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if (\"throw\" !== record.type) { var result = record.arg, value = result.value; return value && \"object\" == _typeof(value) && hasOwn.call(value, \"__await\") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke(\"next\", value, resolve, reject); }, function (err) { invoke(\"throw\", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke(\"throw\", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, \"_invoke\", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = \"suspendedStart\"; return function (method, arg) { if (\"executing\" === state) throw new Error(\"Generator is already running\"); if (\"completed\" === state) { if (\"throw\" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if (\"next\" === context.method) context.sent = context._sent = context.arg;else if (\"throw\" === context.method) { if (\"suspendedStart\" === state) throw state = \"completed\", context.arg; context.dispatchException(context.arg); } else \"return\" === context.method && context.abrupt(\"return\", context.arg); state = \"executing\"; var record = tryCatch(innerFn, self, context); if (\"normal\" === record.type) { if (state = context.done ? \"completed\" : \"suspendedYield\", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } \"throw\" === record.type && (state = \"completed\", context.method = \"throw\", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, \"throw\" === methodName && delegate.iterator[\"return\"] && (context.method = \"return\", context.arg = undefined, maybeInvokeDelegate(delegate, context), \"throw\" === context.method) || \"return\" !== methodName && (context.method = \"throw\", context.arg = new TypeError(\"The iterator does not provide a '\" + methodName + \"' method\")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if (\"throw\" === record.type) return context.method = \"throw\", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, \"return\" !== context.method && (context.method = \"next\", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = \"throw\", context.arg = new TypeError(\"iterator result is not an object\"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = \"normal\", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: \"root\" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if (\"function\" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, \"GeneratorFunction\"), exports.isGeneratorFunction = function (genFun) { var ctor = \"function\" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || \"GeneratorFunction\" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, \"GeneratorFunction\")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, \"Generator\"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, \"toString\", function () { return \"[object Generator]\"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) \"t\" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if (\"throw\" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = \"throw\", record.arg = exception, context.next = loc, caught && (context.method = \"next\", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if (\"root\" === entry.tryLoc) return handle(\"end\"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, \"catchLoc\"), hasFinally = hasOwn.call(entry, \"finallyLoc\"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error(\"try statement without catch or finally\"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, \"finallyLoc\") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && (\"break\" === type || \"continue\" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = \"next\", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if (\"throw\" === record.type) throw record.arg; return \"break\" === record.type || \"continue\" === record.type ? this.next = record.arg : \"return\" === record.type ? (this.rval = this.arg = record.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, \"catch\": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if (\"throw\" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, \"next\" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\nvar contentWrapper = document.querySelector('#flash-content-wrapper');\nvar openBtn = document.querySelector('#open-btn');\nvar refreshBtn = document.querySelector('#refresh-btn');\nvar sidePanel = document.querySelector('#side-panel');\nvar resetBtn = document.querySelector('#reset-btn');\nvar randomBtn = document.querySelector('#random-btn');\nvar submitBtn = document.querySelector('#submit-btn');\nvar signoutBtn = document.querySelector('#signout-btn');\nvar tagsWrapper = document.querySelector('#tags-wrapper');\nvar selectedTagsContainer = document.querySelector('#selected-tags-container');\nvar removeBtns = document.querySelectorAll(\".remove-btn\");\nvar dropdown = document.getElementById('dropdown');\nvar tagsList = document.querySelector('#tags-list');\n// const tagsSelected = tagsList.querySelectorAll('.name');\nvar displayedImages = document.querySelector('#images-container');\nvar googleClientID;\nvar lastSelectedTagsAndQuantities;\nvar fetchConfig = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    var response, config;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          _context.prev = 0;\n          _context.next = 3;\n          return fetch('/config');\n        case 3:\n          response = _context.sent;\n          _context.next = 6;\n          return response.json();\n        case 6:\n          config = _context.sent;\n          googleClientID = config.GOOGLE_CLIENT_ID;\n          console.log('googleClientID LOADED.');\n          initGoogleSignIn();\n          _context.next = 15;\n          break;\n        case 12:\n          _context.prev = 12;\n          _context.t0 = _context[\"catch\"](0);\n          console.error('Error fetching configuration:', _context.t0);\n        case 15:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[0, 12]]);\n  }));\n  return function fetchConfig() {\n    return _ref.apply(this, arguments);\n  };\n}();\nfetchConfig();\n\n//* GOOGLE AUTHENTICATION & AUTHORIZATION\n// Redirect user to Google's authentication page\nvar googleAuth = function googleAuth() {\n  window.location.href = '/authorize';\n};\n\n// Initialize Google Sign-In\nvar initGoogleSignIn = function initGoogleSignIn() {\n  google.accounts.id.initialize({\n    client_id: googleClientID,\n    callback: handleCredentialResponse,\n    on_failure: onSignInFailure\n  });\n  google.accounts.id.renderButton(document.getElementById('google-signin'), {\n    theme: 'outline',\n    size: 'large',\n    text: 'sign_in_with',\n    logo_alignment: 'left'\n  });\n};\n\n// Sign in success callback\nvar handleCredentialResponse = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(response) {\n    var decodedUserInfo;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          console.log('handleCredentialResponse CALLED.');\n          try {\n            console.log('Encoded JWT ID token RETRIEVED');\n            decodedUserInfo = jwt_decode(response.credential);\n            console.log('Decoded User Info LOADED: ', decodedUserInfo);\n          } catch (error) {\n            console.error('Error decoding user credential:', error);\n          }\n          _context2.next = 4;\n          return googleAuth();\n        case 4:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2);\n  }));\n  return function handleCredentialResponse(_x) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n// Sign in failure callback\nvar onSignInFailure = function onSignInFailure(error) {\n  console.error('Sign-in error:', error);\n};\n\n//* CHECK AUTHENTICATION & LOAD PHOTOS\nvar checkAuthentication = /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {\n    var response, data;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          _context3.prev = 0;\n          console.log('Checking authentication...');\n          _context3.next = 4;\n          return fetch('/is-authenticated', {\n            credentials: 'include'\n          });\n        case 4:\n          response = _context3.sent;\n          if (response.ok) {\n            _context3.next = 8;\n            break;\n          }\n          console.error(\"Server responded with status: \".concat(response.status));\n          throw new Error(\"Server responded with status: \".concat(response.status));\n        case 8:\n          _context3.next = 10;\n          return response.json();\n        case 10:\n          data = _context3.sent;\n          console.log('Authentication check response:', data);\n          if (!data.isAuthenticated) {\n            _context3.next = 21;\n            break;\n          }\n          console.log('User is authenticated.');\n          sessionStorage.setItem('authenticationChecked', 'true');\n\n          // User is authenticated, update the UI accordingly\n          _context3.next = 17;\n          return fetchAndDisplayPhotos();\n        case 17:\n          if (window.location.pathname === '/landing.html') {\n            window.location.href = '/flashcards.html';\n          }\n          toggleNav();\n          _context3.next = 23;\n          break;\n        case 21:\n          console.log('User is not authenticated.');\n          if (window.location.pathname === '/flashcards.html') {\n            window.location.href = '/landing.html';\n          }\n        case 23:\n          _context3.next = 28;\n          break;\n        case 25:\n          _context3.prev = 25;\n          _context3.t0 = _context3[\"catch\"](0);\n          console.error('Error checking authentication:', _context3.t0);\n        case 28:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3, null, [[0, 25]]);\n  }));\n  return function checkAuthentication() {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\n// Call checkAuthentication when the page initially loads\nwindow.addEventListener('load', checkAuthentication);\n// Call checkAuthentication when the page refreshes\nwindow.addEventListener('beforeunload', function () {\n  sessionStorage.removeItem('authenticationChecked');\n});\n\n//* FETCH AND DISPLAY PHOTOS\nvar fetchAndDisplayPhotos = /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {\n    var response, photos;\n    return _regeneratorRuntime().wrap(function _callee4$(_context4) {\n      while (1) switch (_context4.prev = _context4.next) {\n        case 0:\n          _context4.prev = 0;\n          _context4.next = 3;\n          return fetch('/getPhotos');\n        case 3:\n          response = _context4.sent;\n          if (response.ok) {\n            _context4.next = 6;\n            break;\n          }\n          throw new Error(\"Server responded with status: \".concat(response.status));\n        case 6:\n          _context4.next = 8;\n          return response.json();\n        case 8:\n          photos = _context4.sent;\n          console.log('Received photos:', photos.mediaItems);\n          displayTags(photos.mediaItems);\n          _context4.next = 16;\n          break;\n        case 13:\n          _context4.prev = 13;\n          _context4.t0 = _context4[\"catch\"](0);\n          console.error('Error fetching photos:', _context4.t0);\n        case 16:\n        case \"end\":\n          return _context4.stop();\n      }\n    }, _callee4, null, [[0, 13]]);\n  }));\n  return function fetchAndDisplayPhotos() {\n    return _ref4.apply(this, arguments);\n  };\n}();\n\n//* FETCH PHOTO DESCRIPTIONS\nvar fetchDescriptions = /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(photoData) {\n    var descriptions;\n    return _regeneratorRuntime().wrap(function _callee5$(_context5) {\n      while (1) switch (_context5.prev = _context5.next) {\n        case 0:\n          _context5.next = 2;\n          return photoData.map(function (photo) {\n            return photo.description;\n          }).filter(function (description) {\n            return description;\n          });\n        case 2:\n          descriptions = _context5.sent;\n          console.log('Fetched descriptions:', descriptions);\n          return _context5.abrupt(\"return\", descriptions);\n        case 5:\n        case \"end\":\n          return _context5.stop();\n      }\n    }, _callee5);\n  }));\n  return function fetchDescriptions(_x2) {\n    return _ref5.apply(this, arguments);\n  };\n}();\n\n//* DISPLAY TAGS\nvar displayTags = /*#__PURE__*/function () {\n  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(photoData) {\n    var descriptions, tagCounts, _iterator, _step, description, tags, _iterator2, _step2, _tag2, filteredTags, tag, _i, _filteredTags, _tag, option, tagDiv, tagName;\n    return _regeneratorRuntime().wrap(function _callee6$(_context6) {\n      while (1) switch (_context6.prev = _context6.next) {\n        case 0:\n          _context6.next = 2;\n          return fetchDescriptions(photoData);\n        case 2:\n          descriptions = _context6.sent;\n          // Count tags\n          tagCounts = {};\n          _iterator = _createForOfIteratorHelper(descriptions);\n          try {\n            for (_iterator.s(); !(_step = _iterator.n()).done;) {\n              description = _step.value;\n              tags = description.split(' ');\n              _iterator2 = _createForOfIteratorHelper(tags);\n              try {\n                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n                  _tag2 = _step2.value;\n                  if (_tag2 in tagCounts) {\n                    tagCounts[_tag2]++;\n                  } else {\n                    tagCounts[_tag2] = 1;\n                  }\n                }\n              } catch (err) {\n                _iterator2.e(err);\n              } finally {\n                _iterator2.f();\n              }\n            }\n\n            // Filter tags\n          } catch (err) {\n            _iterator.e(err);\n          } finally {\n            _iterator.f();\n          }\n          filteredTags = [];\n          for (tag in tagCounts) {\n            if (tagCounts[tag] >= 5) {\n              filteredTags.push(tag);\n            }\n          }\n\n          // Sort tags\n          filteredTags.sort();\n\n          // Display tags in dropdown and as selectable tags\n          for (_i = 0, _filteredTags = filteredTags; _i < _filteredTags.length; _i++) {\n            _tag = _filteredTags[_i];\n            option = document.createElement('option');\n            option.value = _tag;\n            option.text = _tag;\n            dropdown.add(option);\n            tagDiv = document.createElement('div');\n            tagDiv.classList.add('tag', 'center');\n            tagName = document.createElement('span');\n            tagName.classList.add('name', 'center');\n            tagName.innerText = _tag;\n            tagDiv.appendChild(tagName);\n            tagsList.appendChild(tagDiv);\n          }\n        case 10:\n        case \"end\":\n          return _context6.stop();\n      }\n    }, _callee6);\n  }));\n  return function displayTags(_x3) {\n    return _ref6.apply(this, arguments);\n  };\n}();\n\n// //* FETCH PHOTO DATA\n// const fetchPhotoData = async () => {\n//   try {\n//     const response = await fetch('/getPhotos');\n//     if (!response.ok) {\n//       throw new Error(`Server responded with status: ${response.status}`);\n//     }\n//     const photos = await response.json();\n//     console.log('Received photos:', photos.mediaItems);\n\n//     return photos.mediaItems;\n//   } catch (error) {\n//     console.error('Error fetching photos:', error);\n//   }\n// };\n\n// //* FETCH PHOTO DESCRIPTIONS\n// const fetchDescriptions = async () => {\n//   const photos = await fetchPhotoData();\n//   const descriptions = photos.map(photo => photo.description).filter(description => description);\n//   console.log('Fetched descriptions:', descriptions);\n//   return descriptions;\n// };\n\n// //* DISPLAY TAGS\n// const displayTags = async () => {\n//   const descriptions = await fetchDescriptions();\n\n//   // Count tags\n//   const tagCounts = {};\n//   for (const description of descriptions) {\n//     const tags = description.split(' ');\n//     for (const tag of tags) {\n//       if (tag in tagCounts) {\n//         tagCounts[tag]++;\n//       } else {\n//         tagCounts[tag] = 1;\n//       }\n//     }\n//   }\n\n//   // Filter tags\n//   const filteredTags = [];\n//   for (const tag in tagCounts) {\n//     if (tagCounts[tag] >= 5) {\n//       filteredTags.push(tag);\n//     }\n//   }\n\n//   // Sort tags\n//   filteredTags.sort();\n\n//   // Display tags in dropdown and as selectable tags\n//   for (const tag of filteredTags) {\n//     const option = document.createElement('option');\n//     option.value = tag;\n//     option.text = tag;\n//     dropdown.add(option);\n\n//     const tagDiv = document.createElement('div');\n//     tagDiv.classList.add('tag', 'center');\n//     const tagName = document.createElement('span');\n//     tagName.classList.add('name', 'center');\n//     tagName.innerText = tag;\n//     tagDiv.appendChild(tagName);  \n//     tagsList.appendChild(tagDiv);\n//   }\n// }\n\n//* SELECT BY DROPDOWN\nvar selectedTags = [];\ndropdown.addEventListener('change', function () {\n  var selectedTag = dropdown.value;\n\n  // Check if the tag is already selected\n  if (selectedTags.includes(selectedTag)) {\n    // Remove the tag from the selectedTags array\n    selectedTags = selectedTags.filter(function (tag) {\n      return tag !== selectedTag;\n    });\n    toggleBorders();\n\n    // Remove the tag from the selected-tags-container\n    var _tagDiv = document.querySelector(\".selected-tag[data-tag=\\\"\".concat(selectedTag, \"\\\"]\"));\n    if (_tagDiv) {\n      _tagDiv.remove();\n    }\n    var _tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(function (span) {\n      return span.textContent === selectedTag;\n    });\n    if (_tagSpan) {\n      _tagSpan.classList.remove('selected');\n    }\n    return;\n  }\n\n  // Check if 4 tags have already been selected\n  if (selectedTags.length >= 4) {\n    return;\n  }\n  selectedTags.push(selectedTag);\n  dropdown.selectedIndex = 0;\n  toggleBorders();\n\n  // Create a new div for the selected tag\n  var tagDiv = document.createElement('div');\n  tagDiv.classList.add('selected-tag', 'center');\n  tagDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag\n\n  // Add a quantity slider, tag name, and remove btn\n  var slider = document.createElement('input');\n  slider.type = 'range';\n  slider.min = 2;\n  slider.max = 6;\n  slider.value = 2;\n  slider.classList.add('slider');\n  var sliderValue = document.createElement('span');\n  sliderValue.classList.add('sliderValue');\n  sliderValue.innerHTML = slider.value;\n  slider.oninput = function () {\n    sliderValue.innerHTML = slider.value;\n  };\n  var tagName = document.createElement('span');\n  tagName.classList.add('name', 'center');\n  tagName.textContent = selectedTag;\n  var removeBtn = document.createElement('button');\n  removeBtn.type = 'button';\n  removeBtn.classList.add('remove-btn', 'center');\n  var icon = document.createElement('i');\n  icon.classList.add('fa-solid', 'fa-trash-can');\n  removeBtn.appendChild(icon);\n  removeBtn.addEventListener('click', function () {\n    var selectedTag = removeBtn.parentElement.dataset.tag;\n\n    // Remove the tag from the selectedTags array\n    selectedTags = selectedTags.filter(function (tag) {\n      return tag !== selectedTag;\n    });\n    toggleBorders();\n\n    // Remove the tag from the selected-tags-container\n    removeBtn.parentElement.remove();\n\n    // Deselect the tag in the tags-list\n    var tagSpan = document.querySelector(\".tag[data-tag=\\\"\".concat(selectedTag, \"\\\"] span\"));\n    tagSpan.classList.remove('selected');\n  });\n  tagDiv.appendChild(slider);\n  tagDiv.appendChild(sliderValue);\n  tagDiv.appendChild(tagName);\n  tagDiv.appendChild(removeBtn);\n  selectedTagsContainer.appendChild(tagDiv);\n\n  // Highlight the tag in the tags-list\n  var tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(function (span) {\n    return span.textContent === selectedTag;\n  });\n  if (tagSpan) {\n    tagSpan.classList.add('selected');\n  }\n});\n\n//* SELECT BY TAG LIST\ntagsList.addEventListener('click', function (e) {\n  if (e.target.classList.contains('name')) {\n    var selectedTag = e.target.textContent;\n\n    // Check if the tag is already selected\n    if (selectedTags.includes(selectedTag)) {\n      // Remove the tag from the selectedTags array\n      selectedTags = selectedTags.filter(function (tag) {\n        return tag !== selectedTag;\n      });\n      toggleBorders();\n\n      // Remove the tag from the selected-tags-container\n      var _tagDiv2 = document.querySelector(\".selected-tag[data-tag=\\\"\".concat(selectedTag, \"\\\"]\"));\n      if (_tagDiv2) {\n        _tagDiv2.remove();\n      }\n\n      // Deselect the tag in the tags-list\n      e.target.classList.remove('selected');\n      return;\n    }\n\n    // Check if 4 tags have already been selected\n    if (selectedTags.length >= 4) {\n      return;\n    }\n    selectedTags.push(selectedTag);\n    toggleBorders();\n\n    // Add 'selected' class to the tag\n    e.target.classList.add('selected');\n\n    // Create a new div for the selected tag\n    var tagDiv = document.createElement('div');\n    tagDiv.classList.add('selected-tag', 'center');\n    tagDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag\n\n    // Add a quantity slider, tag name, and remove btn\n    var slider = document.createElement('input');\n    slider.type = 'range';\n    slider.min = 2;\n    slider.max = 6;\n    slider.value = 2;\n    slider.classList.add('slider');\n    var sliderValue = document.createElement('span');\n    sliderValue.classList.add('sliderValue');\n    sliderValue.innerHTML = slider.value;\n    slider.oninput = function () {\n      sliderValue.innerHTML = slider.value;\n    };\n    var tagName = document.createElement('span');\n    tagName.classList.add('name', 'center');\n    tagName.textContent = selectedTag;\n    var removeBtn = document.createElement('button');\n    removeBtn.type = 'button';\n    removeBtn.classList.add('remove-btn', 'center');\n    var icon = document.createElement('i');\n    icon.classList.add('fa-solid', 'fa-trash-can');\n    removeBtn.appendChild(icon);\n    removeBtn.addEventListener('click', function () {\n      var selectedTag = removeBtn.parentElement.dataset.tag;\n\n      // Remove the tag from the selectedTags array\n      selectedTags = selectedTags.filter(function (tag) {\n        return tag !== selectedTag;\n      });\n      toggleBorders();\n\n      // Remove the tag from the selected-tags-container\n      removeBtn.parentElement.remove();\n\n      // Deselect the tag in the tags-list\n      e.target.classList.remove('selected');\n    });\n    tagDiv.appendChild(slider);\n    tagDiv.appendChild(sliderValue);\n    tagDiv.appendChild(tagName);\n    tagDiv.appendChild(removeBtn);\n    selectedTagsContainer.appendChild(tagDiv);\n  } else if (e.target.classList === 'remove-btn') {\n    var _selectedTag = e.target.parentElement.dataset.tag;\n\n    // Remove the tag from the selectedTags array\n    selectedTags = selectedTags.filter(function (tag) {\n      return tag !== _selectedTag;\n    });\n    toggleBorders();\n\n    // Remove the tag from the selected-tags-container\n    e.target.parentElement.remove();\n\n    // Deselect the tag in the tags-list\n    var tagSpan = document.querySelector(\".tag[data-tag=\\\"\".concat(_selectedTag, \"\\\"] span\"));\n    if (tagSpan) {\n      tagSpan.classList.remove('selected');\n    }\n  }\n});\n\n//* HELPER FUNCTIONS\n// Helper function to randomize array length based on user input\nvar shuffleArray = function shuffleArray(array) {\n  console.log('Original Array:', array);\n  for (var i = array.length - 1; i > 0; i--) {\n    var j = Math.floor(Math.random() * (i + 1));\n    console.log(\"Swapping elements at index \".concat(i, \" and \").concat(j));\n    var _ref7 = [array[j], array[i]];\n    array[i] = _ref7[0];\n    array[j] = _ref7[1];\n  }\n  console.log('Shuffled Array:', array);\n  return array;\n};\n\n// Helper function for displaying photos\nvar displayPhotos = function displayPhotos(photos) {\n  console.log('displayPhotos called with', photos);\n  displayedImages.innerHTML = '';\n  var numPhotos = photos.length;\n  var flexBasis;\n  if (numPhotos > 6) {\n    flexBasis = \"calc((100% / 5) - 2rem)\";\n  } else if (numPhotos > 4) {\n    flexBasis = \"calc((100% / 4) - 2rem)\";\n  } else if (numPhotos > 1) {\n    flexBasis = \"calc((100% / 3) - 2rem)\";\n  } else {\n    flexBasis = \"calc(80% - 2rem)\";\n  }\n  for (var i = 0; i < numPhotos; i++) {\n    var img = document.createElement('img');\n    img.src = photos[i].baseUrl;\n    img.classList.add('image');\n    img.style.flexBasis = flexBasis;\n    console.log('Image URL:', img.src);\n    displayedImages.appendChild(img);\n  }\n};\n\n// Helper function for filtering photos\nvar filterPhotosByTags = function filterPhotosByTags(photos, selectedTagsAndQuantities) {\n  var filteredPhotos = [];\n  var selectedPhotoIds = new Set(); // Keep track of the selected photo IDs\n  var _iterator3 = _createForOfIteratorHelper(selectedTagsAndQuantities),\n    _step3;\n  try {\n    var _loop = function _loop() {\n      var _step3$value = _step3.value,\n        tag = _step3$value.tag,\n        quantity = _step3$value.quantity;\n      var selectedPhotos = photos.filter(function (photo) {\n        return photo.description && photo.description.includes(tag) && !selectedPhotoIds.has(photo.id);\n      });\n      shuffleArray(selectedPhotos);\n      var photosToDisplay = selectedPhotos.slice(0, quantity);\n      photosToDisplay.forEach(function (photo) {\n        return selectedPhotoIds.add(photo.id);\n      }); // Add selected photo IDs to the Set\n      filteredPhotos.push.apply(filteredPhotos, _toConsumableArray(photosToDisplay));\n    };\n    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n      _loop();\n    }\n  } catch (err) {\n    _iterator3.e(err);\n  } finally {\n    _iterator3.f();\n  }\n  shuffleArray(filteredPhotos);\n  return filteredPhotos;\n};\n\n//* BUTTONS\nvar toggleNav = function toggleNav() {\n  openBtn.classList.toggle('open');\n  sidePanel.classList.toggle('open');\n  contentWrapper.classList.toggle('open');\n  resetBtn.click();\n};\nopenBtn.addEventListener('click', toggleNav);\nrefreshBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {\n  var photos, filteredPhotos;\n  return _regeneratorRuntime().wrap(function _callee7$(_context7) {\n    while (1) switch (_context7.prev = _context7.next) {\n      case 0:\n        if (!(lastSelectedTagsAndQuantities !== null)) {\n          _context7.next = 6;\n          break;\n        }\n        _context7.next = 3;\n        return fetchPhotoData(accessToken);\n      case 3:\n        photos = _context7.sent;\n        filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities);\n        displayPhotos(filteredPhotos);\n      case 6:\n      case \"end\":\n        return _context7.stop();\n    }\n  }, _callee7);\n})));\nresetBtn.addEventListener('click', function () {\n  console.log('Reset button clicked');\n  selectedTags = [];\n\n  // Remove all selected tags from selected-tags-container\n  var selectedTagDivs = document.querySelectorAll('.selected-tag');\n  selectedTagDivs.forEach(function (div) {\n    div.remove();\n  });\n\n  // Deselect selected tags in tags list\n  var selectedTagSpans = document.querySelectorAll('.tag .name.selected');\n  selectedTagSpans.forEach(function (span) {\n    span.classList.remove('selected');\n  });\n  toggleBorders();\n});\nrandomBtn.addEventListener('click', function () {\n  console.log('Random button clicked');\n  resetBtn.click();\n\n  // Get all available tags\n  var allTags = Array.from(document.querySelectorAll('.tag .name')).map(function (span) {\n    return span.textContent;\n  });\n  var numTagsToSelect = Math.floor(Math.random() * 3) + 2;\n\n  // Set max number of images per tag\n  var maxImagesPerTag;\n  switch (numTagsToSelect) {\n    case 2:\n      maxImagesPerTag = 6;\n      break;\n    case 3:\n      maxImagesPerTag = 4;\n      break;\n    case 4:\n      maxImagesPerTag = 3;\n      break;\n    default:\n      maxImagesPerTag = 3;\n  }\n  var totalImages = 0;\n\n  // Randomly select tags and set random slider values\n  for (var i = 0; i < numTagsToSelect; i++) {\n    var randomTagIndex = Math.floor(Math.random() * allTags.length);\n    var selectedTag = allTags[randomTagIndex];\n    allTags.splice(randomTagIndex, 1); // Removes duplicates\n\n    // Simulate selecting tag by setting dropdown value, triggering change event\n    dropdown.value = selectedTag;\n    dropdown.dispatchEvent(new Event('change'));\n\n    // Set value for slider, considering totalImages\n    var sliderValue = Math.min(Math.floor(Math.random() * maxImagesPerTag) + 2, 12 - totalImages);\n\n    // Set value for slider\n    var slider = document.querySelector(\".selected-tag[data-tag=\\\"\".concat(selectedTag, \"\\\"] .slider\"));\n    slider.value = sliderValue;\n\n    // Update slider value display\n    var sliderValueDisplay = document.querySelector(\".selected-tag[data-tag=\\\"\".concat(selectedTag, \"\\\"] .sliderValue\"));\n    sliderValueDisplay.innerHTML = slider.value;\n\n    // Update totalImages count\n    totalImages += sliderValue;\n  }\n\n  // Delay submitBtn trigger so it can finish executing\n  setTimeout(function () {\n    submitBtn.click();\n  }, 0);\n});\nsubmitBtn.addEventListener('click', /*#__PURE__*/function () {\n  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(e) {\n    var selectedTagsAndQuantities, photos, filteredPhotos;\n    return _regeneratorRuntime().wrap(function _callee8$(_context8) {\n      while (1) switch (_context8.prev = _context8.next) {\n        case 0:\n          e.preventDefault();\n          console.log('Submit button clicked');\n          if (accessToken) {\n            _context8.next = 5;\n            break;\n          }\n          console.error('Access token is not available');\n          return _context8.abrupt(\"return\");\n        case 5:\n          // Get selected tags and quantities from selected-tags-container\n          selectedTagsAndQuantities = Array.from(document.querySelectorAll('.selected-tag')).map(function (tagDiv) {\n            var tag = tagDiv.dataset.tag;\n            var quantity = tagDiv.querySelector('.slider').value;\n            return {\n              tag: tag,\n              quantity: quantity\n            };\n          });\n          lastSelectedTagsAndQuantities = selectedTagsAndQuantities;\n          _context8.next = 9;\n          return fetchPhotoData(accessToken);\n        case 9:\n          photos = _context8.sent;\n          filteredPhotos = filterPhotosByTags(photos, selectedTagsAndQuantities);\n          displayPhotos(filteredPhotos);\n          toggleNav();\n        case 13:\n        case \"end\":\n          return _context8.stop();\n      }\n    }, _callee8);\n  }));\n  return function (_x4) {\n    return _ref9.apply(this, arguments);\n  };\n}());\nsignoutBtn.addEventListener('click', /*#__PURE__*/function () {\n  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(e) {\n    var response;\n    return _regeneratorRuntime().wrap(function _callee9$(_context9) {\n      while (1) switch (_context9.prev = _context9.next) {\n        case 0:\n          e.preventDefault();\n          _context9.prev = 1;\n          _context9.next = 4;\n          return fetch('/logout', {\n            method: 'POST'\n          });\n        case 4:\n          response = _context9.sent;\n          if (response.ok) {\n            _context9.next = 7;\n            break;\n          }\n          throw new Error('Logout failed');\n        case 7:\n          google.accounts.id.disableAutoSelect();\n          console.log('User signed out.');\n          window.location.href = '/landing.html';\n          _context9.next = 15;\n          break;\n        case 12:\n          _context9.prev = 12;\n          _context9.t0 = _context9[\"catch\"](1);\n          console.error('Error during logout:', _context9.t0);\n        case 15:\n        case \"end\":\n          return _context9.stop();\n      }\n    }, _callee9, null, [[1, 12]]);\n  }));\n  return function (_x5) {\n    return _ref10.apply(this, arguments);\n  };\n}());\nvar toggleBorders = function toggleBorders() {\n  if (selectedTags.length >= 1) {\n    selectedTagsContainer.classList.add('show-borders');\n  } else {\n    selectedTagsContainer.classList.remove('show-borders');\n  }\n};\n\n//# sourceURL=webpack://flash-cards/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("dcae57f0809d390b4c8f")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "flash-cards:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdateflash_cards"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;