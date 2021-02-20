FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Sandervanteinde.BlogApi/Sandervanteinde.BlogApi.csproj", "Sandervanteinde.BlogApi/"]
COPY ["Sandervanteinde.BlogApi.Infrastructure/Sandervanteinde.BlogApi.Infrastructure.csproj", "Sandervanteinde.BlogApi.Infrastructure/"]
COPY ["Sandervanteinde.BlogApi.Messages/Sandervanteinde.BlogApi.Messages.csproj", "Sandervanteinde.BlogApi.Messages/"]
COPY ["Sandervanteinde.BlogApi.Database/Sandervanteinde.BlogApi.Database.csproj", "Sandervanteinde.BlogApi.Database/"]
RUN dotnet restore "Sandervanteinde.BlogApi/Sandervanteinde.BlogApi.csproj"
COPY . .
WORKDIR "/src/Sandervanteinde.BlogApi"
RUN dotnet build "Sandervanteinde.BlogApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Sandervanteinde.BlogApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Sandervanteinde.BlogApi.dll"]

