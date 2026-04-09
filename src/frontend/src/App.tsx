import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const AnalyzePage = lazy(() => import("@/pages/AnalyzePage"));
const HistoryPage = lazy(() => import("@/pages/HistoryPage"));
const AnalysisDetailPage = lazy(() => import("@/pages/AnalysisDetailPage"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" label="Loading page…" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const analyzeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analyze",
  component: AnalyzePage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: HistoryPage,
});

const analysisDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history/$id",
  component: AnalysisDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  analyzeRoute,
  historyRoute,
  analysisDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
