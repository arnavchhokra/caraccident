import React from 'react'
import Navbar from '@/components/Navbar'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function Page() {
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
              <Label htmlFor="name">Vehicle ID</Label>
              <Input id="name" placeholder="ID of the vehicle" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Accident Date</Label>
              <Input id="name" placeholder="Date of the accident" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Damage</Label>
              <Input id="name" placeholder="Describe parts broken / damage" />
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
  )
}

export default Page