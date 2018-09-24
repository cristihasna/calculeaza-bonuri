import React from 'react';
import PropTypes from 'prop-types';
import {Product} from './Product';
import '../styles/css/product-list.css';
import FontAwesome from 'react-fontawesome';

export class ProductList extends React.Component{

	constructor(props){
		super(props);

		this.getTotalPrice = this.getTotalPrice.bind(this);
	}

	getTotalPrice(){
		let total = 0;
		for(let product of this.props.products)
			total += parseFloat(product.price);
		return total.toString() === 'NaN' ? '-' : total.toFixed(2);
	}

	render(){
		let productList = this.props.products.map((product, i) => 
			<Product 
				key={"prod_" + i} 
				index={i} 
				data={product} 
				onChange={this.props.onChange}
				onRemove={this.props.onRemove} 
				removeable={this.props.products.length > 1} />
		);
		
		return(
			<div className="products">
				<div className="products-header">
					<div className="title">
						Produse
					</div>
					<div className="upload-button-container">
						<button className="upload-button">
							<FontAwesome name="file-text" />
						</button>
					</div>
				</div>
				<div className="product-list-container">
					{productList}
				</div>
				<div className="products-footer">
					<span className="label">Total</span>
					<span className="value">{this.getTotalPrice()}</span>
					<span className="currency">lei</span>
				</div>
				<button className="small-button" onClick={this.props.onAdd}>
					<span className="button-icon">
						<FontAwesome name="plus-square-o" />
					</span>
					Adaugă produs
				</button>
			</div>
		)
	}
}

// propTypes
ProductList.propTypes = {
	products: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};