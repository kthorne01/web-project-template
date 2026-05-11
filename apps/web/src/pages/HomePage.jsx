import React from 'react';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>PROJECT_NAME</title>
        <meta name="description" content="PROJECT_DESCRIPTION" />
      </Helmet>

      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">PROJECT_NAME</h1>
          <p className="text-muted-foreground text-lg">Your project starts here.</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
