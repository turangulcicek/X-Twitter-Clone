import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { BsLayoutTextWindow, BsThreeDots } from "react-icons/bs";
import "moment/locale/tr";

import { auth, db } from "../Firebase/config";
import { FiMessageCircle } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";

import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Dropdown from "./Dropdown";

const Post = ({ tweet }) => {
  const [isLiked, setisLiked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // tweetin kaç gün önce atıldığını hesaplama
  const date = moment(tweet.createdAt?.toDate()).fromNow();
  // kullanıcını tweet'i beğenip beğenmediğini belirleme
  useEffect(() => {
    const found = tweet.likess?.find(
      (userId) => userId === auth.currentUser.uid
    );
    setisLiked(found);
  }, [tweet]);

  //   tweet silme
  const handleDelete = async () => {
    if (confirm("tweet'i silmeyi onaylıyor musun?")) {
      // silmek istediğimiz belgenin referansını alma
      const docRef = doc(db, "tweets", tweet.id);
      // console.log(docRef, "docref");
      // dökümanı silme
      await deleteDoc(docRef);
    }
  };
  //  Like atmaya ve geri almaya yarar
  const toggleLike = async () => {
    const docRef = doc(db, "tweets", tweet.id);
    await updateDoc(docRef, {
      //diziye tweeti like layan kullanıcıının id'sini ekliyruz

      likess: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const tweetRef = doc(db, "tweets", tweet.id);
    updateDoc(tweetRef, {
      isEdited: true,
      textContent: e.target[0].value,
    });

    setIsEditMode(false);
  };
  return (
    <div className="flex border-b-[1px] border-gray-700 gap-3 p-3  ">
      <img
        className="w-12 h-12 rounded-full "
        src={tweet.user.photo}
        alt="user_picture"
      />
      <div className=" w-full">
        {/* üst kısım  kullanıcı bilgileri*/}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@ {tweet.user.name.toLowerCase()}</p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleDelete={handleDelete}
              handleEdit={() => setIsEditMode(true)}
            />
          )}
        </div>
        {/* orta kısım tweet içeriği */}

        <div className="my-3">
          {/* tweet içeriği */}
          {isEditMode ? (
            <form
              onSubmit={handleSave}
              className="flex gap-2 "
              action="
            "
            >
              {" "}
              <input
                className="text-black w-full"
                type="text"
                defaultValue={tweet.textContent}
              ></input>
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="bg-red-400 px-2 py-1 rounded "
              >
                Vazgeç
              </button>
              <button type="submit" className="bg-blue-400 px-2 py-1 rounded ">
                Kaydet
              </button>
            </form>
          ) : (
            <p>{tweet?.textContent}</p>
          )}

          {/* Eğer fotoğraf varsa onu ekrana bas */}
          {tweet.imageContent && (
            <img
              className="max-h-[300px] mt-2 rounded"
              src={tweet.imageContent}
            ></img>
          )}
        </div>
        {/* alt kısım icon button vs */}
        <div className="flex justify-between px-2">
          <div className="flex items-center gap-1 rounded-full hover:bg-gray-500 p-2 cursor-pointer">
            <FiMessageCircle />
            {/* <span>{Math.round(Math.random() * 200)}</span> */}
          </div>
          <div className="flex items-center gap-1 rounded-full hover:bg-gray-500 p-2 cursor-pointer">
            <FaRetweet />
            {/* <span>{Math.round(Math.random() * 200)}</span> */}
          </div>
          <div
            onClick={toggleLike}
            className="flex items-center gap-1 rounded-full hover:bg-gray-500 p-2 cursor-pointer"
          >
            {isLiked ? <FcLike /> : <CiHeart />}
            <span>{tweet.likess?.length}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full hover:bg-gray-500 p-2 cursor-pointer">
            <IoShareSocialOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
