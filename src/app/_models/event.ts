import { Time } from "@angular/common";

export class Event{
    id: number;
    title: string;
    sportType: SportType;
    location: string;
    date: Date;
    time: Time;
    skillLevel: SkillLevel;
    minAttendees: number;
    maxAttendees: number;
    description: string;
    playType: PlayType;
}

export enum SportType{
    FOOTBALL = 'Football',
    CLIMBING = 'Climbing',
    GOLF = 'Golf',
    FISHING = 'Fishing',
    BASKETBALL = 'Basketball',
    BADMINTON = 'Badminton',
    CHESS = 'Chess',
    ICEHOCKEY = 'Icehockey',
    TENNIS = 'Tennis'
}

export enum SkillLevel{
    BEGINNER = 'Beginner',
    AVERAGE = 'Average',
    ADVANCED = 'Advanced',
    PRO = 'Pro'
}

export enum PlayType{
    CASUAL = 'Casual',
    COMPETETIVE = 'Competetive'
}

