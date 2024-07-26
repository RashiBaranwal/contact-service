import { Hono } from "hono";
import { cors } from "hono/cors";
import { connect } from "http2";
import connectDB from "./config/db.config";
import Contact from './models/Contact';
import { json } from "hono/json";
// import { Context } from "hono/dist/types/hono-base";
// import { json } from "stream/consumers";

const createServer = () => {
    const app = new Hono().basePath("/api/v1");
    connectDB();
    app.use(
        '*',
        cors({
            origin: '*',
            allowMethods: ['GET', 'POST', 'DELETE'],
            credentials: true,
        })

    );
    app.get('/hello', (c) => {
        return c.json('Hello Hono!')
    });
    app.post('/contact', async (c) => {
        try {
            const { name} = await c.req.json();

            if (!name) {
                return c.json({ error: 'Missing required fields' }, 400);
            }

            const newContact = new Contact({ name});
            await newContact.save();
            return c.json({ message: 'Contact saved successfully' }, 201);
        } catch (error) {
            console.error('Error saving contact:', error);
            return c.json({ error: 'Failed to save contact' }, 500);
        }
    });

    return app;
}

export default createServer;