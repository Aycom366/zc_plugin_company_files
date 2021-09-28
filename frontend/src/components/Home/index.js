import React, { useState, useRef, useLayoutEffect } from "react";
import RecentlyViewed from "./RecentlyViewed";
import Folder from "./Folder/index";
import Files from "./Files/index";
// import SelectFileModal from "../FileUpload/SelectFileModal";
import FileOptions from "../FileUpload/FileOptions";
import ShortCut from "./ShortCut";
import RealTime from "../../helpers/realtime.helper";


import UploadProgressModal from "../FileUpload/UploadProgressModal";
import FileUpload from "../FileUpload/index";
import SnackBar from "reuse-react-snackbar";

const Index = () => {
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(false);
  const [options, setOptions] = useState(false);
  const [demo, setDemo] = useState(false);
  const [newFile, setNewFile] = useState({ data: {} });

  // let progress = useRef(false)

  useLayoutEffect(() => {
    const fetchNewData = () => {
      RealTime.subscribe("newFile", "", (data) => setNewFile(data));
    };
    fetchNewData();
    console.log(newFile);
  }, [newFile]);

  const showOptions = (e) => {
    setOptions(!options);
    e.stopPropagation();
    document.addEventListener("click", hideOptions);
  };

  const hideOptions = (event) => {
    setOptions(false);
    event.stopPropagation();
    document.removeEventListener("click", hideOptions);
  };

  const showUploadModal = () => {
    setUpload(!upload);
  };

  const hideUploadModal = () => {
    setUpload(!upload);
  };

  const showProgressModal = () => {
    hideUploadModal();
    setProgress(true);
    setDemo(true);
    console.log({ Progress: progress, Demo: demo });
  };

  const hideProgressModal = () => {
    setProgress(false);
  };

  return (
    <div
      className={
        (upload ? " tw-overflow-y-hidden" : "") + " tw-w-full tw-py-4 tw-px-10 tw-z-auto"
      }
    >
      <button
        onClick={showOptions}
        className="tw-mt-4 tw-px-3 tw-py-2 tw-text-sm tw-text-green-500 tw-border tw-rounded tw-border-green-500 hover:tw-text-white hover:tw-bg-green-500 tw-outline-none"
      >
        Add File
      </button>

      <FileOptions options={options} showUploadModal={showUploadModal} />
      <ShortCut />
      <RecentlyViewed />
      <Folder />
      <Files />
      {upload && (
        <FileUpload
          upload={upload}
          progress={progress}
          hideUploadModal={hideUploadModal}
          showProgressModal={showProgressModal}
          hideProgressModal={hideProgressModal}
        />
      )}
      {Object.keys(newFile.data).length && (
        <SnackBar
          message={newFile.data.fileName + " added successfully"}
          mode="SUCCESS"
          open={true}
          timeout={10000}
          style={{
            textStyle: {
              color: "white",
            },
            buttonStyle: {
              backgroundColor: "white",
              color: "black",
            },
            containerStyle: {
              background: "grey",
              boxShadow: "black 6px 7px 12px -4px",
            },
          }}
        />
      )}
    </div>
  );
};

export default Index;
