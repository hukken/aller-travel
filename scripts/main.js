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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/_assets/js/main.js":
/*!***********************************!*\
  !*** ./source/_assets/js/main.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var changeLength = function changeLength(l, a, s) {
  if (s > l.getAttribute(a)) {
    // if s i greater
    for (var i = l.getAttribute(a); i <= s; i++) {
      l.setAttribute(a, i);
    }
  }

  if (s < l.getAttribute(a)) {
    for (var i = l.getAttribute(a); i > s; i--) {
      l.setAttribute(a, i);
    }
  }
};

var generateLine = function generateLine(length, p, c) {
  var ending = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var svgNS = svg.namespaceURI;
  svg.classList.add('chart');
  var line = document.createElementNS(svgNS, 'line');
  var x1 = 4;
  var x2;

  if ('rain' === c) {
    x2 = 100 / 30 * Number(length) + '%';
  } else if ('sun' === c) {
    x2 = 100 / 24 * Number(length) + '%';
  } else if ('temp' === c) {
    x2 = 100 / 35 * Number(length) + '%';
  } else if ('car' === c || 'walk' === c) {
    // Travel distance to POI – max is 60 mins
    x2 = 100 / 60 * Number(length) + '%';
  }

  line.setAttribute('x1', x1);
  line.setAttribute('x2', x2);
  line.setAttribute('y1', 10);
  line.setAttribute('y2', 10);

  if (ending) {
    //Create group
    var g = document.createElementNS(svgNS, 'g');
    svg.setAttribute('width', x1); //Create start bar

    var start = document.createElementNS(svgNS, 'line');
    start.setAttribute('x1', x1);
    start.setAttribute('x2', x1);
    start.setAttribute('y1', 3);
    start.setAttribute('y2', 17); //Create end bar

    var end = document.createElementNS(svgNS, 'line');
    end.setAttribute('x1', x2);
    end.setAttribute('x2', x2);
    end.setAttribute('y1', 3);
    end.setAttribute('y2', 17); //Append elements to group and add attributes

    g.appendChild(start);
    g.appendChild(line);
    g.appendChild(end);
    g.classList.add('line'); //Append group to SVG

    svg.appendChild(g);
    var span = p.getElementsByTagName('span');
    span[0].style.left = x2;
    p.insertBefore(svg, span[0]);
  } else {
    line.classList.add('weather-bar', 'bar-' + c);
    var line2 = document.createElementNS(svgNS, 'line');
    line2.setAttribute('x1', 4);
    line2.setAttribute('x2', '100%');
    line2.setAttribute('y1', 10);
    line2.setAttribute('y2', 10);
    line2.classList.add('secondary-bar');
    svg.appendChild(line2);
    svg.appendChild(line);
    p.appendChild(svg);
  }
};

var weather_group = document.querySelectorAll('.weather-group');

for (var i = 0; i < weather_group.length; i++) {
  var month_data = weather_group[i].querySelectorAll('.weather-data');

  for (var j = 0; j < month_data.length; j++) {
    // line = month_data[j].getElementsByTagName('line')[0];
    // changeLength(line, 'x2', 45);
    var data_parent = month_data[j];
    var data_type = month_data[j].classList[1];
    var data_value = data_parent.dataset.value; //console.log(data_type, data_value);

    generateLine(data_value, data_parent, data_type);
  }
}

var poi = document.querySelectorAll('.poi-data');

for (var j = 0; j < poi.length; j++) {
  // line = poi[j].getElementsByTagName('line')[0];
  // changeLength(line, 'x2', 45);
  var data_type = poi[j].dataset.type;
  var data_value = poi[j].dataset.value;
  console.log(data_type, data_value);
  generateLine(data_value, poi[j], data_type, true);
}

/***/ }),

/***/ "./source/_assets/sass/main.scss":
/*!***************************************!*\
  !*** ./source/_assets/sass/main.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************************!*\
  !*** multi ./source/_assets/js/main.js ./source/_assets/sass/main.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/angr02/Dropbox (Personal)/dev/aller-travel/source/_assets/js/main.js */"./source/_assets/js/main.js");
module.exports = __webpack_require__(/*! /Users/angr02/Dropbox (Personal)/dev/aller-travel/source/_assets/sass/main.scss */"./source/_assets/sass/main.scss");


/***/ })

/******/ });