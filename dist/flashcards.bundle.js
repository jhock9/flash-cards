/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/logout.js":
/*!*************************************!*\
  !*** ./src/js/components/logout.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   logout: () => (/* binding */ logout)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\nvar logout = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    var response;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          _context.prev = 0;\n          console.log('Sending logout request...');\n          _context.next = 4;\n          return fetch('/auth/logout', {\n            method: 'GET',\n            credentials: 'include'\n          });\n        case 4:\n          response = _context.sent;\n          if (response.ok) {\n            _context.next = 7;\n            break;\n          }\n          throw new Error('Logout failed');\n        case 7:\n          console.log('Logout successful.');\n          window.location.href = '/';\n          _context.next = 14;\n          break;\n        case 11:\n          _context.prev = 11;\n          _context.t0 = _context[\"catch\"](0);\n          console.error('Error during logout:', _context.t0);\n        case 14:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[0, 11]]);\n  }));\n  return function logout() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n// Export to dashboard.js and flashcards.js\n\n\n//# sourceURL=webpack://flash-cards/./src/js/components/logout.js?");

/***/ }),

/***/ "./src/js/flashcards/createSelectedTagDivs.js":
/*!****************************************************!*\
  !*** ./src/js/flashcards/createSelectedTagDivs.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   appendToNewDiv: () => (/* binding */ appendToNewDiv),\n/* harmony export */   createLockToggle: () => (/* binding */ createLockToggle),\n/* harmony export */   createRemoveBtn: () => (/* binding */ createRemoveBtn),\n/* harmony export */   createSlider: () => (/* binding */ createSlider),\n/* harmony export */   createTagName: () => (/* binding */ createTagName)\n/* harmony export */ });\n/* harmony import */ var _saveData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./saveData.js */ \"./src/js/flashcards/saveData.js\");\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n // toggleLockedTags(save = true, tag = null)\n\nvar createSlider = function createSlider(selectedTag) {\n  var slider = document.createElement('input');\n  slider.type = 'range';\n  slider.min = 1;\n  slider.max = 6;\n  slider.value = 1;\n  slider.classList.add('slider');\n  var sliderValue = document.createElement('span');\n  sliderValue.classList.add('slider-value');\n  sliderValue.innerHTML = slider.value;\n  slider.oninput = function () {\n    sliderValue.innerHTML = slider.value;\n    var selectedDiv = document.querySelector(\".selected-div[data-tag=\\\"\".concat(selectedTag, \"\\\"]\"));\n    if (selectedDiv && selectedDiv.dataset.locked === 'true') {\n      (0,_saveData_js__WEBPACK_IMPORTED_MODULE_0__.toggleLockedTags)(true, selectedTag);\n    }\n  };\n  return [slider, sliderValue];\n};\nvar createTagName = function createTagName(selectedTag) {\n  var tagName = document.createElement('span');\n  tagName.classList.add('name', 'center');\n  tagName.textContent = selectedTag;\n  return tagName;\n};\nvar createLockToggle = function createLockToggle(selectedDiv) {\n  var lockToggle = document.createElement('button');\n  lockToggle.type = 'button';\n  lockToggle.classList.add('lock-toggle', 'center');\n  var lockIcon = document.createElement('i');\n  lockIcon.classList.add('fa-solid', 'fa-unlock');\n  lockToggle.appendChild(lockIcon);\n  lockToggle.addEventListener('click', function () {\n    toggleLock(selectedDiv, lockIcon);\n  });\n  return lockToggle;\n};\nvar toggleLock = function toggleLock(selectedDiv, lockIcon) {\n  var isLocked = selectedDiv.dataset.locked === 'true';\n  selectedDiv.dataset.locked = isLocked ? 'false' : 'true';\n  var selectedTag = selectedDiv.dataset.tag;\n  (0,_saveData_js__WEBPACK_IMPORTED_MODULE_0__.toggleLockedTags)(!isLocked, selectedTag);\n  lockIcon.classList.toggle('fa-lock');\n  lockIcon.classList.toggle('fa-unlock');\n};\nvar createRemoveBtn = function createRemoveBtn(selectedDiv, callback, lockedPhoto) {\n  var removeBtn = document.createElement('button');\n  removeBtn.type = 'button';\n  removeBtn.classList.add('remove-btn', 'center');\n  var removeIcon = document.createElement('i');\n  removeIcon.classList.add('fa-solid', 'fa-trash-can');\n  removeBtn.appendChild(removeIcon);\n  removeBtn.addEventListener('click', function () {\n    var selectedTag = selectedDiv.dataset.tag;\n    callback(selectedTag, lockedPhoto);\n  });\n  return removeBtn;\n};\nvar appendToNewDiv = function appendToNewDiv(classList, elements) {\n  var _newDiv$classList;\n  var newDiv = document.createElement('div');\n  (_newDiv$classList = newDiv.classList).add.apply(_newDiv$classList, _toConsumableArray(classList.split(' ')));\n  elements.forEach(function (el) {\n    return newDiv.appendChild(el);\n  });\n  return newDiv;\n};\n\n// Export to selectedTagsAndPhotos.js\n\n\n//# sourceURL=webpack://flash-cards/./src/js/flashcards/createSelectedTagDivs.js?");

/***/ }),

/***/ "./src/js/flashcards/displayTags.js":
/*!******************************************!*\
  !*** ./src/js/flashcards/displayTags.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayTags: () => (/* binding */ displayTags)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\nvar googleTags;\n\n// Fetch tags data from database\nvar fetchTagsData = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    var response, responseText;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          console.log('Fetching google tags...');\n          _context.prev = 1;\n          _context.next = 4;\n          return fetch('/photos/get-tags', {\n            method: 'GET',\n            headers: {\n              'Content-Type': 'application/json'\n            }\n          });\n        case 4:\n          response = _context.sent;\n          if (response.ok) {\n            _context.next = 7;\n            break;\n          }\n          throw new Error(\"Server responded with status: \".concat(response.status));\n        case 7:\n          _context.next = 9;\n          return response.text();\n        case 9:\n          responseText = _context.sent;\n          googleTags = JSON.parse(responseText);\n          return _context.abrupt(\"return\", googleTags);\n        case 14:\n          _context.prev = 14;\n          _context.t0 = _context[\"catch\"](1);\n          console.error('Error fetching google tags:', _context.t0);\n        case 17:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[1, 14]]);\n  }));\n  return function fetchTagsData() {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar displayTags = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tagsList) {\n    var filteredTags, _iterator, _step, tag, tagDiv, tagName;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          console.log('Displaying tags...');\n          _context2.prev = 1;\n          _context2.next = 4;\n          return fetchTagsData();\n        case 4:\n          filteredTags = _context2.sent;\n          tagsList.innerHTML = '';\n          _iterator = _createForOfIteratorHelper(filteredTags);\n          try {\n            for (_iterator.s(); !(_step = _iterator.n()).done;) {\n              tag = _step.value;\n              tagDiv = document.createElement('div');\n              tagDiv.classList.add('tag', 'center');\n              tagName = document.createElement('span');\n              tagName.classList.add('name', 'center');\n              tagName.innerText = tag;\n              tagDiv.appendChild(tagName);\n              tagsList.appendChild(tagDiv);\n            }\n          } catch (err) {\n            _iterator.e(err);\n          } finally {\n            _iterator.f();\n          }\n          _context2.next = 13;\n          break;\n        case 10:\n          _context2.prev = 10;\n          _context2.t0 = _context2[\"catch\"](1);\n          console.error('Error:', _context2.t0);\n        case 13:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[1, 10]]);\n  }));\n  return function displayTags(_x) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n// Export to flashcards.js\n // displayTags(tagsList)\n\n//# sourceURL=webpack://flash-cards/./src/js/flashcards/displayTags.js?");

/***/ }),

/***/ "./src/js/flashcards/flashcards.js":
/*!*****************************************!*\
  !*** ./src/js/flashcards/flashcards.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_logout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/logout.js */ \"./src/js/components/logout.js\");\n/* harmony import */ var _displayTags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayTags.js */ \"./src/js/flashcards/displayTags.js\");\n/* harmony import */ var _photos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./photos.js */ \"./src/js/flashcards/photos.js\");\n/* harmony import */ var _selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectedTagsAndPhotos.js */ \"./src/js/flashcards/selectedTagsAndPhotos.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nvar flashPanel = document.querySelector('#flash-panel');\nvar tabletOpenBtn = document.querySelector('#tablet-open-btn');\nvar refreshBtn = document.querySelector('#refresh-btn');\nvar resetBtn = document.querySelector('#reset-btn');\nvar randomBtn = document.querySelector('#random-btn');\nvar submitBtn = document.querySelector('#submit-btn');\nvar dashboardBtn = document.querySelector('#dashboard-btn');\nvar totalSlider = document.querySelector('#total-slider');\nvar totalSliderValue = document.querySelector('#total-slider-value');\nvar remainder = document.querySelector('#remainder-checkbox');\nvar filterInput = document.querySelector('#filter-tags');\nvar tagsList = document.querySelector('#tags-list');\nvar lastSelectedTagsAndQuantities;\nvar photos;\nvar totalPhotos = 0;\nvar useRemainder = false;\nvar lastTotalPhotos;\nvar lastUseRemainder;\n\n // displayTags(tagsList)\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  updateSliderDisplay();\n  // Logout after 12 hours\n  setTimeout(_components_logout_js__WEBPACK_IMPORTED_MODULE_0__.logout, 12 * 60 * 60 * 1000);\n});\n\n//**   USER INPUTS TO SELECT PHOTOS TO DISPLAY   **//\n// Slider for total number of photos to display\ntotalSlider.addEventListener('input', function () {\n  totalPhotos = parseInt(totalSlider.value, 10);\n  lastTotalPhotos = totalPhotos;\n  updateSliderDisplay();\n});\nvar updateSliderDisplay = function updateSliderDisplay() {\n  // Display 'N/A' when slider value is 0\n  totalSliderValue.textContent = totalPhotos === 0 ? 'N/A' : totalPhotos;\n\n  // Disable and uncheck remainder tags checkbox if total slider value is 'N/A'\n  if (totalPhotos === 0) {\n    remainder.disabled = true;\n    remainder.checked = false;\n    useRemainder = false;\n    totalSliderValue.classList.add('gray-out');\n    remainder.classList.add('gray-out');\n  } else {\n    remainder.disabled = false;\n    totalSliderValue.classList.remove('gray-out');\n    remainder.classList.remove('gray-out');\n  }\n};\n\n// Checkbox for app to automatically fill in remaining photos\nremainder.addEventListener('change', function () {\n  useRemainder = remainder.checked;\n  lastUseRemainder = useRemainder;\n});\n\n// Search and filter tags\nfilterInput.addEventListener(\"input\", function (e) {\n  var searchText = e.target.value.toLowerCase();\n  var tags = document.querySelectorAll(\".tag\");\n  var _iterator = _createForOfIteratorHelper(tags),\n    _step;\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var tag = _step.value;\n      var tagLowerText = tag.innerText.toLowerCase();\n      if (tagLowerText.includes(searchText)) {\n        tag.classList.remove(\"hide\");\n      } else {\n        tag.classList.add(\"hide\");\n      }\n      ;\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n  ;\n});\n\n// Prevents the form from submitting when the user presses enter\nfilterInput.addEventListener(\"keydown\", function (e) {\n  if (e.key === \"Enter\") {\n    e.preventDefault();\n  }\n});\n\n// Selecting tags from the tags-list\ntagsList.addEventListener('click', function (e) {\n  console.log('Tags-list clicked...');\n  if (e.target.classList.contains('name')) {\n    var selectedTag = e.target.textContent;\n    var proceed = (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.handleTagSelection)(selectedTag, filterInput, e.target);\n    if (!proceed) {\n      return;\n    }\n    e.target.classList.add('selected');\n    (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.createSelectedTagDiv)(selectedTag);\n  }\n  (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.resetTagSelect)(filterInput);\n});\nvar toggleNav = function toggleNav() {\n  tabletOpenBtn.classList.toggle('open');\n  flashPanel.classList.toggle('open');\n  if (flashPanel.classList.contains('open')) {\n    (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.loadSelectedDivs)(filterInput);\n    updateSliderDisplay();\n  } else {\n    (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.clearSelectedDivs)();\n    updateSliderDisplay();\n  }\n};\n\n//**   BUTTONS   **//\nresetBtn.addEventListener('click', function () {\n  console.log('Reset button clicked...');\n\n  // Reset totalSlider value and remainder checkbox\n  totalPhotos = 0;\n  totalSlider.value = 0;\n  updateSliderDisplay();\n  (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.clearSelectedDivs)(true);\n  (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.resetTagSelect)(filterInput);\n  (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.toggleBorders)();\n});\nrandomBtn.addEventListener('click', function () {\n  console.log('Random button clicked...');\n  (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.clearSelectedDivs)(true);\n\n  // Get all available tags\n  var allTags = Array.from(document.querySelectorAll('.tag .name')).map(function (span) {\n    return span.textContent;\n  });\n  var numTagsToSelect = Math.floor(Math.random() * 3) + 1;\n  var totalImages = 0;\n\n  // Set max number of images per tag\n  var maxImagesPerTag;\n  switch (numTagsToSelect) {\n    case 1:\n      maxImagesPerTag = 6;\n      break;\n    case 2:\n      maxImagesPerTag = 4;\n      break;\n    case 3:\n      maxImagesPerTag = 3;\n      break;\n    case 4:\n      maxImagesPerTag = 2;\n      break;\n    default:\n      maxImagesPerTag = 2;\n  }\n\n  // Randomly select tags and set random slider values\n  for (var i = 0; i < numTagsToSelect; i++) {\n    var randomTagIndex = Math.floor(Math.random() * allTags.length);\n    var selectedTag = allTags[randomTagIndex];\n    allTags.splice(randomTagIndex, 1); // Removes duplicates\n\n    // Directly call the process that would happen on clicking the tag\n    var proceed = (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.handleTagSelection)(selectedTag, filterInput, null);\n    if (!proceed) continue; // If the tag shouldn't be added, skip to the next iteration\n\n    var selectedDiv = (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_3__.createSelectedTagDiv)(selectedTag);\n    var slider = selectedDiv.querySelector('.slider');\n\n    // Set value for slider, considering totalImages\n    var sliderValue = Math.min(Math.floor(Math.random() * maxImagesPerTag) + 1, 12 - totalImages);\n    slider.value = sliderValue;\n\n    // Update totalImages count\n    totalImages += sliderValue;\n  }\n\n  // Delay submitBtn trigger so it can finish executing\n  setTimeout(function () {\n    submitBtn.click();\n  }, 0);\n});\nsubmitBtn.addEventListener('click', /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {\n    var selectedTagsAndQuantities, filteredPhotos;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          e.preventDefault();\n          console.log('Submit button clicked...');\n\n          // Get selected tags and quantities from selected-tags-wrapper\n          selectedTagsAndQuantities = Array.from(document.querySelectorAll('.selected-tag-div')).map(function (selectedDiv) {\n            var tag = selectedDiv.dataset.tag;\n            var quantity = selectedDiv.querySelector('.slider').value;\n            return {\n              tag: tag,\n              quantity: quantity\n            };\n          });\n          lastSelectedTagsAndQuantities = selectedTagsAndQuantities;\n\n          // Fetch photos based on the selected tags\n          _context.next = 6;\n          return (0,_photos_js__WEBPACK_IMPORTED_MODULE_2__.fetchPhotosData)(selectedTagsAndQuantities.map(function (_ref2) {\n            var tag = _ref2.tag;\n            return tag;\n          }));\n        case 6:\n          photos = _context.sent;\n          if (!photos) {\n            _context.next = 14;\n            break;\n          }\n          _context.next = 10;\n          return (0,_photos_js__WEBPACK_IMPORTED_MODULE_2__.filterPhotosByTags)(photos, selectedTagsAndQuantities, totalPhotos, useRemainder);\n        case 10:\n          filteredPhotos = _context.sent;\n          (0,_photos_js__WEBPACK_IMPORTED_MODULE_2__.displayPhotos)(filteredPhotos);\n          _context.next = 15;\n          break;\n        case 14:\n          console.error('Photos data is not available. Fetch it first.');\n        case 15:\n          toggleNav();\n        case 16:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee);\n  }));\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}());\ntabletOpenBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {\n  return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n    while (1) switch (_context2.prev = _context2.next) {\n      case 0:\n        console.log('Open button clicked...');\n        try {\n          (0,_displayTags_js__WEBPACK_IMPORTED_MODULE_1__.displayTags)(tagsList);\n          toggleNav();\n        } catch (error) {\n          console.error('Error on open button click:', error);\n        }\n      case 2:\n      case \"end\":\n        return _context2.stop();\n    }\n  }, _callee2);\n})));\nrefreshBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {\n  var filteredPhotos;\n  return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n    while (1) switch (_context3.prev = _context3.next) {\n      case 0:\n        console.log('Refresh button clicked...');\n        if (!(lastSelectedTagsAndQuantities !== null && lastTotalPhotos !== null && lastUseRemainder !== null)) {\n          _context3.next = 10;\n          break;\n        }\n        if (!photos) {\n          _context3.next = 9;\n          break;\n        }\n        _context3.next = 5;\n        return (0,_photos_js__WEBPACK_IMPORTED_MODULE_2__.filterPhotosByTags)(photos, lastSelectedTagsAndQuantities, lastTotalPhotos, lastUseRemainder);\n      case 5:\n        filteredPhotos = _context3.sent;\n        (0,_photos_js__WEBPACK_IMPORTED_MODULE_2__.displayPhotos)(filteredPhotos);\n        _context3.next = 10;\n        break;\n      case 9:\n        console.error('Photos data is not available. Fetch it first.');\n      case 10:\n      case \"end\":\n        return _context3.stop();\n    }\n  }, _callee3);\n})));\ndashboardBtn.addEventListener('click', /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {\n    return _regeneratorRuntime().wrap(function _callee4$(_context4) {\n      while (1) switch (_context4.prev = _context4.next) {\n        case 0:\n          console.log('Dashboard button clicked...');\n          e.preventDefault();\n          window.location.href = '/dashboard';\n        case 3:\n        case \"end\":\n          return _context4.stop();\n      }\n    }, _callee4);\n  }));\n  return function (_x2) {\n    return _ref5.apply(this, arguments);\n  };\n}());\n\n//# sourceURL=webpack://flash-cards/./src/js/flashcards/flashcards.js?");

/***/ }),

/***/ "./src/js/flashcards/photoHelpers.js":
/*!*******************************************!*\
  !*** ./src/js/flashcards/photoHelpers.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addPhotos: () => (/* binding */ addPhotos),\n/* harmony export */   addRemainingPhotos: () => (/* binding */ addRemainingPhotos),\n/* harmony export */   adjustQuantities: () => (/* binding */ adjustQuantities),\n/* harmony export */   processTags: () => (/* binding */ processTags),\n/* harmony export */   shuffleArray: () => (/* binding */ shuffleArray)\n/* harmony export */ });\n// Adjust quantities based on the intended total and a maximum allowed value\nvar adjustQuantities = function adjustQuantities(selectedTagsAndQuantities, intendedTotal) {\n  console.log('Adjusting quantities...');\n  return selectedTagsAndQuantities.map(function (_ref) {\n    var tag = _ref.tag,\n      quantity = _ref.quantity;\n    var proportion = quantity / intendedTotal;\n    return {\n      tag: tag,\n      quantity: Math.round(proportion * 10)\n    };\n  });\n};\n\n// Process the tags and quantities, and add photos to the filteredPhotos array\nvar processTags = function processTags(photos, selectedTagsAndQuantities, selectedPhotoIds) {\n  console.log('Processing tags...');\n  var processedPhotos = selectedTagsAndQuantities.flatMap(function (_ref2) {\n    var tag = _ref2.tag,\n      quantity = _ref2.quantity;\n    var taggedPhotos = photos.filter(function (photo) {\n      var _photo$tag;\n      return ((_photo$tag = photo.tag) === null || _photo$tag === void 0 ? void 0 : _photo$tag.includes(tag)) && !selectedPhotoIds.has(photo.photoData._id);\n    });\n    shuffleArray(taggedPhotos);\n    return taggedPhotos.slice(0, quantity);\n  });\n  return processedPhotos;\n};\n\n// Add photos to the filteredPhotos array and update selectedPhotoIds\nvar addPhotos = function addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal) {\n  console.log('addPhotos called...');\n\n  // If the photo is not already in the filteredPhotos array, add it\n  photosToAdd.forEach(function (photo) {\n    // Add the photo to filteredPhotos and update selectedPhotoIds\n    if (!selectedPhotoIds.has(photo.photoData._id)) {\n      selectedPhotoIds.add(photo.photoData._id);\n      filteredPhotos.push(photo);\n    }\n  });\n\n  // If the locked photo is not in the new photos, add it\n  if (lockedPhoto && !filteredPhotos.includes(lockedPhoto)) {\n    var sameTagIndex = filteredPhotos.findIndex(function (photo) {\n      return photo.photoData.tagsFromGoogle.includes(lockedPhoto.photoData.tagsFromGoogle[0]);\n    });\n    if (sameTagIndex !== -1) {\n      // Replace the photo with the same tag with the locked photo\n      var removedPhoto = filteredPhotos.splice(sameTagIndex, 1, lockedPhoto)[0];\n      selectedPhotoIds[\"delete\"](removedPhoto._id);\n      selectedPhotoIds.add(lockedPhoto._id);\n    } else {\n      // Add the locked photo to the filteredPhotos array\n      selectedPhotoIds.add(lockedPhoto._id);\n      filteredPhotos.unshift(lockedPhoto);\n    }\n  }\n};\n\n// Add remaining photos if 'useRemainder' is checked\nvar addRemainingPhotos = function addRemainingPhotos(allPhotos, selectedPhotoIds, filteredPhotos, remainingPhotos) {\n  console.log('Adding remaining photos...');\n  console.log('First photo in AllPhotos:', allPhotos[0]);\n  var additionalPhotos = allPhotos.filter(function (photo) {\n    return !selectedPhotoIds.has(photo.photoData._id);\n  });\n  console.log('Additional photos:', additionalPhotos);\n  shuffleArray(additionalPhotos);\n  var photosToAdd = additionalPhotos.slice(0, remainingPhotos);\n  photosToAdd.forEach(function (photo) {\n    if (!selectedPhotoIds.has(photo.photoData._id)) {\n      filteredPhotos.push(photo);\n      selectedPhotoIds.add(photo.photoData._id);\n    }\n  });\n  return photosToAdd;\n};\nvar shuffleArray = function shuffleArray(array) {\n  for (var i = array.length - 1; i > 0; i--) {\n    var j = Math.floor(Math.random() * (i + 1));\n    var _ref3 = [array[j], array[i]];\n    array[i] = _ref3[0];\n    array[j] = _ref3[1];\n  }\n  return array;\n};\n\n// Exported to photos.js\n\n\n//# sourceURL=webpack://flash-cards/./src/js/flashcards/photoHelpers.js?");

/***/ }),

/***/ "./src/js/flashcards/photos.js":
/*!*************************************!*\
  !*** ./src/js/flashcards/photos.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayPhotos: () => (/* binding */ displayPhotos),\n/* harmony export */   fetchPhotosData: () => (/* binding */ fetchPhotosData),\n/* harmony export */   filterPhotosByTags: () => (/* binding */ filterPhotosByTags),\n/* harmony export */   lockedPhoto: () => (/* binding */ lockedPhoto),\n/* harmony export */   setLockedPhoto: () => (/* binding */ setLockedPhoto)\n/* harmony export */ });\n/* harmony import */ var _photoHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./photoHelpers.js */ \"./src/js/flashcards/photoHelpers.js\");\n/* harmony import */ var _saveData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saveData.js */ \"./src/js/flashcards/saveData.js\");\n/* harmony import */ var _selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectedTagsAndPhotos.js */ \"./src/js/flashcards/selectedTagsAndPhotos.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\nvar displayedImages = document.querySelector('#images-container');\nvar lockedPhotoBtn = document.querySelector('#locked-photo-btn');\nvar lockedPhoto;\nvar unlockedPhotoId;\n\n // toggleLockedPhoto(selectedTag, tag, save = true)\n // removeLockedPhoto(photoId, lockedPhoto, tag)\n\n// Fetch photos data from database\nvar fetchPhotosData = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(tags) {\n    var response, photos;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          console.log('Fetching photos data...');\n          _context.prev = 1;\n          _context.next = 4;\n          return fetch('/photos/get-photos', {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n              tags: tags || []\n            })\n          });\n        case 4:\n          response = _context.sent;\n          if (response.ok) {\n            _context.next = 7;\n            break;\n          }\n          throw new Error(\"Server responded with status: \".concat(response.status));\n        case 7:\n          _context.next = 9;\n          return response.json();\n        case 9:\n          photos = _context.sent;\n          console.log('First photo:', photos[0]);\n          return _context.abrupt(\"return\", photos);\n        case 14:\n          _context.prev = 14;\n          _context.t0 = _context[\"catch\"](1);\n          console.error('Error fetching photos:', _context.t0);\n        case 17:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[1, 14]]);\n  }));\n  return function fetchPhotosData(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar filterPhotosByTags = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(photos, selectedTagsAndQuantities, totalPhotos, useRemainder) {\n    var filteredPhotos, selectedPhotoIds, intendedTotal, photosToAdd, remainingPhotos, allPhotos, _photosToAdd;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          console.log('filterPhotosByTags called...');\n          console.log('photos length:', photos.length);\n          console.log('selectedTagsAndQuantities:', selectedTagsAndQuantities);\n          console.log('totalPhotos:', totalPhotos);\n          console.log('useRemainder:', useRemainder);\n          filteredPhotos = [];\n          selectedPhotoIds = new Set(); // Keep track of the selected photo IDs\n          // If there is a locked photo, add it to the selectedPhotoIds, otherwise remove it from the photos array\n          if (lockedPhoto) {\n            selectedPhotoIds.add(lockedPhoto.photoData._id);\n            filteredPhotos.push(lockedPhoto);\n          } else if (unlockedPhotoId) {\n            photos = photos.filter(function (photo) {\n              return photo.photoData._id !== unlockedPhotoId;\n            });\n            unlockedPhotoId = null; // Reset unlockedPhotoId\n          }\n\n          // Sum of all photos that are intended to be selected (based on slider values)\n          intendedTotal = selectedTagsAndQuantities.reduce(function (acc, _ref3) {\n            var quantity = _ref3.quantity;\n            return acc + parseInt(quantity, 10);\n          }, 0);\n          console.log('Intended total:', intendedTotal);\n\n          // If the intended total exceeds the maximum total of 10, adjust the quantities\n          if (intendedTotal > 10) {\n            selectedTagsAndQuantities = (0,_photoHelpers_js__WEBPACK_IMPORTED_MODULE_0__.adjustQuantities)(selectedTagsAndQuantities, intendedTotal);\n            intendedTotal = selectedTagsAndQuantities.reduce(function (acc, _ref4) {\n              var quantity = _ref4.quantity;\n              return acc + parseInt(quantity, 10);\n            }, 0);\n            console.log('Adjusted quantities:', selectedTagsAndQuantities);\n            console.log('Adjusted intended total:', intendedTotal);\n          }\n\n          // If the intended total is less than the maximum total, add photos based on the tags and quantities\n          photosToAdd = (0,_photoHelpers_js__WEBPACK_IMPORTED_MODULE_0__.processTags)(photos, selectedTagsAndQuantities, selectedPhotoIds);\n          console.log('number of Photos to add:', photosToAdd.length);\n          (0,_photoHelpers_js__WEBPACK_IMPORTED_MODULE_0__.addPhotos)(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);\n\n          // If there are still photos remaining, add them to the filtered photos\n          remainingPhotos = Math.max(0, totalPhotos - intendedTotal);\n          console.log('remainingPhotos:', remainingPhotos);\n\n          // If 'userRemainder' is true, add any remaining photos to the filtered photos\n          if (!(useRemainder && remainingPhotos > 0)) {\n            _context2.next = 24;\n            break;\n          }\n          _context2.next = 19;\n          return fetchPhotosData();\n        case 19:\n          allPhotos = _context2.sent;\n          _photosToAdd = (0,_photoHelpers_js__WEBPACK_IMPORTED_MODULE_0__.addRemainingPhotos)(allPhotos, selectedPhotoIds, filteredPhotos, remainingPhotos);\n          console.log('number of additional Photos to add:', _photosToAdd.length);\n          console.log('number of filteredPhotos to add:', filteredPhotos.length);\n          (0,_photoHelpers_js__WEBPACK_IMPORTED_MODULE_0__.addPhotos)(_photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);\n        case 24:\n          // Slice the array based on 'totalPhotos'\n          if (totalPhotos > 0) {\n            console.log('Slicing filtered photos to total photos...');\n            filteredPhotos = filteredPhotos.slice(0, totalPhotos);\n          }\n          (0,_photoHelpers_js__WEBPACK_IMPORTED_MODULE_0__.shuffleArray)(filteredPhotos);\n          console.log('Final filtered photos count:', filteredPhotos.length);\n          return _context2.abrupt(\"return\", filteredPhotos);\n        case 28:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2);\n  }));\n  return function filterPhotosByTags(_x2, _x3, _x4, _x5) {\n    return _ref2.apply(this, arguments);\n  };\n}();\nvar displayPhotos = function displayPhotos(filteredPhotos) {\n  console.log('displayPhotos called...');\n  displayedImages.innerHTML = '';\n  var numPhotos = filteredPhotos.length;\n  var flexBasis;\n  if (numPhotos > 6) {\n    flexBasis = \"calc((100% / 5) - 2rem)\";\n  } else if (numPhotos > 4) {\n    flexBasis = \"calc((100% / 4) - 2rem)\";\n  } else if (numPhotos > 1) {\n    flexBasis = \"calc((100% / 3) - 2rem)\";\n  } else {\n    flexBasis = \"calc(60% - 2rem)\";\n  }\n  var _loop = function _loop(i) {\n    var img = document.createElement('img');\n    img.src = filteredPhotos[i].photoData.baseUrl;\n    img.onerror = function () {\n      console.log(\"Failed to load image with ID: \".concat(filteredPhotos[i].photoData._id, \" and URL: \").concat(filteredPhotos[i].photoData.baseUrl));\n      // Optionally, replace with a placeholder image or display an error message\n    };\n    img.classList.add('image');\n    img.style.flexBasis = flexBasis;\n    img.photoData = filteredPhotos[i].photoData;\n    img.tag = filteredPhotos[i].tag;\n    lockPhoto(img);\n    displayedImages.appendChild(img);\n    img.classList.remove('locked-photo');\n  };\n  for (var i = 0; i < numPhotos; i++) {\n    _loop(i);\n  }\n};\nvar lockPhoto = function lockPhoto(img) {\n  // Lock or unlock the photo when clicked\n  img.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {\n    var save;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          console.log('Image clicked...');\n\n          // If another photo is already locked and it's not the one being clicked, unlock it\n          if (!(lockedPhoto && lockedPhoto.photoData._id !== img.photoData._id)) {\n            _context3.next = 6;\n            break;\n          }\n          console.log('Another photo is already locked, unlocking it...');\n          if (lockedPhoto.classList) {\n            lockedPhoto.classList.toggle('locked-photo');\n          }\n          // Remove the locked photo div from the selectedTagsWrapper, set lockedPhoto to null\n          _context3.next = 6;\n          return (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_2__.removeLockedPhoto)(lockedPhoto.photoData._id, lockedPhoto, lockedPhoto.tag);\n        case 6:\n          // Toggle the lock status of the clicked photo\n          save = !img.classList.contains('locked-photo');\n          if (!save) {\n            _context3.next = 16;\n            break;\n          }\n          console.log('Toggling lock status of clicked photo...');\n          _context3.next = 11;\n          return (0,_saveData_js__WEBPACK_IMPORTED_MODULE_1__.toggleLockedPhoto)(img.photoData._id, img.tag, save);\n        case 11:\n          img.classList.toggle('locked-photo');\n          lockedPhoto = {\n            photoData: img.photoData,\n            tag: img.tag\n          };\n          lockedPhotoBtn.classList.remove('hide');\n          _context3.next = 19;\n          break;\n        case 16:\n          _context3.next = 18;\n          return (0,_selectedTagsAndPhotos_js__WEBPACK_IMPORTED_MODULE_2__.removeLockedPhoto)(img.photoData._id, lockedPhoto, img.tag);\n        case 18:\n          unlockedPhotoId = img.photoData._id;\n        case 19:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3);\n  })));\n};\n\n// Set the locked photo (savedPhoto parameter used for loadSelectedDivs() in selectedTagsAndPhotos.js)\nvar setLockedPhoto = function setLockedPhoto(savedPhoto) {\n  if (savedPhoto && savedPhoto.length > 0) {\n    lockedPhoto = {\n      photoData: savedPhoto[0].photo,\n      // photo schema data\n      tag: savedPhoto[0].selectedTag // tag name\n    };\n  } else {\n    lockedPhoto = null;\n  }\n};\n\n// Export to flashcards.js and selectedTagsAndPhotos.js\n\n\n//# sourceURL=webpack://flash-cards/./src/js/flashcards/photos.js?");

/***/ }),

/***/ "./src/js/flashcards/saveData.js":
/*!***************************************!*\
  !*** ./src/js/flashcards/saveData.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toggleLockedPhoto: () => (/* binding */ toggleLockedPhoto),\n/* harmony export */   toggleLockedTags: () => (/* binding */ toggleLockedTags)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n// Get the appointment data from the URL and initialize the page\nvar urlParams = new URLSearchParams(window.location.search);\nvar appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));\nvar appointmentId = appointmentData._id;\n\n// Save or remove locked tags from database\nvar toggleLockedTags = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    var save,\n      tag,\n      savedTag,\n      selectedDiv,\n      sliderValue,\n      _args = arguments;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          save = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;\n          tag = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;\n          console.log('toggleLockedTags called...');\n          savedTag = [];\n          if (tag) {\n            // If a specific tag is provided, only save or remove that tag\n            console.log('Specific tag provided...');\n            selectedDiv = document.querySelector(\".selected-tag-div[data-tag=\\\"\".concat(tag, \"\\\"]\"));\n            if (selectedDiv) {\n              console.log('Found selectedDiv...');\n              sliderValue = parseInt(selectedDiv.querySelector('.slider').value);\n              savedTag.push({\n                name: selectedDiv.dataset.tag,\n                qty: sliderValue,\n                locked: selectedDiv.dataset.locked === 'true'\n              });\n            } else {\n              console.log('No selectedDiv found...');\n            }\n          } else {\n            // If no specific tag is provided, save or remove all locked tags\n            console.log('No specific tag provided...');\n            savedTag = Array.from(document.querySelectorAll('.selected-tag-div')).filter(function (selectedDiv) {\n              return selectedDiv.dataset.locked === 'true';\n            }).map(function (selectedDiv) {\n              var sliderValue = parseInt(selectedDiv.querySelector('.slider').value);\n              return {\n                name: selectedDiv.dataset.tag,\n                qty: sliderValue,\n                locked: true\n              };\n            }) || [];\n\n            // '|| []' ensures 'savedTag' is an array. It defaults to an empty array if no \n            // '.selected-div' elements with 'dataset.locked === 'true'' are found.\n          }\n          if (!save) {\n            _context.next = 11;\n            break;\n          }\n          // Save tags to the database\n          console.log('Saving tags to the database...');\n          _context.next = 9;\n          return fetch(\"/appointment/\".concat(appointmentId, \"/save-tags\"), {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n              savedTag: savedTag\n            })\n          });\n        case 9:\n          _context.next = 14;\n          break;\n        case 11:\n          // Remove saved tags from the database\n          console.log('Removing tags from the database...');\n          _context.next = 14;\n          return fetch(\"/appointment/\".concat(appointmentId, \"/remove-tags\"), {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n              savedTag: savedTag\n            })\n          });\n        case 14:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee);\n  }));\n  return function toggleLockedTags() {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar toggleLockedPhoto = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(photoId, selectedTag) {\n    var save,\n      action,\n      response,\n      _args2 = arguments;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          save = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;\n          // console.log('toggleLockedPhoto called...');\n          action = save ? 'save-photo' : 'remove-photo'; // Limit to only one photo saved per appointment or now, but could be increased in later versions.\n          _context2.prev = 2;\n          _context2.next = 5;\n          return fetch(\"/appointment/\".concat(appointmentId, \"/\").concat(action), {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n              photoId: photoId,\n              selectedTag: selectedTag\n            })\n          });\n        case 5:\n          response = _context2.sent;\n          if (response.ok) {\n            _context2.next = 8;\n            break;\n          }\n          throw new Error(\"Server responded with status: \".concat(response.status));\n        case 8:\n          ;\n          _context2.next = 11;\n          return response.json();\n        case 11:\n          console.log(\"Photo \".concat(action, \" successfully\"));\n          _context2.next = 17;\n          break;\n        case 14:\n          _context2.prev = 14;\n          _context2.t0 = _context2[\"catch\"](2);\n          console.error(\"Error in \".concat(action, \" photo:\"), _context2.t0);\n        case 17:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[2, 14]]);\n  }));\n  return function toggleLockedPhoto(_x, _x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n\n//# sourceURL=webpack://flash-cards/./src/js/flashcards/saveData.js?");

/***/ }),

/***/ "./src/js/flashcards/selectedTagsAndPhotos.js":
/*!****************************************************!*\
  !*** ./src/js/flashcards/selectedTagsAndPhotos.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearSelectedDivs: () => (/* binding */ clearSelectedDivs),\n/* harmony export */   createSelectedTagDiv: () => (/* binding */ createSelectedTagDiv),\n/* harmony export */   handleTagSelection: () => (/* binding */ handleTagSelection),\n/* harmony export */   loadSelectedDivs: () => (/* binding */ loadSelectedDivs),\n/* harmony export */   removeLockedPhoto: () => (/* binding */ removeLockedPhoto),\n/* harmony export */   resetTagSelect: () => (/* binding */ resetTagSelect),\n/* harmony export */   toggleBorders: () => (/* binding */ toggleBorders)\n/* harmony export */ });\n/* harmony import */ var _createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createSelectedTagDivs.js */ \"./src/js/flashcards/createSelectedTagDivs.js\");\n/* harmony import */ var _photos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./photos.js */ \"./src/js/flashcards/photos.js\");\n/* harmony import */ var _saveData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./saveData.js */ \"./src/js/flashcards/saveData.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n// Get the appointment data from the URL and initialize the page\nvar urlParams = new URLSearchParams(window.location.search);\nvar appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));\nvar appointmentId = appointmentData._id;\nvar selectedTagsWrapper = document.querySelector('#selected-tags-wrapper');\nvar removeBtns = document.querySelectorAll('.remove-btn');\nvar lockedPhotoBtn = document.querySelector('#locked-photo-btn');\nvar selectedTags = [];\n\n // global variable, setLockedPhoto(savedPhoto)\n\n\n// Load saved tags\nvar loadSelectedDivs = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(filterInput) {\n    var tagsResponse, tagData, savedTags, photoResponse, photoData;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          console.log('loadSelectedDivs called...');\n          toggleBorders();\n          _context.next = 4;\n          return fetch(\"/appointment/\".concat(appointmentId, \"/load-tags\"));\n        case 4:\n          tagsResponse = _context.sent;\n          _context.next = 7;\n          return tagsResponse.json();\n        case 7:\n          tagData = _context.sent;\n          savedTags = tagData.savedTags;\n          _context.next = 11;\n          return fetch(\"/appointment/\".concat(appointmentId, \"/load-photo\"));\n        case 11:\n          photoResponse = _context.sent;\n          _context.next = 14;\n          return photoResponse.json();\n        case 14:\n          photoData = _context.sent;\n          (0,_photos_js__WEBPACK_IMPORTED_MODULE_1__.setLockedPhoto)(photoData.savedPhotos);\n          selectedTagsWrapper.innerHTML = '';\n          selectedTags = [];\n          savedTags.forEach(function (tagInfo) {\n            var name = tagInfo.name,\n              qty = tagInfo.qty;\n            var proceed = handleTagSelection(name, filterInput, null);\n            if (!proceed) {\n              return;\n            }\n\n            // Modify the slider value to reflect stored quantity\n            var selectedDiv = createSelectedTagDiv(name);\n            var slider = selectedDiv.querySelector('.slider');\n            var sliderValue = selectedDiv.querySelector('.slider-value');\n            slider.value = qty;\n            sliderValue.textContent = qty;\n\n            // Set tag to locked\n            var lockIcon = selectedDiv.querySelector('.fa-solid');\n            selectedDiv.dataset.locked = 'true';\n            lockIcon.classList.add('fa-lock');\n            lockIcon.classList.remove('fa-unlock');\n          });\n\n          // If there is a locked photo, create a div for it\n          if (_photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto !== null) {\n            createLockedPhotoDiv(_photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto);\n            toggleBorders();\n          } else {\n            console.log('No locked photo');\n          }\n          ;\n          resetTagSelect(filterInput);\n        case 22:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee);\n  }));\n  return function loadSelectedDivs(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar handleTagSelection = function handleTagSelection(selectedTag, filterInput) {\n  var sourceElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  console.log('handleTagSelection called...');\n  // Check if the tag is already selected\n  if (selectedTags.includes(selectedTag)) {\n    removeSelectedDiv(selectedTag);\n    resetTagSelect(filterInput);\n    return false;\n  }\n\n  // Check if 4 tags have already been selected\n  if (selectedTags.length >= 4) {\n    return false;\n  }\n  selectedTags.push(selectedTag);\n  toggleBorders();\n  if (sourceElement) sourceElement.classList.add('selected');\n  return true;\n};\n\n// Creating selected tag divs\nvar createSelectedTagDiv = function createSelectedTagDiv(selectedTag) {\n  // Create a new div for the selected tag\n  var selectedDiv = document.createElement('div');\n  selectedDiv.classList.add('selected-div', 'selected-tag-div', 'center');\n  selectedDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag\n\n  // Create elements\n  var _createSlider = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.createSlider)(selectedTag),\n    _createSlider2 = _slicedToArray(_createSlider, 2),\n    slider = _createSlider2[0],\n    sliderValue = _createSlider2[1];\n  var tagName = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.createTagName)(selectedTag);\n  var lockToggle = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.createLockToggle)(selectedDiv);\n  var removeBtn = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.createRemoveBtn)(selectedDiv, removeSelectedDiv); // using removeSelectedDiv() in place of callback here\n\n  // Append elements\n  var sliderTagDiv = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.appendToNewDiv)('slider-tag-div center', [slider, sliderValue, tagName]);\n  var iconDiv = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.appendToNewDiv)('icon-div center', [lockToggle, removeBtn]);\n  selectedDiv.appendChild(sliderTagDiv);\n  selectedDiv.appendChild(iconDiv);\n  selectedTagsWrapper.appendChild(selectedDiv);\n  return selectedDiv;\n};\nvar removeSelectedDiv = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(divToRemove) {\n    var selectedDiv, tagSpan;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          // The divToRemove is either a tag name (for selected/locked TAG divs) or a photo ID (for locked PHOTO divs)\n          console.log('removeSelectedDiv called...');\n\n          // Check if this is a locked photo\n          if (!(_photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto && divToRemove === _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto.photoData._id)) {\n            _context2.next = 5;\n            break;\n          }\n          console.log('Locked photo found...');\n          _context2.next = 5;\n          return removeLockedPhoto(_photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto.photoData._id, _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto, _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto.tag);\n        case 5:\n          // Remove the TAG divToRemove from the selectedTags array\n          selectedTags = selectedTags.filter(function (tag) {\n            return tag !== divToRemove;\n          });\n\n          // Remove the divToRemove from the selected-tags-wrapper\n          selectedDiv = document.querySelector(\".selected-div[data-tag=\\\"\".concat(divToRemove, \"\\\"]\"));\n          if (selectedDiv) {\n            console.log('Tag removed from database...');\n            (0,_saveData_js__WEBPACK_IMPORTED_MODULE_2__.toggleLockedTags)(false, divToRemove); // Removes tag divs from database\n            selectedDiv.remove(); // Removes tag from DOM after it's removed from the database\n            console.log('Tag removed from DOM...');\n          } else {\n            console.log('Tag not found in database or DOM...');\n          }\n\n          // Deselect the TAG divToRemove from the tags-list\n          tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(function (span) {\n            return span.textContent === divToRemove;\n          });\n          if (tagSpan) {\n            tagSpan.classList.remove('selected');\n          }\n          toggleBorders();\n        case 11:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2);\n  }));\n  return function removeSelectedDiv(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\nvar clearSelectedDivs = function clearSelectedDivs() {\n  var removeLockedTags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  console.log('clearSelectedDivs called...');\n  var selectedDivs = Array.from(document.querySelectorAll('.selected-div'));\n  selectedDivs.forEach(function (div) {\n    // Check if the div is a locked tag or a locked photo\n    var isLockedTag = div.dataset.locked === 'true';\n    var isLockedPhoto = _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto && div.dataset.tag === _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto.photoData._id;\n\n    // if removeLockedTags is true, or if the isLockedTag and isLockedPhoto are both false, remove the tag\n    if (removeLockedTags || !isLockedTag && !isLockedPhoto) {\n      var divToRemove = isLockedPhoto ? _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto.photoData._id : div.dataset.tag;\n      removeSelectedDiv(divToRemove); // Removes from DOM and database\n    }\n  });\n\n  // Filter selectedTags array to only include locked tags\n  selectedTags = selectedTags.filter(function (tag) {\n    return !removeLockedTags || tag.locked;\n  });\n\n  // Check if there are any locked tags\n  var lockedTags = selectedTags.filter(function (tag) {\n    return tag.locked;\n  });\n\n  // Clear locked tags from database if removeLockedTags is true\n  if (removeLockedTags && (lockedTags.length > 0 || _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto)) {\n    console.log('Clearing locked tags and photo from database...');\n    (0,_saveData_js__WEBPACK_IMPORTED_MODULE_2__.toggleLockedTags)(false);\n  } else if (lockedTags.length > 0) {\n    console.log('Keeping locked tags on database...');\n    (0,_saveData_js__WEBPACK_IMPORTED_MODULE_2__.toggleLockedTags)(true);\n  }\n  ;\n  toggleBorders();\n};\n\n// Reset dropdown, filterInput and tags in tagsList\nvar resetTagSelect = function resetTagSelect(filterInput) {\n  // dropdown.selectedIndex = 0;\n  var tags = document.querySelectorAll(\".tag\");\n  tags.forEach(function (tag) {\n    return tag.classList.remove(\"hide\");\n  });\n  filterInput.value = \"\";\n};\n\n// Toggle borders on selected tags wrapper\nvar toggleBorders = function toggleBorders() {\n  var visibleTags = selectedTags.filter(function (tag) {\n    return !tag.locked;\n  });\n  if (visibleTags.length >= 1 || _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto) {\n    selectedTagsWrapper.classList.add('show-borders');\n    selectedTagsWrapper.classList.remove('hide');\n  } else {\n    selectedTagsWrapper.classList.remove('show-borders');\n    selectedTagsWrapper.classList.add('hide');\n  }\n};\nremoveBtns.forEach(function (btn) {\n  btn.addEventListener('click', function () {\n    console.log('Remove button clicked..');\n    // Select the div to remove based on the button's parent element dataset tag value\n    var selectedDiv = btn.parentElement.dataset.tag;\n    removeSelectedDiv(selectedDiv);\n  });\n});\nvar removeLockedPhoto = /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(photoId, lockedPhoto, selectedTag) {\n    var images, photoElement, lockedPhotoDiv;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          console.log('removeLockedPhoto called...');\n          if (!(!photoId || !lockedPhoto)) {\n            _context3.next = 4;\n            break;\n          }\n          console.log(\"photoId: \".concat(photoId, \", lockedPhoto: \").concat(JSON.stringify(lockedPhoto, null, 2), \", selectedTag: \").concat(selectedTag, \" identified as null or undefined\"));\n          return _context3.abrupt(\"return\");\n        case 4:\n          ;\n\n          // Check if the photo is locked\n          if (!(lockedPhoto && photoId === lockedPhoto.photoData._id)) {\n            _context3.next = 13;\n            break;\n          }\n          _context3.next = 8;\n          return (0,_saveData_js__WEBPACK_IMPORTED_MODULE_2__.toggleLockedPhoto)(photoId, selectedTag, false);\n        case 8:\n          // Remove the photo from the DOM\n          images = Array.from(document.getElementsByClassName('image'));\n          photoElement = images.find(function (img) {\n            return img.photoData._id === photoId;\n          });\n          if (photoElement) {\n            console.log('Removing photo from DOM...');\n            photoElement.classList.remove('locked-photo');\n          } else {\n            console.log('Photo element not found in DOM');\n          }\n\n          // Remove the locked photo div from the selectedTagsWrapper\n          lockedPhotoDiv = document.querySelector(\".selected-photo-div[data-tag=\\\"\".concat(photoId, \"\\\"]\"));\n          if (lockedPhotoDiv) {\n            console.log('Removing locked photo div...');\n            lockedPhotoDiv.remove();\n          } else {\n            console.log('Locked photo div not found in DOM');\n          }\n        case 13:\n          console.log('Hiding locked photo container and toggling borders...');\n          lockedPhotoBtn.classList.add('hide');\n          (0,_photos_js__WEBPACK_IMPORTED_MODULE_1__.setLockedPhoto)(null); // Resets lockedPhoto to null\n          toggleBorders();\n        case 17:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3);\n  }));\n  return function removeLockedPhoto(_x3, _x4, _x5) {\n    return _ref3.apply(this, arguments);\n  };\n}();\nvar createLockedPhotoDiv = function createLockedPhotoDiv(lockedPhoto) {\n  console.log('createLockedPhotoDiv called...');\n  var selectedDiv = document.createElement('div');\n  selectedDiv.classList.add('selected-div', 'selected-photo-div', 'center');\n  selectedDiv.dataset.tag = lockedPhoto.photoData._id;\n  var tagText = document.createElement('span');\n  tagText.classList.add('tag-text', 'center');\n  tagText.innerHTML = \"Image tag locked:\";\n  var tagName = document.createElement('span');\n  tagName.classList.add('name', 'center');\n  tagName.textContent = lockedPhoto.tag;\n  var removeBtn = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.createRemoveBtn)(selectedDiv, removeLockedPhoto, lockedPhoto);\n  var tagNameDiv = (0,_createSelectedTagDivs_js__WEBPACK_IMPORTED_MODULE_0__.appendToNewDiv)('locked-photo-name center', [tagText, tagName]);\n  selectedDiv.appendChild(tagNameDiv);\n  selectedDiv.appendChild(removeBtn);\n  selectedTagsWrapper.prepend(selectedDiv);\n  console.log('Locked photo div added to selected tags wrapper...');\n  toggleBorders();\n};\nlockedPhotoBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {\n  return _regeneratorRuntime().wrap(function _callee4$(_context4) {\n    while (1) switch (_context4.prev = _context4.next) {\n      case 0:\n        console.log('Locked photo button clicked to unlock...');\n        if (!_photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto) {\n          _context4.next = 5;\n          break;\n        }\n        console.log('lockedPhoto:', _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto);\n        _context4.next = 5;\n        return removeLockedPhoto(_photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto.photoData._id, _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto, _photos_js__WEBPACK_IMPORTED_MODULE_1__.lockedPhoto.tag);\n      case 5:\n      case \"end\":\n        return _context4.stop();\n    }\n  }, _callee4);\n})));\n\n// Export to flashcards.js\n\n\n//# sourceURL=webpack://flash-cards/./src/js/flashcards/selectedTagsAndPhotos.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 		__webpack_require__.hmrF = () => ("flashcards." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("d73770510f5578bf4787")
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
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
/******/ 				// inherit from previous dispose call
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
/******/ 			return Promise.all(results).then(function () {});
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
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
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
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
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
/******/ 			"flashcards": 0
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
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
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
/******/ 								} catch (err1) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err1,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err1);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/flashcards/flashcards.js");
/******/ 	
/******/ })()
;