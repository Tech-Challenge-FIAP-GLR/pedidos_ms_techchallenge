# MICROSSERVIÇO DE PRODUÇÃO
## Sobre o serviço:
Serviço responsável por cuidar dos pedidos do fast food. O serviço é responsável por registrar e consultar pedidos e pagamentos.
* As arquiteturas utilziadas foram Clean e Hexagonal.
* O banco de dados é o MongoDB, banco de dados não relacional.

## Pré-Requisitos para chamada local
1. Acessar a pasta do projeto via CMD.
2. Rodar o comando "docker-compose up"
3. Acessar as URLs para chamadas indicadas abaixo.

## Passo a passo para inicializar aplicação
1. Clone este repositório.
2. Dentro do repósitorio food_techchallenge, importe o projeto na sua IDE de preferência.
3. Rode os comandos abaixo:
   

## Swagger
http://localhost:3000/swagger-ui/index.html

# Services

## Salva Pedido
**Endpoint:** */api/food_techchallenge/pedidos*<br />
**Método:** *POST*
<br />
**Description:** Método responsável por criar produtos. 
<br />
**Request Example:** 
<br />
```json
{
    "user": {
        "id": 132,
        "nome": "Raul teste",
        "cpf": "123-456-789-00",
        "email": "email@email.com"
    },
    "total": 123.20,
    "produtos": [
        {
            "id": 123,
            "nome": "Batata Frita",
            "descricao": "Descricao da batata frita",
            "preco": 12.99,
            "categoria": {
                "id": 1,
                "descricao": "lanche"
            }
        },
        {
            "id": 113,
            "nome": "X-Tudo",
            "descricao": "Descricao do lanche",
            "preco": 24.99,
            "categoria": {
                "id": 2,
                "descricao": "lanche"
            }
        }
    ]

}
```
**Response Example:** 
```json
{
    "data": {
        "pedidoId": "664be0096d1fbb33ad30cda3",
        "total": 123.2
    }
}
```
## Lista Pedido (Por Status)
**Endpoint:** */api/pedidos/status/pago*<br />
**Método:** *GET*
<br />
**Description:** Método responsável por listar produtos em determinados status. 
<br />
**Request Example:** 
<br />
```
Path parameter
```
**Response Example:** 
```json
{
    "data": [
        {
            "user": {
                "id": 132,
                "nome": "Raul teste",
                "cpf": "123-456-789-00",
                "email": "email@email.com"
            },
            "total": 123.2,
            "orderStatus": "PAGO",
            "produtos": [
                {
                    "nome": "Batata Frita",
                    "descricao": "Descricao da batata frita",
                    "preco": 12.99
                },
                {
                    "nome": "X-Tudo",
                    "descricao": "Descricao do lanche",
                    "preco": 24.99
                }
            ],
            "dataPedido": "2024-05-20T22:35:16.958Z",
            "id": "664bd02455c7b4b02672c7e7"
        },
        {
            "user": {
                "id": 132,
                "nome": "Raul teste",
                "cpf": "123-456-789-00",
                "email": "email@email.com"
            },
            "total": 123.2,
            "orderStatus": "PAGO",
            "produtos": [
                {
                    "nome": "Batata Frita",
                    "descricao": "Descricao da batata frita",
                    "preco": 12.99
                },
                {
                    "nome": "X-Tudo",
                    "descricao": "Descricao do lanche",
                    "preco": 24.99
                }
            ],
            "dataPedido": "2024-05-20T23:39:18.339Z",
            "id": "664bdf266d1fbb33ad30cd79"
        },
        {
            "user": {
                "id": 132,
                "nome": "Raul teste",
                "cpf": "123-456-789-00",
                "email": "email@email.com"
            },
            "total": 123.2,
            "orderStatus": "PAGO",
            "produtos": [
                {
                    "nome": "Batata Frita",
                    "descricao": "Descricao da batata frita",
                    "preco": 12.99
                },
                {
                    "nome": "X-Tudo",
                    "descricao": "Descricao do lanche",
                    "preco": 24.99
                }
            ],
            "dataPedido": "2024-05-20T23:42:13.543Z",
            "id": "664bdfd56d1fbb33ad30cd99"
        },
        {
            "user": {
                "id": 132,
                "nome": "Raul teste",
                "cpf": "123-456-789-00",
                "email": "email@email.com"
            },
            "total": 123.2,
            "orderStatus": "PAGO",
            "produtos": [
                {
                    "nome": "Batata Frita",
                    "descricao": "Descricao da batata frita",
                    "preco": 12.99
                },
                {
                    "nome": "X-Tudo",
                    "descricao": "Descricao do lanche",
                    "preco": 24.99
                }
            ],
            "dataPedido": "2024-05-20T23:43:05.640Z",
            "id": "664be0096d1fbb33ad30cda3"
        }
    ]
}
```
## Altera Status Pedido (ID)
**Endpoint:** */api/food_techchallenge/pedidos/${id}*<br />
**Método:** *PUT*<br />
**Description:** Método responsável por avançar o status do pedido desejado, sendo eles. 
<br />
**Request Example:** 
<br />
```
Path parameter
```
**Response Example:** 
```
Pedido atualizado.
```
## Busca Status de Pagamento do Pedido (ID)
**Endpoint:** */api/pedidos//${id}*<br />
**Método:** *GET*<br />
**Description:** Método responsável por buscar um pedido e seu status de pagamento. 
<br />
**Request Example:** 
<br />
```
Path parameter
```
**Response Example:** 
```json
{
    "data": {
        "user": {
            "id": 132,
            "nome": "Raul teste",
            "cpf": "123-456-789-00",
            "email": "email@email.com"
        },
        "total": 123.2,
        "orderStatus": "PAGO",
        "produtos": [
            {
                "nome": "Batata Frita",
                "descricao": "Descricao da batata frita",
                "preco": 12.99
            },
            {
                "nome": "X-Tudo",
                "descricao": "Descricao do lanche",
                "preco": 24.99
            }
        ],
        "dataPedido": "2024-05-20T23:42:13.543Z",
        "id": "664bdfd56d1fbb33ad30cd99"
    }
}
```
