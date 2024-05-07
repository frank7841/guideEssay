export interface SETTINGS {
  academicLevels: [
    {
      _id: string;
      academicLevel: string;
      amount: string;
    }
  ];
  allWork: [
    {
      _id: string;
      amount: string;
      workType: string;
    }
  ];
  referencingStyles: [
    {
      _id: string;
      amount: string;
      referencingStyleType: string;
    }
  ];
  allSubjects: [
    {
      _id: string;
      subjectName: string;
    }
  ];
}
