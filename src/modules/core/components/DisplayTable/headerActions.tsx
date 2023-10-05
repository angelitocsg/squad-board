type IButton = {
  label: string;
  action: () => void;
};

export type IHeaderActions = {
  buttonNew?: IButton;
  buttonImport?: IButton;
  buttonExport?: IButton;
};

const HeaderActions = ({
  buttonNew,
  buttonImport,
  buttonExport,
}: IHeaderActions) => {
  return (
    <div className="btn-group pb-2" role="group" aria-label="table actions">
      {buttonNew && (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={buttonNew.action}
        >
          {buttonNew?.label}
        </button>
      )}
      {buttonImport && (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={buttonImport.action}
        >
          {buttonImport?.label}
        </button>
      )}
      {buttonExport && (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={buttonExport.action}
        >
          {buttonExport?.label}
        </button>
      )}
    </div>
  );
};

export default HeaderActions;
