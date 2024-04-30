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

import Web3 from 'web3';
import ABI from "../../../ABI.json";



function Page() {
  const [vehicleID, setVehicleID] = useState(''); // State to track vehicle ID value
  const [accidentDate, setAccidentDate] = useState(''); // State to track accident date value
  const [damage, setDamage] = useState(''); // State to track damage description

  // Inline function to update vehicle ID state
  const handleVehicleIDChange = (e) => {
    setVehicleID(e.target.value);
  };

  // Inline function to update accident date state
  const handleAccidentDateChange = (e) => {
    setAccidentDate(e.target.value);
  };

  // Inline function to update damage description state
  const handleDamageChange = (e) => {
    setDamage(e.target.value);
  };



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
        const regis = await contra.methods.registerAccident(vehicleID, accidentDate, damage).send({ from: accounts[0]});
      alert('Accident registered')
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
    console.log("vehicleID:", vehicleID);
    console.log("accidentDate:", accidentDate);
    console.log("damage:", damage);
  }, [vehicleID, accidentDate, damage]);

  return (
    <div>
      <Navbar />
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style ={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'left', height:'80vh', width:'330px', gap:'10px', }}>
          <Card className="w-[350px]  items-center">
            <CardHeader>
              <CardTitle>Register Accident</CardTitle>
              <CardDescription>Register an accident in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="vehicleID">Vehicle ID</Label>
                    <Input
                      id="vehicleID"
                      placeholder="ID of the vehicle"
                      value={vehicleID}
                      onChange={handleVehicleIDChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="accidentDate">Accident Date</Label>
                    <Input
                      id="accidentDate"
                      placeholder="Date of the accident"
                      value={accidentDate}
                      onChange={handleAccidentDateChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="damage">Damage</Label>
                    <textarea
                    className="h-60 p-2 "
                      id="damage"
                      placeholder="Describe parts broken / damage"
                      value={damage}
                      onChange={handleDamageChange}
                    />
                  </div>
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
