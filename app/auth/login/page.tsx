"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { AuthContext } from "@/context/Auth";
import "./style.css";

interface UserProps {
  isLoggedIn: boolean;
}

const Login = () => {
  const { isLoggedIn } = useContext(AuthContext) as UserProps;
  const router = useRouter();

  const handleLogin = useCallback(
    async (event: any) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        ).then(() => router.push("/"));
      } catch (err) {
        console.error("Login Failed", err);
      }
    },
    [router]
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return <></>;

  return (
    <>
      <div className="loginContainer px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9">
          Sign in to your account
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-8"
            action="#"
            method="POST"
            onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="textBox w-full rounded-md px-1 py-1.5 text-gray-900 focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="textBox w-full rounded-md px-1 py-1.5 text-gray-900 focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className=" button-primary flex w-auto m-auto justify-center rounded-md px-10 py-1.5 text-sm font-semibold leading-6"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            {`Don't have an account? `}
            <a
              href="signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register as new user
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
