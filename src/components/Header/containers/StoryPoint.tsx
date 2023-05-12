interface IProps {
  label: string;
  storyPoints: { total: number; completed?: number };
}

const StoryPoint = ({ label, storyPoints }: IProps) => (
  <div className="d-inline-flex">
    <small>
      {label}:
      <span className="rounded-circle ms-1 px-1 text-bg-danger text-light opacity">
        <strong>{storyPoints.total}</strong>
      </span>
      {storyPoints.completed ? (
        <span className="rounded-circle ms-1 px-1 bg-success text-light opacity">
          <strong>{storyPoints.completed}</strong>
        </span>
      ) : undefined}
    </small>
  </div>
);

export default StoryPoint;
