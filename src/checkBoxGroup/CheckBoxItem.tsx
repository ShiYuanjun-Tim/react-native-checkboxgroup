/**
 * Created by syjmac on 2017/9/19.
 */
import * as React from "react";
import {Text, View} from "react-native";
import {Selectable, IDENTIFIER} from "./Selectable";
import ReactElement = React.ReactElement;

interface SelectableProps {
	selectedChanged: (key: string, isSelected: boolean) => void;
	ref: string|Function;
	identifier: string;
	children: React.ReactNode;
}

export default class CheckBoxItem extends React.Component<SelectableProps,{isSelected: boolean}> implements Selectable {
	static IDENTIFIER = IDENTIFIER

	static defaultProps = {
		selectedChanged(k: string, isSelected: boolean): void{
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
		let current = this.state.isSelected
		if (current) {
			this.deselect()
		} else {
			this.select()
		}
		this.props.selectedChanged && this.props.selectedChanged(this.props.identifier, !current)
	}

	render() {
		console.log("CheckboxItem render")
		return <View style={{flexDirection:"row"}}>
			<Text onPress={()=>{this.toggle()}}>{this.state.isSelected ? "On" : "Off"} {this.props.identifier} </Text>
			{this.props.children}
		</View>
	}

}
