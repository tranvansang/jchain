export interface IChainable<Params extends any[] = any, Result = any> {
	(next: () => any, ...params: Params): Result
}

type ChainResult<P extends IChainable[]> = P extends [infer F1, ...any[]] ? F1 extends IChainable<infer Params, infer R> ? (...params: Params) => R : never : () => void
export default function chain<P extends IChainable[]>(...fs: P): ChainResult<P>
