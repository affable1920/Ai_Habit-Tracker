import React, { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useForm } from "react-hook-form";
import { GoFileDirectoryFill } from "react-icons/go";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { AiTwotoneAudio } from "react-icons/ai";
import { SiAudiomack } from "react-icons/si";
import { IoMdAddCircle } from "react-icons/io";
import { MdNavigateBefore } from "react-icons/md";
import { v4 } from "uuid";
import { FaFolder } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";

const Chat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fileRef = useRef(null);
  const systemInstruction = {
    parts: [
      {
        text: `You've been integrated in a habit tracker/builder app. Your job is that when a user initiates 
        a chat conversation with you, you try to motivate the user and make him/her push his abilities to their
        limits. You make the user feel and understand that NO is not an option.`,
      },
    ],
  };

  const common = "cp icon__with__bg";
  const [showExtra, setShowExtra] = useState(false);
  const [files, setFiles] = useState(null);

  const [inputs, setInputs] = useState([]);
  const [aiResponse, setAiResponse] = useState([]);

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <section className="h-full">
      <section className="h-full flex justify-center flex-col mx-12">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <div
            className={`flex gap-12 absolute opacity-0 -top-[180%] pointer-events-none bg-white 
              shadow-md p-2 rounded-sm size-full lg:w-auto min-h-[80px] border-2 border-slate-100 flex-wrap ${
                showExtra &&
                "opacity-100 pointer-events-auto transition-opacity duration-300"
              }`}
          >
            <div className="option__icon__container">
              <FaRegImage className={common} />
              Photos
            </div>
            <div className="option__icon__container">
              <FaCamera className={common} />
              Camera
            </div>
            <div className="option__icon__container">
              <FaFolder className={common} />
              Files
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              className="border-[1px] border-slate-200 rounded-md bg-slate-50
            shadow-sm outline-none italic text-xs p-4 px-12 w-full"
              placeholder="Message GPT_"
            />
            <IoMdAddCircle
              className="cp icon__with__bg absolute bottom-[50%] translate-y-[50%] left-2"
              onClick={() => setShowExtra(!showExtra)}
            />
          </div>
        </form>
      </section>
    </section>
  );
};

export default Chat;
