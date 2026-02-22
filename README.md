# Trabalho de Estoque - ADS Umirim
* **Aluno:** Victor Manuel Cunha Santos
* **Professor:** Rôney Reis
* **Disciplinas:** Ambiente de Software / Programação Estruturada

Este é o meu projeto para as disciplinas de Ambiente de Software e Programação Estruturada. É um sistema para controlar entrada e saída de mercadorias.

## Como eu fiz o projeto
Organizei o código em pastas separadas (`src/routes`, `src/controllers`, etc.) para não ficar tudo bagunçado em um arquivo só. Usei SQLite porque é mais fácil de configurar dentro do container e JWT para garantir que ninguém mexa no estoque sem estar logado.

## Como rodar na sua máquina
Para subir o sistema, você só precisa ter o Docker instalado.

1. **Subir tudo:**
   ```bash
   docker compose up --build

2. **Criar as tabelas e o Admin:**

   Eu criei um script que já cria o banco e coloca um usuário mestre para teste. Rode esse comando em outro terminal:
      ```bash
      docker compose run estoque-api npm run db:init
      ```
   * Login: admin
   * Senha: admin123

## O que o sistema faz (Rotas)
* Login (/auth/login): Você manda o usuário e ele te devolve o token que dura 1 hora.
* Produtos: Dá para cadastrar novos itens, mas o sistema já começa com a quantidade zerada por segurança.
* Movimentação: Fiz a lógica para não deixar o estoque ficar negativo. Se tentar tirar 10 unidades de um produto que só tem 5, o sistema barra e dá erro.
* Alerta: Tem um relatório em /estoque/relatorios/baixo-estoque que avisa quando o produto está abaixo do limite mínimo que a gente cadastrou.

## Detalhes de Ambiente
* Usei um volume no Docker (./data:/app/data) para o arquivo .db não sumir quando o container for parado.
* Configurei o HEALTHCHECK no Dockerfile para o Docker saber se a API está de pé.
* Tem um arquivo deploy.yml na pasta .github que faz o build automático se eu mandar o código para a branch main.
