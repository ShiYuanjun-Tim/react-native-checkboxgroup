复选／单选组件 `CheckBoxGroup`
===
安装
---
```
npm install react-native-checkboxgroup
```

API
----
本组件只暴露一个类`CheckBoxGroup` ，该类Tag里面的任意子元素（item）都会被内部处理当成一个选项组，支持简单使用和复杂的自定义需求
基本用法结构类似于：

```
<CheckBoxGroup>
	<Text key="B">一个简单文字选项</Text>
	<View key="CC">
		这里可以有复杂的任意结构
	</View>
	<CustomComp key="BBB">这个一个自定义组件作为选项组</CustomComp>
</CheckBoxGroup>

```
所有的item，前面都会有个默认的选中状态标识，默认用on／off来显示状态，支持自定义

### CheckBoxGroup
> ***CheckBoxGroup 所有的子元素都必须含有key属性，该属性借用react的key字段作为选项的值，最外部的CheckBoxGroup例外需要用`identifier`当作选中值来使用（可以不配置） ***

> > 嵌套在内部的 `CheckBoxGroup` ***默认会继承父组的所有可配置属性，所以基本只需要在最外部的`CheckBoxGroup` 配置一次属性即可***
> > 
> > 单选模式的嵌套不要超过2层，意思就是`CheckBoxGroup `内部的`CheckBoxGroup `内部不能在嵌套`CheckBoxGroup`
 


|属性|签名|说明|
|----|---|---|
|identifier?: string;||最外层的复选组件所用的key|
|mode?:"RadioGroupMode"||单选模式开关，***单选模式下的group的选中状态标示是没有的***|
|isGroupTitleBarVisiable?:boolean;||复选组件标题栏是否显示 默认true|
|renderTitle?:()=>React.ReactElement<any>;||复选组件标题栏的自定义|
|renderCheckBox?: (isSelected: boolean) => ReactElement<any>;||可以自定义复选组件及其子item的选中标识组件|
|rowTemplate?: (checkbox: ReactElement<any>, item: React.ReactNode,key:string) => ReactElement<any>;||子元素的自定义布局模版，参数说明-> `checkbox` 选中状态标识组件(如果有则是renderCheckBox生成的那个组建)，item：`CheckBoxGroup`标签内部的Tag元素（item），key:当前模版所应用的那个item的key|
|onChange?:(k:SelectedStatus)=>void;||用户直接操作的那个元素及其子元素的状态|

|方法| 说明 |
|----|---|
|getSelectedValue():SelectedStatus|获取该组及其子元素的选中状态|
|toggle(trueOrFalse?:boolean): void;|重置状态到指定的参数，如果没有参数则反选|





事例展示
---
|使用列子|事例文件说明|展示|
|---|---|---|
|简单例子| [SimpleExample](src/example/SimpleExample.tsx)|![简单例子](img/SimpleExample.gif)
|嵌套使用 |[SimpleNestExample](SimpleNestExample.tsx)|![简单例子](img/SimpleNestExample.gif)
|自定义样式| [CustomizeExample](src/example/CustomizeExample.tsx)|![简单例子](img/CustomizeExample.gif)
|动态添加／删除 项目|[DynamicItemExample](src/example/DynamicItemExample.tsx)|![简单例子](img/DynamicItemExample.gif)
|使用简单单选模式|[RadioGroupMode](src/example/RadioGroupMode.tsx)|![简单例子](img/RadioGroupMode.gif)

