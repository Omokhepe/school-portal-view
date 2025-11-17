export interface ClassRoot {
  classes: ClassSub;
  // status: number;
}

interface ClassSub {
  creche: Classes[];
  primary: Classes[];
  secondary: Classes[];
}

interface Classes {
  id: number;
  name: string;
  level: string;
}
