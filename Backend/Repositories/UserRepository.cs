using MongoDB.Driver;
using OLXClone.Models;

namespace OLXClone.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IMongoDatabase database)
        {
            _users = database.GetCollection<User>("Users");
        }

        public User GetUserByEmail(string email)
        {
            return _users.Find(u => u.Email == email).FirstOrDefault();
        }

        public void CreateUser(User user)
        {
            _users.InsertOne(user);
        }
    }
}
