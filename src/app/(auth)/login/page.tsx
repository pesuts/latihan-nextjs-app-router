"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function LoginPage({searchParams}: any) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  const callbackUrl = searchParams.callbackUrl || "/";

  useEffect(() => { 
    if (isPasswordShow) { 
      setTimeout(() => { 
        setIsPasswordShow(false)
      }, 5000)
    }
  }, [isPasswordShow])

  useEffect(() => { 
    if (isMessageVisible) { 
      setTimeout(() => { 
        setIsMessageVisible(false)
      }, 10000)
    }
  }, [isMessageVisible])

  const handleLogin = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const data = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        router.push(callbackUrl);
      } else {
        setIsLoading(false);
        setIsMessageVisible(true);
        setMessage("Login failed!");
      }
    } catch (error) {
      setMessage("Login failed!");
      // setMessage(error);
      // console.log(error);
    }
    // console.log(res);
    // fetch("api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    // setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto h-screen flex items-center">
      <div className="w-11/12 bg-white shadow-md border mx-auto border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
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
              <span className="absolute top-3.5 right-4 cursor-pointer"
              onClick={() => setIsPasswordShow(!isPasswordShow)}>
                {isPasswordShow ? <FaEyeSlash /> : <FaEye />} 
              </span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  checked={true}
                  className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="text-sm ml-3">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <Link
              href="#"
              className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500"
            >
              Lost Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-black/60"
          >
            {isLoading ? "Loading..." : "Login to your account"}
          </button>
          <button
            type="button"
            onClick={() => signIn("google", {
              callbackUrl, redirect: false, 
            })}
            disabled={isLoading}
            className="w-full text-blue-700 outline outline-blue-700 outline-1 bg-white hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-black/60"
          >
            Login With Google
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              href="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
