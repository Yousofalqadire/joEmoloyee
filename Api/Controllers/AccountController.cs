using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Api.Data;
using Api.Dtos;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> userManager;
    private readonly IPhoto photo;
    private readonly IMapper mapper;
    private readonly ApplicationDbContext db;
    private readonly ITokenService token;
    private readonly IEmailSender emailSender;

    public AccountController(UserManager<ApplicationUser> userManager,
                             IPhoto photo,IMapper mapper,ApplicationDbContext db,
                             ITokenService token,IEmailSender emailSender)
    {
        this.userManager = userManager;
        this.photo = photo;
        this.mapper = mapper;
        this.db = db;
        this.token = token;
        this.emailSender = emailSender;
    }

  [HttpPost("register")]
  public async Task<ActionResult<bool>> Register([FromForm]RegisterDto model)
  {
     if(ModelState.IsValid)
     {
          var user = await userManager.FindByEmailAsync(model.Email);
      if(user != null) return BadRequest($"this account with email {model.Email} has been registerd");
      var uploadResult = await photo.AddPhotoAsync(model.Photo);
      if(uploadResult.Error != null) return BadRequest($"{uploadResult.Error.Message}");
      var _photo = new Photo
      {
          Url = uploadResult.SecureUrl.AbsoluteUri,
          PublicId = uploadResult.PublicId
      };
      var address = new Address
      {
        City = model.City,
        Street = model.Street,
        Country = model.Country,
        Governorate = model.Governorate,
        PlaceId = model.PlaceId,
        Latitude = Convert.ToDouble(model.Latitude),
        Longitude = Convert.ToDouble(model.Longitude),
        Airea = model.Airea
        
      };
       var _user = new ApplicationUser
       {
           FullName = model.FullName,
           Email = model.Email,
           BirthDay = DateTime.Parse(model.BirthDay),
           UserName = model.Email,
           PhoneNumber = model.PhoneNumber,
           Photo = _photo,
           Address = address
       };
       if(model.Litral != null) _user.LitralMan = true; 
       var result = await userManager.CreateAsync(_user,model.Password);
       if(result.Succeeded)
       {
           var u = await userManager.FindByEmailAsync(_user.Email);
           var token = await userManager.GenerateEmailConfirmationTokenAsync(u);
           var uriBuilder = new UriBuilder("http://localhost:4200/home/confirm-email");
           var query = HttpUtility.ParseQueryString(uriBuilder.Query);
           query["token"] = token;
           query["userId"] = u.Id;
           uriBuilder.Query = query.ToString();
           var link = uriBuilder.ToString();
           emailSender.SendEmailAsync(u.Email,"Confirm Email","<a href='"+link+"'>"+link +"</a>");

           return Ok(result.Succeeded);
       }
       foreach(var e in result.Errors)
       {
           return BadRequest($"{e.Description}");
       }
     }
       
      return Ok();
  }

  [HttpPost("login")]
  public async Task<ActionResult<LoginReturnerDto>> Login(LoginDto model)
  {
     
  if(ModelState.IsValid)
  {
       var user = await userManager.FindByEmailAsync(model.Email);
        if(user == null) return Unauthorized("invalid email");
        var result = await userManager.CheckPasswordAsync(user, model.Password);
        if(!result) return Unauthorized("invalid password");
         return new LoginReturnerDto{UserName = user.UserName,Token = token.CreatToken(user)};     
  }
         
      return Ok();

  }

 [HttpPost("confirm")]
 public async Task<ActionResult<bool> > ConfirmEmail([FromBody]ConfirmEmaiDto model)
 {
     if(ModelState.IsValid)
     {
      var user = await userManager.FindByIdAsync(model.userId);
       var result = await userManager.ConfirmEmailAsync(user,model.token);
       if(result.Succeeded)
       {
           return result.Succeeded;
       }
       foreach(var e in result.Errors)
       {
           return Unauthorized($"{e.Description}");
       }
     }
     return Ok();
 }
  [HttpDelete("delete")]
  public async Task<ActionResult<string>> DeletePhoto([FromQuery]string id)
  {
      var result = await photo.DeletPhotoAsync(id);
      return Ok(result);
  }
    
}
