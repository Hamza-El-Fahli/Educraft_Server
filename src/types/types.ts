export interface IUser {
  _id: string;
  name: string;
  filiere: string;
  annee: number;
  profile: string;
  email: string;
  password: string;
}
export interface ICourse {
  _id: string;
  course_name: string;
  description: string;
  instructor: number;
}

export interface IModule {
  _id: string;
  course_id: string;
  course_name: string;
  module_name: string;
  description: string;
  order: number
}



export interface IChapter {
  _id: number;
  module_id: string;
  title: string;
  description: string;
}

export interface IQuizz {
  _id: string;
  question: string;
  answers: string[];
  correct_answer: string;
  chapter_id: string;
  chapter_name: string;
  module_id: string;
  module_name: string;
  course_id: string;
  course_name: string;

}

export interface IModule_Form {
  module_name: string;
  description: string;
  selectedCourse_id: string;
  selectedCourse_name: string;
}
export interface IUser_Form {
  name: string;
  filiere: string;
  annee: number;
  profile: string;
  email: string;
  password: string;
}