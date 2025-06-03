import { Infringement } from "./Infringement";
import { Motorcycle } from "./Motorcycle";

export interface MotorcycleInfringement {
  id?: number;
  infringementId: number;
  motorcycleId: number;
  date: string;
  infringement?: Infringement;
  motorcycle?: Motorcycle;
}