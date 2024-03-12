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
    course_name : string;
    module_name : string;
    description: string;
    order:number
  }
   

  
export interface IChapter  {
  _id: number;
  module_id: string;
  title: string;
  description: string;
}

  

export interface IModule_Form {
  module_name:string ;
  description :string;
  selectedCourse_id : string;
  selectedCourse_name : string;
}