"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../actions/login";
import { useAuthStore } from "../../store/authStore";
import loginImage from "@assets/images/loginImg.png";
import { Input } from "@/components/ui/input";

enum userData {
  ChangePassword = 1,
  admin = "admin",
  teacher = "teacher",
  student = "student",
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  // const user = useAuthStore((state) => state.user);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const result = await login({ email, password });

    console.log(result, "set result", setUser);

    setUser(result.user);
    if (result.must_change_password === userData.ChangePassword) {
      router.push("/change-password");
    } else {
      if (result.user.role === userData.admin) {
        router.push("/admin-dashboard");
      } else {
        router.push("/e-portal");
      }
    }
  };

  return (
    <section
      className={`
          relative h-screen bg-fixed bg-center bg-cover w-full
        `}
      style={{ backgroundImage: `url(${loginImage.src})` }}
    >
      <div className="w-1/2 h-full flex items-center justify-center lg:w-1/2">
        <form
          onSubmit={handleLogin}
          className="flex items-center flex-col w-2/3 py-10 bg-green-800 shadow-2xl rounded-sm"
        >
          <div className="w-full px-10 py-5 font-bold">
            <label htmlFor="email">Email Address: </label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              // className="gap-4"
            />
          </div>
          <div className="w-full px-10 py-5 font-bold">
            <label htmlFor="password">Password</label>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-900 w-70 h-12 rounded-sm hover: text-white"
          >
            Login
          </button>
        </form>
      </div>

      {/*<div className="h-full flex items-center justify-center bg-black/40">*/}
      {/*  <div className="max-w-screen-xl px-20">*/}
      {/*    <h1 className="text-5xl font-extrabold text-off-white mb-4">*/}
      {/*      Welcome to Zoe Seed Schools*/}
      {/*    </h1>*/}
      {/*    <p className="text-lg text-amber-50 mb-8">*/}
      {/*      Empowering students with knowledge, character, and excellence.*/}
      {/*    </p>*/}
      {/*    <div>*/}
      {/*      <button className="px-6 py-3 text-white outline-2 outline-offset-2 outline-blue-700 hover:bg-blue-700 hover:outline-0 rounded-lg font-medium mr-7">*/}
      {/*        Enroll Now*/}
      {/*      </button>*/}
      {/*      <button className="px-6 py-3 text-white outline-2 outline-offset-2 outline-blue-700 hover:bg-blue-700 hover:outline-0 rounded-lg font-medium mr-7">*/}
      {/*        Learn More*/}
      {/*      </button>*/}
      {/*      <button className="px-6 py-3 text-white outline-2 outline-offset-2 outline-blue-700 hover:bg-blue-700 hover:outline-0 rounded-lg font-medium">*/}
      {/*        Take A virtual Tour*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
};

export default LoginPage;
