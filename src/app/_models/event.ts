export class Event{
    eventId: number;
    title: string;
    sportType: SportType;
    location: string;
    date: Date;
    skillLevel: SkillLevel;
    maxAttendees: number;
    description: string;
    playType: PlayType;
}

enum SportType{
    Football,
    Climbing,
    Golf,
    Fishing,
    Basketball,
    Badminton,
    Chess,
    Icehockey,
    Tennis
}

enum SkillLevel{
    beginner,
    average,
    advanced,
    pro
}

enum PlayType{
    Casual,
    Competetive
}