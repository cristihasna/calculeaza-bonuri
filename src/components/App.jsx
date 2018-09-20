import React from 'react';
import {Header} from './Header'; 
import {ProductList} from './ProductList';
import {BuyerList} from './BuyerList';
import '../styles/css/app.css';

class App extends React.Component {

   constructor(props){
      super(props);
      this.state = {
         products : [
            {
               name: 'produs',
               price: '0.00'
            }
         ],
         buyers: [
            {
               name: 'Eu',
               products: [1],
               owner: true
            },
            {
               name: 'Tu',
               products: [1],
               owner: false
            }
         ]
      };

      this.updateProduct = this.updateProduct.bind(this);
      this.updateBuyer = this.updateBuyer.bind(this);
      this.setOwner = this.setOwner.bind(this);
      this.addProduct = this.addProduct.bind(this);
      this.addBuyer = this.addBuyer.bind(this);
      this.removeProduct = this.removeProduct.bind(this);
      this.removeBuyer = this.removeBuyer.bind(this);
      this.computeBuyerTotal = this.computeBuyerTotal.bind(this);
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

   removeBuyer(index){
      let buyers = this.state.buyers;
      buyers = buyers.slice(0, index).concat(buyers.slice(index + 1));
      this.setState({buyers});
   }

   addProduct(){
      let updatedProducts = this.state.products.concat({name: 'produs', price: '0.00'});
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
         <div className="app">
            <Header />
            <section className="content-section">
               <div className="container">
                  <div className="products-container">
                     <ProductList 
                        products={this.state.products} 
                        onChange={this.updateProduct}
                        onAdd={this.addProduct} 
                        onRemove={this.removeProduct} />
                  </div>
                  <div className="buyers-container">
                     <BuyerList
                        buyers={this.state.buyers}
                        onChange={this.updateBuyer}
                        onOwnerChange={this.setOwner}
                        onAdd={this.addBuyer}
                        onRemove={this.removeBuyer}
                        computeTotal={this.computeBuyerTotal}
                        />
                  </div>  
               </div>
            </section>
         </div>
      );
   }
}

export default App;
