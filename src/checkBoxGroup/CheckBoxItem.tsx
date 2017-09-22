/**
 * Created by syjmac on 2017/9/19.
 */
import * as React from "react";
import {Text, View} from "react-native";
import BitSwitcher from "./BitSwitcher"
import ReactElement = React.ReactElement;

const IDENTIFIER =Symbol("Selectable")

export interface  Selectable {
	select(): void;
	deselect(): void;
	toggle(): void;
}

function getSelected(isSelected: boolean) {

}

interface CheckBoxItemProps {
	selectedChanged?: (key:string,isSelected: boolean) => void;
	ref?: string|Function;
	identifier:string;
}

export class CheckBoxItem extends React.Component<CheckBoxItemProps,{isSelected: boolean}> implements Selectable {
	static IDENTIFIER=IDENTIFIER

	static defaultProps= {
			selectedChanged(k:string,isSelected: boolean): void{
			}
	}

	state = {
		isSelected: false
	};

	select(): void {
		this.setState({isSelected: true})
	}

	deselect(): void {
		this.setState({isSelected: false})
	}

	toggle() {
		let current=this.state.isSelected
		if (current) {
			this.deselect()
		} else {
			this.select()
		}
		this.props.selectedChanged&&this.props.selectedChanged(this.props.identifier,!current)
	}

	private isChild(){

	}

	render() {
		console.log("CheckboxItem render")
		return <View style={{flexDirection:"row"}} >
			<Text onPress={()=>{this.toggle()}}>{this.state.isSelected ? "On" : "Off"} {this.props.identifier} </Text>
			{this.props.children}
		</View>
	}

}

interface  Prop {
	selectedChanged?: (key:string,isSelected: boolean) => void;
	children: React.ReactNode;
	identifier?:string;
}

export class CheckBoxGroup extends React.Component<Prop,{isSelected: boolean}> implements Selectable {
	static IDENTIFIER=IDENTIFIER

	state = {
		isSelected: false
	};

	private bs:BitSwitcher<string>;
	private keys:string[];
	private _items: Map<string,Selectable> = new Map();

	private addItem(key:string,item: Selectable): void {
		if (!this._items.has(key)) {
			this._items.set(key,item);
		}
	}

	constructor(props: Prop, context: any) {
		super(props, context);

		this.keys=React.Children.map(this.props.children, (e) =>
			(this.isSelectableComp(e)?"Group_":"Item_")+Math.ceil( Math.random()*10000000))
		this.bs = new BitSwitcher(...this.keys)
	}

	select(): void {
		this.setState({isSelected: true})
		this._items.forEach((v,k)=> {
			this.bs.on(k)
			v.select();
		})
	}

	deselect(): void {
		this.setState({isSelected: false})
		this._items.forEach((v,k) => {
			this.bs.off(k)
			v.deselect();
		})
	}

	toggle() {
		let isSelectedNext = !this.state.isSelected
		this.setState({isSelected: isSelectedNext})
		if (isSelectedNext) {
			this.select()
		} else {
			this.deselect()
		}
		this.props.selectedChanged&&this.props.selectedChanged(this.props.identifier||"",isSelectedNext)
	}

	private isSelectableComp(reactChild:React.ReactChild){
		if (reactChild&&(reactChild as React.ReactElement<Prop>).type){
			let convert=reactChild as React.ReactElement<Prop>;
			let isChildSelectable = (typeof convert.type=="function")
				&&convert.type.name =="CheckBoxGroup"
				&&(convert.type as any).IDENTIFIER==IDENTIFIER
			return isChildSelectable
		}
		return false
	}

	render() {
		console.log("CheckboxGroup render")

		let that = this;
		let enrichProps= (ownKey:string)=>{
			console.log("ownKey",ownKey)
			return {
				identifier:ownKey,
				key:ownKey,
				ref:(item:Selectable)=>{
					item&&(that as any).addItem( ownKey,item)
				},
				selectedChanged:(childKey:string,isSelected:boolean)=>{
					isSelected?(that as any).bs.on(childKey):(that as any).bs.off(childKey);
					let nextGrpState = (that as any).bs.isAllOn();
					if(nextGrpState!=(that as any).state.isSelected){
						(that as any).setState({isSelected:nextGrpState})
						(that as any).props.selectedChanged&&(that as any).props.selectedChanged(ownKey,nextGrpState)
					}
				}
			}
		};

		let children=	React.Children.map(this.props.children, (reactChild, index) => {
			let key = this.keys[index];
			if(this.isSelectableComp(reactChild)){
				return React.cloneElement((reactChild as React.ReactElement<any>),{...enrichProps(key)})
			}else{
				return (
					<CheckBoxItem {...enrichProps(key)}>
						{reactChild}
					</CheckBoxItem>
				)
			}

			})

		return <View style={{ }} >
			<Text onPress={()=>{this.toggle()}}>{this.state.isSelected ? "On" : "Off"} {this.props.identifier} </Text>
			 { children }
		</View>
	}

}
