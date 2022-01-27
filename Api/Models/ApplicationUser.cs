using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Api.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string FullName { get; set; }
        public DateTime BirthDay { get; set; }
        public bool LitralMan { get; set; }
        public string Litral { get; set; }
        public virtual Photo Photo {get ; set;}
        public virtual Address Address {get; set;}
        
        
    }
}