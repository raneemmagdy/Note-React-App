import React, { useState } from "react";
import Loading from "../Loading/Loading";
import image from "../../Assets/notesBlack.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Signin() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let[errMsg,setErrMsg]=useState('')
  async function LoginData(values) {
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      console.log(data);
      setLoading(true);
      if (data.msg === "done") {
        localStorage.setItem("token", data.token);
        navigate("/home");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      setErrMsg(error.response.data.msg)
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required(),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .max(11, "Password must be less than 12 characters.")
      .required(),
  });

  let register = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      LoginData(values);
    },
    validationSchema,
  });
  if (loading) return <Loading />;
  return (
    <div className="register">
      <li className="fixed-top d-flex w-100 me-auto ps-5">
        <div>
          <img src={image} width={"30%"} alt="note" />
        </div>
      </li>
      <div className="container  text-center">
        <div className="row ">
          <div className="ms-5 col-md-4 my-5 bg-secondary p-3 shadow shadow-lg rounded-2 bg-info-subtle ">
            <form onSubmit={register.handleSubmit}>
              <h1>SignIn Now !</h1>
              {errMsg? <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger" role="alert">
              {errMsg}
            </div>:""}
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
                <div
                  className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger"
                  role="alert"
                >
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
                <div
                  className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger"
                  role="alert"
                >
                  {register.errors.password}
                </div>
              ) : (
                ""
              )}
           
              <button
                type="submit"
                className="fw-semibold text-black btn btn-info w-50 float-end mt-2 "
                disabled={!(register.isValid && register.dirty)}
              >
                SignIn
              </button>
            </form>
            <div className="ms-2">
              <p className="pt-2">
              Don't have an account?{" "}
                <Link
                  className="ms-1 text-decoration-underline fw-bold text-info rounded-2"
                  to="/signup"
                >
                  SignUp
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
