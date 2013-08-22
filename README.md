# Native view helpers for NodeJS

[![Build Status](https://travis-ci.org/janez89/native-view-helpers.png?branch=master)](https://travis-ci.org/janez89/native-view-helpers)
[![NPM version](https://badge.fury.io/js/native-view-helpers.png)](http://badge.fury.io/js/native-view-helpers)

A collection of helper for NodeJS templates.

`npm install native-view-helpers`

## Overview

* [Usage](#usage)
* [Helpers API](#helpers-api)
	* [Summary](#summary)
	* [Basic](#basic)
		* [e](#e)
		* [url](#url)
		* [numberFormat](#numberformat)
		* [mergeObject](#mergeobject)
		* [toAttr](#toattr)
		* [repeat](#repeat)
		* [nl2br](#nl2br)
		* [htmlspecialchars](#htmlspecialchars)
		* [strip_tags](#strip_tags)
		* [ucFirst](#ucfirst)
		* [countChars](#countchars)
	* [HTML](#html)
		* [a](#a)
		* [el](#el)
		* [beginEl](#beginel)
		* [endEl](#endel)
		* [charset](#charset)
		* [css](#css)
		* [script](#script)
		* [img](#img)
		* [imgText](#imgtext)
		* [refresh](#refresh)
	* [Date](#date)
		* [time](#time)
		* [format](#format)
		* [parse](#parse)
	* [Form](#form)
		* [begin](#begin)
		* [end](#end)
		* [label](#label)
		* [inputField](#inputField)
		* [hiddenField](#hiddenField)
		* [textField](#textField)
		* [passwordField](#passwordField)
		* [fileField](#fileField)
		* [textArea](#textArea)
		* [dropDownList](#dropDownList)
		* [checkBox](#checkBox)
		* [radioButton](#radioButton)
		* [button](#button)
		* [resetButton](#resetButton)
		* [submitButton](#submitbutton)
	* [ActiveForm](#activeform)
		* [Active Form Usage](#active-form-usage)
		* [data](#data)
	* [Widgets](#widgets)
		* [pagination](#pagination)
		* [nestedList](#nestedList)
		* [shippingChooser](#shippingChooser)
* [Changelog](#changelog)
* [Authors and contributors](#authors-and-contributors)
* [License](#license)

## Usage

Node native helpers use with express
```javascript
// for static helpers
app.locals.$ = require('native-view-helpers');
```

Use in templates

EJS templates:

```
<%- $.nl2br('\r\n') %> // out: <br />
<%- $.ucFirst('message') %> // out: Message
<%- $.date.format('Y/m/d H:i:s') %>
<%- $.html.a('/url-address', 'Label') %>
<%- $.html.charset() %>

Use form

<%- $.form.begin('/target') %>

<%- $.form.label('Username') %>
<%- $.form.textField('username') %>

<%- $.form.label('Password') %>
<%- $.form.passwordField('password') %>

<%- $.form.submitButton('Login') %>

<%- $.form.end() %>

Or active form

<% var form = $.activeForm('/target') %>
<%- form.begin() %>

<%- form.label('username') %>
<%- form.textField('username', { placeholder: 'Username'}) %>

<%- form.label('Password') %>
<%- form.passwordField('password', { placeholder: 'Password'}) %>

<%- form.submitButton('Login') %>
<%- form.end() %>

Use dropDownList

<%- $.form.dropDownList('category', null, ['Category 1', 'Category 2', 'Category 3'], { empty: '-- Select --'}) %>
<%- $.form.dropDownList('category', 'val3', { val1: 'Category 1', val2: 'Category 2', val3: 'Category 3'}) %>
<%- $.form.dropDownList('category', 12, [{ id: 10, name: 'Category 1'}, { id: 12, name: 'Category 2'}], { value: 'id', label: 'name'}) %>

Use pagination

<%- $.widgets.pagination({page: 1, pages: 12 }) %>
<%- $.widgets.pagination({page: 1, count: 120, limit: 10 }) %>
<%- $.widgets.pagination({page: 1, pages: 12, url: '/index?sort=name' }) %> out: /index?sort=name&page=[num]
<%- $.widgets.pagination({page: 1, pages: 12, url: '/index?sort=name', query: 'p' }) %> out: /index?sort=name&p=[num]

Building tree

var list = [
	{ 
		id: 1, 
		name: 'Main Category', 
		children: [ 
			{ id: 2, name: 'Sub Category 1' }, 
			{ id: 2, name: 'Sub Category 1'	} 
		]
	}
];

<%- $.widgets.nestedList(list, function (fn, el, lvl) { return fn.html.a('/info/'+ el.id, el.name); }) %>

```

[Go to contents](#overview)

***

## Helpers API

### Basic

[Go to contents](#overview)

***

### HTML

[Go to contents](#overview)

***

### Date

[Go to contents](#overview)

***

### Form

[Go to contents](#overview)

***

### ActiveForm

[Go to contents](#overview)

***

### Widgets

[Go to contents](#overview)

***

## Changelog

### Aug 22, 2013 - version: 0.1.1
* fixed widgets test issue

### Aug 22, 2013 - version: 0.1.0

* added defaults
* added date plugin
* added html plugin
* added form plugin
* added active form plugin
* added widgets
* added tests

## Missing, Todo

* API documentation
* form, activeForm tests
* more template engine example
* examples

[Go to contents](#overview)

***

## Authors and contributors

* Janos Meszaros: [https://github.com/janez89](https://github.com/janez89)
* For PHP style functions (number_format, date, strip_tags, htmlspeicalchars, nl2br) [http://phpjs.org/functions](http://phpjs.org/functions)

[Go to contents](#overview)

***

## License

The MIT License (MIT)

Copyright (c) 2013 Janez

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[Go to contents](#overview)

***