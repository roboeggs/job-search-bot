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
                if (res.ok) {
                    
                    return res.json();
                  }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            
            })
            .then((data) => {
                console.log('data=', data);
                messageLod(res.message);
                // navigate("/board");
            })
            .catch((err) => {
                messageLod('invalid password or login');
                console.log(err);
            
            });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        postLoginDetails();
        // console.log({ email, password });
        setPassword("");
        setEmail("");
    };

    const gotoSignUpPage = () => navigate("/register");
    

    return (
        <>  
            <form className='flex flex-col text-white' onSubmit={handleSubmit}>
                <h2 className="text-5xl my-3.5 text-center">Login </h2>
                <label className='font-bold' htmlFor='email'>Email</label>
                <input
                    className="px-3 text-black rounded-lg my-1.5 w-56 h-8"
                    type='text'e
                    id='email'
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className='font-bold' htmlFor='password'>Password</label>
                <input
                    className="px-3 text-black rounded-lg my-1.5 w-56 h-8"
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
                <button className='rounded-lg bg-indigo-700 my-1.5 w-24 h-9'>SIGN IN</button>
                <p>
                    Don't have an account?{" "}
                    <span className='' onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </>
    );
};

export default Login;