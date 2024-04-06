interface IProps {
  active?: boolean;
  tabId: string;
  tabLabel: string;
  tabBadge?: string;
  onClick?: () => void;
}

const Tab = ({ active, tabId, tabLabel, tabBadge, onClick }: IProps) => {
  return (
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link ${active ? "active" : ""}`}
        id={`${tabId}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#${tabId}-tab-pane`}
        type="button"
        role="tab"
        aria-controls={`${tabId}-tab-pane`}
        aria-selected={active ? "true" : "false"}
        onClick={onClick}>
        {tabLabel}{" "}
        {tabBadge && <span className="badge rounded-pill text-bg-light">{tabBadge}</span>}
      </button>
    </li>
  );
};

export default Tab;
