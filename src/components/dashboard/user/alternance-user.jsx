import React, { useState } from 'react';

export const posts = [
  {
    title: 'Développeur Frontend React',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    deadline: '2025-06-30',
  },
  {
    title: 'Développeur Frontend React',
    image: 'https://cdn.pixabay.com/photo/2015/05/31/10/55/computer-791276_960_720.jpg',
    deadline: '2025-06-30',
  },
  {
    title: 'Développeur Frontend React',
    image: 'https://cdn.pixabay.com/photo/2015/05/31/10/55/computer-791276_960_720.jpg',
    deadline: '2025-06-30',
  },
  {
    title: 'Assistant RH Alternance',
    image: 'https://cdn.pixabay.com/photo/2016/11/29/06/18/business-1869510_960_720.jpg',
    deadline: '2025-07-10',
  },
  {
    title: 'UI/UX Designer',
    image: 'https://cdn.pixabay.com/photo/2016/11/18/13/47/web-1839406_960_720.jpg',
    deadline: '2025-07-15',
  },
  {
    title: 'Technicien Réseaux',
    image: 'https://cdn.pixabay.com/photo/2016/03/31/20/11/technology-1295251_960_720.jpg',
    deadline: '2025-08-01',
  },
  {
    title: 'Chef de projet digital',
    image: 'https://cdn.pixabay.com/photo/2015/01/08/18/24/startup-593341_960_720.jpg',
    deadline: '2025-08-15',
  },
];

const AlternanceUser = () => {
  const [position, setPosition] = useState(2); // index starts at 0

  return (
    <div className="w-full px-4 py-6 flex flex-col items-start justify-center">
      <h2 className="text-2xl font-bold mb-6">Stage | Alternance</h2>

      <div className="relative h-[500px] w-full flex items-center justify-start overflow-hidden">
        <div className="w-full h-full relative" style={{ perspective: '1000px' }}>
          {posts.map((post, index) => {
            const offset = index - position;
            const isActive = offset === 0;

            return (
              <div
                key={index}
                className={`absolute w-[340px] h-[440px] transition-all duration-500 ease-in-out rounded-xl p-4 bg-white text-center transform 
                  ${isActive ? 'scale-105 border-2 border-gray-300 shadow-2xl' : 'scale-95 border border-gray-300 shadow-md opacity-80'}
                `}
                style={{
                  transform: `translateX(${offset * 360}px) rotateY(${offset * -10}deg)`,
                  zIndex: 10 - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[180px] object-cover rounded-lg mb-12 border border-gray-300"
                />
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-2">Date limite : {post.deadline}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Postuler</button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition">Détails</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex gap-3 mt-5 self-center">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setPosition(index)}
            className={`w-[14px] h-[14px] rounded-full ${
              position === index ? 'bg-blue-600 scale-110' : 'bg-gray-300'
            } transition-all duration-300`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AlternanceUser;
