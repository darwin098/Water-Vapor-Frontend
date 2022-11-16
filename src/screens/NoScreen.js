import React, { useEffect } from 'react';

function NoScreen() {
  useEffect(() => {
    document.title = 'Page Not Found';
  });

  return (
    <div className="Main">
      <h1>404 Not Found</h1>
    </div>
  );
}

export default NoScreen;
