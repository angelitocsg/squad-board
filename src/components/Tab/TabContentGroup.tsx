interface IProps {
  children: any;
  minHeight?: number;
}

const TabContentGroup = ({ children, minHeight }: IProps) => {
  const style = minHeight ? { minHeight } : {};
  return (
    <div className="tab-content" id="myTabContent" style={style}>
      {children}
    </div>
  );
};

export default TabContentGroup;
