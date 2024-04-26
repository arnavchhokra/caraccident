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

function Page() {
  const [isEncrypt, setIsEncrypt] = useState(false); // State to track encryption status
  const [password, setPassword] = useState(''); // State to track password value
  const [ownerName, setOwnerName] = useState(''); // State to track owner name value
  const [carName, setCarName] = useState(''); // State to track car name value

  // Handler to update encryption state
  const handleEncrypt = (value) => {
    setIsEncrypt(value === "1");
  };

  // Inline function to update password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Inline function to update owner name state
  const handleOwnerNameChange = (e) => {
    setOwnerName(e.target.value);
  };

  // Inline function to update car name state
  const handleCarNameChange = (e) => {
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
              <Button>Register</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
