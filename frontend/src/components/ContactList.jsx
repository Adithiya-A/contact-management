import axios from "axios"
import { useState, useEffect } from "react"

export const ContactList = ({setContacts, contacts}) => {

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true)
            const query = `?search=${search}`
            const fetchPromise = axios.get(`http://localhost:5000/contacts${query}`);
            const delay = new Promise(resolve => setTimeout(resolve, 1000));

            const [res] = await Promise.all([fetchPromise, delay]);
            setContacts(res.data);

            setLoading(false)
        }

        fetchContacts()
    }, [search])

    const handleDelete = async (id) => {
        if(confirm("Are you sure you want to delete this contact?")){
            try{
                await axios.delete(`http://localhost:5000/contacts/${id}`)
                setContacts((prev) => prev.filter(contact => contact._id !== id))
            }catch(error){
                console.log(error)
            }
            
        }
        
    }
    

    return (
        <div>
            <div className="flex justify-end">
                <input type="text" placeholder="Search by name" className="rounded bg-white w-8/12 h-10 p-2 mx-auto outline-0" 
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {loading ? (
                <div className="h-103 flex justify-center w-full flex-col items-center rounded-md p-2.5 mt-10 gap-4">
                    <img src="/tube-spinner.svg" alt="" width={60} height={60}/>
                    <p className="text-2xl font-semibold">Loading</p>
                </div>
            ): (
                <div>

                    <div className="mt-10">
                        {contacts.length === 0 && (
                            <div className="h-103 flex justify-center w-full flex-col items-center rounded-md p-2.5 mt-10 gap-4 bg-[#eff4ff]">
                                <img src="/not-found.png" alt="" width={200} height={200}/>
                                <p className="text-2xl font-semibold">No Contacts Found</p>
                            </div>
                        )}
                    </div>

                        <div className="grid grid-cols-2 gap-10">
                            {contacts.map((contact) => (

                                <div key={contact._id} >
                                    <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between hover:shadow-1f transition " >
                                        <div>
                                            <div className="text-gray-500 text-sm flex gap-2 mb-5 mt-0 justify-between items-center">
                                                <h3 className="font-bold text-2xl text-blue-800">
                                                    {contact.name}
                                                </h3>
                                            </div>
                                            <div className="text-sm flex gap-2 my-3 justify-between border-2 border-blue-800 px-3 p-3 rounded">
                                                    <p>📧 {contact.email}</p>
                                                    <p>📞 {contact.number}</p>
                                            </div>
                                            <div className="text-sm flex gap-2 my-3 justify-between px-3 p-3">
                                                    <p>{contact.message}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-4">
                                            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transistion hover:cursor-pointer"
                                             onClick={() => handleDelete(contact._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                </div>
            )}

        </div>
    )
}