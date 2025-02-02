import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="relative w-32 h-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className="animate-spin"
        >
          {/* Red semicircle */}
          <circle
            cx="100"
            cy="100"
            r="40"
            className="stroke-red-600 stroke-2 fill-none"
            strokeDasharray="5, 10"
            strokeLinecap="round"
            style={{ animation: 'cr 3s linear infinite' }}
          />
          {/* Orange semicircle */}
          <circle
            cx="100"
            cy="100"
            r="55"
            className="stroke-orange-500 stroke-2 fill-none"
            strokeDasharray="10, 30"
            strokeLinecap="round"
            style={{ animation: 'co 2.75s linear infinite' }}
          />
          {/* Yellow semicircle */}
          <circle
            cx="100"
            cy="100"
            r="70"
            className="stroke-yellow-400 stroke-2 fill-none"
            strokeDasharray="17, 48"
            strokeLinecap="round"
            style={{ animation: 'cy 2.5s linear infinite' }}
          />
          {/* Green semicircle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            className="stroke-green-400 stroke-2 fill-none"
            strokeDasharray="23, 69"
            strokeLinecap="round"
            style={{ animation: 'cg 2.25s linear infinite' }}
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes cr {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 25;
          }
        }

        @keyframes co {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 40;
          }
        }

        @keyframes cy {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 55;
          }
        }

        @keyframes cg {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 70;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
