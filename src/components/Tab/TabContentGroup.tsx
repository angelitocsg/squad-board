interface IProps {
  children: any;
}

const TabContentGroup = ({ children }: IProps) => {
  return (
    <div className="tab-content" id="myTabContent">
      {children}
    </div>
  );
};

export default TabContentGroup;
