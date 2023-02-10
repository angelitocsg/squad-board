const ErrorPage = () => {
  return (
    <div className="container m-5">
      <h1>Oops!</h1>
      <h2>Algo não saiu como o planejado.</h2>
      <p>
        Tente limpar o cache da aplicação{" "}
        <a
          href="/#"
          onClick={() => {
            localStorage.clear();
          }}
        >
          clicando aqui
        </a>
        .
      </p>
    </div>
  );
};

export default ErrorPage;
