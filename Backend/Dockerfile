# Use official .NET SDK image for build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy everything and restore
COPY . ./
RUN dotnet restore

# Build and publish
RUN dotnet publish -c Release -o out

# Use ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/out .

# Expose the port your app runs on
EXPOSE 7048

# Run the app
ENTRYPOINT ["dotnet", "OLXClone.dll"]
