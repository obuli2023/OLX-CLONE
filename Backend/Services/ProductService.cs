
using OLXClone.Models;
using OLXClone.Repositories;
using System.Collections.Generic;
namespace OLXClone.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<Product> GetProducts(string? category = null)
        {
            // If category is provided, fetch products by category, otherwise fetch all products
            if (!string.IsNullOrEmpty(category))
            {
                return _productRepository.GetProductsByCategory(category); 
            }

            return _productRepository.GetAllProducts();
        }
        public Product GetProductId(int id)
        {
            return _productRepository.GetProductById(id);
        }

        public void UpdateProductIsLiked(int id, bool isLiked)
        {
            var product = _productRepository.GetProductById(id); 

            if (product == null)
            {
                throw new Exception("Product not found");
            }

            product.IsLiked = isLiked; 
            _productRepository.UpdateProductIsLiked(product); 
        }
        public void UpdateProductIsSold(int id, bool isSold)
        {
            var product = _productRepository.GetProductById(id); 

            if (product == null)
            {
                throw new Exception("Product not found");
            }

            product.IsSold = isSold; 
            _productRepository.UpdateProductIsSold(product); 
        }


        public IEnumerable<Product> GetFavoriteProducts()
        {
            return _productRepository.GetFavoriteProducts();
        }

        public void CreateProduct(Product product, string username)
        {
            _productRepository.CreateProduct(product);
        }
    }
}
