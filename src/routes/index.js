const productRouter = require('./products');
const userRouter = require('./user')

function route(app){

   app.use('/products', productRouter)
   app.use('/users', userRouter)
}

module.exports = route;