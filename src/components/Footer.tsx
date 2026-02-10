import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5 mt-10">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <footer className="border-t border-solid border-gray-200 dark:border-gray-700 mt-8 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 PokéBlog. All Rights Reserved.</p>
          <p className="mt-2">
            Powered by the <a className="text-primary hover:underline" href="https://pokeapi.co/">pokeapi.co</a> API.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
