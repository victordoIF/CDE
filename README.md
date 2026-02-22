# Sistema de Controle de Estoque - ADS Umirim
* **Aluno:** Victor Manuel Cunha Santos
* **Professor:** Rôney Reis
* **Disciplinas:** Ambiente de Software / Programação Estruturada / Engenharia de Software

Este é o meu projeto para as disciplinas de Ambiente de Software, Programação Estruturada e Engenharia de Software. É um sistema para controlar entrada e saída de mercadorias.

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

## Como funciona o deploy (CI/CD)
O projeto tem um workflow no GitHub Actions que automatiza o build e o deploy:
* Toda vez que eu dou um push na branch main, o GitHub faz o build da imagem Docker para ver se está tudo certo.
* Depois do build, ele tenta conectar via SSH no servidor para atualizar os containers.
* **Atenção:** Como estou usando dados de servidor fictícios para o trabalho, o passo de SSH dá erro de "timeout", mas o build da imagem completa com sucesso, validando que o código está pronto para rodar.

## Configuração de Secrets
Para o workflow funcionar, configurei os segredos no GitHub em ```Settings > Secrets and variables > Actions:```
* ```SERVER_HOST```, ```SERVER_USER```, ```SERVER_SSH_KEY``` e ```JWT_SECRET```.

Criei uma pasta ```/prints``` no repositório com as imagens do sistema funcionando:
* **Workflow:** Veja o print ```Erro_SSH.png``` para verificar o build da imagem Docker com sucesso (note que o erro ocorre apenas no acesso ao IP fictício).
* **Configuração:** Veja o o print ```Secrets_criadas.png"``` para verificar que as Secrets foram devidamente criadas.

## Detalhes de Ambiente
* Usei um volume no Docker (./data:/app/data) para o arquivo .db não sumir quando o container for parado.
* Configurei o HEALTHCHECK no Dockerfile para o Docker saber se a API está de pé.
* Tem um arquivo deploy.yml na pasta .github que faz o build automático se eu mandar o código para a branch main.
* Tem um arquivo stack.yml para rodar o serviço com réplicas no Docker Swarm.

## Porta utilizada: ```3000```.
