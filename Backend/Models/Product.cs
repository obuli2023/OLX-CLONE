using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Specialized;

namespace OLXClone.Models
{
    public class Product
    {
        [BsonId]
        public int Id { get; set; } // MongoDB _id

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("price")]
        public int Price { get; set; }

        [BsonElement("category")]
        public string Category { get; set; }

        [BsonElement("condition")]
        public string Condition { get; set; }

        [BsonElement("location")]
        public string Location { get; set; }

        [BsonElement("imageUrl")]
        public string ImageUrl { get; set; }

        [BsonElement("contactInfo")]
        public string ContactInfo { get; set; }

        [BsonElement("isSold")]
        public bool IsSold { get; set; }

        [BsonElement("isLiked")]
        public bool IsLiked { get; set; }

        [BsonElement("brand")]
        public string Brand { get; set; }

        [BsonElement("sellerName")]
        public string SellerName { get; set; }

        [BsonElement("datePosted")]
        public DateTime DatePosted { get; set; }
    }
}
