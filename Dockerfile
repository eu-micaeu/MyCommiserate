# Estágio de build
FROM golang:1.20 AS build

# Defina o diretório de trabalho como /build
WORKDIR /build

# Copie os arquivos necessários para o diretório de trabalho
COPY go.mod go.sum ./
COPY static ./static
COPY views ./views
COPY internal ./internal
COPY handlers ./handlers
COPY middlewares ./middlewares
COPY routes ./routes
COPY main.go ./
COPY ads.txt ./

# Build do executável
RUN go build -o main


# Estágio de criação da imagem final
FROM golang:1.20

# Copie o binário do estágio de build para o novo diretório de trabalho
COPY --from=build /build/main /app/

# Defina o diretório de trabalho para /app
WORKDIR /app

# Exponha a porta 8080 para acesso externo
EXPOSE 8080

# Comando a ser executado ao iniciar o contêiner
CMD ["./main"]
