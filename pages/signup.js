import { signIn } from "next-auth/client";
import {useState,useRef} from 'react';

const UserForm = () => {
    const [userDetails,setUserDetails] = useState({type: 'customer'});
    const [msg,setMsg] = useState('');
    const message = useRef(null);
    const onInputChange = (e) => {
        setUserDetails({...userDetails,[e.target.name]: e.target.value})
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(userDetails)
        const response = await fetch('/api/user/create',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        const res = await response.json();
        console.log(response,res)
        if(res.msg){
            setMsg(res.msg)
            if(message && message.current){
                message.current.style.transform = 'translateX(0)';
                setTimeout(() => {
                message.current.style.transform = 'translateX(100%)';
                },3000)
            }
          }
    }
    return(
        <div className="create-account-form-container">
            <p ref={message} className="message">{msg}</p>
            <form className="create-account-form" onSubmit={onFormSubmit}>
                <input onChange={onInputChange} type="text" placeholder="Name" name="name" required />
                <input onChange={onInputChange}  type="email" placeholder="Email id" name="email" required  />
                <input onChange={onInputChange} type="password" placeholder="Password" name="password" required  />
                <input onChange={onInputChange} type="text" placeholder="Profile picture source" name="image" className="custom-img-input" required  />
                <select onChange={onInputChange} name="type">
                    <option value="customer">Customer</option>
                    <option value="owner">Shop Owner</option>
                </select>
                <input type="submit" value="Sign Up" />
                <p>Already have an account? <a onClick={() => signIn()}>Sign in</a></p>
            </form>
        </div>
    );
}

export default UserForm;