import { useState } from "react"
import axios from "axios"


export const ContactForm = ({setContacts, contacts}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all the fields are filled
        if(!name || !email || !number){
            alert("Please fill all the fields");
            return;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Number Validation
        const numberRegex = /^\d{10}$/;
        if (!numberRegex.test(number)) {
            alert("Please enter a valid phone number (10 digits)");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/contacts`, {name, email, number, message})
            setContacts([res.data, ...contacts])
            setName("")
            setEmail("")
            setNumber("")
            setMessage("")
        } catch (error) {
            console.log(error)
        }

        
    }

    return (

        <div className="">
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">

                <input type="text" placeholder="Name" className="bg-[#eff4ff] p-3 rounded text-black outline-0 w-full mb-4" 
                value={name} onChange={(e) => setName(e.target.value)} />

                <input type="email" placeholder="Email" className="bg-[#eff4ff] p-3 rounded text-black outline-0 w-full mb-4" 
                value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="tel" placeholder="Number" className="bg-[#eff4ff] p-3 rounded text-black outline-0 w-full mb-4" 
                value={number} onChange={(e) => setNumber(e.target.value)} />

                <textarea placeholder="Add Message" className="bg-[#eff4ff] p-3 rounded text-black outline-0 w-full mb-4 resize-none" 
                value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

                <button type="submit" className="bg-[#1d4ed8] p-3 rounded text-white font-bold w-full hover:bg-blue-800 hover:cursor-pointer mt-4">
                    Add Contact
                </button>

            </form>
        </div>
        
    )
}