const Button = ({ name, onClick, children }) => (
  <div>
    <span>Olá {name} ... </span>
    <button onClick={onClick}>{`Abrir ${name}`}</button>
  </div>
);

function App() {
  return (
    <div className="App">
      <Button name="Google" onClick={() => window.open("https://google.com")} />
      <Button
        name="Facebook"
        onClick={() => window.open("https://facebook.com")}
      />
      <Button name="Gmail" onClick={() => window.open("https://gmail.com")} />
      <Button
        name="Youtube"
        onClick={() => window.open("https://youtube.com")}
      />
      <Button
        name="Twitter"
        onClick={() => window.open("https://twitter.com")}
      />
    </div>
  );
}

export default App;
