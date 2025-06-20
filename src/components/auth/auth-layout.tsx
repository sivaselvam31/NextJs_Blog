"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

function AuthLayout() {

  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex justify-center items-center min-h-[88.3vh]">
      <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
        <h1 className="text-3xl font-bold text-center mb-10">Welcome</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="login" className="cursor-pointer">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="cursor-pointer">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthLayout;
