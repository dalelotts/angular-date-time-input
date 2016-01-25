/*globals describe, beforeEach, it, expect, module, inject, moment */

/**
 * @license angular-date-time-input
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        1/24/2016
 */

describe('modelType', function () {
  'use strict';
  var $rootScope;
  var $compile;
  beforeEach(module('ui.dateTimeInput'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('throws exception', function () {
    it('if value is an empty string', function () {
      function compile() {
        $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="">')($rootScope);
      }

      expect(compile).toThrow('model-type must be "Date", "moment", "milliseconds", or a moment format string');
    });
  });
  describe('does NOT throw exception', function () {
    it('if value is a string', function () {

      $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="foo">')($rootScope);
    });
  });
  describe('value of Date', function () {
    it('is the default', function () {

      $rootScope.date = moment('2015-11-17').toDate();

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2015');
    });
    it('accepts Date from model and returns Date', function () {

      $rootScope.dateValue = moment('2005-11-17').toDate();

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="dateValue">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');

      element.val('01/12/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.dateValue).toEqual(moment('01/12/2016', 'M/D/YYYY').toDate());
      expect(element.val()).toEqual('1/12/2016');

    });
    it('accepts valid date string from model and returns Date', function () {

      $rootScope.date = '1/24/2016';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('1/24/2016');

      element.val('1/29/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.date).toEqual(moment('2016-01-29').toDate());
      expect(element.val()).toEqual('1/29/2016');
    });
    it('accepts milliseconds from model', function () {

      $rootScope.date = 1132185600000; // '2005-11-17'

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');
    });
    it('does not accept invalid date string in the model', function () {

      $rootScope.date = '1-24-2016';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('Invalid date');
    });
  });


  describe('value of moment', function () {
    it('accepts moment from model and returns moment', function () {

      $rootScope.dateValue = moment('2005-11-17');

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="dateValue" data-model-type="moment">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');

      element.val('01/12/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.dateValue.isSame(moment('01/12/2016', 'M/D/YYYY'))).toBe(true);
      expect(element.val()).toEqual('1/12/2016');

    });
    it('accepts Date from model and returns moment', function () {

      $rootScope.dateValue = moment('2005-11-17').toDate();

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="dateValue" data-model-type="moment">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');

      element.val('01/12/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.dateValue.isSame(moment('01/12/2016', 'M/D/YYYY'))).toBe(true);
      expect(element.val()).toEqual('1/12/2016');

    });
    it('accepts valid date string from model and returns moment', function () {

      $rootScope.date = '1/24/2016';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="moment">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('1/24/2016');

      element.val('1/29/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.date.isSame(moment('2016-01-29'))).toBe(true);
      expect(element.val()).toEqual('1/29/2016');
    });
    it('accepts milliseconds from model', function () {

      $rootScope.date = 1132185600000; // '2005-11-17'

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="moment">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');
    });
    it('does not accept invalid date string in the model', function () {

      $rootScope.date = '1-24-2016';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="moment">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('Invalid date');
    });
  });


  describe('value of milliseconds', function () {
    it('accepts milliseconds from model and returns milliseconds', function () {

      $rootScope.dateValue = 1132185600000;



      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="dateValue" data-model-type="milliseconds">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');

      element.val('01/12/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.dateValue).toEqual(moment.utc('2016-01-12').valueOf());
      expect(element.val()).toEqual('1/12/2016');

    });
    it('accepts valid date string from model and returns milliseconds', function () {

      $rootScope.date = '1/24/2016';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="milliseconds">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('1/24/2016');

      element.val('1/29/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.date).toEqual(moment.utc('2016-01-29').valueOf());
      expect(element.val()).toEqual('1/29/2016');
    });
    it('accept milliseconds from model', function () {

      $rootScope.date = 1132207200000; // '2005-11-17'

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="milliseconds">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');
    });
    it('does not accept invalid date string in the model', function () {

      $rootScope.date = 'invalid';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="milliseconds">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('Invalid date');
    });
  });



  describe('value of format string', function () {
    it('is the default', function () {

      $rootScope.date = moment('2015-11-17').toDate();

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="YYYY-MM-DD">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2015');
    });
    it('accepts Date from model and returns Date', function () {

      $rootScope.dateValue = moment('2005-11-17').toDate();

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="dateValue" data-model-type="YYYY-MM-DD">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');

      element.val('01/12/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.dateValue).toEqual('2016-01-12');
      expect(element.val()).toEqual('1/12/2016');

    });
    it('accepts valid date string from model and returns Date', function () {

      $rootScope.date = '1/24/2016';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="YYYY-MM-DD">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('1/24/2016');

      element.val('1/29/2016');
      element.trigger('input');
      element.trigger('blur');
      $rootScope.$digest();

      expect($rootScope.date).toEqual('2016-01-29');
      expect(element.val()).toEqual('1/29/2016');
    });
    it('accepts milliseconds from model', function () {

      $rootScope.date = 1132185600000; // '2005-11-17'

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="YYYY-MM-DD">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('11/17/2005');
    });
    it('accept valid date string in the model', function () {

      $rootScope.date = '2016-Jan-24';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="YYYY-MMM-DD">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('1/24/2016');
    });

    it('does not accept invalid date string in the model', function () {

      $rootScope.date = '1-24-2016';

      var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-model-type="YYYY-MM-DD">')($rootScope);
      $rootScope.$digest();

      expect(element.val()).toBe('Invalid date');
    });
  });

  //describe('value of format string', function () {
  //  it('accepts Date from model and returns formatted string', function () {
  //
  //    $rootScope.date = moment('2005-11-17').toDate();
  //
  //    var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-input-config="{ modelType: \'MM-DD-YYYY\', startView: \'year\', minView: \'year\' }">')($rootScope);
  //    $rootScope.$digest();
  //
  //    var selectedElement = jQuery(jQuery('.year', element)[0]);
  //    selectedElement.trigger('click');
  //
  //    expect($rootScope.date).toBe('01-01-1999');
  //  });
  //  it('accepts date string (in matching format) from model and returns formatted string', function () {
  //
  //    $rootScope.date = '2015-11-17';
  //
  //    var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-input-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }">')($rootScope);
  //    $rootScope.$digest();
  //
  //    var selectedElement = jQuery(jQuery('.year', element)[0]);
  //    selectedElement.trigger('click');
  //
  //    expect($rootScope.date).toBe('2009-01-01');
  //  });
  //  it('accepts milliseconds from model and returns formatted string (crazy!)', function () {
  //
  //    $rootScope.date = 1132185600000;   // '2005-11-17'
  //
  //    var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-input-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }">')($rootScope);
  //    $rootScope.$digest();
  //
  //    var selectedElement = jQuery(jQuery('.year', element)[0]);
  //    selectedElement.trigger('click');
  //
  //    expect($rootScope.date).toBe('1999-01-01');
  //  });
  //  it('accepts any formatting string and returns date using that format)', function () {
  //
  //    $rootScope.date = 1132185600000;   // This will only work if input from model is not a string
  //
  //    var element = $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-input-config="{ modelType: \'gibberish\', startView: \'year\', minView: \'year\' }">')($rootScope);
  //    $rootScope.$digest();
  //
  //    var selectedElement = jQuery(jQuery('.year', element)[0]);
  //    selectedElement.trigger('click');
  //
  //    expect($rootScope.date).toBe('gibb5ri012');
  //  });
  //  it('throws an exception if numeric string is in the model', function () {
  //
  //    $rootScope.date = '1132185600000';
  //
  //    function compile() {
  //      $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-input-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }">')($rootScope);
  //      $rootScope.$digest();
  //    }
  //
  //    expect(compile).toThrow('Invalid date: 1132185600000');
  //  });
  //  it('throws an exception if incorrectly formatted date string is in the model', function () {
  //
  //    $rootScope.date = '10-18-1970';
  //
  //    function compile() {
  //      $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-input-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }">')($rootScope);
  //      $rootScope.$digest();
  //    }
  //
  //    expect(compile).toThrow('Invalid date: 10-18-1970');
  //  });
  //  it('throws an exception if invalid date string is in the model', function () {
  //
  //    $rootScope.date = 'invalid-date';
  //
  //    function compile() {
  //      $compile('<input data-date-time-input="M/D/YYYY" data-ng-model="date" data-input-config="{ modelType: \'YYYY-MM-DD\', startView: \'year\', minView: \'year\' }">')($rootScope);
  //      $rootScope.$digest();
  //    }
  //
  //    expect(compile).toThrow('Invalid date: invalid-date');
  //  });
  //});
});

