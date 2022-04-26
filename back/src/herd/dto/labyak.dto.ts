import { Gender } from "../herd.service";

export class LabYakDTO {
    name: string;
    age: number;
    sex: Gender;
    days?: number;
}