/**
 * Created by syjmac on 2017/9/23.
 */
import * as React from "react";
import ReactElement = React.ReactElement;

export const IDENTIFIER = Symbol("Selectable")

export type SelectedStatus ={key:string;value:boolean;children?:Map<string,SelectedStatus>}

export  interface  Selectable {
	/*select 和 deselect 都是内部组件间调用的 toggle 才是唯一暴露给外部使用的*/
	select(cd?:Function): void;
	deselect(cd?:Function): void;
	toggle(trueOrFalse?:boolean): void;
	getSelectedValue(isUnselectedReturned?:boolean):SelectedStatus
}

export interface SelectableProps {
	/**用方法可以自定义 选中状态UI */
	renderCheckBox?: (isSelected: boolean) => ReactElement<any>;
	/**用户自定每个选项的布局，参数是自定义过的复选框和每一行的具体内容
	 * checkbox 已经实现了选中时间的逻辑不应该在被包在Touchable组件中
	* */
	rowTemplate?: (checkbox: ReactElement<any>, item: React.ReactNode,key:string) => ReactElement<any>;

	/*  ********以下为内部使用 *********/
	children: React.ReactNode;
}