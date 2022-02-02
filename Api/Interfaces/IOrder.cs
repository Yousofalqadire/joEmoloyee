using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;

namespace Api.Interfaces
{
    public interface IOrder
    {
        Task<Order> AddOrder(Order model);
        Task<Order> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetORdersAsync();
        Task DeleteOrderAsync(int id);
    }
}