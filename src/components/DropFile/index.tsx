import useDropFile from "./useDropFile";

interface IProps {
  encoding?: string;
  onLoadFile: (data: string) => void;
}

const DropFile = ({ encoding, onLoadFile }: IProps) => {
  const { getRootProps, getInputProps } = useDropFile({ encoding, onLoadFile });
  return (
    <div
      className={`border bg-light d-flex justify-content-center align-items-center text-muted`}
      style={{
        position: "absolute",
        top: 15,
        right: 25,
        width: 250,
        height: 75,
      }}
      {...getRootProps()}
      role="button"
    >
      <span className="text-center">
        Arraste o arquivo aqui!
        <br />
        <u>Importar conteúdo</u>
      </span>
      <input {...getInputProps()} />
    </div>
  );
};

export default DropFile;
