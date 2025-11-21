import React from 'react';

const ModalDetalhes = ({ profile, onClose }) => {
  if (!profile) return null;

  const handleRecommend = () => {
    alert(`Você recomendou ${profile.nome}!`);
  };

  const handleSendMessage = () => {
    alert(`Abrindo chat para enviar mensagem a ${profile.nome}...`);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.foto}
            alt={profile.nome}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
          />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">{profile.nome}</h2>
          <p className="text-xl text-indigo-700 dark:text-indigo-400">{profile.cargo}</p>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">{profile.resumo}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{profile.localizacao} | {profile.area}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {profile.habilidadesTecnicas.map((skill, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((skill, index) => (
                <span key={index} className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Experiências</h3>
          {profile.experiencias.map((exp, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">{exp.cargo} na {exp.empresa}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.inicio} - {exp.fim}</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{exp.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Formação Acadêmica</h3>
          {profile.formacao.map((form, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">{form.curso}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{form.instituicao} ({form.ano})</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Projetos</h3>
          {profile.projetos.map((proj, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">{proj.titulo}</p>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
                Ver Projeto
              </a>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{proj.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Certificações</h3>
          <div className="flex flex-wrap gap-2">
            {profile.certificacoes.map((cert, index) => (
              <span key={index} className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 text-sm font-medium px-3 py-1 rounded-full">
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Idiomas</h3>
          <div className="flex flex-wrap gap-2">
            {profile.idiomas.map((lang, index) => (
              <span key={index} className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 text-sm font-medium px-3 py-1 rounded-full">
                {lang.idioma} ({lang.nivel})
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Áreas de Interesse</h3>
          <div className="flex flex-wrap gap-2">
            {profile.areaInteresses.map((interest, index) => (
              <span key={index} className="bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-100 text-sm font-medium px-3 py-1 rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-around mt-8">
          <button
            onClick={handleRecommend}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Recomendar profissional
          </button>
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Enviar mensagem
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhes;
