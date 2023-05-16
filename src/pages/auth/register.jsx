import { useRouter } from "next/router";
import Image from "next/image";
import { useRef, useState } from "react";
import swal from "sweetalert";
const Register = () => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  const [usernameBox, nameBox, passwordBox, emailBox] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const registerUser = (e) => {
    e.preventDefault();
    const payLoad = {
      username: usernameBox.current.value,
      name: nameBox.current.value,
      password: passwordBox.current.value,
      email: emailBox.current.value,
    };

    const hasEmptyOrNullValue = Object.values(payLoad).some(
      (value) => value === null || value === ""
    );

    if (hasEmptyOrNullValue) {
      swal("Empty field!", "Enter you details in all the fields.", "info");
      return;
    }
    setLoading(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    };

    fetch("https://keeper-backend-theta.vercel.app/auth/register", options)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        // console.log(response.status);
        if (response.message) {
          if (response.message === "User was registered successfully!") {
            swal(response.message, "you can now login.", "success");
            router.push("/auth/login");
            return;
          }
          swal(response.message, "", "info");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        swal("Network or server error!", "try again after sometime.", "error");
      });
  };
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#16213E] bg-cover bg-no-repeat">
        <div className="rounded-xl bg-[#0F3460] bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <Image
                src="/assets/images/keeper (1).png"
                width={70}
                height={70}
                alt="logo"
                className="rounded-xl"
              />
              <h1 className="mb-2 text-2xl">Keeper</h1>
              <span className="text-gray-300">Register a new account</span>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#080b15] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="userrealname"
                  placeholder="eg. John Doe"
                  ref={nameBox}
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#080b15] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="username"
                  placeholder="eg. johndoe123"
                  ref={usernameBox}
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#080b15] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  ref={emailBox}
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#080b15] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  ref={passwordBox}
                  placeholder="*********"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-[#080b15] bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-green-400 hover:animate-pulse"
                  onClick={registerUser}
                >
                  Register
                </button>
              </div>
              <div className=" flex justify-center mt-5 underline hover:text-green-400 hover:cursor-pointer">
                <p
                  onClick={() => {
                    router.replace("login");
                  }}
                >
                  Already have an account ?
                </p>
              </div>
            </form>
          </div>
          {Loading ? (
            <div className="absolute top-0 left-0 bg-[#000000ac] w-full h-full blur-1 flex justify-center items-center">
              <Image
                src={"/assets/images/loading-dot.gif"}
                width={80}
                height={80}
                alt="loading dot"
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Register;
