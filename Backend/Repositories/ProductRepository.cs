using MongoDB.Driver;
using OLXClone.Models;

namespace OLXClone.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _products;

        public ProductRepository(IMongoDatabase database)
        {
            _products = database.GetCollection<Product>("ProductAds");
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _products.Find(product => true).ToList(); 
        }

        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            return _products.Find(product => product.Category.ToLower() == category.ToLower()).ToList(); 
        }

        public Product GetProductById(int id)
        {
            return _products.Find(product => product.Id == id).FirstOrDefault(); 
        }

        public void UpdateProductIsLiked(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, product.Id);

            var update = Builders<Product>.Update.Set(p => p.IsLiked, product.IsLiked);

            _products.UpdateOne(filter, update);
        }

        public IEnumerable<Product> GetFavoriteProducts()
        {
            return _products.Find(p => p.IsLiked).ToList(); 
        }

        public void UpdateProductIsSold(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, product.Id);

            var update = Builders<Product>.Update.Set(p => p.IsSold, product.IsSold);

            _products.UpdateOne(filter, update);
        }



        public void CreateProduct(Product product)
        {
            _products.InsertOne(product); 
        }
    }
}
