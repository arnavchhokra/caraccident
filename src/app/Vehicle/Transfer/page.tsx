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
        <CardTitle>Transfer Car</CardTitle>
        <CardDescription>Transfer your  car in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Address</Label>
              <Input id="name" placeholder="Address of the new owner" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">ID</Label>
              <Input id="name" placeholder="ID of the Car" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Transfer</Button>
      </CardFooter>
    </Card>
        </div>
        </div>
    </div>
  )
}

export default Page