import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const EmergencyGuide = lazy(() => import("@/pages/Emergency"));
const Loader = lazy(() => import("@/components/common/Loading"));

const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/emergency-guide', element: <EmergencyGuide /> },
    { path: '/loading', element: <Loader /> },
    { path: '*', element: <Navigate to="/" replace /> }
];

export default routes;