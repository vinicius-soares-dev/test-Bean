import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/sign-up/SignUp";
import { SignIn } from "./pages/sign-in/SignIn";
import { Home } from "./pages/home/home";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
