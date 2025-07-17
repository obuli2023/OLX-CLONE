using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using OLXClone.Services;
using OLXClone.Models;

namespace OLXClone.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAllProducts([FromQuery] string? category = null)
        {
            var products = _productService.GetProducts(category);

            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productService.GetProductId(id);

            if (product == null)
            {
                return NotFound($"No product found with ID: {id}");
            }

            return Ok(product);
        }

        [HttpPatch("{id}/like")]
        public IActionResult UpdateProductIsLiked(int id, [FromBody] bool isLiked)
        {
            var product = _productService.GetProductId(id);

            if (product == null)
            {
                return NotFound($"No product found with ID: {id}");
            }

            product.IsLiked = isLiked; 

            try
            {
                _productService.UpdateProductIsLiked(product.Id, product.IsLiked); 
                return Ok(new { message = "Product like status updated successfully." }); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }

        [HttpPatch("{id}/sell")]
        public IActionResult SellProduct(int id, [FromBody] bool isSold)
        {
            var product = _productService.GetProductId(id);

            if (product == null)
            {
                return NotFound($"No product found with ID: {id}");
            }

            product.IsSold = isSold; 

            try
            {
                _productService.UpdateProductIsSold(product.Id, product.IsSold);
                return Ok(new { message = "Product sold status updated successfully." }); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }

        [HttpGet("favorites")]
        public IActionResult GetFavoriteProducts()
        {
            var favoriteProducts = _productService.GetFavoriteProducts();
            return Ok(favoriteProducts);
        }


        [HttpPost]
        [Authorize(Roles = "seller")]
        public IActionResult CreateProduct(Product product)
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            if (username == null)
            {
                return Unauthorized("User not authenticated.");
            }

            Console.WriteLine("Creating product for user: " + username);
            
            _productService.CreateProduct(product,username);
            return Ok("Product created successfully.");
        }

    }
}