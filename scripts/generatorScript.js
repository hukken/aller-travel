//EXCEL
function handleFile(e,type) {
    //Get the files from Upload control
    var files = e.target.files;
    var i, f;
    //Loop through files
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result;

            var result;
            var workbook = XLSX.read(data, { type: 'binary' });
            
            var sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                if (roa.length > 0) {
                    result = roa;
                }
            });
            //Render tables
            if (type == 'poi' ) {
                var output = "<div class='poi-table'>\n";

                for(var i = 0, len = result.length; i < len; i++) {
                    output += "\t<div class='poi-group'>\n";
                    output += "\t\t<div class='poi-name'>" + result[i]['Hva'] + "</div>\n";
                    output += "\t\t<div class='poi-data' data-type='" + result[i]['Type'] + "' data-value='" + result[i]['Avstand'] + "'>\n";
                    output += "\t\t\t<span>\n";

                    if (result[i]['Type'] === 'walk') {
                        output += "\t\t\t\t<i class='aticon-walking' aria-hidden='true'></i>\n";
                    } else {
                        output += "\t\t\t\t<i class='aticon-" + result[i]['Type'] + " aria-hidden='true'></i>\n"
                    }
                    
                    output += "\t\t\t\t" + result[i]['Avstand'] + " min\n";

                    output += "\t\t\t</span>\n";
                    output += "\t\t</div>\n";
                    output += "\t</div>\n";
                }
                output += "</div>\n";                
                outputCode = output.replace(/</g,"&lt;");
                outputCode = outputCode.replace(/>/g,"&gt;");
                $('.poi-cont .the-code pre').html("");
                $('.poi-cont .the-code pre').html(outputCode);
                $('.poi-cont .the-code .poi-view-code').html(output);

                $('.poi-cont .the-code').css('display','block');
                doTheLines()
            } else if (type == 'weather') {
                output = "<div class='weather-table'>\n";
                output += "\t<div class='weather-header'>\n";
                output += "\t\<div class='weather-month'></div>\n";
                output += "\t\t<div class='weather-data rain'>\n";
                output += "\t\t\t<h4>Antall nedbørs&shy;dager</h4>\n";
                output += "\t\t\t<i class='aticon-rain' aria-hidden='true'></i>";
                output += "\t\t</div>\n";
                output += "\t\t<div class='weather-data sun'>\n";
                output += "\t\t\t<h4>Antall soltimer</h4>\n";
                output += "\t\t\t<i class='aticon-sun' aria-hidden='true'></i>\n";
                output += "\t\t</div>\n";
                output += "\t\t<div class='weather-data temp'>\n";
                output += "\t\t\t<h4>Gjennom&shy;snitts&shy;temperatur</h4>\n";
                output += "\t\t\t<i class='aticon-temp' aria-hidden='true'></i>\n";
                output += "\t\t</div>\n";
                output += "\t</div>\n";
                for(var i = 0, len = result.length; i < len; i++) {
                    output += "\t<div class='weather-group'>\n";
                    output += "\t\t<div class='weather-month' data-abbr='jan'>" + result[i]['Måned'] + "</div>\n";
                    output += "\t\t<div class='weather-data rain' data-value='" + result[i]['Nedbørsdager'] + "' data-title='Nedbørsdager'><span>" + result[i]['Nedbørsdager'] + "</span></div>\n";
                    output += "\t\t<div class='weather-data sun' data-value='" + result[i]['Soltimer'] + "' data-title='Soltimer'><span>" + result[i]['Soltimer'] + "</span></div>\n";
                    output += "\t\t<div class='weather-data temp' data-value='" + result[i]['Temperatur'] + "' data-title='Temperatur'><span>" + result[i]['Temperatur'] + "</span></div>\n";
                    output += "\t</div>\n";
                }
                output += "</div>\n";
                outputCode = output.replace(/</g,"&lt;");
                outputCode = outputCode.replace(/>/g,"&gt;");
                $('.weather-cont .the-code pre').html("");
                $('.weather-cont .the-code pre').html(outputCode);
                $('.weather-cont .the-code .weather-view-code').html(output);
                $('.weather-cont .the-code').css('display','block');
                doTheLines()
            } else if (type == 'temp') {
                console.log(result);
                output = "<div class='temp-wrapper'>\n";
                output += "\t<div class='temp-scroller'>\n";
                output += "\t\t<table class='temp-table'>\n";
                output += "\t\t\t<thead>\n";
                output += "\t\t\t\t<tr class='temp-header temp-row'>\n";
                output += "\t\t\t\t\t<th class='temp-city'></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='jan'><span>januar</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='feb'><span>februar</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='mar'><span>mars</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='apr'><span>april</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='mai'><span>mai</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='jun'><span>juni</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='jul'><span>juli</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='aug'><span>august</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='sept'><span>september</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='okt'><span>oktober</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='nov'><span>november</span></th>\n";
                output += "\t\t\t\t\t<th class='temp-data' data-abbr='des'><span>desember</span></th>\n";
                output += "\t\t\t\t</tr>\n";
                output += "\t\t\t</thead>\n";
                output += "\t\t\t<tbody>\n";
                for(var i = 0, len = result.length; i < len; i++) {
                    output += "\t\t\t\t<tr class='temp-row'>\n";
                    output += "\t\t\t\t\t<td class='temp-city'>" + result[i]['Sted'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['januar'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['februar'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['mars'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['april'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['mai'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['juni'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['juli'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['august'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['september'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['oktober'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['november'] + "</td>\n";
                    output += "\t\t\t\t\t<td class='temp-data'>" + result[i]['desember'] + "</td>\n";
                    output += "\t\t\t\t</tr>\n";
                }

                output += "\t\t\t</tbody>\n";
                output += "\t\t</table>\n";
                output += "\t</div>\n";
                output += "</div>\n";

                outputCode = output.replace(/</g,"&lt;");
                outputCode = outputCode.replace(/>/g,"&gt;");

                $('.temp-cont .the-code pre').html("");
                $('.temp-cont .the-code pre').html(outputCode);
                $('.temp-cont .the-code .temp-view-code').html(output);
                $('.temp-cont .the-code').css('display','block');
                
            }
        }
        reader.readAsArrayBuffer(f);
    }
}

//Change event to dropdownlist
$(document).ready(function(){
    $('.poi-cont #files-poi').change(function(event) {
            handleFile(event,'poi');
            console.log('runned');
    });

    $('#poi-submit').click(function() {
        $('.poi-cont #files-poi').trigger('change');
    });
    
    $('.temp-cont #files-temp').change(function(event) {
        handleFile(event,'temp');
    });
    $('.weather-cont #files-weather').change(function(event) {
        handleFile(event,'weather');
    });

    new ClipboardJS('#copy-poi-code');
    new ClipboardJS('#copy-weather-code');
    new ClipboardJS('#copy-temp-code');

    $('.menu-poi').click(function(){
        menuChange('poi');
    });
    $('.menu-weather').click(function(){
        menuChange('weather');
    });
    $('.menu-temp').click(function(){
        menuChange('temp');
    });
    $('.menu-facilities').click(function(){
        menuChange('facilities');
    });
    $('.menu-airtravel').click(function(){
        menuChange('airtravel');
    });
});

function menuChange(item) {
    if (item == 'poi') {
        $('.menu-poi').css('background','lightgrey');
        $('.menu-weather').css('background','none');
        $('.menu-temp').css('background','none');
        $('.menu-facilities').css('background','none');
        $('.menu-airtravel').css('background','none');  

        $('.poi-cont').css('display','block');
        $('.weather-cont').css('display','none');
        $('.temp-cont').css('display','none');
        $('.airtravel-cont').css('display','none');
        $('.facilities-cont').css('display','none');
    } else if (item == 'weather') {
        $('.menu-temp').css('background','none');
        $('.menu-weather').css('background','lightgrey');
        $('.menu-poi').css('background','none');
        $('.menu-facilities').css('background','none');
        $('.menu-airtravel').css('background','none');  

        $('.poi-cont').css('display','none');
        $('.weather-cont').css('display','block');
        $('.temp-cont').css('display','none');
        $('.airtravel-cont').css('display','none');
        $('.facilities-cont').css('display','none');
    } else if (item == 'temp') {
        $('.menu-temp').css('background','lightgrey');
        $('.menu-weather').css('background','none');
        $('.menu-poi').css('background','none');
        $('.menu-facilities').css('background','none');
        $('.menu-airtravel').css('background','none');  

        $('.poi-cont').css('display','none');
        $('.weather-cont').css('display','none');
        $('.temp-cont').css('display','block');
        $('.airtravel-cont').css('display','none');
        $('.facilities-cont').css('display','none');
    } else if (item == 'facilities') {
        $('.menu-facilities').css('background','lightgrey');
        $('.menu-temp').css('background','none');
        $('.menu-weather').css('background','none');
        $('.menu-poi').css('background','none');
        $('.menu-airtravel').css('background','none');   

        $('.poi-cont').css('display','none');
        $('.weather-cont').css('display','none');
        $('.temp-cont').css('display','none');
        $('.airtravel-cont').css('display','none');
        $('.facilities-cont').css('display','block');
    } else if (item == 'airtravel') {
        $('.menu-airtravel').css('background','lightgrey');
        $('.menu-facilities').css('background','none');
        $('.menu-temp').css('background','none');
        $('.menu-weather').css('background','none');
        $('.menu-poi').css('background','none');        

        $('.poi-cont').css('display','none');
        $('.weather-cont').css('display','none');
        $('.temp-cont').css('display','none');
        $('.facilities-cont').css('display','none');
        $('.airtravel-cont').css('display','block');
    } 
}

function doTheLines() {
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
}
