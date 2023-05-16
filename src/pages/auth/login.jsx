import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import swal from "sweetalert";
const Login = () => {
  const [logging, setlogging] = useState(false);
  const router = useRouter();
  const [Data, setData] = useState({
    email: "",
    password: "",
  });

  const authLogin = () => {
    if (Data.email === "" || Data.password === "") {
      swal("Empty credentials!", "", "warning");
      return;
    }
    const dataJson = {
      email: Data.email,
      password: Data.password,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataJson),
    };
    setlogging(true);

    fetch("https://keeper-backend-theta.vercel.app/auth/login", options)
      .then((response) => response.json())
      .then((response) => {
        if (response?.accessToken) {
          localStorage.setItem("AUTH_DATA", JSON.stringify(response));
          swal(
            "Welcome!",
            `You are successfully logged as, ${response?.name}.`,
            "success"
          );
          router.replace("/notes");
        } else {
          swal(response?.message, "Recheck your email and password.", "error");
        }
        setlogging(false);
      })
      .catch((err) => {
        swal(
          "Network or server error!",
          `kindly retry after sometime.`,
          "error"
        );
        setlogging(false);
      });
  };
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#16213E] bg-cover bg-no-repeat">
        <div className="rounded-xl bg-[#0F3460] bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-4 flex flex-col items-center">
              <Image
                src="/assets/images/k.png"
                width={70}
                height={70}
                alt="logo"
                className="rounded-xl"
              />
              <h1 className="mt-3 mb-2 text-2xl">Keeper</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#080b15] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  onChange={(e) => {
                    Data.email = e.target.value;
                  }}
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#080b15] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  placeholder="*********"
                  onChange={(e) => {
                    Data.password = e.target.value;
                  }}
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(Data);
                    authLogin();
                  }}
                  type="submit"
                  className="rounded-3xl bg-[#080b15] bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-green-400 hover:animate-pulse"
                >
                  Login
                </button>
              </div>
              <div className=" flex justify-center mt-5 underline hover:text-green-400 hover:cursor-pointer">
                <p
                  onClick={() => {
                    router.replace("register");
                  }}
                >
                  Don't have an account ?
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {logging ? (
        <div className="absolute top-0 left-0 bg-[#000000ac] w-full h-full blur-1 flex justify-center items-center">
          <Image
            src={"/assets/images/loading-dot.gif"}
            width={80}
            height={80}
          />
        </div>
      ) : null}
    </>
  );
};

export default Login;
