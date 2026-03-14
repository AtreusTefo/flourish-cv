import React from 'react';

const SkipNavigation: React.FC = () => {
  return (
    <div className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-[9999]">
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-br-md font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default SkipNavigation;