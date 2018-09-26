import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Header} from './Header'; 
import {Login} from './Login';
import {Register} from './Register';
import {ProductList} from './ProductList';
import {BuyerList} from './BuyerList';
import {Alert} from './Alert';
import '../styles/css/app.css';

class App extends React.Component {

   constructor(props){
		super(props);
		this.state = {
			products: [],
			buyers: [],
			authenticated: false
		};

		this.updateProduct = this.updateProduct.bind(this);
		this.updateBuyer = this.updateBuyer.bind(this);
		this.setOwner = this.setOwner.bind(this);
		this.addProduct = this.addProduct.bind(this);
		this.addBuyer = this.addBuyer.bind(this);
		this.removeProduct = this.removeProduct.bind(this);
		this.removeBuyer = this.removeBuyer.bind(this);
		this.computeBuyerTotal = this.computeBuyerTotal.bind(this);
		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
		this.alerter = undefined;
   }

	componentDidMount(){
		console.log(this.alerter);
		fetch('/api/init')
		.then(response => response.json())
		.then(data => {
			this.setState(data);
			console.log(data);
		})
		.catch(err => console.log(err));
	}

   updateProduct(product, index){
		let products = this.state.products;
		products[index] = product;
		this.setState({products});
   }

   updateBuyer(buyer, index){
		let buyers = this.state.buyers;
		buyers[index] = buyer;
		this.setState({buyers});
   }

   logIn(){
	   this.setState({authenticated: true});
   }

   logOut(){
	   this.setState({authenticated: false});
   }

   setOwner(index){
		let buyers = this.state.buyers;
		for(let buyer of buyers){
			buyer.owner = false;
		}
		buyers[index].owner = true;
		this.setState({buyers})
   }

   removeProduct(index){
		let products = this.state.products;
		products = products.slice(0, index).concat(products.slice(index + 1));
		let buyers = this.state.buyers;
		buyers = buyers.map((buyer) => {
			let updatedProducts = buyer.products;
			updatedProducts = updatedProducts.slice(0, index).concat(updatedProducts.slice(index + 1));
			buyer.products = updatedProducts;
			return buyer;
		})
		this.setState({products, buyers});
   }

	removeBuyer(index) {
		let buyers = this.state.buyers;
		buyers = buyers.slice(0, index).concat(buyers.slice(index + 1));
		this.setState({
			buyers
		});
	}

	addProduct() {
		let updatedProducts = this.state.products.concat({
			name: 'produs',
			price: '0.00'
		});
		let updatedBuyers = this.state.buyers;
		updatedBuyers = updatedBuyers.map((buyer) => {
			let updatedProducts = buyer.products.concat([1]);
			buyer.products = updatedProducts;
			return buyer;
		});
		this.setState({
			products: updatedProducts,
			buyers: updatedBuyers
		});
	}

   	addBuyer(){
		let updatedBuyers = this.state.buyers;
		const buyerProducts = this.state.products.map((product) => 1);
		let buyerName = 'El';
		let newBuyer = {
			name: buyerName,
			products: buyerProducts,
			owner: false
		};
		updatedBuyers = updatedBuyers.concat(newBuyer);
		this.setState({
			buyers: updatedBuyers
		});
   }

	computeBuyerTotal(index){
		const total = this.state.products.map((product, i) => {
			//if buyer did not contribute to current product, skip it
			if(this.state.buyers[index].products[i] === 1){
				let contributors = 0;
				//compute number of contributors
				for(let buyer of this.state.buyers)
				contributors += buyer.products[i];
				return product.price / contributors;
			}else{
				return 0;
			}
		}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return total.toFixed(2);
	}

	render() {
		return (
		<Router>
			<div className="app">
				<Header authenticated={this.state.authenticated} />
				<section className="content-section">
					<Route exact path="/login" render={()=>(
						<div className="container">
							<Login authenticated={this.state.authenticated} onLogIn={this.logIn} alerter={this.alerter} />
						</div>
					)} />
					<Route exact path="/register" render={()=>(
						<div className="container">
							<Register authenticated={this.state.authenticated} onRegister={this.logIn} alerter={this.alerter} />
						</div>
					)} />
					<Route exact path="/" render={()=> (
						<div className="container">
							<div className="products-container">
								<ProductList products={this.state.products} onChange={this.updateProduct} onAdd={this.addProduct} onRemove={this.removeProduct} alerter={this.alerter} />
							</div>
							<div className="buyers-container">
								<BuyerList buyers={this.state.buyers} onChange={this.updateBuyer} onOwnerChange={this.setOwner} onAdd={this.addBuyer}
								onRemove={this.removeBuyer} computeTotal={this.computeBuyerTotal} />
							</div>
						</div>
					)} />
				</section>
				<Alert ref={(ref) => {this.alerter = ref}} />
			</div>
		</Router>
      	);
   	}
}

export default App;
