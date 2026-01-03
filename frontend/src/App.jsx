import { useState } from 'react'
import { ContactForm } from './components/ContactForm'
import { ContactList } from './components/ContactList'

function App() {

  const [contacts, setContacts] = useState([]);

  return (
    <div className='p-8 max-w-360 mx-auto grid grid-cols-3 gap-8 '>

        <div className='col-span-1 space-y-4'>
          <h1 className='text-3xl font-bold mb-10 text-blue-900'>
            Contact Management System
          </h1>
            <ContactForm setContacts={setContacts} contacts={contacts} />
        </div>

        <div className='col-span-2'>
            <ContactList setContacts={setContacts} contacts={contacts} />
        </div>

    </div>
  )
}

export default App