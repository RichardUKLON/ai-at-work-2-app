import { useEffect, useRef } from "react";
import { useGame, type Route, type Screen } from "./store";
import { AppShell } from "./components/AppShell";
import { GlossaryPanel } from "./components/GlossaryPanel";
import { BadgeToast } from "./components/BadgeToast";
import { HomeScreen } from "./screens/HomeScreen";
import { MissionMap } from "./screens/MissionMap";
import { MissionPlayer } from "./screens/MissionPlayer";
import { FinalePlayer } from "./screens/FinalePlayer";
import { DebriefScreen } from "./screens/DebriefScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { AboutScreen } from "./screens/AboutScreen";

const SCREENS: Screen[] = [
  "home",
  "map",
  "mission",
  "reflection",
  "debrief",
  "progress",
  "results",
  "about",
];

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [screen, missionId] = raw.split("/");
  if (SCREENS.includes(screen as Screen)) {
    return { screen: screen as Screen, missionId: missionId || undefined };
  }
  return { screen: "home" };
}

function routeToHash(route: Route): string {
  return route.missionId
    ? `#/${route.screen}/${route.missionId}`
    : `#/${route.screen}`;
}

export default function App() {
  const route = useGame((s) => s.route);
  const navigate = useGame((s) => s.navigate);
  const liveRef = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  // On load and on browser back/forward, sync route from the hash.
  useEffect(() => {
    if (window.location.hash) navigate(parseHash());
    const onHash = () => navigate(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the hash in step with the route (without triggering a reload loop).
  useEffect(() => {
    const target = routeToHash(route);
    if (window.location.hash !== target) {
      window.location.hash = target;
    }
    // Move focus to main and announce the new screen (skip the very first paint).
    if (!firstLoad.current) {
      const main = document.getElementById("main");
      main?.focus();
      if (liveRef.current) {
        liveRef.current.textContent = `${route.screen} screen`;
      }
    }
    firstLoad.current = false;
  }, [route]);

  return (
    <>
      <div aria-live="polite" className="sr-only" ref={liveRef} />
      <AppShell>
        <ScreenRouter route={route} />
      </AppShell>
      <GlossaryPanel />
      <BadgeToast />
    </>
  );
}

function ScreenRouter({ route }: { route: Route }) {
  switch (route.screen) {
    case "home":
      return <HomeScreen />;
    case "map":
      return <MissionMap />;
    case "mission":
    case "reflection":
      return route.missionId === "m6" ? (
        <FinalePlayer />
      ) : (
        <MissionPlayer missionId={route.missionId ?? "m1"} />
      );
    case "debrief":
      return <DebriefScreen missionId={route.missionId ?? "m1"} />;
    case "progress":
      return <ProgressScreen />;
    case "results":
      return <ResultsScreen />;
    case "about":
      return <AboutScreen />;
    default:
      return <HomeScreen />;
  }
}
