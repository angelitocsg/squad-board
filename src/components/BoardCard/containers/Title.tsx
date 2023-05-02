interface IProps {
  id?: string;
  featureColor: string;
  parentDescription: string;
  role: string;
  handleClick: () => void;
}

const BoardCardTitle = ({
  id,
  featureColor,
  parentDescription,
  role,
  handleClick,
}: IProps) => (
  <div
    className={`card-header p-1 ps-2 small opacity ${featureColor} text-white`}
    data-bs-toggle="collapse"
    data-bs-target={`#${id}`}
    aria-expanded="false"
    aria-controls={`${id}`}
    role={role}
    onClick={handleClick}
  >
    {parentDescription}
  </div>
);

export default BoardCardTitle;
