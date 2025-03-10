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
import { AiFillAudio } from "react-icons/ai";
import { getFileType } from "./../Utils/fileUploadUtils";
import { BiScreenshot } from "react-icons/bi";
import { MdSend } from "react-icons/md";

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

  const handleCameraClick = async (e) => {
    await navigator.mediaDevices.getUserMedia({ video: true });
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      let files = e.target.files;
      const uploadedFiles = [];

      for (let file of files) {
        let index = file.type.indexOf("/") + 1;
        let type = getFileType(file.type);
        console.log(type);

        const url = URL.createObjectURL(file);
        uploadedFiles.push({
          type: file.type.startsWith("image") ? "image" : "video",
          src: url,
        });
      }
      setFiles(uploadedFiles);
    }
  };

  const handlePrompt = () => {};

  return (
    <section className="h-full">
      <section className="h-full flex justify-center flex-col mx-12">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <div
            className={`shadow-md p-2 rounded-md absolute flex -top-[200%] w-full gap-2 justify-center flex-wrap 
              ${
                showExtra
                  ? "opacity-100 pointer-events-auto transition-opacity duration-300 dark:bg-secondary__lighter dark:border-[1px] dark:border-zinc-700"
                  : "opacity-0 pointer-events-none"
              } lg:justify-start lg:w-auto lg`}
          >
            <div className="option__icon__container">
              <FaRegImage className={common} />
              Photos
            </div>
            <div className="option__icon__container">
              <FaCamera className={common} onClick={handleCameraClick} />
              Camera
            </div>
            <div className="option__icon__container">
              <AiFillAudio className={common} />
              Audio
            </div>
            <div className="option__icon__container">
              <BiScreenshot className={common} />
              ScreenShot
            </div>
            <div className="option__icon__container">
              <FaFolder
                className={common}
                onClick={() => fileRef.current.click()}
              />
              <input
                type="file"
                ref={fileRef}
                onChange={handleFileUpload}
                className="hidden pointer-events-none"
              />
              Files
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              className="rounded-md 
            shadow-md dark:shadow-black dark:bg-secondary__lighter border-2 border-slate-200 dark:border-accent outline-none italic text-xs p-4 px-12 w-full"
              placeholder="Message GPT_"
            />
            <button className="flex items-center justify-center" type="submit">
              <MdSend
                className="icon__with__bg absolute right-3 cp"
                onClick={handlePrompt}
              />
            </button>
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
