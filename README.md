# Angular Date/Time input
================================

[![Join the chat at https://gitter.im/dalelotts/angular-date-time-input](https://badges.gitter.im/dalelotts/angular-date-time-input.svg)](https://gitter.im/dalelotts/angular-date-time-input?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Native AngularJS directive that allows user input of a date/time value. Valid dates are displayed in specified format, but input may be in any supported format.

[![Build Status](https://travis-ci.org/dalelotts/angular-date-time-input.png?branch=master)](https://travis-ci.org/dalelotts/angular-date-time-input)

#Dependencies

Requires:
 * AngularJS 1.4.x or higher
 * MomentJS 2.1.x or higher

#Testing
We use karma and jshint to ensure the quality of the code. The easiest way to run these checks is to use grunt:

```
npm install -g gulp
npm install
npm test
```

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js

#Usage
We use npm for dependency management. Add the following to your package

```shell
npm install angular-date-time-input --save
```
This will copy the angular-date-time-input files into your node_modules folder, along with its dependencies.

Load the script files in your application:
```html
<script type="text/javascript" src="node_modules/moment/moment.js"></script>
<script type="text/javascript" src="node_modules/angular/angular.js"></script>
<script type="text/javascript" src="node_modules/angular-date-time-input/src/js/dateTimeInput.js"></script>
```

Add this module as a dependency to your application module:

```html
var myAppModule = angular.module('MyApp', ['ui.dateTimeInput'])
```

Apply the directive to your form elements:

```html
<input data-date-time-input="YYYY-MMM-DD" />
```

## Options

The value of the date-time-input attribute is the format the date values will be displayed.

Nota bene: The value saved in the model is, by default, a JavaScript ```Date``` object, not a string.
This can result in differences between what is seen in the model and what is displayed.

### date-time-input

This option controls the way the date is displayed in the view, not the model.

```html
<input data-date-time-input="YYYY-MMM-DD" />
```
See MomentJS documentation for valid formats.

### date-formats

This option defines additional input formats that will be accepted. 

```html
<input ... data-date-formats="['YYYY-MMM-DD']" />
```

Nota bene: Parsing multiple formats is considerably slower than parsing a single format. 
If you can avoid it, it is much faster to parse a single format.

See [MomentJS documentation] (http://momentjs.com/docs/#/parsing/string-formats) for more information.

### date-parse-strict

This option enables/disables strict parsing of the input formats. 

```html
<input ... data-date-parse-strict="false" />
```

### model-type

```html
<input ... data-model-type="Date | moment | milliseconds | [custom format]" />
```

Default: ```'Date'```

Specifies the data type to use when storing the selected date in the model. 

Accepts any string value, but the following values have special meaning (these values are case sensitive) :
 * ```'Date'``` stores a Date instance in the model. Will accept Date, moment, milliseconds, and ISO 8601 strings as initial input from the model 
 * ```'moment'``` stores a moment instance in the model. Accepts the same initial values as ```Date```
 * ```'milliseconds'``` store the epoch milliseconds (since 1-1-1970) in the model. Accepts the same initial values as ```Date```

Any other value is considered a custom format string. 

##Contributing

See [Contributing] (contributing.md) document

## License

angular-date-time-input is released under the MIT license and is copyright 2016 Knight Rider Consulting, Inc.. Boiled down to smaller chunks, it can be described with the following conditions.

## It requires you to:

* Keep the license and copyright notice included in angular-date-time-input's CSS and JavaScript files when you use them in your works

## It permits you to:

* Freely download and use angular-date-time-input, in whole or in part, for personal, private, company internal, or commercial purposes
* Use angular-date-time-input in packages or distributions that you create
* Modify the source code
* Grant a sublicense to modify and distribute angular-date-time-input to third parties not included in the license

## It forbids you to:

* Hold the authors and license owners liable for damages as angular-date-time-input is provided without warranty
* Hold the creators or copyright holders of angular-date-time-input liable
* Redistribute any piece of angular-date-time-input without proper attribution
* Use any marks owned by Knight Rider Consulting, Inc. in any way that might state or imply that Knight Rider Consulting, Inc. endorses your distribution
* Use any marks owned by Knight Rider Consulting, Inc. in any way that might state or imply that you created the Knight Rider Consulting, Inc. software in question

## It does not require you to:

* Include the source of angular-date-time-input itself, or of any modifications you may have made to it, in any redistribution you may assemble that includes it
* Submit changes that you make to angular-date-time-input back to the angular-date-time-input project (though such feedback is encouraged)

The full angular-date-time-input license is located [in the project repository](https://github.com/dalelotts/angular-date-time-input/blob/master/LICENSE) for more information.


## Donating
Support this project and other work by Dale Lotts via [gittip][gittip-dalelotts].

[![Support via Gittip][gittip-badge]][gittip-dalelotts]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip-dalelotts]: https://www.gittip.com/dalelotts/

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

