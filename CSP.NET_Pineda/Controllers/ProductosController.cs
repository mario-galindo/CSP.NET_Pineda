using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSP.NET_Pineda.Controllers
{
    public class ProductosController : Controller
    {
        private Entities db = new Entities();
        // GET: Productos
        public ActionResult Index()
        {
            return View();
        }

        public string addProductos(string _nombreProducto,int _cantidadStock,int _categoria) {
            try
            {
                Productos nuevoProducto = new Productos()
                {
                    NombreProducto = _nombreProducto,
                    CantidadStock = _cantidadStock,
                    CategoriaProducto = _categoria

                };

                db.Productos.Add(nuevoProducto);
                db.SaveChanges();

                return "true";
            }
            catch (Exception e)
            {

                return e.ToString();
            }

        }
    }
}