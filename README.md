# Angular Date/Time input
================================

Native AngularJS directive that allows user input of a date/time value. Valid dates are displayed in specified format, but input may be in any supported format.

[![Build Status](https://travis-ci.org/dalelotts/angular-date-time-input.png?branch=master)](https://travis-ci.org/dalelotts/angular-date-time-input)

#Dependencies

Requires:
 * AngularJS 1.1.3 or higher (Not tested with 1.0.x)
 * MomentJS 2.1.x or higher

#Testing
We use karma and jshint to ensure the quality of the code. The easiest way to run these checks is to use grunt:

```
npm install -g grunt-cli
npm install bower grunt
```

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js

#Usage
We use bower for dependency management. Add

```json
dependencies: {
    "angular-date-time-input": "latest"
}
```

To your bower.json file. Then run

```html
bower install
```

This will copy the angular-date-time-input files into your components folder, along with its dependencies.

Load the script files in your application:
```html
<script type="text/javascript" src="components/moment/moment.js"></script>
<script type="text/javascript" src="components/angular/angular.js"></script>
<script type="text/javascript" src="components/angular-date-time-input/src/js/dateTimeInput.js"></script>
```

Add the date module as a dependency to your application module:

```html
var myAppModule = angular.module('MyApp', ['ui.dateTimeInput'])
```

Apply the directive to your form elements:

```html
<input data-date-time-input="YYYY-MMM-DD" />
```

## Options

The value of the date-time-input attribute must be a valid format string. See MomentJS documentation for valid formats.