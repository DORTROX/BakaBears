"use client"

import { Card, CardBody } from '@nextui-org/react'
import React from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/UserState";

export const WarningBanner = () => {
    const user = useSelector(selectUser);
  return (
    <Card className={user.address.length > 0 ? "hidden" : "bg-red-700 border-r-0"}>
        <CardBody>
            <p className="text-center">Please connect your wallet from profile menu to use the contracts</p>
        </CardBody>
    </Card>
  )
}
