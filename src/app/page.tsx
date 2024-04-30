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
  DialogFooter
} from "@/components/ui/dialog"
import CryptoJS from 'crypto-js';


export default function Home() {

  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [num, setNum] = useState(1);

  const [battery, setBattery] = useState([]);
  const [engine, setEngine] =useState([]);
  const [basic, setBasic] = useState([]);
  const [accident, setAccident] = useState([]);
  const[checker, setChecker] =useState(false)

  const contractAddress = "0x4c304df050df16ee92ef5037290c10cd19f35128";


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
          const _check = await contra.methods.checkEncryption(_id).call({ from: accounts[0]});
          setChecker(_check);
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

const[userName,setUserName]=useState('')
const[carName,setCarName]=useState('')

const [password, setPassword] = useState('');


const decrypt= async(_id)=>{
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
        const dec = await contra.methods.decrypt(_id).send({ from: accounts[0], value: web3.utils.toWei('0.03', 'ether') });
        const _car = await contra.methods.getCarByID(_id).call({ from: accounts[0]});
        const _ownerBytes = CryptoJS.AES.decrypt(_car[1].toString(), password);
        const _ownerName = _ownerBytes.toString(CryptoJS.enc.Utf8);
        setUserName(_ownerName);
        const _nameBytes = CryptoJS.AES.decrypt(_car[2].toString(), password);
        const _carName = _nameBytes.toString(CryptoJS.enc.Utf8);
        setCarName(_carName);
        alert("Data Decrypted")
      }
    catch(e)
    {
    alert(e)
    }
  }
}
}

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};



  return (
    <div>
      <Navbar />
      <div style={{paddingLeft:'10%', paddingRight:'10%', paddingTop:'30px'}} >
    <h1 style={{fontSize:'20px', fontWeight:'600'}}>Public Records</h1>
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
            <TableCell>{data[1].toString().substring(0, 10)}</TableCell>
            <TableCell>{data[2].toString().substring(0, 10)}</TableCell>
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
            <TableCell>{userName? userName :arr[num-1][1].substring(0, 10) }</TableCell>
            <TableCell>{carName? carName :arr[num-1][2].substring(0, 10)}</TableCell>
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
    <DialogFooter>
      {
        checker? <div><input  id="password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}></input><Button onClick={() => decrypt(data[0].toString())}>Decrypt</Button></div> : null
      }
</DialogFooter>

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
