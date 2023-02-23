interface IProps {
  label: string;
  storyPoints: { total: number; ended?: number };
}

const StoryPoint = ({ label, storyPoints }: IProps) => (
  <div className="d-inline-flex">
    <small>
      {label}:
      <span className="rounded-circle ms-1 px-1 text-bg-danger text-light opacity">
        <strong>{storyPoints.total}</strong>
      </span>
      {storyPoints.ended ? (
        <span className="rounded-circle ms-1 px-1 bg-success text-light opacity">
          <strong>{storyPoints.ended}</strong>
        </span>
      ) : undefined}
    </small>
  </div>
);

export default StoryPoint;
