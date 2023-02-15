interface IProps {
  storyPoints: number;
}

const StoryPoint = ({ storyPoints }: IProps) => (
  <div className="d-inline-flex">
    <small>
      Story Points:
      <span className="rounded-circle ms-1 px-1 bg-danger text-light opacity">
        <strong>{storyPoints}</strong>
      </span>
    </small>
  </div>
);

export default StoryPoint;
