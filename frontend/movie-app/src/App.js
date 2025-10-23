// src/App.js
import React, { useState, useEffect } from 'react';
import { Search, Star, Share2, Trash2, Plus, ExternalLink, Loader } from 'lucide-react';

// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const USER_ID = 'user-' + Math.random().toString(36).substr(2, 9); // ID único por sessão

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [shareLink, setShareLink] = useState('');
  const [error, setError] = useState('');

  // Carregar favoritos ao iniciar
  useEffect(() => {
    loadFavorites();
    checkSharedLink();
  }, []);

  // Carregar favoritos do backend
  const loadFavorites = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${USER_ID}`);
      const data = await response.json();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  // Verificar se há lista compartilhada na URL
  const checkSharedLink = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('share');
    
    if (shareId) {
      try {
        const response = await fetch(`${API_BASE_URL}/shared/${shareId}`);
        const data = await response.json();
        
        if (response.ok) {
          setFavorites(data.favorites);
          setActiveTab('favorites');
          setError('');
        } else {
          setError(data.error || 'Lista compartilhada não encontrada');
        }
      } catch (error) {
        console.error('Erro ao carregar lista compartilhada:', error);
        setError('Erro ao carregar lista compartilhada');
      }
    }
  };

  // Buscar filmes
  const searchMovies = async () => {
    if (!searchQuery.trim()) {
      setError('Digite algo para buscar');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/movies/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.results || []);
        if (data.results.length === 0) {
          setError('Nenhum filme encontrado');
        }
      } else {
        setError(data.error || 'Erro ao buscar filmes');
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setError('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
    }
    
    setLoading(false);
  };

  // Adicionar aos favoritos
  const addToFavorites = async (movie) => {
    if (favorites.find(f => f.id === movie.id)) {
      setError('Este filme já está nos favoritos!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${USER_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });

      const data = await response.json();

      if (response.ok) {
        setFavorites(data.favorites);
        setError('');
      } else {
        setError(data.error || 'Erro ao adicionar favorito');
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      setError('Erro ao adicionar aos favoritos');
    }
  };

  // Remover dos favoritos
  const removeFromFavorites = async (movieId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/favorites/${USER_ID}/${movieId}`,
        { method: 'DELETE' }
      );

      const data = await response.json();

      if (response.ok) {
        setFavorites(data.favorites);
        setError('');
      } else {
        setError(data.error || 'Erro ao remover favorito');
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      setError('Erro ao remover dos favoritos');
    }
  };

  // Gerar link de compartilhamento
  const generateShareLink = async () => {
    if (favorites.length === 0) {
      setError('Adicione filmes aos favoritos antes de compartilhar');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: USER_ID,
          favorites: favorites,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const link = `${window.location.origin}${window.location.pathname}?share=${data.shareId}`;
        setShareLink(link);
        navigator.clipboard.writeText(link);
        setError('');
        alert('Link copiado para a área de transferência!');
      } else {
        setError(data.error || 'Erro ao gerar link');
      }
    } catch (error) {
      console.error('Erro ao gerar link:', error);
      setError('Erro ao gerar link de compartilhamento');
    }
  };

  // Componente de Card de Filme
  const MovieCard = ({ movie, isFavorite = false }) => {
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={movie.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className="w-full h-64 bg-gray-300 items-center justify-center"
            style={{ display: imageUrl ? 'none' : 'flex' }}
          >
            <span className="text-gray-500">Sem imagem</span>
          </div>
          
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
            <Star size={16} fill="white" />
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {movie.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3 min-h-[4rem]">
            {movie.overview || 'Descrição não disponível'}
          </p>
          <div className="text-xs text-gray-500 mb-3">
            {movie.release_date &&
              `Lançamento: ${new Date(movie.release_date).toLocaleDateString('pt-BR')}`}
          </div>

          {isFavorite ? (
            <button
              onClick={() => removeFromFavorites(movie.id)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 size={16} />
              Remover dos Favoritos
            </button>
          ) : (
            <button
              onClick={() => addToFavorites(movie)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Adicionar aos Favoritos
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            🎬 Minha Lista de Filmes
          </h1>
          <p className="text-gray-600">
            Pesquise filmes e crie sua lista de favoritos
          </p>
        </header>

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'search'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Search size={20} className="inline mr-2" />
            Pesquisar
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'favorites'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Star size={20} className="inline mr-2" />
            Favoritos ({favorites.length})
          </button>
        </div>

        {/* Aba de Pesquisa */}
        {activeTab === 'search' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchMovies()}
                  placeholder="Digite o nome do filme..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={searchMovies}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Buscar
                    </>
                  )}
                </button>
              </div>
            </div>

            {searchResults.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Resultados da Pesquisa ({searchResults.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchResults.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Aba de Favoritos */}
        {activeTab === 'favorites' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Meus Favoritos ({favorites.length})
                </h2>
                {favorites.length > 0 && (
                  <button
                    onClick={generateShareLink}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                  >
                    <Share2 size={20} />
                    Compartilhar Lista
                  </button>
                )}
              </div>

              {shareLink && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 mb-2 font-semibold">
                    ✅ Link copiado! Compartilhe com seus amigos:
                  </p>
                  <code className="text-xs bg-white p-2 rounded block overflow-x-auto break-all">
                    {shareLink}
                  </code>
                  <p className="text-xs text-green-700 mt-2">
                    Este link expira em 7 dias
                  </p>
                </div>
              )}
            </div>

            {favorites.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Star size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum favorito ainda
                </h3>
                <p className="text-gray-500 mb-4">
                  Pesquise filmes e adicione-os aos seus favoritos!
                </p>
                <button
                  onClick={() => setActiveTab('search')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Começar a Pesquisar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} isFavorite={true} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p className="mb-2">
            Desenvolvido com React e integração com TMDb API
          </p>
          <p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline inline-flex items-center gap-1"
            >
              Dados fornecidos por The Movie Database (TMDb)
              <ExternalLink size={14} />
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;