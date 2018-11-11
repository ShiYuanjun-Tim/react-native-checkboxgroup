/**
 * Created by syjmac on 2017/9/19.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as React from "react";
import {StyleSheet, Text, ScrollView, Button} from "react-native";
import CheckBoxGroup from "../checkBoxGroup";

export type State={ key: number, disableArr:string[]}

export default class MyAwesomeProject extends React.Component<object, State> {


	refs: {
		[k: string]: any
	};

	state: State = {
		disableArr: ["A"],
		key : Date.now(),

	}

	data = ()=> [
				<CheckBoxGroup key="GroupA"
			disabled={this.state.disableArr}
		renderFooter={()=><Text>GroupA Footer</Text>}
		style={{borderColor:"blue",borderWidth:1,paddingLeft:10}}>
		<Text key="A">Grouo Item A</Text>
		<Text key="AA">Grouo Item AA</Text>
		<Text key="AAA">Grouo Item AAA</Text>

		<CheckBoxGroup key="GruopINGroupA"
		disabled={["INGroupA"]}
		renderFooter={()=><Text>GruopINGroupA Footer</Text>}
		style={{borderColor:"green",borderWidth:1,paddingLeft:10}}>
		<Text key="INGroupA">Grouo Item INGroupA</Text>
		<Text key="INGroupAA">Grouo Item INGroupAA</Text>
		<Text key="INGroupAAA">Grouo Item INGroupAAA</Text>
		</CheckBoxGroup>

		</CheckBoxGroup>,

			<CheckBoxGroup key="GruopCCC"
			               style={{borderColor:"green",borderWidth:1,paddingLeft:10}}>
				<Text key="INGroupC">Grouo Item INGroupC</Text>
				<Text key="INGroupCC">Grouo Item INGroupCC</Text>
				<Text key="INGroupCCC">Grouo Item INGroupCCC</Text>
			</CheckBoxGroup>
			,
			<Text key="B">Item B</Text>,
			<Text key="BB">Item BB</Text>,
			<Text key="BBB">Item BBB</Text>,
		]

	add() {
		this.data.push("new Add" + Date.now())
		this.setState({key: Date.now()})
	}

	del() {
		this.data.pop()
		this.setState({ key: Date.now()})
	}

	render() {

		return (
			<ScrollView style={{flex:1}} contentContainerStyle={styles.container}>
				<Button title="get current status" onPress={()=>{
				               	  console.log("current",this.refs.checkgp.getSelectedValue())
				}}></Button>
				<Button title="toogle  checkgp true" onPress={()=>{
					this.refs.checkgp.toggle(true)
				}}></Button>
				<Button title="toogle checkgp false" onPress={()=>{
										this.refs.checkgp.toggle(!true)
				}}></Button>
				<Button title="add Item" onPress={()=>{
					this.add()
				}}></Button>

				<Button title="delete Item" onPress={()=>{
						this.del()
				}}></Button>
				<Button title="disable/enable A" onPress={()=>{
					let v = [];
					switch(this.state.disableArr.length) {
							case 0 :v=["A"]; break;
							case 1 : v=["A","AA"];break;
							case 2 : v=["A","AA", "AAA"];break;
							default : v=[]
					}
					this.setState({disableArr:v})
				}}></Button>


				<CheckBoxGroup style={{borderColor:"gray",borderWidth:1,paddingLeft:10}}
				               ref="checkgp"
				               key="SuperGroup"
				               renderFooter={()=><Text>outter Group Footer</Text>}
				               onChange={(v)=>{
				               	  console.log("onChange",v,this.refs.checkgp.getSelectedValue())

				               }}
				>
					{this.data().map((e, i) => {
						return typeof e=="string"?<Text key={"C_"+i}>{e}</Text>:e
					})}
				</CheckBoxGroup>


			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container   : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome     : {
		fontSize : 20,
		textAlign: 'center',
		margin   : 10,
	},
	instructions: {
		textAlign   : 'center',
		color       : '#333333',
		marginBottom: 5,
	},
	item        : {
		height: 100,
		width : 300,
	}
});

