import React, { useEffect, useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineComment,
  AiOutlineEdit,
  AiOutlineLike,
  AiTwotoneDelete,
  AiTwotoneLike,
} from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import Flex from "./Flex";
import Images from "./Images";
import { getLoginUser } from "../Api/functional";
import moment from "moment";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  runTransaction,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import { useSelector } from "react-redux";
const Post = ({ item }) => {
  // console.log(item, "post Item");
  const db = getDatabase();
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [commentBox, setCommentBox] = useState(true);
  const [commentArea, setCommentAre] = useState(true);
  const [loginUser, setLoginUser] = useState([]);
  const [likes, setLikes] = useState([]);
  const [input, setinput] = useState("");
  const [liked, setLiked] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    getLoginUser(setLoginUser);
  }, []);
  let handleCommentOpen = () => {
    setCommentBox(!commentBox);
  };
  useEffect(() => {
    const likeRef = ref(db, "post/" + item.postId + "/Like");
    onValue(likeRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setLikes(arr);
    });
  }, []);

  useEffect(() => {
    const commentsRef = ref(db, "post/" + item.postId + "/comments");
    onValue(commentsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), commentId: item.key });
      });
      setAllComments(arr);
    });
  }, []);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.userId === data.uid) !== -1);
  }, [likes]);

  const sendLikePost = () => {
    if (liked) {
      // If already liked, remove the like
      remove(ref(db, "post/" + item.postId + "/Like/" + data.uid));
    } else {
      // If not liked, add the like
      set(ref(db, "post/" + item.postId + "/Like/" + data.uid), {
        userId: data.uid,
      });
    }
  };

  const sendCommentPost = () => {
    set(push(ref(db, "post/" + item.postId + "/comments/")), {
      userId: data.uid,
      userName: data.displayName,
      userPhoto: data.photoURL,
      comment: input,
      timeStamp: serverTimestamp(),
      date: `${new Date().getFullYear()} ${
        new Date().getMonth() + 1
      } ${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
    });
    setinput("");
  };

  // Share Post

  let handleSharePost = async (item) => {
    console.log(item, "itemSeb");
    if (item.isSharedPost) {
      // console.log(item,"iiiiiiiiii");
      return get(child(ref(db), `/post/${item.postId}`))
        .then((snapshot) => {
          const originalPost = snapshot.val();
          // console.log(originalPost);
          if (originalPost) {
            // If the original post exists, increment the updateCount field
            const updateCount = (originalPost.updateCount || 0) + 1;
            const updates = {}; // Create an object to hold the updates
            updates[`/post/${item.postId}/updateCount`] = updateCount; // Add the updateCount field to the updates object
            return update(ref(db), updates); // Use the updates object as the argument for update() function
          } else {
            // If the original post does not exist, throw an error or handle it accordingly
            throw new Error("Original post not found");
          }
        })
        .then(() => {
          // Create a new shared post object
          const sharedPost = {
            userName: data.displayName,
            userId: data.uid,
            postOwnerId: item.postOwnerId,
            postOwnerName: item.postOwnerName,
            postOwnerPhoto: item.postOwnerPhoto,
            postsId: item.postsId,
            postsImg: item.postsImg || "",
            postsMess: item.postsMess,
            postsDate: item.postsDate,
            timeStamp: serverTimestamp(),
            date: `${new Date().getFullYear()} ${
              new Date().getMonth() + 1
            } ${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            isSharedPost: true,
          };

          // Get a key for a new Post.
          const newPostKey = push(child(ref(db), "post")).key;

          // Write the new shared post's data simultaneously in the posts list and the user's post list.
          const updates = {};
          updates["/post/" + newPostKey] = sharedPost;
          // updates[`/post/${item.postsId}/updateCount`] = updateCount;

          return update(ref(db), updates);
        });
    } else {
      // console.log(item,"iiiiiiiiii");
      return get(child(ref(db), `/post/${item.postId}`))
        .then((snapshot) => {
          const originalPost = snapshot.val();
          // console.log(originalPost);
          if (originalPost) {
            // If the original post exists, increment the updateCount field
            const updateCount = (originalPost.updateCount || 0) + 1;
            const updates = {}; // Create an object to hold the updates
            updates[`/post/${item.postId}/updateCount`] = updateCount; // Add the updateCount field to the updates object
            return update(ref(db), updates); // Use the updates object as the argument for update() function
          } else {
            // If the original post does not exist, throw an error or handle it accordingly
            throw new Error("Original post not found");
          }
        })
        .then(() => {
          // Write the shared post data to the database
          const sharePost = {
            userName: data.displayName,
            userId: data.uid,
            postOwnerId: item.userId,
            postOwnerName: item.userName,
            postOwnerPhoto: item.userPhoto,
            postsId: item.postId,
            postsImg: item.postImg || "",
            postsMess: item.postMess,
            postsDate: item.date,
            timeStamp: serverTimestamp(),
            date: `${new Date().getFullYear()} ${
              new Date().getMonth() + 1
            } ${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            isSharedPost: true, // Set isSharedPost field to true for shared posts
          };

          // Get a key for a new Post.
          const newPostKey = push(child(ref(db), "post")).key;

          // Write the new post's data simultaneously in the posts list and the user's post list.
          const updates = {};
          updates["/post/" + newPostKey] = sharePost;

          return update(ref(db), updates);
        });
    }
  };

  return (
    <>
      {item.isSharedPost ? (
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
          <div className="border border-solid border-black rounded-lg m-10">
            <Flex className={`items-center gap-x-5`}>
              <div className=" pl-10">
                <img
                  className="w-[50px] h-[50px] object-cover rounded-full border border-solid border-black "
                  src={item.postOwnerPhoto}
                  alt=""
                />
              </div>
              <h4>
                {item.postOwnerName}{" "}
                <span>
                  {moment(item.postsDate, "YYYYMMDD hh:mm").fromNow()}
                </span>
              </h4>
            </Flex>
            <div>
              <p className="px-8 font-normal font-nunito text-sm mb-4 text-[#181818]">
                {item.postsMess}
              </p>
              {item.postsImg && (
                <div className="w-[100%] pl-10">
                  <img
                    className="w-[400px] h-[200px] object-cover"
                    src={item.postsImg}
                    alt=""
                  />
                </div>
              )}
            </div>
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
              <p onClick={() => handleSharePost(item)}>
                {" "}
                {item.updateCount > 0
                  ? `${item.updateCount}. Shares`
                  : "0. Shares"}
              </p>
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
                              .filter(
                                (useritem) => useritem.userId == item.userId
                              )
                              .map((item) => item.profile_picture)[0]
                          }
                        />
                      </div>
                      <div>
                        <h3 className="font-bold font-nunito text-base text-[#181818]">
                          {
                            loginUser
                              .filter(
                                (useritem) => useritem.userId == item.userId
                              )
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
      ) : (
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
                
                {allComments.length >= 0 && <span>{allComments.length}</span>} .
                comments
              </p>
              <p onClick={() => handleSharePost(item)}>
                {item.updateCount > 0
                  ? `${item.updateCount}. Shares`
                  : "0. Shares"}
              </p>
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
                              .filter(
                                (useritem) => useritem.userId == item.userId
                              )
                              .map((item) => item.profile_picture)[0]
                          }
                        />
                      </div>
                      <div>
                        <h3 className="font-bold font-nunito text-base text-[#181818]">
                          {
                            loginUser
                              .filter(
                                (useritem) => useritem.userId == item.userId
                              )
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
      )}
    </>
  );
};

export default Post;
