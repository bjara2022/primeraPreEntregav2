import { Router } from 'express';
import { productManager } from '../ProductManager.js';
const productRouter = Router();



productRouter.get('/', async (req, res) => {
	try {
		let limit = req.query.limit;
		let productList = await productManager.getProducts();

		if (limit) {
			const productsLimited = productList.slice(0, limit);
			return res.send({ productsLimited });
		}

		return res.send({ productList });
	} catch (error) {
		return res.send(`Error: ${error}`);
	}
});

productRouter.get('/products/:pid', async (req, res) => {
	try {
        let id = parseInt(req.params.pid);
        let pid = await productManager.getProductById(id);
        if(pid){
            return res.send(pid)
        }else{ 
            return res.send("Id de producto no encontrado")
        }
		
	} catch (error) {
		return res.send(`Error: ${error}`);
	}
});

productRouter.post('/', async (req, res) => {
	try {
		let newProduct = req.body;
		return res.send(await productManager.addProduct(newProduct));
	} catch (error) {
		return res.send(`Error en servidor: ${error}`);
	}
});

productRouter.put('/:pid', async (req, res) => {
	try {
		let pid = parseInt(req.params.pid);
		const updatedProduct = req.body;

		return res.send(await productManager.updateProduct(pid, updatedProduct));
	} catch (error) {
		return res.send(`Error en servidor: ${error}`);
	}
});
productRouter.delete('/:pid', async (req, res) => {
	try {
		let pid = parseInt(req.params.pid);
		return res.serd(await productManager.deleteProduct(pid));
	} catch (error) {
		return res.send(`Error interno del servidor: ${error}`);
	}
});


export { productRouter };