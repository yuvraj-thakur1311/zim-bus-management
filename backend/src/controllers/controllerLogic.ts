import { Request, Response } from "express";
import busInfo from "../data/busInfo.json"
import { busModel } from "../models/bus";

let busDetails: busModel[] = busInfo;

export const getBuses = (req: Request, res: Response) => {
    return res.status(201).json(busDetails);
}

export const bookBus = (req: Request, res: Response) => {
     const id = Number(req.params.id) ;
     const bus = busDetails.find((b) => b.id === id);

     if(!bus){
        return res.status(404).json({
            message: "Bus not found"
        })
     }

     if(bus.seatsAvailable <= 0){
        return res.status(409).json({
            message: "No seats available..."
        })
     }
     
     bus.seatsAvailable -= 1;
     return res.status(200).json({
        success: true,
        message: "Bus booked successfullyyyy..",
        data:bus
     })
}

export const searchBus = (req: Request, res: Response) => {
    const {source, destination} = req.query;

    if(!source || !destination){
        return res.status(400).json({
            message: "No source or destination detail foundd as it is required..."
        })
    }

    if(source === destination){
        return res.status(409).json({
            success: false,
            message: "Source and destination can't be same..."
        })
    }
    const filterBus = busDetails.filter((bus) => (
        bus.source.toLowerCase() === String(source).toLowerCase() 
        && bus.destination.toLowerCase() === String(destination).toLowerCase()
    ))

    return res.status(200).json({
        message: "Bus fetched successfullyy..",
        data: filterBus
    })
}