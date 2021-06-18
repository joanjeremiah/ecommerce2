import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import UserModel from '../../../Models/User';
import bcrypt from 'bcrypt';

export default NextAuth({
  
  providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      Providers.Credentials({
        name: 'Registered Email',
        credentials: {
          email: { label: "Email id", type: "email", placeholder: "Eg: johndoe@abc.com" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials) {
          let check;
          const userDetails = await UserModel.findOne({email: credentials.email});
          if(!userDetails){
            return null
          }
          const checkPassword = await bcrypt.compare(credentials.password,userDetails.password)
          if(!checkPassword){
            return null
          }
          console.log(userDetails.image);
          return {
            name: userDetails.name,
            email: userDetails.email,
            image: userDetails.image
          }
        }
      })
    ]
})

