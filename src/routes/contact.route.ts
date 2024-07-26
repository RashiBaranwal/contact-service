import { Hono } from "hono";
import { createContactHandler, getHello } from "../handler/contact.handler";


const router = new Hono();

router.post('/create', createContactHandler);
router.get('/hello',getHello);

export default router;