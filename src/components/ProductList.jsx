import React from 'react';
import PropTypes from 'prop-types';
import {Product} from './Product';
import '../styles/css/product-list.css';
import FontAwesome from 'react-fontawesome';
import Jimp from 'jimp';

export class ProductList extends React.Component{

	constructor(props){
		super(props);
		this.getTotalPrice = this.getTotalPrice.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	getImageBuffer(image){
		return new Promise((resolve, reject) => {
			let fileReader = new FileReader();
			fileReader.readAsArrayBuffer(image);
			fileReader.onload = () => {
				if(fileReader.readyState === 2){
					resolve(fileReader.result);					
				}
			}
			fileReader.onerror = () => {
				reject(fileReader.error);
			}
		})

	}

	postprocessImage(imageBuffer){
		return new Promise((resolve, reject) => {
			Jimp.read(imageBuffer)
			.then(async (image) => {
				let imgWidth = image.bitmap.width;
				
				image.autocrop()
				.resize(imgWidth > 1024 ? 1024 : imgWidth, Jimp.AUTO)
				.quality(60)
				.greyscale()
				.contrast(1)

				let buffer = await image.getBufferAsync(image._originalMime);
				resolve(buffer);
			})
			.catch(err => reject(err));
		})
	}

	handleChange(e){
		let image = e.target.files[0];
		//get buffer from file
		this.getImageBuffer(image)
		.then(imageBuffer => this.postprocessImage(imageBuffer))
		.then(processedImageBuffer => {
			let newImage = new File([processedImageBuffer], image.name, {type: image.type});
			this.recognizeTextFromImage(newImage);
		})
		.catch(error => {
			this.props.alerter.alert(error, 'error');
		})
	}

	recognizeTextFromImage(image){
		let data = new FormData();
		this.props.alerter.alert('started');
		data.append('file', image);
		data.append('field', 'value');
		fetch('/api/picture', {
			method: 'POST',
			body: data
		})
		.then(response => response.json())
		.then(data => {
			this.props.alerter.alert('done', 'success');
			console.log(data);
			for(let product of data.products){
				this.props.alerter.alert(product.text, 'warning', 5000);
			}
		})
		.catch(err => {
			this.props.alerter.alert('error', 'error');
			console.log(err);
		});
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
						<form action="#" encType="multipart/form-data">
							<input 
								className="upload-input"
								type="file" 
								accept="image/*" 
								name="picture" 
								id="picture" 
								onChange={this.handleChange}
								/>
							<label htmlFor="picture" className="upload-button">
								<FontAwesome name="file-text" />
							</label>
						</form>
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