import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border w-96 p-6 bg-white rounded-xl bg-[#ededed]" >
      
      <h1 className="text-xl mb-3 border-b pb-2 font-bold">
        {title}
      </h1>
      
      <div>
        {children}
      </div>

    </div>
  );
}