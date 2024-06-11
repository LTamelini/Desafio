# API - Desafio - Lucas Tamelini

Este projeto é uma API REST simples criada com Node.js e Express que lê dados de dois arquivos TXT na pasta `utils`, os combina e aplica filtros de `product_id` e `date` conforme necessário.

# Estrutura do Projeto

my-rest-api/
├── node_modules/
├── utils/
│ ├── data1.txt
│ └── data2.txt
├── index.js
├── package.json
└── package-lock.json

# Pré-requisitos

- Node.js instalado na sua máquina.

# Instalação

1. Clone este repositório ou faça o download dos arquivos.

2. No diretório do projeto, execute o seguinte comando para instalar as dependências:

   ```bash
   npm install

# Executando a API
Para iniciar o servidor, execute:

bash
node index.js
O servidor estará rodando em http://localhost:3000.

# Endpoints
GET /api/orders
Retorna a lista de pedidos com filtros opcionais de product_id e date.

## Query Parameters
product_id (opcional): Filtra os pedidos pelo product_id.
date (opcional): Filtra os pedidos pela date no formato YYYYMMDD.

# Exemplos:
    Sem filtros: http://localhost:3000/api/orders
    Filtrando por product_id: http://localhost:3000/api/orders?product_id=753
    Filtrando por date: http://localhost:3000/api/orders?date=20210308
    Filtrando por ambos: http://localhost:3000/api/orders?product_id=753&date=20210308
    
## Estrutura da Resposta
A resposta é uma lista de usuários com seus pedidos:

json: 
    [
    {
        "user_id": 70,
        "name": "Palmer Prosacco",
        "orders": [
        {
            "order_id": 753,
            "total": "1836.74",
            "date": "08/03/2021",
            "products": [
            {
                "product_id": 753,
                "value": "1836.74"
            }
            ]
        }
        ]
    },
    ...
    ]



