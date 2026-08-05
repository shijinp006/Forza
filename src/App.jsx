import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { DocExpiry } from "./components/DocExpiry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="doc-expiry" element={<DocExpiry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;