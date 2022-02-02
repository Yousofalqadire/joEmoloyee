using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class OrderRepository : IOrder
    {
        private readonly ApplicationDbContext db;

        public OrderRepository(ApplicationDbContext _db)
        {
            db = _db;
        }

        public async Task<Order> AddOrder(Order model)
        {
            var result = await db.Orders.AddAsync(model);
            await db.SaveChangesAsync();
            return model;
        }

        public async Task DeleteOrderAsync(int id)
        {
            var result = await db.Orders.SingleOrDefaultAsync(x => x.Id == id);
             db.Orders.Remove(result);
             await db.SaveChangesAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await db.Orders.SingleOrDefaultAsync(x=> x.Id == id);
        }

        public async Task<IEnumerable<Order>> GetORdersAsync()
        {
            return await db.Orders.ToListAsync(); 
        }
    }
}