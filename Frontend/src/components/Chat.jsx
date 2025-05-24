import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";
import { MdSend } from "react-icons/md";
import axios from "axios";

const Chat = () => {
  return null;

  const form = useForm();
  const fileRef = useRef(null);

  const common = "cp icon__with__bg";

  const [showExtra, setShowExtra] = useState(false);
  const [files, setFiles] = useState(null);

  const [aiResponses, setAiResponses] = useState([]);
  const [userText, setUserText] = useState([]);

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

        const url = URL.createObjectURL(file);
        uploadedFiles.push({
          type: file.type.startsWith("image") ? "image" : "video",
          src: url,
        });
      }
      setFiles(uploadedFiles);
    }
  };

  const onSubmit = async (e) => {
    setUserText([...userText, e.prompt]);
    try {
      const { data: chat } = await axios.post(
        "http://localhost:8000/chat",
        e.prompt
      );
      setAiResponses([...aiResponses, chat]);
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      className={`my-4 flex flex-col justify-between h-full items-center mx-8 lg:mx-24`}
    >
      {aiResponses.length != 0 ? (
        <div
          className="bg-zinc-50 h-full overflow-hidden p-3 rounded-md 
        dark:bg-secondary__lighter mb-2 italic text-[14px] shadow-md dark:shadow-black border-[1.5px] 
      border-zinc-100 dark:border-accent"
        >
          {aiResponses.map((response) => (
            <div className="mb-4">{response}</div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bottom-5 w-full"
      >
        <div className="flex items-center relative">
          <input
            {...form.register("prompt")}
            type="text"
            className="rounded-md 
            shadow-md dark:shadow-black dark:bg-secondary__lighter border-2 border-slate-200 dark:border-accent 
            outline-none italic text-xs p-4 px-12 w-full"
            placeholder="Message GPT_"
          />
          <button className="flex items-center justify-center" type="submit">
            <MdSend className="icon__with__bg absolute right-3 cp" />
          </button>
          <IoMdAddCircle
            className="cp icon__with__bg absolute bottom-[50%] translate-y-[50%] left-2"
            onClick={() => setShowExtra(!showExtra)}
          />
        </div>
      </form>
    </section>
  );
};

export default Chat;

{
  /* <div
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
          </div> */
}
