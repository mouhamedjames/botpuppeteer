import Link from "../models/link.js"
import nodemailer from "nodemailer"
import fs from "fs"
import ejs from "ejs"
import path from "path"
export const navigate= async (req,res,next)=>{
    const filePath = './rent.json';
    const filePath1 = './buy.json';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mohamedjamess.12@gmail.com',
          pass: 'qftixnipilzzwzlg',
        },
      });
   
      
        
try{
    
      
      
  let jsonString=""
       
    const links= new Link(req.body)

    
    await links.save()
    if(req.body.category==="rent"){

       jsonString = fs.readFileSync(filePath);
     
    }
    else if (req.body.category==="buy"){

       jsonString = fs.readFileSync(filePath1);
     
    }
   
   
         const file = JSON.parse(jsonString);

    const filter =file.filter((map)=>map.title.includes(req.body.proprety)===true)
    const filter1 =filter.filter((map)=>map.facts[1].includes(req.body.rooms)===true)
    const filter3 =filter1.filter((map)=>map.title.includes(req.body.address[0].value)===true)
    console.log(filter.length)
    console.log(filter1.length)
    console.log(filter3.length)
    res.status(200).json(links) 
    const currentDirectory = path.resolve();

    const mailOptions = {
        from: 'mohamedjamess.12@gmail.com',
        to: req.body.contact.email,
        subject: 'example of houses',
       
      };
      ejs.renderFile(path.join(currentDirectory, 'letter.ejs'), { filter3 }, (err, html) => {
        if (err) {
          console.error('Error rendering EJS template: ' + err);
          return;
        }



        mailOptions.html = html;
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });

   

}
catch(err)


{ next(err) }


}




