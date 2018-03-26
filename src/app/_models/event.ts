import { Time } from "@angular/common";
import { User } from './index';
   
export class Event{
    eventId: string;
    title: string;
    sportType: SportType;
    location: string;
    date: string;
    skillLevel: SkillLevel;
    maxAttendees: number;
    description: string;
    playType: PlayType;
    latitude:  number;
    longitude: number;
}

export enum SportType{
    FOOTBALL = 'Football',
    CLIMBING = 'Climbing',
    GOLF = 'Golf',
    FISHING = 'Fishing',
    BASKETBALL = 'Basketball',
    BADMINTON = 'Badminton',
    CHESS = 'Chess',
    //ICEHOCKEY = 'Icehockey',
    //TENNIS = 'Tennis'
}

export enum SkillLevel{
    BEGINNER = 'Beginner',
    AVERAGE = 'Average',
    ADVANCED = 'Advanced',
    PRO = 'Professional'
}

export enum PlayType{
    CASUAL = 'Casual',
    COMPETETIVE = 'Competetive'
}

