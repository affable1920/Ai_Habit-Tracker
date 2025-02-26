import React, { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useForm } from "react-hook-form";
import { GoFileDirectoryFill } from "react-icons/go";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { AiTwotoneAudio } from "react-icons/ai";
import { SiAudiomack } from "react-icons/si";
import { IoMdAddCircle } from "react-icons/io";
import { MdNavigateBefore } from "react-icons/md";
import key from "../apiKey";
import { v4 } from "uuid";

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

  const common = "icon__with__bg__general cp";
  const genAi = new GoogleGenerativeAI(key).getGenerativeModel({
    model: "gemini-2.0-flash-001",
  });

  const [showExtra, setShowExtra] = useState(true);
  const [files, setFiles] = useState(null);

  const [inputs, setInputs] = useState([]);
  const [aiResponse, setAiResponse] = useState([]);

  const run = async () => {
    let chat = genAi.startChat({
      systemInstruction,
      generationConfig: { temperature: 0.25, maxOutputTokens: 480 },
      history,
    });
    let { response } = await chat.sendMessage("");
  };

  const onSubmit = (e) => {
    console.log(e);
  };

  const handleFileUpload = (e) => {
    let files = e.target.files;

    let selectedtFiles = [];
    if (files)
      for (let file of files) {
        let fileObj = {
          id: v4(),
          type: file.type.toLowerCase().startsWith("image") ? "image" : "video",
          url: URL.createObjectURL(file),
        };

        selectedtFiles.push(fileObj);
        setFiles(selectedtFiles);
      }
  };

  return (
    <section className="">
      <section>{/* Responses */}</section>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input
          type="text"
          className="border-[1px] border-slate-200 w-full p-2 rounded-md bg-slate-50
           shadow-sm outline-none italic text-xs"
          placeholder="Message GPT_"
        />
      </form>
    </section>
  );
};

export default Chat;
