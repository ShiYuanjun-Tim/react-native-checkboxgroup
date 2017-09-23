/**
 * Created by syjmac on 2017/9/23.
 */

export const IDENTIFIER = Symbol("Selectable")

export  interface  Selectable {
	/*select 和 deselect 都是内部组件间调用的 toggle 才是唯一暴露给外部使用的*/
	select(): void;
	deselect(): void;
	toggle(): void;
}
