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
import ABI from "../../ABI.json";

function Page() {
  const [carID, setCarID] = useState(''); // State to track car ID value

  // Inline function to update car ID state
  const handleCarIDChange = (e) => {
    setCarID(e.target.value);
  };



  const [web3, setWeb3] = useState<Web3 | null>(null);

  const contractAddress = "0x3E4c97e8568fBD903Dc33f7154eD308Be1aB4212";


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
        const regis = await contra.methods.approveProvider(carID).send({ from: accounts[0]});
      alert('Service registered')
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
    console.log("carID:", carID);
  }, [carID]);

  return (
    <div>
      <Navbar />
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style ={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'left', height:'80vh', width:'330px', gap:'10px', }}>
          <Card className="w-[350px]  items-center">
            <CardHeader>
              <CardTitle>Approve Provider</CardTitle>
              <CardDescription>Approve your service in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="carID">Password</Label>
                    <Input
                      id="carID"
                      placeholder="Enter Admin Password"
                      value={carID}
                      onChange={handleCarIDChange}
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
