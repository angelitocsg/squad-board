type IButton = {
  label: string;
  action: () => void;
};

export type IHeaderActions = {
  buttonSave: IButton;
  buttonImport?: IButton;
  buttonExport?: IButton;
};

const HeaderActions = ({ buttonSave, buttonImport, buttonExport }: IHeaderActions) => {
  return (
    <div className="btn-group pb-2" role="group" aria-label="table actions">
      {buttonSave && (
        <button type="button" className="btn btn-sm btn-primary" onClick={buttonSave.action}>
          {buttonSave?.label}
        </button>
      )}
      {buttonImport && (
        <button type="button" className="btn btn-sm btn-secondary" onClick={buttonImport.action}>
          {buttonImport?.label}
        </button>
      )}
      {buttonExport && (
        <button type="button" className="btn btn-sm btn-secondary" onClick={buttonExport.action}>
          {buttonExport?.label}
        </button>
      )}
    </div>
  );
};

export default HeaderActions;
