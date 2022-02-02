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
        public string Street { get; set; }
        public string Airea { get; set; }
        public string City { get; set; }
        public string Governorate { get; set; }
        public string Country { get; set; }
        public string PlaceId { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}