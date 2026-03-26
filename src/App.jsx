import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import routes from "@/routes";

function App() {

  let element = useRoutes(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  );
}

export default App;
