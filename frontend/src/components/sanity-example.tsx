import { client } from "@/sanity/client"
import { OfficeBearer } from "@/sanity/types"
import { defineQuery } from "next-sanity"

const EXAMPLE_QUERY=defineQuery(`*[
    _type=="officeBearer"  
    ]{
        _id,
        name,
        designation,
        description,
        image
    }`)

const SanityExample =async () => {
    const officeBearers = await client.fetch(EXAMPLE_QUERY)
    console.log(officeBearers)
  return (
    <div className=''>
        <h1 className='text-2xl font-bold'>Example fetch from sanity</h1>
        <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {officeBearers.map((officeBearer:OfficeBearer) => (
          <li className="bg-white p-4 rounded-lg" key={officeBearer._id}>
              <h2 className="text-xl font-semibold">{officeBearer?.name}</h2>
              <h4 className="text-lg font-semibold underline">{officeBearer.designation}</h4>
              <p>{officeBearer.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SanityExample