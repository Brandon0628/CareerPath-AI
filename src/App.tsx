import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Home from "./pages/Home.tsx";
import Index from "./pages/Index.tsx";
import CareerAdvisor from "./pages/CareerAdvisor.tsx";
import TestSkills from "./pages/TestSkills.tsx";
import Roadmap from "./pages/Roadmap.tsx";
import FindCareers from "./pages/FindCareers.tsx";
import Mission from "./pages/Mission.tsx";
import CareerInsights from "./pages/CareerInsights.tsx";
import Reviews from "./pages/Reviews.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/advisor" element={<CareerAdvisor />} />
            <Route path="/discover" element={<Index />} />
            <Route path="/test-skills" element={<TestSkills />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/find-careers" element={<FindCareers />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/insights" element={<CareerInsights />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;