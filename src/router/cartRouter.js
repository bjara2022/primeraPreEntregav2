import { Router } from 'express';
import { cartManager } from '../CartManager.js';
const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
	try {
		let cartList = await cartManager.getCarts();
		return res.send({ cartList });
	} catch (error) {
		return res.send(`Error: ${error}`);
	}
});

cartRouter.get('/:cid', async (req, res) => {
	try {
		let { cid } = req.params;
		cid = parseInt(cid);
		const cart = await cartManager.getCartById(cid);

		if (cart) {
			return res.send(cart);
		} else {
			return res.send({ error: 'Carrito no encontrado' });
		}
	} catch (e) {
		console.log('No se pudo agregar el producto', e);
	}
	return;
});

cartRouter.post('/', async (req, res) => {
	try {
		let newCart = req.body;
		return res.send(await cartManager.addToCart(newCart));
	} catch (error) {
		return res.send(`Error interno del servidor: ${error}`);
	}
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
	try {
		let { cid } = req.params;
		cid = parseInt(cid);
		let { pid } = req.params;
		pid = parseInt(pid);

		return res.send(await cartManager.addProductToCart(cid, pid));
	} catch (error) {
		return res.send(`Error interno del servidor: ${error}`);
	}
});

export { cartRouter };