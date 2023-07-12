"use client"
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  Button,
  Card,
  UncontrolledCollapse,
  CardBody,
} from "reactstrap";
import Image from 'next/image';

interface ItemProp {
  image: string;
  category: string;
  quantity: number;
}

export interface CollectiblesProps {
  location: string;
  items?: ItemProp[];
}

const Collectible = ({ items } : { items : CollectiblesProps}) => {
  return (
    <div>
      <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
        {items.location}
      </Button>
      <UncontrolledCollapse toggler="toggler">
        <Card>
          <CardBody className="flex w-full px-4 mb-4">
            {items.items && items.items.map((item, idx) => (
              <div className="flex" key={idx}>
                <div className="mr-1 w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                  <Image src={item.image} alt="" height={80} width={90}/>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
  );
}


const Collectibles = ({ data } : { data: CollectiblesProps[] }) => {
  return (
    <>
      {data.map((locations, idx) => (
        <Collectible key={idx} items={locations} />
      ))}
    </>
  );
}

export default Collectibles;