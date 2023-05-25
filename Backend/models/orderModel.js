const Order = require('../schemas/orderSchema')
const Status = require('../schemas/statusSchema')
// GET ALL ORDERS
exports.getOrders = async (req, res) => {
    try {
      const order = await Order.find({ user: req.userData._id })
      .populate({ path: 'orderRows.product', model: 'Product' })
      .populate('status', 'status -_id')        //populates only status inside of status
      .exec();
      res.status(200).json(order)

    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong when fetching the orders',
        err: err.message
      })
    }
  }
  // CREATE NEW ORDER
  exports.createNewOrder = async (req, res) => {
    const { orderRows } = req.body;
  
    if(!orderRows) {
      return res.status(400).json({
        message: 'You need to enter orderRows'
      })
    }
    try {
      const order = await Order.create({
        orderRows,
        user: req.userData._id
      })
      res.status(201).json(order)
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong when creating the order',
        err: err.message
      })
    }
  }
  // UPDATE ORDER STATUS
  exports.updateOrderStatus = (req,res) => {
    const { status } = req.body;
    if(!status){
        res.status(400).json({
            message: 'You need to enter a new status!'
        })
        return
    }
    if(status !== 1 && status !== 2 && status !== 3){
      res.status(400).json({
          message: 'You need to enter a valid status!'
      })
      return
  }
    Order.findByIdAndUpdate(req.params.id, { status }, {new: true})
    .then(data => {
        if(!data){
            res.status(404).json({
                message: 'That id does not correspond to any existing order.'
            })
            return
        }
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json({
            message: 'Something went very, very wrong when updating order status.',
            err: err.message
        })
    })
}