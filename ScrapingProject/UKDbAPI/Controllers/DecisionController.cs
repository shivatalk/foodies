using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace UKDbAPI.Controllers
{
    public class DecisionController : ApiController
    {

        [Route("api/Data")]
        [HttpGet]
        public IHttpActionResult Name()
        {
            return Ok(new { msg="Shivam"});
        }


        //Api/Data
        [Route("api/Data/post")]
        [HttpPost]
        public IHttpActionResult InsertData([FromBody] UKChallangeDecision data)
        {
            PTOScrapedDBEntities ent = new PTOScrapedDBEntities();
            ent.UKChallangeDecisions.Add(data);
            ent.SaveChanges();
            return Ok(new { msg = "Successfull" });
        }

        //Api/Data
        [Route("api/Data/postarray")]
        [HttpPost]
        public IHttpActionResult InsertDataList([FromBody]List<UKChallangeDecision> data)
        {
            PTOScrapedDBEntities ent;
               
            foreach (UKChallangeDecision item in data)
            {
                
                try
                {
                    ent = new PTOScrapedDBEntities();
                    ent.UKChallangeDecisions.Add(item);
                    ent.SaveChanges();
                }
                catch (Exception e)
                { 
                    
                }
            }
            ent = new PTOScrapedDBEntities();
            var wholerecord = ent.UKChallangeDecisions.ToList();
            return Ok(new { msg = "Successfull" ,List=wholerecord});
        }

    }
}
