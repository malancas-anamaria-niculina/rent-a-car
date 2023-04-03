FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY . .
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["/bin/bash", "-c", "dotnet restore && dotnet dev-certs https --trust && dotnet run --server-urls http://+5000"]