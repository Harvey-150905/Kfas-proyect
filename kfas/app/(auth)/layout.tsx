import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: 'url("/bg-login.jpg")' }}
    >
      <div className="w-full">{children}</div>
    </div>
  );
}
