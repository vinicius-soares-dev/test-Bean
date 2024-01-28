import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity("users")
export class Users {
  @PrimaryColumn({ generated: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({ type: "varchar", length: 12, unique: true })
  username: string;

  @Column({ type: "varchar", length: 8 })
  password: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;



  constructor(username: string, password: string, id: string) {
    this.username = username;
    this.password = password;
    this.id = id;
  }
} 