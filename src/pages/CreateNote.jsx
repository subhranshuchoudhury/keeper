import { useState, useEffect } from "react";

const CreateNote = () => {
  const [date, setdate] = useState(null);
  useEffect(() => {
    // for current time and date.
    setdate(new Date());
    setInterval(() => {
      const d = new Date();
      setdate(d);
    }, 1000);

    // others
  }, []);

  // back function
  const backButton = () => {
    alert("back pressed");
  };
  // eraser function
  const eraserButton = () => {
    alert("eraser pressed");
  };
  // tick function
  const tickButton = () => {
    alert("tick pressed");
  };

  return (
    <>
      <div className="flex bg-[#16213E] h-screen justify-center items-center">
        <div className="bg-[#0F3460] p-10 rounded-lg  shadow-2xl">
          <div className="flex justify-between">
            <div>
              <div
                onClick={backButton}
                className="bg-white w-fit p-2 rounded-full mb-5 cursor-pointer hover:ring ring-yellow-500"
              >
                <img
                  width={30}
                  src="/assets/images/back.png"
                  alt="back button"
                />
              </div>
            </div>
            <div>
              <div
                onClick={eraserButton}
                className="inline-block mr-3 bg-red-300 w-fit p-2 rounded-full mb-5 cursor-pointer hover:ring ring-red-500"
              >
                <img
                  width={30}
                  src="/assets/images/eraser.png"
                  alt="eraser button"
                />
              </div>
              <div
                onClick={tickButton}
                className="inline-block bg-green-300 w-fit p-2 rounded-full mb-5 cursor-pointer hover:ring ring-green-500"
              >
                <img
                  width={30}
                  src="/assets/images/tick.png"
                  alt="tick button"
                />
              </div>
            </div>
          </div>
          <form action="">
            <input
              placeholder="Title..."
              required
              className="w-full mb-8 text-center h-10 text-lg outline-none focus:ring-4 font-bold rounded-lg bg-orange-200"
              type="text"
              name=""
              id=""
            />
            <textarea
              placeholder="Add your note ✍️..."
              required
              rows={10}
              className="w-full p-2 outline-none focus:ring-4 rounded-lg bg-orange-200"
              type="text"
              name=""
              id=""
            />
            <div className="flex justify-between">
              <p className="mt-5 text-orange-200">
                {new Date().toLocaleDateString()}
              </p>
              <p className="mt-5 text-orange-200">
                {date ? date.toLocaleTimeString().toUpperCase() : "..."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
