import { motion } from "framer-motion";
import VideoPlayer from "../VideoPlayer";
import { useRef } from 'react'
import videojs from "video.js";
import { RxCross2 } from "react-icons/rx";

const VideoModal = ({data}) => {
    const playerRef = useRef(null)
    // const videoLink = "http://localhost:8000/uploads/courses/120b2910-6be2-41ae-9f00-b987d87417f1/index.m3u8"
  console.log("data",data)
    const videoPlayerOptions = {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: data.data,
          type:data.data.endsWith(".mp4") ? "video/mp4" : "application/x-mpegURL"
        }
      ]
    }
    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on("waiting", () => {
          videojs.log("player is waiting");
        });
    
        player.on("dispose", () => {
          videojs.log("player will dispose");
        });
      };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0 }}
      className="top-0 left-0 z-[9999] flex justify-center bg-black/60 fixed  w-[100vw] h-[100vh]  backdrop-blur-md"
    >
      <div className="fixed flex py-6 flex-col text-center items-center  gap-3 w-full  md:w-[650px] top-[25%]   rounded-xl bg-white/10 p-2  ">
        <RxCross2 onClick={data.cancel} className=" absolute -top-7 hover:cursor-pointer text-white/50 hover:text-white text-3xl right-2 md:-right-7"/>
        <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
      </div>
    </motion.div>
  );
};
export default VideoModal;
