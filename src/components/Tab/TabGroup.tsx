interface IProps {
  children:any
}

const TabGroup = ({children }: IProps) => {
  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      {children}
    </ul>
  );
};

export default TabGroup;
