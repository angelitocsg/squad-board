interface IProps {
  group?: boolean;
  children: any;
}

const BoardCardBody = ({ group, children }: IProps) => (
  <div
    className={`card-body py-2 d-flex ${
      group ? "align-items-center" : ""
    }`}
  >
    {children}
  </div>
);

export default BoardCardBody;
