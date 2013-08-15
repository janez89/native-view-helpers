var assert = require("assert"),
	helper = require("../index")

describe('#default', function(){
	describe('escape', function () {
		it('should escape <script>', function(){
			assert.equal(helper.e('<script>'), '&#60;script&#62;')
		})
	})

	describe('Object To Attributes', function () {
		it('should convert', function() {
			assert.equal(helper.toAttr({ type: "text", value: "value"}), ' type="text" value="value"')
		})
		it('should use html5 data', function() {
			assert.equal(helper.toAttr({ data: { id: 1, src: 'src'}}), ' data-id="1" data-src="src"')
			assert.equal(helper.toAttr({ 'data-id': 1, 'data-src': 'src'}), ' data-id="1" data-src="src"')
		})
	})

	describe('Merge Objects', function () {
		it('should marge', function(){
			var obj1 = { name: 'Name', user: 'u'}
			var obj2 = { age: 20, user: 'w'}
			var merged = helper.mergeObject(obj1, obj2)

			assert.equal(merged.name, 'Name')
			assert.equal(merged.age, 20)
			assert.equal(merged.user, 'w')
		})
	})

	describe('number format', function () {
		it('should 10,000', function () {
			assert.equal(helper.numberFormat(10000), '10,000')
		})
		it('should 10,000,000', function () {
			assert.equal(helper.numberFormat(10000000), '10,000,000')
		})
		it('should 10 000 000 with space separator', function () {
			assert.equal(helper.numberFormat(10000000, { sep: ' '}), '10 000 000')
		})
		it('should 10,000.10 with 2 decimals', function () {
			assert.equal(helper.numberFormat(10000.10, { decimals: 2}), '10,000.10')
		})
	})

	describe('string format', function () {
		it('should nl2br', function () {
			assert.equal(helper.nl2br('\r\n'), '<br />\r\n')
			assert.equal(helper.nl2br('\n\r'), '<br />\n\r')
			assert.equal(helper.nl2br('\r'), '<br />\r')
			assert.equal(helper.nl2br('\n'), '<br />\n')
		})
		it('should repeat', function () {
			assert.equal(helper.repeat('-', 5), '-----')
		})
		it('sholud string tags', function () {
			assert.equal(helper.strip_tags('<p>text <a href="url">link</a></p>', '<p>'), '<p>text link</p>')
			assert.equal(helper.strip_tags('<p>text <a href="url">link</a></p>'), 'text link')
		})
		it('should use html special chars', function () {
			assert.equal(helper.htmlspecialchars('<a href="link">label</a>', 'ENT_QUOTES'), '&lt;a href=&quot;link&quot;&gt;label&lt;/a&gt;')
		})
	})
})