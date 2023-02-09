export const COLUMN_WIDTH = 400;

const BoardColumn = ({ children }: any) => {
  return (
    <div className="col-default" style={{ minWidth: COLUMN_WIDTH, width: '100%' }}>
      <div className="ps-2 pt-2 pe-2 height-100">{children}</div>
    </div>
  );
};

export default BoardColumn;
