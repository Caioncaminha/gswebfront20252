import { useState, useEffect } from 'react'
import perfisData from './data/perfis.json'; // Importar os dados dos perfis
import CardPerfil from './components/CardPerfil'; // Importar o componente CardPerfil
import ModalDetalhes from './components/ModalDetalhes'; // Importar o componente ModalDetalhes
import './App.css'

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterCidade, setFilterCidade] = useState('');
  const [filterTecnologia, setFilterTecnologia] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    // Inicializa o modo escuro a partir do localStorage ou padrão do sistema
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Padrão para light se não houver window (SSR)
  });

  const [uniqueAreas, setUniqueAreas] = useState([]);
  const [uniqueCidades, setUniqueCidades] = useState([]);
  const [uniqueTecnologias, setUniqueTecnologias] = useState([]);


  useEffect(() => {
    // Simula o carregamento assíncrono de dados
    setProfiles(perfisData);

    // Coleta opções únicas para filtros
    const areas = new Set();
    const cidades = new Set();
    const tecnologias = new Set();

    perfisData.forEach(profile => {
      areas.add(profile.area);
      // Extrai apenas o nome da cidade antes da barra, ignorando o estado
      const cidadeNome = profile.localizacao.split('/')[0].trim();
      if (cidadeNome) cidades.add(cidadeNome);
      profile.habilidadesTecnicas.forEach(skill => tecnologias.add(skill));
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
    const matchesSearchTerm = profile.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              profile.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              profile.cargo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesArea = filterArea ? profile.area === filterArea : true;
    const matchesCidade = filterCidade ? profile.localizacao.toLowerCase().includes(filterCidade.toLowerCase()) : true;
    const matchesTecnologia = filterTecnologia ? profile.habilidadesTecnicas.map(skill => skill.toLowerCase()).includes(filterTecnologia.toLowerCase()) : true;


    return matchesSearchTerm && matchesArea && matchesCidade && matchesTecnologia;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center flex-grow">Perfis de Profissionais</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md transition-colors duration-200"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Buscar por nome, cargo ou resumo..."
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
        >
          <option value="">Todas as Áreas</option>
          {uniqueAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={filterCidade}
          onChange={(e) => setFilterCidade(e.target.value)}
        >
          <option value="">Todas as Cidades</option>
          {uniqueCidades.map(cidade => (
            <option key={cidade} value={cidade}>{cidade}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={filterTecnologia}
          onChange={(e) => setFilterTecnologia(e.target.value)}
        >
          <option value="">Todas as Tecnologias</option>
          {uniqueTecnologias.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <CardPerfil key={profile.Id} profile={profile} onClick={() => openModal(profile)} />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-lg">Nenhum perfil encontrado com os filtros selecionados.</p>
        )}
      </div>

      {isModalOpen && (
        <ModalDetalhes profile={selectedProfile} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
