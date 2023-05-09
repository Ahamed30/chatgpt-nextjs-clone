"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import "./style.css";

const SignUp = () => {
  const router = useRouter();

  const handleSignUp = useCallback(async (event: any) => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      ).then(() => router.push("/"));
    } catch (err) {
      console.error("Sign Up Failed", err);
    }
  }, []);

  return (
    <>
      <div className="signUpContainer px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9">
          Register new account
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-8"
            action="#"
            method="POST"
            onSubmit={handleSignUp}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="textBox w-full rounded-md px-1 py-1.5 text-gray-900 focus:outline-none sm:text-sm"
                />
              </div>
            </div>

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
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
