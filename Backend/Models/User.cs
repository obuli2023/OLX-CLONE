using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace OLXClone.Models
{
    public class User
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("email")]
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [BsonElement("password")]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } // Hashed password

        [BsonElement("role")]
        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; } // "buyer" or "seller"
    }
}
