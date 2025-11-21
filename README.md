# Global Solution 2º Semestre/2025 - O Futuro do Trabalho (Front-End Design & Web Development)

## Resumo do Projeto

Este projeto consiste no desenvolvimento de uma Single Page Application (SPA) que simula uma rede social profissional, similar ao LinkedIn, com foco na conexão entre profissionais, desenvolvimento de competências e troca de experiências. A aplicação permite visualizar perfis de profissionais fictícios (carregados de um arquivo JSON local), explorar detalhes de cada perfil através de um modal interativo, e oferece funcionalidades de busca e filtro. O design é responsivo e moderno, utilizando Tailwind CSS, e inclui um tema Dark Mode.

## Tecnologias Utilizadas

- **HTML**
- **React** (com Vite)
- **Tailwind CSS v4**

## Funcionalidades

- **Listagem de Profissionais:** Cards com informações básicas (nome, foto, cargo, principais skills).
- **Detalhes do Perfil (Modal):** Ao clicar em um card, um modal exibe informações completas (pessoais, acadêmicas, profissionais, soft skills, hobbies, certificações, idiomas, áreas de interesse).
- **Ações no Perfil:** Botões "Recomendar profissional" e "Enviar mensagem" (com funcionalidade simulada via `alert()`).
- **Busca e Filtros:** Sistema para buscar profissionais por nome, cargo, resumo e filtrar por área, cidade ou tecnologia.
- **Dark Mode:** Alternância entre tema claro e escuro.
- **Design Responsivo:** Interface adaptada para diferentes tamanhos de tela.

## Instalação do Projeto

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Caioncaminha/gswebfront20252
    cd gswebdevfront20252
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Execute a aplicação em modo de desenvolvimento:**

    ```bash
    npm run dev
    ```

    A aplicação estará acessível em `http://localhost:5173` (ou outra porta indicada pelo terminal).

4.  **Para compilar a aplicação para produção:**
    ```bash
    npm run build
    ```
    Os arquivos compilados estarão na pasta `dist/`.

## Usuários e Senhas

Esta é uma aplicação frontend para exibição de perfis. Não há usuários ou senhas implementados para acesso, e todos os dados são simulados a partir de um arquivo JSON local.

## Link do Repositório

https://github.com/Caioncaminha/gswebfront20252

## Integrantes do Grupo

- Caio Nascimento Caminha - RM564789
- Giovana Rosatti Parreira - RM562275
