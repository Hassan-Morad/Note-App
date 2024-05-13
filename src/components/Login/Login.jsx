import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { useFormik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useState } from "react";
import { useEffect } from "react";


export default function Login() {
  const [isLoading,setIsLoading] = useState(false)
  const {sendDataToLogin,setToken,token} = useContext(UserContext)
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")

  async function login(values){
    setIsLoading(true)
    const response = await sendDataToLogin(values)
    setIsLoading(false)
    if (response == "invalid password" || "email not exist") {
      setIsLoading(false)
      setMsg(response)
        
       }
    if (response.msg === "done") {
      localStorage.setItem("token", `3b8ny__${response.token}`);
      setToken(`3b8ny__${response.token}`);
      setMsg("Done")
      setTimeout(()=>{
        navigate("/")
      },2000)  
    }
  }


  
  const validationSchema = Yup.object({
    email:Yup.string().email("Please inter a valid email").required("email is required"),
    password:Yup.string().required("Password is required").matches(/^[A-Z]/,"Password mast start with uppercase letter"),
  })
  
  const formik = useFormik({
    initialValues:{ 
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:login
  })

  return (
    <section className="min-vh-100  d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          {!msg ? (
            ""
          ) : msg == "Done" ? (
            <div className="alert h4 alert-success text-center">{msg}</div>
          ) : (
            <div className="alert h4 alert-danger text-center">{msg}</div>
          )}
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? <p className="error">{formik.errors.email}</p>:""}
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? <p className="error">{formik.errors.password}</p>:""}

            <button type="submit" className="btn btn-main">
                {isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:"Login"}
            </button>
            <p>
              You don't have account yet ?
              <Link to="/register" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
