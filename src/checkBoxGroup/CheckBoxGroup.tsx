/**
 * Created by syjmac on 2017/9/23.
 */
import * as React from "react";
import {Text, View,TouchableOpacity,StyleSheet} from "react-native";
import BitSwitcher from "./LongBitSwitcher";
import {Selectable, IDENTIFIER,SelectableProps,SelectedStatus} from "./Selectable";
import CheckBoxItem from "./CheckBoxItem";
import ReactElement = React.ReactElement;
import invariant from "./invariant"

export interface  Prop  extends  SelectableProps{
	/*组的标题栏是否有*/
	isGroupTitleBarVisiable?:boolean;
	/*渲染标题栏*/
	renderTitle?:()=>React.ReactElement<any>;
	//每次用户改变选中想的行为都会触发这个callback
	// onChange?:()=>void;
	/*自定义 选中状态 用方法*/
	// renderCheckBox?:(isSelected:boolean)=>React.ReactElement<any>;
	// rowTemplate?:(checkbox:React.ReactElement<any>,item:React.ReactElement<any>)=>React.ReactElement<any>;

	style?:object;
	/*  ********以下为内部使用 *********/
	/*用于组件内部状态改变时候进行往上级传递使用,对于一个gruop而言只有全部子项目变on或者一个变off导致group状态变化的 时候才会触发这个方法*/
	selectedChanged?: (key: string, isSelected: boolean) => void;
	// children: React.ReactNode;
	/*内部使用标记*/
	identifier?: string;
	key:string;
}

export default class CheckBoxGroup extends React.Component<Prop,{isSelected: boolean}> implements Selectable {

	static IDENTIFIER = IDENTIFIER

	static defaultProps={
		renderCheckBox:(isSelected:boolean)=>{
			return <Text>{isSelected? "On" : "Off"}  </Text>
		},
		renderTitle:()=>{return null},
		isGroupTitleBarVisiable:true,
		onChanged:()=>{}
	}

	state = {
		isSelected: false
	};

	private bs: BitSwitcher<string>;
	private keys: string[];
	private _items: Map<string,Selectable> = new Map();
	private _identifier:string;

	private addItem(key: string, item: Selectable): void {
		if (!this._items.has(key)) {
			this._items.set(key, item);
		}
	}
	private removeItem(key: string): void {
		if (this._items.has(key)) {
			this._items.delete(key);
		}
	}

	private getRandomBum():number{
		return (Math.ceil(Math.random() * 10000000))
	}

	/**获取自组件的key数组*/
	private getKeysArr(props:Prop){__DEV__
		return React.Children.map(props.children, (e:any,index) =>{
			if(__DEV__)invariant(e.key!=undefined,"%s的子元素缺少属性 key",this._identifier);
			return e.key;
			/*this._identifier+(this.isSelectableComp(e)
			 ? ("_Group_"+this.getRandomBum())
			 : "_Item_") +index*/
		})
	}

	private syncChildrenChange(nextProps:Prop){
		let newKeysArr=this.getKeysArr(nextProps);
		let result = this.bs.switcherDiff(newKeysArr)
		if(result.diff){
			//子元素key被改变了,从新生成开关 对比总状态
			let newBS:BitSwitcher<string>= new BitSwitcher(...newKeysArr) ;
			this.bs = newBS.copyFrom(this.bs);
			let oldIsAllOn = this.state.isSelected,newIsAllOn=this.bs.isAllOn() ;
			//如果有删除的元素需要把ref从this.items表中移除
			if(result.deleted.length!=0){
				for(let key of result.deleted){
					this.removeItem(key)
				}
			}
			if(newIsAllOn!=oldIsAllOn){
				this.setState({isSelected:newIsAllOn})
			}
		}
	}

	constructor(props: Prop, context: any) {
		super(props, context);

		this._identifier = props.identifier||("Group_"+this.getRandomBum())

		this.keys = this.getKeysArr(this.props)

		this.bs = new BitSwitcher(...this.keys)
	}

	componentWillReceiveProps(nextProps:Prop,nextState:Prop){
		this.syncChildrenChange(nextProps);
	}

	getSelectedValue() {
		let children:Map<string,SelectedStatus> = new Map() ;
		for( let [key,selectable] of this._items){
			children.set(key,selectable.getSelectedValue())
		}

		return {
			key:this._identifier,
			value:this.state.isSelected,
			children
		};
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

	toggle=(trueOrFalse?:boolean)=> {
		let isSelectedNext = trueOrFalse==undefined? !this.state.isSelected :trueOrFalse;
		if (isSelectedNext) {
			this.select()
		} else {
			this.deselect()
		}
		console.log("selectedChanged",this.props.identifier,isSelectedNext?"ON":"OFF")
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
		isSelected ? this.bs.on(childKey) : this.bs.off(childKey);
		let nextGrpState = this.bs.isAllOn();
		if (nextGrpState != this.state.isSelected) {
			this.setState({isSelected: nextGrpState})
			console.log("selectedChanged",this._identifier,nextGrpState?"ON":"OFF")
			this.props.selectedChanged && this.props.selectedChanged(this._identifier || "", nextGrpState)
		}
		// this.props.onChange&&this.props.onChange()
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
				<TouchableOpacity onPress={()=>{this.toggle()}} style={{}}>
					{renderCheckBox&&renderCheckBox(this.state.isSelected)}
				</TouchableOpacity>
				{renderTitle&&renderTitle()}
			</View>
			:null;
	}

	render() {
		console.log(`CheckboxGroup ${this._identifier} render`)

		let {style} = this.props;
		let children = React.Children.map(this.props.children, (reactChild:any, index) => {
			let key = reactChild.key;
			invariant(key!=null,"%s的子元素缺少属性 key",this._identifier);
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