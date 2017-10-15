/**
 * Created by syjmac on 2017/9/19.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {
	StyleSheet,
	Text,ScrollView,
	View,Button,Image
} from 'react-native';
import CheckBoxGroup,{SelectedStatus} from "../checkBoxGroup"

export default class MyAwesomeProject extends React.Component<object, {a:number}> {

	refs:{
		[k:string]:any
	};

	render() {


		return (
			<ScrollView style={{flex:1}} contentContainerStyle={styles.container}>

				<Button title="toggle whole checkboxgroup2" onPress={()=>{
					this.refs.checkgp.toggle()
				}}></Button>


				<CheckBoxGroup style={{backgroundColor:"gray"}}
				               ref="checkgp"
				               key="groupBKey"
				               identifier="groupB"
												onChange={(v:SelectedStatus)=>{
													console.log(v)
												}}
				>

					<Text key="B">Item B</Text>
					<Text key="BB">Item BB</Text>
					<Text key="BBB">Item BBB</Text>

				</CheckBoxGroup>



			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	item:{
		height:100,
		width:300,
	}
});

