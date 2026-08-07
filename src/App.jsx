import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { POSReport } from "./components/POSReport";
import { DocExpiry } from "./components/DocExpiry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<POSReport />} />
          <Route path="counter" element={<POSReport />} />
          <Route path="doc-expiry" element={<DocExpiry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;