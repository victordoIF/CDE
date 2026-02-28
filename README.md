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
* O build da imagem Docker é feito a cada push na main.
* O deploy tenta conectar via SSH para atualizar o servidor.
* **Atenção:** O erro de "timeout" no SSH acontece porque os IPs e chaves nos secrets são fictícios para esse trabalho, mas o build da imagem diz que o código está pronto.

## Onde configurar os Secrets no GitHub
Para o deploy funcionar em um cenário real, você deve ir no seu repositório em: ```Settings > Secrets and variables > Actions > New repository secret:```
* ```SERVER_HOST```, ```SERVER_USER```, ```SERVER_SSH_KEY``` e ```JWT_SECRET```.

## 📂 Documentação
Toda a documentação teórica e as evidências de teste estão organizadas na pasta `/docs`:

* **Engenharia de Software:** O relatório completo com os artefatos (Visão, Personas, Modelo ER, etc.) está em [`/docs/reports/`](./docs/reports/).
* **Prints e Evidências:** Os registos do Workflow do GitHub Actions e as Secrets estão em [`/docs/screenshots/`](./docs/screenshots/).
-------------------------------------------------------------------------------------------------------------------------------------
* **Workflow:** Veja o print [`/docs/screenshots/Erro_SSH.png`](./docs/screenshots/Erro_SSH.png) para verificar o build da imagem Docker com sucesso (note que o erro ocorre apenas no acesso ao IP fictício).
* **Configuração:** Veja o o print [`/docs/screenshots/Secrets_criadas.png`](./docs/screenshots/Secrets_criadas.png) para verificar que as Secrets foram devidamente criadas.

## Detalhes de Ambiente
* Usei um volume no Docker (./data:/app/data) para o arquivo .db não sumir quando o container for parado.
* Configurei o HEALTHCHECK no Dockerfile para o Docker saber se a API está de pé.
* Tem um arquivo deploy.yml na pasta .github que faz o build automático se eu mandar o código para a branch main.
* Tem um arquivo stack.yml para rodar o serviço com réplicas no Docker Swarm.

## Porta utilizada: ```3000```.
