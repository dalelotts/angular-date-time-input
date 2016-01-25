/*globals define, module, require */
/*jslint vars:true */

/**
 * @license angular-date-time-input  version: 0.1.0
 * (c) 2013-2015 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 *    @author Dale "Ducky" Lotts
 *    @since  2013-Sep-23
 */

(function (factory) {
	'use strict';
	/* istanbul ignore if */
	if (typeof define === 'function' && /* istanbul ignore next */ define.amd) {
		define(['angular', 'moment'], factory); // AMD
		/* istanbul ignore next */
	} else if (typeof exports === 'object') {
		module.exports = factory(require('angular'), require('moment')); // CommonJS
	} else {
		factory(window.angular, window.moment); // Browser global
	}
}(function (angular, moment) {
	'use strict';
	angular.module('ui.dateTimeInput', [])
		.value('dateTimeInputConfig')
		.directive('dateTimeInput', [dateTimeInputDirective]);

	function dateTimeInputDirective() {
		return {
			require: 'ngModel',
			restrict: 'A',
			scope: {
				'dateFormats': '='
			},
			link: linkFunction
		};

		function linkFunction(scope, element, attrs, controller) {

			// validation
			if (angular.isDefined(scope.dateFormats) && !angular.isString(scope.dateFormats) && !angular.isArray(scope.dateFormats)) {
				throw 'date-formats must be a single string or an array of strings i.e. date-formats="[\'YYYY-MM-DD\']" ';
			}

			if (angular.isDefined(attrs.modelType) && (!angular.isString(attrs.modelType) || attrs.modelType.length === 0 )) {
				throw 'model-type must be "Date", "moment", "milliseconds", or a moment format string';
			}

			// variables
			var displayFormat = attrs.dateTimeInput || moment.defaultFormat;

			var dateParseStrict = (attrs.dateParseStrict === undefined || attrs.dateParseStrict === 'true');

			var modelType = (attrs.modelType || 'Date');

			var inputFormats = [attrs.dateTimeInput, modelType].concat(scope.dateFormats).concat([moment.ISO_8601]).filter(unique);

			// Behaviors
			controller.$parsers.unshift(parserFactory(modelType));

			controller.$formatters.push(formatter);

			controller.$validators.dateTimeInput = validator;

			element.bind('blur', applyFormatters);


			// Implementation

			function unique(value, index, self) {
				return ['Date', 'moment', 'milliseconds', undefined].indexOf(value) === -1 &&
					self.indexOf(value) === index;
			}

			function validator(modelValue, viewValue) {
				return angular.isDefined(viewValue) ? moment(viewValue, inputFormats, moment.locale(), dateParseStrict).isValid() : true;
			}

			function formatter(modelValue) {

				if (angular.isDate(modelValue)) {
					return moment(modelValue).format(displayFormat);
				} else if (angular.isNumber(modelValue)) {
					return moment.utc(modelValue).format(displayFormat);
				} else if (angular.isDefined(modelValue)) {
					return moment(modelValue, inputFormats, moment.locale(), dateParseStrict).format(displayFormat);
				}

				return modelValue;
			}

			function parserFactory(modelType) {
				var result;
				// Behaviors
				switch (modelType) {
					case 'Date':
						result = dateParser;
						break;
					case 'moment':
						result = momentParser;
						break;
					case 'milliseconds':
						result = millisecondParser;
						break;
					default: // It is assumed that the modelType is a formatting string.
						result = stringParserFactory(modelType);
				}

				return result;

				function dateParser(viewValue) {
					return momentParser(viewValue).toDate();
				}

				function momentParser(viewValue) {
					return moment(viewValue, inputFormats, moment.locale(), dateParseStrict);
				}

				function millisecondParser(viewValue) {
					return moment.utc(viewValue, inputFormats, moment.locale(), dateParseStrict).valueOf();
				}

				function stringParserFactory(modelFormat) {
					return function stringParser(viewValue) {
						return momentParser(viewValue).format(modelFormat);
					};
				}
			}

			function applyFormatters() {
				controller.$viewValue = controller.$formatters.filter(keepAll).reverse().reduce(applyFormatter, controller.$modelValue);
				controller.$render();

				function keepAll() {
					return true;
				}

				function applyFormatter(memo, formatter) {
					return formatter(memo);
				}
			}
		}
	}
}))
;
