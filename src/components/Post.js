import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import Flex from "./Flex";
import Images from "./Images";
import { getLoginUser } from "../Api/functional";
const Post = ({ item }) => {
  // console.log( item, "post Item" );
  const [loginUser, setLoginUser] = useState([]);
  useEffect(() => {
    getLoginUser(setLoginUser);
  }, []);

  return (
    <div className="bg-white pb-8 pt-4 rounded-md shadow-lg mb-9 relative ">
      <BiDotsHorizontal className="text-right ml-auto text-3xl mb-5 mr-6 cursor-pointer" />

      <div className="absolute right-0 top-12 bg-[#f4f4f4] border border-solid border-[#181818] p-5 w-[180px] rounded-lg">
        <p className="border-solid border-b border-[#ddd] pb-3 mb-2 flex items-center gap-x-3">
          Edit Post <AiOutlineEdit className="text-lg" />
        </p>
        <p className=" flex items-center gap-x-3">
          Delete Post <AiTwotoneDelete className="text-lg" />
        </p>
      </div>

      <Flex className="items-center px-8 py-5 gap-5 border-t border-solid border-red-500">
        <div>
          <Images
            className={`w-[100px] rounded-full`}
            imgsrc={
              loginUser
                .filter((useritem) => useritem.userId == item.userId)
                .map((item) => item.profile_picture)[0]
            }
          />
        </div>
        <div>
          <h3 className="font-bold font-nunito text-base text-[#181818]">
            {
              loginUser
                .filter((useritem) => useritem.userId == item.userId)
                .map((item) => item.username)[0]
            }
          </h3>
          <p className="font-normal font-nunito text-xs text-[#181818]">
            Product designer at Commandor Corp.
          </p>
        </div>
      </Flex>
      <div>
        <p className="px-8 font-normal font-nunito text-sm mb-4 text-[#181818]">
          {item.postMess}
        </p>
        {item.postImg &&
        <div className="w-[100%] pl-10">
          <img
            className="w-[400px] h-[200px] object-cover"
            src={item.postImg}
            alt=""
          />
        </div>}
      </div>

      {/* <div className="px-8">
                  <ModalImage small="" large="" />
                </div> */}
    </div>
  );
};

export default Post;
