import ClearCacheButton from "../../components/ClearCacheButton";
import DropFile from "../../components/DropFile";
import ImportBoardModal from "../../components/ImportBoardModal";
import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../components/Tab";
import NoContentPage from "../noContent";
import EditForm from "./containers/editForm";
import useFaqEditor from "./useFaqEditor";

const FaqEditorPage = () => {
  const {
    current_content,
    current_category,
    mfe_assets,
    handleAssetsChange,
    getFaqData,
    editContent,
    removeContent,
    updateContentValue,
    handleLoadFile,
    handleDownloadFile,
  } = useFaqEditor();

  return getFaqData().length === 0 ? (
    <>
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />
      <NoContentPage title="Editor FAQ" />
      <ClearCacheButton />
      <ImportBoardModal onUploadClick={handleLoadFile} />
    </>
  ) : (
    <div className="container-fluid pt-3 pb-2">
      <DropFile encoding="UTF-8" onLoadFile={handleLoadFile} />

      <ClearCacheButton />
      <ImportBoardModal
        onUploadClick={handleLoadFile}
        onDownloadClick={handleDownloadFile}
      />

      <h1 className="h4 pb-3">Editor FAQ</h1>

      <div className="mb-3">
        <label htmlFor="assetsInput" className="form-label">
          URL base para as imagens{" "}
          <pre className="d-inline">(pathUrlMFEImg)</pre>
        </label>
        <input
          type="text"
          name="assets"
          className="form-control form-control-sm"
          id="assetsInput"
          value={mfe_assets}
          autoComplete="off"
          onChange={handleAssetsChange}
        />
      </div>

      <TabGroup>
        {getFaqData().map((categ, index) => (
          <Tab
            key={`t${categ.id}`}
            tabId={`t${categ.id}`}
            tabLabel={categ.categoria}
            active={index === 0}
          />
        ))}
      </TabGroup>
      <TabContentGroup>
        {getFaqData().map((categ, index) => (
          <TabContent key={index} active={index === 0} tabId={`t${categ.id}`}>
            <table className="table table-sm table-hover">
              <thead className="table-secondary">
                <tr>
                  <th>Pergunta</th>
                  <th>Palavras chave</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {categ.conteudo.map((cont) => (
                  <tr key={cont.id}>
                    <td>{cont.pergunta}</td>
                    <td>{cont.palavras_chave}</td>
                    <td>
                      <span
                        role="button"
                        onClick={() => editContent(categ.id, cont.id)}
                        className="me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editFaqContent"
                      >
                        <i className="bi bi-pencil pe-1"></i>Editar
                      </span>
                      <span
                        role="button"
                        onClick={(e) => removeContent(categ.id, cont.id)}
                      >
                        <i className="bi bi-trash pe-1"></i>Excluir
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabContent>
        ))}
      </TabContentGroup>
      <EditForm
        mfe_assets={mfe_assets}
        content={current_content}
        categoryId={current_category?.id}
        onChange={updateContentValue}
      />
    </div>
  );
};

export default FaqEditorPage;
