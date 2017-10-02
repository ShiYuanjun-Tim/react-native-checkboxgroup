/**
 * Created by syjmac on 2017/9/23.
 */
import * as React from "react";
import {Text, View,TouchableOpacity,StyleSheet} from "react-native";
import BitSwitcher from "./BitSwitcher";
import {Selectable, IDENTIFIER,SelectableProps} from "./Selectable";
import CheckBoxItem from "./CheckBoxItem";
import ReactElement = React.ReactElement;

export interface  Prop  extends  SelectableProps{
	/*组的标题栏是否有*/
	isGroupTitleBarVisiable?:boolean;
	/*渲染标题栏*/
	renderTitle?:()=>React.ReactElement<any>;
	/*自定义 选中状态 用方法*/
	// renderCheckBox?:(isSelected:boolean)=>React.ReactElement<any>;
	// rowTemplate?:(checkbox:React.ReactElement<any>,item:React.ReactElement<any>)=>React.ReactElement<any>;

	style?:object;
	/*  ********以下为内部使用 *********/
	/*用于组件内部状态改变时候进行往上级传递使用*/
	selectedChanged?: (key: string, isSelected: boolean) => void;
	// children: React.ReactNode;
	/*内部使用标记*/
	identifier?: string;
}

export default class CheckBoxGroup extends React.Component<Prop,{isSelected: boolean}> implements Selectable {

	static IDENTIFIER = IDENTIFIER

	static defaultProps={
		renderCheckBox:(isSelected:boolean)=>{
			return <Text>{isSelected? "On" : "Off"}  </Text>
		},
		renderTitle:()=>{return null},
		isGroupTitleBarVisiable:true
	}

	state = {
		isSelected: false
	};

	private bs: BitSwitcher<string>;
	private keys: string[];
	private _items: Map<string,Selectable> = new Map();

	private addItem(key: string, item: Selectable): void {
		if (!this._items.has(key)) {
			this._items.set(key, item);
		}
	}

	private _identifier:string;

	private getRandomBum():number{
		return (Math.ceil(Math.random() * 10000000))
	}

	constructor(props: Prop, context: any) {
		super(props, context);

		this._identifier = props.identifier||("Group_"+this.getRandomBum())

		this.keys = React.Children.map(this.props.children, (e,index) =>
			this._identifier+(this.isSelectableComp(e)
				? ("_Group_"+this.getRandomBum())
				: "_Item_") +index
			)

		this.bs = new BitSwitcher(...this.keys)
	}

	select(): void {
		this.setState({isSelected: true})
		this._items.forEach((v, k) => {
			this.bs.on(k)
			v.select();
		})
	}

	deselect(): void {
		this.setState({isSelected: false})
		this._items.forEach((v, k) => {
			this.bs.off(k)
			v.deselect();
		})
	}

	toggle=()=> {
		let isSelectedNext = !this.state.isSelected
		if (isSelectedNext) {
			this.select()
		} else {
			this.deselect()
		}
		this.props.selectedChanged && this.props.selectedChanged(this.props.identifier || "", isSelectedNext)
	}

	private isSelectableComp(reactChild: React.ReactChild) {
		if (reactChild && (reactChild as React.ReactElement<Prop>).type) {
			let convert = reactChild as React.ReactElement<Prop>;
			let isChildSelectable = (typeof convert.type == "function")
				&& convert.type.name == "CheckBoxGroup"
				&& (convert.type as any).IDENTIFIER == IDENTIFIER
			return isChildSelectable
		}
		return false
	}

	private selectedChanged = (childKey: string, isSelected: boolean) => {
		console.log("selectedChanged",childKey,isSelected?"ON":"OFF")
		isSelected ? this.bs.on(childKey) : this.bs.off(childKey);
		let nextGrpState = this.bs.isAllOn();
		if (nextGrpState != this.state.isSelected) {
			this.setState({isSelected: nextGrpState})
			this.props.selectedChanged && this.props.selectedChanged(this.props.identifier || "", nextGrpState)
		}
	}

	private enrichChildProps = (ownKey: string) => {
		console.log("ownKey", ownKey)
		return {
			identifier     : ownKey,
			key            : ownKey,
			ref            : (item: Selectable) => {
				item && this.addItem(ownKey, item)
			},
			selectedChanged: this.selectedChanged,
			renderCheckBox:this.props.renderCheckBox,
			rowTemplate:this.props.rowTemplate
		}
	};

	private getTitleBar(){
		let { renderCheckBox,isGroupTitleBarVisiable,renderTitle} = this.props;
		return isGroupTitleBarVisiable
			?<View style={sts.groupTitleBar}>
				<TouchableOpacity onPress={this.toggle} style={{}}>
					{renderCheckBox&&renderCheckBox(this.state.isSelected)}
				</TouchableOpacity>
				{renderTitle&&renderTitle()}
			</View>
			:null;
	}

	render() {
		console.log("CheckboxGroup render")

		let {style} = this.props;
		let children = React.Children.map(this.props.children, (reactChild, index) => {
			let key = this.keys[index];
			if (this.isSelectableComp(reactChild)) {
				return React.cloneElement((reactChild as React.ReactElement<any>), {
					...this.enrichChildProps(key)
				})
			} else {
				return (
					<CheckBoxItem {...this.enrichChildProps(key)}>
						{reactChild}
					</CheckBoxItem>
				)
			}
		})

		return <View style={style}>
			{this.getTitleBar()}
			<View style={[]}>
				{ children }
			</View>
		</View>
	}

}


const sts=StyleSheet.create({

	groupTitleBar:{
		flexDirection:"row"
	}
})