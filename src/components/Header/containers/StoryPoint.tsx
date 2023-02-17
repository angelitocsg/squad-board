interface IProps {
  label: string;
  storyPoints: number;
}

const StoryPoint = ({ label, storyPoints }: IProps) => (
  <div className="d-inline-flex">
    <small>
      {label}:
      <span className="rounded-circle ms-1 px-1 bg-danger text-light opacity">
        <strong>{storyPoints}</strong>
      </span>
    </small>
  </div>
);

export default StoryPoint;
