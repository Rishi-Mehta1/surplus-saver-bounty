import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import StoreDetail from "./pages/StoreDetail";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import Rewards from "./pages/Rewards";
import QRCodePickup from "./pages/QRCodePickup";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import FindStores from "./pages/FindStores";
import HowItWorks from "./pages/HowItWorks";
import { useUser } from '@clerk/clerk-react';
import Chatbot from './components/Chatbot';

function SyncUserToBackend() {
  const { user } = useUser();
  React.useEffect(() => {
    if (user) {
      fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      });
    }
  }, [user]);
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SyncUserToBackend />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/pickup" element={<QRCodePickup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/stores" element={<FindStores />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Chatbot />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
