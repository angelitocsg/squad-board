const ErrorPage = () => {
  return (
    <div className="container m-5">
      <h1>Oops!</h1>
      <h2>Algo não saiu como o planejado.</h2>
      <p className="pt-3">
        <a href="/#" title="Ir para página inicial">
          Ir para página inicial
        </a>
      </p>
    </div>
  );
};

export default ErrorPage;
