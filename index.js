'use strict'
module.exports = function chain(...fs) {
	return fs.reduceRight((acc, cur) => (...params) => cur(acc, ...params), function noop() {})
}
