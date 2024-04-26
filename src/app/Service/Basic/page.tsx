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
  const [serviceDate, setServiceDate] = useState(''); // State to track service date value
  const [serviceLevel, setServiceLevel] = useState(''); // State to track service level value
  const [arePartsFixed, setArePartsFixed] = useState(''); // State to track if parts are fixed
  const [isCarDriveable, setIsCarDriveable] = useState(''); // State to track if car is driveable

  // Inline function to update car ID state
  const handleCarIDChange = (e) => {
    setCarID(e.target.value);
  };

  // Inline function to update service date state
  const handleServiceDateChange = (e) => {
    setServiceDate(e.target.value);
  };

  // Inline function to update service level state
  const handleServiceLevelChange = (e) => {
    setServiceLevel(e.target.value);
  };

  // Inline function to update parts fixed state
  const handlePartsFixedChange = (value) => {
    setArePartsFixed(value);
  };

  // Inline function to update car driveable state
  const handleCarDriveableChange = (value) => {
    setIsCarDriveable(value);
  };

  // Log every state
  useEffect(() => {
    console.log("carID:", carID);
    console.log("serviceDate:", serviceDate);
    console.log("serviceLevel:", serviceLevel);
    console.log("arePartsFixed:", arePartsFixed);
    console.log("isCarDriveable:", isCarDriveable);
  }, [carID, serviceDate, serviceLevel, arePartsFixed, isCarDriveable]);

  return (
    <div>
      <Navbar />
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style ={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'left', height:'80vh', width:'330px', gap:'10px', }}>
          <Card className="w-[350px]  items-center">
            <CardHeader>
              <CardTitle>Service Car</CardTitle>
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
                    <Label htmlFor="serviceDate">Service Date</Label>
                    <Input
                      id="serviceDate"
                      placeholder="Date of the Service"
                      value={serviceDate}
                      onChange={handleServiceDateChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="serviceLevel">Service Level</Label>
                    <Input
                      id="serviceLevel"
                      placeholder="Level of the Service (1-5)"
                      value={serviceLevel}
                      onChange={handleServiceLevelChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="arePartsFixed">Are Parts Fixed?</Label>
                    <Select onValueChange={handlePartsFixedChange}>
                      <SelectTrigger id="arePartsFixed">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="isCarDriveable">Is Car Driveable?</Label>
                    <Select onValueChange={handleCarDriveableChange}>
                      <SelectTrigger id="isCarDriveable">
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
