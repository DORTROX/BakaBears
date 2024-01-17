"use client"

import { Card, CardBody } from '@nextui-org/react'
import React from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/UserState";

export const WarningBanner = () => {
    const user = useSelector(selectUser);
  return (
    <Card className={user.address.length > 0 ? "bg-green-700 border-r-0" : "bg-red-700 border-r-0"}>
        <CardBody>
            <p className="text-center">{user.address.length>0 ? user.address : "Please connect your wallet from profile menu to use the contracts"}</p>
        </CardBody>
    </Card>
  )
}
