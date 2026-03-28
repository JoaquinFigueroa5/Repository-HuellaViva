import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const EmergencyGuide = lazy(() => import("@/pages/Emergency"));
const Loader = lazy(() => import("@/components/common/Loading"));
const Report = lazy(() => import("@/pages/Report"));
const Calculator = lazy(() => import("@/pages/Calculator"));

const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/emergency', element: <EmergencyGuide /> },
    { path: '/loading', element: <Loader /> },
    { path: '/report', element: <Report /> },
    { path: '/calculator', element: <Calculator /> },
    { path: '*', element: <Navigate to="/" replace /> }
];

export default routes;