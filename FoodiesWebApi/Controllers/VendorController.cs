using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FoodiesWebApi.Models;

namespace FoodiesWebApi.Controllers
{
    public class VendorController : ApiController
    {

        [Route("api/Vendor/Menu/{id}")]
        public IHttpActionResult GetMenus([FromUri] int id)
        {
            MyFoodiesEntities ent=new MyFoodiesEntities();
            var vendorMenu = ent.FoodItems.Where(x => x.VendorId == id).Select(x=>new {
                
                x.FoodId,
                x.FoodName,
                x.FoodPrice,
                x.FoodDetails,
                x.FoodStatus,
                x.FoodRating
            }).ToList();
            return Ok(vendorMenu);
        }

        [Route("api/Vendor/Orders/{id}")]
        public IHttpActionResult GetMyOrders([FromUri] int id)
        {
            MyFoodiesEntities ent = new MyFoodiesEntities();
            List<Order> orders = ent.Orders.Where(x => x.VendorId == id).ToList();
            List<Customer> customers = ent.Customers.ToList();
            List<FoodItem> fooditems = ent.FoodItems.ToList();

            var myorders = from order in orders
                           join c in customers on order.CustomerId equals c.CustomerId into table1
                           from nt in table1.ToList()
                           join food in fooditems on order.FoodItemId equals food.FoodId into table2
                           from i in table2.ToList()
                           select new
                           {
                               order.OrderId,
                               nt.CustomerName,
                               nt.CustomerLocation,
                               i.FoodName,
                               i.FoodDetails,
                               i.FoodRating,
                               order.OrderQuantity,
                               order.OrderAmount,
                               order.OrderDate,
                               order.OrderTime,
                               order.OrderStatus,
                               order.OrderLocation

                           };

            return Ok(myorders);
        }

        [Route("api/Vendor/login")]
        [HttpPost]
        public IHttpActionResult LoginVendor([FromBody] Vendor venderDetails)
        {
            var email = venderDetails.VendorEmailId;
            var pass = venderDetails.VendorPassword;

            if (email == null || pass == null || email == "" || pass == "")
            {
                return BadRequest("BadRequest");
            }

            MyFoodiesEntities ent;
            try
            {
                ent = new MyFoodiesEntities();
                var data = ent.Vendors.Where(x => x.VendorEmailId == email && x.VendorPassword == pass).
                    Select(x => new { x.VendorEmailId, x.VendorId }).FirstOrDefault();

                return Ok(data);

            }
            catch (Exception)
            {
                return InternalServerError();
            }



        }

        [HttpGet]  //api/Vendor/VendorId
        public IHttpActionResult GetVendorDetalilsByVendorId(int id)
        {
            MyFoodiesEntities ent;
            try
            {
                ent = new MyFoodiesEntities();
                var cs = ent.Vendors.Where(x => x.VendorId == id).Select(x => new {     
                x.VendorId,
                x.VenderName,
                x.RestaurantName,
                x.VendorEmailId,
                x.VendorMobileNo,
                x.VendorAddress,
                x.VendorLocation

                }).FirstOrDefault();

                return Ok(cs);
            }
            catch (Exception)
            {
                return InternalServerError();
            }

        }

        [HttpPost] //api/Vendor/
        public IHttpActionResult RegisterVendor([FromBody] Vendor user)
        {
            MyFoodiesEntities ent;
            try
            {
                ent = new MyFoodiesEntities();
                ent.Vendors.Add(user);
                ent.SaveChanges();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Created("Created SuccessFully", new { Name = user.VenderName, Email = user.VendorEmailId });

        }

        [HttpPut] //api/Vendor/VendorId
        public IHttpActionResult UpdateVendor([FromUri] int id, [FromBody] Vendor updated)
        {
            MyFoodiesEntities ent;
            try
            {
                if (id == updated.VendorId)
                {
                    ent = new MyFoodiesEntities();
                    Vendor v = ent.Vendors.Find(id);
                    v.VenderName = updated.VenderName;
                    v.VendorLocation = updated.VendorLocation;
                    v.VendorAddress = updated.VendorAddress;
                    v.VendorMobileNo = updated.VendorMobileNo;
                    v.RestaurantName = updated.RestaurantName;
                    ent.SaveChanges();
                }
                else
                    return NotFound();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Ok(new { Name = updated.VenderName, Email = updated.VendorEmailId });

        }

        [Route("api/Vendor/addFood")]
        [HttpPost] //api/Vendor/
        public IHttpActionResult AddFoodItem([FromBody] FoodItem food)
        {
            MyFoodiesEntities ent;
            try
            {
                ent = new MyFoodiesEntities();
                ent.FoodItems.Add(food);
                ent.SaveChanges();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Created("Created SuccessFully", new { msg="Food Added Successfully." });

        }

        [Route("api/Vendor/updateFood/{id}")]
        [HttpPut] //api/Vendor/updateFood/foodid
        public IHttpActionResult UpdateMenuItem([FromUri] int id, [FromBody] FoodItem updated)
        {
            MyFoodiesEntities ent;
            try
            {
                if (id == updated.FoodId)
                {
                    ent = new MyFoodiesEntities();
                    ent.Entry(updated).State = System.Data.Entity.EntityState.Modified;
                    ent.SaveChanges();
                }
                else
                    return NotFound();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Ok(new { FoodName = updated.FoodName});

        }

        [HttpDelete]//api/Vendor/Foodid
        public IHttpActionResult DeleteMenuItem([FromUri] int id)
        {

            MyFoodiesEntities ent = new MyFoodiesEntities();

            try
            {
               FoodItem food= ent.FoodItems.Find(id);

                if (food != null)
                {
                    ent.FoodItems.Remove(food);
                    ent.SaveChanges();
                    return Ok(new {msg="Deleted Successfully" });
                }
                else {
                    return NotFound();
                }


            }
            catch (Exception)
            {
                return InternalServerError();
            }


        }

    }
}
