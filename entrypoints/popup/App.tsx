import "./App.css";

import { active } from "~/utils/storage";

function App() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    active.getValue().then((isActive) => {
      setIsChecked(isActive);
    });
  });
  return (
    <>
      <h2>
        <span className="capital">B</span>ring{" "}
        <span className="capital">O</span>ld <span className="capital">M</span>
        at <span className="capital">B</span>
        ack
      </h2>
      <div>
        Przełącz tryb, aby wyświetlić aktualne informacje z mat.umk.pl w starej
        szacie graficznej (sprzed 04.06.24)
      </div>
      <div className="switch-container">
        <input
          id="switch"
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            let newState = !isChecked;
            setIsChecked(newState);
            active.setValue(newState);
          }}
        />
        <label className="love-heart" htmlFor="switch">
          <i className="left"></i>
          <i className="right"></i>
          <i className="bottom"></i>
          <div className="round"></div>
        </label>
      </div>
    </>
  );
}

export default App;
