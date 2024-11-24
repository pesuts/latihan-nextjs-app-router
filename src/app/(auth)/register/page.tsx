"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  useEffect(() => {
    if (isPasswordShow) {
      setTimeout(() => {
        setIsPasswordShow(false);
      }, 5000);
    }
  }, [isPasswordShow]);

  useEffect(() => {
    if (isMessageVisible) {
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 10000);
    }
  }, [isMessageVisible]);

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const data = {
      fullname: event.currentTarget.fullname.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    const res = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      setIsLoading(false);
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        // callbackUrl: "/dashboard",
      });
      router.push("/dashboard");
    } else {
      setIsMessageVisible(true);
      setMessage("Email already in use!");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto h-screen flex items-center">
      <div className="w-11/12 bg-white shadow-md border mx-auto border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h3>
          {message && (
            <div
              className={`py-2 text-center bg-red-500 text-white rounded-md 
            ease-in duration-500 relative ${isMessageVisible ? "" : "hidden"}`}
            >
              {message}
              <button
                onClick={() => {
                  setIsMessageVisible(false);
                }}
                className="absolute top-0 right-0 hover:text-red-800 rounded-full p-[2px] px-[10px] cursor-pointer"
              >
                x
              </button>
            </div>
          )}
          <div>
            <label
              htmlFor="fullname"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Full name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your password
            </label>
            <div className="relative">
              <input
                type={isPasswordShow ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <span
                className="absolute top-3.5 right-4 cursor-pointer"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled
            disabled:bg-black/60`}
          >
            {isLoading ? "Loading..." : "Create Account"}
          </button>
          <div className="my-0 py-0 relative border border-1">
            {/* <hr /> */}
            <div className="absolute -top-3 w-full flex justify-center">
              <span className="px-2 bg-white inline-block text-slate-500">
                or
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: false,
              })
            }
            disabled={isLoading}
            className="w-full text-blue-700 outline outline-blue-700 outline-1 bg-white hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <div className="flex items-center justify-center gap-2">
              <FcGoogle size={20}/>
              <p>Login With Google</p>
            </div>
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
