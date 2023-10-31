import React from "react";
import { useState } from "react";
import "../styles/Accordion.css";

const Accordion = ({ children, className }) => {
  const title = React.Children.toArray(children).find((child) => child.type === Accordion.Title);
  const content = React.Children.toArray(children).filter((child) => child.type === Accordion.Content);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`flex flex-col bg-white rounded-2xl shadow-md p-4 ${isExpanded ? "closed" : ""} className`}>
      <div className="flex flex-row justify-between items-center" onClick={() => setIsExpanded((i) => !i)}>
        <div className="flex-grow title text-3xl cursor-pointer">{title}</div>
        <svg className={`h-14 icon ${isExpanded ? "icon-expanded" : ""}`} viewBox="0 0 24 24">
          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      </div>
      {isExpanded && <div className="p-4">{content}</div>}
    </div>
  );
};

Accordion.Title = ({ children }) => <div>{children}</div>;

Accordion.Content = ({ children }) => <div>{children}</div>;

export default Accordion;
