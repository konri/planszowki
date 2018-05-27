/* eslint-disable max-len */
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';

/*
Button can be used with only text <Buton>Text to show</Buton>
but also can give the image to button and will be automatically styled:
<Button>
	<Image source={require('../../../assets/img/logo.png')} />
	<Text>Siema</Text>
</Button>

 */
class Button extends Component {
	// static propTypes = {
	// 	borderBottom: PropTypes.boolean || undefined,
	// 	isTransparent: PropTypes.boolean,
	// 	onPress: PropTypes.func,
	// 	style: PropTypes.object,
	// 	textStyle: PropTypes.object,
	// 	isLoading: PropTypes.boolean
	// };
	//
	
	getContainerStyle() {
		const { isTransparent, borderBottom } = this.props;
		if (isTransparent) return styles.containerTransparent;
		if (borderBottom) return { ...styles.container, ...styles.borderBottom };
		if (React.Children.count(this.props.children) === 1 && typeof this.props.children === 'object' && this.props.children.type.displayName === 'Image') {
			return styles.containerImageSelf;
		}
		
		return styles.container;
	}
	
	renderChildren() {
		if (this.props.isLoading) {
			return (
				<Spinner
					isVisible
					size={35}
					type={'Wave'}
					color={'#fff'}
				/>
			);
		}
		
		const { children, textStyle } = this.props;
		if (React.Children.count(children) === 1) {
			if (typeof children === 'string') {
				const style = this.props.isTransparent ? { ...styles.text, ...styles.textUnderline } : styles.text;
				return (
					<Text style={[style, textStyle]}>
						{children}
					</Text>
				);
			} else if (typeof children === 'object' && children.type.displayName === 'Image') {
				return React.cloneElement(children, {
					style: { ...children.style, ...styles.imageSelf }
				});
			}
		}
		
		return React.Children.map(children, child => {
			if (child.type.displayName === 'Image') {
				return React.cloneElement(child, {
					style: { ...styles.image, ...child.props.style }
				});
			}
			
			if (child.type.displayName === 'Text') {
				return React.cloneElement(child, {
					style: { ...styles.text, ...child.props.style }
				});
			}
			
			return child;
		});
	}
	
	render() {
		const { style, onPress, disabled, isLoading } = this.props;
		const containerStyle = this.getContainerStyle();
		return (
			<TouchableOpacity onPress={onPress} style={[containerStyle, style]} disabled={disabled || isLoading}>
				{ this.renderChildren() }
			</TouchableOpacity>
		);
	}
}

const styles = {
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 10,
		backgroundColor: '#3577f6'
	},
	containerTransparent: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerImageSelf: {
		width: 20,
		height: 20
	},
	borderBottom: {
		borderBottomWidth: 4,
		borderBottomColor: 'rgba(117, 83, 255, 0.8)'
	},
	text: {
		fontSize: 20,
		fontWeight: '400',
		color: '#fff'
	},
	textUnderline: {
		fontSize: 14,
		color: '#000',
		textDecorationLine: 'underline'
	},
	image: {
		width: 20,
		height: 20,
		marginRight: 15,
		marginTop: 5
	},
	imageSelf: {
		flex: 1,
		alignSelf: 'stretch',
		width: null
	}
};

export { Button };
