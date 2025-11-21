import { useState, useEffect } from 'react';
import perfisData from './data/perfis.json';
import CardPerfil from './components/CardPerfil';
import ModalDetalhes from './components/ModalDetalhes';
import './App.css';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterCidade, setFilterCidade] = useState('');
  const [filterTecnologia, setFilterTecnologia] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    // Persiste a preferência de tema do usuário
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [uniqueAreas, setUniqueAreas] = useState([]);
  const [uniqueCidades, setUniqueCidades] = useState([]);
  const [uniqueTecnologias, setUniqueTecnologias] = useState([]);


  useEffect(() => {
    setProfiles(perfisData);

    const areas = new Set();
    const cidades = new Set();
    const tecnologias = new Set();

    perfisData.forEach(profile => {
      if(profile.area) areas.add(profile.area);
      if(profile.localizacao) {
        const cidadeNome = profile.localizacao.split('/')[0].trim();
        if (cidadeNome) cidades.add(cidadeNome);
      }
      if(profile.habilidadesTecnicas) {
        profile.habilidadesTecnicas.forEach(skill => tecnologias.add(skill));
      }
    });

    setUniqueAreas(Array.from(areas).sort());
    setUniqueCidades(Array.from(cidades).sort());
    setUniqueTecnologias(Array.from(tecnologias).sort());

  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const openModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProfile(null);
    setIsModalOpen(false);
  };

  const filteredProfiles = profiles.filter(profile => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm = (profile.nome || '').toLowerCase().includes(searchTermLower) ||
                              (profile.resumo || '').toLowerCase().includes(searchTermLower) ||
                              (profile.cargo || '').toLowerCase().includes(searchTermLower);

    const matchesArea = filterArea ? profile.area === filterArea : true;
    const matchesCidade = filterCidade ? (profile.localizacao || '').toLowerCase().includes(filterCidade.toLowerCase()) : true;
    const matchesTecnologia = filterTecnologia ? (profile.habilidadesTecnicas || []).map(skill => skill.toLowerCase()).includes(filterTecnologia.toLowerCase()) : true;


    return matchesSearchTerm && matchesArea && matchesCidade && matchesTecnologia;
  });

  return (
    <div className="min-h-screen p-4">
      <header className="relative flex justify-center items-center mb-8">
        <h1 className="text-4xl font-bold text-center">Perfis de Profissionais</h1>
        <button
          onClick={toggleDarkMode}
          className="absolute right-0 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md transition-colors duration-200"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Buscar por nome, cargo ou resumo..."
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/3 bg-gray-50 dark:bg-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-auto md:flex-grow bg-gray-50 dark:bg-gray-700"
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
        >
          <option value="">Todas as Áreas</option>
          {uniqueAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-auto md:flex-grow bg-gray-50 dark:bg-gray-700"
          value={filterCidade}
          onChange={(e) => setFilterCidade(e.target.value)}
        >
          <option value="">Todas as Cidades</option>
          {uniqueCidades.map(cidade => (
            <option key={cidade} value={cidade}>{cidade}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-auto md:flex-grow bg-gray-50 dark:bg-gray-700"
          value={filterTecnologia}
          onChange={(e) => setFilterTecnologia(e.target.value)}
        >
          <option value="">Todas as Tecnologias</option>
          {uniqueTecnologias.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <CardPerfil key={profile.Id} profile={profile} onClick={() => openModal(profile)} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Nenhum perfil encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ModalDetalhes profile={selectedProfile} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
