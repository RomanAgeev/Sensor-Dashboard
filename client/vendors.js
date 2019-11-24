import $ from 'jquery';
window.$ = window.jQuery = $;

import 'bootstrap';
import 'popper.js';
import 'babel-polyfill';

import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);
window.Highcharts = Highcharts;