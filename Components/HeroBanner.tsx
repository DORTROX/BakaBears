"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/UserState";
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Input, Image, Chip } from "@nextui-org/react";
import ReactPlayer from 'react-player'
import Faucet from "@/Contract/Faucet.json";
import Web3 from "web3";
import { useDispatch } from "react-redux";
import { setUserLoginDetails } from "@/Redux/UserState";

declare global {
  interface Window {
    ethereum: {
      request: (request: { method: string }) => Promise<string[]>;
    };
  }
}

export const HeroBanner = () => {
  const dispatch = useDispatch();
  const [show, setshow] = useState();
  const [EligibilityvalueInput, setEligibilityvalueInput] = useState("0xe9502CaA664875d8dFA0a3F74C48bf01dB78A0d2");
  const user = useSelector(selectUser);
  const [timeLeft, settimeLeft] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      // switch network to sepolia
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xaa36a7" }] } as any);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts",  });
      const account = accounts[0];
      const web3 = new Web3(window.ethereum);
      const FaucetInst = new web3.eth.Contract(Faucet, "0x2c443a31076639Fd651C779b32523fC6d1D46bE5");
      dispatch(setUserLoginDetails({ address: account, faucetInstance: FaucetInst }));
    }
  };

  const claim = async () => {
    if (user.address.length > 0) {
      try {
        const transaction = await user.faucetInstance.methods.claim().send({ from: user.address });
        console.log('Claim transaction hash:', transaction.transactionHash);
      } catch (error) {
        console.error("An error occurred while claiming:", error);
      }
    }
  };
  const getTimeLeft = async () => {
    if (user.address.length > 0) {
      try {
        const lastClaimTime = BigInt(await user.faucetInstance.methods.getTimeUntilNextClaim(user.address).call());
        const claimInterval = BigInt(await user.faucetInstance.methods.CLAIM_INTERVAL().call());
        const currentTime = BigInt(Math.floor(Date.now() / 1000)); // Get current time in seconds
        const timeSinceLastClaim = currentTime - lastClaimTime;
        let timeLeft = BigInt(0);
        if (timeSinceLastClaim < claimInterval) {
          timeLeft = claimInterval - timeSinceLastClaim;
        }
        const timeLeftPercentage = Number((timeLeft * BigInt(100)) / claimInterval);
        console.log(Math.floor(timeLeftPercentage));
        return settimeLeft(timeLeftPercentage);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const getEligibility = async (props: string) => {
    if (user.address.length > 0) {
      try {
        const HasEligibleNft = await user.faucetInstance.methods.hasEligibleNFT(props).call();
        setshow(HasEligibleNft);
      } catch (error) {
        throw error;
      }
    }
  };
  function roundToNearestTen(value: number) {
    return Math.round(value / 10) * 10;
  }
  useEffect(() => {
    const fetchTimeLeft = async () => {
      const x = await getTimeLeft();
    };
    fetchTimeLeft();
  }, [user.address]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='m-4'>
      <div className="navbar">
        <p>{<Image src={`/battery/battery ${roundToNearestTen(100 - timeLeft)}.png`} width={100} height={100} className='border-r-0' />} {100 - timeLeft}%</p>
        <button className="navButton" onClick={() => connectWallet()}>connect</button>
      </div>
      <div className="mainBody">
        <div className="sodaCan">
          <ReactPlayer
            url="/hanidrip2.mp4"
            height={400}
            playing
            loop
            muted
            className="gif"
          />
          <div className="sodaImage">
            <Image src='/hanifaucetsoda.png' width={350} />
          </div>
        </div>
        <div className="rightText">
          <button className="mainBodyButton">Claim fresh faucet</button>
        </div>
      </div>
      {/* <Card>
        <CardBody>
          <div className='flex gap-4 justify-center'>
            <h2>Claim Next Faucet</h2>
            {<Image src={`/battery/battery ${roundToNearestTen(100 - timeLeft)}.png`} width={50} height={50} className='border-r-0' />}
            <p>{100 - timeLeft}</p>
          </div>
        </CardBody>
      </Card>

      <div className='flex gap-4 md:space-x-4 p-10'>
        <div>
          <Card className='m-auto max-w-[400px] my-2 md:mx-0'>
            <CardHeader className='flex gap-3'>
              <Image
                alt='nextui logo'
                height={40}
                radius='sm'
                src='https://getwallpapers.com/wallpaper/full/2/e/0/1386406-light-yagami-wallpaper-1920x1080-for-iphone-5s.jpg'
                width={40}
              />
              <div className='flex flex-col'>
                <p className='text-md'>Nft Eligibility checker </p>
                <div className='flex gap-2'>
                  <p>Eligible : </p>
                  <Chip color={show == undefined ? "primary" : show ? "success" : "danger"}>
                    {show == undefined ? "Run the function" : show ? "True" : "False"}
                  </Chip>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>To check if the user has an NFT on the address</p>
            </CardBody>
            <Divider />
            <CardFooter className='gap-4'>
              <Input
                disabled={user.address.length <= 0}
                isRequired
                type='text'
                label='address'
                defaultValue={EligibilityvalueInput}
                className='max-w-sm'
                onChange={(e) => setEligibilityvalueInput(e.target.value)}
              />
              <Button
                disabled={user.address.length <= 0}
                color='primary'
                variant='flat'
                onClick={() => getEligibility(EligibilityvalueInput)}>
                Call eligible
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Image src='/hanifaucetsoda.png' width={640}/>
        <div className='flex flex-col justify-center items-center h-full'>
          <Button color='warning' onClick={() => claim()}>
            Claim Fresh faucet
          </Button>
        </div>
      </div> */}

    </div>
  );
};
