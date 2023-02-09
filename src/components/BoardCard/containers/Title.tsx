interface IProps {
  featureColor: string;
  parentDescription: string;
}

const BoardCardTitle = ({ featureColor, parentDescription }: IProps) => (
  <div
    className={`card-header p-1 ps-2 small opacity ${featureColor} text-white`}
  >
    {parentDescription}
  </div>
);

export default BoardCardTitle;
