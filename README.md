# Sistema de Controle de Estoque - IFCE
Projeto integrador para as disciplinas de Ambiente de Software, Programação Estruturada e Engenharia de Software.

## Como Rodar o Projeto
1. Certifique-se de ter o Docker instalado.
2. Clone o repositório.
3. Execute o comando para subir o container
   `docker compose up --build`
4. Em outro terminal, inicialize o banco de dados
   `docker compose run estoque-api npm run db:init`

## Comandos Úteis
- Derrubar o sistema `docker compose down`
- Porta utilizada 3000