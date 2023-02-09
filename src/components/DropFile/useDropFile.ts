import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface IProps {
  encoding?: string;
  onLoadFile: (data: string) => void;
}

const useDropFile = ({ encoding, onLoadFile }: IProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = () => {
        onLoadFile && onLoadFile(reader.result as string);
      };

      console.info("Reader encoding:", localStorage.getItem("encoding"));

      const encodingFromSettings =
        encoding ??
        localStorage.getItem("encoding") ??
        "iso-8859-1" ??
        "UTF-8" ??
        "windows-1252";

      localStorage.setItem("encoding", encodingFromSettings);
      reader.readAsText(file, encodingFromSettings);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return {
    getRootProps,
    getInputProps,
  };
};

export default useDropFile;
