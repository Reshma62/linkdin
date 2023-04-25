import React from 'react'

const SharePost = () => {
  return (
    <div className="bg-white pb-8 pt-4 rounded-md shadow-lg mb-9 relative ">
      {data.uid == item.userId && (
        <BiDotsHorizontal
          onClick={() => setShowEditPost(!showEditPost)}
          className="text-right ml-auto text-3xl mb-5 mr-6 cursor-pointer"
        />
      )}
      {showEditPost && (
        <div className="absolute right-0 top-12 bg-[#f4f4f4] border border-solid border-[#181818] p-5 w-[180px] rounded-lg">
          <p className="border-solid border-b border-[#ddd] pb-3 mb-2 flex items-center gap-x-3">
            Edit Post <AiOutlineEdit className="text-lg" />
          </p>
          <p className=" flex items-center gap-x-3">
            Delete Post <AiTwotoneDelete className="text-lg" />
          </p>
        </div>
      )}

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
            <span className="ml-5 text-sm font font-medium">
              {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
            </span>
          </h3>
          <p className="font-normal font-nunito text-xs text-[#181818]">
            {
              loginUser
                .filter((useritem) => useritem.userId == item.userId)
                .map((item) => item.headline)[0]
            }
          </p>
        </div>
      </Flex>
      <div>
        <p className="px-8 font-normal font-nunito text-sm mb-4 text-[#181818]">
          {item.postMess}
        </p>
        {item.postImg && (
          <div className="w-[100%] pl-10">
            <img
              className="w-[400px] h-[200px] object-cover"
              src={item.postImg}
              alt=""
            />
          </div>
        )}
      </div>

      {/* <div className="px-8">
                  <ModalImage small="" large="" />
                </div> */}
      <Flex className={`justify-between px-5`}>
        <Flex className={`items-center gap-3`}>
          <AiTwotoneLike className="text-3xl" />
          {likes.length >= 0 && <span>{likes.length}</span>}
          <p> people likes</p>
        </Flex>
        <Flex className="pt-5 cursor-pointer gap-x-5">
          <p onClick={() => setCommentAre(!commentArea)}>
            {" "}
            {allComments.length >= 0 && <span>{allComments.length}</span>} .
            comments
          </p>{" "}
          <p onClick={() => handleSharePost(item)}> 0. Shares </p>
        </Flex>
      </Flex>

      <div className={`px-5 border-t border-solid border-black mt-5 `}>
        <Flex className={`gap-5 pt-5`}>
          <p onClick={sendLikePost}>
            {liked ? (
              <p className="cursor-pointer text-primary flex items-center gap-3">
                <AiTwotoneLike className="text-3xl " /> like
              </p>
            ) : (
              <p className="cursor-pointer flex items-center gap-3">
                <AiOutlineLike className="text-3xl " />
                like
              </p>
            )}
          </p>
          <p
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleCommentOpen}
          >
            <AiOutlineComment className="text-3xl " /> Comment
          </p>
        </Flex>
        {commentBox && (
          <Flex className={`mt-5`}>
            <textarea
              onChange={(e) => setinput(e.target.value)}
              className="pt-5 pl-3 w-[90%] resize-none border border-solid border-black"
              rows="2"
              value={input}
              placeholder="Write a comment"
            ></textarea>
            <button
              onClick={sendCommentPost}
              className="bg-primary text-white px-10 "
            >
              comment
            </button>
          </Flex>
        )}
        {commentArea && (
          <div>
            {allComments
              .sort((a, b) => b.timeStamp - a.timeStamp)
              .map((item) => (
                <Flex
                  className={`gap-x-5 items-center my-4 border-b border-dotted border-b-black`}
                >
                  <div>
                    <Images
                      className={`w-[40px] rounded-full`}
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
                      <span className="ml-5 text-sm font font-medium">
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </h3>
                    <p>{item.comment}</p>
                  </div>
                </Flex>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SharePost