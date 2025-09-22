import { nanoid } from "nanoid";
import { ShortURL } from "../db/Models/shorturl.model.js";



export const createShortUrl = async (req, res) => {
 try {
   const { customUrl, expiresAt, originalUrl, title } = req.body;
   const userId = req.user.id;
   if (!originalUrl) {
     console.log("Long url not found !!!");
     return res.status(400).send({
       message: "Original url is required",
     });
   }
   let shortCode;
   if (customUrl) {
     shortCode = customUrl;
     const exist = await ShortURL.findOne({
       shortCode,
     });
     if (exist) {
       console.log("This shortCode already exist");
       return res.status(400).send({
         message: "Please try another shortCode",
       });
     }
   } 
   else {
     shortCode = nanoid(7);
     let exist = await ShortURL.findOne({
       shortCode,
     });
     while (exist) {
       shortCode = nanoid(7);
       exist = await ShortURL.findOne({
         shortCode,
       });
     }
   }
   const newUrl = new ShortURL({
     originalUrl,
     shortCode,
     userId,
   });
   await newUrl.save();

   return res.status(201).send(
     newUrl,
   );

 } catch (error) {
   console.error(error);
   return res.status(500).json({
     message: "Internal server error ",
   });
 }
};



export const getLongUrl = async (req, res) => {

  try {
    const { shortcode } = req.params;
    const exist = await ShortURL.findOne({ shortCode: shortcode });

    if (!exist) {
      console.log("Short code not found");
      return res.status(404).json({ message: "Short code not found" });
    }

    if (!exist.isActive) {
      return res.status(403).json({ message: "ShortURL is deactivated" });
    }

    // Use 302 unless you want it cached permanently when returned normally it will be by default 301
    return res.redirect(302, exist.originalUrl);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getMyUrls = async(req,res)=>{
    try{
        const userIs = req.user.id;
        const mycreatedurls = await ShortURL.find({userId : userIs});
        return res.status(200).json(mycreatedurls);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error "});
    }
}


export const updateshortcode = async (req, res) => {
  try {
    const { shortCode: newShortCode } = req.body;
    const { id } = req.params;

    const exist = await ShortURL.findOne({ shortCode: newShortCode });
    if (exist) {
      return res.status(400).json({ message: "Please try another unique short code" });
    }

    // Update the shortcode
    const updatedData = await ShortURL.findByIdAndUpdate(
      id,
      { shortCode: newShortCode },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Updation failed" });
  }
};


export const deletelink = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ShortURL.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json({ message: "Successfully deleted" });
  }
   catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const changeactivestatus = async(req, res)=>{
   try {
    const { id } = req.params;
    const { isActive } = req.body;  

    const updated = await ShortURL.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }   
    );

    if (!updated) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }

}