using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using CloudinaryDotNet.Actions;

namespace Api.Interfaces;

    public interface IPhoto
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletPhotoAsync(string publicId);  
    }
