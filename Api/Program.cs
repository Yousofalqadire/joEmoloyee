using System.Text;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Profiles;
using Api.Repository;
using Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<EmailConfiguration>(builder.Configuration.GetSection("EmailConfigrations"));
builder.Services.AddScoped<IOrder,OrderRepository>();
builder.Services.AddSingleton<IEmailSender,EmailSender>();
builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddAutoMapper(typeof(ProjectAutoMapper).Assembly);
builder.Services.AddControllers().AddNewtonsoftJson(options=>
     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
builder.Services.AddScoped<IPhoto,PhotoRepository>();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnections"));
});
builder.Services.AddIdentity<ApplicationUser,IdentityRole>(options=>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase =true;
                options.Password.RequireDigit = false;
                options.SignIn.RequireConfirmedEmail = true;
            }).AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
            
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options=>{
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
      ValidateIssuer = false,
      ValidateAudience = false
    };
});
builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(x=> x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute(
     name:"api",
     pattern:"{controller}/{action}/{id?}"
);
app.MapControllers();

app.Run();
