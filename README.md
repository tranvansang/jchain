# jchain - chain javascript functions

## Installation

```bash
yarn add jchain
```
Or
```bash
npm install jchain
```

## Usage

```javascript
import chain from 'jchain'
// or
const chain = require('jchain');

// f = 6
const f = chain(
	(next, a, b) => {
		// a = 1, b = 2
		const e = next(3, 4) // e = 5
		return 6
	},
	(next, c, d) => {
		// c = 3, d = 4
		return 5
		// don't call next
	},
	() => {
		// this is not invoked
	},
)(1, 2)
```

- async/await is support.
- error is thrown.
