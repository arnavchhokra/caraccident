"use client";
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Web3 from "web3";
import ABI from "../../../ABI.json";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TableDemo() {
  interface WindowWithEthereum extends Window {
    ethereum?: any;
  }

  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [filteredArr, setFilteredArr] = useState<any[]>([]);
  const [searchID, setSearchID] = useState<number | null>(null);
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
  const [arr, setArr] = useState<string[][]>([]);

  const contractAddress = "0x716493eb2356272d642e58dff2c877cd020e664a";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchID(Number(e.target.value));
  };

  const handleSearch = async () => {
    if (web3 && searchID !== null) {
      try {
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(ABI, contractAddress);
        const fertilizerDetails = await contract.methods.getFertilizerDetails(searchID).call({ from: accounts[0] });
        setFilteredArr([fertilizerDetails]);
      } catch (error) {
        console.error("Error fetching fertilizer details:", error);
        alert("Error fetching fertilizer details. Please check the console for more details.");
      }
    } else {
      alert("Please enter a valid numeric Fertilizer ID.");
    }
  };

  const getHistory = async() =>{
    if (web3 && searchID !== null) {
      try {
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(ABI, contractAddress);
        const fertilizerDetails = await contract.methods.getHistory(searchID).call({ from: accounts[0] });
        console.log(fertilizerDetails);
        setArr(fertilizerDetails as any);
      } catch (error) {
        console.error("Error fetching fertilizer details:", error);
        alert("Error fetching fertilizer details. Please check the console for more details.");
      }
    } else {
      alert("Please enter a valid numeric Fertilizer ID.");
    }
  };

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (typeof window !== "undefined") {
        const win = window as WindowWithEthereum;
        if (win.ethereum) {
          try {
            await win.ethereum.enable();
            const web3Instance = new Web3(win.ethereum);
            setWeb3(web3Instance);
          } catch (error) {
            console.error("Error enabling Ethereum:", error);
          }
        } else {
          alert("Please install Metamask");
        }
      }
    };

    initializeWeb3();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="number"
            placeholder="Search by Fertilizer ID"
            onChange={handleSearchChange}
            style={{ marginRight: "10px" }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Table style={{ border: "1px solid lightgrey" }}>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArr.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{data[0].toString()}</TableCell>
                <TableCell>{data[1].toString()}</TableCell>
                <TableCell>{data[2]}</TableCell>
                <TableCell>{data[3].toString()}</TableCell>
                <TableCell>{data[4].toString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button onClick={getHistory}>History</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Fertilizer Details</DialogTitle>
                        <DialogDescription>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Address</TableHead>
                              <TableHead>StakeHolder</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                          {arr.map((dati:any, index) => (
                            <TableRow key={index}>
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>{dati[1].substring(0,32)+"...."}</TableCell>
                <TableCell>{dati[2].toString()}</TableCell>
                            </TableRow>
                          ))}
                          </TableBody>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter></DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
