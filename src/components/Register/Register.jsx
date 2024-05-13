import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useState } from "react";


export default function Register() {
  const [isLoading,setIsLoading] = useState(false)
  const {sendDataToSignup} = useContext(UserContext)
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")

  async function signup(values){
    setIsLoading(true)
    const response = await sendDataToSignup(values)
    if(response == "email is already exist"){
      setIsLoading(false);
      setMsg("email is already exist")
    }
    if (response.msg == "done") {
      setMsg("Done")
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }
  const validationSchema = Yup.object({
    name:Yup.string().required("username is required")
    .min(3,"username must be more than 3 charcters")
    .max(10,"username must be lass than 10 charcters"),
    email:Yup.string().email("Please inter a valid email").required("email is required"),
    password:Yup.string().required("Password is required").matches(/^[A-Z]/,"Password mast start with uppercase letter"),
    age:Yup.number().required("Age is required"),
    phone:Yup.string().required("Phone is required").matches(/^01[01235][0-9]{8}/,"Please inter a valid egyption phone number")
  
  })
  
  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      age:"",
      phone:""
    },
    validationSchema,
    onSubmit:async(values)=>{
      await signup(values)
    }
  })
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          {!msg ? (
            ""
          ) : msg == "Done" ? (
            <div className="alert h4 alert-success text-center">{msg}</div>
          ) : (
            <div className="alert h4 alert-danger text-center">{msg}</div>
          )}
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? <p className="error">{formik.errors.name}</p>:""}
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

            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.errors.age && formik.touched.age ? <p className="error">{formik.errors.age}</p>:""}

            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="phone"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone ? <p className="error">{formik.errors.phone}</p>:""}

            <button type="submit" className="btn btn-main">
            {isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:"Create account"}
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
