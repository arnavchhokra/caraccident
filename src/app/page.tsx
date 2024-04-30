"use client"
import Navbar from '@/components/Navbar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Web3 from 'web3';
import ABI from "../ABI.json";
import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function Home() {

  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [num, setNum] = useState(1);

  const [battery, setBattery] = useState([]);
  const [engine, setEngine] =useState([]);
  const [basic, setBasic] = useState([]);
  const [accident, setAccident] = useState([]);

  const contractAddress = "0x3E4c97e8568fBD903Dc33f7154eD308Be1aB4212";

  const[arr, setArr] = useState([])

  useEffect(()=>{
    const view = async() =>{
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

            const obj = await contra.methods.getAllCars().call({ from: accounts[0]});
            console.log(obj)
            setArr(obj);

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
      view()
  },[]);

  const getDetails = async(_id) =>{
    console.log(_id)
    setNum(_id);
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
          const _battery = await contra.methods.getBatteryService(_id).call({ from: accounts[0]});
          setBattery(_battery);
          const _engine = await contra.methods.getEngineService(_id).call({ from: accounts[0]});
          setEngine(_engine);
          const _basic = await contra.methods.getServiceHistory(_id).call({ from: accounts[0]});
          setBasic(_basic);
          console.log(_battery, _engine, _basic)
          const _accident = await contra.methods.getAccidentHistory(_id).call({ from: accounts[0]});
          setAccident(_accident);
          }
      catch(e)
      {
      alert(e)
      }
    }
  }
}

  return (
    <div>
      <Navbar />
      <div style={{paddingLeft:'10%', paddingRight:'10%', paddingTop:'30px'}} >
    <Table style={{border:'1px solid lightgrey'}} >
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Owner Name</TableHead>
          <TableHead>Car Name</TableHead>
          <TableHead >isEncrypted</TableHead>
          <TableHead >History</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {arr.map((data, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{data[0].toString()}</TableCell>
            <TableCell>{data[1]}</TableCell>
            <TableCell>{data[2]}</TableCell>
            <TableCell >{data[3] ? "Yes" : "No"}</TableCell>
            <TableCell >



              <Dialog>
  <DialogTrigger><Button onClick={() => getDetails(data[0].toString())}>History</Button></DialogTrigger>
  <DialogContent>


  <DialogHeader>
      <DialogTitle>Vehicle Details</DialogTitle>
      <DialogDescription>
      <TableHeader>
        <TableRow>
          <TableHead>Owner Name</TableHead>
          <TableHead>Car Name</TableHead>
          <TableHead >isEncrypted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow>
            <TableCell>{arr[num-1][1]}</TableCell>
            <TableCell>{arr[num-1][2]}</TableCell>
            <TableCell >{arr[num-1][3] ? "Yes" : "No"}</TableCell>
      </TableRow>
      </TableBody>
      </DialogDescription>
    </DialogHeader>


    <DialogHeader>
      <DialogTitle>Battery Details</DialogTitle>
      <DialogDescription>
      <Table style={{border:'1px solid lightgrey'}} >
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Service Date</TableHead>
          <TableHead>Battery Scale</TableHead>
          <TableHead >is Fixed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {battery.map((data, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>{data[0]}</TableCell>
            <TableCell>{data[1].toString()}</TableCell>
            <TableCell>{data[2].toString()}</TableCell>
            </TableRow>
))};
      </TableBody>
    </Table>
      </DialogDescription>
    </DialogHeader>




    <DialogHeader>
      <DialogTitle>Engine Details</DialogTitle>
      <DialogDescription>
      <Table style={{border:'1px solid lightgrey'}} >
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Service Date</TableHead>
          <TableHead>Engine Scale</TableHead>
          <TableHead >is Fixed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {engine.map((data, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>{data[0]}</TableCell>
            <TableCell>{data[1].toString()}</TableCell>
            <TableCell>{data[2].toString()}</TableCell>
            </TableRow>
))};
      </TableBody>
    </Table>
      </DialogDescription>
    </DialogHeader>




    <DialogHeader>
      <DialogTitle>Service Details</DialogTitle>
      <DialogDescription>
      <Table style={{border:'1px solid lightgrey'}} >
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Service Date</TableHead>
          <TableHead>Service Scale</TableHead>
          <TableHead >Parts Serviced</TableHead>
          <TableHead >Is Driveable</TableHead>
          <TableHead >Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {basic.map((data, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>{data[0]}</TableCell>
            <TableCell>{data[1].toString()}</TableCell>
            <TableCell>{data[2].toString()}</TableCell>
            <TableCell>{data[3].toString()}</TableCell>
            <TableCell>{data[4].toString()}</TableCell>
            </TableRow>
))};
      </TableBody>
    </Table>
      </DialogDescription>
    </DialogHeader>

    <DialogHeader>
      <DialogTitle>Accident Details</DialogTitle>
      <DialogDescription>
      <Table style={{border:'1px solid lightgrey'}} >
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Accident Date</TableHead>
          <TableHead >Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {accident.map((data, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>{data[0]}</TableCell>
            <TableCell>{data[1].toString()}</TableCell>
            </TableRow>
))};
      </TableBody>
    </Table>
      </DialogDescription>
    </DialogHeader>

  </DialogContent>
</Dialog></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </div>
  );
}
