import { Route, Switch } from "wouter";
import Landing from "./pages/landing";
import SiteMap from "./pages/site-map";
import TourPage from "./pages/tour";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/peta" component={SiteMap} />
        <Route path="/tur/:sceneId" component={TourPage} />
        <Route>
          <div className="flex min-h-screen items-center justify-center bg-[#0B2E26] text-white">
            Halaman tidak ditemukan.
          </div>
        </Route>
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
