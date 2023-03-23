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
      
  
      fetch('http://localhost:9000/api/register', requestOptions)
        .then((res) => {
          res.json();
          if(res.status === 201){
            navigate("/users");
          }
          console.log(res.message);
        })
  
       
    };
    const navigate = useNavigate();
    const gotoLoginPage = () => navigate("/");
    return (
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="form-name">Your name?</label>
        <input id="form-name"
          {...register("name", { required: true })}
          placeholder="Ilon"
        />
  
        <label htmlFor="form-email">Email</label>
        <input id="form-email"
          {...register("email", { minLength: 1 })}
          placeholder="@gmail.com"
        />
        
        <label htmlFor="form-password">Password</label>
        <input id="form-password" type="password"
          {...register("password", { minLength: 1 })}
          placeholder="password"
        />
        <button type="submit">submit</button>
        <p>
            Already have an account?{" "}
            <span type='Login' onClick={gotoLoginPage}>
                Login
            </span>
                
        </p>
      </form>
    );
}