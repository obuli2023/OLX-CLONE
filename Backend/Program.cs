using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;
using OLXClone.Services;
using OLXClone.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Get MongoDB connection string from appsettings.json
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb");
var client = new MongoClient(mongoConnectionString);
var database = client.GetDatabase("OlxCloneAppDatabase");
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddSingleton<IMongoDatabase>(database);
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();

// Configure JWT Authentication
var jwtSecret = builder.Configuration["Jwt:Secret"];
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false; // Set to true in production
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Add Swagger for API documentation
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger in Development Mode 
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
}

app.UseCors("AllowAllOrigins");


// Middleware pipeline
app.UseHttpsRedirection();

app.UseAuthentication();  // Place before Authorization
app.UseAuthorization();

app.MapControllers();

app.Run();
