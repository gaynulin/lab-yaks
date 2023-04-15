import { Injectable } from '@nestjs/common';
import { Gender, HerdService, ILabYak } from '../herd/herd.service';

// TODO: Can we shave a male yak?
export interface IStock  {milk: number, skins: number}

export interface ILabYakLastShived extends ILabYak {
    ageLastShived: number;
}


@Injectable()
export class ShopService {
    constructor(private readonly herdService: HerdService){}

    public getStockByDay(day: number): IStock{
        const herd: ILabYak[] = this.herdService.getHerdDataByDay(day);

        const milk = this.getTotalMilkByDay(herd);
        const skins = this.getTotalSkinsOfWool(herd);
        
        return {milk, skins};
    }

    public static extendWithLastShivedDay (yak: ILabYak): ILabYakLastShived  {
        const ageLastShived =  ShopService.getSkinsOfWoolByYak(yak).lastShivedDay;
        
        return {...yak, ageLastShived};
    }

    private getTotalMilkByDay(herd: ILabYak[]) {
        const femaleYaks = herd.filter(yak=>yak.sex === Gender.FEMALE);

        return femaleYaks.reduce((acc, yak)=> acc+ this.getMilkByYak(yak),0);
    }
   
    private getMilkByYak(labyak: ILabYak): number {
        // 50-D*0.03  // O(n)
        const passedDays = Array.from({length:labyak.collectedDays+1});

        return passedDays.reduce((acc: number, _, dayIndex)=>{
                const ageDaysAtMoment = labyak.initialDays + dayIndex;
                const milkVolumeOverTheDay: number = 50 - ageDaysAtMoment * 0.03;

                return acc + milkVolumeOverTheDay;
            }, 0) as number; 
    }

    private getTotalSkinsOfWool(herd: ILabYak[]) {
        // TODO: Can we shave a yak male?
        const canBeShiven = herd.filter(yak=>yak.age >= 1 && yak.sex === Gender.FEMALE ); 

        return canBeShiven.reduce((acc, yak)=>acc + ShopService.getSkinsOfWoolByYak(yak).skins, 0);
    }

    private static getSkinsOfWoolByYak(labyak: ILabYak): {lastShivedDay: number, skins: number} {
        // TODO: could be optimised with SLiding Window with two pointers of searching next day of shiving.
        // 8+D*0.01
        const res = [];
        const passedDays = Array.from({length: labyak.collectedDays+1});
        if(passedDays.length > 1) {
            res.push(0);
        }

        passedDays.forEach((_unused, dayIndex)=>{
            const minDaysPause = 8 + (labyak.initialDays + dayIndex ) * 0.01;
            const currentDay = dayIndex+1;

            if(dayIndex - res[res.length-1] - minDaysPause >= 0) {
                res.push(currentDay);
            } 
        }); 

        const last = res.length ? res[res.length-1] : 0;
        const lastShivedDay =  (labyak.initialDays + last) / HerdService.DAYS_IN_A_YEAR;

        return {lastShivedDay, skins: res.length};
    }
}
