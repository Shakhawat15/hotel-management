export type User = {
  _id: string;
  name: string;
  email: string;
  isAmiAdmin: boolean;
  about: string | null;
  _createdAt: string;
  image: string;
};
