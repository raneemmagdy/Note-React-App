import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
import image from'../../Assets/notesBlack.png'
export default function Signup() {
 let navigate=useNavigate()
 let [loading,setLoading]=useState(false)
 let[errMsg,setErrMsg]=useState('')

  async function registerData(values) {
   try {
    let {data}= await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values)
    console.log(data)
    setLoading(true)
    if(data.msg==='done'){
      console.log(data.user)
      navigate('/signin')
      setLoading(false)
    }
   } catch (error) {
    console.log(error.response.data.msg)
    setErrMsg(error.response.data.msg)
    
   }
    
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "Name must be more than 4 characters.")
      .required(),
    email: Yup.string().email("Enter a valid email").required(),
    age: Yup.number().min(10, "Age must be above 10 years old."),
    password: Yup.string().min(6,'Password must be at least 6 characters.').max(11,'Password must be less than 12 characters.').required(),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'Enter a valid mobile number.').required()
  });

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: (values) => {
      registerData(values);
    },
    validationSchema,
  });
  if(loading)return<Loading/>
  return (
    <div className="register">
      <li className='fixed-top d-flex w-100 me-auto ps-5' >
                    <div>
                        <img src={image} width={"30%"} alt="note" />
                    </div>
                </li>
      <div className="container  text-center">
       <div className="row ">
       <div className="ms-5 col-md-4 my-5 bg-secondary p-3 shadow shadow-lg rounded-2 bg-info-subtle " >
        <form onSubmit={register.handleSubmit}>
          <h1>SignUp Now !</h1>
          {errMsg? <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger" role="alert">
              {errMsg}
            </div>:""}
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.name}
            type="text"
            name="name"
            placeholder="userName"
            className="form-control my-3"
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger" role="alert">
              {register.errors.name}
            </div>
          ) : (
            ""
          )}
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.email}
            type="email"
            name="email"
            placeholder="userEmail"
            className="form-control my-3"
          />

          {register.errors.email && register.touched.email ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger" role="alert">
              {register.errors.email}
            </div>
          ) : (
            ""
          )}
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.password}
            type="password"
            name="password"
            placeholder="userPassword"
            className="form-control my-3"
          />

          {register.errors.password && register.touched.password ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger" role="alert">
              {register.errors.password}
            </div>
          ) : (
            ""
          )}
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.age}
            type="number"
            name="age"
            placeholder="userAge"
            className="form-control my-3"
          />
          {register.errors.age && register.touched.age ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger" role="alert">
              {register.errors.age}
            </div>
          ) : (
            ""
          )}
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.phone}
            type="text"
            name="phone"
            placeholder="userPhone"
            className="form-control my-3"
          />
          {register.errors.phone && register.touched.phone ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger" role="alert">
              {register.errors.phone}
            </div>
          ) : (
            ""
          )}
          <button type="submit" className='fw-semibold text-black btn btn-info w-50 float-end mt-2 ' disabled={!(register.isValid&& register.dirty)}>
            SignUp
          </button>
        </form>
        <div className='ms-2'>
                                        <p className='pt-2'>Have already an account? <Link className='ms-1 text-decoration-underline fw-bold text-info rounded-2' to='/signin'>Login</Link> </p>
                                    </div>
        </div>
       </div>
      </div>
    </div>
  );
}
