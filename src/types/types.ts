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

  export interface ICourse_IModule extends Omit<ICourse,'course_name'> {
    course_name: string
  }
  export interface IModule {
    _id: string;
    course_id: string;
    course_name : string;
    module_name : string;
    description: string;
    order:number
  }
  

  
interface IChapter  {
  _id: number;
  module_id: string;
  title: string;
  description: string;
}

  

