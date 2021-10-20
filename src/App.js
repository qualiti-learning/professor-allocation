import { Button } from "react-bootstrap";

const WelcomeButton = ({ name, onClick }) => (
  <div>
    <span>Olá {name} ... </span>
    <Button variant="danger" onClick={onClick}>{`Abrir ${name}`}</Button>
  </div>
);

function App() {
  return (
    <div className="App">
      <WelcomeButton
        name="Google"
        onClick={() => window.open("https://google.com")}
      />
      <WelcomeButton
        name="Facebook"
        onClick={() => window.open("https://facebook.com")}
      />
      <WelcomeButton
        name="Gmail"
        onClick={() => window.open("https://gmail.com")}
      />
      <WelcomeButton
        name="Youtube"
        onClick={() => window.open("https://youtube.com")}
      />
      <WelcomeButton
        name="Twitter"
        onClick={() => window.open("https://twitter.com")}
      />
    </div>
  );
}

export default App;
