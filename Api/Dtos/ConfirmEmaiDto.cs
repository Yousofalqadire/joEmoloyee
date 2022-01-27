using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Dtos
{
    public class ConfirmEmaiDto
    {
        public string userId { get; set; }
        public string token { get; set; }
    }
}