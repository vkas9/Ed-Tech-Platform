import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from "formik";
import { IoIosCloudUpload } from "react-icons/io";
import ReactPlayer from "react-player";
import { toast } from "react-hot-toast"; // Assuming you're using toast for notifications

const UploadProfile=({
  name,
  label,
  video = false,
  viewData = null,
  editData = null,
})=> {
  
  // console.log("video=>",video,"/","viewData->",viewData)
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [, , helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    // console.log("file",file)
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("The file size exceeds the limit of 100 MB");
        return;
      }
      setIsLoading(true);
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4", ".mov", ".mkv"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setIsLoading(false);
      toast.error("Failed to read file. Please try again.");
    };
  };

  useEffect(() => {
    setValue(selectedFile);
    setTouched(true);
  }, [selectedFile, setValue, setTouched]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-red-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-white/40`}
      >
        {isLoading ? (
          <p className="text-center text-richblack-200">Loading...</p>
        ) : previewSource ? (
          <div className="flex w-full items-center justify-center  flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className=" max-h-[200px] h-[150px] w-[150px] vm:h-[200px] vm:w-[200px] max-w-[200px]  overflow-auto rounded-full object-cover"
              />
            ) : (
              <ReactPlayer
                url={previewSource}
                controls={true}
                width="100%"
                height="100%"
              />
            )}
            {!viewData && (
              <div className=" flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(null);
                }} 
                className="mt-3 text-richblack-400 active:bg-white/20 sm:hover:bg-white/20 bg-white/10 py-2 rounded-full px-5  "
              >
                Cancel
              </button>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col  items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <IoIosCloudUpload className="text-3xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] leading-8 text-center text-lg text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or {" "}
              <span className="font-semibold bg-white/10 hover:bg-white/20 whitespace-nowrap py-1 px-2 rounded-full text-yellow-50">Browse a
              file</span>
              <br />
            </p>
            {video ? (
              <span className="font-bold text-red-400">
                The file size limit is 100 MB for now
                <sup className="text-red-400">*</sup>
              </span>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default UploadProfile;