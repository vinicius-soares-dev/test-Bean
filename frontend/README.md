# POKEMON-TEST

Este projeto é um teste de código desenvolvido como parte do processo seletivo para a empresa Bean. Ele inclui uma aplicação simples que cadastra treinadores pokémons, e cria uma equipe com no máximo 5 pokémons. O código aqui fornecido é destinado apenas para fins de avaliação e não representa um projeto de produção completo

## Sumário

- [Introdução](#introdução)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Rotas](#rotas)

## Introdução

###  O que é o Pokemon Test?
O Pokemon Test é um sistema desenvolvido como parte de um teste de código para a empresa Bean. Este projeto visa criar uma plataforma onde treinadores de Pokémon podem se cadastrar, montar times de Pokémon, explorar a Pokedéx, visualizar evoluções e muito mais.

### Funcionalidades Principais
<ol>
  <li><strong>Cadastro de treinadores:</strong> Os usuários podem se cadastrar como treinadores fornecendo um nome de usuário e senha.</li>
  <li><strong>Montagem de times:</strong> Cada treinador pode criar e gerenciar um time de até 5 Pokémon para suas aventuras.</li>
  <li><strong>Exploração da Pokédex:</strong> A aplicação permite listar todos os Pokémon disponíveis na API PokéAPI.</li>
  <li><strong>Filtragem Personalizada:</strong> Treinadores podem pesquisar Pokémon pelo nome. Caso não encontrem o Pokémon desejado, receberão uma informação indicando que ele não existe na Pokedéx</li>
  <li><strong>Visualização de Evoluções:</strong> Os treinadores podem explorar as evoluções dos Pokémon proporcionando uma experiência mais completa de treinamento.</li>
</ol>

### Tecnologias Utilizadas
<ul>
  <li><strong>Backend:</strong> Desenvolvido em Typescript com Node.js, utilizando Docker e Docker Compose para facilitar o processo de execução.</li>
  <li><strong>Frontend:</strong> Implementado em Typescript com React usando o framework Vite para uma experiência de desenvolvimento mais rápida.</li>
  <li><strong>Banco de Dados:</strong> O sistema utiliza o PostgreSQL, para armazenar dados relevantes.</li>


## Instalação

### Pré-requisitos:
Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema.

### Configuração de Ambiente

1. Clone o repositório: `git clone https://github.com/vinicius-soares-dev/test-Bean`.
2. Entre no diretório do projeto: `cd  pokemon-test`.

### Executando o Projeto
Execute o Dockeer Compose para iniciar os serviços:

```bash
docker-compose up --build
```


### Encerrando o Projeto
Para encerrar todos os containers do Docker, execute:
```bash
docker-compose down
```

ou

```bash
docker-compose down
```

## Rotas da Aplicação

Aqui estão as principais rotas da aplicação e suas descrições.

- **Cadastro de Treinadores:** `POST /register`
  - Descrição: Permite que novos treinadores se cadastrem na plataforma.
  - Parâmetros:
    - `username` (string): Nome de usuário do treinador.
    - `password` (string): Senha do treinador.

- **Login de Treinadores:** `POST /login`
  - Descrição: Autentica um treinador existente.
  - Parâmetros:
    - `username` (string): Nome de usuário do treinador.
    - `password` (string): Senha do treinador.

- **Criação de Time de Pokémon:** `POST /pokemon/team`
  - Descrição: Permite que treinadores criem um time de até 5 Pokémon.
  - Parâmetros:
    - `pokemon1`, `pokemon2`, ..., `pokemon5` (string): Nomes dos Pokémon no time.

- **Listagem de Pokémon na Pokedéx:** `GET /pokemon`
  - Descrição: Retorna uma lista de todos os Pokémon disponíveis na Pokedéx.

- **Detalhes de um Pokémon por Nome:** `GET /pokemon/:name`
  - Descrição: Retorna detalhes de um Pokémon com o nome especificado.

- **Evolução de Pokémon por Nome:** `GET /pokemon/:name/evolution`
  - Descrição: Retorna informações sobre as evoluções de um Pokémon com o nome especificado.

## Exemplo de Uso

- **Cadastro de Treinador:**
  ```bash
  curl -X POST -d 'username=&password=pikachu123' http://localhost:3000/register

- **Credenciais válidas para login:**
Username: jujuba1
Password: teste