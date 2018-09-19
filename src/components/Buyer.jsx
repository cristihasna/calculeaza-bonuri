import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import calculateInputWidth from '../misc/scalable-input'
import '../styles/css/buyer.css';

export class Buyer extends React.Component{
	constructor(props){
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleOwnerChange = this.handleOwnerChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleCheckboxChange(index){
		return (e) => {
			let newProducts = this.props.data.products;
			newProducts[index] = (newProducts[index] + 1) % 2;

			const newBuyer = {
				name: this.props.data.name,
				products: newProducts,
				owner: this.props.data.owner
			};
			this.props.onChange(newBuyer, this.props.index);
		}
	}

	handleNameChange(e){
		const newBuyer = {
			name: e.target.value,
			products: this.props.data.products,
			owner: this.props.data.owner
		};
		this.props.onChange(newBuyer, this.props.index);
	}

	handleOwnerChange(){
		this.props.onOwnerChange(this.props.index);
	}

	handleRemove(e){
		this.props.onRemove(this.props.index);
	}



	render(){
		const checkButtonIcon = <FontAwesome style={{marginLeft: 2}} name="check-square-o" />;
		const uncheckButtonIcon = <FontAwesome name="square-o" />;
		const nameInputWidth = calculateInputWidth(this.props.data.name);

		let buyerChecks = this.props.data.products.map((product, i) =>
			<div key={"check_" + i} className="buyer-product-check">
				<button 
					onClick={this.handleCheckboxChange(i)}
					className="buyer-toggle-button">
					{product ? checkButtonIcon : uncheckButtonIcon}
				</button>
			</div>
		);

		let removeButton = (
			<button
				onClick={this.handleRemove}
				className="buyer-remove-button"
				>
				<FontAwesome name="user-times" />
			</button>
		);

		let paidButton = (
			<button
				onClick={this.handleOwnerChange}
				className="buyer-paid-button"
				>
				<FontAwesome name="credit-card-alt" />Achitat 
			</button>
		);

		return (
			<div className='buyer'>
				<div className="buyer-header">
					<div className="buyer-name">
						<input 
							style={{width: nameInputWidth}}
							className={'scalable' + (this.props.data.name.length === 0 ? ' error' : '')}
							type="text"
							value={this.props.data.name}
							onChange={this.handleNameChange} />

						{this.props.removeable && removeButton}
					</div>
				</div>
				<div className="buyer-checks-container">
					{buyerChecks}
				</div>
				{	
					this.props.data.owner === true ?
					(<div className="buyer-footer">
						<span className="label-paid">Achitat</span>
					</div>)
						:
					(<div className="buyer-footer">
						<span className="label">Total</span>
						<span className="value">{this.props.total}</span>
						<span className="currency">LEI</span>
						{paidButton}
					</div>)
				}
			</div>
		);
	}
}

Buyer.propTypes = {
	data: PropTypes.object.isRequired, //buyer data
	total: PropTypes.string.isRequired, //total price
	index: PropTypes.number.isRequired, //buyer index
	removeable: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	onOwnerChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};