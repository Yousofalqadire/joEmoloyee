using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;
[ApiController]
[Route("api/order")]
public class OrderController : ControllerBase
{
    private readonly IOrder order;

    public OrderController(IOrder _order)
    {
        this.order = _order;
    }
    [HttpPost("addOrder")]
    public async Task<ActionResult<Order>> AddOrder([FromBody]Order model)
    {
        if(!ModelState.IsValid) return BadRequest();
        return Ok(await order.AddOrder(model));
    }

    [HttpGet]
    public async Task<ActionResult<Order>> GetOrders()
    {
        return Ok(await order.GetORdersAsync());
    }
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Order>> GetOrderById(int id)
    {
        return Ok(await order.GetOrderByIdAsync(id));
    }

}
