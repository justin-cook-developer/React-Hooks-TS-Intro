export interface todo {
  text: string;
  isCompleted: boolean;
}

export interface action {
  type: string;
  index?: number;
  text?: string;
}

export interface addAction extends action {
  text: string;
}

export interface indexAction extends action {
  index: number;
}
