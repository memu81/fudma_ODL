import { Injectable } from '@nestjs/common';

type Program = {
  id: string;
  code: string;
  name: string;
  faculty: string;
};

@Injectable()
export class ProgramsService {
  private readonly programs: Program[] = [
    {
      id: 'prog-bsc-cs',
      code: 'BSC-CS',
      name: 'B.Sc Computer Science',
      faculty: 'Faculty of Science'
    },
    {
      id: 'prog-bnsc',
      code: 'BNSC',
      name: 'B.NSc Nursing Science',
      faculty: 'Faculty of Allied Health Sciences'
    }
  ];

  findAll(): Program[] {
    return this.programs;
  }
}
