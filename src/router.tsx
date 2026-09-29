import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";

const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Subjects = lazy(() => import("./pages/Subjects"));
const SubjectDetails = lazy(() => import("./pages/SubjectDetails"));
const MockTests = lazy(() => import("./pages/MockTests"));
const Profile = lazy(() => import("./pages/Profile"));
const Sync = lazy(() => import("./pages/Sync"));
const Questions = lazy(() => import("./pages/Questions"));
const Today = lazy(() => import("./pages/Today"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const Achievements = lazy(() => import("./pages/Achievements"));
const StudyPlan = lazy(() => import("./pages/StudyPlan"));
const Focus = lazy(() => import("./pages/Focus"));
const CalendarPage = lazy(() => import("./pages/Calendar"));
const WeakTopics = lazy(() => import("./pages/WeakTopics"));
const Summaries = lazy(() => import("./pages/Summaries"));
const Goals = lazy(() => import("./pages/Goals"));
const Analytics = lazy(() => import("./pages/Analytics"));

function PageLoader() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
        <p className="text-xs text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

const withSuspense = (Component: React.LazyExoticComponent<() => React.ReactElement>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Landing),
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(Dashboard) },
      { path: "today", element: withSuspense(Today) },
      { path: "subjects", element: withSuspense(Subjects) },
      { path: "subjects/:id", element: withSuspense(SubjectDetails) },
      { path: "mock-tests", element: withSuspense(MockTests) },
      { path: "questions", element: withSuspense(Questions) },
      { path: "flashcards", element: withSuspense(Flashcards) },
      { path: "calendar", element: withSuspense(CalendarPage) },
      { path: "study-plan", element: withSuspense(StudyPlan) },
      { path: "focus", element: withSuspense(Focus) },
      { path: "achievements", element: withSuspense(Achievements) },
      { path: "weak-topics", element: withSuspense(WeakTopics) },
      { path: "summaries", element: withSuspense(Summaries) },
      { path: "goals", element: withSuspense(Goals) },
      { path: "analytics", element: withSuspense(Analytics) },
      { path: "profile", element: withSuspense(Profile) },
      { path: "sync", element: withSuspense(Sync) },
    ],
  },
]);

export default router;
