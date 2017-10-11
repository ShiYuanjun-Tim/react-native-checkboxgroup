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
import CheckBoxGroup from "../checkBoxGroup"

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


				<CheckBoxGroup style={{backgroundColor:"gray"}} mode="RadioGroupMode"
				               renderTitle={()=>{return <Text>Title</Text>}}
				               ref="checkgp" key="ddd"
				               onChange={(v)=>{
				               	  console.log("onChange",v,this.refs.checkgp.getSelectedValue())

				               }}>

						<Text key="A">Grouo Item 122222</Text>
						<Text key="AA">Grouo Item 444444</Text>
						<Text key="AAA">Grouo Item 3333</Text>

					<Text key="B">Item 44444</Text>
					<Text key="BB">Item 55555</Text>
					<Text key="BBB">Item 666666</Text>

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

