import { useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardComponent from './components/CardComponent';
import FormComponent from './components/FormComponent';

// status for error loading success or idle
type Status = 'idle' | 'loading' | 'success' | 'error';
type Product = {
  readonly id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [openModal, setOpenModal] = useState(false);

  const [dataForm, setDataForm] = useState({});


  useEffect(() => {
    setStatus('loading')
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data => {
      setProducts(data)
      setStatus('success')
    }).catch(err => {
      setStatus('error')
    })
  }, [])

  if(status === 'loading') {
    return (
      <div className='text-6xl flex justify-center items-center h-screen'>
  Loading
</div>

    )
  }

  function getDataForm(product: any) {
    setDataForm(product)
  }

  const createProduct = () => {
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })

    setOpenModal(false)
  }

  return ( 
    <>

    <div className='flex justify-center m-4'>
    <Button onClick={() => setOpenModal(true)}>Create Product</Button>

    </div>
    
  <div className='mx-16 grid grid-flow-row grid-cols-4 gap-4'>
    {
      products.map(product => <CardComponent key={product.id} title={product.title} image={product.image} price={product.price}/>)
    }
  </div>

  <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
          <FormComponent getDataForm={getDataForm} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  
  )
}

export default App
