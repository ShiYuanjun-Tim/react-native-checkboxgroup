/**
 * Created by syjmac on 2017/9/19.
 */
import * as React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Selectable, IDENTIFIER,SelectableProps,SelectedStatus} from "./Selectable";
import ReactElement = React.ReactElement;


export interface ItemProps extends SelectableProps {
	/*用于组件内部状态改变时候进行往上级传递使用*/
	selectedChanged: (key: string, isSelected: boolean) => void;
	disabled?: boolean; //是否不可选
	onChange: (v:SelectedStatus) => void;
	/*内部使用标记 唯一id*/
	identifier: string;
	ref: (item:Selectable)=>void;
	key:string;
	mode?:string;
}

export default class CheckBoxItem extends React.Component<ItemProps,{isSelected: boolean}> implements Selectable {

	static IDENTIFIER = IDENTIFIER

	static defaultProps = {
		disabled: false,
		selectedChanged(k: string, isSelected: boolean): void{
		},
		renderCheckBox: (isSelected: boolean) => {
			return <Text>{isSelected ? "On" : "Off"}  </Text>
		},
		rowTemplate:(checkbox:ReactElement<any>,item:ReactElement<any>,key:string)=>{
			return <View style={{flexDirection:"row"}}>
				{checkbox}
				{item}
			</View>
		}
	}

	state = {
		isSelected: false
	};

	getSelectedValue() {
		return {
			key:this.props.identifier,
			value:!this.props.disabled && this.state.isSelected
		};
	}

	select(cb?:Function): void {
		if(this.props.disabled){
			return;
		}
		this.setState({isSelected: true},()=>{cb&&cb()})
	}

	deselect(cb?:Function): void {
		if(this.props.disabled){
			return;
		}
		this.setState({isSelected: false},()=>{cb&&cb()})
	}

	toggle = () => {
		if(this.props.disabled && !this.state.isSelected){
			return;
		}
		let current = this.state.isSelected
		let cb=()=>{
			this.props.onChange && this.props.onChange({key:this.props.identifier,value: this.state.isSelected})
		}
		if (current) {
			this.deselect(cb)
		} else {
			this.select(cb)
		}
		//console.log("selectedChanged",this.props.identifier,!current?"ON":"OFF")
		this.props.selectedChanged && this.props.selectedChanged(this.props.identifier, !current)
		// this.props.onChange && this.props.onChange(this.props.identifier, !current)

	}

	public componentDidUpdate(prevProps: ItemProps) {
		//突然变不可用了， 但是目前还是on状态，此时要变不可用
		if( prevProps && this.props.disabled != prevProps.disabled
			&& this.state.isSelected
		) {
			this.toggle();
		}
	}

	render() {
		let {renderCheckBox,rowTemplate,identifier} = this.props

		let checkbox = (
			<TouchableOpacity onPress={this.toggle} activeOpacity={1} style={{justifyContent:"center",alignItems:"center"}}>
				{renderCheckBox && renderCheckBox(this.state.isSelected, this.props.disabled)}
			</TouchableOpacity>
		)
		//console.log("CheckboxItem render")
		return <View>
			{rowTemplate&&rowTemplate(checkbox,this.props.children,identifier)}
		</View>
	}

}
