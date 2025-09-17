import { Contains, IsDate, IsDateString, IsEmail, IsIn, IsString, IsStrongPassword, IsUrl, Matches, Min, MinLength } from "class-validator";
import { isDate, matches } from "lodash";

export class AddUserDTO {

    @IsString()
    NomeTitolare!: string;
    @IsString()
    CognomeTitolare!: string;
    @IsEmail()
    Email!: string;
    
    @Min(8)
    password!: string;

    @IsString()
    IBAN!: string;

    @IsDateString()
    DataApertuta!: Date

}

function Type(arg0: () => DateConstructor): (target: AddUserDTO, propertyKey: "DataApertuta") => void {
    throw new Error("Function not implemented.");
}
