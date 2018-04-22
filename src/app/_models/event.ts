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
    lat:  number;
    lng: number;
    host: User;
    players: User[];
}

export enum SportType{
    ANY   = 'Any',
    FOOTBALL = 'Football',
    CLIMBING = 'Climbing',
    GOLF = 'Golf',
    FISHING = 'Fishing',
    BASKETBALL = 'Basketball',
    BADMINTON = 'Badminton',
    CHESS = 'Chess',
}

export enum SkillLevel{
    ANY   = 'Any',
    BEGINNER = 'Beginner',
    AVERAGE = 'Average',
    ADVANCED = 'Advanced',
    PRO = 'Professional'
}

export enum PlayType{
    ANY   = 'Any',
    CASUAL = 'Casual',
    COMPETETIVE = 'Competetive'
}

