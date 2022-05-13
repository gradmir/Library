using LibraryApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace LibraryApi.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new LibraryContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<LibraryContext>>()))
            {

                if (context.Books.Any())
                {
                    return;   
                }

                context.Books.AddRange(
                    new Book
                    {
                        Name = "The Master and Margarita",
                        Author = "Mikhail Bulgakov",
                        Genre = "Fantasy, Romance",
                        Year = 1940
                    },
                    new Book
                    {
                        Name = "Dead Souls",
                        Author = "Nikolai Gogol",
                        Genre = "Political, Satire",
                        Year = 1842
                    },
                    new Book
                    {
                        Name = "The Twelve Chairs",
                        Author = "Ilf and Petrov",
                        Genre = "Satirical novel",
                        Year = 1931
                    });

                context.SaveChanges();
            }
        }
    }
}