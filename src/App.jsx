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
          {/* <Route path="notifications" element={<POSReport />} />
 <Route path="sales" element={<POSReport />} />
<Route path="purchase" element={<POSReport />} />
<Route path="inventory" element={<POSReport />} />
<Route path="tax" element={<POSReport />} />
<Route path="account" element={<POSReport />} />

 
 <Route path="settings" element={<POSReport />} />
<Route path="help" element={<POSReport />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;