import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import NavMainBar from "./Components/Nav-Bar/NavMainBar";
import PendingToEvaluation from "./Components/PendingToEvaluation";

function App() {
  return (
    <>
      <NavMainBar></NavMainBar>
      <SignUp></SignUp>
      <PendingToEvaluation></PendingToEvaluation>
    </>
  );
}

export default App;
