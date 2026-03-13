import NullInterface from "../interfaces/NullInterface";

export default abstract class Person implements NullInterface{
    protected names: string;
    protected surnames: string;
    abstract isNull: boolean;

    constructor(person: PersonInterface) {
        this.names = person.names;
        this.surnames = person.surnames;
    }

    getNames(): string {
        return this.names
    }

    setNames(names: string): void {
        this.names = names
    }        

    getSurname(): string {
        return this.surnames
    }

        setSurnames(surnames: string): void {
        this.surnames = surnames
    }   

}

export interface PersonInterface{
    names: string
    surnames: string
}