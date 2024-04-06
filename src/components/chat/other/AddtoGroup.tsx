import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchFriends } from "@/lib/actions/friends.action";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { createGroup } from "@/lib/actions/group.action";

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

      {show && (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30">
          <div className={`bg-dark/40 bg-opacity-75 fixed top-0 bottom-0 right-0 left-0 z-40 rounded-lg`}></div>
          <div className="flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4 dark:text-black">Add Friends to Group</h2>

              {friends && (
                <div className="flex flex-col gap-4 items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[15rem]">
                  {friends.map((friend, index) => {
                    const loaderProp =({ src }:any) => {
                      return src;
                   }
                    return (
                      <div key={index} className="flex justify-between items-center w-full">
                        <div className="flex gap-2">
                          <Image
                            src={friend.image ||"/user.png"}
                            alt={`${friend.name}  pic`}
                            width={40}
                            height={40}
                            className="rounded-full w-[40px] h-[40px]  border-2"
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
                        <input
                          type="checkbox"
                          id={`checkboxSetGroup-${friend._id}`}
                          checked={toGroup.includes(friend._id)}
                          onChange={() => handleChange(friend._id)}
                          className=" accent-blue-400 size-4 cursor-pointer appearance-none border  checked:bg-blue-400 border-gray-1 rounded-sm "
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {showNameInput && (
                <div className="mt-4 relative">
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                  />
                  
                </div>
              )}
              <div className="mt-5">
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
