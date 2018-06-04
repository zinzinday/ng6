interface Name {
  first: string;
  last: string;
  middle: string;
}

interface Email {
  email: string;
  priority: boolean;
  verified: boolean;
  published: boolean;
  type: string;
}

interface Phone {
  phoneNumber: string;
  priority: boolean;
  verified: boolean;
  published: boolean;
  type: string;
}

export interface Profile {
  id: string;
  fullname: string;
  name: Name;
  emails: Email[];
  phones: Phone[];
  joinedAt: Date;
  updatedAt: Date;
  role: string;
  status: boolean;
}
