import StoryModel from "../data/StoryModel";
import ResumoBusinessDoR from "./resumoBusinessDoR";
import ResumoTechDoR from "./resumoTechDoR";
import { renderText } from "./useController";

interface IProps {
  modal?: boolean;
  state: StoryModel;
}

const Resumo = ({ modal, state }: IProps) => {
  return (
    <div className="card bg-light">
      <div className="card-body">
        {!modal && (
          <>
            <p>
              <span className="text-muted">História:</span> {state.story} |{" "}
              {state.title}
            </p>
            <hr />
          </>
        )}
        <p className="text-muted m-0">O que será desenvolvido?</p>
        <p>{state.oque}</p>
        <p className="text-muted m-0">Por que será desenvolvido?</p>
        <p>{state.porque}</p>
        <p className="text-muted m-0">Como será desenvolvido?</p>
        <p>{state.como}</p>

        {renderText(
          !!state.businessDefinitionOfReady.urlPrototipoUI,
          [`Link protótipo de interface (Figma): {{link}}`],
          state.businessDefinitionOfReady.urlPrototipoUI,
        )}

        {renderText(!!state.businessDefinitionOfReady.obsTechSpec, [
          `Para acessar as techspecs: ${state.businessDefinitionOfReady.obsTechSpec}`,
        ])}

        <ResumoBusinessDoR state={state} />
        <ResumoTechDoR state={state} />
      </div>
    </div>
  );
};

export default Resumo;
