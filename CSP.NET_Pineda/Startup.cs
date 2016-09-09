using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CSP.NET_Pineda.Startup))]
namespace CSP.NET_Pineda
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
