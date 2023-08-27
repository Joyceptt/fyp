"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useState } from "react";

interface User {
  name: string;
  email: string;
};

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({user: null, setUser: () => {}});

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <UserContext.Provider value={{user: user, setUser}}>{children}</UserContext.Provider>
    </ThemeProvider>
  );
}
