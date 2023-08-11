'use strict'
module.exports = function chain(...f) {
	return (next = function noop() {}, ...np) => f.reduceRight(
		(acc, cur) => (...p) => cur(acc, ...p), next
	)(...np)
}
