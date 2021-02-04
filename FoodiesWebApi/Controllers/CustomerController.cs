using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FoodiesWebApi.Models;

namespace FoodiesWebApi.Controllers
{
    public class CustomerController : ApiController
    {

        [Route("api/Customer/MenuItems")]
        public IHttpActionResult GetMenus()
        {
            MyFoodiesEntities ent = new MyFoodiesEntities();
            var vendors = ent.Vendors;
            var food = ent.FoodItems;
            var vendorMenu = vendors.Join(food, vend => vend.VendorId, fooditem => fooditem.VendorId, 
                (vend,fooditem) => new {                
                    vend.VendorId,
                    vend.RestaurantName,
                    fooditem.FoodId,
                    fooditem.FoodName,
                    fooditem.FoodPrice,
                    fooditem.FoodDetails,
                    fooditem.FoodStatus,
                    fooditem.FoodRating,
                
                }).ToList();

            return Ok(vendorMenu);
        }


        [Route("api/Customer/Orders/{id}")] //id==customerId
        public IHttpActionResult GetMyOrders([FromUri] int id)
        {
            MyFoodiesEntities ent = new MyFoodiesEntities();
            List<Order> orders = ent.Orders.Where(x => x.CustomerId == id).ToList();
            List<Vendor> vendors = ent.Vendors.ToList();
            List<FoodItem> fooditems = ent.FoodItems.ToList();

            var myorders = from order in orders
                           join v in vendors on order.VendorId equals v.VendorId into table1
                           from nt in table1.ToList()
                           join food in fooditems on order.FoodItemId equals food.FoodId into table2
                           from i in table2.ToList()
                           select new {                         
                               order.OrderId,
                               nt.RestaurantName,
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


        [Route("api/Customer/login")]
        [HttpPost]
        public IHttpActionResult LoginVendor([FromBody] Customer customerDetails)
        {
            var email = customerDetails.CustomerEmailId;
            var pass = customerDetails.CustomerPassword;

            if (email == null || pass == null || email == "" || pass == "")
            {
                return BadRequest("BadRequest");
            }

            MyFoodiesEntities ent;
            try
            {
                ent = new MyFoodiesEntities();
                var data = ent.Customers.Where(x => x.CustomerEmailId == email && x.CustomerPassword == pass).
                    Select(x => new { x.CustomerEmailId, x.CustomerId,x.CustomerLocation }).FirstOrDefault();

                return Ok(data);
            }
            catch (Exception)
            {
                return InternalServerError();
            }



        }


        [HttpGet]  //api/Customer/CustomerId
        public IHttpActionResult GetCustomerDetalilsByCustomerId(int id)
        {
            MyFoodiesEntities ent;                
            try{
                ent = new MyFoodiesEntities();
                var cs = ent.Customers.Where(x => x.CustomerId == id).Select(x => new { 
                    x.CustomerId,
                    x.CustomerName,
                    x.CustomerEmailId,
                    x.CustomerMobileNo,
                    x.CustomerAddress,
                    x.CustomerLocation
                
                }).FirstOrDefault();
                return Ok(cs);
            }
            catch(Exception )
            {
                return InternalServerError();
            }   
        }


        [HttpPost] //api/Customer/
        public IHttpActionResult RegisterCustomer([FromBody] Customer user)
        {
            MyFoodiesEntities ent;
            try {
                ent = new MyFoodiesEntities();
                ent.Customers.Add(user);
                ent.SaveChanges();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Created("Created SuccessFully",new {Name=user.CustomerName,Email=user.CustomerEmailId});

        }

        [HttpPut] //api/Customer/CustomerId
        public IHttpActionResult UpdateCustomer([FromUri] int id,[FromBody] Customer updated)
        {
            MyFoodiesEntities ent;
            try
            {
                if (id == updated.CustomerId)
                {
                    ent = new MyFoodiesEntities();
                    Customer c = ent.Customers.Find(id);
                    c.CustomerName = updated.CustomerName;
                    c.CustomerMobileNo = updated.CustomerMobileNo;
                    c.CustomerAddress = updated.CustomerAddress;
                    c.CustomerLocation = updated.CustomerLocation;
                    ent.SaveChanges();
                }
                else
                    return NotFound();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Ok(new { Name = updated.CustomerName, Email = updated.CustomerEmailId });

        }

        [Route("api/Customer/placeorder")]
        [HttpPost] //api/Customer/placeorder
        public IHttpActionResult PlaceCustomerOrder([FromBody] Order orderdata)
        {
            MyFoodiesEntities ent;
            try
            {
                ent = new MyFoodiesEntities();
                ent.Orders.Add(orderdata);
                ent.SaveChanges();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Created("Created SuccessFully", new { msg="success" });

        }



    }
}
