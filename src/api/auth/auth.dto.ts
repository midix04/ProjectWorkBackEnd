import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AddUserDTO {

    @IsString()
    @IsNotEmpty()
    NomeTitolare!: string;
    @IsString()
    @IsNotEmpty()
    CognomeTitolare!: string;

    @IsEmail()
    @IsNotEmpty()
    Email!: string;
    
    @MinLength(8)
    password!: string;

    @IsDateString()
    @IsNotEmpty()
    DataApertuta!: Date

}

function Type(arg0: () => DateConstructor): (target: AddUserDTO, propertyKey: "DataApertuta") => void {
    throw new Error("Function not implemented.");
}
