export interface SINGLEORDER {
  _id: string;
  academicLevel: {
    _id: string;
    academicLevel: string;
  };
  attachmentUrl: string;
  boostServices: [
    {
      _id: string;
      description: string;
      title: string;
    }
  ];
  createdAt: string;
  deadline: string;
  email: string;
  instructions: string;
  noOfPages: string;
  payment: string;
  noOfSources: string;
  phonenumber: string;
  price: string;
  referencingStyle: {
    _id: string;
    referencingStyleType: string;
  };
  subject: {
    subjectName: string;
    _id: string;
  };
  topic: string;
  urgency: string;
  status: string;
  work: {
    _id: string;
    workType: string;
  };
  user: {
    _id: string;
    username: string;
  };
}
