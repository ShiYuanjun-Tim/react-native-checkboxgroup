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


	renderCheckBox=(isSel:boolean)=>{
		return isSel
			?<Image style={{width:20,height:20}} source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}></Image>
				:<Text>OFF</Text>
	}

	render() {




		return (
				<View style={styles.container}  >

					<Button title="toggle whole checkboxgroup2" onPress={()=>{
					this.refs.checkgp.toggle()
				}}></Button>


					<CheckBoxGroup
					               renderTitle={()=>{return <Text>God bless U</Text>}}
					               style={{backgroundColor:"gray"}}
					               ref="checkgp">

						<CheckBoxGroup  style={{backgroundColor:"red",borderColor:"blue",borderWidth:1,marginBottom:20}}
						                renderTitle={()=>{return <Text style={{color:"green"}}>Child Group</Text>}}
						>
							<View style={[styles.item,{marginBottom:20}]}>
								<Text>balabala...</Text>
								<Image style={{width:66,height:58}} source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}></Image>
							</View>

							<View style={[styles.item,{}]}>
								<Text>balabala. 111..</Text>
								<Image style={{width:66,height:58}} source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}></Image>
							</View>
							<View style={[styles.item,{}]}>
								<Text>balabala..333.</Text>
								<Image style={{width:66,height:58}} source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}></Image>
							</View>

							<Text>Grouo Item 122222</Text>
							<Text>Grouo Item 3333</Text>
						</CheckBoxGroup>

						<Text>Item 44444</Text>
						<Text>Item 55555</Text>
						<Text>Item 666666</Text>

					</CheckBoxGroup>

				</View>

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

