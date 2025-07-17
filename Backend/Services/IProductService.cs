using OLXClone.Models;

namespace OLXClone.Services;

public interface IProductService
{
    public IEnumerable<Product> GetProducts(string? category = null);

    public Product GetProductId(int id);

    public void UpdateProductIsLiked(int id, bool isLiked);
    public void UpdateProductIsSold(int id, bool isSold);

    public IEnumerable<Product> GetFavoriteProducts();

    public void CreateProduct(Product product, string user);

}
