import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AddUserDTO {

    @IsString()
    @IsNotEmpty()
    nomeTitolare!: string;
    @IsString()
    @IsNotEmpty()
    cognomeTitolare!: string;

    @IsEmail()
    @IsNotEmpty()
    Email!: string;
    
    @MinLength(8)
    password!: string;

}

function Type(arg0: () => DateConstructor): (target: AddUserDTO, propertyKey: "DataApertuta") => void {
    throw new Error("Function not implemented.");
}
