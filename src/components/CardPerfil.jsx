import React from 'react';

const CardPerfil = ({ profile, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-700 p-4 m-2 w-full sm:w-72 cursor-pointer transition-shadow duration-300"
      onClick={onClick} // Adicionado o manipulador de clique
    >
      <img
        src={profile.foto}
        alt={profile.nome}
        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-indigo-500"
      />
      <h2 className="text-xl font-semibold text-center mt-4 text-gray-800 dark:text-gray-200">{profile.nome}</h2>
      <p className="text-md text-center text-indigo-600 dark:text-indigo-400">{profile.cargo}</p>
      <div className="mt-3 text-center">
        {profile.habilidadesTecnicas && profile.habilidadesTecnicas.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="inline-block bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded-full mr-1 mb-1"
          >
            {skill}
          </span>
        ))}
        {profile.habilidadesTecnicas && profile.habilidadesTecnicas.length > 3 && (
          <span className="inline-block bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded-full mr-1 mb-1">
            +{profile.habilidadesTecnicas.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardPerfil;
