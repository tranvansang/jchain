export interface Chainable<P extends any[] = any[], R = any, Next = (...np: any[]) => any> {
	(next: Next, ...p: P): R;
}
type ChainResult<F> = F extends [(next: any, ...p: infer P) => infer R, ...any[]] ? <Next = () => void>(next?: Next, ...p: P) => R : (next: any, ...p: any[]) => any;
export default function chain<F extends Chainable[]>(...f: F): ChainResult<F>;
export {};
