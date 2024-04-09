import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import axios from "axios";

const statesChange = [
  { state: "online", bg: "green-500" },
  { state: "away", bg: "orange-400" },
  { state: "offline", bg: "accent" }
];

export default function Status({
  status,
  type,
  email,
  className
}: {
  status: string | undefined;
  type?: string | undefined;
  email?: string;
  className?:string
}) {
  const [show, setShow] = useState<boolean>(false);
  const [borderClass, setBorderClass] = useState<string>(
    status === "online" ? "border-green-500" : "border-accent"
  );

  const handleChange = async (state: string) => {
    if (type !== "profile") return;
    await axios.post("/api/socket/status", {
      email,
      state
    });
  };

  useEffect(() => {
    function handleOutsideClick(event: any) {
      const overlay = document.querySelector(".background");
      if (overlay && !overlay.contains(event.target)) {
        setShow(false);
      }
    }

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (status === "online") {
      setBorderClass("border-green-500");
    } else if (status === "away") {
      setBorderClass("border-orange-400");
    } else {
      setBorderClass("border-accent");
    }
  }, [status]);

  return (
    <div className={`relative background flex flex-col rounded-lg ${borderClass}`}>
      <div
        className={`text-gray-1 flex items-center gap-2 text-sm   flex-col ${show&&"bg-white border-2 rounded-lg md:bg-transparent md:border-0 dark:bg-dark"} ${className}`}
        onClick={() => setShow(!show)}
      >
        <div className={`flex gap-2 items-center ${
          type === "profile" &&
          "cursor-pointer hover:opacity-45 transition-all duration-300"
        } `}>
            <div
            className={`p-1 rounded-full ${
                status === "online"
                ? "bg-green-500"
                : status === "away"
                ? "bg-orange-400"
                : "bg-accent"
            }`}
            />
            <p
            className={`${
                status === "online"
                ? "text-green-500"
                : status === "away"
                ? "text-orange-400"
                : "text-accent"
            }`}
            >
            {status ? status : "offline"}
            </p>
            {type === "profile" && <FaChevronDown />}

        </div>
        {type === "profile" && show && (
        <div className="md:hidden bg-white  rounded-lg flex flex-col gap-2 items-start z-40 right-0 top-6 dark:bg-dark ">
          {statesChange.map((state, index) => {
            return (
              <div key={index} className="flex flex-col gap-1 w-full">
                {index === 0 && (
                  <div className=" h-px w-full bg- dark:bg-white" />
                )}
                <div
                  className="flex gap-2 items-center hover:opacity-40 transition-all duration-300 cursor-pointer px-4 p-1 "
                  onClick={() => handleChange(state.state)}
                >
                  <div
                    className={`p-1 rounded-full bg-${state.bg}`}
                  />
                  <p
                    className={`text-${state.bg} cursor-pointer capitalize`}
                  >
                    {state.state}
                  </p>
                </div>
                {index !== statesChange.length - 1 && (
                  <div className="h-px w-full bg-dark dark:bg-white" />
                )}
              </div>
            );
          })}
        </div>
      )}
      </div>
      {type === "profile" && show && (
        <div className="hidden md:flex absolute bg-white  rounded-lg  flex-col gap-2 border-2 items-start z-40 right-0 top-6 dark:bg-dark">
          {statesChange.map((state, index) => {
            return (
              <div key={index} className="flex flex-col gap-1 w-full">
                
                <div
                  className="flex gap-2 items-center hover:opacity-40 transition-all duration-300 cursor-pointer px-4 p-1"
                  onClick={() => handleChange(state.state)}
                >
                  <div
                    className={`p-1 rounded-full bg-${state.bg}`}
                  />
                  <p
                    className={`text-${state.bg} cursor-pointer capitalize`}
                  >
                    {state.state}
                  </p>
                </div>
                {index !== statesChange.length - 1 && (
                  <div className="h-px w-full bg-dark dark:bg-white" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
