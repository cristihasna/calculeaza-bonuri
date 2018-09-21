import React from 'react';
import PropTypes from 'prop-types';
import {Buyer} from './Buyer';
import FontAwesome from 'react-fontawesome';
import '../styles/css/buyer-list.css';

export class BuyerList extends React.Component{

	constructor(props){
		super(props);
		this.buyerListContainer = React.createRef();
	}
	componentDidMount(){
		let element = this.buyerListContainer.current;
		element.addEventListener('scroll', this.handleScroll);
	}
	
	componentDidUpdate(){
		let element = this.buyerListContainer.current;
		if(element.scrollWidth - element.parentElement.scrollWidth) {
			element.parentNode.classList.add('scrollable-right');
		} else {
			element.parentNode.classList.remove('scrollable-right');
		}
	}

	handleScroll(e){
		let scrollLeft = e.target.scrollLeft;
		let maxScrollLeft = e.target.scrollWidth - e.target.parentElement.scrollWidth;
		if(scrollLeft > 0){
			e.target.parentNode.classList.add('scrollable-left');
		} else {
			e.target.parentNode.classList.remove('scrollable-left');
		}

		if(scrollLeft < maxScrollLeft){
			e.target.parentNode.classList.add('scrollable-right');
		} else {
			e.target.parentNode.classList.remove('scrollable-right');
		}

	}
	
	render(){
		let buyersList = this.props.buyers.map((buyer, i) =>
				<Buyer 
					key={"buyer_" + i}
					data={buyer}
					index={i}
					total={this.props.computeTotal(i)}
					removeable={this.props.buyers.length > 2}
					onChange={this.props.onChange}
					onOwnerChange={this.props.onOwnerChange}
					onRemove={this.props.onRemove}
					/> 
			);

		return (
			<div className="buyers">
				<div className="buyer-list-container" ref={this.buyerListContainer}>
					{buyersList}
				</div>
				<button
					onClick={this.props.onAdd}
					className="add-button">
					<span className="button-icon">
						<FontAwesome name="plus-square-o" />
					</span>
					Adaugă persoană
				</button>
			</div>
		);
	}
}

BuyerList.propTypes = {
	buyers: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onOwnerChange: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	computeTotal: PropTypes.func.isRequired
};