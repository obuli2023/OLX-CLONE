using OLXClone.Models;
namespace OLXClone.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAllProducts();
        public IEnumerable<Product> GetProductsByCategory(string category);
        public Product GetProductById(int id);
        public void UpdateProductIsLiked(Product product);
        public void UpdateProductIsSold(Product product);
        public IEnumerable<Product> GetFavoriteProducts();
        void CreateProduct(Product product);
    }
}
