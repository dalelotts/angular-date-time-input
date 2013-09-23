/*globals $, moment, module, describe, it, expect, beforeEach, inject */
/**
 * @license angular-date-time-input
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author Dale "Ducky" Lotts
 *    @since  2013-Sep-23
 */

describe('date-time-input', function () {
  'use strict';
  var compiler, rootScope;

  beforeEach(module('ui.dateTimeInput'));

  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope;
    compiler = $compile;
  }));

  describe('valid configuration', function () {
    it('requires ngModel', function () {
      var compile = function () {
        compiler('<input data-date-time-input="M/D/YYYY h:mm A"/>')(rootScope);
      };

      expect(compile).toThrow();
    });
    it('requires a date format', function () {
      var compile = function () {
        compiler('<input data-date-time-input data-ng-model="dateValue" />')(rootScope);
      };

      expect(compile).toThrow();
    });
  });

  describe('has expected initial structure', function () {
    it('is a `<input>` element', function () {
      var element = compiler('<input data-date-time-input="M/D/YYYY h:mm A" data-ng-model="dateValue"/>')(rootScope);
      rootScope.$digest();
      expect(element.prop('tagName')).toBe('INPUT');
    });
  });

  describe('has existing ngModel value and display value', function () {
    it('is "1/1/1970 12:00 am if the ngModel value is set to 1970-01-01T00:00:00.000', function () {
      var element = compiler('<input data-date-time-input="M/D/YYYY h:mm A" data-ng-model="dateValue"/>')(rootScope);
      rootScope.dateValue = moment('1970-01-01T00:00:00.000').toDate();
      rootScope.$digest();
      expect(element.val()).toEqual('1/1/1970 12:00 AM');
    });
  });

  describe('display value is "1/1/1970 12:00 am"', function () {
    it('if the user inputs "1970/1/1"', function () {
      var element = compiler('<input data-date-time-input="M/D/YYYY h:mm A" data-ng-model="dateValue"/>')(rootScope);
      rootScope.$digest();
      element.val('1970/1/1');
      element.trigger('input');
      expect(rootScope.dateValue).toContain("1970-01-01T00:00:00");
      expect(element.val()).toEqual('1970/1/1');
      element.trigger('blur'); // formatting happens on blur
      expect(element.val()).toEqual('1/1/1970 12:00 AM');
    });
  });
  describe('rejects invalid input', function () {
    it('of "foo"', function () {
      var element = compiler('<input data-date-time-input="M/D/YYYY h:mm A" data-ng-model="dateValue"/>')(rootScope);
      rootScope.$digest();
      element.val('foo');
      element.trigger('input');
      expect(rootScope.dateValue).toEqual('foo');
      expect(element.val()).toEqual('foo');
      expect(element.hasClass('ng-invalid')).toBe(true);
      element.trigger('blur'); // formatting happens on blur
      expect(element.val()).toEqual('foo');
      expect(element.hasClass('ng-invalid')).toBe(true);
    });
  });
});