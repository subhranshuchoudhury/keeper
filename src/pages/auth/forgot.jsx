const Forgot = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#16213E] bg-cover bg-no-repeat">
        <div className="rounded-xl bg-[#0F3460] bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                width="150"
                alt=""
                srcSet=""
              />
              <h1 className="mb-2 text-2xl">Keeper</h1>
              <span className="text-gray-300">forget password</span>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-[#080b15] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-600 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-[#080b15] bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
