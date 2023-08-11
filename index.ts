export interface Chainable<
	P extends any[] = any[],
	R = any,
	Next = (...np: any[]) => any,
> {
	(next: Next, ...p: P): R
}

type ChainResult<F> = F extends [(next: any, ...p: infer P) => infer R, ...any[]]
	? <Next = () => void>(next?: Next, ...p: P) => R
	: (next: any, ...p: any[]) => any
type ChainList<F, Next = <T extends any[], V>(...P: T) => V> = F extends [...infer Rest, (next: Next, ...p: infer P) => infer R]
	? [...ChainList<Rest, (...p: P) => R>, (next: Next, ...p: P) => R]
	: []
type AnyChainList = ChainList<[]> | ChainList<[any]> | ChainList<[any, any]> | Chainable[]

// () => (next = noop, ...p0) => next(...p0)
// f1 => (next = noop...p1) => f1(next, ...p1)
// (f2, f1) => (next = noop, ...p2) => f2((...p1) => f1(next, ...p1), ...p2)
// (f3, f2, f1) => (next = noop, ...p3) => f3((...p2) => f2((...p1) => f1(next, ...p1), ...p2), ...p3)
export default function chain<F extends Chainable[]>(...f: F): ChainResult<F> {
	// @ts-ignore
	return (next = function noop() {}, ...np) => f.reduceRight(
		// @ts-ignore
		(acc, cur) => (...p) => cur(acc, ...p),
		next
		// @ts-ignore
	)(...np) as any
}
