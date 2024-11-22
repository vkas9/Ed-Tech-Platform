import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { MdOutlineOndemandVideo, MdOutlineDownload, MdOutlineDownloadDone } from "react-icons/md";
import loading from "./../../../assets/loading.gif";
import { motion } from "framer-motion";
import VideoModal from "./VideoModal/VideoModal";
import { fetchEnrollData } from "./fetchEnrollData";

const ViewCourse = () => {
  const { enrolledCourse } = useSelector((store) => store.card);
  const { courseId } = useParams();
  const [openSections, setOpenSections] = useState({});
  const [downloadedVideos, setDownloadedVideos] = useState(() => {
    // Initialize from localStorage if available
    const storedVideos = localStorage.getItem("downloadedVideos");
    return storedVideos ? JSON.parse(storedVideos) : [];
  });
  const [localVideoURLs, setLocalVideoURLs] = useState(() => {
    // Initialize from localStorage if available
    const storedURLs = localStorage.getItem("localVideoURLs");
    return storedURLs ? JSON.parse(storedURLs) : {};
  });
  const [downloadingVideos, setDownloadingVideos] = useState([]);
  const [confirmationModal, openConfirmationModal] = useState(null);
  const { user } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  const handleSetOpen = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  function secondsToMinutesAndSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    if (!user || user.role !== "Student") return;
    const controller = new AbortController();
    const signal = controller.signal;

    if (!enrolledCourse) {
      fetchEnrollData(user, dispatch, signal);
    }

    return () => {
      controller.abort();
    };
  }, [enrolledCourse, user, dispatch]);

  // Persist downloadedVideos to localStorage
  useEffect(() => {
    localStorage.setItem("downloadedVideos", JSON.stringify(downloadedVideos));
  }, [downloadedVideos]);

  // Persist localVideoURLs to localStorage
  useEffect(() => {
    localStorage.setItem("localVideoURLs", JSON.stringify(localVideoURLs));
  }, [localVideoURLs]);

  const eCourse = enrolledCourse?.find((item) => item._id === courseId);

  const getTotalLectures = () => {
    let total = 0;
    for (let temp in eCourse.Section) {
      total += eCourse.Section[temp].subSection.length;
    }
    return total;
  };

  if (!eCourse) {
    return <p>Loading...</p>;
  }

  const startDownload = async (video_item) => {
    setDownloadingVideos((prev) => [...prev, video_item._id]); // Mark video as downloading

    const { videoURL } = video_item;
    const response = await fetch(videoURL);

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: video_item._id,
        types: [
          {
            description: "Video Files",
            accept: { "video/*": [".mp4", ".webm"] },
          },
        ],
      });

      const videoBlob = await response.blob();
      const writable = await handle.createWritable();
      await writable.write(videoBlob);
      await writable.close();

      const localURL = URL.createObjectURL(videoBlob);

      // Update localVideoURLs state
      setLocalVideoURLs((prev) => {
        const updatedURLs = { ...prev, [video_item._id]: localURL };
        localStorage.setItem("localVideoURLs", JSON.stringify(updatedURLs)); // Persist immediately
        return updatedURLs;
      });

      setDownloadingVideos((prev) => prev.filter((id) => id !== video_item._id)); // Remove from downloading list
      setDownloadedVideos((prev) => {
        const updatedVideos = [...prev, video_item._id];
        localStorage.setItem("downloadedVideos", JSON.stringify(updatedVideos)); // Persist immediately
        return updatedVideos;
      });
    } catch (error) {
      console.error("Error downloading video:", error);
      setDownloadingVideos((prev) => prev.filter((id) => id !== video_item._id)); // Remove from downloading list on error
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg pt-2 px-5"
    >
      <div className="flex gap-1 text-white/50 scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
        <Link to={"/"} className="underline active:text-white sm:hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="underline active:text-white sm:hover:text-white">
          Dashboard
        </Link>
        <span>/</span>
        <Link to={"/dashboard/enrolled-courses"} className="underline active:text-white sm:hover:text-white whitespace-nowrap">
          {user?.role === "Instructor" ? "All Courses" : "Enrolled Courses"}
        </Link>
        <span>/</span>
        <span className="text-yellow-500 whitespace-nowrap">{eCourse.CourseName}</span>
      </div>
      <h1 className="text-3xl mb-3">Course Content</h1>
      <h2 className="text-white/50 mb-1">
        {eCourse.Section.length} Sections • {getTotalLectures()} Lectures
      </h2>
      <div className="bg-white/10 overflow-y-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full max-h-[calc(100vh-13rem)] w-full md:max-w-[700px] p-2 md:p-4 rounded-md shadow-md">
        {eCourse?.Section.map((section) => (
          <details key={section._id} className="mb-2">
            <summary onClick={() => handleSetOpen(section._id)} className="cursor-pointer flex items-center justify-between px-2 py-3 bg-white/20 relative rounded-md hover:bg-white/30">
              <div className="flex truncate mr-[6rem] items-center gap-2">
                {openSections[section._id] ? (
                  <IoMdArrowDropdown className="text-lg min-w-[20px]" />
                ) : (
                  <IoMdArrowDropright className="text-lg min-w-[20px]" />
                )}
                <p className="text-lg whitespace-nowrap max-w-[450px] truncate">{section.SectionName}</p>
              </div>
              <div className="flex absolute bottom-2 sm:bottom-1 right-0">
                <div className="p-2 text-sm sm:text-lg">{section.subSection.length} Lectures</div>
              </div>
            </summary>
            <div>
              {section?.subSection?.map((subsection) => (
                <div key={subsection._id} className="flex justify-between items-center cursor-pointer relative">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfirmationModal({
                        data: subsection.videoURL,
                        cancel: () => openConfirmationModal(null),
                      });
                    }}
                    className="px-4 flex-grow hover:bg-white/20 hover:cursor-pointer relative py-2 bg-white/10 rounded-md ml-4 mt-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="truncate mr-[5rem]">
                        <div className="flex items-center gap-2">
                          <MdOutlineOndemandVideo className="min-w-[20px]" />
                          <p className="whitespace-nowrap max-w-[450px] truncate">{subsection.title}</p>
                        </div>
                      </div>
                      <div className="flex absolute bottom-1 right-2">
                        <div className="py-2 select-none text-sm text-white/50">{secondsToMinutesAndSeconds(subsection.duration)}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="px-4 hover:bg-white/20 hover:cursor-pointer relative py-3 bg-white/10 rounded-md ml-4 mt-2"
                  >
                    {downloadedVideos.includes(subsection._id) ? (
                      <MdOutlineDownloadDone className="min-w-[50px]" />
                    ) : downloadingVideos.includes(subsection._id) ? (
                      <img src={loading} alt="loading" className="w-[30px] h-[30px]" />
                    ) : (
                      <MdOutlineDownload className="min-w-[50px]" onClick={() => startDownload(subsection)} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
      {confirmationModal && (
        <VideoModal videoData={confirmationModal} openModal={openConfirmationModal} />
      )}
    </motion.div>
  );
};

export default ViewCourse;
