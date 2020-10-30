import { IsNotEmpty, MinLength } from 'class-validator';



export class UserDto {

    @IsNotEmpty()
    readonly username: string;


    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

}


export class UserRO {
    id: string;
    username: string;
    created: Date;
    token?: string;
    // ideas?: IdeaEntity[];
    // bookmarks?: IdeaEntity[];
  }