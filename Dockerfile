# Use a versão mais recente do Golang disponível no Docker Hub
FROM golang:1.20

# Defina o diretório de trabalho como /build
WORKDIR /build

# Copie os arquivos go.mod e go.sum para o diretório /build
COPY go.mod go.sum ./

# Copie a pasta "static" para o diretório /build/static no contêiner
COPY static ./static

# Copie a pasta "views" para o diretório /build/views no contêiner
COPY views ./views

# Copie o código Go principal para o diretório /build
COPY app.go ./

# Build do executável
RUN go build -o app

# Exponha a porta 8080 para acesso externo
EXPOSE 8080

# Comando a ser executado ao iniciar o contêiner
CMD ["./app"]
