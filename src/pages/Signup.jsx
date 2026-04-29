import { Link, useNavigate } from "react-router";
import MyContainer from "../Components/MyContainer";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);

  const result = useContext(AuthContext);
  // console.log(result);

  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    setLoading,
    signOutFunc,
    setUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL  = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    console.log("signup function entered", {
       email,
       password,
       displayName,
       photoURL 
       });

      // console.log(password.length);
      // if(password.length>6){
      //   toast.error('Password should be at least 6 digit')
      //   return;
      // }
      // const regExp =
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      // console.log(regExp.test(password));
      // if (!regExp.test(password)) {
      //   toast.error(
      //     "*Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character (@ $ ! % * ? &). Only letters, numbers, and those special characters are allowed.*",
      //   );
      //   return;
      // }

      // 1st step
    
      createUserWithEmailAndPasswordFunc(email,password)
      .then((res) => {
        // 2nd step: update profile
        console.log(res)
        updateProfileFunc(displayName, photoURL)
          .then((res) => {
            console.log(res);
            // 3rd step : update profile
            sendEmailVerificationFunc()
              .then((res) => {
                console.log(res);
                setLoading(false)
                //signout user
                signOutFunc()
                .then(() => {
                  toast.success(
                    "Signup successful.Check our email to active your account",
                  );
                   setUser(null);
                   navigate("/signin")
                 });
              })
              .catch((e) => {
                //  console.log(e);
                toast.error(e.message);
              });
            // console.log(res);
            toast.success("Signup successful");
          })
          .catch((e) => {
            // console.log(e)
            toast.success(e.message);
          });
        console.log(e);
        toast.success("Signup successful");
      })
      .catch((error) => {
        // console.log(error);
        console.log(error.code);
        // toast.error(e.message);
        if (error.code == "auth/email-already-in-use") {
          toast.error("User Already EXist in this site");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password must be at least 6 characters");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Check your internet connection");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("Email/password signup is disabled");
        } else {
          toast.error("Signup failed. Try again!");
        }
        return;
      });
  };
  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>
      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Your photo URL here"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-9 cursor-pointer z-50"
                >
                  {show ? <FaRegEye /> : <IoEyeOff />}
                </span>
              </div>
              <button type="submit" className="my-btn">
                Sign Up
              </button>
              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Signup;
