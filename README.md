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
		* [radioButtonList](#radioButtonList)
		* [button](#button)
		* [resetButton](#resetButton)
		* [submitButton](#submitbutton)
	* [ActiveForm - unstable!](#activeform)
		* [Active Form Usage](#active-form-usage)
		* [data](#data)
	* [Widgets](#widgets)
		* [pagination](#pagination)
		* [nestedList](#nestedList)
		* [shippingChooser](#shippingChooser)
* [Changelog](#changelog)
* [Authors and contributors](#authors-and-contributors)
* [License](#license)

<a name="usage"></a>
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

> Use form

<%- $.form.begin('/target') %>

<%- $.form.label('Username') %>
<%- $.form.textField('username') %>

<%- $.form.label('Password') %>
<%- $.form.passwordField('password') %>

<%- $.form.submitButton('Login') %>

<%- $.form.end() %>

> Or active form

<% var form = $.activeForm('/target') %>
<%- form.begin() %>

<%- form.label('username') %>
<%- form.textField('username', { placeholder: 'Username'}) %>

<%- form.label('Password') %>
<%- form.passwordField('password', { placeholder: 'Password'}) %>

<%- form.submitButton('Login') %>
<%- form.end() %>

> Use dropDownList

<%- $.form.dropDownList('category', null, ['Category 1', 'Category 2', 'Category 3'], { empty: '-- Select --'}) %>
<%- $.form.dropDownList('category', 'val3', { val1: 'Category 1', val2: 'Category 2', val3: 'Category 3'}) %>
<%- $.form.dropDownList('category', 12, [{ id: 10, name: 'Category 1'}, { id: 12, name: 'Category 2'}], { value: 'id', label: 'name'}) %>

> Use radio button list

// in javascript
var radioButtonList = {
	"value1": "Label 1",
	"value2": "Label 2",
	"value3": "Label 3" 
};

<%- $.form.radioButtonList('name', 'value1', radioButtonList) %>

> radio button list with custom template

<%- $.form.radioButtonList('name', 'value1', radioButtonList, { template: '{input} &lt;span&gt;{label}&lt;/span&gt;' }) %>

> Use pagination

<%- $.widgets.pagination({page: 1, pages: 12 }) %>
<%- $.widgets.pagination({page: 1, count: 120, limit: 10 }) %>
<%- $.widgets.pagination({page: 1, pages: 12, url: '/index?sort=name' }) %> out: /index?sort=name&page=[num]
<%- $.widgets.pagination({page: 1, pages: 12, url: '/index?sort=name', query: 'p' }) %> out: /index?sort=name&p=[num]

> Building tree

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

#### e - escape

```javascript
helper.e('escape this content');
```

#### url

```javascript
var url = helper.url('http://example.com/?show=name');
url.setQs('name', 'value'); // set Query string name=value
url.getUrl(); // return http://example.com/?shown=name&name=value

// alternative linked solution
helper.url('http://ex.com/?page=5').setQs('page',10).getUrl();

```

#### numberFormat

PHP style number_format method

```javascript
helper.numberFormat(10000.11111, { sep: ',', decimals: 2});
// return 10,000.11

// PHP style - snake case version
helper.number_format(10000.1111, 2, '.', ',');
// return 10,000.11
```

> numberFormat(number, options)

Options:

* sep: thousands separator
* decpoint: decimal separator
* decimals: number of decimals

> number_format(number, decimals, dec_point, thousands_sep)

#### mergeObject
> Merge to JSON object

```javascript
var obj1 = { name: 'Name' };
var obj2 = { age: 25 };
obj1 = helper.mergeObject(obj1, obj2);
// obj1 return: { name: 'Name', age: 25 }
```

#### toAttr

> Convert JSON object to html key value format.

```javascript
helper.toAttr({ name: "email", value:"mail@mailbox.com" });
// return string: name="email" value="mail@mailbox.com"
```

#### repeat


```javascript
helper.repeat('=', 10);
// return: ==========
```

#### nl2br

Convert \r\n, \n\r, \r, \n to &lt;br /&gt;

```javascript
helper.bl2br('New\nData');
// return: New\n<br />Data
```

#### htmlspecialchars

>PHP style htmlspecialchars <br>
>htmlspecialchars(string, [options])

```javascript
helper.htmlspecialchars('<a href="link">label</a>', 'ENT_QUOTES');
// return: &lt;a href=&quot;link&quot;&gt;label&lt;/a&gt;
```

#### strip_tags

>PHP style strip_tags <br>
>strip_tags(string, [allowable_tags])

```javascript
helper.strip_tags('<p><a href="/target">Link</a> Text</p>', '<p>');
// return: <p>Link Text</p>
```

#### ucFirst

> upper case the first charater <br>
> ucFirst(string)

```javascript
helper.ucFirst('the string ...');
// return: The string ...
```

#### countChars

> count chars <br>
> countChars(RegEx, string)

```javascript
helper.countChars(/a/g, 'amazone');
// return: 2
```

[Go to contents](#overview)

***

### HTML

#### a

> Create HTML a element <br>
> html.a(link_string, label_string, [options])

```javascript
helper.html.a('/target', 'Link');
// return: <a hreff="/target">Link</a>

helper.html.a('/target', 'Link', { title: 'Link', class: 'cls' });
// return: <a hreff="/target" title="Link" class="cls">Link</a>
```

#### beginEl

> Create only open tag with parameters <br>
> html.beginEl(name_of_element, options)

```javascript
helper.html.beginEl('p', { class: 'content'});
// return: <p class="content">
```

#### endEl

> Create element only close tag <br>
> html.endEl(name_of_element)

```javascript
helper.html.endEl('p');
// return: </p>
```

#### el

> Create element with close tag <br>
> html.el(name_of_element, options)

```javascript
helper.html.el('p', { class: 'content', html: 'The text'});
// return: <p class="content">The text</p>
```

#### charset

> Create meta element for charset <br>
> html.charset(charset_string [default: 'uft8'])

```javascript
helper.html.charset();
// return: <meta charset="utf8" />

helper.html.charset('other');
// return: <meta charset="other" />
```

#### css

> Create link element for style <br>
> html.css(url_string, options)

```javascript
helper.html.css('style.css');
// return: <link href="style.css" rel="stylesheet" type="text/css" media="all" />

helper.html.css('style.css', { media: 'print'});
// return: <link href="style.css" rel="stylesheet" type="text/css" media="print" />
```

#### script

> Create script source element <br>
> html.script(source_string, options)

```javascript
helper.html.script('app.js');
// return: <script src="app.js" type="text/javascript"></script>
```
#### img

> Create img element <br>
> html.img(image_path, alt, options)

```javascript
helper.html.img('pic.png');
// return: <img src="pic.png" />

helper.html.img('pic.png', 'Big moon');
// return: <img src="pic.png" alt="big moon" />

helper.html.img('pic.png', 'Big moon', { width: 320 });
// return: <img src="pic.png" alt="big moon" width="320" />
```

#### imgText

> Create image element with remote url text caption <br>
> helper.html.imgText(message, options)

```javascript
helper.html.imgText('No Image');
// return: <img src="http://www.placehold.it/291x170/EFEFEF/AAAAAA&text=No Image"  />

helper.html.imgText('No Image', { w: 320, h: 240});
// return: <img src="http://www.placehold.it/320x240/EFEFEF/AAAAAA&text=No Image"  />
```

#### refresh

> Create meta element for refresh <br>
> html.refresh(url, time_in_secounds_after_redirect, options)

```javascript
helper.refresh('http://target.com');
// return: <meta http-equiv="5,http://target.com" />
```

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

### Aug 28, 2013 - version: 0.1.3

* added form.radioButtonList
* fixed form.checkBox
* added form tests

### Aug 27, 2013 - version: 0.1.2

* fix console.log
* enhacement activeForm dropDownList

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
* activeForm tests
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
