import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class Users {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 12 })
  username: string;

  @Column({ type: "varchar", length: 8 })
  password: string;



  constructor(username: string, password: string, id: string) {
    this.username = username;
    this.password = password;
    this.id = id;
  }
} 