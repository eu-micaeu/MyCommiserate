# Use a versão mais recente do Golang disponível no Docker Hub
FROM golang:latest

# Defina o diretório de trabalho como /build
WORKDIR /build

# Copie os arquivos go.mod e go.sum para o diretório /build
COPY go.mod go.sum ./

# Copie a pasta "views" para o diretório /build/views no contêiner
COPY views ./views

# Copie o código Go principal para o diretório /build
COPY app.go ./

# Build do executável
RUN go build -o app

# Comando a ser executado ao iniciar o contêiner
CMD ["./app"]
