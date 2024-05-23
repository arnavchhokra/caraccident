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


  return (
    <div>
      <Navbar />
    </div>
  );
}
