import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { FaqContentDefault, IFaqContent } from "../../../models/IFaqCategory";
import { marked } from "marked";
interface IProps {
  categoryId?: string;
  content?: IFaqContent;
  mfe_assets: string;
  onChange: (
    categoryId: string,
    contentId: string,
    field: string,
    value: any
  ) => void;
}

const EditForm = ({ categoryId, content, mfe_assets, onChange }: IProps) => {
  const [current, set_current] = useState(content ?? FaqContentDefault());
  const [current_preview, set_current_preview] = useState("");

  useEffect(() => {
    set_current(content ?? FaqContentDefault());
  }, [content]);

  useEffect(() => {
    const resposta = current.resposta.replaceAll("{{pathUrlMFEImg}}", mfe_assets);
    set_current_preview(DOMPurify.sanitize(marked.parse(resposta)));
  }, [current.resposta, mfe_assets]);

  const handleChange = (e: any) => {
    if (categoryId && content && current) {
      set_current({ ...current, [e.target.name]: e.target.value });
      onChange &&
        onChange(categoryId, content.id, e.target.name, e.target.value);
    }
  };

  return (
    <div
      className="modal fade"
      id="editFaqContent"
      tabIndex={-1}
      aria-labelledby="editFaqContentLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editFaqContentLabel">
              Editando conteúdo
            </h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="perguntaInput" className="form-label">
                Pergunta
              </label>
              <input
                type="text"
                name="pergunta"
                className="form-control"
                id="perguntaInput"
                value={current.pergunta}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="respostaInput" className="form-label">
                    Resposta
                  </label>
                  <textarea
                    className="form-control"
                    id="respostaInput"
                    name="resposta"
                    value={current.resposta}
                    onChange={handleChange}
                    rows={15}
                  ></textarea>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="respostaInput" className="form-label">
                    Pré-visualização
                  </label>
                  <div
                    dangerouslySetInnerHTML={{ __html: current_preview }}
                    className="form-control text-bg-light"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
