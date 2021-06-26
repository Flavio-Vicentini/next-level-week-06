import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity('compliments')
class Compliment {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_sender:string;

    @JoinColumn({name: 'user_sender'})
    @ManyToOne(() => User)
    userSender: User;

    @Column()
    user_receiver: string;

    @JoinColumn({name: 'user_receiver'})
    @ManyToOne(() => User)
    userReceiver: User;

    @Column()
    tag_id: string;
    //para trazer todo o conteudo de onde esta a tag_id
    @JoinColumn({name: 'tag_id'})
    //varios elogios podem ser salvos com a memsma tag
    @ManyToOne(() => Tag)
    tag:Tag;

    @Column()
    message:string;

    @CreateDateColumn()
    created_at : Date;

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }
}
export {Compliment}