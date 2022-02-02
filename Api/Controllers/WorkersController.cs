using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/workers")]
public class WorkersController:ControllerBase
{
    private readonly ApplicationDbContext db;

    public WorkersController(ApplicationDbContext _Db)
    {
        db = _Db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> getAllWorkers()
    {
        return Ok(await db.Users.Include(x=> x.Photo).Include(x => x.Address).ToListAsync());
    }

}
