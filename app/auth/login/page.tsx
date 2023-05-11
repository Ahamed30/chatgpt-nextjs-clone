"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { AuthContext } from "@/context/Auth";
import { IUser } from "@/types/User";
import { EMAIL, PASSWORD } from "@/utils/constants";
import "./style.css";

const Login = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext) as IUser;
  const [isCredentialsValid, setIsCredentialsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const labelClasNames = "block text-sm font-medium leading-6 text-gray-900";
  const inputClassNames =
    "textBox w-full rounded-md px-1 py-1.5 text-gray-900 focus:outline-none sm:text-sm";
  const buttonClassNames =
    "button-primary h-[40px] flex w-auto m-auto justify-center items-center rounded-md px-10 py-2 text-sm font-semibold leading-6";
  const linkClassNames =
    "font-semibold leading-6 text-indigo-600 hover:text-indigo-500";

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        await signInWithEmailAndPassword(auth, email, password).then(() =>
          router?.push("/getApiKey")
        );
      } catch (err) {
        setIsCredentialsValid(false);
        console.error("Login Failed", err);
      }
    },
    [router]
  );

  const handleLogin = useCallback(
    async (event: any) => {
      event.preventDefault();
      setIsLoading(true);
      const { email, password } = event?.target?.elements;
      signIn(email?.value, password?.value);
      setIsLoading(false);
    },
    [signIn]
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: any) => {
    setPassword(event?.target?.value);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const isApiKeyRecieved = localStorage?.getItem("isApiKeyRecieved");
      if (!isApiKeyRecieved) router?.push("/getApiKey");
      else router?.push("/");
    }
  }, [isLoggedIn, router]);

  const notValidCredentialsContent = !isCredentialsValid && (
    <p className="text-center text-red-400">Email and Password is invalid.</p>
  );

  if (isLoggedIn) {
    <div>Redirecting...</div>;
  }

  return (
    <>
      <div className="loginContainer px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9 mb-5">
          Sign in to your account
        </h2>
        {notValidCredentialsContent}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-8"
            action="#"
            method="POST"
            onSubmit={handleLogin}
          >
            <div>
              <label htmlFor={EMAIL} className={labelClasNames}>
                Email address
              </label>
              <div className="mt-2">
                <input
                  id={EMAIL}
                  name={EMAIL}
                  type={EMAIL}
                  autoComplete={EMAIL}
                  required
                  className={inputClassNames}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor={PASSWORD} className={labelClasNames}>
                  Password
                </label>
                <button
                  type="button"
                  className={labelClasNames}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mt-2">
                <input
                  id={PASSWORD}
                  name={PASSWORD}
                  type={showPassword ? "text" : PASSWORD}
                  value={password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className={inputClassNames}
                />
              </div>
            </div>

            <button type="submit" className={buttonClassNames}>
              {isLoading ? (
                <Image
                  src="/three-dot-loader.gif"
                  width={35}
                  height={35}
                  alt="Loading"
                />
              ) : (
                `Sign in`
              )}
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            {`Don't have an account? `}
            <a href="signup" className={linkClassNames}>
              Register as new user
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
