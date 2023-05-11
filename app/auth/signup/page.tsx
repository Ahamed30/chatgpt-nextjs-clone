"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase";
import { EMAIL, NAME, PASSWORD } from "@/utils/constants";
import "./style.css";

const SignUp = () => {
  const router = useRouter();
  const [isEmailExist, setIsEmailExist] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const labelClasNames = "block text-sm font-medium leading-6 text-gray-900";
  const inputClassNames =
    "textBox w-full rounded-md px-1 py-1.5 text-gray-900 focus:outline-none sm:text-sm";
  const buttonClassNames =
    "button-primary h-[40px] flex w-auto m-auto justify-center items-center rounded-md px-10 py-2 text-sm font-semibold leading-6";
  const linkClassNames =
    "font-semibold leading-6 text-indigo-600 hover:text-indigo-500";

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Store user's name in the Firebase user profile
          const user = userCredential?.user;
          updateProfile(user, {
            displayName: name,
          });
          router?.push("/getApiKey");
        }
      );
    } catch (err) {
      setIsEmailExist(false);
      console.error("Sign Up Failed", err);
    }
  };

  const handleSignUp = useCallback(
    async (event: any) => {
      event.preventDefault();
      setIsLoading(true);
      const { email, password, name } = event?.target?.elements;
      signUp(email?.value, password?.value, name?.value);
      setIsLoading(false);
    },
    [router]
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: any) => {
    setPassword(event?.target?.value);
  };

  const notValidCredentialsContent = !isEmailExist && (
    <p className="text-center text-red-400">Email already exists.</p>
  );

  return (
    <>
      <div className="signUpContainer px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9 mb-5">
          Register new account
        </h2>
        {notValidCredentialsContent}
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-8"
            action="#"
            method="POST"
            onSubmit={handleSignUp}
          >
            <div>
              <label htmlFor={NAME} className={labelClasNames}>
                Name
              </label>
              <div className="mt-2">
                <input
                  id={NAME}
                  name={NAME}
                  type={NAME}
                  required
                  className={inputClassNames}
                />
              </div>
            </div>

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
                `Register`
              )}
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="login" className={linkClassNames}>
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
