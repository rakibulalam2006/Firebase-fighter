import React, { useContext, useRef, useState } from "react";
import MyContainer from "../Components/MyContainer";
import { Link, useLocation, useNavigate } from "react-router";
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


const Signin = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const {
    signinWithEmailPasswordFunc,
    signinWithGoogleFunc,
    signinWithGithubFunc,
    sendPassResetEmailFunc,
    signOutFunc,
    setUser,
    setLoading,
    user,
  } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);
  const form = location.state || "/";
  const navigate = useNavigate();

  if(user){
    navigate("/");
    return;
  }

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    // console.log({ email, password });
    signinWithEmailPasswordFunc( email, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          signOutFunc();
          setLoading(false);
          toast.error("your email is not verified.");
          return;
        }
        // console.log(res);
        setUser(res.user);
        toast.success("Signin successful");
        navigate(form);
      })
      .catch((e) => {
        // console.log(e);
        toast.error(e.message);
      });
  };

  const handleGoogleSignin = () =>{
    signinWithGoogleFunc()
      .then((res) => {
        // console.log(res);
        setUser(res.user);
        setLoading(false);
        toast.success("Signin successful");
        navigate(form);
      })
      .catch((e) => {
        // console.log(e);
        toast.error(e.message);
      });
  }
  
  const handleGithubSignIn = () =>{
    signinWithGithubFunc()
      .then((res) => {
        // console.log(res);
        setUser(res.user);
        setLoading(false);
        toast.success("Signin successful");
        navigate(form);
      })
      .catch((e) => {
        // console.log(e);
        toast.error(e.message);
      });
  }

  const handleResetPassword = () =>{
    const email = emailRef.current.value;
    sendPassResetEmailFunc(email)
      .then((res) => {
        console.log(res)
        setLoading(false);
        toast.success("Check your email to reset password");
      })
      .catch((e) => {
        toast.error(e.message);
      });
    // console.log(e.target.email)
    // console.log(email);
  }
 
  
  // console.log(user);
  return (
    <div className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-xl bottom-10 right-10 animate-pulse"></div>
      </div>
      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          {/* Left section */}
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Sign in to continue your journey. Manage your account, explore new
              features, and more.
            </p>
          </div>
          {/* Login card */}
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            
              
          
              <form onSubmit={handleSignin} className="space-y-5">
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                  Sign In
                </h2>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    // value={email}
                    // onChange={()=>setEmail(email.target.value)}
                    placeholder="example@email.com"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="•••••••"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-9 cursor-pointer z-50"
                  >
                    {show ? <FaRegEye /> : <IoEyeOff />}
                  </span>
                </div>

                <button
                  className="hover:underline cursor-pointer"
                  type="button"
                  onClick={handleResetPassword}
                >
                  Forget password?
                </button>

                <button type="submit" className="my-btn">
                  Login
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-16 bg-white/30"></div>
                  <span className="text-sm text-white/70">or</span>
                  <div className="h-px w-16 bg-white/30"></div>
                </div>

                {/* Google Signin */}
                <button
                  onClick={handleGoogleSignin}
                  type="button"
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>

                {/* Github Signin */}
                <button
                  onClick={handleGithubSignIn}
                  type="button"
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <img
                    src="https://img.icons8.com/fluency/48/github.png"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Github
                </button>

                <p className="text-center text-sm text-white/80 mt-3">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-pink-300 hover:text-white underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
        
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Signin;
