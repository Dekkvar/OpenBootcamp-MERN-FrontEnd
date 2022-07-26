export type Kata = {
  _id: number,
  name: string,
  description: string,
  level: string,
  user: string, // Id of user
  date: Date,
  solution: string,
  valoration: number,
  chance: number,
  numVal: number,
  ratings: []
}