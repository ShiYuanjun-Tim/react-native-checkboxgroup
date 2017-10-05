/**
 * Created by syjmac on 2017/9/19.
 */
import * as React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Selectable, IDENTIFIER,SelectableProps} from "./Selectable";
import ReactElement = React.ReactElement;


export interface ItemProps extends SelectableProps {
	/*用于组件内部状态改变时候进行往上级传递使用*/
	selectedChanged: (key: string, isSelected: boolean) => void;
	/*内部使用标记 唯一id*/
	identifier: string;
	ref: string|Function;
	key:string;
}

export default class CheckBoxItem extends React.Component<ItemProps,{isSelected: boolean}> implements Selectable {
	static IDENTIFIER = IDENTIFIER

	static defaultProps = {
		selectedChanged(k: string, isSelected: boolean): void{
		},
		renderCheckBox: (isSelected: boolean) => {
			return <Text>{isSelected ? "On" : "Off"}  </Text>
		},
		rowTemplate:(checkbox:ReactElement<any>,item:ReactElement<any>)=>{
			return <View style={{flexDirection:"row"}}>
				{checkbox}
				{item}
			</View>
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

	toggle = () => {
		let current = this.state.isSelected
		if (current) {
			this.deselect()
		} else {
			this.select()
		}
		console.log("selectedChanged",this.props.identifier,!current?"ON":"OFF")
		this.props.selectedChanged && this.props.selectedChanged(this.props.identifier, !current)
	}

	render() {
		let {renderCheckBox,rowTemplate} = this.props

		let checkbox = (
			<TouchableOpacity onPress={this.toggle} style={{justifyContent:"center",alignItems:"center"}}>
				{renderCheckBox && renderCheckBox(this.state.isSelected)}
			</TouchableOpacity>
		)
		console.log("CheckboxItem render")
		return <View>
			{rowTemplate&&rowTemplate(checkbox,this.props.children)}
		</View>
	}

}
