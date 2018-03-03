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
import CheckBoxGroup,{RADIO_MODE} from "../checkBoxGroup"

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
				<Button title="toggle true whole checkboxgroup2" onPress={()=>{
					this.refs.checkgp.toggle(true)
				}}></Button>
				<Button title="toggle false whole checkboxgroup2" onPress={()=>{
					this.refs.checkgp.toggle(!true)
				}}></Button>


				<CheckBoxGroup style={{backgroundColor:"gray"}}
				               mode={RADIO_MODE}
				               renderTitle={()=>{return <Text>Title</Text>}}
				               ref="checkgp" key="ddd"
				               onChange={(v)=>{
				               	  console.log("onChange",v,this.refs.checkgp.getSelectedValue())

				               }}>
					<CheckBoxGroup key="GroupA" style={{borderColor:"blue",borderWidth:1,paddingLeft:10}}>

						<Text key="A">Grouo Item A</Text>
						<Text key="AA">Grouo Item AA</Text>
						<Text key="AAA">Grouo Item AAA</Text>
					</CheckBoxGroup>

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

