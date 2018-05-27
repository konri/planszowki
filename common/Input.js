import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ children, value, onChangeText, placeholder, secureTextEntry, labelStyle, editable = true, autoCapitalize = 'sentences' }) => (
		<View style={styles.container}>
			<Text style={[styles.label, labelStyle]}>{children}</Text>
			<TextInput
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCorrect={false}
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				autoCapitalize={autoCapitalize}
				editable={editable}
			/>
		</View>
	);

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginLeft: 10,
		marginRight: 10
	},
	label: {
		fontSize: 15,
		fontWeight: '400',
		color: '#857699',
		marginLeft: 8
	},
	input: {
		marginTop: -3,
		paddingRight: 5,
		paddingLeft: 5,
		height: 45,
		alignSelf: 'stretch',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#dad1ff',
		fontSize: 18,
		lineHeight: 23,
		color: '#000',
	},
	
};

export { Input };
