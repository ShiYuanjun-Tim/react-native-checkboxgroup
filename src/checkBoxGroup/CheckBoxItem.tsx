/**
 * Created by syjmac on 2017/9/19.
 */
import * as React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Selectable, IDENTIFIER} from "./Selectable";
import ReactElement = React.ReactElement;

export interface SelectableProps {
	renderCheckBox?: (isSelected: boolean) => React.ReactElement<any>;
	selectedChanged: (key: string, isSelected: boolean) => void;
	ref: string|Function;
	identifier: string;
	children: React.ReactNode;
}

export default class CheckBoxItem extends React.Component<SelectableProps,{isSelected: boolean}> implements Selectable {
	static IDENTIFIER = IDENTIFIER

	static defaultProps = {
		selectedChanged(k: string, isSelected: boolean): void{
		},
		renderCheckBox: (isSelected: boolean) => {
			return <Text>{isSelected ? "On" : "Off"}  </Text>
		},
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
		this.props.selectedChanged && this.props.selectedChanged(this.props.identifier, !current)
	}

	render() {
		let {renderCheckBox} = this.props
		console.log("CheckboxItem render")
		return <View style={{flexDirection:"row"}}>
			<TouchableOpacity onPress={this.toggle} style={{justifyContent:"center",alignItems:"center"}}>
				{renderCheckBox && renderCheckBox(this.state.isSelected)}
			</TouchableOpacity>
			{this.props.children}
		</View>
	}

}
