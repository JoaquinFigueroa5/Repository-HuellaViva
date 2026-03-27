import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Loader from "@/components/common/Loading";
import routes from "@/routes";

function App() {

  let element = useRoutes(routes);

  return (
    <Suspense fallback={<Loader />}>
      {element}
    </Suspense>
  );
}

export default App;
