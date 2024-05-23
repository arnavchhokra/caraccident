"use client";
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

function Page() {
  interface WindowWithEthereum extends Window {
    ethereum?: any;
  }

  const [fertilizerType, setFertilizerType] = useState(0); // State to track fertilizer type
  const [fertilizerQuantity, setFertilizerQuantity] = useState(0); // State to track fertilizer quantity
  const [carName, setCarName] = useState(''); // State to track fertilizer quality

  const [web3, setWeb3] = useState<Web3 | null>(null);
  const contractAddress = "0x716493eb2356272d642e58dff2c877cd020e664a";

  const register = async () => {
    if (typeof window !== "undefined") {
      const win = window as WindowWithEthereum;
      if (win.ethereum) {
        await win.ethereum.enable();
        const web3 = new Web3(win.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        const contra = new web3.eth.Contract(ABI, contractAddress);
        try {
          const regis = await contra.methods
            .addFertilizer(fertilizerQuantity, carName, fertilizerType)
            .send({ from: accounts[0] });
          alert('Fertilizer registered');
        } catch (e) {
          alert(e);
        }
      } else {
        alert('Connect Metamask');
      }
    }
  };

  // Handler to update fertilizer type state
  const handleFertilizerTypeChange = (value: any) => {
    setFertilizerType(value);
  };

  // Inline function to update fertilizer quantity state
  const handleFertilizerQuantityChange = (e: any) => {
    setFertilizerQuantity(e.target.value);
  };

  // Inline function to update fertilizer quality state
  const handleCarNameChange = (e: any) => {
    setCarName(e.target.value);
  };

  useEffect(() => {
    console.log("fertilizerType:", fertilizerType);
    console.log("fertilizerQuantity:", fertilizerQuantity);
    console.log("carName:", carName); // Log fertilizerType value to check if it changes
  }, [fertilizerType, fertilizerQuantity, carName]);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', height: '80vh', width: '330px', gap: '10px' }}>
          <Card className="w-[350px] items-center">
            <CardHeader>
              <CardTitle>Register Fertilizer</CardTitle>
              <CardDescription>Register Fertilizer in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col space-y-1.5 mb-2">
                  <Label htmlFor="fertilizerQuantity">Quantity of Fertilizer</Label>
                  <Input
                    id="fertilizerQuantity"
                    placeholder="Quantity"
                    value={fertilizerQuantity}
                    onChange={handleFertilizerQuantityChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 mb-2">
                  <Label htmlFor="carName">Quality of Fertilizer</Label>
                  <Input
                    id="carName"
                    placeholder="Quality"
                    value={carName}
                    onChange={handleCarNameChange}
                  />
                </div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                    <Select onValueChange={handleFertilizerTypeChange}>
                      <SelectTrigger id="fertilizerType">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="1">Nitrogen</SelectItem>
                        <SelectItem value="2">Phosphorus</SelectItem>
                        <SelectItem value="3">Potassium</SelectItem>
                        <SelectItem value="4">NPK</SelectItem>
                        <SelectItem value="5">Other</SelectItem>
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
