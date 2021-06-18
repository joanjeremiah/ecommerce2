import multer from 'multer';

import dbConnect from '../../../middleware/dbconnect';
import productModel from '../../../Models/Product';

export default async (req,res) => {
    await dbConnect();
    console.log(req.body);
    const details = req.body;
    const newProduct = new productModel({...details})
    newProduct.save()
    .then(d => {
        console.log(d);
        return res.json({msg: 'The product has been successfully added.'})
    })
}

export const config = {
    api: {
        bodyParser: true
    }   
}