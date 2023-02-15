interface IProps {
  groupSelected?: number;
  onGroupByClick: (group: number) => void;
}

const HeaderGroupBy = ({ groupSelected, onGroupByClick }: IProps) => (
  <div className="d-inline-flex align-items-center">
    <small className="me-1">Agrupar por:</small>
    <div>
      <button
        type="button"
        className={`btn btn-sm btn-link ${
          groupSelected === 2 ? "fw-bold" : ""
        }`}
        onClick={() => onGroupByClick(2)}
      >
        Story/Task/Bug
      </button>
      <button
        type="button"
        className={`btn btn-sm btn-link ${
          groupSelected === 3 ? "fw-bold" : ""
        }`}
        onClick={() => onGroupByClick(3)}
      >
        Responsável
      </button>
    </div>
  </div>
);

export default HeaderGroupBy;
