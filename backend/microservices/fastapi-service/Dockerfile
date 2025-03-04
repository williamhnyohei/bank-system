# Usa Python 3.11 como base
FROM python:3.11

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos para o container
COPY . .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta
EXPOSE 8000

# Comando para rodar a API
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]