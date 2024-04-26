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

function Page() {
  const [carID, setCarID] = useState(''); // State to track car ID value
  const [date, setDate] = useState(''); // State to track date value
  const [engineLevel, setEngineLevel] = useState(''); // State to track engine level value
  const [isEngineFixed, setIsEngineFixed] = useState(''); // State to track engine fixed status

  // Inline function to update car ID state
  const handleCarIDChange = (e) => {
    setCarID(e.target.value);
  };

  // Inline function to update date state
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Inline function to update engine level state
  const handleEngineLevelChange = (e) => {
    setEngineLevel(e.target.value);
  };

  // Inline function to update engine fixed state
  const handleEngineFixedChange = (value) => {
    setIsEngineFixed(value);
  };

  // Log every state
  useEffect(() => {
    console.log("carID:", carID);
    console.log("date:", date);
    console.log("engineLevel:", engineLevel);
    console.log("isEngineFixed:", isEngineFixed);
  }, [carID, date, engineLevel, isEngineFixed]);

  return (
    <div>
      <Navbar />
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style ={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'left', height:'80vh', width:'330px', gap:'10px', }}>
          <Card className="w-[350px]  items-center">
            <CardHeader>
              <CardTitle>Service Engine</CardTitle>
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
                      placeholder="Date of the Service"
                      value={date}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="engineLevel">Engine Level</Label>
                    <Input
                      id="engineLevel"
                      placeholder="Level of the Engine (1-5)"
                      value={engineLevel}
                      onChange={handleEngineLevelChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="isEngineFixed">Is Engine Fixed?</Label>
                    <Select onValueChange={handleEngineFixedChange}>
                      <SelectTrigger id="isEngineFixed">
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
              <Button>Register</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
