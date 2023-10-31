import React from "react";
import { useState } from "react";

const Accordion = ({ children, className }) => {
  const title = React.Children.toArray(children).find((child) => child.type === Accordion.Title);
  const content = React.Children.toArray(children).filter((child) => child.type === Accordion.Content);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={"bg-white p-4 rounded-2xl shadow-md" + className}>
      <div className="title text-3xl cursor-pointer" onClick={() => setIsExpanded((i) => !i)}>
        {title}
      </div>
      {isExpanded && <div className="p-4">{content}</div>}
    </div>
  );
};

Accordion.Title = ({ children }) => <div>{children}</div>;

Accordion.Content = ({ children }) => <div>{children}</div>;

export default Accordion;
