import test from 'node:test'
import chain from './index.mjs'
import {strictEqual} from 'node:assert'

test('empty chain', () => {
	strictEqual(chain()(), void 0)
	strictEqual(chain()(() => void 0, 1, 2), void 0)
	strictEqual(chain()((a, b) => a + b, 1, 2), 3)
})

test('single chain', () => {
	let a
	strictEqual(chain(
		next => {
			a = 1
			return next() + 1
		}
	)(() => 2), 3)
	strictEqual(a, 1)
})

test('many chains', async () => {
	let a, b, c, d
	await chain(
		next => {
			a = 1
			return next(2)
		},
		async (next, v) => {
			b = v
		},
		() => {
			c = 3
		}
	)()
	strictEqual(a, 1)
	strictEqual(b, 2)
	strictEqual(c, undefined)
})

test('combine chains', async () => {
	let a, b, c, d
	await chain(
		chain(
			next => {
				a = 1
				next()
				b = 2
			}
		),
		chain(),
		chain(
			next => {
				c = 3
				next()
			},
			() => d = 4
		),
	)()
	strictEqual(a, 1)
	strictEqual(b, 2)
	strictEqual(c, 3)
	strictEqual(d, 4)
})
