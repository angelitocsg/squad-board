interface IProps {
  title: string;
}

const NoContentPage = ({ title }: IProps) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">{title}</h1>
      <h2 className="mb-4 h3">Sem informações para exibir</h2>
      <p>
        Importe o conteúdo arrastando o arquivo no <strong>canto superior a direita ou</strong>
        <br />através do botão no <strong>canto inferior a direita</strong>.
      </p>
    </div>
  );
};

export default NoContentPage;
