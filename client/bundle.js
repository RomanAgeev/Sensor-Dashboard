import './scss/index.scss';

import $ from 'jquery';

window.$ = window.jQuery = $;

import 'bootstrap';
import 'popper.js';

import Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);

window.Highcharts = Highcharts;

import './js/index';