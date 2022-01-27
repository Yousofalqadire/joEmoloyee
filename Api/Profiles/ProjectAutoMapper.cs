using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using AutoMapper;
using Api.Dtos;

namespace Api.Profiles;

    public class ProjectAutoMapper:Profile
    {
        public ProjectAutoMapper()
        {
            CreateMap<ApplicationUser,GetUsersDtos>();
            CreateMap<Address,AddressDto>();
            CreateMap<Photo,PhotoDto>();
        }
    }
