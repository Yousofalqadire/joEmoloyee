using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Scope { get; set; }
        public string Phone { get; set; }
    }
}