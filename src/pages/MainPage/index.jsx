import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import MainContent from "../../components/MainContent";
import ChatDrawer from "../../components/ChatDrawer";
import "../../index.css";
import {
  getFilesByProjectId as fetchFilesAPI,
  updateFile as updateFileAPI,
  executeFile as executeFileAPI,
  createFile as createFileAPI,
} from "../../utils/api";

const getFileLanguage = (fileType) => {
  switch (fileType) {
    case "js":
      return "javascript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "ts":
      return "typescript";
    case "json":
      return "json";
    case "java":
      return "java";
    case "py":
      return "python";
    default:
      return "plaintext";
  }
};

const getFileNameWithExtension = (fileName, fileType) => {
  const extensionMap = {
    javascript: "js",
    css: "css",
    html: "html",
    typescript: "ts",
    json: "json",
    java: "java",
    python: "py",
  };
  return `${fileName}.${extensionMap[fileType] || ""}`;
};

export default function MainPage({ showChat, toggleChat }) {
  const [files, setFiles] = useState({});
  const [fileName, setFileName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [output, setOutput] = useState("");
  const [usersId, setUsersId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(showChat); // 채팅창 상태 초기화

  // 로컬 스토리지에서 usersId 가져오기
  useEffect(() => {
    const storedUsersId = localStorage.getItem("usersId");
    if (storedUsersId) {
      setUsersId(storedUsersId);
    } else {
      console.error("usersId가 로컬 스토리지에 존재하지 않습니다.");
    }
  }, []);

  useEffect(() => {
    if (usersId) {
      const fetchFiles = async () => {
        try {
          const fetchedFiles = await fetchFilesAPI(usersId);
          console.log("Fetched files:", fetchedFiles);
          const filesObject = fetchedFiles.reduce((acc, file) => {
            const fullFileName = getFileNameWithExtension(
              file.file_name,
              getFileLanguage(file.file_type)
            );
            acc[fullFileName] = {
              name: fullFileName,
              language: getFileLanguage(file.file_type),
              value: file.content,
              id: file.id,
            };
            return acc;
          }, {});
          console.log("Files object:", filesObject);
          setFiles(filesObject);
          if (Object.keys(filesObject).length > 0) {
            setFileName(Object.keys(filesObject)[0]);
          }
        } catch (error) {
          console.error("Failed to fetch files:", error);
        }
      };
      fetchFiles();
    }
  }, [usersId]);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  const file = files[fileName] || { language: "", value: "" };
  console.log("App file:", file);

  const createFileLocal = async (newFileName) => {
    const [name, extension] = newFileName.split(".");
    const newFileLanguage = getFileLanguage(extension);
    try {
      if (files[newFileName]) {
        console.error("이미 존재하는 파일 이름입니다.");
        return;
      }
      const createdFile = await createFileAPI(usersId, name, extension);
      const fetchedFiles = await fetchFilesAPI(usersId);
      const filesObject = fetchedFiles.reduce((acc, file) => {
        const fullFileName = getFileNameWithExtension(
          file.file_name,
          getFileLanguage(file.file_type)
        );
        acc[fullFileName] = {
          name: fullFileName,
          language: getFileLanguage(file.file_type),
          value: file.content,
          id: file.id,
        };
        return acc;
      }, {});

      setFiles(filesObject);
      setFileName(newFileName); // 파일 이름을 확장자 포함하여 설정
    } catch (error) {
      console.error("Failed to create file:", error);
    }
  };

  const deleteFileLocal = (name) => {
    if (Object.keys(files).length === 1) return;
    const newFiles = { ...files };
    delete newFiles[name];
    const remainingFileNames = Object.keys(newFiles);
    setFiles(newFiles);
    setFileName(remainingFileNames[0]);
  };

  const executeCode = async () => {
    console.log("executeCode 함수 호출됨");
    const currentFile = files[fileName];
    console.log("Current file for execution:", currentFile);
    if (!currentFile.id) {
      console.error("파일 ID가 없습니다:", currentFile);
      return;
    }
    try {
      console.log("파일 업데이트 요청:", currentFile);
      await updateFileAPI(usersId, currentFile.id, {
        name: currentFile.name,
        type: currentFile.language,
        content: currentFile.value,
      });
      console.log("파일 실행 요청:", currentFile.id);
      const result = await executeFileAPI(usersId, currentFile.id);
      console.log("파일 실행 결과:", result);
      const output = result || "No output";
      setOutput(output);
    } catch (error) {
      console.error("Failed to execute code:", error);
      setOutput(`Failed to execute code: ${error.message}`);
    }
  };

  useEffect(() => {
    setIsChatOpen(showChat); // showChat prop이 변경될 때 isChatOpen 상태를 업데이트
  }, [showChat]);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        usersId={usersId}
        files={files}
        setFiles={setFiles}
        fileName={fileName}
        setFileName={setFileName}
        newFileName={newFileName}
        setNewFileName={setNewFileName}
        createFileLocal={createFileLocal}
        deleteFileLocal={deleteFileLocal}
      />
      <div className="flex flex-col flex-1">
        <div className="flex flex-1 overflow-hidden">
          <div className={`flex-1 ${isChatOpen ? "w-2/3" : "w-full"} h-full`}>
            <MainContent
              file={file}
              files={files}
              setFiles={setFiles}
              fileName={fileName}
              executeCode={executeCode}
            />
          </div>
          {isChatOpen && (
            <div className="w-1/3 h-full">
              <ChatDrawer toggleChat={toggleChat} />
            </div>
          )}
        </div>
        <Footer output={output} />
      </div>
    </div>
  );
}
