using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Dtos;

    public class LoginReturnerDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }
