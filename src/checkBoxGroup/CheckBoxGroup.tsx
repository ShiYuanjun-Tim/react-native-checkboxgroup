/**
 * Created by syjmac on 2017/9/23.
 */
import * as React from "react";
import {Text, View} from "react-native";
import BitSwitcher from "./BitSwitcher";
import {Selectable, IDENTIFIER} from "./Selectable";
import CheckBoxItem from "./CheckBoxItem";
import ReactElement = React.ReactElement;

interface  Prop {
	selectedChanged?: (key: string, isSelected: boolean) => void;
	children: React.ReactNode;
	identifier?: string;
}

export default class CheckBoxGroup extends React.Component<Prop,{isSelected: boolean}> implements Selectable {
	static IDENTIFIER = IDENTIFIER

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

	constructor(props: Prop, context: any) {
		super(props, context);

		this.keys = React.Children.map(this.props.children, (e) =>
		(this.isSelectableComp(e) ? "Group_" : "Item_") + Math.ceil(Math.random() * 10000000))
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

	toggle() {
		let isSelectedNext = !this.state.isSelected
		this.setState({isSelected: isSelectedNext})
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
			selectedChanged: this.selectedChanged
		}
	};

	render() {
		console.log("CheckboxGroup render")

		let children = React.Children.map(this.props.children, (reactChild, index) => {
			let key = this.keys[index];
			if (this.isSelectableComp(reactChild)) {
				return React.cloneElement((reactChild as React.ReactElement<any>), {...this.enrichChildProps(key)})
			} else {
				return (
					<CheckBoxItem {...this.enrichChildProps(key)}>
						{reactChild}
					</CheckBoxItem>
				)
			}

		})

		return <View style={{ }}>
			<Text onPress={()=>{this.toggle()}}>{this.state.isSelected ? "On" : "Off"} {this.props.identifier} </Text>
			{ children }
		</View>
	}

}
