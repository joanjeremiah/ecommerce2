
import dbConnect from '../../../middleware/dbconnect';
import UserModel from '../../../Models/User';
import bcrypt from 'bcrypt';

export default async (req,res) => {
    await dbConnect();
    const details = req.body;
    console.log(details);
    const password = await bcrypt.hash(details.password,8);
    const doc = await UserModel.findOne({email: details.email})
    if(doc){
        return res.status(400).json({msg: 'Email is already registerd'})
    }
    const newUser = new UserModel({
        ...details,
        password
    })
    const user = await newUser.save()
    res.status(200).json({msg: 'User is successfully registered'})
    
}

export const config = {
    api: {
        bodyParser: true
    }
    
}