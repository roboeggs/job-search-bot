import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup () {
    const { register, handleSubmit } = useForm({
      defaultValues: {
        name: "",
        email: "",
        password: ""
      }
    });
    
    const onSubmit = (data) => {
      console.log(data);
      console.log('send');
      const requestOptions = {
        method: 'POST',
  
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      
  
      fetch('http://localhost:9000/api/registration', requestOptions)
      .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to authenticate user');
          }
          return response.json();
        })
        .then((data) => {
          const jwtToken = data.jwtToken;
          localStorage.setItem('jwtToken', jwtToken);
          console.log(`Authenticated user with JWT token ${jwtToken}`);
          navigate("/board");
        })
        .catch((error) => console.error(error));
  
       
    };
    const navigate = useNavigate();
    const gotoLoginPage = () => navigate("/");
    return (
      <form className="flex flex-col text-white" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-5xl my-3.5 text-center">Signup</h2>
        <label className="font-bold" htmlFor="form-name">Your name?</label>
        <input id="form-name"
          className="px-3 text-black rounded-lg my-1.5 w-56 h-8"
          {...register("name", { required: true })}
          placeholder="Ilon"
        />
  
        <label className="font-bold" htmlFor="form-email">Email</label>
        <input id="form-email"
          className="px-3 text-black rounded-lg my-1.5 w-56 h-8"
          {...register("email", { minLength: 1 })}
          placeholder="@gmail.com"
        />
        
        <label className="font-bold" htmlFor="form-password">Password</label>
        <input id="form-password" type="password"
          className="px-3 text-black rounded-lg my-1.5 w-56 h-8"
          {...register("password", { minLength: 1 })}
          placeholder="password"
        />
        <button className='rounded-lg bg-indigo-700 my-1.5 w-24 h-9' type="submit">Submit</button>
        <p>
            Already have an account?{" "}
            <span type='Login' onClick={gotoLoginPage}>
                Login
            </span>
                
        </p>
      </form>
    );
}