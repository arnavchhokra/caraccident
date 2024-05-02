"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LucideScissorsSquareDashedBottom } from 'lucide-react';
import Web3 from 'web3';
import ABI from "../../../ABI.json";
import CryptoJS from 'crypto-js';


function Page() {

  interface WindowWithEthereum extends Window {
    ethereum?: any;
    }

  const [isEncrypt, setIsEncrypt] = useState(false); // State to track encryption status
  const [password, setPassword] = useState(''); // State to track password value
  const [ownerName, setOwnerName] = useState(''); // State to track owner name value
  const [carName, setCarName] = useState(''); // State to track car name value


	const [web3, setWeb3] = useState<Web3 | null>(null);

  const contractAddress = "0x4c304df050df16ee92ef5037290c10cd19f35128";


	  const register = async() =>{

		if (typeof window !== "undefined") {
		  const win = window as WindowWithEthereum;
		  if (win.ethereum) {
		  await win.ethereum.enable();
		  const web3 = new Web3(win.ethereum);
		  setWeb3(web3);
		  const accounts = await web3.eth.getAccounts();
		  const contra = new web3.eth.Contract(
			ABI,
			contractAddress
		  );
		  try{
      if(isEncrypt)
        {
          const _owner = CryptoJS.AES.encrypt(ownerName, password).toString()
          const _carName = CryptoJS.AES.encrypt(carName, password).toString()
          console.log("hey encryption")
          setOwnerName(_owner);
          setCarName(_carName);
          console.log(ownerName, carName)
          setTimeout(async () => {
            const regis = await contra.methods.registerCar(_owner, _carName, isEncrypt)
              .send({ from: accounts[0], value: web3.utils.toWei('0.07', 'ether') });
            alert('Car registered');
          }, 10000);        }
      else
      {
        const regis = await contra.methods.registerCar(ownerName,carName,isEncrypt).send({ from: accounts[0]});
      }
      alert('Car registered')
		  }catch(e)
		  {
			alert(e)
		  }
		}
			}

		else{
			alert('Connect Metamask')
		}


	  }

	const renderLogin = async()=>
	{
		console.log("hello user")
	}







  // Handler to update encryption state
  const handleEncrypt = (value:any) => {
    setIsEncrypt(value === "1");
  };

  // Inline function to update password state
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  // Inline function to update owner name state
  const handleOwnerNameChange = (e:any) => {
    setOwnerName(e.target.value);
  };

  // Inline function to update car name state
  const handleCarNameChange = (e:any) => {
    setCarName(e.target.value);
  };

  // Function to render password input if encryption is set to true
  const renderPasswordInput = () => {
    if (isEncrypt) {
      return (
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    console.log("isEncrypt:", isEncrypt);
    console.log("password", password);
    console.log("ownerName",ownerName)
    console.log("carName", carName) // Log isEncrypt value to check if it changes
  },[isEncrypt, password, ownerName, carName]);

  function submit()
  {

  }

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', height: '80vh', width: '330px', gap: '10px' }}>
          <Card className="w-[350px] items-center">
            <CardHeader>
              <CardTitle>Register Car</CardTitle>
              <CardDescription>Register your new car in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    placeholder="Name of the Owner"
                    value={ownerName}
                    onChange={handleOwnerNameChange}
                  />
                </div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Car Name</Label>
                    <Input
                      id="name"
                      placeholder="Name of the Car"
                      value={carName}
                      onChange={handleCarNameChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="encrypt">Encrypt it?</Label>
                    <Select onValueChange={handleEncrypt}>
                      <SelectTrigger id="encrypt">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {renderPasswordInput()} {/* Render password input based on encryption status */}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={register}>Register</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
