const router = require('express').Router()
const orderModel = require('../models/orderModel')
const auth = require('../authentication/auth')

router.get('/', auth.verifyToken, orderModel.getOrders)   //GET api/orders/ - Gets orders the logged in user has created
router.post('/', auth.verifyToken, orderModel.createNewOrder)  //POST api/orders/ - Create a new order if logged in
router.put('/:id', auth.verifyToken, orderModel.updateOrderStatus) //PUT - /api/orders/id Updates order status  JSON: "status": 1

module.exports = router

/*JSON example POST =
{
    "orderRows": [
    {
    "product": "642f00d953095de28fce2e29",
    "quantity": 11
    },
    {
    "product": "642f01ca53095de28fce2e2c",
    "quantity": 11
    }
    ]
}
*/