# 🚀 QRI – Back-end API

## 🧩 Nome do Projeto
**QRI**

---

## 📝 Descrição

QRI é uma aplicação que permite ao usuário colar um link e gerar rapidamente um QR Code, com foco em compartilhamento social e experiência simples.

O sistema oferece autenticação moderna e segura, incluindo:

- Cadastro por e-mail e senha  
- Verificação de e-mail  
- Login social com Google e Facebook  
- Autenticação via JWT  
- Geração de QR Codes compartilháveis  
- Envio de QR Code como imagem ou figurinha para redes sociais  

---

## 🧱 Stack Tecnológica

### Back-end
- **FastAPI**
- **Python 3.10+**
- **SQLAlchemy**
- **PostgreSQL (Supabase)**
- **JWT**
- **SMTP (envio de e-mails)**

### Front-end
- **React Native (Expo)**

---

## 📚 Bibliotecas do Back-end

| Biblioteca | Função |
|---------------|------------------------------|
fastapi         | Framework principal da API   |
uvicorn         | Servidor ASGI                |
sqlalchemy      | ORM para banco de dados      |
psycopg2-binary | Driver PostgreSQL            |
passlib[bcrypt] | Hash de senhas               |
python-jose     | JWT                          |
qrcode          | Geração de QR Code           |
pillow          | Manipulação de imagens       |
python-dotenv   | Variáveis de ambiente        |
requests        | Integração com APIs externas |
email-validator | Validação de e-mail          |

---

## 🗂 Estrutura de Pastas

```text
qri-backend/
│
├── app/
│   ├── main.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   │
│   ├── models/
│   │   └── user.py
│   │
│   ├── schemas/
│   │   └── user_schema.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── email_service.py
│   │   └── qr_service.py
│   │
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── user_routes.py
│   │   └── qr_routes.py
│   │
│   └── utils/
│       └── helpers.py
│
├── .env
├── requirements.txt
└── run.py