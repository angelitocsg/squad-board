import { useState } from "react";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";

interface IProps {
  onUploadClick: (data: string) => void;
  onDownloadClick?: (data: string) => void;
}

const ImportBoardModal = ({
  onUploadClick,
  onDownloadClick,
}: IProps) => {
  const [data, setData] = useState("");

  const handleLoadData = () => {
    onUploadClick && onUploadClick(data);
    setData("");
  };

  const handleExportData = () => {
    onDownloadClick && onDownloadClick(data);
  };

  return (
    <>
      <ImportButton />
      {onDownloadClick && <ExportButton onClick={handleExportData}/>}
      <div
        className="modal fade"
        id="importBoard"
        tabIndex={-1}
        aria-labelledby="importBoardLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="importBoardLabel">
                Importar conteúdo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                name="content"
                id="content"
                rows={10}
                value={data}
                placeholder="cole o conteúdo aqui"
                onChange={(e) => setData(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleLoadData}
              >
                Carregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportBoardModal;
