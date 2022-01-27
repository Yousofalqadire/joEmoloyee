using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    [Table("Photo")]
    public class Photo
    {
         public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; } 
        [Key,ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; } 


    }
}