const Joi = require('joi');

export const RegisterStudentBodySchema = Joi.object({
  name: Joi.string().required(),
  rollNumber: Joi.string().required(),
  department: Joi.string().required(),
  degree: Joi.string().required(),
  gender:Joi.string().required(),
  dob: Joi.date().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  city: Joi.string().required(),
  interest: Joi.string().required(),
  status: Joi.string().required(),
});


export interface AddStudent{
  name: string;
  rollNumber: string;
  department: string;
  degree: string;
  gender:string;
  dob: Date;
  startDate: Date;
  endDate:Date;
  city: string;
  interest: string;
  status: string;
}
