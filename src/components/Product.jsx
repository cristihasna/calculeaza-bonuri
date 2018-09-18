import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import calculateInputWidth from '../misc/scalable-input';
import '../styles/css/product.css';


export class Product extends React.Component{

	constructor(props){
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handlePriceBlur = this.handlePriceBlur.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleNameChange(e){
		const newProduct = {
			name: e.target.value,
			price: this.props.data.price
		};

		this.props.onChange(newProduct, this.props.index);
	}

	handlePriceChange(e){
		const newProduct = {
			name: this.props.data.name,
			price: this.formatPrice(e.target.value)
		};
		this.props.onChange(newProduct, this.props.index);
	}

	handlePriceBlur(e){
		let price = this.props.data.price;
		if(price !== ''){
			price = parseFloat(price).toFixed(2);
			const newProduct = {
				name: this.props.data.name,
				price: price
			};
			this.props.onChange(newProduct, this.props.index);
		}
	}

	handleRemove(e){
		this.props.onRemove(this.props.index);
	}

	formatPrice(price){
		let newPrice = price;
		let pattern = /[0-9]+(\.([0-9]{0,2}))?/;
		let validation = newPrice.match(pattern);
		if(validation != null)
			return validation[0];
		return '';
	}

	render(){
		let removeButton = (
			<button className="product-remove-button" onClick={this.handleRemove}>
				<FontAwesome name="times" />
			</button>
			);

		const nameWidth = calculateInputWidth(this.props.data.name);
		const priceWidth = calculateInputWidth(this.props.data.price);

		return (
			<div className="product">
				<div className="product-name">
					<input 
						spellCheck="false" 
						className={'scalable' + (this.props.data.name.length === 0 ? ' error' : '')} 
						style={{width: nameWidth}} 
						type="text" 
						value={this.props.data.name} 
						onChange={this.handleNameChange} />
				</div>
				<div className="product-price">
					<input 
						className={'scalable' + (this.props.data.price.length === 0 ? ' error' : '')} 
						style={{width: priceWidth}} 
						type="text" 
						value={this.props.data.price} 
						onChange={this.handlePriceChange} 
						onBlur={this.handlePriceBlur} />
				</div>
				<span className="product-currency">lei</span>
				{this.props.removeable && removeButton}
			</div>
		);
	}
}

Product.propTypes = {
	data: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	removeable: PropTypes.bool.isRequired
};