import "react-material-symbols/rounded";

import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ProvidersWrapper from "./providers";
import Generate from "./Generate";

const Application = () => (
  <ProvidersWrapper>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/generate" Component={Generate} />
      </Route>
    </Routes>
  </ProvidersWrapper>
);

export default Application;
