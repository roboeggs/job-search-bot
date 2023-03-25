import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const messageLod = (e) => setErrorMessage(e);;
    const postLoginDetails = () => {
        fetch("http://localhost:9000/api/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                res.json();
                if(res.status === 102){
                    // navigate("/users");
                    messageLod('invalid password or login');
                }
                else{
                    messageLod(res.message);
                    console.log('my 102')
                }
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        postLoginDetails();
        console.log({ email, password });
        setPassword("");
        setEmail("");
    };

    const gotoSignUpPage = () => navigate("/register");
    

    return (
        <div className='login__container'>
                
            <form className='registerForm' onSubmit={handleSubmit}>
                <h2>Login </h2>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={1}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && 
                (<p className="error"> {errorMessage} </p>
                )}
                <button className='loginBtn'>SIGN IN</button>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;