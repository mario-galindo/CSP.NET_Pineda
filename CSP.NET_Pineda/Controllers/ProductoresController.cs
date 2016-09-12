using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSP.NET_Pineda.Controllers
{
    public class ProductoresController : Controller
    {
        private Entities db = new Entities();

        // GET: Productores
        public ActionResult Index()
        {
            return View();
        }

        /*POST de Nuevo Productor*/
        public string addProductor(string _Nombre, string _Apellido,string _Id, string _Telefono,string _RTN
            ,string _IHCAFE,string _Domicilio) {

            try
            {
                Productores NuevoProductor = new Productores()
                {
                    NombreProveedor = _Nombre,
                    ApellidoProveedor = _Apellido,
                    Identidad = _Id,
                    RTN = _RTN,
                    IHCAFEClave = _IHCAFE,
                    Domicilio = _Domicilio,
                    Telefono = _Telefono
                };

                db.Productores.Add(NuevoProductor);
                db.SaveChanges();

                return "true";
            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }

        /*GET Lista de Proveedores*/
        public JsonResult GetProductores()
        {
            var listaProductores = from Productor in db.Productores
                                   select new
                                   {
                                       Nombre = Productor.NombreProveedor,
                                       Apellido = Productor.ApellidoProveedor,
                                       Identidad = Productor.Identidad,
                                       Telefono = Productor.Telefono,
                                       RTN = Productor.RTN,
                                       IHCAFE = Productor.IHCAFEClave,
                                       Domicilio = Productor.Domicilio
                                   };

            return Json(listaProductores);
        }
    }
}