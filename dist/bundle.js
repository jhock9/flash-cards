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

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\nvar contentWrapper = document.querySelector('#flash-content-wrapper');\nvar openBtn = document.querySelector('#open-btn');\nvar refreshBtn = document.querySelector('#refresh-btn');\nvar sidePanel = document.querySelector('#side-panel');\nvar resetBtn = document.querySelector('#reset-btn');\nvar randomBtn = document.querySelector('#random-btn');\nvar submitBtn = document.querySelector('#submit-btn');\nvar signoutBtn = document.querySelector('#signout-btn');\nvar totalSlider = document.querySelector('#total-slider');\nvar totalSliderValue = document.querySelector('#total-slider-value');\nvar remainder = document.querySelector('#remainder-checkbox');\nvar tagsWrapper = document.querySelector('#tags-wrapper');\nvar selectedTagsWrapper = document.querySelector('#selected-tags-wrapper');\nvar removeBtns = document.querySelectorAll('.remove-btn');\nvar dropdown = document.getElementById('dropdown');\nvar tagsList = document.querySelector('#tags-list');\nvar displayedImages = document.querySelector('#images-container');\nvar googleClientID;\nvar lastSelectedTagsAndQuantities;\nvar selectedTags = [];\nvar photos;\nvar totalPhotos = 0;\nvar useRemainder = false;\nvar lastTotalPhotos;\nvar lastUseRemainder;\nvar fetchConfig = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    var response, config;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          _context.prev = 0;\n          _context.next = 3;\n          return fetch('/config');\n        case 3:\n          response = _context.sent;\n          _context.next = 6;\n          return response.json();\n        case 6:\n          config = _context.sent;\n          googleClientID = config.GOOGLE_CLIENT_ID;\n          console.log('googleClientID LOADED...');\n          initGoogleSignIn();\n          _context.next = 15;\n          break;\n        case 12:\n          _context.prev = 12;\n          _context.t0 = _context[\"catch\"](0);\n          console.error('Error fetching configuration:', _context.t0);\n        case 15:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[0, 12]]);\n  }));\n  return function fetchConfig() {\n    return _ref.apply(this, arguments);\n  };\n}();\nfetchConfig();\n\n//* GOOGLE AUTHENTICATION & AUTHORIZATION\n// Redirect user to Google's authentication page\nvar googleAuth = function googleAuth() {\n  window.location.href = '/authorize';\n};\n\n// Initialize Google Sign-In\nvar initGoogleSignIn = function initGoogleSignIn() {\n  google.accounts.id.initialize({\n    client_id: googleClientID,\n    callback: handleCredentialResponse,\n    on_failure: onSignInFailure\n  });\n  google.accounts.id.renderButton(document.getElementById('google-signin'), {\n    theme: 'outline',\n    size: 'large',\n    text: 'sign_in_with',\n    logo_alignment: 'left'\n  });\n};\n\n// Sign in success callback\nvar handleCredentialResponse = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(response) {\n    var decodedUserInfo;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          console.log('handleCredentialResponse CALLED...');\n          try {\n            console.log('Encoded JWT ID token RETRIEVED...');\n            decodedUserInfo = jwt_decode(response.credential);\n            console.log('Decoded User Info LOADED...');\n          } catch (error) {\n            console.error('Error decoding user credential:', error);\n          }\n          _context2.next = 4;\n          return googleAuth();\n        case 4:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2);\n  }));\n  return function handleCredentialResponse(_x) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n// Sign in failure callback\nvar onSignInFailure = function onSignInFailure(error) {\n  console.error('Sign-in error:', error);\n};\n\n//* CHECK AUTHENTICATION\nvar checkAuthentication = /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {\n    var response, data;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          _context3.prev = 0;\n          console.log('Checking authentication...');\n          _context3.next = 4;\n          return fetch('/is-authenticated', {\n            credentials: 'include'\n          });\n        case 4:\n          response = _context3.sent;\n          if (response.ok) {\n            _context3.next = 8;\n            break;\n          }\n          console.error(\"Server responded with status: \".concat(response.status));\n          throw new Error(\"Server responded with status: \".concat(response.status));\n        case 8:\n          _context3.next = 10;\n          return response.json();\n        case 10:\n          data = _context3.sent;\n          if (data.isAuthenticated) {\n            console.log('User is authenticated.');\n            sessionStorage.setItem('authenticationChecked', 'true');\n            if (window.location.pathname === '/landing.html') {\n              window.location.href = '/flashcards.html';\n            }\n            loadLockedTags();\n          } else {\n            console.log('User is not authenticated.');\n            if (window.location.pathname === '/flashcards.html') {\n              window.location.href = '/landing.html';\n            }\n          }\n          _context3.next = 17;\n          break;\n        case 14:\n          _context3.prev = 14;\n          _context3.t0 = _context3[\"catch\"](0);\n          console.error('Error checking authentication:', _context3.t0);\n        case 17:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3, null, [[0, 14]]);\n  }));\n  return function checkAuthentication() {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\n// Call checkAuthentication when the page initially loads\nwindow.addEventListener('load', checkAuthentication);\n// Call checkAuthentication when the page refreshes\nwindow.addEventListener('beforeunload', function () {\n  sessionStorage.removeItem('authenticationChecked');\n});\n\n//* FETCH PHOTOS DATA AND DISPLAY TAGS\nvar fetchPhotosData = /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {\n    var response, responseText;\n    return _regeneratorRuntime().wrap(function _callee4$(_context4) {\n      while (1) switch (_context4.prev = _context4.next) {\n        case 0:\n          console.log('Fetching photos data...');\n          _context4.prev = 1;\n          _context4.next = 4;\n          return fetch('/getPhotos');\n        case 4:\n          response = _context4.sent;\n          if (response.ok) {\n            _context4.next = 7;\n            break;\n          }\n          throw new Error(\"Server responded with status: \".concat(response.status));\n        case 7:\n          _context4.next = 9;\n          return response.text();\n        case 9:\n          responseText = _context4.sent;\n          photos = JSON.parse(responseText);\n          console.log('Photos data received from server.', photos);\n          displayTags(photos);\n          _context4.next = 18;\n          break;\n        case 15:\n          _context4.prev = 15;\n          _context4.t0 = _context4[\"catch\"](1);\n          console.error('Error fetching photos:', _context4.t0);\n        case 18:\n        case \"end\":\n          return _context4.stop();\n      }\n    }, _callee4, null, [[1, 15]]);\n  }));\n  return function fetchPhotosData() {\n    return _ref4.apply(this, arguments);\n  };\n}();\n\n// Display tags\nvar displayTags = /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(photoData) {\n    var defaultOption, descriptions, tagCounts, _iterator, _step, description, tags, _iterator2, _step2, _tag2, filteredTags, tag, _i, _filteredTags, _tag, option, tagDiv, tagName;\n    return _regeneratorRuntime().wrap(function _callee5$(_context5) {\n      while (1) switch (_context5.prev = _context5.next) {\n        case 0:\n          defaultOption = dropdown.querySelector('option[value=\"\"]');\n          dropdown.innerHTML = '';\n          if (defaultOption) {\n            dropdown.appendChild(defaultOption);\n          }\n          tagsList.innerHTML = '';\n          console.log('Displaying tags...');\n          _context5.next = 7;\n          return fetchDescriptions(photoData);\n        case 7:\n          descriptions = _context5.sent;\n          // Count tags\n          tagCounts = {};\n          _iterator = _createForOfIteratorHelper(descriptions);\n          try {\n            for (_iterator.s(); !(_step = _iterator.n()).done;) {\n              description = _step.value;\n              tags = description.split(' ');\n              _iterator2 = _createForOfIteratorHelper(tags);\n              try {\n                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n                  _tag2 = _step2.value;\n                  if (_tag2 in tagCounts) {\n                    tagCounts[_tag2]++;\n                  } else {\n                    tagCounts[_tag2] = 1;\n                  }\n                }\n              } catch (err) {\n                _iterator2.e(err);\n              } finally {\n                _iterator2.f();\n              }\n            }\n\n            // Filter tags\n            // Determines which tags to display based on the number of photos they appear in\n          } catch (err) {\n            _iterator.e(err);\n          } finally {\n            _iterator.f();\n          }\n          filteredTags = [];\n          for (tag in tagCounts) {\n            if (tagCounts[tag] >= 6) {\n              filteredTags.push(tag);\n            }\n          }\n\n          // Sort tags\n          filteredTags.sort();\n\n          // Display tags in dropdown and as selectable tags\n          for (_i = 0, _filteredTags = filteredTags; _i < _filteredTags.length; _i++) {\n            _tag = _filteredTags[_i];\n            option = document.createElement('option');\n            option.value = _tag;\n            option.text = _tag;\n            dropdown.add(option);\n            tagDiv = document.createElement('div');\n            tagDiv.classList.add('tag', 'center');\n            tagName = document.createElement('span');\n            tagName.classList.add('name', 'center');\n            tagName.innerText = _tag;\n            tagDiv.appendChild(tagName);\n            tagsList.appendChild(tagDiv);\n          }\n        case 15:\n        case \"end\":\n          return _context5.stop();\n      }\n    }, _callee5);\n  }));\n  return function displayTags(_x2) {\n    return _ref5.apply(this, arguments);\n  };\n}();\n\n// Fetch descriptions\nvar fetchDescriptions = /*#__PURE__*/function () {\n  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(photoData) {\n    var descriptions;\n    return _regeneratorRuntime().wrap(function _callee6$(_context6) {\n      while (1) switch (_context6.prev = _context6.next) {\n        case 0:\n          _context6.next = 2;\n          return photoData.map(function (photo) {\n            return photo.description;\n          }).filter(function (description) {\n            return description;\n          });\n        case 2:\n          descriptions = _context6.sent;\n          console.log('Photo descriptions parsed...');\n          return _context6.abrupt(\"return\", descriptions);\n        case 5:\n        case \"end\":\n          return _context6.stop();\n      }\n    }, _callee6);\n  }));\n  return function fetchDescriptions(_x3) {\n    return _ref6.apply(this, arguments);\n  };\n}();\n\n//* SELECT TAGS TO DISPLAY\n// Select tags from dropdown\ndropdown.addEventListener('change', function () {\n  console.log('Dropdown changed...');\n  var selectedTag = dropdown.value;\n  loadLockedTags();\n  if (selectedTags.includes(selectedTag)) {\n    removeTag(selectedTag);\n    return;\n  }\n\n  // Check if 4 tags have already been selected\n  if (selectedTags.length >= 4) {\n    return;\n  }\n  selectedTags.push(selectedTag);\n  dropdown.selectedIndex = 0;\n  toggleBorders();\n\n  // Create a new div for the selected tag\n  var tagDiv = document.createElement('div');\n  tagDiv.classList.add('selected-tag', 'center');\n  tagDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag\n\n  // Add a quantity slider, tag name, lock toggle, and remove btn\n  var slider = document.createElement('input');\n  slider.type = 'range';\n  slider.min = 1;\n  slider.max = 6;\n  slider.value = 1;\n  slider.classList.add('slider');\n  var sliderValue = document.createElement('span');\n  sliderValue.classList.add('slider-value');\n  sliderValue.innerHTML = slider.value;\n  slider.oninput = function () {\n    sliderValue.innerHTML = slider.value;\n  };\n  var tagName = document.createElement('span');\n  tagName.classList.add('name', 'center');\n  tagName.textContent = selectedTag;\n  var lockToggle = document.createElement('button');\n  lockToggle.type = 'button';\n  lockToggle.classList.add('lock-toggle', 'center');\n  var lockIcon = document.createElement('i');\n  lockIcon.classList.add('fa-solid', 'fa-unlock');\n  lockToggle.appendChild(lockIcon);\n  lockToggle.addEventListener('click', function () {\n    var isLocked = tagDiv.dataset.locked === 'true';\n    tagDiv.dataset.locked = isLocked ? 'false' : 'true';\n    if (isLocked) {\n      lockIcon.classList.remove('fa-lock');\n      lockIcon.classList.add('fa-unlock');\n      lockIcon.classList.add('locked-tag');\n    } else {\n      lockIcon.classList.add('fa-lock');\n      lockIcon.classList.remove('fa-unlock');\n      lockIcon.classList.remove('locked-tag');\n      saveLockedTags();\n    }\n  });\n  var removeBtn = document.createElement('button');\n  removeBtn.type = 'button';\n  removeBtn.classList.add('remove-btn', 'center');\n  var removeIcon = document.createElement('i');\n  removeIcon.classList.add('fa-solid', 'fa-trash-can');\n  removeBtn.appendChild(removeIcon);\n  removeBtn.addEventListener('click', function () {\n    var selectedTag = removeBtn.parentElement.dataset.tag;\n    removeTag(selectedTag);\n  });\n  tagDiv.appendChild(slider);\n  tagDiv.appendChild(sliderValue);\n  tagDiv.appendChild(tagName);\n  tagDiv.appendChild(lockToggle);\n  tagDiv.appendChild(removeBtn);\n  selectedTagsWrapper.appendChild(tagDiv);\n\n  // Select the tag in the tags-list\n  var tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(function (span) {\n    return span.textContent === selectedTag;\n  });\n  if (tagSpan) {\n    tagSpan.classList.add('selected');\n  }\n});\n\n// Select tags from tags-list\ntagsList.addEventListener('click', function (e) {\n  console.log('Tags-list clicked...');\n  if (e.target.classList.contains('name')) {\n    var selectedTag = e.target.textContent;\n    loadLockedTags();\n\n    // Check if the tag is already selected\n    if (selectedTags.includes(selectedTag)) {\n      removeTag(selectedTag);\n      return;\n    }\n\n    // Check if 4 tags have already been selected\n    if (selectedTags.length >= 4) {\n      return;\n    }\n    selectedTags.push(selectedTag);\n    toggleBorders();\n\n    // Add 'selected' class to the tag\n    e.target.classList.add('selected');\n\n    // Create a new div for the selected tag\n    var tagDiv = document.createElement('div');\n    tagDiv.classList.add('selected-tag', 'center');\n    tagDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag\n\n    // Add a quantity slider, tag name, lock toggle, and remove btn\n    var slider = document.createElement('input');\n    slider.type = 'range';\n    slider.min = 1;\n    slider.max = 6;\n    slider.value = 1;\n    slider.classList.add('slider');\n    var sliderValue = document.createElement('span');\n    sliderValue.classList.add('slider-value');\n    sliderValue.innerHTML = slider.value;\n    slider.oninput = function () {\n      sliderValue.innerHTML = slider.value;\n    };\n    var tagName = document.createElement('span');\n    tagName.classList.add('name', 'center');\n    tagName.textContent = selectedTag;\n    var lockToggle = document.createElement('button');\n    lockToggle.type = 'button';\n    lockToggle.classList.add('lock-toggle', 'center');\n    var lockIcon = document.createElement('i');\n    lockIcon.classList.add('fa-solid', 'fa-unlock');\n    lockToggle.appendChild(lockIcon);\n    lockToggle.addEventListener('click', function () {\n      var isLocked = tagDiv.dataset.locked === 'true';\n      tagDiv.dataset.locked = isLocked ? 'false' : 'true';\n      if (isLocked) {\n        lockIcon.classList.remove('fa-lock');\n        lockIcon.classList.add('fa-unlock');\n        lockIcon.classList.add('locked-tag');\n      } else {\n        lockIcon.classList.add('fa-lock');\n        lockIcon.classList.remove('fa-unlock');\n        lockIcon.classList.remove('locked-tag');\n        saveLockedTags();\n      }\n    });\n    var removeBtn = document.createElement('button');\n    removeBtn.type = 'button';\n    removeBtn.classList.add('remove-btn', 'center');\n    var removeIcon = document.createElement('i');\n    removeIcon.classList.add('fa-solid', 'fa-trash-can');\n    removeBtn.appendChild(removeIcon);\n    removeBtn.addEventListener('click', function () {\n      var selectedTag = removeBtn.parentElement.dataset.tag;\n      removeTag(selectedTag);\n    });\n    tagDiv.appendChild(slider);\n    tagDiv.appendChild(sliderValue);\n    tagDiv.appendChild(tagName);\n    tagDiv.appendChild(lockToggle);\n    tagDiv.appendChild(removeBtn);\n    selectedTagsWrapper.appendChild(tagDiv);\n  }\n});\n\n//* HELPER FUNCTIONS\nvar filterPhotosByTags = function filterPhotosByTags(photos, selectedTagsAndQuantities, totalPhotos, useRemainder) {\n  console.log('filterPhotosByTags called...');\n  var filteredPhotos = [];\n  var selectedPhotoIds = new Set(); // Keep track of the selected photo IDs\n\n  // Sum of all photos that are intended to be selected (based on slider values)\n  var intendedTotal = selectedTagsAndQuantities.reduce(function (acc, _ref7) {\n    var quantity = _ref7.quantity;\n    return acc + parseInt(quantity, 10);\n  }, 0);\n\n  // Calculate how many more photos are needed to meet the total\n  var remainingPhotos = Math.max(0, totalPhotos - intendedTotal);\n\n  // Loop through each tag and quantity\n  var _iterator3 = _createForOfIteratorHelper(selectedTagsAndQuantities),\n    _step3;\n  try {\n    var _loop = function _loop() {\n      var _filteredPhotos2;\n      var _step3$value = _step3.value,\n        tag = _step3$value.tag,\n        quantity = _step3$value.quantity;\n      var selectedPhotos = photos.filter(function (photo) {\n        return photo.description && photo.description.includes(tag) && !selectedPhotoIds.has(photo.id);\n      });\n      shuffleArray(selectedPhotos);\n      var photosToDisplay = selectedPhotos.slice(0, quantity);\n      photosToDisplay.forEach(function (photo) {\n        return selectedPhotoIds.add(photo.id);\n      }); // Add selected photo IDs to the Set\n      (_filteredPhotos2 = filteredPhotos).push.apply(_filteredPhotos2, _toConsumableArray(photosToDisplay));\n    };\n    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n      _loop();\n    }\n\n    // If 'useRemainder' is checked and there are remaining photos to be filled\n  } catch (err) {\n    _iterator3.e(err);\n  } finally {\n    _iterator3.f();\n  }\n  if (useRemainder && remainingPhotos > 0) {\n    var _filteredPhotos;\n    // console.log(\"Filling in remaining photos...\");\n    var additionalPhotos = photos.filter(function (photo) {\n      return !selectedPhotoIds.has(photo.id);\n    });\n    shuffleArray(additionalPhotos);\n    (_filteredPhotos = filteredPhotos).push.apply(_filteredPhotos, _toConsumableArray(additionalPhotos.slice(0, remainingPhotos)));\n  }\n\n  // Finally, slice the array based on 'totalPhotos'\n  if (totalPhotos > 0) {\n    filteredPhotos = filteredPhotos.slice(0, totalPhotos);\n  }\n  shuffleArray(filteredPhotos);\n  return filteredPhotos;\n};\nvar shuffleArray = function shuffleArray(array) {\n  console.log('Shuffling array...');\n  // console.log('Original Array:', array);\n\n  for (var i = array.length - 1; i > 0; i--) {\n    var j = Math.floor(Math.random() * (i + 1));\n    var _ref8 = [array[j], array[i]];\n    array[i] = _ref8[0];\n    array[j] = _ref8[1];\n  }\n\n  // console.log('Shuffled Array:', array);\n  return array;\n};\nvar displayPhotos = function displayPhotos(photos) {\n  console.log('displayPhotos called...');\n  displayedImages.innerHTML = '';\n  var numPhotos = photos.length;\n  var flexBasis;\n  if (numPhotos > 6) {\n    flexBasis = \"calc((100% / 5) - 2rem)\";\n  } else if (numPhotos > 4) {\n    flexBasis = \"calc((100% / 4) - 2rem)\";\n  } else if (numPhotos > 1) {\n    flexBasis = \"calc((100% / 3) - 2rem)\";\n  } else {\n    flexBasis = \"calc(80% - 2rem)\";\n  }\n  for (var i = 0; i < numPhotos; i++) {\n    var img = document.createElement('img');\n    img.src = photos[i].baseUrl;\n    img.classList.add('image');\n    img.style.flexBasis = flexBasis;\n    displayedImages.appendChild(img);\n  }\n};\nvar removeTag = function removeTag(selectedTag) {\n  // Remove the tag from the selectedTags array\n  selectedTags = selectedTags.filter(function (tag) {\n    return tag !== selectedTag;\n  });\n  toggleBorders();\n\n  // Remove the tag from the selected-tags-wrapper\n  var tagDiv = document.querySelector(\".selected-tag[data-tag=\\\"\".concat(selectedTag, \"\\\"]\"));\n  if (tagDiv) {\n    tagDiv.remove();\n  }\n\n  // Deselect the tag in the tags-list\n  var tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(function (span) {\n    return span.textContent === selectedTag;\n  });\n  if (tagSpan) {\n    tagSpan.classList.remove('selected');\n  }\n};\n\n// Clears selected tags based on clearLocked\nvar clearSelectedTags = function clearSelectedTags() {\n  var clearLocked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  console.log('clearSelectedTags called with clearLocked:', clearLocked);\n  var selectedTagDivs = document.querySelectorAll('.selected-tag');\n  console.log('Initial selectedTags:', selectedTags);\n  console.log('Initial selectedTags:', Array.from(selectedTagDivs).map(function (div) {\n    return div.dataset.tag;\n  }));\n\n  // Remove selected tags from selected-tags-wrapper that are not locked or when clearLocked is true\n  selectedTagDivs.forEach(function (div) {\n    console.log('Evaluating div for tag:', div.dataset.tag, 'and locked:', div.dataset.locked);\n    if (clearLocked || div.dataset.locked !== 'true') {\n      console.log('Removing div for tag:', div.dataset.tag);\n      removeTag(div.dataset.tag);\n    }\n  });\n  console.log('Final selectedTags:', selectedTags);\n  console.log('Final selectedTags:', Array.from(selectedTagDivs).map(function (div) {\n    return div.dataset.tag;\n  }));\n  var selectedTagSpans = document.querySelectorAll('.tag .name.selected');\n  console.log('Initial selected tags in tags-list:', Array.from(selectedTagSpans).map(function (span) {\n    return span.textContent;\n  }));\n\n  // Remove selected tags in tags-list that are not locked\n  selectedTagSpans.forEach(function (span) {\n    var tagName = span.textContent;\n    console.log('Evaluating span for tag:', tagName, 'and locked:', span.dataset.locked);\n    if (clearLocked || !Array.from(selectedTagDivs).some(function (div) {\n      return div.dataset.tag === tagName && div.dataset.locked === 'true';\n    })) {\n      span.classList.remove('selected');\n    } else {\n      console.log('Adding \"selected\" class for tag:', tagName);\n      span.classList.add('selected'); // Ensure locked tags remain highlighted\n    }\n  });\n\n  // Update selectedTags array to only contain locked tags if ignoreLocked is false\n  selectedTags = clearLocked ? [] : selectedTags.filter(function (tag) {\n    return tag.locked;\n  });\n};\n\n// Save locked tags\nvar saveLockedTags = function saveLockedTags() {\n  var lockedTags = Array.from(document.querySelectorAll('.selected-tag')).filter(function (tagDiv) {\n    return tagDiv.dataset.locked === 'true';\n  }).map(function (tagDiv) {\n    return {\n      tag: tagDiv.dataset.tag,\n      quantity: tagDiv.querySelector('.slider').value\n    };\n  });\n  console.log('Saving locked tags:', lockedTags);\n  localStorage.setItem('lockedTags', JSON.stringify(lockedTags));\n  console.log('Locked tags saved:', JSON.parse(localStorage.getItem('lockedTags')));\n};\n\n// Load and render locked tags\nvar loadLockedTags = function loadLockedTags() {\n  var loadedLockedTags = JSON.parse(localStorage.getItem('lockedTags') || '[]');\n  console.log('Locked tags loaded:', JSON.parse(localStorage.getItem('lockedTags')));\n  renderLockedTags(loadedLockedTags);\n  toggleBorders();\n};\n\n// Render locked tags\nvar renderLockedTags = function renderLockedTags(lockedTags) {\n  console.log('Rendering locked tags...');\n  selectedTagsWrapper.innerHTML = '';\n  lockedTags.forEach(function (tagInfo) {\n    console.log('Rendering tag:', tagInfo);\n    var tag = tagInfo.tag,\n      quantity = tagInfo.quantity;\n    var tagDiv = document.createElement('div');\n    tagDiv.classList.add('selected-tag', 'center');\n    tagDiv.dataset.tag = tag;\n\n    // Add a quantity slider, tag name, lock toggle, and remove btn\n    var slider = document.createElement('input');\n    slider.type = 'range';\n    slider.min = 1;\n    slider.max = 6;\n    slider.value = quantity;\n    slider.classList.add('slider');\n    var sliderValue = document.createElement('span');\n    sliderValue.classList.add('slider-value');\n    sliderValue.innerHTML = quantity;\n    slider.oninput = function () {\n      sliderValue.innerHTML = slider.value;\n    };\n    var tagName = document.createElement('span');\n    tagName.classList.add('name', 'center');\n    tagName.textContent = tag;\n    var lockToggle = document.createElement('button');\n    lockToggle.type = 'button';\n    lockToggle.classList.add('lock-toggle', 'center');\n    var lockIcon = document.createElement('i');\n    lockIcon.classList.add('fa-solid', 'fa-lock', 'locked-tag');\n    lockToggle.appendChild(lockIcon);\n    tagDiv.dataset.locked = 'true';\n    lockToggle.addEventListener('click', function () {\n      var isLocked = tagDiv.dataset.locked === 'true';\n      tagDiv.dataset.locked = isLocked ? 'false' : 'true';\n      if (isLocked) {\n        lockIcon.classList.remove('fa-lock');\n        lockIcon.classList.add('fa-unlock');\n        lockIcon.classList.add('locked-tag');\n      } else {\n        lockIcon.classList.add('fa-lock');\n        lockIcon.classList.remove('fa-unlock');\n        lockIcon.classList.remove('locked-tag');\n        saveLockedTags();\n      }\n    });\n    var removeBtn = document.createElement('button');\n    removeBtn.type = 'button';\n    removeBtn.classList.add('remove-btn', 'center');\n    var removeIcon = document.createElement('i');\n    removeIcon.classList.add('fa-solid', 'fa-trash-can');\n    removeBtn.appendChild(removeIcon);\n    removeBtn.addEventListener('click', function () {\n      var selectedTag = removeBtn.parentElement.dataset.tag;\n      removeTag(selectedTag);\n    });\n    tagDiv.appendChild(slider);\n    tagDiv.appendChild(sliderValue);\n    tagDiv.appendChild(tagName);\n    tagDiv.appendChild(lockToggle);\n    tagDiv.appendChild(removeBtn);\n    console.log('Tag Div:', tagDiv);\n    selectedTagsWrapper.appendChild(tagDiv);\n  });\n  console.log('Final selectedTagsWrapper:', selectedTagsWrapper.innerHTML);\n};\n\n//* TOGGLES & BUTTONS\nvar toggleNav = function toggleNav() {\n  openBtn.classList.toggle('open');\n  sidePanel.classList.toggle('open');\n  contentWrapper.classList.toggle('open');\n  resetBtn.click();\n};\nvar toggleBorders = function toggleBorders() {\n  var visibleTags = selectedTags.filter(function (tag) {\n    return !tag.locked;\n  }).length;\n  if (visibleTags >= 1) {\n    selectedTagsWrapper.classList.add('show-borders');\n    selectedTagsWrapper.classList.remove('hide');\n  } else {\n    selectedTagsWrapper.classList.remove('show-borders');\n    selectedTagsWrapper.classList.add('hide');\n  }\n};\ntotalSlider.addEventListener('input', function () {\n  totalPhotos = parseInt(totalSlider.value, 10);\n  lastTotalPhotos = totalPhotos;\n\n  // Display 'N/A' when slider value is 0\n  totalSliderValue.textContent = totalPhotos === 0 ? 'N/A' : totalPhotos;\n\n  // Disable and uncheck filler tags checkbox if total slider value is 'N/A'\n  if (totalPhotos === 0) {\n    remainder.disabled = true;\n    remainder.checked = false;\n    useRemainder = false;\n    totalSliderValue.classList.add('gray-out');\n    remainder.classList.add('gray-out');\n  } else {\n    remainder.disabled = false;\n    totalSliderValue.classList.remove('gray-out');\n    remainder.classList.remove('gray-out');\n  }\n});\nremainder.addEventListener('change', function () {\n  useRemainder = remainder.checked;\n  lastUseRemainder = useRemainder;\n});\nremoveBtns.forEach(function (removeBtn) {\n  removeBtn.addEventListener('click', function () {\n    console.log('Remove button clicked.');\n    var selectedTag = removeBtn.parentElement.dataset.tag;\n    console.log('Selected tag to remove:', selectedTag);\n    removeTag(selectedTag);\n  });\n});\nopenBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {\n  return _regeneratorRuntime().wrap(function _callee7$(_context7) {\n    while (1) switch (_context7.prev = _context7.next) {\n      case 0:\n        console.log('Open button clicked...');\n        _context7.next = 3;\n        return fetchPhotosData();\n      case 3:\n        toggleNav();\n        loadLockedTags();\n      case 5:\n      case \"end\":\n        return _context7.stop();\n    }\n  }, _callee7);\n})));\nrefreshBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {\n  var filteredPhotos;\n  return _regeneratorRuntime().wrap(function _callee8$(_context8) {\n    while (1) switch (_context8.prev = _context8.next) {\n      case 0:\n        console.log('Refresh button clicked...');\n        if (lastSelectedTagsAndQuantities !== null && lastTotalPhotos !== null && lastUseRemainder !== null) {\n          if (photos) {\n            filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities, lastTotalPhotos, lastUseRemainder);\n            displayPhotos(filteredPhotos);\n          } else {\n            console.error('Photos data is not available. Fetch it first.');\n          }\n        }\n      case 2:\n      case \"end\":\n        return _context8.stop();\n    }\n  }, _callee8);\n})));\nresetBtn.addEventListener('click', function () {\n  console.log('Reset button clicked...');\n  clearSelectedTags();\n\n  // Reset totalSlider value and remainder checkbox\n  totalSlider.value = 0;\n  totalSliderValue.textContent = totalSlider.value === 0 ? 'N/A' : totalSlider.value;\n  remainder.disabled = true;\n  remainder.checked = false;\n  useRemainder = false;\n  totalSliderValue.classList.add('gray-out');\n  remainder.classList.add('gray-out');\n  dropdown.value = 'select a tag';\n  toggleBorders();\n});\nrandomBtn.addEventListener('click', function () {\n  console.log('Random button clicked...');\n  clearSelectedTags(true);\n\n  // Get all available tags\n  var allTags = Array.from(document.querySelectorAll('.tag .name')).map(function (span) {\n    return span.textContent;\n  });\n  var numTagsToSelect = Math.floor(Math.random() * 3) + 2;\n\n  // Set max number of images per tag\n  var maxImagesPerTag;\n  switch (numTagsToSelect) {\n    case 2:\n      maxImagesPerTag = 6;\n      break;\n    case 3:\n      maxImagesPerTag = 4;\n      break;\n    case 4:\n      maxImagesPerTag = 3;\n      break;\n    default:\n      maxImagesPerTag = 3;\n  }\n  var totalImages = 0;\n\n  // Randomly select tags and set random slider values\n  for (var i = 0; i < numTagsToSelect; i++) {\n    var randomTagIndex = Math.floor(Math.random() * allTags.length);\n    var selectedTag = allTags[randomTagIndex];\n    allTags.splice(randomTagIndex, 1); // Removes duplicates\n\n    // Simulate selecting tag by setting dropdown value, triggering change event\n    dropdown.value = selectedTag;\n    dropdown.dispatchEvent(new Event('change'));\n\n    // Set value for slider, considering totalImages\n    var sliderValue = Math.min(Math.floor(Math.random() * maxImagesPerTag) + 2, 12 - totalImages);\n\n    // Set value for slider\n    var slider = document.querySelector(\".selected-tag[data-tag=\\\"\".concat(selectedTag, \"\\\"] .slider\"));\n    slider.value = sliderValue;\n\n    // Update slider value display\n    var sliderValueDisplay = document.querySelector(\".selected-tag[data-tag=\\\"\".concat(selectedTag, \"\\\"] .sliderValue\"));\n    sliderValueDisplay.innerHTML = slider.value;\n\n    // Update totalImages count\n    totalImages += sliderValue;\n  }\n\n  // Delay submitBtn trigger so it can finish executing\n  setTimeout(function () {\n    submitBtn.click();\n  }, 0);\n});\nsubmitBtn.addEventListener('click', /*#__PURE__*/function () {\n  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(e) {\n    var selectedTagsAndQuantities, filteredPhotos;\n    return _regeneratorRuntime().wrap(function _callee9$(_context9) {\n      while (1) switch (_context9.prev = _context9.next) {\n        case 0:\n          e.preventDefault();\n          console.log('Submit button clicked...');\n\n          // Get selected tags and quantities from selected-tags-wrapper\n          selectedTagsAndQuantities = Array.from(document.querySelectorAll('.selected-tag')).map(function (tagDiv) {\n            var tag = tagDiv.dataset.tag;\n            var quantity = tagDiv.querySelector('.slider').value;\n            return {\n              tag: tag,\n              quantity: quantity\n            };\n          });\n          lastSelectedTagsAndQuantities = selectedTagsAndQuantities;\n          if (photos) {\n            filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities, totalPhotos, useRemainder);\n            displayPhotos(filteredPhotos);\n          } else {\n            console.error('Photos data is not available. Fetch it first.');\n          }\n          toggleNav();\n        case 6:\n        case \"end\":\n          return _context9.stop();\n      }\n    }, _callee9);\n  }));\n  return function (_x4) {\n    return _ref11.apply(this, arguments);\n  };\n}());\nsignoutBtn.addEventListener('click', /*#__PURE__*/function () {\n  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(e) {\n    var response;\n    return _regeneratorRuntime().wrap(function _callee10$(_context10) {\n      while (1) switch (_context10.prev = _context10.next) {\n        case 0:\n          console.log('Sign out button clicked...');\n          e.preventDefault();\n          _context10.prev = 2;\n          _context10.next = 5;\n          return fetch('/logout', {\n            method: 'POST'\n          });\n        case 5:\n          response = _context10.sent;\n          if (response.ok) {\n            _context10.next = 8;\n            break;\n          }\n          throw new Error('Logout failed');\n        case 8:\n          google.accounts.id.disableAutoSelect();\n          console.log('User signed out.');\n          window.location.href = '/landing.html';\n          loadLockedTags();\n          _context10.next = 17;\n          break;\n        case 14:\n          _context10.prev = 14;\n          _context10.t0 = _context10[\"catch\"](2);\n          console.error('Error during logout:', _context10.t0);\n        case 17:\n        case \"end\":\n          return _context10.stop();\n      }\n    }, _callee10, null, [[2, 14]]);\n  }));\n  return function (_x5) {\n    return _ref12.apply(this, arguments);\n  };\n}());\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  console.log('DOMContentLoaded event fired...');\n  loadLockedTags();\n});\n\n//# sourceURL=webpack://flash-cards/./src/app.js?");

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
/******/ 		__webpack_require__.h = () => ("671db180cba106dfd918")
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
/******/ 		
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
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
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