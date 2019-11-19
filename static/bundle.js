// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"YvtQ":[function(require,module,exports) {

},{}],"Hn3T":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var sidebar = function ($) {
  return function (initialItem, itemSelected) {
    function selectItem(itemId) {
      if (!itemId) {
        return;
      }

      $('#sidebar .item').each(function () {
        if ($(this).data('item') === itemId) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
      itemSelected(itemId);
    }

    $('#sidebar .item').each(function () {
      $(this).on('click', function (e) {
        selectItem($(e.target).data('item'));
      });
    });
    $('#sidebar .collapse-button').on('click', function () {
      $('#sidebar').removeClass('visible');
    });
    $('#sidebar-small .expand-button').on('click', function () {
      $('#sidebar').addClass('visible');
    });
    $(window).resize(function () {
      if (window.innerWidth <= 768) {
        $('#sidebar').removeClass('visible');
      }
    });
    selectItem(initialItem);
  };
}(jQuery);

var _default = sidebar;
exports.default = _default;
},{}],"SWXj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllSensorsData = exports.getRawData = void 0;
var rawData = null;

var getRawData = function getRawData() {
  if (rawData) {
    return Promise.resolve(rawData);
  }

  return fetch('/data').then(function (res) {
    return res.json();
  }).then(function (data) {
    rawData = data;
    return data;
  });
};

exports.getRawData = getRawData;

var getAllSensorsData = function getAllSensorsData() {
  return getRawData().then(function (_ref) {
    var sensor_data = _ref.sensor_data;
    return Object.getOwnPropertyNames(sensor_data).map(function (name) {
      return /^sensor(\d+)$/g.exec(name);
    }).filter(function (match) {
      return match !== null;
    }).reduce(function (acc, match) {
      var name = match[0];
      var pos = match[1];
      acc[pos] = sensor_data[name];
      return acc;
    }, []);
  });
};

exports.getAllSensorsData = getAllSensorsData;
},{}],"YLGK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcSensorBox = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var calcSensorBox = function calcSensorBox(data, sensorName) {
  var sensorData = data[sensorName];

  var _sensorData$reduce = sensorData.reduce(function (acc, val, index) {
    var classLabel = data.class_label[index];

    if (classLabel === 1) {
      acc.classPos.push(val);
    } else if (classLabel === -1) {
      acc.classNeg.push(val);
    } else {
      console.warn("Unexpected class lable ".concat(classLabel));
    }

    return acc;
  }, {
    classPos: [],
    classNeg: []
  }),
      classPos = _sensorData$reduce.classPos,
      classNeg = _sensorData$reduce.classNeg;

  return [calcBox(classPos), calcBox(classNeg)];
};

exports.calcSensorBox = calcSensorBox;

var calcBox = function calcBox(values) {
  values.sort();

  var _calcMedian = calcMedian(values, 0, values.length - 1),
      _calcMedian2 = _slicedToArray(_calcMedian, 3),
      median = _calcMedian2[0],
      medianIndexLeft = _calcMedian2[1],
      medianIndexRight = _calcMedian2[2];

  var leftQuart = calcMedian(values, 0, medianIndexLeft - 1)[0];
  var rightQuart = calcMedian(values, medianIndexRight + 1, values.length - 1)[0];
  return [values[0], leftQuart, median, rightQuart, values[values.length - 1]];
};

var calcMedian = function calcMedian(values, minIndex, maxIndex) {
  var center = minIndex + (maxIndex - minIndex) / 2;
  var leftIndex = Math.floor(center);
  var rightIndex = Math.ceil(center);
  var median = (values[leftIndex] + values[rightIndex]) / 2;
  return [median, leftIndex, rightIndex];
};
},{}],"DJma":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboard = void 0;

var _dataService = require("./dataService");

var _dataEngine = require("./dataEngine");

var dashboard = function (Highcharts) {
  return function () {
    var getChart = function getChart(name, type) {
      return {
        chart: {
          type: type
        },
        title: {
          text: name
        },
        xAxis: {},
        yAxis: {
          title: {
            text: 'values'
          }
        },
        series: [{
          name: name
        }]
      };
    }; // getAllSensorsData()
    //     .then(data => {
    //         console.log(data);
    //     });


    (0, _dataService.getRawData)().then(function (_ref) {
      var sensor_data = _ref.sensor_data;
      var sensor0 = sensor_data.sensor0;
      var sensor1 = sensor_data.sensor1;
      var sensor2 = sensor_data.sensor2;
      var sensorDataChart = getChart('Sensor 0 data', 'line');
      sensorDataChart.series[0].data = sensor0;
      var sensorBoxChart = {
        chart: {
          type: 'boxplot'
        },
        title: {
          text: name
        },
        xAxis: {
          categories: ['class 1', 'class -1']
        },
        yAxis: {
          title: {
            text: 'values'
          }
        },
        series: [{
          name: 'boxes'
        }]
      }; // const class_plus1 = [];
      // const class_minus1 = [];
      // sensor0.forEach((value, index) => {
      //     if (sensor_data.class_label[index] === 1) {
      //         class_plus1.push(value);
      //     } else if(sensor_data.class_label[index] === -1) {
      //         class_minus1.push(value);
      //     }
      // });
      // const data = [
      //     calcBox(class_plus1),
      //     calcBox(class_minus1)
      // ];

      var data = (0, _dataEngine.calcSensorBox)(sensor_data, 'sensor0');
      sensorBoxChart.series[0].data = data;
      var step = 0.1;
      var sensorDistChart = getChart('Sensor 0 dist', 'column');
      var sensor0Dist = sensor0.reduce(function (acc, value) {
        var bucket = Math.floor(value / step);
        acc[bucket]++;
        return acc;
      }, new Array(1 / step).fill(0));
      var sensor1Dist = sensor1.reduce(function (acc, value) {
        var bucket = Math.floor(value / step);
        acc[bucket]++;
        return acc;
      }, new Array(1 / step).fill(0));
      var sensor2Dist = sensor2.reduce(function (acc, value) {
        var bucket = Math.floor(value / step);
        acc[bucket]++;
        return acc;
      }, new Array(1 / step).fill(0));
      sensorDistChart.series = [{
        name: 'sensor0',
        data: sensor0Dist
      }, {
        name: 'sensor1',
        data: sensor1Dist
      }, {
        name: 'sensor2',
        data: sensor2Dist
      }];
      Highcharts.chart('sensor_data', sensorDataChart);
      Highcharts.chart('sensor_dist', sensorBoxChart);
      Highcharts.chart('sensor_dist2', sensorDistChart);
    });
  };
}(Highcharts);

exports.dashboard = dashboard;
},{"./dataService":"SWXj","./dataEngine":"YLGK"}],"QvaY":[function(require,module,exports) {
"use strict";

var _sidebar = _interopRequireDefault(require("./sidebar"));

var _dashboard = require("./dashboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.sidebar = _sidebar.default;
window.dashboard = _dashboard.dashboard;
},{"./sidebar":"Hn3T","./dashboard":"DJma"}],"C4Nx":[function(require,module,exports) {
"use strict";

require("./scss/index.scss");

require("./js/index");
},{"./scss/index.scss":"YvtQ","./js/index":"QvaY"}]},{},["C4Nx"], null)