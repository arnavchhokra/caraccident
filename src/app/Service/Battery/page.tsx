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


function Page() {
  interface WindowWithEthereum extends Window {
    ethereum?: any;
    }

  const [carID, setCarID] = useState(''); // State to track car ID value
  const [date, setDate] = useState(''); // State to track date value
  const [level, setLevel] = useState(''); // State to track battery level value
  const [isBatteryFixed, setIsBatteryFixed] = useState(''); // State to track battery fixed status

  // Inline function to update car ID state
  const handleCarIDChange = (e:any) => {
    setCarID(e.target.value);
  };

  // Inline function to update date state
  const handleDateChange = (e:any) => {
    setDate(e.target.value);
  };

  // Inline function to update level state
  const handleLevelChange = (e:any) => {
    setLevel(e.target.value);
  };

  // Inline function to update battery fixed state
  const handleBatteryFixedChange = (value:any) => {
    setIsBatteryFixed(value);
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
        const regis = await contra.methods.setBatteryService(carID, date, level, isBatteryFixed).send({ from: accounts[0]});
      alert('Battery registered')
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
    console.log("date:", date);
    console.log("level:", level);
    console.log("isBatteryFixed:", isBatteryFixed);
  }, [carID, date, level, isBatteryFixed]);

  return (
    <div>
      <Navbar />
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style ={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'left', height:'80vh', width:'330px', gap:'10px', }}>
          <Card className="w-[350px]  items-center">
            <CardHeader>
              <CardTitle>Battery Service</CardTitle>
              <CardDescription>Service your new car in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="carID">Car ID</Label>
                    <Input
                      id="carID"
                      placeholder="ID of the Car"
                      value={carID}
                      onChange={handleCarIDChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      placeholder="Date of Service"
                      value={date}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="level">Level</Label>
                    <Input
                      id="level"
                      placeholder="Battery Level (1-5)"
                      value={level}
                      onChange={handleLevelChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Is Battery Fixed?</Label>
                    <Select onValueChange={handleBatteryFixedChange}>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
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
