import React from "react";

const ThreeBarLayout = () => {
    return (
        <div className="w-full max-w-md mx-auto">
        <label className="block mb-2 font-bold text-gray-700" for="search-input">
          Search:
        </label>
        <div className="relative">
          <input
            id="search-input"
            className="block w-full py-2 pl-3 pr-10 leading-tight border border-gray-400 rounded-md appearance-none focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search..."
          />
          <div className="absolute right-0 top-0 mt-2 mr-2">
            <svg
              className="w-4 h-4 fill-current text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9 2a7 7 0 100 14A7 7 0 009 2zm0 12a5 5 0 110-10 5 5 0 010 10z"
              />
              <path
                d="M16.707 15.293l-3.342-3.342a6.982 6.982 0 001.318-4.043 7 7 0 10-7 7 6.982 6.982 0 004.043-1.318l3.342 3.342a1 1 0 001.414-1.414zM9 16a5 5 0 115-5 5.006 5.006 0 01-5 5z"
              />
            </svg>
          </div>
          <ul className="absolute z-10  w-full bg-white rounded-md shadow-md mt-1 border border-gray-200 divide-y divide-gray-200">
            <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Result 1</li>
            <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Result 2</li>
            <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Result 3</li>
          </ul>
        </div>
      </div>
    );
};

export default ThreeBarLayout;