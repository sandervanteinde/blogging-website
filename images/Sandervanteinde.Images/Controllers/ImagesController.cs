using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.Images.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public ImagesController(
            IConfiguration configuration
        )
        {
            this.configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<UploadedFileResult>> UploadFile([FromForm]UploadImageModel upload, CancellationToken cancellationToken)
        {
            upload.Deconstruct(out var file);

            var uploadsFolder = configuration["HostSettings:ImagePath"];
            Directory.CreateDirectory(uploadsFolder);
            var fileName = UniqueFileName(uploadsFolder, file.FileName);
            var fileLocation = Path.Combine(uploadsFolder, fileName);
            await using var fileStream = new FileStream(fileLocation, FileMode.Create);
            await file.CopyToAsync(fileStream, cancellationToken);
            var externalUrl = configuration["HostSettings:ExternalUrl"];
            return new UploadedFileResult($"{externalUrl}{fileName}");
        }

        private static string UniqueFileName(string path, string fileName)
        {
            var file = Path.Combine(path, fileName);
            var i = 0;
            string? fileNameWithoutExt = null;
            string? extension = null;
            while(System.IO.File.Exists(file))
            {
                fileNameWithoutExt ??= Path.GetFileNameWithoutExtension(file);
                extension ??= Path.GetExtension(file);
                fileName = $"{fileNameWithoutExt}_{++i}{extension}";
                file = Path.Combine(path, fileName);
            }
            return fileName;

        }

        public record UploadImageModel(IFormFile File);
        public record UploadedFileResult(string Location);
    }
}
