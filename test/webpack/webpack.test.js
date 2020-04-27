/* globals require, angular */

/**
 * See the file "LICENSE" for the full license governing this code.
 *
 * @author Dale "Ducky" Lotts
 * @since 9/11/16.
 */

require('angular');
describe('webpack require', function () {
  'use strict';

  function loadDateTimeInput () {
    angular.module('ui.dateTimeInput');
  }

  it('should throw an error if the module is not defined', function () {
    expect(loadDateTimeInput).toThrowError(/\[\$injector:nomod\] Module 'ui\.dateTimeInput'/);
  });

  it('should be available when required', function () {
    var exported = require('../../');
    expect(exported).toBe('ui.dateTimeInput');
    expect(loadDateTimeInput).not.toThrow();
  });
});
