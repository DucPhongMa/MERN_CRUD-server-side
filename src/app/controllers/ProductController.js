const Product = require('../models/Product')

class ProductController{

    index(req, res, next){
        Product.find({})
             .then(products => res.status(201).json(products))
             .catch(err => {
                res.status(500).json({
                    error: err
                })
             })
     }

     details(req, res, next){

         Product.findOne({_id: req.params.id})
         .exec()
         .then(product => {
            if(product)
                res.status(200).json(product)
            else
                res.status(404).json({
                   message: 'No valid entry found for provided ID'
                })
         }
          
         )
         .catch(err => {
            res.status(404).json({
                error: err
            })
         })
     }

     create(req, res, next){
        console.log(req.file)
        const formData = req.body;
        formData.Image = req.file.originalname;
        const product = new Product(formData);
        product.save()
                .then(result => {
                    res.status(201).json({
                        message: "Handling POST requests to /products",
                        createdProduct: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                 })
       
    }

    remove(req, res, next){
        Product.deleteOne({_id: req.params.id})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
             })
     }

     update(req, res, next){
        const formData = req.body;
        formData.Image = req.file.originalname;
        Product.updateOne({_id: req.params.id}, formData)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
             })
     }

}

module.exports = new ProductController;