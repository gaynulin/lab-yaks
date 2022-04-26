import { Injectable } from '@nestjs/common';
import { LabYakDTO } from './dto/labyak.dto';

export enum Gender {
    FEMALE = "f",
    MALE = "m"
}

// TODO: Can we shave a yak male?

export interface ILabYak {
    name: string,
    age: number,
    initialDays: number;
    sex: Gender,
    collectedDays: number,
    ageDays: number
}

const init: LabYakDTO[] = [
    {
        name: "Betty-1",
        age: 4,
        sex: Gender.FEMALE
    },
    {
        name: "Betty-2",
        age: 8,
        sex: Gender.FEMALE
    },
    {
        name: "Betty-1",
        age: 9.5,
        sex: Gender.FEMALE
    },
];


@Injectable()
export class HerdService {
    static DAYS_IN_A_YEAR = 100;

    private static MAX_AGE = 10;

    private herd: ILabYak[] = init.map(this.mapDTOToILabYak);


    /**
     * @todo - load from xml
     * @param data 
     */
    setHerd(data: LabYakDTO[]) {
        this.herd = data.map(this.mapDTOToILabYak);
    }

    getHerdDataByDay(t: number): ILabYak[] {
        t = Number(t);
        const dayBefore = t - 1;

        return this.herd
            .map(item => {
                const collectedDays = dayBefore;
                const ageDays = item.ageDays + t;
                const age = ageDays / HerdService.DAYS_IN_A_YEAR;
                return { ...item, age, ageDays, collectedDays };
            })
            .filter(this.isYakAlive);
    }

    private isYakAlive(yak: ILabYak) {
        return HerdService.MAX_AGE > yak.age;
    }

    private mapDTOToILabYak(yak: LabYakDTO): ILabYak {
        const ageDays = yak.age * HerdService.DAYS_IN_A_YEAR;
        return {
            ...yak,
            collectedDays: 0,
            initialDays: ageDays,
            ageDays
        };
    }
}
