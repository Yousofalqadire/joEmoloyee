using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;

namespace Api.Dtos;

    public class GetUsersDtos
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDay { get; set; }
        public bool LitralMan { get; set; }
        public string UserName { get; set; }
        public string Litral { get; set; }
        public PhotoDto Photo { get; set; }
        public AddressDto Address { get; set; }
        public string Token { get; set; }
    }
 