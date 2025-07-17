using OLXClone.Models;
namespace OLXClone.Services
{
    public interface IUserService
    {
        public string Authenticate(string email, string password);
        public void Register(User user);

        public User GetUserByEmail(string email);
    }
}
