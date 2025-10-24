# Movie List App

Este repositório contém uma aplicação de lista de filmes com backend em Node/Express e frontend em React.

Este README descreve passo a passo como configurar, executar e depurar a aplicação em ambiente de desenvolvimento (macOS / zsh).

## Conteúdo

- `backend/` — API em Node/Express.
- `frontend/movie-app/` — aplicação React (código-fonte).
- `frontend/build/` — build pronto (gerado).

## Visão geral rápida

1. Instalar dependências do backend e frontend.
2. Configurar variáveis de ambiente (especialmente a chave da API TMDB).
3. Executar o backend (por padrão em `http://localhost:3000`).
4. Executar o frontend em modo de desenvolvimento (`http://localhost:3001` ou porta padrão do CRA).

## Pré-requisitos

- Node.js (recomendado >= 16.x). Verifique com:

```bash
node -v
npm -v
```

- npm ou yarn (a documentação abaixo usa `npm`).
- Uma chave de API do The Movie Database (TMDB). Pode obter em: https://www.themoviedb.org/

## Instalação e execução (desenvolvimento)

Abra o terminal (zsh) e siga estes passos.

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd movie-list
```

2. Backend

```bash
# entre na pasta do backend
cd backend

# instale dependências
npm install

# executar em modo desenvolvimento (recarrega com nodemon)
npm run dev

# ou executar em produção (node)
npm start
```

3. Frontend (desenvolvimento)

```bash
# abra outro terminal e vá para o diretório do app React
cd frontend/movie-app

# instale dependências
npm install

# iniciar a aplicação React
npm start
```

## 4. Testes

O backend não inclui testes automatizados neste repositório.

## Estrutura de pastas relevante

- `backend/` — código do servidor (instalar dependências e rodar aqui).
- `backend/src/config/tmdb.js` — arquivo com configuração do TMDB. Observação: `apiKey` vem de `process.env.TMDB_API_KEY`.
- `frontend/movie-app/` — app React (rodar `npm start` aqui durante o desenvolvimento).
- `frontend/build/` — build pronto (gerado pelo `npm run build` da pasta `movie-app`).

## Endpoints importantes

O frontend usa por padrão a URL `http://localhost:3000/api` (ver `frontend/movie-app/src/services/api.js`).

Verifique as rotas definidas em `backend/routes/` para saber os endpoints expostos (por exemplo: favoritos, filmes, compartilhamento).

## Hospedagem / Deploy

Observação: este projeto está hospedado (frontend) na Vercel.com e (backend) no Render.com. 

