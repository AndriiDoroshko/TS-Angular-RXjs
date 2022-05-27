export default class Issue {
  id!: number;
  title!: string;
  description!: string;
  priority!: PriorityType;
  assignee!: string;
  isCompleted!: boolean;
}

export enum PriorityType {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}
