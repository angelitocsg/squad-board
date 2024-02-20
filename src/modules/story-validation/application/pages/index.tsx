import PageLayout from "../../../../shared/PageLayout";
import HeaderActions from "../../../core/components/DisplayTable/headerActions";
import FormInput from "../../../core/components/FormInput";
import PageBusinessDoR from "./pageBusinessDoR";
import PageTechDoR from "./pageTechDoR";
import Resumo from "./resumo";
import useController from "./useController";

const StoryValidationHome = () => {
  const {
    state,
    tHeaderButtons,
    handleChange,
    handleChangeBusinessDoR,
    handleChangeTechDoR,
  } = useController();

  return (
    <PageLayout title="Validação de histórias">
      <div className="card">
        <div className="card-body">
          <HeaderActions {...tHeaderButtons} />
          <hr />

          <h2 className="h5">Detalhes da história</h2>
          <div className="row">
            <div className="col-3">
              <FormInput
                type="text"
                label="História"
                field="story"
                value={state.story}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <FormInput
                type="text"
                label="Título"
                field="title"
                value={state.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <FormInput
                type="textarea"
                label="O que será desenvolvido?"
                field="oque"
                value={state.oque}
                rows={6}
                onTextAreaChange={handleChange}
              />
            </div>
            <div className="col">
              <FormInput
                type="textarea"
                label="Por que será desenvolvido?"
                field="porque"
                value={state.porque}
                rows={6}
                onTextAreaChange={handleChange}
              />
            </div>
            <div className="col">
              <FormInput
                type="textarea"
                label="Como será desenvolvido?"
                field="como"
                value={state.como}
                rows={6}
                onTextAreaChange={handleChange}
              />
            </div>
          </div>

          <hr />
          <div className="row">
            <PageBusinessDoR
              state={state}
              handleChangeBusinessDoR={handleChangeBusinessDoR}
            />
            <PageTechDoR
              state={state}
              handleChangeTechDoR={handleChangeTechDoR}
            />
          </div>

          <hr />
          <h2 className="h5 mb-3">Resumo</h2>
          <Resumo state={state} />
        </div>
      </div>
    </PageLayout>
  );
};

export default StoryValidationHome;
