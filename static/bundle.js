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
  return function (placeholderId, itemSelected) {
    var selectItem = function selectItem(itemId) {
      if (!itemId) {
        return;
      }

      $("#".concat(placeholderId, " .item")).each(function () {
        if ($(this).data('item') === itemId) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
      itemSelected(itemId);
    };

    $("#".concat(placeholderId, " .item")).each(function () {
      $(this).on('click', function (e) {
        selectItem($(e.target).data('item'));
      });
    });
    $("#".concat(placeholderId, " .collapse-button")).on('click', function () {
      $("#".concat(placeholderId)).removeClass('visible');
    });
    $("#".concat(placeholderId, "-small .expand-button")).on('click', function () {
      $("#".concat(placeholderId)).addClass('visible');
    });
    $(window).resize(function () {
      if (window.innerWidth <= 768) {
        $("#".concat(placeholderId)).removeClass('visible');
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
},{}],"MgTz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defer = exports.errorBox = exports.loadingBox = exports.getColor = exports.reflow = exports.readableName = void 0;

var readableName = function readableName(sensor) {
  var match = /^(\w+)(\d+)$/g.exec(sensor);
  return "".concat(match[1], " ").concat(match[2]);
};

exports.readableName = readableName;

var reflow = function reflow(charts) {
  return charts.forEach(function (chart) {
    return chart.reflow();
  });
};

exports.reflow = reflow;

var getColor = function getColor(index) {
  return colors[index % colors.length];
};

exports.getColor = getColor;
var colors = ['#7cb5ec', '#a3a3a8', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];

var loadingBox = function ($) {
  return function (id, width, height) {
    return $('<div/>').attr('id', id).css({
      display: 'inline-block',
      width: width,
      height: height,
      'text-align': 'center',
      'vertical-align': 'middle',
      'line-height': height,
      color: '#808080'
    }).text('Loading...');
  };
}(jQuery);

exports.loadingBox = loadingBox;

var errorBox = function errorBox($box) {
  return $box.css({
    color: '#8B0000'
  }).text("Error");
};

exports.errorBox = errorBox;

var defer = function defer(action) {
  return new Promise(function (res, rej) {
    setTimeout(function () {
      var result;

      try {
        result = action();
      } catch (e) {
        rej(e);
        return;
      }

      res(result);
    }, 0);
  });
};

exports.defer = defer;
},{}],"YLGK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcSummary = exports.sliceClassData = exports.calcMedian = exports.getSensorNames = void 0;

var _utils = require("./utils");

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

var sliceClassData = function sliceClassData(sensorData, classSummary) {
  return sensorData.slice(classSummary.startIndex, classSummary.startIndex + classSummary.count);
};

exports.sliceClassData = sliceClassData;

var calcSummary = function calcSummary(data) {
  return getSensorNames(data).reduce(function (acc, sensor, index) {
    return acc.set(sensor, calcSensorSummary(data, sensor, index));
  }, new Map());
};

exports.calcSummary = calcSummary;

var calcSensorSummary = function calcSensorSummary(data, sensor, sensorIndex) {
  var sensorData = data[sensor];
  var summary = sensorData.reduce(function (acc, val, index) {
    var classLabel = data.class_label[index].toString();
    var classData = acc.classes.get(classLabel);

    if (!classData) {
      classData = {
        startIndex: index,
        count: 0,
        min: minInit,
        max: maxInit,
        sum: 0,
        sumSquares: 0
      };
      acc.classes.set(classLabel, classData);
    }

    classData.count++;
    classData.min = Math.min(classData.min, val);
    classData.max = Math.max(classData.max, val);
    classData.sum += val;
    classData.sumSquares += val * val;
    acc.min = Math.min(acc.min, val);
    acc.max = Math.max(acc.max, val);
    return acc;
  }, {
    min: minInit,
    max: maxInit,
    classes: new Map()
  });
  summary.min = normMin(summary.min);
  summary.max = normMax(summary.max);
  summary.color = (0, _utils.getColor)(sensorIndex);
  summary.classes.forEach(function (classData, _classLabel) {
    classData.min = normMin(classData.min);
    classData.max = normMax(classData.max);
    classData.mean = classData.sum / classData.count;
    classData.deviation = Math.sqrt((classData.sumSquares - classData.sum * classData.sum / classData.count) / (classData.count - 1));
  });
  return summary;
};

var minInit = Number.POSITIVE_INFINITY;
var maxInit = Number.NEGATIVE_INFINITY;

var normMin = function normMin(min) {
  return Number.isFinite(min) ? min : 0;
};

var normMax = function normMax(max) {
  return Number.isFinite(max) ? max : 1;
};
},{"./utils":"MgTz"}],"iLUa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sensorDataChart = void 0;

var _utils = require("../utils");

var _dataEngine = require("../dataEngine");

var sensorDataChart = function sensorDataChart(sensor, data, summary, classLabel) {
  var sensorData = data[sensor];

  if (!sensorData) {
    throw new Error("Data doens't exist for the '".concat(sensor, "' sensor"));
  }

  var sensorSummary = summary.get(sensor);

  if (!sensorSummary) {
    throw new Error("Summary doesn't exist for the '".concat(sensor, "' sensor"));
  }

  var classSummary = sensorSummary.classes.get(classLabel);

  if (!classSummary) {
    throw new Error("The '".concat(classLabel, "' class doesn't exist in the '").concat(sensor, "' sensor data"));
  }

  var seriesData = (0, _dataEngine.sliceClassData)(sensorData, classSummary);
  var sensorName = (0, _utils.readableName)(sensor);
  var title = "".concat(sensorName, " (class ").concat(classLabel, ")");
  var min = Math.floor(sensorSummary.min);
  var max = Math.ceil(sensorSummary.max);
  var mean = classSummary.mean;
  return {
    chart: {
      type: 'line'
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    title: {
      text: title
    },
    xAxis: {},
    yAxis: {
      min: min,
      max: max,
      title: {
        text: null
      },
      plotLines: [{
        value: mean,
        color: 'black',
        dashStyle: 'shortdash',
        width: 2,
        zIndex: 4,
        label: {
          text: "mean (".concat(mean.toFixed(2), ")"),
          style: {
            fontWeight: 'bold'
          }
        }
      }]
    },
    series: [{
      data: seriesData,
      name: sensorName,
      showInLegend: false,
      color: sensorSummary.color,
      zIndex: 1
    }]
  };
};

exports.sensorDataChart = sensorDataChart;
},{"../utils":"MgTz","../dataEngine":"YLGK"}],"vJCU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sensorBoxChart = void 0;

var _dataEngine = require("../dataEngine");

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sensorBoxChart = function sensorBoxChart(sensor, data, summary, classLabels) {
  var sensorData = data[sensor];

  if (!sensorData) {
    throw new Error("Data doens't exist for the '".concat(sensor, "' sensor"));
  }

  var sensorSummary = summary.get(sensor);

  if (!sensorSummary) {
    throw new Error("Summary doesn't exist for the '".concat(sensor, "' sensor"));
  }

  var classSummaries = classLabels.map(function (classLabel) {
    return sensorSummary.classes.get(classLabel);
  }).filter(function (classSummary) {
    return !!classSummary;
  });

  if (classSummaries.length < classLabels.length) {
    throw new Error("".concat(classLabels.length - classSummaries.length, " of ").concat(classLabels.length, " classes are not present in data"));
  }

  var seriesData = classSummaries.map(function (classSummary) {
    return (0, _dataEngine.sliceClassData)(sensorData, classSummary);
  }).map(function (classData) {
    return classData.sort();
  }).map(function (values) {
    var _calcMedian = (0, _dataEngine.calcMedian)(values, 0, values.length - 1),
        _calcMedian2 = _slicedToArray(_calcMedian, 3),
        median = _calcMedian2[0],
        medianIndexLeft = _calcMedian2[1],
        medianIndexRight = _calcMedian2[2];

    var leftQuart = (0, _dataEngine.calcMedian)(values, 0, medianIndexLeft - 1)[0];
    var rightQuart = (0, _dataEngine.calcMedian)(values, medianIndexRight + 1, values.length - 1)[0];
    return [values[0], leftQuart, median, rightQuart, values[values.length - 1]];
  });
  var categories = classLabels.map(function (classLabel) {
    return "Class ".concat(classLabel);
  });
  var min = Math.floor(sensorSummary.min);
  var max = Math.ceil(sensorSummary.max);
  var sensorName = (0, _utils.readableName)(sensor);
  return {
    chart: {
      type: 'boxplot'
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    title: {
      text: "".concat(sensorName, " (by class)")
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      min: min,
      max: max,
      title: {
        text: null
      }
    },
    series: [{
      data: seriesData,
      name: sensorName,
      showInLegend: false,
      color: sensorSummary.color
    }]
  };
};

exports.sensorBoxChart = sensorBoxChart;
},{"../dataEngine":"YLGK","../utils":"MgTz"}],"yU59":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sensorCorrChart = void 0;

var _utils = require("../utils");

var sensorCorrChart = function sensorCorrChart(sensorX, sensorY, data, summary, classLabelX, classLabelY) {
  var sensorDataX = data[sensorX];

  if (!sensorDataX) {
    throw new Error("Data doens't exist for the '".concat(sensorX, "' sensor"));
  }

  var sensorDataY = data[sensorY];

  if (!sensorDataY) {
    throw new Error("Data doens't exist for the '".concat(sensorY, "' sensor"));
  }

  var summaryX = summary.get(sensorX);

  if (!summaryX) {
    throw new Error("Summary doesn't exist for the '".concat(sensorX, "' sensor"));
  }

  var summaryY = summary.get(sensorY);

  if (!summaryY) {
    throw new Error("Summary doesn't exist for the '".concat(sensorY, "' sensor"));
  }

  var classSummaryX = summaryX.classes.get(classLabelX);

  if (!classSummaryX) {
    throw new Error("The '".concat(classLabelX, "' class doesn't exist in the '").concat(sensorX, "' sensor data"));
  }

  var classSummaryY = summaryY.classes.get(classLabelY);

  if (!classSummaryY) {
    throw new Error("The '".concat(classLabelY, "' class doesn't exist in the '").concat(sensorY, "' sensor data"));
  }

  if (classSummaryX.count !== classSummaryY.count) {
    throw new Error("The class data differ between ".concat(sensorX, "/").concat(classLabelX, " and ").concat(sensorY, "/").concat(classLabelY));
  }

  var n = classSummaryX.count;
  var seriesData = [];
  var covariance = 0;

  for (var i = 0; i < n; i++) {
    var valX = sensorDataX[classSummaryX.startIndex + i];
    var valY = sensorDataY[classSummaryY.startIndex + i];
    covariance += (valX - classSummaryX.mean) * (valY - classSummaryY.mean);
    seriesData.push([valX, valY]);
  }

  covariance /= n - 1;
  var correlation = covariance / (classSummaryX.deviation * classSummaryY.deviation);
  var rSquared = (correlation * correlation * 100).toFixed(2);
  var a = correlation * classSummaryY.deviation / classSummaryX.deviation;
  var b = classSummaryY.mean - a * classSummaryX.mean;
  var minX = Math.floor(classSummaryX.min);
  var maxX = Math.ceil(classSummaryX.max);
  var minY = Math.floor(classSummaryY.min);
  var maxY = Math.ceil(classSummaryY.max);
  var p1 = [minX, a * minX + b];
  var p2 = [maxX, a * maxX + b];
  var nameX = (0, _utils.readableName)(sensorX);
  var nameY = (0, _utils.readableName)(sensorY);
  var classNameX = "class ".concat(classLabelX);
  var classNameY = "class ".concat(classLabelY);
  var title = sensorX === sensorY ? "".concat(nameX, " - ").concat(classNameX, " / ").concat(classNameY) : "".concat(classNameX, " - ").concat(nameX, " / ").concat(nameY);
  var titleX = sensorX === sensorY ? classNameX : nameX;
  var titleY = sensorX === sensorY ? classNameY : nameY;
  return {
    chart: {
      type: 'scatter'
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    title: {
      text: title
    },
    legend: {
      symbolPadding: 0,
      symbolWidth: 0,
      symbolRadius: 0
    },
    xAxis: {
      min: minX,
      max: maxX,
      title: {
        text: titleX
      },
      gridLineWidth: 1
    },
    yAxis: {
      min: minY,
      max: maxY,
      title: {
        text: titleY
      }
    },
    series: [{
      name: 'values',
      showInLegend: false,
      data: seriesData,
      color: summaryY.color
    }, {
      type: 'line',
      name: "R\xB2 = ".concat(rSquared, "%"),
      data: [p1, p2],
      color: 'black',
      dashStyle: 'shortdash',
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
      enableMouseTracking: false
    }]
  };
};

exports.sensorCorrChart = sensorCorrChart;
},{"../utils":"MgTz"}],"C0ac":[function(require,module,exports) {
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

var _sensorCorrChart = require("./sensorCorrChart");

Object.keys(_sensorCorrChart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sensorCorrChart[key];
    }
  });
});
},{"./sensorDataChart":"iLUa","./sensorBoxChart":"vJCU","./sensorCorrChart":"yU59"}],"OtiO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sensorDistDashboard = void 0;

var _charts = require("../charts");

var _dataEngine = require("../dataEngine");

var _utils = require("../utils");

var boxWidthPercentage = 24;
var classWithPercentage = (100 - boxWidthPercentage) / 2;
var height = 400;

var sensorDistDashboard = function (Highcharts, $) {
  return function (data, summary, dashboardId) {
    var sensorPlace = function sensorPlace() {
      return $('<div/>').css({
        width: '100%',
        height: "".concat(height, "px")
      });
    };

    var sensorDataPlace = function sensorDataPlace(id) {
      return (0, _utils.loadingBox)(id, "".concat(classWithPercentage, "%"), "".concat(height, "px"));
    };

    var sensorBoxPlace = function sensorBoxPlace(id) {
      return (0, _utils.loadingBox)(id, "".concat(boxWidthPercentage, "%"), "".concat(height, "px"));
    };

    var classLabels = ['1', '-1'];
    var charts = [];
    (0, _dataEngine.getSensorNames)(data).forEach(function (sensor) {
      var $sensorPlace = sensorPlace().appendTo("#".concat(dashboardId));
      classLabels.forEach(function (classLabel) {
        var classId = "".concat(sensor, "-data-").concat(classLabel);
        var $dataPlace = sensorDataPlace(classId).appendTo($sensorPlace);
        (0, _utils.defer)(function () {
          var chartData = (0, _charts.sensorDataChart)(sensor, data, summary, classLabel);
          return Highcharts.chart(classId, chartData);
        }).then(function (chart) {
          return charts.push(chart);
        }).catch(function (e) {
          console.error(e);
          (0, _utils.errorBox)($dataPlace);
        });
      });
      var boxId = "".concat(sensor, "-box");
      var $boxPlace = sensorBoxPlace(boxId).appendTo($sensorPlace);
      (0, _utils.defer)(function () {
        var chartBox = (0, _charts.sensorBoxChart)(sensor, data, summary, classLabels);
        return Highcharts.chart(boxId, chartBox);
      }).then(function (chart) {
        return charts.push(chart);
      }).catch(function (e) {
        console.error(e);
        (0, _utils.errorBox)($boxPlace);
      });
    });
    return {
      activate: function activate() {
        return (0, _utils.reflow)(charts);
      }
    };
  };
}(Highcharts, jQuery);

exports.sensorDistDashboard = sensorDistDashboard;
},{"../charts":"C0ac","../dataEngine":"YLGK","../utils":"MgTz"}],"dR46":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sensorCorrDashboard = void 0;

var _dataEngine = require("../dataEngine");

var _charts = require("../charts");

var _utils = require("../utils");

var height = 450;
var widthPercent = 33;

var sensorCorrDashboard = function (Highcharts, $) {
  return function (data, summary, dashboardId) {
    var sensors = (0, _dataEngine.getSensorNames)(data);
    var sensorX = sensors[0];
    var classLabel = '1';
    var $chartsContainer = $("#".concat(dashboardId, " #corrCharts"));

    var buildCharts = function buildCharts() {
      $chartsContainer.empty();
      var charts = [];
      sensors.forEach(function (sensorY) {
        if (sensorY === sensorX) {
          return;
        }

        var chartId = "".concat(sensorX, "-").concat(sensorY);
        var $chartPlace = (0, _utils.loadingBox)(chartId, "".concat(widthPercent, "%"), "".concat(height, "px")).appendTo($chartsContainer);
        (0, _utils.defer)(function () {
          var chart = (0, _charts.sensorCorrChart)(sensorX, sensorY, data, summary, classLabel, classLabel);
          return Highcharts.chart(chartId, chart);
        }).then(function (chart) {
          return charts.push(chart);
        }).catch(function (e) {
          console.error(e);
          (0, _utils.errorBox)($chartPlace);
        });
      });
      return charts;
    };

    var charts = [];
    $("#".concat(dashboardId, " #sensorSelect")).append(sensors.map(function (sensor) {
      return $('<option/>').text(sensor);
    })).val(sensorX).on('change', function () {
      sensorX = this.value;
      charts = buildCharts();
    });
    $("#".concat(dashboardId, " input[type=radio][name=classSelect][value=").concat(classLabel, "]")).prop('checked', true);
    $("#".concat(dashboardId, " input[type=radio][name=classSelect]")).change(function () {
      classLabel = this.value;
      charts = buildCharts();
    });
    charts = buildCharts();
    return {
      activate: function activate() {
        return (0, _utils.reflow)(charts);
      }
    };
  };
}(Highcharts, jQuery);

exports.sensorCorrDashboard = sensorCorrDashboard;
},{"../dataEngine":"YLGK","../charts":"C0ac","../utils":"MgTz"}],"SdJj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classCorrDashboard = void 0;

var _dataEngine = require("../dataEngine");

var _charts = require("../charts");

var _utils = require("../utils");

var height = 450;
var widthPercent = 33;

var classCorrDashboard = function (Highcharts, $) {
  return function (data, summary, dashboardId) {
    var sensors = (0, _dataEngine.getSensorNames)(data);
    var charts = [];
    sensors.forEach(function (sensor) {
      var chartId = "".concat(sensor, "-class-to-class");
      var $chartPlace = (0, _utils.loadingBox)(chartId, "".concat(widthPercent, "%"), "".concat(height, "px")).appendTo("#".concat(dashboardId));
      (0, _utils.defer)(function () {
        var chart = (0, _charts.sensorCorrChart)(sensor, sensor, data, summary, '1', '-1');
        return Highcharts.chart(chartId, chart);
      }).then(function (chart) {
        return charts.push(chart);
      }).catch(function (e) {
        console.error(e);
        (0, _utils.errorBox)($chartPlace);
      });
    });
    return {
      activate: function activate() {
        return (0, _utils.reflow)(charts);
      }
    };
  };
}(Highcharts, jQuery);

exports.classCorrDashboard = classCorrDashboard;
},{"../dataEngine":"YLGK","../charts":"C0ac","../utils":"MgTz"}],"bbkP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardFactory = void 0;

var _sensorDistDashboard = require("./sensorDistDashboard");

var _sensorCorrDashboard = require("./sensorCorrDashboard");

var _classCorrDashboard = require("./classCorrDashboard");

var dashboardFactory = {
  sensorDistDashboard: _sensorDistDashboard.sensorDistDashboard,
  sensorCorrDashboard: _sensorCorrDashboard.sensorCorrDashboard,
  classCorrDashboard: _classCorrDashboard.classCorrDashboard
};
exports.dashboardFactory = dashboardFactory;
},{"./sensorDistDashboard":"OtiO","./sensorCorrDashboard":"dR46","./classCorrDashboard":"SdJj"}],"uXW5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dashboardFactory = require("./dashboardFactory");

Object.keys(_dashboardFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dashboardFactory[key];
    }
  });
});
},{"./dashboardFactory":"bbkP"}],"dXr0":[function(require,module,exports) {
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
  return function _callee(sidebarName, contentId) {
    var dashboardMap, data, summary, initDashboard, onItemSelected, bar;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dashboardMap = new Map();
            data = null;
            summary = null;

            initDashboard = function initDashboard(dashboardId) {
              var dashboard = dashboardMap.get(dashboardId);

              if (dashboard) {
                dashboard.activate();
                return;
              }

              var factory = _dashboards.dashboardFactory[dashboardId];

              if (factory) {
                dashboardMap.set(dashboardId, factory(data, summary, dashboardId));
              }
            };

            onItemSelected = function onItemSelected(itemId) {
              $("#".concat(contentId, " .item")).each(function () {
                if ($(this).attr('id') === itemId) {
                  $(this).addClass('active');
                } else {
                  $(this).removeClass('active');
                }

                initDashboard(itemId);
              });
            };

            bar = (0, _sidebar.sidebar)(sidebarName, onItemSelected);
            _context.next = 8;
            return regeneratorRuntime.awrap((0, _channel.fetchData)());

          case 8:
            data = _context.sent.sensor_data;
            summary = (0, _dataEngine.calcSummary)(data);
            return _context.abrupt("return", {
              selectDashboard: bar.selectItem
            });

          case 11:
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