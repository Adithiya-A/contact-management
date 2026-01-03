import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get("/", async (req, res) => {
    try {
        const {search} = req.query;
        let filter = {};
        
        if (search){
            const regex = new RegExp(search, "i");
            filter = { $or: [
                { name: regex }, 
                { email: regex }, 
                { number: regex }
            ] 
        };
        }

        const contacts = await Contact.find(filter).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.put("/:id", async (req, res) => {
    try{
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(contact);

        if(!contact){
            return res.status(404).json({ message: "Contact not found" });
        }

    }catch(error){
        res.status(400).json({ message: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


export default router;