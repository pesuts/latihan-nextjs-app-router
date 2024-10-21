// import React from "react";

export default function Layout({
  children,
  products,
  analytics,
  payments,
}: {
    children: React.ReactNode;
    products: React.ReactNode;
    analytics: React.ReactNode;
    payments: React.ReactNode;
}) {
  return (
    <div className="p-5 flex-1 grid grid-cols-2 gap-5">
      <div className="col-span-2 flex">{children}</div>
      <div className="flex">{products}</div>
      <div className="flex">{analytics}</div>
      <div className="flex">{payments}</div>
    </div>
  );
}
