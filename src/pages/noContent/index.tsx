interface IProps {
  title: string;
}

const NoContentPage = ({ title }: IProps) => {
  return (
    <div className="container m-5">
      <h1 className="mb-4">{title}</h1>
      <h2 className="mb-4 h3">Sem informações para exibir</h2>
      <p>Importe o conteúdo no link superior a direita.</p>
    </div>
  );
};

export default NoContentPage;
