import React, { useEffect } from 'react';

function NotFoundScreen() {
  useEffect(() => {
    console.error('Not Found');
  }, []);

  return (
    <div>
      <p>Not Found</p>
    </div>
  );
}

export default NotFoundScreen;
