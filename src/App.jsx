import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Feed from "./pages/Feed";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
