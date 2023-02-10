import { useState } from "react";

import { ImportService } from "../../services/ImportService";

const ImportBoardModal = () => {
  const [data, setData] = useState("");

  const handleLoadData = () => {
    ImportService.ImportCSV(data);
    setData("");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
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
              Importar Board
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
              placeholder="cole o conteúdo CSV separado por vírgula aqui"
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
  );
};

export default ImportBoardModal;
