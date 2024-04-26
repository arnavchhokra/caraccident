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
                    <Input
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
              <Button>Register</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
