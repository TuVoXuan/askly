interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface IPointPosition {
  top: number;
  left: number;
}