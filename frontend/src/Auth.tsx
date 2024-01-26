import {Card, CardHeader, CardBody, Divider, Image, Link, Input, Button} from "@nextui-org/react";
import React from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa6";
import {useFormik} from "formik";
import * as Yup from "yup";
import * as fetchUser from "./api/fetchUser.ts";
import {toast, Toaster} from "react-hot-toast";
import {redirect} from "react-router-dom";
import {userStore} from "./store/userStore.ts";
import {setCookie} from "./utils/cookie.ts";

export default function Auth() {
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {setIsLoggedIn} = userStore((state) => {
    return {
      setIsLoggedIn: state.setIsLoggedIn
    }
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
          .email("Invalid email address")
          .required("Required")
          .matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/),
      password: Yup.string()
          .required("Required")
          .min(6, "Password is too short - should be 6 chars minimum.")
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      if (isLogin) {
        const res = await fetchUser.login(values);
        const {data, status} = res;
        if (status === 200) {
          setCookie("token", data.token, 1);
          setCookie("email", data.email, 1);
          setIsLoggedIn(true);
          redirect("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const res = await fetchUser.register(values);
        const {data, status} = res;
        if (status === 201) {
          toast.success(data.message);
          setIsLogin(true);
          redirect("/");
        } else {
          toast.error(data.message);
        }
      }
      setIsLoading(false);
    }
  })
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }
  return (
      <div className="flex items-center justify-center w-full h-screen">
        <Toaster />
        <Card className="max-w-lg w-full">
          <CardHeader className="flex gap-3">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold">{isLogin ? "Login" : "Sign up"}</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody className="items-center py-10">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col gap-2 px-5 mb-2">
              <Input
                  fullWidth
                  isClearable={true}
                  name="email"
                  type="email"
                  label="Email"
                  variant="bordered"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onClear={() => formik.setValues({...formik.values, email: ""})}
              />
              {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger text-xs mb-3">{formik.errors.email}</div>
              ) : null}
              <Input
                  fullWidth
                  name="password"
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                          <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                          <FaEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger text-xs mb-3">{formik.errors.password}</div>
              ) : null}
              <Button
                  fullWidth
                  type="submit"
                  className="font-medium"
                  color="primary"
                  isLoading={isLoading}
              >
                {
                  isLoading ? "Loading" : isLogin ? "Login" : "Sign up"
                }
              </Button>
            </form>
            <p className="text-center text-xs text-black/50 dark:text-white/90">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link className="cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up" : "Login"}</Link>
            </p>
          </CardBody>
        </Card>
      </div>
  );
}
