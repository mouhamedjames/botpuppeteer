import fs from 'fs'; 
const filePath = './scraped_data.json';
let  customer
try{
const jsonString = fs.readFileSync(filePath);
   customer = JSON.parse(jsonString);
   console.log(customer.length)
   const filter =customer.filter((map)=>map.title.includes("Downtown Dubai")===true)
   const filter1=filter.filter((map)=>map.facts[1].includes("1  Bed")===true)
   console.log(filter.length)
   console.log(filter1.length)
}
catch(err){




}

