
import { Button, Checkbox, Label, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function FormComponent({getDataForm}: any) {

    type ErrorType = {
        title: string,
        price: string,
    }

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0)
    const [description, SetDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")

    const [error, setError] = useState<ErrorType>({
        title: "",
        price: "",
    })

    useEffect(() => {
        if (title.length < 3) {
            setError((prev) => {
                return {...prev, title: "Title must be at least 3 characters"}
            });
        } else {
            setError((prev) => {
                return {...prev, title: ""}
            });
        }

        if (price < 0) {
            setError((prev) => {
                return {...prev, price: "Price must be greater than 0"}
            });
        } else {
            setError((prev) => {
                return {...prev, price: ""}
            });
        }
    }, [title, price])

    useEffect(() => {
        getDataForm({title, price, description, category, image})
    }, [title, price, description, category, image])

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Product Title" />
        </div>
        <TextInput id="title" type="text" placeholder="Apple Vision Pro" onChange={(e)=>setTitle(e.target.value)} required />
        {error.title && <p className='text-red-500'>{error.title}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Product Price" />
        </div>
        <TextInput id="price" type="number" onChange={(e)=>setPrice(parseFloat(e.target.value))} required />
        {error.price && <p className='text-red-500'>{error.price }</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea id="description" onChange={(e)=>SetDescription(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        
      </div>
    </form>
  );
}
