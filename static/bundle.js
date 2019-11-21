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
exports.sidebar = void 0;

var sidebar = function ($) {
  return function (placeholderName, itemSelected) {
    var placeholderId = "#".concat(placeholderName);

    var selectItem = function selectItem(itemId) {
      if (!itemId) {
        return;
      }

      $("".concat(placeholderId, " .item")).each(function () {
        if ($(this).data('item') === itemId) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
      itemSelected(itemId);
    };

    $("".concat(placeholderId, " .item")).each(function () {
      $(this).on('click', function (e) {
        selectItem($(e.target).data('item'));
      });
    });
    $("".concat(placeholderId, " .collapse-button")).on('click', function () {
      $(placeholderId).removeClass('visible');
    });
    $("".concat(placeholderId, "-small .expand-button")).on('click', function () {
      $(placeholderId).addClass('visible');
    });
    $(window).resize(function () {
      if (window.innerWidth <= 768) {
        $(placeholderId).removeClass('visible');
      }
    });
    return {
      selectItem: selectItem
    };
  };
}(jQuery);

exports.sidebar = sidebar;
},{}],"SvNl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = void 0;

var fetchData = function fetchData() {
  var res, data;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('/data'));

        case 2:
          res = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.fetchData = fetchData;
},{}],"D21K":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChartColor = void 0;

var getChartColor = function getChartColor(index) {
  return chartColors[index % chartColors.length];
};

exports.getChartColor = getChartColor;
var chartColors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
},{}],"iLUa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sensorDataChart = void 0;

var _chartUtils = require("./chartUtils");

var sensorDataChart = function sensorDataChart(sensor, index, data, min, max, className) {
  return {
    chart: {
      type: 'line'
    },
    title: {
      text: "".concat(sensor, " (").concat(className, ")")
    },
    xAxis: {},
    yAxis: {
      min: min,
      max: max,
      title: {
        text: null
      }
    },
    series: [{
      data: data,
      name: sensor,
      showInLegend: false,
      color: (0, _chartUtils.getChartColor)(index)
    }]
  };
};

exports.sensorDataChart = sensorDataChart;
},{"./chartUtils":"D21K"}],"YLGK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcDerivatives = exports.calcMedian = exports.getSensorNames = void 0;

var getSensorNames = function getSensorNames(data) {
  return Object.getOwnPropertyNames(data).map(function (name) {
    return /^sensor(\d+)$/g.exec(name);
  }).filter(function (match) {
    return match !== null;
  }).map(function (match) {
    return match[0];
  });
};

exports.getSensorNames = getSensorNames;

var calcMedian = function calcMedian(values, minIndex, maxIndex) {
  var center = minIndex + (maxIndex - minIndex) / 2;
  var leftIndex = Math.floor(center);
  var rightIndex = Math.ceil(center);
  var median = (values[leftIndex] + values[rightIndex]) / 2;
  return [median, leftIndex, rightIndex];
};

exports.calcMedian = calcMedian;

var calcDerivatives = function calcDerivatives(data) {
  return getSensorNames(data).reduce(function (acc, sensor) {
    return acc.set(sensor, calcSensorDerivatives(data, sensor));
  }, new Map());
};

exports.calcDerivatives = calcDerivatives;

var calcSensorDerivatives = function calcSensorDerivatives(data, sensor) {
  var sensorData = data[sensor];
  var derivatives = sensorData.reduce(function (acc, val, index) {
    var classLabel = data.class_label[index];

    if (classLabel === 1) {
      acc.classPos.push(val);
    } else if (classLabel === -1) {
      acc.classNeg.push(val);
    } else {
      console.warn("Unexpected class label ".concat(classLabel));
    }

    acc.min = Math.min(acc.min, val);
    acc.max = Math.max(acc.max, val);
    acc.mean += val;
    return acc;
  }, {
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
    mean: 0,
    classPos: [],
    classNeg: []
  });

  if (!Number.isFinite(derivatives.min)) {
    derivatives.min = 0;
  }

  if (!Number.isFinite(derivatives.max)) {
    derivatives.max = 1;
  }

  derivatives.mean /= sensorData.length;
  return derivatives;
};
},{}],"vJCU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sensorBoxChart = void 0;

var _chartUtils = require("./chartUtils");

var _dataEngine = require("../dataEngine");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var sensorBoxChart = function sensorBoxChart(sensor, index, sensorData, min, max) {
  return {
    chart: {
      type: 'boxplot'
    },
    title: {
      text: "".concat(sensor, " (by class)")
    },
    xAxis: {
      categories: ['Class +1', 'Class -1']
    },
    yAxis: {
      min: min,
      max: max,
      title: {
        text: null
      }
    },
    series: [{
      data: [calcBox(sensorData.classPos), calcBox(sensorData.classNeg)],
      name: sensor,
      showInLegend: false,
      color: (0, _chartUtils.getChartColor)(index)
    }]
  };
};

exports.sensorBoxChart = sensorBoxChart;

var calcBox = function calcBox(values) {
  var sortedValues = _toConsumableArray(values).sort();

  var _calcMedian = (0, _dataEngine.calcMedian)(sortedValues, 0, sortedValues.length - 1),
      _calcMedian2 = _slicedToArray(_calcMedian, 3),
      median = _calcMedian2[0],
      medianIndexLeft = _calcMedian2[1],
      medianIndexRight = _calcMedian2[2];

  var leftQuart = (0, _dataEngine.calcMedian)(sortedValues, 0, medianIndexLeft - 1)[0];
  var rightQuart = (0, _dataEngine.calcMedian)(sortedValues, medianIndexRight + 1, sortedValues.length - 1)[0];
  return [sortedValues[0], leftQuart, median, rightQuart, sortedValues[values.length - 1]];
};
},{"./chartUtils":"D21K","../dataEngine":"YLGK"}],"C0ac":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sensorDataChart = require("./sensorDataChart");

Object.keys(_sensorDataChart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sensorDataChart[key];
    }
  });
});

var _sensorBoxChart = require("./sensorBoxChart");

Object.keys(_sensorBoxChart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sensorBoxChart[key];
    }
  });
});
},{"./sensorDataChart":"iLUa","./sensorBoxChart":"vJCU"}],"HdBL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distributionDashboard = void 0;

var _charts = require("../charts");

var _dataEngine = require("../dataEngine");

var boxWidthPercentage = 24;
var classWithPercentage = (100 - boxWidthPercentage) / 2;
var height = 400;

var distributionDashboard = function (Highcharts, $) {
  return function (data, derivatives, dashboardName) {
    var dashboardId = "#".concat(dashboardName);

    var sensorPlace = function sensorPlace() {
      return $('<div/>').css({
        width: '100%',
        height: "".concat(height, "px")
      });
    };

    var sensorDataPlace = function sensorDataPlace(id) {
      return $('<div/>').attr('id', id).css({
        'display': 'inline-block',
        'width': "".concat(classWithPercentage, "%"),
        'height': '100%'
      });
    };

    var sensorBoxPlace = function sensorBoxPlace(id) {
      return $('<div/>').attr('id', id).css({
        'display': 'inline-block',
        'width': "".concat(boxWidthPercentage, "%"),
        'height': '100%'
      });
    };

    (0, _dataEngine.getSensorNames)(data).forEach(function (sensor, index) {
      var $sensorPlace = sensorPlace().appendTo(dashboardId);
      var classPosId = "".concat(sensor, "-pos");
      var classNegId = "".concat(sensor, "-neg");
      var boxId = "".concat(sensor, "-box");
      sensorDataPlace(classPosId).appendTo($sensorPlace);
      sensorDataPlace(classNegId).appendTo($sensorPlace);
      sensorBoxPlace(boxId).appendTo($sensorPlace);
      var sensorData = derivatives.get(sensor);
      var min = Math.floor(sensorData.min);
      var max = Math.ceil(sensorData.max);
      var chartClassPos = (0, _charts.sensorDataChart)(sensor, index, sensorData.classPos, min, max, 'class +1');
      var chartClassNeg = (0, _charts.sensorDataChart)(sensor, index, sensorData.classNeg, min, max, 'class -1');
      var chartBox = (0, _charts.sensorBoxChart)(sensor, index, sensorData, min, max);
      Highcharts.chart(classPosId, chartClassPos);
      Highcharts.chart(classNegId, chartClassNeg);
      Highcharts.chart(boxId, chartBox);
    });
  };
}(Highcharts, jQuery);

exports.distributionDashboard = distributionDashboard;
},{"../charts":"C0ac","../dataEngine":"YLGK"}],"LZKf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.correlationDashboard = void 0;

var _dataEngine = require("../dataEngine");

var correlationDashboard = function (Highcharts, $) {
  return function (data, derivatives, dashboardName) {
    var dashboardId = "#".concat(dashboardName);
    $('<div/>').attr('id', 'dist-chart').css({
      width: '500px',
      height: '500px'
    }).appendTo(dashboardId);
    var sensors = (0, _dataEngine.getSensorNames)(data);
    var sensor0 = derivatives.get(sensors[0]).classPos;
    var sensor1 = derivatives.get(sensors[1]).classPos;
    var seriesData = [];

    for (var i = 0; i < sensor0.length; i++) {
      seriesData.push([sensor0[i], sensor1[i]]);
    }

    var chart = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      series: [{
        name: 'TODO',
        data: seriesData
      }]
    };
    Highcharts.chart('dist-chart', chart);
  };
}(Highcharts, jQuery);

exports.correlationDashboard = correlationDashboard;
},{"../dataEngine":"YLGK"}],"uXW5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardFactory = void 0;

var _distributionDashboard = require("./distributionDashboard");

var _correlationDashboard = require("./correlationDashboard");

var dashboardFactory = {
  distributionDashboard: _distributionDashboard.distributionDashboard,
  correlationDashboard: _correlationDashboard.correlationDashboard
};
exports.dashboardFactory = dashboardFactory;
},{"./distributionDashboard":"HdBL","./correlationDashboard":"LZKf"}],"dXr0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sidebar = require("./sidebar");

var _channel = require("./channel");

var _dashboards = require("./dashboards");

var _dataEngine = require("./dataEngine");

var layout = function ($) {
  return function _callee(sidebarName, contentName) {
    var contentId, dashboardMap, data, derivatives, initDashboard, onItemSelected, bar;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contentId = "#".concat(contentName);
            dashboardMap = new Map();
            data = null;
            derivatives = null;

            initDashboard = function initDashboard(dashboardId) {
              if (dashboardMap.has(dashboardId)) {
                return;
              }

              var factory = _dashboards.dashboardFactory[dashboardId];

              if (factory) {
                dashboardMap.set(dashboardId, factory(data, derivatives, dashboardId));
              }
            };

            onItemSelected = function onItemSelected(itemId) {
              $("".concat(contentId, " .item")).each(function () {
                if ($(this).attr('id') === itemId) {
                  $(this).addClass('active');
                } else {
                  $(this).removeClass('active');
                }

                initDashboard(itemId);
              });
            };

            bar = (0, _sidebar.sidebar)(sidebarName, onItemSelected);
            _context.next = 9;
            return regeneratorRuntime.awrap((0, _channel.fetchData)());

          case 9:
            data = _context.sent.sensor_data;
            _context.next = 12;
            return regeneratorRuntime.awrap(new Promise(function (res, _rej) {
              return res((0, _dataEngine.calcDerivatives)(data));
            }));

          case 12:
            derivatives = _context.sent;
            return _context.abrupt("return", {
              selectDashboard: bar.selectItem
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}(jQuery);

var _default = layout;
exports.default = _default;
},{"./sidebar":"Hn3T","./channel":"SvNl","./dashboards":"uXW5","./dataEngine":"YLGK"}],"QvaY":[function(require,module,exports) {
"use strict";

var _layout = _interopRequireDefault(require("./layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.layout = _layout.default;
},{"./layout":"dXr0"}],"C4Nx":[function(require,module,exports) {
"use strict";

require("./scss/index.scss");

require("./js/index");
},{"./scss/index.scss":"YvtQ","./js/index":"QvaY"}]},{},["C4Nx"], null)