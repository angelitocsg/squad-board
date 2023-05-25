import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";

import useProjectForm, { IProps } from "./useProjectForm";

const ProjectForm = ({ currentProject }: IProps) => {
  const { project, handleSave, handleChange } = useProjectForm({
    currentProject,
  });
  const [description, set_description] = useState<string>("");

  useEffect(() => {
    const _description = project?.description ?? "";
    set_description(DOMPurify.sanitize(marked.parse(_description)));
  }, [project?.description]);

  return (
    <div
      className="modal fade"
      id="projectForm"
      tabIndex={-1}
      aria-labelledby="projectFormLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="projectFormLabel">
              Aplicação
            </h1>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-3">
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    className="form-control"
                    id="id"
                    value={project.id}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-9">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={project.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    id="description"
                    rows={10}
                    value={project.description}
                    style={{
                      minHeight: 200,
                      fontFamily: "courier",
                      fontSize: 12,
                    }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="respostaInput" className="form-label">
                    Pré-visualização
                  </label>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                    className="form-control text-bg-light"
                    style={{
                      minHeight: 200,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>{" "}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
