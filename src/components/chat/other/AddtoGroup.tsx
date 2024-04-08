import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchFriends } from "@/lib/actions/friends.action";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { createGroup } from "@/lib/actions/group.action";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

interface Params {
  _id: string;
  name: string;
  bio: string;
  image: string;
  status: string;
}

export default function AddToGroup({ friendId }: { friendId: string }) {
  const [show, setShow] = useState<boolean>(false);
  const [friends, setFriends] = useState<Params[]>([]);
  const [toGroup, setToGroup] = useState<string[]>([friendId]);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const toggleModal = () => {
    setShow(!show);
    setShowNameInput(false)
  };

  const handleChange = (checkId: string) => {
    if (checkId === friendId) return;
    if (toGroup.includes(checkId)) {
      setToGroup((prev) => prev.filter((id) => id !== checkId));
    } else {
      if (toGroup.length > 10) return;
      setToGroup((prev) => [...prev, checkId]);
    }
  };

  useEffect(() => {
    if (!session) return;
    const friendsFetching = async () => {
      const res = await fetchFriends(session?.user?.email);
      if (res) setFriends(res);
    };
    friendsFetching();
  }, [session]);

  const handleAdd = async () => {
    if (!showNameInput) {
      setShowNameInput(true);
    } else {
      const res = await createGroup({
        email: session?.user?.email,
        idsArray: toGroup,
        name: groupName,
      });

      if (res) router.push(`/group/${res.id}`);
    }
  };
  return (
    <>
      <div
        className="text-4xl text-blue-300 cursor-pointer hover:opacity-50 transition-all duration-300"
        onClick={toggleModal}
      >
        +
      </div>

      {friends&&show && (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30">
          <div className={`bg-dark/40 bg-opacity-75 fixed top-0 bottom-0 right-0 left-0 z-40 rounded-lg`}></div>
          <div className="flex justify-center items-center z-50 w-[75%] max-w-[400px]">
            <div className="bg-white rounded-lg w-full">
              <h2 className="text-lg font-bold  dark:text-black p-2">Add Friends to Group</h2>
                <div className="border-b-2 border-gray-200 flex gap-1 overflow-x-scroll px-2 pb-2 [&::-webkit-scrollbar]:hidden">
                  {friends.map((friend) => {
                    if(toGroup.includes(friend._id)) {
                      const loaderProp =({ src }:any) => {
                        return src;
                       }
                      return (
                        <div key={friend._id}>
                            <Image
                            src={friend.image ||"/user.png"}
                            alt={`${friend.name}  pic`}
                            width={40}
                            height={40}
                            className="rounded-full w-[40px] h-[40px]  border-2 bg-white"
                            loader={loaderProp}
                            unoptimized
                          />
                        </div>
                      )
                    }
                  })}
                </div>

                <div className="flex flex-col gap-2 items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[15rem] p-3">
                  {friends.map((friend) => {
                    const loaderProp =({ src }:any) => {
                      return src;
                   }
                   
                    return (
                      <div key={friend._id} className="flex justify-between items-center w-full hover:bg-gray-300 rounded-lg p-1">
                        <div className="flex gap-2">
                          <Image
                            src={friend.image ||"/user.png"}
                            alt={`${friend.name}  pic`}
                            width={40}
                            height={40}
                            className="rounded-full w-[40px] h-[40px]  border-2 bg-white"
                            loader={loaderProp}
                            unoptimized
                          />
                          <div className="flex flex-col">
                            <p className="text-sm">{friend.name}</p>
                            <div className="flex items-center gap-1">
                              <div
                                className={`p-1 rounded-full ${
                                  friend.status === "online"
                                    ? "bg-green-500"
                                    : friend.status === "away"
                                    ? " bg-orange-400"
                                    : "bg-accent"
                                }`}
                              />
                              <p
                                className={`text-xs ${
                                  friend.status === "online"
                                    ? "text-green-500"
                                    : friend.status === "away"
                                    ? " text-orange-400"
                                    : "text-accent"
                                }`}
                              >
                                {friend.status || "offline"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id={`checkboxSetGroup-${friend._id}`}
                                checked={toGroup.includes(friend._id)}
                                onChange={() => handleChange(friend._id)}
                             
                                className="appearance-none"
                            />
                            <label
                                htmlFor={`checkboxSetGroup-${friend._id}`}
                                className="text-2xl text-gray-500 cursor-pointer hover:opacity-50 transition-all duration-300"
                            >
                                {!toGroup.includes(friend._id) 
                                ? 
                                <GoPlus/> 
                                :
                                <RxCross2 />}
                            </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              
              {showNameInput && (
                <div className="relative p-2">
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                  />
                  
                </div>
              )}
              <div className="flex  justify-center md:justify-end p-2 items-center">
                <button
                  className={`text-white px-4 py-2 rounded hover:bg-blue-500 mr-2 dark:bg-dark bg-blue-400 hover:opacity-50 transition-all duration-300`}
                  onClick={handleAdd}
                >
                  {showNameInput ? "Create Group" : "Add"}
                </button>
                <button
                  className={`text-gray-700 px-4 py-2 rounded hover:bg-gray-200 dak:bg-dark bg-blue-400`}
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
