interface IProps {
  active?: boolean;
  tabId: string;
  children: any;
}

const TabContent = ({ active, tabId, children }: IProps) => {
  return (
    <div
      className={`tab-pane ${active ? "show active" : ""}`}
      id={`${tabId}-tab-pane`}
      role="tabpanel"
      aria-labelledby={`${tabId}-tab`}
      tabIndex={0}
    >
      <div className="border border-top-0 rounded-bottom bg-white p-3">{children}</div>
    </div>
  );
};

export default TabContent;
