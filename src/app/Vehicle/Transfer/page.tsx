"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Web3 from 'web3';
import ABI from "../../../ABI.json";
import CryptoJS from 'crypto-js';




function Page() {
  const [isEncrypt, setIsEncrypt] = useState(false); // State to track encryption status
  const [password, setPassword] = useState(''); // State to track password value
  const [address, setAddress] = useState(''); // State to track address value
  const [personalID, setPersonalID] = useState(''); // State to track personal ID value
  const [carID, setCarID] = useState(''); // State to track car ID value
  const [userName, setUserName] = useState(''); // State to track user name value
  // Handler to update encryption state
  const handleUserNameChange = (e) =>{
    setUserName(e.target.value)
  }

  const handleEncrypt = (value) => {
    setIsEncrypt(value === "1");
  };

  // Inline function to update password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Inline function to update address state
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Inline function to update personal ID state
  const handlePersonalIDChange = (e) => {
    setPersonalID(e.target.value);
  };

  // Inline function to update car ID state
  const handleCarIDChange = (e) => {
    setCarID(e.target.value);
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


  const [web3, setWeb3] = useState<Web3 | null>(null);


  const contractAddress = "0x3E4c97e8568fBD903Dc33f7154eD308Be1aB4212";

	  const transfer = async() =>{

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
      const regis = await contra.methods.tranferCar(carID,personalID,address).send({ from: accounts[0]});
      alert('Car tranferred')
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

  // Log every state
  useEffect(() => {
    console.log("isEncrypt:", isEncrypt);
    console.log("password:", password);
    console.log("address:", address);
    console.log("personalID:", personalID);
    console.log("carID:", carID);
    console.log("userName:", userName);

  }, [isEncrypt, password, address, personalID, carID, userName]);

  return (
    <div>
      <Navbar />
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style ={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'left', height:'80vh', width:'330px', gap:'10px', }}>
          <Card className="w-[350px]  items-center">
            <CardHeader>
              <CardTitle>Transfer Car</CardTitle>
              <CardDescription>Transfer your car in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Address of the new owner"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="personalID">Personal ID</Label>
                    <Input
                      id="personalID"
                      placeholder="Personal ID of the Car"
                      value={personalID}
                      onChange={handlePersonalIDChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="carID">ID</Label>
                    <Input
                      id="carID"
                      placeholder="ID of the Car"
                      value={carID}
                      onChange={handleCarIDChange}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={transfer}>Transfer</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
