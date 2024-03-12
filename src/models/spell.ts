import { ActionType } from "./action";

export type Spell = {
  title: string;
  level: number;
  school: string;
  actionType: string;
  distance: string;
  components: string;
  duration: string;
  classes: string;
  archetypes?: string;
  source: string;
  description: string;
  notes?: string;
  vocal?: string[];
  somatic?: string;
};
