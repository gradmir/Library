using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace LibraryApi
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => 
            {
                options.AddPolicy(MyAllowSpecificOrigins, policy => { 
                    policy.AllowAnyOrigin();
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    });
            });

            services.AddControllers();

            services.AddDbContext<LibraryContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("LibraryContext")));
            // using (var context = new LibraryContext(new DbContextOptionsBuilder<LibraryContext>().UseInMemoryDatabase("Library").Options))
            // {
            //     context.Books.Add(new Book
            //     {
            //         Name = "The Master and Margarita",
            //         Author = "Mikhail Bulgakov",
            //         Genre = "Fantasy, Romance",
            //         Id = 1,
            //         Year = 1940
            //     });
            //     context.Books.Add(new Book
            //     {
            //         Name = "Dead Souls",
            //         Author = "Nikolai Gogol",
            //         Genre = "Political, Satire",
            //         Id = 2,
            //         Year = 1842
            //     });
            //     context.Books.Add(new Book
            //     {
            //         Name = "The Twelve Chairs",
            //         Author = "Ilf and Petrov",
            //         Genre = "Satirical novel",
            //         Id = 3,
            //         Year = 1931
            //     });
            //     context.SaveChanges();

            // }

            services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
