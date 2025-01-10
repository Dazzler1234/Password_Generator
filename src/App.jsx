import { useCallback, useEffect, useState , useRef } from 'react'
import './App.css'

function App() {
  const [length , setLength] = useState(8)
  const [NumberAllowed , setNumberAllowed] = useState(false)
  const [ChrtrAllowed , setChrtrAllowed] = useState(false)
  const [Password , setPassword] = useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    

    if(NumberAllowed) str+= "1234567890"
    if(ChrtrAllowed) str+= "~!@#$%^&*(){}[]"

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
       setPassword(pass)
    
  } , [length , NumberAllowed , ChrtrAllowed , setPassword])

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  } , [Password])

  useEffect(()=>{
    passwordGenerator()
  } , [length , NumberAllowed , ChrtrAllowed , setPassword])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-5 px-4 my-8 text-orange-500 bg-gray-700 '>
      <h1 className='text-white text-lg text-center pt-2'> Password Generator </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={Password}
          className='outline-none w-full py-1 px-3 '
          placeholder='Password'
          readOnly
          ref={passwordRef}

        />
        <button onClick={copyPasswordtoClipboard} className='outline-none bg-blue-700 text-white px-3
        py-0.5 shrink-0'>Copy</button>
      </div>


      <div className='flex text-sm gap-x-2 text-[17px]'>
        <div className='flex item-center gap-x-1'>

          <input
           type="range"
           min={4}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange = {(e) => setLength(Number(e.target.value))}
           />
           <label >length : {length}</label>
        </div>

        <div>
          <input 
          type="checkbox" 
          defaultChecked={NumberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor='numberInput' >Numbers</label>
        </div>      

        <div>
          <input 
          type="checkbox" 
          defaultChecked={ChrtrAllowed}
          id="CharacterInput"
          onChange={() => setChrtrAllowed((prev) => !prev)}
          />
          <label htmlFor='characterInput' >Characters</label>
        </div>

      </div>




    </div>

    </>
  )
}

export default App
