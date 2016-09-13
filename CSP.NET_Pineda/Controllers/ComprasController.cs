using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Mail;

namespace CSP.NET_Pineda.Controllers
{
    public class ComprasController : Controller
    {
        private Entities db = new Entities();
        // GET: Compras
        public ActionResult Index()
        {
            return View();
        }

        /*POST  de Compras*/
        public string addCompra(int _IdProductor,int _IdProducto,double _Peso,
            int _Tara, double _SubTotal, double _Desc,double _Total, double _FCambio,
            double _PrecioCafe, DateTime _FechaCompra) {

            try
            {
                Compras NuevaCompra = new Compras()
                {
                    IdProductor = _IdProductor,
                    IdProducto = _IdProducto,
                    Peso = (decimal)_Peso,
                    Tara = _Tara,
                    SubTotal = (decimal)_SubTotal,
                    Descuento = (decimal)_Desc,
                    Total = (decimal)_Total,
                    FactorCambioDolar = (decimal)_FCambio,
                    PrecioCafe = (decimal)_PrecioCafe,
                    FechaCompra = _FechaCompra
                };

                db.Compras.Add(NuevaCompra);
                db.SaveChanges();

                sendEmail(_IdProductor);//Envio correo de confirmacion

                return "true";
            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }


        /*GET Listado de Compras*/
        public JsonResult GetCompras() {
            var listaCompras = from Compra in db.Compras
                               join Cliente in db.Productores on Compra.IdProductor equals Cliente.IdProductor
                               join Producto in db.Productos on Compra.IdProducto equals Producto.Id
                               select new
                               {
                                   Nombre = Cliente.NombreProveedor,
                                   Producto = Producto.NombreProducto,
                                   Monto = Compra.Total
                               };
            return Json(listaCompras);
        }


        /*Envio de Correos*/
        public void sendEmail(int _IdProductor) {
            string P = string.Empty;
            decimal V = 0;

            var ListProductor = from ProductorQ in db.Productores
                                select ProductorQ;

            var ListaCompras = from compra in db.Compras
                                select compra;

            foreach (var item in ListProductor)
            {
                if (item.IdProductor == _IdProductor)
                {
                    P = item.NombreProveedor;
                }
            }

            foreach (var item in ListaCompras)
            {
                if (item.IdProductor == _IdProductor)
                {
                    V = (decimal)item.Total;
                }
            }

           

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.sparkpostmail.com";
            smtp.Port = 587;
            smtp.EnableSsl = true;

            smtp.Credentials = new NetworkCredential("SMTP_Injection", "92685fa011e082ed66820e8c0c3e2d092bc35948");
            MailAddress from = new MailAddress("testing@sparkpostbox.com");
            MailAddress to = new MailAddress("mgalindo9410@gmail.com");
            MailMessage mail = new MailMessage(from, to);
            mail.Subject = "Confirmacion de compra";
            mail.Body = "Se compro cafe a: "+P+" Por monto de: "+V.ToString()+"";
            //smtp.Send(mail);

        }

    }
}