interface IProps {
  active?: boolean;
  tabId: string;
  tabLabel: string;
}

const Tab = ({ active, tabId, tabLabel }: IProps) => {
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
      >
        {tabLabel}
      </button>
    </li>
  );
};

export default Tab;