import { Router } from "express";

import { changeactivestatus, createShortUrl, deletelink, getLongUrl, getMyUrls, updateshortcode } from "../Controllers/shortUrlController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";


const shortURLRouter = Router();

//it is the thumb rule
shortURLRouter.post("/", isLoggedIn, createShortUrl)

// static routes first
shortURLRouter.get("/my/links", isLoggedIn , getMyUrls);
shortURLRouter.patch("/my/links/:id" , isLoggedIn , updateshortcode);
shortURLRouter.delete("/my/links/:id" , isLoggedIn , deletelink);
shortURLRouter.patch("/my/links/changestatus/:id" , isLoggedIn , changeactivestatus);


// dynamic redirect last
shortURLRouter.get("/:shortcode", getLongUrl);




export default shortURLRouter;