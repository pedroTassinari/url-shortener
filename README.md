# URL Shortener API

API para encurtar URLs com suporte multi-tenant e autenticação.

## Requisitos

Para rodar o projeto localmente, você precisa ter:

- [Node.js](https://nodejs.org/) versão **22**
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Instalação e Execução

1. Instale as dependências:

   ```bash
   npm i
   ```

2. Inicie os containers do banco de dados com Docker Compose:

   ```bash
   docker compose up -d
   ```

3. Defina as variáveis de ambiente necessárias no projeto (ex: `.env`).

4. Execute as migrations do banco de dados:

   ```bash
   npm run typeorm migration:run -- -d ./data-source.ts
   ```

5. Inicie o projeto:
   ```bash
   npm start
   ```

## Desafios para Escalabilidade Horizontal

Para garantir o bom desempenho do sistema em cenários de alta carga e múltiplos servidores, considere os seguintes pontos:

- **Paginação na listagem de URLs:** Evita o carregamento de grandes volumes de dados em uma única requisição.
- **Adicionar cache distribuído:** Especialmente para otimizar o redirecionamento, que é uma operação de leitura muito frequente.
- **Sharding no banco de dados:** Distribuir os dados com base no `tenantId` pode melhorar o desempenho e isolamento dos dados.
- **Contador distribuído:** Implementar um sistema de contagem de acessos escalável e preciso.
- **Load Balancer:** Adicionar um balanceador de carga na frente das instâncias da API para distribuir o tráfego.
- **Rate limiting:** Limitar o número de requisições por IP ou token para evitar abusos e proteger os recursos.
- **CAPTCHA:** Adicionar validações de bot (ex: reCAPTCHA) nos endpoints sensíveis como criação de URLs ou usuários.

---

Contribuições são bem-vindas!
