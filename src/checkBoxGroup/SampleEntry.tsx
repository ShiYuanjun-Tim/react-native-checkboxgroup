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
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {CheckBoxItem,CheckBoxGroup} from "./CheckBoxItem"

export default class MyAwesomeProject extends React.Component<object, {a:number}> {
  state={
  	a:1111111
  }

	render() {


		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Native!lll
				</Text>
				<Text style={styles.instructions}>
					To get started, edit index.ios.jsfffffcccccc333
				</Text>
				<Text style={styles.instructions}
				      onPress={()=>{this.setState({a:Math.random()})}}>
					Press Cmd+R to reload,{'\n'}
					Cmd+D or shake for dev menu
				</Text>

				<CheckBoxGroup >
					<CheckBoxGroup >
						<Text>{this.state.a}</Text>
						<Text>122222</Text>
						<Text>3333</Text>
					</CheckBoxGroup>

					<Text>fdsfsdfsf</Text>
					<Text>44444</Text>
					<Text>55555</Text>

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
});

AppRegistry.registerComponent('MyAwesomeProject', () => MyAwesomeProject);
