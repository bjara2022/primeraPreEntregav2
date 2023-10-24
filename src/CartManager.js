import fs from 'fs';
import { productManager } from './ProductManager.js';

class CartManager {
	constructor(path) {
		this.path = path;

		if (!this.path) {
		this.path = './src/carts.json';
		fs.writeFileSync(this.path, JSON.stringify([]));
	}
		console.log("aca estoy")
	}
	#cid= 0;

	async getCarts() {
		try {
		  const cartList = await fs.promises.readFile(this.path, "utf-8");
		  if (!cartList) {
			await fs.promises.writeFile(this.path, JSON.stringify([]));
			return [];
		  }
		  return JSON.parse(cartList);
		} catch (e) {
		  console.log("Error al acceder al archivo", e);
		}
	  }

	async getCartById (cid) {
        try {
            const cartList = await this.getCarts();
            const find = cartList.find((cart)=>cart.id === cid)
            if (find){
                console.log ("Id encontrado con exito")
                return find
            }else {
                console.log(`ID ${cid} no definido`);
				return 'Intente con otra ID';
            }
            
        } catch (e) {
            console.log("Id del carrito no encontrado", e)            
        }
    }
	#incrementId() {
		this.#cid++;
	   return this.#cid;
	 }  
	async addToCart(newCart) {
		try {
			const { products } = newCart;
			if (!products) return console.error('Falta el elemento products');
			const cartsList = await this.getCarts();
			const id = this.#incrementId();
			cartsList.push({
				id,
				products: [],
			});
			await fs.promises.writeFile(this.path, JSON.stringify(cartsList));
			console.log(`El carrito fue agregado satisfactoriamente`);
			return;
		} catch (e) {
            console.log("No se pudo agregar el producto", e)            
        }
			return;
		}
	async addProductToCart(cartId, productId) {
			try {
				const cart = await this.getCartById(cartId);
				const product = await productManager.getProductById(productId);
				const cartsList = await this.getCarts();
				const cartsListN = cartsList.filter(
					(cart) => cart.id !== cartId
				);
				if (cart.products.some((product) => product.id === productId)) {
					let productExist = cart.products.find(
						(product) => product.id === productId
					);
					productExist.quantity++;
					let cartsListUpdated = [cart, ...cartsListN];
					await fs.promises.writeFile(
						this.path,
						JSON.stringify(cartsListUpdated)
					);
					console.log('Carrito actualizado');
					return;
				}
	
				cart.products.push({ id: product.id, quantity: 1 });
				let cartsListUpdated = [cart, ...cartsListN];
				await fs.promises.writeFile(
					this.path,
					JSON.stringify(cartsListUpdated)
				);
	
				console.info('Producto agregado ok');
				return;
			} catch (e) {
				console.log("No se pudo agregar el producto al carrito", e)            
			}
				return;
			}
}

export const cartManager = new CartManager('./src/carts.json');





      