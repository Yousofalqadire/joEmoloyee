using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Dtos
{
    public class RegisterDto
    {
         [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string BirthDay { get; set; }
        [Required]
        public string Litral { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public IFormFile Photo { get; set; }
    }
}