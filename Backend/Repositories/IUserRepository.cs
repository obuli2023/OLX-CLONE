using OLXClone.Models;
namespace OLXClone.Repositories
{
    public interface IUserRepository
    {
        public User GetUserByEmail(string email);
        public void CreateUser(User user);
    }
}
