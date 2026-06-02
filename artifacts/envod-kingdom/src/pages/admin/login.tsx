import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/image_1780437854819.png";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const login = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({
      data: { username, password }
    }, {
      onSuccess: () => {
        setLocation("/admin/dashboard");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid username or password",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="mb-8 bg-white/90 p-2 rounded-sm">
        <img src={logoPath} alt="ENVOD KINGDOM" className="h-12 object-contain" />
      </div>
      
      <div className="w-full max-w-md bg-card p-8 rounded-xl border border-white/10 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
        <p className="text-muted-foreground mb-8">Sign in to manage the website content</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Username</label>
            <Input 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background border-white/10 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Password</label>
            <Input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-white/10 text-white"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-6"
            disabled={login.isPending}
          >
            {login.isPending ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
